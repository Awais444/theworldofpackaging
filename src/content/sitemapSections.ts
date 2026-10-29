import type { MetadataRoute } from "next";
import { designServices } from "@/content/designServices";
import { servicePages } from "@/content/servicePages";
import { posts } from "@/content/blog/posts";
import { caseStudies } from "@/content/caseStudies";
import { industries } from "@/content/industries";
import { printedStyles } from "@/content/printedStyles";
import { rigidStyles } from "@/content/rigidStyles";
import { countries, isIndexable } from "@/content/countries";
import { abs } from "@/lib/schema";

/** One sitemap per site section, served at /sitemap/<id>.xml and listed in the /sitemap.xml index. */
export const SITEMAP_IDS = ["core", "manufacturing", "agency", "industries", "guides", "countries"] as const;
type Id = (typeof SITEMAP_IDS)[number];


const entry = (path: string, priority = 0.6, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
  url: abs(path),
  priority,
  changeFrequency,
});

const sections: Record<Id, () => MetadataRoute.Sitemap> = {
  core: () => [
    entry("/", 1, "weekly"),
    ...["/packages", "/pricing", "/configure", "/about", "/team", "/factory", "/how-it-works", "/shipping", "/faq", "/contact", "/start-a-project", "/get-a-quote"].map((p) => entry(p, 0.8)),
    ...["/privacy", "/terms"].map((p) => entry(p, 0.2, "yearly")),
  ],
  manufacturing: () => [
    ...["/rigid-boxes", "/collapsible-rigid-boxes", "/printed-boxes"].map((p) => entry(p, 0.9, "weekly")),
    ...["/boxes", "/materials", "/finishes", "/inserts"].map((p) => entry(p, 0.6)),
    ...rigidStyles.map((s) => entry(`/rigid-boxes/${s.slug}`, 0.8)),
    ...printedStyles.map((s) => entry(`/printed-boxes/${s.slug}`, 0.7)),
  ],
  agency: () => [
    entry("/packaging-design", 1, "weekly"),
    ...designServices.map((d) => entry(`/packaging-design/${d.slug}`, 0.9)),
    entry("/services", 0.8),
    ...servicePages.map((s) => entry(`/services/${s.path}`, 0.7)),
    entry("/work", 0.8, "weekly"),
    // Sample (placeholder) case studies are noindex, so they stay out of the sitemap.
    ...caseStudies.filter((c) => !c.placeholder).map((c) => entry(`/work/${c.slug}`, 0.7)),
  ],
  industries: () => [entry("/industries", 0.8), ...industries.map((i) => entry(`/industries/${i.slug}`, 0.7))],
  // Only indexable country pages (COUNTRY_PAGES_PLAN.md §7).
  countries: () => [entry("/countries", 0.8), ...countries.filter(isIndexable).map((c) => entry(`/countries/${c.slug}`, c.tier === 1 ? 0.8 : 0.6))],
  guides: () => [
    entry("/blog", 0.7, "weekly"),
    ...posts.map((p) => ({ ...entry(`/blog/${p.slug}`, 0.6), lastModified: new Date(p.date) })),
  ],
};

export function sitemapSection(id: string): MetadataRoute.Sitemap | null {
  return sections[id as Id]?.() ?? null;
}
