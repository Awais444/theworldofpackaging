"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "on" | "out" | "pre";

/**
 * Rotating word in the homepage H1. An invisible copy of the longest word reserves the width; the visible
 * word sits on top in a clipped box (overflow hidden), so only one word is ever visible: the outgoing word
 * slides up and fades (0.25s), then the next slides in from below (0.3s). The first word is server-rendered
 * visible. Rotation pauses on hover, on focus inside [data-hero-focus], and while the tab is hidden.
 * Reduced motion: never starts. Decorative (aria-hidden): the H1 carries an sr-only sentence.
 */
export function HeroRotator({ words, interval = 2400 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<Phase>("on");
  const paused = useRef(false);
  const root = useRef<HTMLSpanElement>(null);
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a));

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
    const timers: number[] = [];
    const id = window.setInterval(() => {
      if (paused.current || document.visibilityState !== "visible") return;
      setPhase("out");
      timers.push(
        window.setTimeout(() => {
          setI((n) => (n + 1) % words.length);
          setPhase("pre");
          // Two frames so the "pre" position is painted before the transition to "on" starts.
          requestAnimationFrame(() => requestAnimationFrame(() => setPhase("on")));
        }, 250),
      );
    }, interval);
    return () => {
      window.clearInterval(id);
      timers.forEach(clearTimeout);
      el?.removeEventListener("pointerenter", pause);
      el?.removeEventListener("pointerleave", resume);
      focusRoot?.removeEventListener("focusin", pause);
      focusRoot?.removeEventListener("focusout", resume);
    };
  }, [words.length, interval]);

  return (
    <span ref={root} aria-hidden="true" className="relative inline-block overflow-hidden whitespace-nowrap pb-[0.12em] align-bottom leading-[1.1]">
      <span className="invisible">{longest}</span>
      <span data-phase={phase} className="hero-word absolute left-0 top-0 text-orange-600">
        {words[i]}
      </span>
    </span>
  );
}
