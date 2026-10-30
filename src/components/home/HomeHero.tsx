"use client";

import { useRef, type ReactNode } from "react";
import { MagneticBoxOpen, illustrations } from "@/components/illustrations";
import { Button } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { quoteHref } from "@/content/links";
import { promises, site } from "@/config/site";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

// Promises come from confirmed facts in config/site.ts; null facts are skipped.
const trust = [...promises(), "Own factory", `MOQ ${site.facts.rigidMoq}`];

/** Chips sit inside the visual panel with 16px insets, in the corners clear of the product. */
const chips = [
  { label: "2 mm greyboard", className: "left-4 top-4" },
  { label: "Gold foil", className: "right-4 top-4" },
  { label: "Ships flat", className: "bottom-4 right-4" },
];

const Mailer = illustrations["mailer-box"];

/** Illustration fallback when no hero photo is set: everything stays inside the panel. */
function Composition({ alt }: { alt: string }) {
  return (
    <div role="img" aria-label={alt} className="absolute inset-0">
      <div data-hero-art className="absolute inset-[10%_22%_18%_8%]">
        <MagneticBoxOpen />
      </div>
      <div data-hero-art className="absolute bottom-[10%] right-[8%] w-[34%]">
        <Mailer className="illo--klein" />
      </div>
    </div>
  );
}

/**
 * `photo`: the hero <Media>, rendered by the server page so the media registry never ships to the browser.
 * Without a photo the illustration composition is shown, labelled with `alt`.
 */
export function HomeHero({ photo, alt }: { photo?: ReactNode; alt: string }) {
  const root = useRef<HTMLElement>(null);

  // Entrance animation is CSS (.hero-in in globals.css): no JS, starts from a readable state, off with reduced motion.

  return (
    <section ref={root} className="hero-in bg-white">
      {/* Desktop: content centred in the first screen (capped at 760px). */}
      <div className="container-x grid items-center gap-12 pb-16 pt-14 lg:min-h-[min(760px,calc(100svh-var(--header-h)-var(--utility-h)-104px))] lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p data-hero-line className="text-eyebrow text-blue-600">
            Packaging design studio + own factory
          </p>
          <h1 data-hero-line className="mt-4 font-heading text-[clamp(40px,3.9vw,56px)] font-bold leading-[1.04] tracking-[-0.02em] [text-wrap:balance]">
            Packaging design that <Highlight>sells</Highlight>.<br className="hidden lg:block" /> Made in our own factory.
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
        <div className="lg:col-span-5">
          {/* One background shape: the blue-50 rounded panel. Photo, illustration and chips all stay inside it. */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-blue-50">
            {photo ?? <Composition alt={alt} />}
            {chips.map((c) => (
              <span key={c.label} data-hero-chip className={`absolute z-10 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink-900 shadow-md sm:text-sm ${c.className}`}>
                {c.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
