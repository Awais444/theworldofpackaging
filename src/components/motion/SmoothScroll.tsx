"use client";

import { useEffect } from "react";

/**
 * Lenis smooth scrolling, loaded after first paint (idle) and only on devices with a fine pointer.
 * Off with reduced motion and on touch devices. Lenis drives native scroll, so ScrollTrigger
 * (where a page uses it) updates from the normal scroll event; no GSAP import here.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let destroy: (() => void) | undefined;
    let cancelled = false;
    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      const lenis = new Lenis({ anchors: true });
      let frame = requestAnimationFrame(function raf(time) {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      });
      destroy = () => {
        cancelAnimationFrame(frame);
        lenis.destroy();
      };
    };
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
    const handle = idle(() => void start());
    return () => {
      cancelled = true;
      (window.cancelIdleCallback ?? window.clearTimeout)(handle as number);
      destroy?.();
    };
  }, []);
  return null;
}
