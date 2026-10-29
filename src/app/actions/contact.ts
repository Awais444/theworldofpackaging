"use server";

import { inlineContactSchema, newsletterSchema } from "@/lib/schemas";
import { handleSubmission, type ActionResult } from "@/lib/submission";

export type { ActionResult };

/** Short enquiry used on the contact page and elsewhere. */
export async function submitInlineContact(input: unknown): Promise<ActionResult> {
  return handleSubmission("inline-contact", inlineContactSchema, input, "Please check the form and try again.");
}

/** Footer newsletter sign-up. */
export async function submitNewsletter(input: unknown): Promise<ActionResult> {
  return handleSubmission("newsletter", newsletterSchema, input, "Please enter a valid email.");
}
