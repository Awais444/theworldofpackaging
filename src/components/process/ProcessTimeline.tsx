"use client";

import { CheckCircle2 } from "lucide-react";
import { useRef, type ReactNode } from "react";
import type { ProcessStep } from "@/content/process";
import { useLazyGsap } from "@/lib/useLazyGsap";
import { cn } from "@/lib/utils";

/**
 * Zigzag timeline: a centre line (left on mobile) that fills blue→orange on scroll, numbered
 * circles, and cards that light up as they are reached. Without motion everything shows filled.
 */
/** `visuals` optionally adds a server-rendered photo to a step card, keyed by step title. */
export function ProcessTimeline({ steps, visuals = {} }: { steps: ProcessStep[]; visuals?: Record<string, ReactNode> }) {
  const root = useRef<HTMLOListElement>(null);

  // Line fill and step highlights on scroll; GSAP loads only when the timeline is near the viewport.
  useLazyGsap(root, ({ gsap, ScrollTrigger }, el) => {
    const items = gsap.utils.toArray<HTMLElement>("[data-step]", el);
    items.forEach((it) => it.setAttribute("data-on", "false"));
    gsap.fromTo("[data-line-fill]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 60%", end: "bottom 60%", scrub: true } });
    items.forEach((it) =>
      ScrollTrigger.create({
        trigger: it,
        start: "top 60%",
        onEnter: () => it.setAttribute("data-on", "true"),
        onLeaveBack: () => it.setAttribute("data-on", "false"),
      }),
    );
    return () => items.forEach((it) => it.setAttribute("data-on", "true"));
  });

  return (
    <ol ref={root} className="relative space-y-10 lg:space-y-6">
      {/* Track and fill: left on mobile, centre on desktop */}
      <span aria-hidden="true" className="absolute bottom-7 left-[27px] top-7 w-0.5 bg-silver-300 lg:left-1/2 lg:-translate-x-1/2" />
      <span
        aria-hidden="true"
        data-line-fill
        className="absolute bottom-7 left-[27px] top-7 w-0.5 origin-top bg-gradient-to-b from-blue-600 to-orange-500 lg:left-1/2 lg:-translate-x-1/2"
      />

      {steps.map((s, i) => {
        const right = i % 2 === 1;
        const last = i === steps.length - 1;
        return (
          <li key={s.title} data-step data-on="true" className="group relative grid grid-cols-[56px_1fr] gap-x-6 lg:grid-cols-[1fr_56px_1fr] lg:gap-x-10">
            <span
              className="relative z-10 col-start-1 row-start-1 flex h-14 w-14 items-center justify-center rounded-full border border-silver-300 bg-white font-heading text-xl font-bold text-ink-900 transition-colors duration-300 group-data-[on=true]:border-blue-600 group-data-[on=true]:text-blue-600 lg:col-start-2"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className={cn("relative col-start-2 row-start-1", right ? "lg:col-start-3" : "lg:col-start-1")}>
              {/* Connector to the circle */}
              <span aria-hidden="true" className={cn("absolute top-7 h-px w-6 bg-silver-300 transition-colors duration-300 group-data-[on=true]:bg-blue-600 -left-6", right ? "lg:-left-10 lg:w-10" : "lg:left-auto lg:-right-10 lg:w-10")} />
              <article
                className={cn(
                  "rounded-3xl border border-silver-300 p-6 transition-[border-color,box-shadow] duration-300 group-data-[on=true]:border-blue-600 group-data-[on=true]:shadow-md md:p-8",
                  last ? "bg-gradient-to-br from-orange-50 to-blue-50" : "bg-white",
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-h3">{s.title}</h3>
                  <span className={cn("inline-flex h-7 items-center rounded-full px-3 text-xs font-semibold text-ink-900", last ? "bg-white" : "bg-gradient-to-r from-blue-50 to-orange-50")}>
                    {s.time}
                  </span>
                </div>
                <p className="mt-3 text-ink-500">{s.body}</p>
                {visuals[s.title] && <div className="mt-5">{visuals[s.title]}</div>}
                <ul className="mt-5 space-y-2.5">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-3">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
