"use client";

import { ClipboardList, Factory, PenTool, Truck, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import { site } from "@/config/site";
import { quoteHref } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { gsap, useGSAP } from "@/lib/gsap";

type Step = { icon: LucideIcon; title: string; body: string; time: string | null; gets: string };

// Production time shows only once the real lead time is confirmed in config/site.ts.
const leadTime = site.facts.rigidLeadTime === "TODO" ? null : site.facts.rigidLeadTime;

const steps: Step[] = [
  { icon: ClipboardList, title: "Share your brief", body: "Tell us the product, size, quantity and where it ships.", time: "Day 1 · Quote in 24 hrs", gets: "Fixed quote" },
  { icon: PenTool, title: "Design & sample", body: "We design or check your artwork, then make a physical sample.", time: "Concepts in 48 hrs", gets: "Concepts + physical sample" },
  { icon: Factory, title: "Production", body: "Your boxes are made, printed and checked in our own factory.", time: leadTime, gets: "QC-checked boxes" },
  { icon: Truck, title: "Delivery", body: "Packed for export and shipped by air or sea to your door.", time: "Air or sea, tracked", gets: "Tracking + docs" },
];

/** Homepage "How it works": four step cards on a line that fills blue as you scroll. */
export function HowItWorks() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Without motion (or JS) the line is drawn fully filled.
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
        gsap.fromTo(
          "[data-step-fill]",
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 45%", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <Section bg="silver-50">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader eyebrow="How it works" title="Four steps to your boxes" highlight="boxes" lead={`We reply to every brief ${site.facts.quoteReply}.`} />
        <div className="flex shrink-0 items-center gap-6">
          <Button href={quoteHref} size="sm" arrow>
            Get a Quote
          </Button>
          <Button href="/how-it-works" variant="ghost" arrow>
            See full process
          </Button>
        </div>
      </div>

      <div ref={root} className="relative mt-12">
        {/* Connecting line: horizontal behind the cards on desktop, vertical on mobile. */}
        <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[52px] hidden h-0.5 overflow-hidden rounded-full bg-silver-300 lg:block">
          <div data-step-fill className="h-full w-full origin-left bg-blue-600" />
        </div>
        <div aria-hidden="true" className="absolute bottom-8 left-[52px] top-8 w-0.5 rounded-full bg-blue-100 md:hidden" />

        <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex h-full flex-col rounded-2xl border border-silver-300 bg-white p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <s.icon aria-hidden="true" className="h-7 w-7" />
                </span>
                <span className="text-xs font-bold tabular-nums tracking-wider text-blue-600">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 text-h4 font-heading font-bold">{s.title}</h3>
              <p className="mt-2 text-ink-500">{s.body}</p>
              <div className="mt-auto pt-5">
                {s.time && <span className="inline-flex h-7 items-center rounded-full bg-orange-50 px-3 text-xs font-semibold text-orange-text">{s.time}</span>}
                <p className="mt-3 text-sm text-ink-900">
                  <span className="font-semibold">You get:</span> {s.gets}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
