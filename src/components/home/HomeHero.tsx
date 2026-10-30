import { preload } from "react-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { HeroRotator } from "@/components/home/HeroRotator";
import { quoteHref } from "@/content/links";
import { site, yearsLabel } from "@/config/site";
import hero from "@/content/heroImage.json";

// Static variants from scripts/gen-hero.mjs (prebuild): no runtime optimisation for the LCP-area image.
const HERO_SIZES = "(min-width: 1024px) 42vw, 92vw";

// First phrase is server-rendered and is the reduced-motion fallback.
const phrases = ["Product Packaging Design", "Pouch Design", "Label Design", "Rigid Box Design", "Brand Identity Design", "Box Packaging Design"];
const factsLine = [`MOQ ${site.facts.rigidMoq}`, "Collapsible rigid boxes", "Digital proof before print"];

/**
 * Homepage hero, sized to the first screen on desktop (100svh minus utility bar and header, 600–760px).
 * Desktop grid, 2 rows: row 1 = intro (cols 1–6, centred) + image (cols 7–12); row 2 = trust row + caption
 * card, both 56px tall in the same row, so their bottoms sit on one line. Mobile order: intro, image, card,
 * trust row. Motion is CSS + a small rotator, off with reduced motion.
 * The pouch is a concept mockup: never used in /work or the portfolio.
 */
export function HomeHero() {
  // React hoists this into <head>, ahead of the stylesheets. AVIF only: browsers without it skip the hint.
  preload(hero.fallback, { as: "image", type: "image/avif", imageSrcSet: hero.avif, imageSizes: HERO_SIZES, fetchPriority: "high" });
  return (
    <section className="hero-in overflow-hidden bg-white">
      <div className="container-x grid gap-x-12 gap-y-8 pb-10 pt-10 lg:h-[clamp(600px,calc(100svh-var(--header-h)-var(--utility-h)),760px)] lg:grid-cols-12 lg:grid-rows-[1fr_auto] lg:gap-y-6 lg:pt-12">
        <div data-hero-focus className="lg:col-span-6 lg:self-center">
          <p data-hero-line className="inline-flex min-h-7 items-center rounded-full bg-blue-50 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.1em] text-blue-600">
            Packaging studio + printing press
          </p>
          {/* Line 1 is sized from the column width (cqi) so the longest phrase always fits on one line. */}
          <h1 data-hero-line className="@container mt-5 font-heading font-bold leading-[1.12] tracking-[-0.02em] text-ink-900">
            <span className="sr-only">Packaging design, labels, pouches, rigid boxes and brand identity, made under one roof.</span>
            <span className="block text-[min(52px,7.8cqi)]">
              <HeroRotator phrases={phrases} />
            </span>
            <span aria-hidden="true" className="mt-1 block text-[clamp(36px,3.6vw,52px)]">
              made under one roof.
            </span>
          </h1>
          <p data-hero-line className="mt-5 max-w-[50ch] text-[17px] leading-relaxed text-ink-500">
            Brand identity, packaging design and rigid boxes from our own factory. One team from first sketch to the box on your doorstep.
          </p>
          <div data-hero-line className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={quoteHref} size="lg" arrow className="w-full sm:w-auto">
              Get a Free Quote
            </Button>
            <WhatsAppButton topic="packaging design" label="WhatsApp" variant="secondary" className="w-full sm:w-auto" />
          </div>
          <p data-hero-line className="mt-4 text-[13px] text-ink-500">{factsLine.join(" · ")}</p>
        </div>

        <div className="hero-pouch w-full lg:relative lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:min-h-0">
          <picture>
            <source type="image/avif" srcSet={hero.avif} sizes={HERO_SIZES} />
            <source type="image/webp" srcSet={hero.webp} sizes={HERO_SIZES} />
            <img
              src={hero.fallback}
              alt="Stand-up pouch packaging design with orange splash, granola and orange slices"
              width={hero.width}
              height={hero.height}
              sizes={HERO_SIZES}
              fetchPriority="high"
              decoding="async"
              loading="eager"
              className="mx-auto h-auto max-h-[380px] w-auto max-w-full object-contain lg:absolute lg:inset-0 lg:h-full lg:max-h-none lg:w-full"
            />
          </picture>
        </div>

        <div className="relative z-10 mx-auto -mt-4 flex h-14 w-full items-center justify-between gap-4 rounded-2xl border border-silver-100 bg-white px-6 shadow-[0_8px_24px_rgba(20,19,23,.06)] lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:-mt-12 lg:w-[85%] lg:self-end">
          <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-500">Own factory</span>
          <span className="flex items-center gap-2.5 whitespace-nowrap text-[15px] font-semibold text-ink-900">
            <span aria-hidden="true" className="hero-dot relative h-2 w-2 rounded-full bg-success" />
            Ships to 190+ countries
          </span>
        </div>

        <div className="flex min-h-14 flex-wrap items-center gap-x-6 gap-y-2 border-t border-silver-100 py-3 text-sm font-medium text-ink-900 lg:col-span-6 lg:row-start-2 lg:h-14 lg:self-end lg:py-0">
          <p className="inline-flex items-start gap-2">
            <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" strokeWidth={2.5} />
            <span>
              <span className="text-ink-500">Trusted by</span> {site.clients.map((c) => c.name).join(" · ")}
            </span>
          </p>
          <p className="inline-flex items-center gap-2">
            <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-orange-600" strokeWidth={2.5} />
            {yearsLabel()}
          </p>
        </div>
      </div>
    </section>
  );
}
