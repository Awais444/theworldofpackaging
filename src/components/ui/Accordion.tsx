"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useId, useState } from "react";

export type FaqItem = { q: string; a: string };

/**
 * Accessible FAQ accordion: each row is a button with aria-expanded controlling its panel.
 * Pair with <JsonLd data={faqPage(items)} /> on the page for FAQPage structured data.
 */
export function Accordion({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number | null }) {
  const base = useId();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-silver-300">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btn = `${base}-b${i}`;
        const panel = `${base}-p${i}`;
        return (
          <div key={item.q} className={cn("rounded-xl px-4 transition-colors md:px-5", isOpen && "bg-blue-50")}>
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-[17px] font-semibold leading-snug text-ink-900"
              >
                {item.q}
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-[1.5px] border-blue-600 text-blue-600 transition-transform duration-200",
                    isOpen && "rotate-45",
                  )}
                >
                  <Plus aria-hidden="true" className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  id={panel}
                  role="region"
                  aria-labelledby={btn}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[65ch] pb-6 text-base text-ink-500">{item.a}</p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
