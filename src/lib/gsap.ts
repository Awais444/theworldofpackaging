"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins exactly once, on the client.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export { gsap, ScrollTrigger, useGSAP };
