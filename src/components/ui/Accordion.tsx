"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
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
    <div className="divide-y divide-silver-300 border-y border-silver-300">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btn = `${base}-b${i}`;
        const panel = `${base}-p${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-heading text-lg font-semibold tracking-tight"
              >
                {item.q}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                  {isOpen ? <Minus aria-hidden="true" className="h-4 w-4" /> : <Plus aria-hidden="true" className="h-4 w-4" />}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panel}
                  role="region"
                  aria-labelledby={btn}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 text-ink-500">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
