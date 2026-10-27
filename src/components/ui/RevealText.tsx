"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type RevealTextProps = {
  /** Plain text. "\n" forces a line break. */
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** Delay in seconds, e.g. to follow another intro animation. */
  delay?: number;
};

/**
 * Word-by-word masked reveal on scroll (own splitter, no paid plugin).
 * Screen readers get the plain text; the full text renders without JS.
 */
export function RevealText({ text, as = "h2", className, delay = 0 }: RevealTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-word]", {
          // Far enough to clear the padded mask, so nothing peeks before the reveal.
          yPercent: 140,
          duration: 0.7,
          ease: "expo.out",
          stagger: 0.035,
          delay,
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const lines = text.split("\n");
  const content = (
    <>
      <span className="sr-only">{text.replace(/\n/g, " ")}</span>
      <span aria-hidden="true">
        {lines.map((line, li) => (
          <span key={li} className="block">
            {line.split(" ").map((word, wi, words) => (
              <span key={wi}>
                {/* Mask padded beyond the tight display line-height so caps and accents are never clipped;
                    negative margins keep the line spacing unchanged. */}
                <span className="-my-[0.18em] inline-block overflow-hidden py-[0.18em] align-bottom">
                  <span data-word className="inline-block will-change-transform">
                    {word}
                  </span>
                </span>
                {wi < words.length - 1 && " "}
              </span>
            ))}
          </span>
        ))}
      </span>
    </>
  );

  // One element type for typing; all allowed tags share the same DOM API used here.
  const Tag = as as "h2";
  return (
    <Tag ref={ref} className={className}>
      {content}
    </Tag>
  );
}
