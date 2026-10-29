"use server";

import { projectSchema, quoteRequestSchema } from "@/lib/schemas";
import { handleSubmission, type ActionResult } from "@/lib/submission";

export async function submitProject(input: unknown): Promise<ActionResult> {
  return handleSubmission("project-brief", projectSchema, input);
}

export async function submitQuoteRequest(input: unknown): Promise<ActionResult> {
  return handleSubmission("quote-request", quoteRequestSchema, input);
}
