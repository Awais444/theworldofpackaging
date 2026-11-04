"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Children, useCallback, useEffect, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Swipe slider for mobile and tablet that turns back into a plain grid from 1024px (Embla inactive there).
 * Slides are rendered on the server and passed as children, so the layout is identical before and after
 * hydration (no shift). Dots below; arrow keys move it when the slider has focus. No autoplay.
 * Reduced motion: snapping is near-instant instead of animated.
 */
export function CardSlider({ children, label, slideClassName, gridClassName }: { children: ReactNode; label: string; slideClassName: string; gridClassName: string }) {
  const slides = Children.toArray(children);
  // Only feeds Embla options (never the markup), so reading it on the client cannot cause a hydration mismatch.
  const [reduce] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [ref, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", duration: reduce ? 1 : 25, breakpoints: { "(min-width: 1024px)": { active: false } } });
  const [snaps, setSnaps] = useState<number[]>([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const sync = () => {
      setSnaps(api.scrollSnapList());
      setSelected(api.selectedScrollSnap());
    };
    sync();
    api.on("select", sync).on("reInit", sync);
    return () => {
      api.off("select", sync).off("reInit", sync);
    };
  }, [api]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") api?.scrollNext();
      else if (e.key === "ArrowLeft") api?.scrollPrev();
    },
    [api],
  );

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      {/* Visible focus ring on the viewport; overflow is only hidden while the slider is active (below lg). */}
      <div ref={ref} tabIndex={0} onKeyDown={onKey} className="-mx-4 overflow-hidden px-4 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-blue-600/30 lg:mx-0 lg:overflow-visible lg:px-0">
        <div className={cn("flex gap-4", gridClassName)}>
          {slides.map((s, i) => (
            <div key={i} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`} className={cn("min-w-0 shrink-0", slideClassName)}>
              {s}
            </div>
          ))}
        </div>
      </div>
      {snaps.length > 1 && (
        <div className="mt-6 flex justify-center gap-2 lg:hidden">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i, reduce)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === selected || undefined}
              className="flex h-6 w-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-blue-600/30"
            >
              <span className={cn("block h-2 rounded-full transition-all", i === selected ? "w-5 bg-blue-600" : "w-2 bg-silver-300")} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
