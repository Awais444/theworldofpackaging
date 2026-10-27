"use client";

import { useRef, useState, type CSSProperties } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

// Scene units scale with the container (cqw), designed on a 420-unit-wide stage.
const u = (n: number) => `${(n / 420) * 100}cqw`;
const L = 240; // base length
const W = 160; // base width
const H = 84; // wall height

type Wall = { id: string; style: CSSProperties; origin: string; upright: gsap.TweenVars; flat: gsap.TweenVars };

// Walls lie flat around the base, then rotate up about their shared edge.
const WALLS: Wall[] = [
  { id: "front", style: { left: 0, top: u(W), width: u(L), height: u(H) }, origin: "50% 0%", upright: { rotationX: 90 }, flat: { rotationX: 0 } },
  { id: "back", style: { left: 0, top: u(-H), width: u(L), height: u(H) }, origin: "50% 100%", upright: { rotationX: -90 }, flat: { rotationX: 0 } },
  { id: "right", style: { left: u(L), top: 0, width: u(H), height: u(W) }, origin: "0% 50%", upright: { rotationY: -90 }, flat: { rotationY: 0 } },
  { id: "left", style: { left: u(-H), top: 0, width: u(H), height: u(W) }, origin: "100% 50%", upright: { rotationY: 90 }, flat: { rotationY: 0 } },
];

const uprightCss: Record<string, string> = {
  front: "rotateX(90deg)",
  back: "rotateX(-90deg)",
  right: "rotateY(-90deg)",
  left: "rotateY(90deg)",
};

/** Collapsible rigid box that snaps from flat to assembled. Toggle to fold it back down. */
export function CollapsibleSnap() {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [assembled, setAssembled] = useState(true);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const t = gsap.timeline({ paused: true });
      WALLS.forEach((w, i) => {
        const node = q(`[data-wall="${w.id}"]`);
        t.fromTo(
          node,
          { ...w.flat, transformOrigin: w.origin },
          { ...w.upright, transformOrigin: w.origin, duration: 0.55, ease: "back.out(2.2)" },
          i * 0.09,
        );
      });
      t.progress(1);
      tl.current = t;

      if (!prefersReducedMotion()) {
        // Start flat; snap together when the section scrolls into view.
        t.progress(0);
        ScrollTrigger.create({ trigger: root.current, start: "top 70%", once: true, onEnter: () => t.play() });
      }
    },
    { scope: root },
  );

  const toggle = () => {
    const t = tl.current;
    if (!t) return;
    const next = !assembled;
    setAssembled(next);
    if (prefersReducedMotion()) t.progress(next ? 1 : 0);
    else if (next) t.play();
    else t.reverse();
  };

  return (
    <div>
      <div ref={root} className="relative aspect-[4/3] overflow-hidden [container-type:inline-size] [perspective:1400px]" aria-hidden="true">
        <div
          className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
          style={{
            width: u(L),
            height: u(W),
            marginLeft: u(-L / 2),
            marginTop: u(-W / 2),
            transform: "translateY(10%) rotateX(58deg) rotateZ(-38deg)",
          }}
        >
          <div className="illo absolute inset-0 border border-current" style={{ backgroundColor: "var(--face-3)" }}>
            <span className="absolute inset-[18%] border border-dashed border-current opacity-40" />
          </div>
          {WALLS.map((w) => (
            <div
              key={w.id}
              data-wall={w.id}
              className="illo absolute border border-current"
              style={{ ...w.style, transform: uprightCss[w.id], backgroundColor: "var(--face-2)" }}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <span className="spec text-muted">{assembled ? "Assembled" : "Flat-packed"}</span>
        <button
          type="button"
          onClick={toggle}
          className="spec border border-line-strong px-3 py-2 text-fg hover:border-fg"
        >
          {assembled ? "Fold flat" : "Assemble"}
        </button>
      </div>
    </div>
  );
}
