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
import contentDates from "@/content/contentDates.json";
import { media } from "@/content/media";
import { portfolio } from "@/content/portfolio";

/** One sitemap per site section, served at /sitemap/<id>.xml and listed in the /sitemap.xml index. */
export const SITEMAP_IDS = ["core", "manufacturing", "agency", "industries", "guides", "countries"] as const;
type Id = (typeof SITEMAP_IDS)[number];

/** Latest git commit date among the files a page is built from (scripts/gen-content-dates.mjs). */
const dates = contentDates as Record<string, string>;
const lastMod = (...globs: string[]): Date | undefined => {
  const hits = Object.entries(dates).filter(([file]) => globs.some((g) => (g.endsWith("*") ? file.startsWith(g.slice(0, -1)) : file === g))).map(([, d]) => d);
  return hits.length ? new Date(hits.sort().at(-1)!) : undefined;
};
const pageFile = (p: string) => `src/app${p === "/" ? "" : p}/page.tsx`;
const C = "src/content/";


/** `sources`: content files the page is built from (its own page file is always included). */
const entry = (path: string, priority = 0.6, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly", sources: string[] = []) => ({
  url: abs(path),
  priority,
  changeFrequency,
  lastModified: lastMod(pageFile(path), ...sources),
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
    ...rigidStyles.map((s) => entry(`/rigid-boxes/${s.slug}`, 0.8, "monthly", ["src/app/rigid-boxes/[style]/page.tsx", `${C}rigidStyles.ts`, `${C}boxDetails.ts`, "src/components/boxes/*"])),
    ...printedStyles.map((s) => entry(`/printed-boxes/${s.slug}`, 0.7, "monthly", ["src/app/printed-boxes/[style]/page.tsx", `${C}printedStyles.ts`, `${C}boxDetails.ts`, "src/components/boxes/*"])),
  ],
  agency: () => [
    entry("/packaging-design", 1, "weekly"),
    ...designServices.map((d) => entry(`/packaging-design/${d.slug}`, 0.9, "monthly", ["src/app/packaging-design/[slug]/page.tsx", `${C}designServices*`, "src/components/design/*"])),
    entry("/services", 0.8),
    ...servicePages.map((s) => entry(`/services/${s.path}`, 0.7, "monthly", ["src/app/services/[slug]/page.tsx", `${C}servicePages.ts`, `${C}agencyServices.ts`])),
    entry("/work", 0.8, "weekly", [`${C}caseStudies.ts`, `${C}portfolio.ts`]),
    // Sample (placeholder) case studies are noindex, so they stay out of the sitemap.
    ...caseStudies.filter((c) => !c.placeholder).map((c) => entry(`/work/${c.slug}`, 0.7)),
  ],
  industries: () => [entry("/industries", 0.8, "monthly", [`${C}industries.ts`]), ...industries.map((i) => entry(`/industries/${i.slug}`, 0.7, "monthly", ["src/app/industries/[industry]/page.tsx", `${C}industries.ts`, `${C}industryDetails.ts`]))],
  // Only indexable country pages (COUNTRY_PAGES_PLAN.md §7).
  countries: () => [entry("/countries", 0.8, "monthly", [`${C}countries*`]), ...countries.filter(isIndexable).map((c) => entry(`/countries/${c.slug}`, c.tier === 1 ? 0.8 : 0.6, "monthly", ["src/app/countries/[slug]/page.tsx", `${C}countries*`]))],
  guides: () => [
    entry("/blog", 0.7, "weekly", [`${C}blog/*`]),
    ...posts.map((p) => ({ ...entry(`/blog/${p.slug}`, 0.6), lastModified: new Date(p.reviewed ?? p.date) })),
  ],
};

export function sitemapSection(id: string): MetadataRoute.Sitemap | null {
  return sections[id as Id]?.() ?? null;
}

/** Image sitemap entries: every photo shown on an indexable page (media slots with a photo, plus the /work portfolio). */
export function imageSitemap(): Array<{ page: string; images: Array<{ loc: string; title: string }> }> {
  const indexable = new Set(SITEMAP_IDS.flatMap((id) => sections[id]().map((e) => new URL(e.url).pathname)));
  const byPage = new Map<string, Map<string, string>>();
  const add = (page: string, src: string, title: string) => {
    if (!indexable.has(page)) return;
    if (!byPage.has(page)) byPage.set(page, new Map());
    byPage.get(page)!.set(abs(src), title);
  };
  for (const m of Object.values(media)) {
    if (!m.src) continue;
    add(m.page.split(" ")[0]!, m.src, m.alt);
  }
  for (const p of portfolio) add("/work", p.full, p.alt);
  return [...byPage].map(([page, imgs]) => ({ page: abs(page), images: [...imgs].map(([loc, title]) => ({ loc, title })) }));
}
