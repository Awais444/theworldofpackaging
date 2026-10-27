"use client";

import { useRef, useState } from "react";
import { illustrations, type IllustrationKey } from "@/components/illustrations";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const stages: Array<{ key: IllustrationKey; title: string; text: string; variant?: string }> = [
  { key: "collapsible-flat", title: "Shipped flat", text: "Boxes leave our line folded, stacked tight in export cartons." },
  { key: "magnetic-open", title: "Walls lift up", text: "Raise the hinged walls and they lock upright. No glue, no tools." },
  { key: "collapsible-assembled", title: "A rigid box again", text: "Close the magnetic lid. It looks and feels like a fixed rigid box." },
];

/**
 * Signature pinned sequence: flat → walls up → assembled.
 * Without JS, with reduced motion, or on small screens the three stages show side by side.
 */
export function CollapsibleSequence() {
  const root = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        setPinned(true);
        return () => setPinned(false);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (!pinned || !root.current) return;
      const art = gsap.utils.toArray<HTMLElement>("[data-stage-art]");
      const copy = gsap.utils.toArray<HTMLElement>("[data-stage-copy]");
      const dots = gsap.utils.toArray<HTMLElement>("[data-stage-dot]");
      gsap.set([...art.slice(1), ...copy.slice(1)], { autoAlpha: 0 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: `+=${window.innerHeight * 1.6}`, pin: true, scrub: 0.6 },
      });
      for (let i = 1; i < stages.length; i++) {
        tl.to([art[i - 1], copy[i - 1]], { autoAlpha: 0, y: -24, duration: 0.5 })
          .fromTo(art[i]!, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.6 }, "<0.2")
          .fromTo(copy[i]!, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "<")
          .to(dots[i]!, { backgroundColor: "var(--orange-500)", duration: 0.2 }, "<");
      }
    },
    { scope: root, dependencies: [pinned] },
  );

  return (
    <div ref={root} className={cn("bg-blue-900 text-white", pinned && "flex h-screen items-center")}>
      <div className="container-x w-full py-16 md:py-24">
        <p className="text-eyebrow text-white/80">How it works</p>
        <h2 className="text-h2 mt-3">From flat pack to rigid box in seconds</h2>

        {pinned ? (
          <div className="mt-12 grid items-center gap-12 md:grid-cols-2">
            <div className="relative aspect-[4/3] rounded-3xl bg-white/10">
              {stages.map((s) => {
                const Art = illustrations[s.key];
                return (
                  <div key={s.key} data-stage-art className="absolute inset-[6%]">
                    <Art />
                  </div>
                );
              })}
            </div>
            <div>
              <div className="relative min-h-40">
                {stages.map((s, i) => (
                  <div key={s.key} data-stage-copy className="absolute inset-0">
                    <p className="font-heading text-6xl font-bold text-white">0{i + 1}</p>
                    <h3 className="text-h3 mt-2">{s.title}</h3>
                    <p className="mt-2 max-w-md text-white/80">{s.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex gap-2" aria-hidden="true">
                {stages.map((s, i) => (
                  <span key={s.key} data-stage-dot className={cn("h-1.5 w-12 rounded-full", i === 0 ? "bg-orange-500" : "bg-white/25")} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {stages.map((s, i) => {
              const Art = illustrations[s.key];
              return (
                <li key={s.key} className="rounded-3xl bg-white/10 p-6">
                  <div className="aspect-[4/3]">
                    <Art />
                  </div>
                  <p className="mt-4 font-heading text-3xl font-bold text-white">0{i + 1}</p>
                  <h3 className="text-h4 mt-1">{s.title}</h3>
                  <p className="mt-2 text-white/80">{s.text}</p>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}
