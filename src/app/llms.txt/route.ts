import { llmsTxt } from "@/lib/llms";

// /llms.txt: company summary and key URLs for AI assistants (built from content at build time).
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
