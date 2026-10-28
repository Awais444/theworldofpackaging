"use client";

import { useRef } from "react";
import { MagneticBoxOpen, illustrations } from "@/components/illustrations";
import { Media } from "@/components/media/Media";
import { Button } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { getMedia } from "@/content/media";
import { quoteHref } from "@/content/navigation";
import { promises, site } from "@/config/site";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { gsap, useGSAP } from "@/lib/gsap";

// Promises come from confirmed facts in config/site.ts; null facts are skipped.
const trust = [...promises(), "Own factory", `MOQ ${site.facts.rigidMoq}`];
const chips = [
  { label: "2 mm greyboard", className: "left-[2%] top-[14%]" },
  { label: "Gold foil", className: "right-[4%] top-[6%]" },
  { label: "Ships flat", className: "bottom-[10%] right-[8%]" },
];

const Mailer = illustrations["mailer-box"];

/** Illustration composition: open magnetic box, a mailer and a small orange box. */
function Composition({ alt }: { alt: string }) {
  return (
    <div role="img" aria-label={alt} className="relative aspect-[4/3] rounded-3xl bg-blue-50">
      <span aria-hidden="true" className="absolute -right-[8%] -top-[10%] aspect-square h-[60%] rounded-full bg-white/70" />
      <span aria-hidden="true" className="absolute -bottom-[12%] -left-[6%] aspect-square h-[45%] rounded-full bg-silver-100" />
      <div data-hero-art className="absolute inset-[4%_10%_12%_4%]">
        <MagneticBoxOpen />
      </div>
      <div data-hero-art className="absolute bottom-[2%] right-[2%] w-[42%]">
        <Mailer className="illo--klein" />
      </div>
      <div data-hero-art className="absolute left-[4%] bottom-[4%] w-[24%]">
        <Mailer className="illo--orange" />
      </div>
      {chips.map((c) => (
        <span key={c.label} data-hero-chip className={`absolute rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink-900 shadow-md sm:text-sm ${c.className}`}>
          {c.label}
        </span>
      ))}
    </div>
  );
}

export function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const slot = getMedia("home-hero");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        // Animate from an already-visible state only: content is fully readable without JS.
        tl.from("[data-hero-line]", { y: 14, duration: 0.5, stagger: 0.06 })
          .from("[data-hero-art]", { scale: 0.97, duration: 0.6, stagger: 0.08 }, 0)
          .from("[data-hero-chip]", { y: 8, duration: 0.4, stagger: 0.06 }, 0.2);
        gsap.to("[data-hero-art]", { y: -8, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.6, delay: 1.2 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-white">
      <span aria-hidden="true" className="absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-blue-50" />
      <div className="container-x relative grid items-center gap-12 pb-16 pt-12 md:pb-24 md:pt-16 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <p data-hero-line className="text-eyebrow text-blue-600">
            Packaging design studio + own factory
          </p>
          <h1 data-hero-line className="text-display mt-4">
            Packaging design that <span className="whitespace-nowrap"><Highlight>sells</Highlight>.</span> Made in our own factory.
          </h1>
          <p data-hero-line className="text-lead mt-6 max-w-xl text-ink-500">
            Boxes, labels and pouches designed for your product, then printed and made in our own factory. One team from first sketch to delivered box.
          </p>
          <div data-hero-line className="mt-8 flex flex-wrap gap-3">
            <Button href={quoteHref} size="lg" arrow>
              Get a Free Quote
            </Button>
            <Button href="/packaging-design" size="lg" variant="secondary">
              Explore design services
            </Button>
            <WhatsAppButton topic="packaging design" variant="ghost" />
          </div>
          <ul data-hero-line className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-ink-900">
            {trust.map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-orange-500" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6">{slot.src ? <Media slot="home-hero" priority panel="blue" /> : <Composition alt={slot.alt} />}</div>
      </div>
    </section>
  );
}
