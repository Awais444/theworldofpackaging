import type { MetadataRoute } from "next";
import { abs } from "@/lib/schema";
import { SITEMAP_IDS } from "./sitemap";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/cart", "/checkout", "/design-system", "/api/"] }],
    sitemap: SITEMAP_IDS.map((id) => abs(`/sitemap/${id}.xml`)),
  };
}
