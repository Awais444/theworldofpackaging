"use server";

import { quoteRequestSchema } from "@/lib/schemas";
import { handleSubmission, type ActionResult } from "@/lib/submission";

/** /get-a-quote. */
export async function submitQuoteRequest(input: unknown): Promise<ActionResult> {
  return handleSubmission("quote-request", quoteRequestSchema, input);
}

/** /start-a-project: the same 3-step form and validation, labelled as a project brief in the lead email and sheet. */
export async function submitProject(input: unknown): Promise<ActionResult> {
  return handleSubmission("project-brief", quoteRequestSchema, input);
}
