import Link from "next/link";
import type { Post } from "@/content/blog/posts";
import { countryHref, type Country } from "@/content/countries";
import { FlagBadge } from "@/components/countries/FlagBadge";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** "Related guides" cards used on service, box and industry pages. */
export function GuideCards({ guides, title = "Related guides" }: { guides: Post[]; title?: string }) {
  if (guides.length === 0) return null;
  return (
    <div>
      <SectionHeader eyebrow="Guides" title={title} highlight={title.includes("guides") ? "guides" : "Guides"} />
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link href={`/blog/${g.slug}`} className="block h-full rounded-2xl border border-silver-300 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-600 hover:shadow-md">
              <p className="font-heading text-lg font-bold leading-snug">{g.title}</p>
              <p className="mt-2 text-sm text-ink-500">{g.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** "Popular regions" country links (COUNTRY_PAGES_PLAN.md §6). */
export function RegionLinks({ countries, title = "Popular regions" }: { countries: Country[]; title?: string }) {
  if (countries.length === 0) return null;
  return (
    <div>
      <h2 className="text-h4 font-heading font-bold">{title}</h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {countries.map((c) => (
          <li key={c.slug}>
            <Link href={countryHref(c.slug)} className="inline-flex h-11 items-center gap-2 rounded-full border border-silver-300 bg-white pl-1.5 pr-4 text-sm font-semibold transition-colors hover:border-blue-600 hover:text-blue-600">
              <FlagBadge iso2={c.iso2} size="sm" />
              {c.name}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/countries" className="inline-flex h-11 items-center px-3 text-sm font-semibold text-blue-600 hover:underline">
            All countries →
          </Link>
        </li>
      </ul>
    </div>
  );
}
