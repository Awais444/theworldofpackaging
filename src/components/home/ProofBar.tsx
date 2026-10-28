"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { Clock, Factory, Package, PenTool, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type ProofItem = { icon: "package" | "clock" | "pen" | "factory"; label: string } & ({ number: number; unit?: string } | { text: string });

const icons: Record<ProofItem["icon"], LucideIcon> = { package: Package, clock: Clock, pen: PenTool, factory: Factory };

/** Counts up to `value` once in view. The real value is in the HTML from the start (no "0" state). */
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(Math.round(value * 0.6), value, { duration: 0.9, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setShown(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
    </span>
  );
}

const cols: Record<number, string> = { 1: "md:grid-cols-1", 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4" };

/** Homepage proof bar: a card of key facts in 4 equal columns (2×2 on mobile). */
/** `overlap` pulls the bar up over the bottom of the hero (48px). */
export function ProofBar({ items, overlap = false }: { items: ProofItem[]; overlap?: boolean }) {
  if (items.length === 0) return null;
  return (
    <section aria-label="Key facts" className={overlap ? "relative z-10 -mt-12" : "bg-white py-10 md:py-14"}>
      <div className="container-x">
        <dl className={cn("grid grid-cols-2 gap-y-6 rounded-3xl border border-silver-300 bg-white p-6 shadow-md md:gap-y-0 md:p-8", cols[items.length])}>
          {items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <div
                key={item.label}
                className={cn("flex flex-col items-start gap-3 px-2 md:flex-row md:items-center md:gap-4 md:px-6", i > 0 && "md:border-l md:border-silver-300", i === 0 && "md:pl-0")}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <div className="flex flex-col-reverse">
                  <dt className="text-sm text-ink-500">{item.label}</dt>
                  <dd className="font-heading text-[32px] font-bold leading-none text-blue-600 md:text-[40px]">
                    {"number" in item ? (
                      <>
                        <CountUp value={item.number} />
                        {item.unit && <span className="ml-0.5 text-[0.6em] text-ink-500">{item.unit}</span>}
                      </>
                    ) : (
                      <span className="block whitespace-nowrap text-[24px] leading-tight lg:text-[28px]">{item.text}</span>
                    )}
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
