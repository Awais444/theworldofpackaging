import { headers } from "next/headers";
import type { z } from "zod";
import { deliverLead, leadsUnconfigured, type LeadKind } from "./leads";
import { allowSubmission } from "./rateLimit";

/** reason "delivery": valid input that we could not deliver; forms then offer WhatsApp. */
export type ActionResult = { ok: true } | { ok: false; error: string; reason?: "invalid" | "rate" | "delivery" };

/**
 * Shared server-side handling for every form (CLAUDE.md §10.3):
 * validate, drop honeypot hits, rate limit, then deliver (email + Google Sheet, see lib/leads.ts).
 * Success is reported only when the lead reached us by email or sheet.
 */
export async function handleSubmission<S extends z.ZodType<{ website?: string }>>(kind: LeadKind, schema: S, input: unknown, invalidMessage = "Some answers need another look."): Promise<ActionResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false, error: invalidMessage, reason: "invalid" };
  // Bots fill the hidden field; pretend success so they move on.
  if (parsed.data.website) return { ok: true };
  if (!(await allowSubmission(kind))) return { ok: false, error: "Too many submissions. Please wait a few minutes, or message us on WhatsApp.", reason: "rate" };

  const h = await headers();
  const data = parsed.data as Record<string, unknown>;
  const ctx = { page: h.get("referer") ?? "", ipCountry: h.get("x-vercel-ip-country") ?? "", receivedAt: new Date() };

  // Local development without keys: log only, so the forms can still be tried. Production always delivers.
  if (leadsUnconfigured() && process.env.NODE_ENV !== "production") {
    console.info(`[${kind}] (not sent: no RESEND_API_KEY or LEADS_SHEET_WEBHOOK)`, { ...data, ...ctx });
    return { ok: true };
  }
  if (await deliverLead(kind, data, ctx)) return { ok: true };
  return { ok: false, error: "We couldn't send your request just now.", reason: "delivery" };
}
