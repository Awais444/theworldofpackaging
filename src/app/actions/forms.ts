"use server";

import { allowSubmission } from "@/lib/rateLimit";
import { checkoutSchema, projectSchema, quoteRequestSchema } from "@/lib/schemas";
import { deliver, handleSubmission, type ActionResult } from "@/lib/submission";

export async function submitProject(input: unknown): Promise<ActionResult> {
  return handleSubmission("project-brief", projectSchema, input);
}

export async function submitQuoteRequest(input: unknown): Promise<ActionResult> {
  return handleSubmission("quote-request", quoteRequestSchema, input);
}

/** Sample / reorder checkout. TODO payment: no payment provider yet; this records an order request for invoicing. */
export async function submitOrderRequest(input: { customer: unknown; items: unknown }): Promise<ActionResult> {
  const parsed = checkoutSchema.safeParse(input.customer);
  if (!parsed.success || !Array.isArray(input.items) || input.items.length === 0) {
    return { ok: false, error: "Check your details and cart." };
  }
  if (!(await allowSubmission("order-request"))) return { ok: false, error: "Too many submissions. Please wait a few minutes." };
  deliver("order-request", { customer: parsed.data, items: input.items });
  return { ok: true };
}
