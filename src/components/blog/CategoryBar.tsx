import Link from "next/link";
import { blogCategories, categoryHref, type BlogCategoryId } from "@/content/blog/categories";
import { cn } from "@/lib/utils";

/** Category pills in one row, sticky under the site header. `active`: the current category, or "all" on /blog. */
export function CategoryBar({ active }: { active: BlogCategoryId | "all" }) {
  const pill = (on: boolean) =>
    cn(
      "inline-flex h-8 shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2.5 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:shadow-[var(--ring)]",
      on ? "border-blue-600 bg-blue-600 text-white" : "border-silver-300 bg-white text-ink-900 hover:border-blue-600",
    );
  return (
    <nav aria-label="Blog categories" className="sticky top-[var(--header-h)] z-30 border-y border-silver-100 bg-white/95 backdrop-blur">
      <div className="container-x">
        {/* One row at every width: scrolls sideways (fading at the edges) when the pills do not fit. 48px tall. */}
        <ul className="blog-pills -mx-4 flex gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none]">
          <li>
            <Link href="/blog" aria-current={active === "all" ? "page" : undefined} className={pill(active === "all")}>
              All
            </Link>
          </li>
          {blogCategories.map((c) => (
            <li key={c.id}>
              <Link href={categoryHref(c.id)} aria-current={active === c.id ? "page" : undefined} className={pill(active === c.id)}>
                <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: active === c.id ? "var(--white)" : c.color }} />
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
