"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { processLines } from "@/components/illustrations/ProcessLine";
import { site } from "@/config/site";
import { quoteHref } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

// Production time shows only once the real lead time is confirmed in config/site.ts.
const leadTime = site.facts.rigidLeadTime === "TODO" ? null : site.facts.rigidLeadTime;

const steps = [
  { title: "Share your brief", body: "Tell us the product, size, quantity and where it ships.", time: "Day 1" },
  { title: "Design & sample", body: "We design or check your artwork, then make a physical sample.", time: `Concepts in ${site.facts.firstConceptHours} hrs` },
  { title: "Production", body: "Your boxes are made, printed and checked in our own factory.", time: leadTime },
  { title: "Delivery", body: "Packed for export and shipped by air or sea to your door.", time: "Air or sea, tracked" },
];

/** Ruler line: 1px ticks every 6px. */
const ticks = (color: string) => ({ backgroundImage: `repeating-linear-gradient(90deg, ${color} 0 1px, transparent 1px 6px)` });

/** Homepage "How it works": step tabs, a ruler that fills on scroll, and four illustrated columns. */
export function HowItWorks() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Without motion (or JS) the ruler shows fully filled.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo("[data-ruler-fill]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 80%", end: "bottom 50%", scrub: true } });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(Boolean(e?.isIntersecting)), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-advance every 4s while in view; paused on hover or focus, off with reduced motion.
  useEffect(() => {
    if (reduce || paused || !inView) return;
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), 4000);
    return () => clearInterval(t);
  }, [reduce, paused, inView]);

  return (
    <Section>
      <SectionHeader align="center" eyebrow="How it works" title="Four steps to your boxes" highlight="boxes" lead={`We reply to every brief ${site.facts.quoteReply}.`} />
      <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
        <Button href={quoteHref} size="sm" arrow>
          Get a Quote
        </Button>
        <Button href="/how-it-works" variant="ghost" arrow>
          See full process
        </Button>
      </div>

      <div ref={root} className="mt-14" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
        <div role="tablist" aria-label="Steps" className="hidden grid-cols-4 lg:grid">
          {steps.map((s, i) => (
            <div key={s.title} className="px-6 first:pl-0">
              <button
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={cn(
                  "h-8 rounded-lg px-3 text-sm font-semibold transition-colors",
                  active === i ? "bg-blue-600 text-white" : "border border-silver-300 bg-silver-50 text-ink-900 hover:border-blue-600",
                )}
              >
                Step {i + 1}
              </button>
            </div>
          ))}
        </div>

        <div aria-hidden="true" className="relative mt-4 hidden h-2.5 lg:block" style={ticks("var(--silver-300)")}>
          <div data-ruler-fill className="absolute inset-0 origin-left" style={ticks("var(--blue-600)")} />
        </div>

        <ol className="mt-8 grid gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Illo = processLines[i]!;
            const on = active === i;
            return (
              <li
                key={s.title}
                tabIndex={0}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="flex flex-col border-silver-300 outline-none md:px-6 md:even:border-l lg:border-l lg:first:border-l-0 lg:first:pl-0"
              >
                <span className={cn("mb-3 inline-flex h-8 w-fit items-center rounded-lg px-3 text-sm font-semibold lg:hidden", on ? "bg-blue-600 text-white" : "border border-silver-300 text-ink-900")}>
                  Step {i + 1}
                </span>
                <h3 className="text-h4 font-heading font-bold">{s.title}</h3>
                <p className="mt-2 min-h-[3.2em] text-ink-500">{s.body}</p>
                <div className="mt-4 h-7">
                  {s.time && <span className="inline-flex h-7 items-center rounded-full bg-orange-50 px-3 text-xs font-semibold text-orange-text">{s.time}</span>}
                </div>
                <div className={cn("mt-5 aspect-[4/3] rounded-2xl p-6 transition-colors duration-300", on ? "bg-blue-50" : "bg-silver-50")}>
                  <Illo className={cn("h-full w-full transition-transform duration-300", on && "-translate-y-1")} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
