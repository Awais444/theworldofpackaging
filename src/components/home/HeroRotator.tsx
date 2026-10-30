"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Rotating word in the homepage H1. All words sit in one grid cell, so the cell is always the size of the
 * longest one (no reflow). The first word is server-rendered visible; rotation starts after hydration and
 * pauses on hover, on focus inside [data-hero-focus], and while the tab is hidden. Reduced motion: never starts.
 * Decorative (aria-hidden): the H1 carries an sr-only sentence.
 */
export function HeroRotator({ words, interval = 2400 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  const paused = useRef(false);
  const root = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    const focusRoot = el?.closest("[data-hero-focus]");
    const pause = () => (paused.current = true);
    const resume = () => (paused.current = false);
    el?.addEventListener("pointerenter", pause);
    el?.addEventListener("pointerleave", resume);
    focusRoot?.addEventListener("focusin", pause);
    focusRoot?.addEventListener("focusout", resume);
    const id = window.setInterval(() => {
      if (!paused.current && document.visibilityState === "visible") setI((n) => (n + 1) % words.length);
    }, interval);
    return () => {
      window.clearInterval(id);
      el?.removeEventListener("pointerenter", pause);
      el?.removeEventListener("pointerleave", resume);
      focusRoot?.removeEventListener("focusin", pause);
      focusRoot?.removeEventListener("focusout", resume);
    };
  }, [words.length, interval]);

  const prev = (i - 1 + words.length) % words.length;
  return (
    <span ref={root} aria-hidden="true" className="inline-grid">
      {words.map((w, n) => (
        <span
          key={w}
          data-state={n === i ? "on" : n === prev ? "out" : "in"}
          className="hero-phrase col-start-1 row-start-1 justify-self-start text-orange-600 lg:whitespace-nowrap"
        >
          {w}
        </span>
      ))}
    </span>
  );
}
