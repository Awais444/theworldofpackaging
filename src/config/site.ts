import type { ProofItem } from "@/components/home/ProofBar";

/**
 * Single place for name, contact details and confirmed business facts (CLAUDE.md §3).
 * Metadata, footer, JSON-LD, OG images and copy all read from here.
 * Anything marked TODO is a placeholder to confirm before launch.
 */

export type CurrencyCode = "USD" | "GBP" | "EUR" | "CAD" | "AUD" | "AED";

const QUOTE_REPLY_HOURS = 24; // TODO confirm

/**
 * Approximate transit times by region, after dispatch from our factory. Shown as "Approx." everywhere.
 * Per-country values in content/countries*.ts override these. TODO: confirm with shipping agent.
 */
export const shippingByRegion: Record<string, { air: string; sea: string }> = {
  "Middle East": { air: "3–5 days", sea: "10–20 days" },
  Europe: { air: "5–8 days", sea: "25–35 days" },
  "North America": { air: "6–10 days", sea: "30–45 days" },
  Oceania: { air: "7–10 days", sea: "30–40 days" },
  Asia: { air: "4–7 days", sea: "15–30 days" },
  Africa: { air: "7–12 days", sea: "30–50 days" },
  "Latin America": { air: "7–12 days", sea: "30–50 days" },
};

/** Note shown with approximate transit times. */
export const shippingNote = "Transit time after dispatch. Exact time and cost confirmed with your quote.";

export const site = {
  name: "The World of Packaging",
  shortName: "TWOP",
  tagline: "Packaging design and manufacturing under one roof.",
  pitch: "Packaging design and manufacturing under one roof: from first sketch to delivered box.",
  description:
    "Packaging design and branding agency with its own factory. Rigid boxes, collapsible rigid boxes and printed boxes, designed and made in-house and shipped worldwide.",
  url: "https://theworldofpackaging.com", // TODO confirm
  email: "hello@theworldofpackaging.com", // TODO confirm
  // Contact details stay hidden on the site while null. TODO: real values.
  whatsapp: null as string | null, // e.g. "+92 300 1234567"
  phone: null as string | null,
  address: null as string | null, // e.g. "Plot 12, Industrial Area, Lahore, Pakistan"
  hours: null as string | null, // e.g. "Mon–Sat, 9:00–18:00 PKT"
  country: "Pakistan",
  markets: ["USA", "UK", "Canada", "Australia", "UAE", "EU"],
  socials: { instagram: "", linkedin: "", facebook: "", pinterest: "", behance: "" }, // TODO
  facts: {
    rigidMoq: 500,
    collapsibleMoq: 500,
    printedMoq: null as number | null, // TODO
    rigidLeadTime: "TODO", // e.g. "3–4 weeks"
    printedLeadTime: "TODO",
    quoteReply: `within ${QUOTE_REPLY_HOURS} hours`,
    quoteReplyHours: QUOTE_REPLY_HOURS,
    firstConceptHours: 48, // TODO confirm
    /** Working days from approved artwork to a finished sample. null = hidden. TODO */
    sampleDays: null as number | null,
  },
  currency: {
    base: "USD" as CurrencyCode,
    // TODO: static display rates for the configurator, update periodically. 1 USD = rate.
    rates: { USD: 1, GBP: 0.79, EUR: 0.92, CAD: 1.37, AUD: 1.52, AED: 3.67 } satisfies Record<CurrencyCode, number>,
  },
} as const;

export type Site = typeof site;

/** Lead time for display; neutral wording until the real figure is set. */
export function leadTimeLabel(value: string = site.facts.rigidLeadTime) {
  return value === "TODO" ? "Confirmed with your quote" : value;
}

/** WhatsApp click-to-chat URL, or null while no real number is configured. */
export function whatsappUrl(message?: string): string | null {
  if (!site.whatsapp) return null;
  const digits = site.whatsapp.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

/** Pre-filled WhatsApp message naming the page, e.g. "Hi, I'd like a quote for Magnetic Closure Boxes." */
export const whatsappMessage = (topic?: string) => (topic ? `Hi, I'd like a quote for ${topic}.` : "Hi, I'd like to ask about custom packaging.");

/** Stats built only from confirmed facts; null facts are skipped. */
export function factStats(): Array<{ value: string; label: string }> {
  const f = site.facts;
  return [
    { value: String(f.rigidMoq), label: "Minimum order, rigid boxes" },
    { value: `${f.quoteReplyHours} h`, label: "Quote reply time" },
    { value: `${f.firstConceptHours} h`, label: "To first design concepts" },
    f.sampleDays ? { value: `${f.sampleDays} days`, label: "To a physical sample" } : null,
    f.printedMoq ? { value: String(f.printedMoq), label: "Minimum order, printed boxes" } : null,
  ].filter((x): x is { value: string; label: string } => Boolean(x));
}

/** Homepage proof bar items from confirmed facts; null facts are skipped so the grid re-balances. */
export function proofItems(): ProofItem[] {
  const f = site.facts as { rigidMoq: number | null; quoteReplyHours: number | null; firstConceptHours: number | null };
  const items: Array<ProofItem | null> = [
    f.rigidMoq ? { icon: "package", number: f.rigidMoq, label: "Minimum order, rigid boxes" } : null,
    f.quoteReplyHours ? { icon: "clock", number: f.quoteReplyHours, unit: "h", label: "Quote reply time" } : null,
    f.firstConceptHours ? { icon: "pen", number: f.firstConceptHours, unit: "h", label: "First design concepts" } : null,
    { icon: "factory", text: "Own factory", label: "Designed and made in-house" },
  ];
  return items.filter((x): x is ProofItem => Boolean(x));
}

/** Customer-facing promises in display order; null facts are skipped. */
export function promises(): string[] {
  const f = site.facts;
  return [
    `Quote reply ${f.quoteReply}`,
    `First concepts in ${f.firstConceptHours} hours`,
    f.sampleDays ? `Sample in ${f.sampleDays} working days` : null,
  ].filter((p): p is string => Boolean(p));
}

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/$/, "");
}
