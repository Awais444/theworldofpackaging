"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useInViewOnce } from "@/lib/useInViewOnce";

/**
 * The signature highlight: one key word in orange-700 (#C25400, AA on light backgrounds) with a Hot Orange (#FF7001)
 * swoosh underline that draws when scrolled into view. Max once per heading.
 * CSS only (stroke-dashoffset transition, see .swoosh in globals.css): no animation library on every page.
 * Reduced motion and no-JS show the swoosh fully drawn.
 */
export function Highlight({ children }: { children: ReactNode }) {
  const [ref, inView] = useInViewOnce<HTMLSpanElement>();
  const [armed, setArmed] = useState(false);
  // Animate only headings still below the fold on load; ones already on screen stay drawn.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top > window.innerHeight) requestAnimationFrame(() => setArmed(true));
  }, [ref]);
  return (
    <span ref={ref} data-armed={armed || undefined} data-drawn={inView || undefined} className="swoosh relative inline-block whitespace-nowrap text-orange-700 [.on-dark_&]:text-white">
      {children}
      <svg viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true" className="absolute -bottom-[0.18em] left-0 h-[0.32em] w-full overflow-visible text-orange-500">
        <path d="M3 11 C 45 3, 110 2, 197 8" pathLength={1} fill="none" stroke="currentColor" strokeWidth={5} strokeLinecap="round" />
      </svg>
    </span>
  );
}
