import type { MetadataRoute } from "next";
import { servicePages } from "@/content/servicePages";
import { posts } from "@/content/blog/posts";
import { caseStudies } from "@/content/caseStudies";
import { industries } from "@/content/industries";
import { printedStyles } from "@/content/printedStyles";
import { rigidStyles } from "@/content/rigidStyles";
import { shipTo } from "@/content/shipTo";
import { abs } from "@/lib/schema";

/** One sitemap per site section, served at /sitemap/<id>.xml and listed in robots.txt. */
export const SITEMAP_IDS = ["core", "manufacturing", "agency", "industries", "guides"] as const;
type Id = (typeof SITEMAP_IDS)[number];

export function generateSitemaps() {
  return SITEMAP_IDS.map((id) => ({ id }));
}

const entry = (path: string, priority = 0.6, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
  url: abs(path),
  priority,
  changeFrequency,
});

const sections: Record<Id, () => MetadataRoute.Sitemap> = {
  core: () => [
    entry("/", 1, "weekly"),
    ...["/packages", "/pricing", "/configure", "/samples", "/about", "/factory", "/how-it-works", "/shipping", "/faq", "/contact", "/start-a-project", "/get-a-quote"].map((p) => entry(p, 0.8)),
    ...shipTo.map((c) => entry(`/ship-to/${c.slug}`, 0.6)),
    ...["/privacy", "/terms"].map((p) => entry(p, 0.2, "yearly")),
  ],
  manufacturing: () => [
    ...["/rigid-boxes", "/collapsible-rigid-boxes", "/printed-boxes"].map((p) => entry(p, 0.9, "weekly")),
    ...["/boxes", "/materials", "/finishes", "/inserts"].map((p) => entry(p, 0.6)),
    ...rigidStyles.map((s) => entry(`/rigid-boxes/${s.slug}`, 0.8)),
    ...printedStyles.map((s) => entry(`/printed-boxes/${s.slug}`, 0.7)),
  ],
  agency: () => [
    entry("/services", 0.9),
    ...servicePages.map((s) => entry(`/services/${s.path}`, 0.7)),
    entry("/work", 0.8, "weekly"),
    // Sample (placeholder) case studies are noindex, so they stay out of the sitemap.
    ...caseStudies.filter((c) => !c.placeholder).map((c) => entry(`/work/${c.slug}`, 0.7)),
  ],
  industries: () => [entry("/industries", 0.8), ...industries.map((i) => entry(`/industries/${i.slug}`, 0.7))],
  guides: () => [
    entry("/blog", 0.7, "weekly"),
    ...posts.map((p) => ({ ...entry(`/blog/${p.slug}`, 0.6), lastModified: new Date(p.date) })),
  ],
};

export default async function sitemap({ id }: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const key = (await id) as Id;
  return sections[key]?.() ?? [];
}
