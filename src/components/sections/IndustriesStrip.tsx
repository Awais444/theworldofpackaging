"use client";

import Link from "next/link";
import { useRef } from "react";
import { industries } from "@/content/industries";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/RevealText";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Industry cards in a horizontal strip. On large screens with motion allowed the
 * section pins and vertical scroll drives the strip sideways; otherwise it is a
 * native, swipeable scroller.
 */
export function IndustriesStrip() {
  const root = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const vp = viewport.current;
        const tr = track.current;
        if (!vp || !tr) return;
        vp.dataset.pinned = "";
        const distance = () => tr.scrollWidth - vp.clientWidth;
        gsap.to(tr, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: 0.5,
            start: "top top",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
          },
        });
        return () => {
          delete vp.dataset.pinned;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="tone-board flex min-h-0 flex-col justify-center overflow-hidden py-24 md:py-32 lg:min-h-svh">
      <div className="container-x grid-editorial gap-y-6">
        <div className="col-span-4 md:col-span-8">
          <SpecLabel items={["Industries", `${industries.length} sectors`]} as="p" className="mb-5" />
          <RevealText text="Packaging that fits the shelf it sits on." className="type-display text-display-lg" />
        </div>
        <div className="col-span-4 self-end md:justify-self-end">
          <Button href="/industries" variant="link" arrow>
            All industries
          </Button>
        </div>
      </div>

      <div
        ref={viewport}
        className="mt-14 overflow-x-auto overscroll-x-contain [scrollbar-width:thin] data-[pinned]:overflow-visible"
        data-lenis-prevent-wheel
      >
        <ul ref={track} className="flex w-max snap-x snap-mandatory gap-4 px-4 pb-4 md:px-8 xl:px-12">
          {industries.map((ind, i) => (
            <li key={ind.slug} className="snap-start">
              <Link
                href={`/industries/${ind.slug}`}
                className={
                  "group relative flex h-80 w-[17rem] flex-col justify-between border p-6 transition-colors md:h-96 md:w-[21rem] " +
                  (i % 3 === 1 ? "tone-kraft border-transparent" : "border-line hover:border-fg")
                }
              >
                <span className="spec text-muted">Industry</span>
                <div>
                  <h3 className="type-display text-display-md transition-transform duration-300 ease-[var(--ease-press)] group-hover:-translate-y-1">
                    {ind.name}
                  </h3>
                  <ul className="mt-5 space-y-1 border-t border-dashed border-line-strong pt-4">
                    {ind.styles.map((s) => (
                      <li key={s} className="spec">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
