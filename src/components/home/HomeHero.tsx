import { preload } from "react-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { quoteHref } from "@/content/links";
import { site, yearsLabel } from "@/config/site";
import hero from "@/content/heroImage.json";

// Static variants from scripts/gen-hero.mjs (prebuild): no runtime optimisation for the LCP-area image.
const HERO_SIZES = "(min-width: 1024px) 46vw, 92vw";

// Same facts as the utility bar and companyFacts.
const trust = [yearsLabel(), `MOQ ${site.facts.rigidMoq}`, "190+ countries"];
const captions = [`${yearsLabel("Years")} in Packaging`, `MOQ ${site.facts.rigidMoq} Rigid Boxes`, "Ships to 190+ Countries"];

/**
 * Homepage hero: text left, a transparent pouch concept image right with a caption card under it.
 * Both columns stretch to the grid row; the left ends with the trust row and the right with the caption card,
 * so their bottoms line up. Motion is CSS (.hero-in, .hero-pouch, .hero-caption in globals.css), off with
 * reduced motion. The image is a concept mockup: never used in /work or the portfolio.
 */
export function HomeHero() {
  // React hoists this into <head>, ahead of the stylesheets. AVIF only: browsers without it skip the hint.
  preload(hero.fallback, { as: "image", type: "image/avif", imageSrcSet: hero.avif, imageSizes: HERO_SIZES, fetchPriority: "high" });
  return (
    <section className="hero-in overflow-hidden bg-white">
      <div className="container-x grid gap-10 pb-16 pt-14 lg:min-h-[min(760px,calc(100svh-var(--header-h)-var(--utility-h)-104px))] lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col lg:col-span-6">
          <div className="lg:my-auto">
            <p data-hero-line className="text-eyebrow text-blue-600">
              Packaging design studio + own factory
            </p>
            <h1 data-hero-line className="mt-4 font-heading text-[clamp(40px,3.9vw,56px)] font-bold leading-[1.04] tracking-[-0.02em] [text-wrap:balance]">
              {/* "sells." stays together, so ". Made in" never starts a line. */}
              Packaging design that{" "}
              <span className="whitespace-nowrap">
                <Highlight>sells</Highlight>.
              </span>
              <br className="hidden lg:block" /> Made in our own factory.
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
          </div>
          <ul data-hero-line className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-silver-100 pt-5 text-sm font-medium text-ink-900">
            {trust.map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <Check aria-hidden="true" className="h-4 w-4 text-orange-600" strokeWidth={2.5} />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center lg:col-span-6">
          <div className="flex w-full flex-1 items-end justify-center lg:justify-start">
            {/* ~110% of the column on desktop, overflowing slightly to the right (clipped by the section). */}
            <div className="hero-pouch w-full shrink-0 lg:w-[110%] lg:max-w-none">
              <picture className="hero-pouch-float block">
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
                  className="mx-auto h-auto max-h-[380px] w-auto max-w-full object-contain lg:max-h-[560px] lg:w-full"
                />
              </picture>
            </div>
          </div>
          <div className="relative z-10 mt-4 flex h-14 w-full items-center justify-between gap-4 rounded-2xl border border-silver-100 bg-white px-6 shadow-[0_8px_24px_rgba(20,19,23,.06)] lg:-mt-6 lg:w-[85%]">
            <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-500">Packaging design</span>
            <span className="flex items-center gap-2.5">
              <span aria-hidden="true" className="hero-dot relative h-2 w-2 rounded-full bg-success" />
              {/* Captions are stacked in one grid cell (no layout shift); CSS cycles them, the first shows without motion. */}
              <span className="hero-caption grid text-[15px] font-semibold text-ink-900">
                {captions.map((c, i) => (
                  <span key={c} aria-hidden={i > 0 || undefined} className="col-start-1 row-start-1 whitespace-nowrap text-right">
                    {c}
                  </span>
                ))}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
