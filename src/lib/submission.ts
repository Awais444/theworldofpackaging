import type { z } from "zod";
import { allowSubmission } from "./rateLimit";

export type ActionResult = { ok: true } | { ok: false; error: string };

/**
 * Shared server-side handling for every form (CLAUDE.md §10.3):
 * validate, drop honeypot hits, rate limit, then deliver.
 */
export async function handleSubmission<S extends z.ZodType<{ website?: string }>>(kind: string, schema: S, input: unknown, invalidMessage = "Some answers need another look."): Promise<ActionResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false, error: invalidMessage };
  // Bots fill the hidden field; pretend success so they move on.
  if (parsed.data.website) return { ok: true };
  if (!(await allowSubmission(kind))) return { ok: false, error: "Too many submissions. Please wait a few minutes, or email us directly." };
  deliver(kind, parsed.data as Record<string, unknown>);
  return { ok: true };
}

// TODO send via Resend + store in CRM. Logged for now.
export function deliver(kind: string, data: Record<string, unknown>) {
  console.info(`[${kind}]`, { ...data, receivedAt: new Date().toISOString() });
}
