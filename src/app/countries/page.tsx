import type { Metadata } from "next";
import { Plane, Ship } from "lucide-react";
import Link from "next/link";
import { site } from "@/config/site";
import { REGIONS, countries, countryHref } from "@/content/countries";
import { quoteHref } from "@/content/navigation";
import { CountryBrowser } from "@/components/countries/CountryBrowser";
import { FlagBadge } from "@/components/countries/FlagBadge";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Countries We Ship Packaging To",
  description: "Packaging design and custom boxes for brands worldwide: local labelling notes, currency and shipping by air or sea from our own factory. Get a free quote.",
  alternates: { canonical: "/countries" },
};

export default function CountriesHub() {
  const featured = countries.filter((c) => c.tier === 1);
  return (
    <>
      <PageHero
        crumbs={[{ label: "Countries" }]}
        eyebrow="Countries"
        title="We design and ship packaging to brands worldwide"
        highlight="worldwide"
        intro={<p>Every country page covers local labelling notes, currency, languages and how we ship there from our own factory, by air or sea.</p>}
        actions={
          <Button href={quoteHref} size="lg" arrow>
            Get a Free Quote
          </Button>
        }
        whatsapp="packaging for my country"
      />

      <Section className="!pt-0">
        <SectionHeader eyebrow="Core markets" title="Where most of our clients are" highlight="clients" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((c) => (
            <li key={c.slug}>
              <Link href={countryHref(c.slug)} className="flex h-full flex-col rounded-2xl border border-silver-300 p-5 transition hover:-translate-y-1 hover:border-blue-600 hover:shadow-md">
                <div className="flex items-center gap-3">
                  <FlagBadge iso2={c.iso2} />
                  <span className="font-heading text-lg font-bold leading-snug">{c.name}</span>
                </div>
                <p className="mt-3 text-sm text-ink-500">
                  {c.languages.join(" · ")} · {c.currency.code}
                </p>
                <p className="mt-1 text-sm text-ink-500">
                  Air: {c.shipping.air ?? "on quote"} · Sea: {c.shipping.sea ?? "on quote"}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section bg="silver-50">
        <SectionHeader eyebrow="All countries" title="Find your country" highlight="your" />
        <div className="mt-10">
          <CountryBrowser items={countries.map(({ slug, name, iso2, region }) => ({ slug, name, iso2, region }))} regions={REGIONS} />
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-silver-300 p-6">
            <Plane aria-hidden="true" className="h-6 w-6 text-blue-600" />
            <p className="mt-3 font-heading text-h4 font-bold">Air freight</p>
            <p className="mt-2 text-ink-500">Fast, for samples, launches and urgent stock.</p>
          </div>
          <div className="rounded-2xl border border-silver-300 p-6">
            <Ship aria-hidden="true" className="h-6 w-6 text-blue-600" />
            <p className="mt-3 font-heading text-h4 font-bold">Sea freight</p>
            <p className="mt-2 text-ink-500">Economical for production volumes when the timeline allows.</p>
          </div>
          <div className="rounded-2xl bg-blue-50 p-6">
            <p className="font-heading text-h4 font-bold">Ship flat, save more</p>
            <p className="mt-2 text-ink-500">Collapsible rigid boxes ship flat, so far more fit per carton and per container.</p>
            <Link href="/collapsible-rigid-boxes" className="mt-3 inline-block font-semibold text-blue-600 hover:underline">
              See collapsible boxes →
            </Link>
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <CTABand
          title="Packaging for your market"
          highlight="market"
          text={`Tell us where your products will be sold. We reply ${site.facts.quoteReply} with a design route, a box recommendation and shipping options.`}
          whatsapp="packaging for my country"
          actions={
            <Button href={quoteHref} variant="accent" size="lg" arrow>
              Get a Free Quote
            </Button>
          }
        />
      </Section>
    </>
  );
}
