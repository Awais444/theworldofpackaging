"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type WorkType = { id: string; label: string };
export type WorkItem = { slug: string; types: string[]; industry: string; card: ReactNode };

const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const MIN = 2;
const URL_EVENT = "work-filter-change";
const subscribe = (cb: () => void) => {
  window.addEventListener("popstate", cb);
  window.addEventListener(URL_EVENT, cb);
  return () => {
    window.removeEventListener("popstate", cb);
    window.removeEventListener(URL_EVENT, cb);
  };
};

const pill = "inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-[14px] font-semibold transition-colors focus-visible:outline-none focus-visible:shadow-[var(--ring)]";
const pillState = (on: boolean) => (on ? "border-blue-600 bg-blue-600 text-white" : "border-silver-300 bg-white text-ink-900 hover:bg-blue-50");

/**
 * /work filters: type pills + industry (dropdown on desktop, scroll chips on mobile).
 * Client-side over a statically rendered list; state mirrors ?type=&industry= so views can be shared.
 * Options with fewer than 2 projects are hidden. No counts are shown.
 */
export function WorkFilter({ items, types, quoteHref }: { items: WorkItem[]; types: WorkType[]; quoteHref: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [stuck, setStuck] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const typeOptions = useMemo(() => types.filter((t) => items.filter((i) => i.types.includes(t.id)).length >= MIN), [items, types]);
  const industryOptions = useMemo(() => {
    const names = [...new Set(items.map((i) => i.industry))];
    return names.filter((n) => items.filter((i) => i.industry === n).length >= MIN).sort().map((n) => ({ id: slugify(n), label: n }));
  }, [items]);

  // Filters live in the URL (?type=&industry=). The server snapshot is empty, so the static HTML shows all projects.
  const search = useSyncExternalStore(subscribe, () => window.location.search, () => "");
  const q = new URLSearchParams(search);
  const type = typeOptions.some((o) => o.id === q.get("type")) ? q.get("type")! : "all";
  const industry = industryOptions.some((o) => o.id === q.get("industry")) ? q.get("industry")! : "all";

  const update = (nextType: string, nextIndustry: string) => {
    const next = new URLSearchParams();
    if (nextType !== "all") next.set("type", nextType);
    if (nextIndustry !== "all") next.set("industry", nextIndustry);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    // Next updates history.replaceState without an event; update the URL now and notify subscribers.
    window.history.replaceState(window.history.state, "", qs ? `${pathname}?${qs}` : pathname);
    window.dispatchEvent(new Event(URL_EVENT));
  };

  // White background + border only while the bar is stuck under the header.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setStuck(!e!.isIntersecting), { rootMargin: "-77px 0px 0px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const industryLabel = industryOptions.find((o) => o.id === industry)?.label;
  const visible = items.filter((i) => (type === "all" || i.types.includes(type)) && (industry === "all" || slugify(i.industry) === industry));
  const active = type !== "all" || industry !== "all";

  return (
    <>
      <div ref={sentinel} aria-hidden="true" />
      <div className={cn("sticky top-[var(--header-h)] z-30 -mx-4 border-b px-4 py-3 transition-colors md:-mx-6 md:px-6", stuck ? "border-silver-300 bg-white" : "border-transparent bg-white")}>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter by type" className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0">
            {[{ id: "all", label: "All" }, ...typeOptions].map((t) => (
              <button key={t.id} type="button" aria-pressed={type === t.id} onClick={() => update(t.id, industry)} className={cn(pill, pillState(type === t.id))}>
                {t.label}
              </button>
            ))}
          </div>

          {industryOptions.length > 0 && (
            <>
              {/* Desktop: dropdown */}
              <label className="relative hidden lg:block">
                <span className="sr-only">Filter by industry</span>
                <select
                  value={industry}
                  onChange={(e) => update(type, e.target.value)}
                  className={cn(pill, pillState(industry !== "all"), "cursor-pointer appearance-none pr-10")}
                >
                  <option value="all">All industries</option>
                  {industryOptions.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" className={cn("pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2", industry !== "all" ? "text-white" : "text-ink-500")} />
              </label>
              {/* Mobile: horizontal scroll chips */}
              <div role="group" aria-label="Filter by industry" className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] lg:hidden">
                {[{ id: "all", label: "All industries" }, ...industryOptions].map((o) => (
                  <button key={o.id} type="button" aria-pressed={industry === o.id} onClick={() => update(type, o.id)} className={cn(pill, pillState(industry === o.id))}>
                    {o.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-1 min-h-6 text-sm">
        <p className="sr-only" aria-live="polite">
          {visible.length} projects shown{industryLabel ? ` in ${industryLabel}` : ""}
        </p>
        {active && (
          <button type="button" onClick={() => update("all", "all")} className="font-semibold text-blue-600 underline-offset-4 hover:underline">
            Clear filters
          </button>
        )}
      </div>

      <motion.ul layout={!reduce} className="mt-3 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((item) => (
            <motion.li
              key={item.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {item.card}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <div className="rounded-3xl bg-silver-50 p-10 text-center">
          <p className="font-heading text-h4">No projects match these filters yet.</p>
          <p className="mt-2 text-ink-500">Tell us what you are making and we will send examples in your category.</p>
          <Link href={quoteHref} className="mt-4 inline-block font-semibold text-blue-600 underline-offset-4 hover:underline">
            Get a Quote →
          </Link>
        </div>
      )}
    </>
  );
}
