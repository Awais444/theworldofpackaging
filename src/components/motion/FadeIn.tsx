"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInViewOnce } from "@/lib/useInViewOnce";

/**
 * Subtle fade + slide-up when scrolled into view (CSS transition, no animation library).
 * Content renders visible on the server and without JS; only elements still below the fold on
 * mount are hidden and then revealed, so nothing on screen ever flickers. Off with reduced motion.
 */
export function FadeIn({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>();
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only hide what is still below the fold when the page loads.
    if (el.getBoundingClientRect().top > window.innerHeight) requestAnimationFrame(() => setArmed(true));
  }, [ref]);

  const hidden = armed && !inView;
  const style: CSSProperties | undefined = armed ? { transitionDelay: `${delay}s` } : undefined;
  return (
    <div ref={ref} style={style} className={cn(armed && "transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]", hidden && "translate-y-6 opacity-0", className)}>
      {children}
    </div>
  );
}
