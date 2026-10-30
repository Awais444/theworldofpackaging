"use client";

import { useEffect, type RefObject } from "react";

type Gsap = typeof import("@/lib/gsap");

/**
 * Runs a GSAP setup only when `ref` comes near the viewport, loading GSAP + ScrollTrigger with a
 * dynamic import at that point (not in the page's first-load JS). The setup may return a cleanup.
 * Skipped entirely with reduced motion: content is already in its final state without it.
 */
export function useLazyGsap(ref: RefObject<HTMLElement | null>, setup: (g: Gsap, root: HTMLElement) => void | (() => void), rootMargin = "300px 0px") {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup: void | (() => void);
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    const io = new IntersectionObserver(
      async ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        const g = await import("@/lib/gsap");
        if (cancelled) return;
        ctx = g.gsap.context(() => {
          cleanup = setup(g, el);
        }, el);
      },
      { rootMargin },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      if (typeof cleanup === "function") cleanup();
      ctx?.revert();
    };
    // setup is defined inline by callers; running it once per mount is intended.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, rootMargin]);
}
