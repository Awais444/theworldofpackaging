"use client";

import { Search, X } from "lucide-react";
import Link from "next/link";
import { useId, useMemo, useState } from "react";

export type SearchPost = { slug: string; title: string; description: string; tags: string[]; category: string; color: string };

/** Client-side search over post title, excerpt and tags. Results show under the box; the hub stays below. */
export function BlogSearch({ posts }: { posts: SearchPost[] }) {
  const id = useId();
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return posts.filter((p) => {
      const hay = `${p.title} ${p.description} ${p.tags.join(" ")} ${p.category}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [q, posts]);

  return (
    <div role="search" className="max-w-xl">
      <label htmlFor={id} className="sr-only">
        Search the guides
      </label>
      <div className="relative">
        <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
        <input
          id={id}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search guides, e.g. dieline, FDA, foil"
          autoComplete="off"
          className="h-12 w-full rounded-full border border-silver-300 bg-white pl-12 pr-12 text-base outline-none transition focus:border-blue-600 focus:shadow-[var(--ring)] [&::-webkit-search-cancel-button]:hidden"
        />
        {q && (
          <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-ink-500 hover:bg-silver-100">
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        )}
      </div>
      {q.trim() && (
        <div className="mt-3 rounded-2xl border border-silver-300 bg-white p-2 shadow-md">
          <p aria-live="polite" className="px-3 py-2 text-sm text-ink-500">
            {results.length === 0 ? "No guides match. Try another word." : `${results.length} ${results.length === 1 ? "guide" : "guides"}`}
          </p>
          {results.length > 0 && (
            <ul className="max-h-[360px] overflow-y-auto">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="block rounded-xl px-3 py-2.5 hover:bg-silver-50 focus-visible:outline-none focus-visible:shadow-[var(--ring)]">
                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-ink-500">
                      <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                      {p.category}
                    </span>
                    <span className="mt-0.5 block font-semibold text-ink-900">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
