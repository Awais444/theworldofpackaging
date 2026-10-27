"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/** Lenis smooth scrolling, synced with ScrollTrigger. Off under reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
  return null;
}
