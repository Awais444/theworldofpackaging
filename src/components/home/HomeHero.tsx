import { preload } from "react-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { quoteHref } from "@/content/links";
import { site, yearsLabel } from "@/config/site";
import hero from "@/content/heroImage.json";

// Static variants from scripts/gen-hero.mjs (prebuild): no runtime optimisation for the LCP-area image.
const HERO_SIZES = "(min-width: 1024px) 42vw, 92vw";

// Rotating H1 word. The first one is what shows with reduced motion and without CSS animation.
const services = ["Packaging Design", "Label Design", "Rigid Box Design", "Pouch Design", "Brand Identity"];
const promiseLine = [`MOQ ${site.facts.rigidMoq}`, `Quote ${site.facts.quoteReply}`, `First concepts in ${site.facts.firstConceptHours} hours`, "Free design support"];
// Same facts as the utility bar and companyFacts.
const trust = [yearsLabel(), `MOQ ${site.facts.rigidMoq}`, "190+ countries"];
const captions = [`${yearsLabel("Years")} in Packaging`, `MOQ ${site.facts.rigidMoq} Rigid Boxes`, "Ships to 190+ Countries"];

/**
 * Homepage hero, sized to the first screen on desktop (100svh minus utility bar and header, 600–760px).
 * Desktop grid: intro (cols 1–6, row 1, centred) and trust row (row 2) on the left; image + caption card on
 * the right spanning both rows, so the card's bottom lines up with the trust row. Mobile order: intro,
 * image, card, trust row. Motion is CSS only (globals.css), off with reduced motion.
 * The pouch is a concept mockup: never used in /work or the portfolio.
 */
export function HomeHero() {
  // React hoists this into <head>, ahead of the stylesheets. AVIF only: browsers without it skip the hint.
  preload(hero.fallback, { as: "image", type: "image/avif", imageSrcSet: hero.avif, imageSizes: HERO_SIZES, fetchPriority: "high" });
  return (
    <section className="hero-in overflow-hidden bg-white">
      <div className="container-x grid gap-x-12 gap-y-8 pb-10 pt-10 lg:h-[clamp(600px,calc(100svh-var(--header-h)-var(--utility-h)),760px)] lg:grid-cols-12 lg:grid-rows-[1fr_auto] lg:pt-12">
        <div className="lg:col-span-6 lg:self-center">
          <p data-hero-line className="inline-flex h-7 items-center gap-2 rounded-full bg-blue-50 px-3 text-[12px] font-bold uppercase tracking-[0.12em] text-blue-600">
            <span aria-hidden="true" className="hero-dot relative h-2 w-2 rounded-full bg-success" />
            Available for new projects
          </p>
          <p data-hero-line aria-hidden="true" className="mt-5 text-sm font-semibold uppercase tracking-[0.08em] text-ink-500">
            Packaging design studio + own factory for
          </p>
          <h1 data-hero-line className="mt-2 font-heading text-[clamp(44px,5vw,72px)] font-bold leading-[1.04] tracking-[-0.02em] text-ink-900">
            <span className="sr-only">Packaging design that sells. Made in our own factory.</span>
            {/* Words share one grid cell, so the widest reserves the space and nothing shifts. */}
            <span aria-hidden="true" className="hero-word grid lg:whitespace-nowrap">
              {services.map((s) => (
                <span key={s} className="col-start-1 row-start-1">
                  {s}
                </span>
              ))}
            </span>
          </h1>
          <p data-hero-line className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-ink-500">
            Specialist packaging designers with our own rigid box factory. Print-ready boxes, labels and pouches for food, cosmetic, supplement and CBD brands, shipped to 190+ countries.
          </p>
          <div data-hero-line className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <WhatsAppButton topic="packaging design" label="Chat on WhatsApp" variant="primary" className="w-full sm:w-auto" />
            <Button href={quoteHref} size="lg" variant="secondary" arrow className="w-full sm:w-auto">
              Get a Free Quote
            </Button>
          </div>
          <p data-hero-line className="mt-4 text-[13px] text-ink-500">{promiseLine.join(" · ")}</p>
        </div>

        <div className="flex flex-col items-center lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
          <div className="hero-pouch w-full lg:relative lg:min-h-0 lg:flex-1">
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
          <div className="relative z-10 mt-4 flex h-14 w-full items-center justify-between gap-4 rounded-2xl border border-silver-100 bg-white px-6 shadow-[0_8px_24px_rgba(20,19,23,.06)] lg:-mt-6 lg:w-[85%]">
            <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-500">Packaging design</span>
            <span className="flex items-center gap-2.5">
              <span aria-hidden="true" className="hero-dot relative h-2 w-2 rounded-full bg-success" />
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

        <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-silver-100 pt-5 text-sm font-medium text-ink-900 lg:col-span-6 lg:row-start-2">
          {trust.map((t) => (
            <li key={t} className="inline-flex items-center gap-2">
              <Check aria-hidden="true" className="h-4 w-4 text-orange-600" strokeWidth={2.5} />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
