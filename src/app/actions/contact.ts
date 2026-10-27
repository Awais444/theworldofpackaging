"use server";

import { inlineContactSchema } from "@/lib/schemas";

export type ActionResult = { ok: true } | { ok: false; error: string };

/** Short homepage enquiry. Validates on the server; delivery is not wired up yet. */
export async function submitInlineContact(input: unknown): Promise<ActionResult> {
  const parsed = inlineContactSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Please check the form and try again." };
  // Bots fill the hidden field; pretend success so they move on.
  if (parsed.data.website) return { ok: true };

  // TODO connect email/CRM (e.g. Resend + CRM webhook). Logged for now.
  console.info("[inline-contact]", { ...parsed.data, receivedAt: new Date().toISOString() });
  return { ok: true };
}
