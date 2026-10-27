"use client";

import { motion, useAnimationControls, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Subtle fade + slide-up when scrolled into view. Content renders visible on the
 * server and without JS; only elements still below the fold on mount are hidden
 * and then revealed, so nothing on screen ever flickers.
 */
export function FadeIn({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const controls = useAnimationControls();
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (reduce || !ref.current) return;
    if (ref.current.getBoundingClientRect().top > window.innerHeight) controls.set({ opacity: 0, y: 24 });
  }, [reduce, controls]);

  useEffect(() => {
    if (inView) void controls.start({ opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } });
  }, [inView, controls, delay]);

  return (
    <motion.div ref={ref} animate={controls} initial={false} className={className}>
      {children}
    </motion.div>
  );
}
