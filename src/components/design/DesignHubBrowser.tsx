"use client";

import { Search } from "lucide-react";
import { useId, useMemo, useState, type ReactNode } from "react";
import type { DesignGroup, DesignService } from "@/content/designServices";
import { cn } from "@/lib/utils";

/** `card`: the DesignCard, rendered on the server so the media registry stays out of this client bundle. */
type Item = Pick<DesignService, "slug" | "name" | "short" | "group" | "formats"> & { card: ReactNode };

const TABS: Array<{ id: DesignGroup | "all"; label: string }> = [
  { id: "product", label: "By Product" },
  { id: "format", label: "By Format" },
  { id: "service", label: "By Service" },
  { id: "all", label: "All" },
];

/**
 * Tabs + search over every packaging design service. Without JS the "By Product" group shows;
 * every service is also linked from the menu, footer and sitemap.
 */
export function DesignHubBrowser({ items }: { items: Item[] }) {
  const id = useId();
  const [tab, setTab] = useState<DesignGroup | "all">("product");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const visible = useMemo(() => {
    if (q) {
      // Services whose name matches come first, then those matching only in description or formats.
      const inName = items.filter((s) => s.name.toLowerCase().includes(q));
      const inText = items.filter((s) => !inName.includes(s) && `${s.short} ${s.formats.join(" ")}`.toLowerCase().includes(q));
      return [...inName, ...inText];
    }
    return tab === "all" ? items : items.filter((s) => s.group === tab);
  }, [items, tab, q]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="tablist" aria-label="Group services" className="inline-flex flex-wrap gap-1 rounded-full bg-silver-100 p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={!q && tab === t.id}
              onClick={() => {
                setTab(t.id);
                setQuery("");
              }}
              className={cn("h-10 rounded-full px-4 text-sm font-semibold transition-colors", !q && tab === t.id ? "bg-blue-600 text-white" : "text-ink-900 hover:bg-white")}
            >
              {t.label}
            </button>
          ))}
        </div>
        <label htmlFor={`${id}-q`} className="relative block md:w-80">
          <span className="sr-only">Search packaging design services</span>
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-500" />
          <input
            id={`${id}-q`}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search, e.g. coffee, label, rigid"
            className="h-12 w-full rounded-full border border-silver-300 bg-white pl-12 pr-4 outline-none focus:border-blue-600 focus:shadow-[var(--ring)]"
          />
        </label>
      </div>
      <p aria-live="polite" className="mt-4 text-sm text-ink-500">
        {q ? `${visible.length} services match "${query}"` : `${visible.length} services`}
      </p>
      <div className="mt-6 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {visible.map((s) => (
          <div key={s.slug} className="h-full">{s.card}</div>
        ))}
      </div>
      {visible.length === 0 && (
        <p className="mt-6 rounded-2xl bg-silver-100 p-6 text-ink-500">
          No match. Tell us about your product in a quote request and we will tell you how we can help.
        </p>
      )}
    </div>
  );
}
