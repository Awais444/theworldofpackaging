import { site, whatsappUrl } from "@/config/site";

/**
 * Lead delivery (CLAUDE.md §10.3): every form submission is emailed to LEADS_TO_EMAIL through Resend and
 * appended to a Google Sheet through an Apps Script web app (docs/leads-sheet-apps-script.js).
 * Env: RESEND_API_KEY, LEADS_TO_EMAIL, LEADS_FROM_EMAIL, LEADS_SHEET_WEBHOOK (see .env.example).
 */

export type LeadKind = "quote-request" | "project-brief" | "inline-contact" | "newsletter";

const FORM_LABEL: Record<LeadKind, string> = {
  "quote-request": "Quote request",
  "project-brief": "Project brief",
  "inline-contact": "Contact enquiry",
  newsletter: "Newsletter sign-up",
};

/** Request context from the server action: where the form was sent from. */
export type LeadContext = { page: string; ipCountry: string; receivedAt: Date };

/** The columns every lead shares, used for the email subject, the sheet row and the reply-to. */
type Lead = {
  form: string;
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  service: string;
  product: string;
  packaging: string;
  quantity: string;
  country: string;
  message: string;
  page: string;
  /** Every answer, as label/value pairs, for the email table. */
  answers: Array<[string, string]>;
};

const NEED_LABEL: Record<string, string> = { design: "Packaging design", brand: "Brand identity", "design-print": "Design + printing", print: "Printing only" };

const str = (v: unknown): string => (v === undefined || v === null ? "" : Array.isArray(v) ? v.map(str).filter(Boolean).join(", ") : String(v).trim());

/** Readable label for a field key: "contactBy" → "Contact by". */
const LABELS: Record<string, string> = { whatsapp: "WhatsApp", skus: "Designs (SKUs)", contactBy: "Reply by", about: "About the product", brandWebsite: "Brand website" };
const labelFor = (key: string) => LABELS[key] ?? key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

function toLead(kind: LeadKind, data: Record<string, unknown>, ctx: LeadContext): Lead {
  const d = Object.fromEntries(Object.entries(data).filter(([k]) => k !== "website"));
  // Quote requests and project briefs share the 3-step form (needs are ids like "design-print").
  const threeStep = kind === "quote-request" || kind === "project-brief";
  const answers = Object.entries(d)
    .map(([k, v]): [string, string] => [k === "needs" && threeStep ? "What they need" : labelFor(k), k === "needs" && threeStep ? str((v as string[]).map((n) => NEED_LABEL[n] ?? n)) : str(v)])
    .filter(([, v]) => v);
  const base = { form: FORM_LABEL[kind], name: str(d.name), email: str(d.email), whatsapp: str(d.whatsapp), company: str(d.company), page: ctx.page, answers };
  switch (kind) {
    case "quote-request":
    case "project-brief":
      return {
        ...base,
        service: str((d.needs as string[] | undefined)?.map((n) => NEED_LABEL[n] ?? n)),
        product: str(d.product),
        packaging: str(d.packaging),
        quantity: str(d.quantity),
        country: str(d.country) || ctx.ipCountry,
        message: [str(d.about), str(d.links) && `Links: ${str(d.links)}`, str(d.source) && `From: ${str(d.source)}`].filter(Boolean).join("\n"),
      };
    case "inline-contact":
      return { ...base, service: str(d.needs), product: "", packaging: "", quantity: "", country: ctx.ipCountry, message: str(d.budget) && `Budget: ${str(d.budget)}` };
    case "newsletter":
      return { ...base, service: "", product: "", packaging: "", quantity: "", country: ctx.ipCountry, message: "" };
  }
}

// ---- Email (Resend REST API; no SDK needed) ----

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
/** wa.me link for the client's number: digits only, country code first. */
const waLink = (num: string) => {
  const digits = num.replace(/\D/g, "");
  return digits.length >= 8 ? `https://wa.me/${digits}` : "";
};

async function sendEmail(msg: { to: string; subject: string; html: string; text: string; replyTo?: string }): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.LEADS_FROM_EMAIL;
  if (!key || !from) {
    console.error("[leads] email skipped: RESEND_API_KEY or LEADS_FROM_EMAIL not set");
    return false;
  }
  try {
    // RESEND_API_URL: only for local tests against a mock server.
    const res = await fetch(process.env.RESEND_API_URL || "https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [msg.to], subject: msg.subject, html: msg.html, text: msg.text, ...(msg.replyTo ? { reply_to: msg.replyTo } : {}) }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) console.error("[leads] Resend error", res.status, await res.text().catch(() => ""));
    return res.ok;
  } catch (e) {
    console.error("[leads] Resend request failed", e);
    return false;
  }
}

