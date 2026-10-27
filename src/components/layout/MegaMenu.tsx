"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import type { NavLink } from "@/content/navigation";
import { SpecLabel } from "@/components/ui/SpecLabel";

type MegaMenuProps = {
  id: string;
  open: boolean;
  items: NavLink[];
  /** Server-rendered feature block (image + facts). */
  feature: ReactNode;
  onNavigate: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
};

export function MegaMenu({ id, open, items, feature, onNavigate, onPointerEnter, onPointerLeave }: MegaMenuProps) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id={id}
          key="mega"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          className="absolute inset-x-0 top-full border-b border-line bg-surface"
        >
          <div className="container-x grid-editorial py-10">
            <div className="col-span-12 lg:col-span-7">
              <SpecLabel items={["Manufacturing", "Own factory"]} as="p" className="mb-4" />
              <ul className="border-t border-line">
                {items.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-dashed border-line"
                  >
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className="group flex items-baseline justify-between gap-6 py-3"
                    >
                      <span className="type-display text-3xl transition-transform duration-300 ease-[var(--ease-press)] group-hover:translate-x-2 xl:text-4xl">
                        {item.label}
                      </span>
                      {item.spec && <span className="spec text-muted group-hover:text-fg">{item.spec}</span>}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="col-span-12 hidden lg:col-span-4 lg:col-start-9 lg:block">{feature}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
