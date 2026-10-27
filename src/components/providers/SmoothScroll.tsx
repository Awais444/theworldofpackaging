"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger, REDUCED_MOTION_QUERY } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);

/** The active Lenis instance, or null when smooth scroll is off (reduced motion, SSR). */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Lenis smooth scrolling driven by the GSAP ticker so ScrollTrigger stays in sync.
 * Disabled entirely when the visitor prefers reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    let instance: Lenis | null = null;
    const tick = (time: number) => instance?.raf(time * 1000);

    const start = () => {
      instance = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
      instance.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(instance);
    };
    const stop = () => {
      gsap.ticker.remove(tick);
      instance?.destroy();
      instance = null;
      setLenis(null);
    };
    const onChange = () => {
      if (mq.matches) stop();
      else start();
      ScrollTrigger.refresh();
    };

    if (!mq.matches) start();
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
