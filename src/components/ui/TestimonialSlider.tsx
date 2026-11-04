"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, useCallback, useEffect, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * One testimonial at a time with previous/next arrows. No autoplay. Slides are server-rendered children.
 * Only used once there are at least two real (non-placeholder) testimonials (see TestimonialsAndFaq).
 */
export function TestimonialSlider({ children, label = "Client testimonials" }: { children: ReactNode; label?: string }) {
  const slides = Children.toArray(children);
  // Only feeds Embla options (never the markup), so reading it on the client cannot cause a hydration mismatch.
  const [reduce] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [ref, api] = useEmblaCarousel({ loop: true, duration: reduce ? 1 : 25 });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const sync = () => setSelected(api.selectedScrollSnap());
    sync();
    api.on("select", sync);
    return () => {
      api.off("select", sync);
    };
  }, [api]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") api?.scrollNext();
      else if (e.key === "ArrowLeft") api?.scrollPrev();
    },
    [api],
  );

  const arrow = "inline-flex h-11 w-11 items-center justify-center rounded-full border border-silver-300 bg-white text-blue-600 transition hover:border-blue-600 focus-visible:outline-none focus-visible:shadow-[var(--ring)]";
  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={ref} tabIndex={0} onKeyDown={onKey} className="overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-blue-600/30">
        <div className="flex">
          {slides.map((s, i) => (
            <div key={i} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`} aria-hidden={i !== selected || undefined} className="min-w-0 shrink-0 basis-full">
              {s}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <button type="button" onClick={() => api?.scrollPrev(reduce)} aria-label="Previous testimonial" className={arrow}>
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => api?.scrollNext(reduce)} aria-label="Next testimonial" className={arrow}>
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </button>
        <p className={cn("ml-2 text-sm text-ink-500")} aria-live="polite">
          {selected + 1} / {slides.length}
        </p>
      </div>
    </div>
  );
}
