import { llmsFullTxt } from "@/lib/llms";

// /llms-full.txt: plain-text content of the core pages (built from content at build time).
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFullTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
