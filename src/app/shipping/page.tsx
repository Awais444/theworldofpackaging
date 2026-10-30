import type { Metadata } from "next";
import { metaDescription, ogFor } from "@/lib/seo";
import { ArrowRight, CheckCircle2, Plane, Ship } from "lucide-react";
import Link from "next/link";
import { site } from "@/config/site";
import { quoteHref } from "@/content/navigation";
import { shippingByRegion, shippingNote } from "@/config/site";
import { countries, countryHref } from "@/content/countries";
import { FadeIn } from "@/components/motion/FadeIn";
import { FreightSlider } from "@/components/sections/FreightSlider";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { faqPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Worldwide Shipping: air and sea",
  description: metaDescription(`Packaging shipped from ${site.country} to ${site.markets.join(", ")} by air and sea, with export documents prepared.`),
  alternates: { canonical: "/shipping" }, openGraph: ogFor("/shipping"),
};

const modes = [
  { icon: Plane, name: "Air freight", best: "Launches and urgent stock", points: ["Fastest door-to-door", "Charged on actual or volumetric weight, whichever is higher", "Delivered to your door or 3PL"] },
  { icon: Ship, name: "Sea freight", best: "Production runs and repeat stock", points: ["Lowest cost per box at volume", "Charged on volume, with a minimum", "Port delivery, then road to your warehouse"] },
];

const packing = [
  "Boxes packed in strong export cartons",
  "Corner protection and dividers for rigid boxes",
  "Collapsible boxes packed flat in bundles",
  "Cartons labelled with your SKU and count",
  "Palletised for sea freight on request",
];

const faqs = [
  { q: "Air or sea?", a: "Air for launches and urgent stock; sea for production volumes. We quote both on request." },
  { q: "Who pays import duties?", a: "Usually the importer. Ask us whether delivered-duty-paid shipping is possible for your country." }, // TODO confirm DDP availability
  { q: "How long does shipping take?", a: "Transit time depends on the route and service. We confirm it with your quote." }, // TODO real transit times
  { q: "Can collapsible boxes cut my freight cost?", a: "Yes. They ship flat, so more boxes fit per carton. We compare both options in your quote." },
];

export default function ShippingPage() {
  return (
    <>
      <JsonLd data={faqPage(faqs)} />
      <PageHero
        crumbs={[{ label: "Shipping" }]}
        eyebrow="Worldwide shipping"
        title="From our factory to your door"
        highlight="door"
        intro={<p>We pack in export cartons, book freight and prepare the documents. Choose air for speed or sea for cost; collapsible boxes make both cheaper.</p>}
        slotId="printed-shipping-hero"
        actions={
          <>
            <Button href={quoteHref} size="lg" arrow>
              Quote with freight
            </Button>
            <Button href="/collapsible-rigid-boxes" size="lg" variant="secondary">
              Collapsible boxes
            </Button>
          </>
        }
      />

      <Section bg="silver">
        <FadeIn>
          <SectionHeader eyebrow="Air vs sea" title="Two ways to ship" highlight="ship" />
        </FadeIn>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {modes.map((m) => (
            <div key={m.name} className="rounded-3xl bg-white p-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <m.icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <h3 className="text-h3 mt-4">{m.name}</h3>
              <p className="mt-1 text-sm font-semibold text-orange-text">Best for: {m.best}</p>
              <ul className="mt-5 space-y-2.5">
                {m.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Assembled vs flat" title="Ship boxes, not air" highlight="air" lead="Collapsible rigid boxes ship flat. Move the slider to compare carton volume (example figures)." />
        <div className="mt-12">
          <FreightSlider />
        </div>
      </Section>

      <Section bg="blue-50">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Packing" title="Packed for the journey" highlight="journey" />
            <ul className="mt-8 space-y-3">
              {packing.map((p) => (
                <li key={p} className="flex gap-3 rounded-2xl bg-white p-4">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader eyebrow="Duties + documents" title="At the border" highlight="border" />
            <div className="mt-8 space-y-4">
              {[
                ["Documents", "Commercial invoice and packing list with every shipment; certificate of origin on request."],
                ["Duties and taxes", "Import duty and VAT or sales tax are set by your country and usually paid by the importer."],
                ["Delivered duty paid (DDP)", "We can quote DDP to some destinations. Ask with your quote."], // TODO verify DDP availability
                ["Your broker", "For sea freight you normally need a customs broker at destination. We work with yours."],
              ].map(([t, b]) => (
                <div key={t} className="rounded-2xl bg-white p-5">
                  <h3 className="font-heading text-lg font-bold">{t}</h3>
                  <p className="mt-1 text-ink-500">{b}</p>
                </div>
              ))}
            </div>
            <Tag tone="orange" className="mt-6">
              General guidance, not customs advice
            </Tag>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Transit times" title="Approximate shipping times by region" highlight="Approximate" lead={shippingNote} />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-silver-300">
          <table className="w-full min-w-[30rem] border-collapse text-left">
            <caption className="sr-only">Approximate transit times by region, after dispatch</caption>
            <thead>
              <tr className="bg-silver-50 text-sm text-ink-500">
                <th scope="col" className="px-5 py-3 font-semibold">Region</th>
                <th scope="col" className="px-5 py-3 font-semibold">Air (approx.)</th>
                <th scope="col" className="px-5 py-3 font-semibold">Sea (approx.)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(shippingByRegion).map(([region, t]) => (
                <tr key={region} className="border-t border-silver-300">
                  <th scope="row" className="px-5 py-3 font-semibold text-ink-900">{region}</th>
                  <td className="px-5 py-3">Approx. {t.air}</td>
                  <td className="px-5 py-3">Approx. {t.sea}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Countries" title="Country guides" highlight="Country" lead="We ship worldwide. Each country page covers labelling notes, currency and shipping." />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {countries.filter((c) => c.tier === 1).map((c) => (
            <li key={c.slug}>
              <Link href={countryHref(c.slug)} className="group flex items-center justify-between rounded-2xl border border-silver-300 p-6 transition hover:-translate-y-1 hover:border-blue-600 hover:shadow-md">
                <span className="font-heading text-xl font-bold">{c.name}</span>
                <ArrowRight aria-hidden="true" className="h-5 w-5 text-blue-600 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section bg="silver">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title="Shipping questions" highlight="questions" />
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faqs} />
          </div>
        </div>
      </Section>

      <Section>
        <CTABand
          title="Get a delivered price"
          highlight="delivered"
          text="Tell us the destination and we include freight in your quote."
          actions={
            <>
              <Button href={quoteHref} variant="accent" size="lg" arrow>
                Get a Quote
              </Button>
              <Button href="/contact" variant="white" size="lg">
                Talk to us
              </Button>
            </>
          }
        />
      </Section>
    </>
  );
}
