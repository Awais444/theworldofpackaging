"use client";

import { useReducedMotion } from "framer-motion";
import { ClipboardList, Globe, PenTool, Printer, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { quoteHref } from "@/content/links";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLazyGsap } from "@/lib/useLazyGsap";
import { cn } from "@/lib/utils";

// The printing time shows only once a real lead time is confirmed in config/site.ts.
const printTime = site.facts.printedLeadTime === "TODO" ? "Timeline in your quote" : site.facts.printedLeadTime;

const steps: Array<{ icon: LucideIcon; title: string; body: string; time: string }> = [
  { icon: ClipboardList, title: "Share your brief", body: "Tell us the product, size, quantity and where it ships.", time: "Day 1" },
  { icon: PenTool, title: "Design & proof", body: "Concepts, dieline, 3D mockup and a digital proof for your approval.", time: `Concepts in ${site.facts.firstConceptHours} hrs` },
  { icon: Printer, title: "Printing", body: "Your packaging is printed, finished and checked at our press.", time: printTime },
  { icon: Globe, title: "Delivery", body: "Packed for export and shipped by air or sea to your door.", time: "Air or sea, tracked" },
];

/** Ruler line: 1px ticks every 6px. */
const ticks = (color: string) => ({ backgroundImage: `repeating-linear-gradient(90deg, ${color} 0 1px, transparent 1px 6px)` });

/**
 * Homepage "How it works": step tabs, a ruler that fills on scroll, and four equal cards (number, icon tile,
 * title, two lines, time chip). The active step (hover, focus or the 4s auto-advance) lifts its card and fills
 * its icon tile. Auto-advance pauses on hover or focus and is off with reduced motion.
 */
export function HowItWorks() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);

  // Ruler fills on scroll. GSAP loads only when this section is near the viewport.
  // Without motion (or JS) the ruler shows fully filled.
  useLazyGsap(root, ({ gsap }, el) => {
    gsap.fromTo("[data-ruler-fill]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 50%", scrub: true } });
  });

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
      <SectionHeader align="center" eyebrow="How it works" title="Four steps to your packaging" highlight="packaging" lead={`We reply to every brief ${site.facts.quoteReply}.`} />
      <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
        <Button href={quoteHref} size="sm" arrow>
          Get a Quote
        </Button>
        <Button href="/how-it-works" variant="ghost" arrow>
          See full process
        </Button>
      </div>

      <div ref={root} className="mt-14" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
        <div role="tablist" aria-label="Steps" className="hidden grid-cols-4 gap-6 lg:grid">
          {steps.map((s, i) => (
            <div key={s.title}>
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

        <ol className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const on = active === i;
            return (
              <li
                key={s.title}
                tabIndex={0}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-current={on ? "step" : undefined}
                className={cn(
                  "flex h-full flex-col rounded-2xl border bg-white p-6 outline-none transition-[transform,border-color,box-shadow] duration-300 focus-visible:shadow-[var(--ring)] motion-reduce:transition-none",
                  on ? "-translate-y-1 border-blue-600 shadow-md motion-reduce:translate-y-0" : "border-silver-300",
                )}
              >
                <div className="flex items-start justify-between">
                  <span className={cn("relative inline-flex h-14 w-14 items-center justify-center rounded-[14px] transition-colors duration-300", on ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600")}>
                    <s.icon aria-hidden="true" className="h-6 w-6" strokeWidth={2} />
                    {/* Orange accent: one small dot on the tile corner. */}
                    <span aria-hidden="true" className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500" />
                  </span>
                  <span aria-hidden="true" className="font-heading text-[48px] font-semibold leading-none text-silver-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-heading text-[20px] font-semibold leading-snug">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mb-5 mt-2 text-ink-500">{s.body}</p>
                {/* Chips sit on the same line in every card. */}
                <span className="mt-auto inline-flex h-7 w-fit items-center rounded-full bg-orange-50 px-3 pt-px text-xs font-semibold text-orange-text">{s.time}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
