"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";
import type { WorkCategory } from "@/content/caseStudies";
import { cn } from "@/lib/utils";

const FILTERS: Array<WorkCategory | "All"> = ["All", "Branding", "Packaging", "Rigid", "Printed"];

type Item = { slug: string; categories: WorkCategory[]; card: ReactNode };

/** Category filter over server-rendered work cards. */
export function WorkFilter({ items }: { items: Item[] }) {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const reduce = useReducedMotion();
  const visible = items.filter((i) => active === "All" || i.categories.includes(active));

  return (
    <>
      <div role="group" aria-label="Filter projects by category" className="inline-flex flex-wrap gap-1 rounded-full bg-silver-100 p-1">
        {FILTERS.map((f) => {
          const count = f === "All" ? items.length : items.filter((i) => i.categories.includes(f)).length;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active === f}
              onClick={() => setActive(f)}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors",
                active === f ? "bg-blue-600 text-white" : "text-ink-900 hover:bg-white",
              )}
            >
              {f}
              <span className="opacity-60">{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} projects shown
      </p>
      <motion.ul layout={!reduce} className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {visible.map((item) => (
            <motion.li
              key={item.slug}
              layout={!reduce}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {item.card}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
