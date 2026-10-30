"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Rotating first line of the homepage H1. All phrases sit in one grid cell, so the cell is always the size of
 * the longest one (no layout shift). The first phrase is server-rendered visible; rotation starts after
 * hydration, every 2.5s, and pauses on hover/focus and while the tab is hidden. Reduced motion: never starts.
 * Decorative (aria-hidden): the H1 carries an sr-only sentence.
 */
export function HeroRotator({ phrases, interval = 2500 }: { phrases: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  const paused = useRef(false);
  const root = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    const pause = () => (paused.current = true);
    const resume = () => (paused.current = false);
    el?.addEventListener("pointerenter", pause);
    el?.addEventListener("pointerleave", resume);
    // The rotator is aria-hidden, so focus means a link or button inside the hero heading area.
    const focusRoot = el?.closest("[data-hero-focus]");
    focusRoot?.addEventListener("focusin", pause);
    focusRoot?.addEventListener("focusout", resume);
    const id = window.setInterval(() => {
      if (!paused.current && document.visibilityState === "visible") setI((n) => (n + 1) % phrases.length);
    }, interval);
    return () => {
      window.clearInterval(id);
      el?.removeEventListener("pointerenter", pause);
      el?.removeEventListener("pointerleave", resume);
      focusRoot?.removeEventListener("focusin", pause);
      focusRoot?.removeEventListener("focusout", resume);
    };
  }, [phrases.length, interval]);

  const prev = (i - 1 + phrases.length) % phrases.length;
  return (
    <span ref={root} aria-hidden="true" className="grid">
      {phrases.map((p, n) => (
        <span
          key={p}
          data-state={n === i ? "on" : n === prev ? "out" : "in"}
          className="hero-phrase relative col-start-1 row-start-1 justify-self-start whitespace-nowrap text-orange-600"
        >
          {p}
          <svg viewBox="0 0 200 16" preserveAspectRatio="none" className="absolute -bottom-[0.16em] left-0 h-[0.3em] w-full overflow-visible text-orange-500">
            <path d="M3 11 C 45 3, 110 2, 197 8" fill="none" stroke="currentColor" strokeWidth={5} strokeLinecap="round" />
          </svg>
        </span>
      ))}
    </span>
  );
}
