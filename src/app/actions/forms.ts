"use server";

import { checkoutSchema, projectSchema, quoteSchema } from "@/lib/schemas";
import type { ActionResult } from "./contact";

// TODO connect email/CRM (e.g. Resend for notifications + CRM webhook). Logged for now.
function deliver(kind: string, data: Record<string, unknown>) {
  console.info(`[${kind}]`, { ...data, receivedAt: new Date().toISOString() });
}

export async function submitProject(input: unknown): Promise<ActionResult> {
  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Some answers need another look." };
  if (parsed.data.website) return { ok: true };
  deliver("project-brief", parsed.data);
  return { ok: true };
}

export async function submitQuote(input: unknown): Promise<ActionResult> {
  const parsed = quoteSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Some answers need another look." };
  if (parsed.data.website) return { ok: true };
  deliver("quote-request", parsed.data);
  return { ok: true };
}

/** Sample / reorder checkout. TODO payment: no payment provider yet; this records an order request for invoicing. */
export async function submitOrderRequest(input: { customer: unknown; items: unknown }): Promise<ActionResult> {
  const parsed = checkoutSchema.safeParse(input.customer);
  if (!parsed.success || !Array.isArray(input.items) || input.items.length === 0) {
    return { ok: false, error: "Check your details and cart." };
  }
  deliver("order-request", { customer: parsed.data, items: input.items });
  return { ok: true };
}
