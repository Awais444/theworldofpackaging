"use client";

import { useRef } from "react";
import { arc3, path3, project, roundedRect3, type Origin, type Vec3 } from "@/components/illustrations/iso";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { gsap, useGSAP } from "@/lib/gsap";

const o: Origin = { x: 200, y: 70 };
const L = 180;
const W = 120;
const GAP = 64; // exploded spacing between layers (svg units)

const plate = (z0: number, h: number, inset = 0): { top: string; front: string; side: string } => {
  const a = inset;
  const b = L - inset;
  const c = W - inset;
  return {
    top: path3([[a, a, z0 + h], [b, a, z0 + h], [b, c, z0 + h], [a, c, z0 + h]], o, true),
    front: path3([[a, c, z0], [b, c, z0], [b, c, z0 + h], [a, c, z0 + h]], o, true),
    side: path3([[b, a, z0], [b, c, z0], [b, c, z0 + h], [b, a, z0 + h]], o, true),
  };
};

function Plate({ h, inset = 0 }: { h: number; inset?: number }) {
  const p = plate(0, h, inset);
  return (
    <>
      <path d={p.front} className="f2 ln" />
      <path d={p.side} className="f3 ln" />
      <path d={p.top} className="f1 ln" />
    </>
  );
}

type Layer = { id: string; label: string; detail: string; art: React.ReactNode; anchor: Vec3 };

/**
 * Exploded rigid box: layers separate on scroll to show what it is made of.
 * The static (no-JS / reduced-motion) state is fully exploded.
 */
export function AnatomyDiagram({ board, closure }: { board: string; closure: string }) {
  const root = useRef<HTMLElement>(null);

  const layers: Layer[] = [
    {
      id: "closure",
      label: "Closure",
      detail: closure,
      anchor: [L, W / 2, 6],
      art: (
        <>
          <Plate h={6} />
          {[L * 0.35, L * 0.65].map((x) => (
            <path key={x} d={path3(arc3([x, W - 14, 6], [1, 0, 0], [0, 1, 0], 7, 0, Math.PI * 2, 20), o, true)} className="fold" />
          ))}
        </>
      ),
    },
    {
      id: "insert",
      label: "Insert",
      detail: "EVA foam, CNC cut",
      anchor: [L - 8, W / 2, 10],
      art: (
        <>
          <Plate h={18} inset={8} />
          <path d={path3(roundedRect3(L / 2, W / 2, 18, 70, 46, 12), o, true)} className="f3 ln" />
        </>
      ),
    },
    {
      id: "print",
      label: "Print + finish",
      detail: "CMYK / Pantone, foil, spot UV",
      anchor: [L, W / 2, 1],
      art: (
        <>
          <Plate h={2} />
          <path d={path3(arc3([L / 2, W / 2, 2], [1, 0, 0], [0, 1, 0], 26, 0, Math.PI * 2, 40), o, true)} className="ln acc" />
          {["var(--cyan)", "var(--magenta)", "var(--yellow)", "var(--ink)"].map((c, i) => (
            <path key={c} d={path3([[16 + i * 12, 12, 2], [26 + i * 12, 12, 2], [26 + i * 12, 22, 2], [16 + i * 12, 22, 2]], o, true)} fill={c} />
          ))}
        </>
      ),
    },
    {
      id: "wrap",
      label: "Wrap paper",
      detail: "157 gsm art paper, linen or leatherette",
      anchor: [L + 10, W * 0.2, 0],
      art: (
        <path
          d={path3([[-30, -10, 0], [L + 10, -30, 0], [L + 30, W + 10, 0], [-10, W + 30, 0]], o, true)}
          className="f1 ln"
        />
      ),
    },
    {
      id: "board",
      label: "Greyboard",
      detail: board,
      anchor: [L, W / 2, 10],
      art: (
        <>
          <Plate h={50} />
          <path d={path3([[6, 6, 50], [L - 6, 6, 50], [L - 6, W - 6, 50], [6, W - 6, 50]], o, true)} className="f3 ln" />
        </>
      ),
    },
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const groups = q("[data-layer]");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: q("svg")[0], start: "top 75%", end: "center 45%", scrub: 0.6 },
        });
        groups.forEach((g, i) => {
          // Inner group offset that presses all layers together around the middle of the stack.
          tl.fromTo(g, { y: (2 - i) * GAP + i * 6 }, { y: 0, ease: "power2.inOut" }, 0);
        });
        tl.fromTo(q("[data-callout]"), { opacity: 0 }, { opacity: 1, stagger: 0.05 }, 0.4);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="container-x py-20 md:py-28">
      <div className="grid-editorial items-center gap-y-12">
        <div className="col-span-4 md:col-span-12 lg:col-span-4">
          <SectionHeader
            spec={["Anatomy"]}
            title="What a rigid box is made of."
            intro="Five parts, all cut, printed and assembled in our factory. Scroll to take it apart."
            className="!block"
          />
        </div>
        <div className="col-span-4 md:col-span-12 lg:col-span-8">
          <svg viewBox="0 0 640 480" className="illo h-auto w-full" role="img" aria-labelledby="anatomy-desc">
            <desc id="anatomy-desc">
              {`Exploded view of a rigid box: ${layers.map((l) => `${l.label} (${l.detail})`).join(", ")}.`}
            </desc>
            {layers.map((l, i) => {
              const [ax, ay] = project(l.anchor, o);
              const ty = i * GAP;
              return (
                <g key={l.id} transform={`translate(0 ${ty})`}>
                <g data-layer>
                  {l.art}
                  <g data-callout>
                    <circle cx={ax} cy={ay} r={2} fill="currentColor" />
                    <path d={`M${ax} ${ay}L400 ${ay}`} className="ln-thin" />
                    <text x={406} y={ay - 2} className="lbl lbl-strong">{l.label}</text>
                    <text x={406} y={ay + 10} className="lbl">{l.detail}</text>
                  </g>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