function leadEmail(lead: Lead, receivedAt: Date) {
  const subjectTail = lead.service || lead.product;
  const subject = `New ${lead.form.toLowerCase()} – ${lead.name || lead.email}${subjectTail ? ` – ${subjectTail}` : ""}`;
  const wa = waLink(lead.whatsapp);
  const when = receivedAt.toUTCString();
  const rows: Array<[string, string, string?]> = [
    ...lead.answers,
    // Country from the form is already in the answers; otherwise the visitor's country from Vercel.
    ...(lead.answers.some(([l]) => l === "Country") ? [] : ([["Country", lead.country]] as Array<[string, string]>)),
    ["Page", lead.page],
    ["Received", when],
  ];
  const link = (href: string, text: string) => `<a href="${esc(href)}" style="color:#011EFD">${esc(text)}</a>`;
  const cell = (label: string, value: string) => {
    const v = label === "Email" ? link(`mailto:${value}`, value) : label === "WhatsApp" && wa ? link(wa, value) : label === "Page" && /^https?:/.test(value) ? link(value, value) : esc(value).replace(/\n/g, "<br>");
    return `<tr><td style="padding:8px 12px;border-bottom:1px solid #E7EAEC;color:#5E5C66;white-space:nowrap;vertical-align:top">${esc(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #E7EAEC;color:#141317">${v}</td></tr>`;
  };
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#141317">
<h2 style="margin:0 0 4px">${esc(lead.form)}</h2>
<p style="margin:0 0 16px;color:#5E5C66">${esc(when)}</p>
<p style="margin:0 0 16px">${lead.email ? `${link(`mailto:${lead.email}`, `Reply by email`)}` : ""}${wa ? ` &nbsp;·&nbsp; ${link(wa, "Open WhatsApp chat")}` : ""}</p>
<table style="border-collapse:collapse;width:100%;max-width:680px">${rows.filter(([, v]) => v).map(([l, v]) => cell(l, v)).join("")}</table>
</div>`;
  const text = [`${lead.form} – ${when}`, ...rows.filter(([, v]) => v).map(([l, v]) => `${l}: ${v}`), wa && `WhatsApp: ${wa}`].filter(Boolean).join("\n");
  return { subject, html, text };
}

function autoReply(lead: Lead) {
  const first = lead.name.split(" ")[0] || "there";
  const wa = whatsappUrl() ?? "";
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#141317">
<p>Hi ${esc(first)},</p>
<p>Thank you for contacting ${esc(site.name)}. We have your ${esc(lead.form.toLowerCase())} and will reply ${esc(site.facts.quoteReply)}.</p>
<p>You can send any files by replying to this email, or on WhatsApp${site.whatsapp ? ` at <a href="${esc(wa)}" style="color:#011EFD">${esc(site.whatsapp)}</a>` : ""}.</p>
<p>Best regards,<br>${esc(site.name)}</p>
</div>`;
  const text = `Hi ${first},\n\nThank you for contacting ${site.name}. We have your ${lead.form.toLowerCase()} and will reply ${site.facts.quoteReply}.\n\nYou can send any files by replying to this email${site.whatsapp ? `, or on WhatsApp at ${site.whatsapp} (${wa})` : ""}.\n\nBest regards,\n${site.name}`;
  return { subject: `We've received your ${lead.form.toLowerCase()} – ${site.name}`, html, text };
}

// ---- Google Sheet (Apps Script web app) ----

async function appendRow(kind: LeadKind, lead: Lead, receivedAt: Date): Promise<boolean> {
  const url = process.env.LEADS_SHEET_WEBHOOK;
  if (!url) {
    console.error("[leads] sheet skipped: LEADS_SHEET_WEBHOOK not set");
    return false;
  }
  const row = {
    tab: kind === "newsletter" ? "newsletter" : "leads",
    timestamp: receivedAt.toISOString(),
    form: lead.form,
    name: lead.name,
    email: lead.email,
    whatsapp: lead.whatsapp,
    company: lead.company,
    service: lead.service,
    product: lead.product,
    packaging: lead.packaging,
    quantity: lead.quantity,
    country: lead.country,
    message: lead.message,
    page: lead.page,
  };
  try {
    // Apps Script answers with a redirect to the result; fetch follows it.
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(row), signal: AbortSignal.timeout(10_000) });
    const body = await res.text().catch(() => "");
    const ok = res.ok && /"ok"\s*:\s*true/.test(body);
    if (!ok) console.error("[leads] sheet error", res.status, body.slice(0, 300));
    return ok;
  } catch (e) {
    console.error("[leads] sheet request failed", e);
    return false;
  }
}

/** Forms whose sender gets an automatic thank-you email. */
const AUTO_REPLY: LeadKind[] = ["quote-request", "project-brief", "inline-contact"];

/**
 * Delivers a validated submission: lead email + sheet row in parallel, then the auto-reply.
 * Returns true when the lead reached us by at least one route (email or sheet).
 */
export async function deliverLead(kind: LeadKind, data: Record<string, unknown>, ctx: LeadContext): Promise<boolean> {
  const lead = toLead(kind, data, ctx);
  const to = process.env.LEADS_TO_EMAIL;
  const mail = leadEmail(lead, ctx.receivedAt);
  const [emailed, stored] = await Promise.all([
    to ? sendEmail({ to, ...mail, replyTo: lead.email || undefined }) : (console.error("[leads] email skipped: LEADS_TO_EMAIL not set"), Promise.resolve(false)),
    appendRow(kind, lead, ctx.receivedAt),
  ]);
  const delivered = emailed || stored;
  // Only thank the client once we actually have their request.
  if (delivered && lead.email && AUTO_REPLY.includes(kind)) {
    const reply = autoReply(lead);
    const replyTo = to;
    if (!(await sendEmail({ to: lead.email, ...reply, replyTo }))) console.error("[leads] auto-reply failed for", kind);
  }
  if (!delivered) console.error(`[leads] NOT DELIVERED [${kind}]`, { ...data, receivedAt: ctx.receivedAt.toISOString() });
  else if (!emailed || !stored) console.warn(`[leads] partly delivered [${kind}]: email=${emailed} sheet=${stored}`);
  return delivered;
}

/** True when no delivery route is configured at all (local development). */
export const leadsUnconfigured = () => !process.env.RESEND_API_KEY && !process.env.LEADS_SHEET_WEBHOOK;
