import type { MetadataRoute } from "next";
import { abs } from "@/lib/schema";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/design-system", "/api/", "/cart", "/checkout"] },
      // AI and answer-engine crawlers we want (GEO): same rules, named explicitly.
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bingbot"],
        allow: "/",
        disallow: ["/design-system", "/api/"],
      },
    ],
    sitemap: abs("/sitemap.xml"),
  };
}
