"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The signature highlight: one key word in orange-600 (#E66400) with a Hot Orange (#FF7001)
 * swoosh underline that draws when scrolled into view. Max once per heading.
 * The swoosh is fully drawn with reduced motion. The in-view trigger sits on the wrapping
 * span: an observer on the SVG path itself does not fire reliably.
 */
export function Highlight({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="relative inline-block whitespace-nowrap text-orange-600 [.on-dark_&]:text-white"
      initial={reduce ? "drawn" : "hidden"}
      whileInView="drawn"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
      <svg viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true" className="absolute -bottom-[0.18em] left-0 h-[0.32em] w-full overflow-visible text-orange-500">
        <motion.path
          d="M3 11 C 45 3, 110 2, 197 8"
          fill="none"
          stroke="currentColor"
          strokeWidth={5}
          strokeLinecap="round"
          variants={{ hidden: { pathLength: 0 }, drawn: { pathLength: 1 } }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </svg>
    </motion.span>
  );
}
