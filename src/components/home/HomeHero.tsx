import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { quoteHref } from "@/content/links";
import { promises, site } from "@/config/site";

// Promises come from confirmed facts in config/site.ts; null facts are skipped.
const trust = [...promises(), "Own factory", `MOQ ${site.facts.rigidMoq}`];

/**
 * Homepage hero: text left, a transparent pouch concept image right, sitting directly on the white page
 * (no panel, chips or shapes). Server component; the entrance and idle float are CSS (.hero-in, .hero-pouch
 * in globals.css), off with reduced motion. The image is a concept mockup: never used in /work or the portfolio.
 */
export function HomeHero() {
  return (
    <section className="hero-in overflow-hidden bg-white">
      {/* Desktop: content centred in the first screen (capped at 760px). */}
      <div className="container-x grid items-center gap-10 pb-16 pt-14 lg:min-h-[min(760px,calc(100svh-var(--header-h)-var(--utility-h)-104px))] lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
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
          <ul data-hero-line className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-ink-900">
            {trust.map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-orange-500" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center lg:col-span-6 lg:justify-start">
          {/* ~110% of the column on desktop, overflowing slightly to the right (clipped by the section). */}
          <div className="hero-pouch w-full shrink-0 lg:w-[110%] lg:max-w-none">
            <Image
              src="/images/hero/hero-fuelo-pouch.webp"
              alt="Stand-up pouch packaging design with orange splash, granola and orange slices"
              width={1448}
              height={1086}
              priority
              fetchPriority="high"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="mx-auto h-auto max-h-[380px] w-auto max-w-full object-contain lg:max-h-[620px] lg:w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
