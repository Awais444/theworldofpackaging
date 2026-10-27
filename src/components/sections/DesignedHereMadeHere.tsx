"use client";

import { useRef, type ComponentType } from "react";
import { BrandBoard, CmykSheet, DielineFlat, MagneticBoxClosed, SketchBox, type IllustrationProps } from "@/components/illustrations";
import { CropMarks } from "@/components/ui/CropMarks";
import { RevealText } from "@/components/ui/RevealText";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { gsap, useGSAP } from "@/lib/gsap";

type Step = {
  id: string;
  label: string;
  title: string;
  body: string;
  Visual: ComponentType<IllustrationProps>;
  /** Relative scroll length of this step. */
  weight: number;
};

const STEPS: Step[] = [
  {
    id: "sketch",
    label: "Sketch",
    title: "It starts on paper.",
    body: "Rough proportions, how the lid lifts, where the product sits. Cheap to change, so we change it a lot.",
    Visual: SketchBox,
    weight: 1,
  },
  {
    id: "brand",
    label: "Brand board",
    title: "The brand gets its rules.",
    body: "Type, colour, mark and pattern, tested at box scale before anything is printed.",
    Visual: BrandBoard,
    weight: 1,
  },
  {
    id: "dieline",
    label: "Dieline",
    title: "Structure, to the millimetre.",
    body: "Cut lines, fold lines, bleed and glue areas, drawn for the board we will actually use.",
    Visual: DielineFlat,
    weight: 1,
  },
  {
    id: "print",
    label: "Four ink passes",
    title: "Cyan, magenta, yellow, key.",
    body: "Each ink lands in register on our own press. You see the colour on the real stock before the run.",
    Visual: CmykSheet,
    weight: 2,
  },
  {
    id: "box",
    label: "Finished box",
    title: "Then we make it.",
    body: "Greyboard cut, wrapped, foiled and fitted with its insert, in the same building where it was designed.",
    Visual: MagneticBoxClosed,
    weight: 1,
  },
];

const PASSES = ["c", "m", "y", "k"] as const;
const PASS_COLOR = { c: "var(--cyan)", m: "var(--magenta)", y: "var(--yellow)", k: "var(--ink)" } as const;

/**
 * Pinned, scrubbed sequence: sketch → brand board → dieline → CMYK passes → box.
 * Without JS, on small screens or with reduced motion it is a plain stacked list.
 */
export function DesignedHereMadeHere() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        el.dataset.enhanced = "";
        const q = gsap.utils.selector(el);
        const steps = q("[data-step]");
        const labels = q("[data-label]");
        const totalWeight = STEPS.reduce((n, s) => n + s.weight, 0);

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: q("[data-frame]")[0],
            pin: true,
            scrub: 0.6,
            start: "top top",
            end: () => `+=${window.innerHeight * totalWeight * 0.9}`,
            invalidateOnRefresh: true,
          },
        });

        tl.set(steps.slice(1), { autoAlpha: 0 }).set(steps[0]!, { autoAlpha: 1 }).set(labels, { opacity: 0.35 }).set(labels[0]!, { opacity: 1 });
        tl.fromTo(q("[data-progress]"), { scaleY: 0 }, { scaleY: 1, duration: totalWeight }, 0);

        let t = 0;
        STEPS.forEach((step, i) => {
          const node = steps[i]!;
          if (i > 0) {
            tl.to(steps[i - 1]!, { autoAlpha: 0, y: -24, duration: 0.25 }, t - 0.25)
              .fromTo(node, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.25 }, t - 0.1)
              .to(labels[i - 1]!, { opacity: 0.35, duration: 0.1 }, t - 0.1)
              .to(labels[i]!, { opacity: 1, duration: 0.1 }, t - 0.1);
          }
          if (step.id === "print") {
            // Lay the inks down one at a time, each sliding into register.
            const passes = PASSES.map((p) => node.querySelector(`[data-pass="${p}"]`) as Element);
            const ticks = PASSES.map((p) => node.querySelector(`[data-tick="${p}"]`) as Element);
            tl.set(passes, { opacity: 0, x: 18 }, t).set(ticks, { opacity: 0.3 }, t);
            const slot = step.weight / (PASSES.length + 1);
            PASSES.forEach((_, k) => {
              const at = t + slot * (k + 0.5);
              tl.to(passes[k]!, { opacity: 1, x: 0, duration: slot * 0.8, ease: "power2.out" }, at).to(
                ticks[k]!,
                { opacity: 1, duration: slot * 0.2 },
                at,
              );
            });
          }
          t += step.weight;
        });

        return () => {
          delete el.dataset.enhanced;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="group border-t border-line">
      <div className="container-x pt-24 md:pt-32">
        <SpecLabel items={["Studio + factory", "One building"]} as="p" className="mb-5" />
        <RevealText text="Designed here. Made here." className="type-display text-display-xl" />
      </div>

      <div data-frame className="relative group-data-[enhanced]:h-svh">
        <div className="container-x relative h-full py-16 group-data-[enhanced]:py-0">
          {/* Step index with scrubbed progress rule (enhanced mode only). */}
          <div aria-hidden="true" className="absolute bottom-12 left-4 z-10 hidden group-data-[enhanced]:block md:left-8 xl:left-12">
            <span className="absolute -left-4 top-0 h-full w-px bg-line">
              <span data-progress className="block h-full w-px origin-top bg-fg" />
            </span>
            <ul className="grid gap-2">
              {STEPS.map((s) => (
                <li key={s.id} data-label className="spec">
                  {s.label}
                </li>
              ))}
            </ul>
          </div>

          <ol className="grid gap-20 group-data-[enhanced]:relative group-data-[enhanced]:block group-data-[enhanced]:h-full">
            {STEPS.map((step, i) => (
              <li
                key={step.id}
                data-step
                className="grid-editorial items-center gap-y-8 group-data-[enhanced]:absolute group-data-[enhanced]:inset-0"
              >
                <div className="col-span-4 md:col-span-4">
                  <p className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="type-display mt-3 text-display-md">{step.title}</h3>
                  <p className="mt-4 text-lg text-muted">{step.body}</p>
                  {step.id === "print" && (
                    <p className="mt-6 flex gap-4 font-mono text-sm" aria-hidden="true">
                      {PASSES.map((p) => (
                        <span key={p} data-tick={p} className="flex items-center gap-2 uppercase">
                          <span className="h-2.5 w-2.5" style={{ backgroundColor: PASS_COLOR[p] }} />
                          {p}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
                <div className="col-span-4 md:col-span-7 md:col-start-6">
                  <div className="relative bg-surface-2 p-[4%]" style={{ aspectRatio: "4 / 3" }} role="img" aria-label={`${step.label} illustration`}>
                    <step.Visual />
                    <CropMarks />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
