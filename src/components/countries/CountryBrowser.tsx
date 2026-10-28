"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useId, useMemo, useState } from "react";
import type { Region } from "@/content/countries";
import { cn } from "@/lib/utils";
import { FlagBadge } from "./FlagBadge";

type Item = { slug: string; name: string; iso2: string; region: Region };

/** Search and region tabs over every country page. Without JS every country shows, grouped by region. */
export function CountryBrowser({ items, regions }: { items: Item[]; regions: Region[] }) {
  const id = useId();
  const [region, setRegion] = useState<Region | "All">("All");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const groups = useMemo(() => {
    const visible = items.filter((c) => (region === "All" || c.region === region) && (!q || c.name.toLowerCase().includes(q)));
    return regions
      .map((r) => ({ region: r, list: visible.filter((c) => c.region === r).sort((a, b) => a.name.localeCompare(b.name)) }))
      .filter((g) => g.list.length > 0);
  }, [items, regions, region, q]);

  const count = groups.reduce((n, g) => n + g.list.length, 0);
  const tabs: Array<Region | "All"> = ["All", ...regions.filter((r) => items.some((c) => c.region === r))];

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Filter by region" className="inline-flex flex-wrap gap-1 rounded-full bg-silver-100 p-1">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={region === t}
              onClick={() => setRegion(t)}
              className={cn("h-10 rounded-full px-4 text-sm font-semibold transition-colors", region === t ? "bg-blue-600 text-white" : "text-ink-900 hover:bg-white")}
            >
              {t}
            </button>
          ))}
        </div>
        <label htmlFor={`${id}-q`} className="relative block lg:w-80">
          <span className="sr-only">Search countries</span>
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-500" />
          <input
            id={`${id}-q`}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for your country"
            className="h-12 w-full rounded-full border border-silver-300 bg-white pl-12 pr-4 outline-none focus:border-blue-600 focus:shadow-[var(--ring)]"
          />
        </label>
      </div>
      <p aria-live="polite" className="mt-4 text-sm text-ink-500">
        {count} {count === 1 ? "country" : "countries"}
      </p>
      <div className="mt-6 space-y-10">
        {groups.map((g) => (
          <section key={g.region} aria-labelledby={`${id}-${g.region}`}>
            <h3 id={`${id}-${g.region}`} className="text-eyebrow text-blue-600">
              {g.region}
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {g.list.map((c) => (
                <li key={c.slug}>
                  <Link href={`/countries/${c.slug}`} className="flex items-center gap-3 rounded-2xl border border-silver-300 p-3 font-semibold transition hover:border-blue-600 hover:text-blue-600">
                    <FlagBadge iso2={c.iso2} size="sm" />
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {count === 0 && <p className="rounded-2xl bg-silver-100 p-6 text-ink-500">No match. We ship worldwide; ask us about your country in a quote request.</p>}
      </div>
    </div>
  );
}
