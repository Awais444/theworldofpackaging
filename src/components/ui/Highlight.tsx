"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The signature highlight: one key word in Hot Orange with a soft orange swoosh
 * underline that draws when scrolled into view. Max once per heading.
 * The swoosh is fully drawn without JS and with reduced motion.
 */
export function Highlight({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline-block whitespace-nowrap text-orange-text [.on-dark_&]:text-white">
      {children}
      <svg viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true" className="absolute -bottom-[0.18em] left-0 h-[0.32em] w-full overflow-visible text-orange-500">
        <motion.path
          d="M3 11 C 45 3, 110 2, 197 8"
          fill="none"
          stroke="currentColor"
          strokeWidth={5}
          strokeLinecap="round"
          strokeOpacity={0.7}
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </svg>
    </span>
  );
}

