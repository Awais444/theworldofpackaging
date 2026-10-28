import type { Metadata } from "next";
import { Plane, Ship } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { quoteHref } from "@/content/navigation";
import { printedStyles } from "@/content/printedStyles";
import { rigidStyles } from "@/content/rigidStyles";
import { getShipTo, shipTo } from "@/content/shipTo";
import { shipToDetails, shipToSharedFaqs } from "@/content/shipToDetails";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/Cards";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpecTable } from "@/components/ui/SpecTable";
import { Tag } from "@/components/ui/Tag";
import { printedCard, rigidCard } from "@/lib/boxView";
import { faqPage } from "@/lib/schema";

type Props = { params: Promise<{ country: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return shipTo.map((c) => ({ country: c.slug }));
}

const withThe = (country: string) => (["USA", "UK", "UAE"].includes(country) ? `the ${country}` : country);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getShipTo((await params).country);
  if (!c) return {};
  return {
    title: `Custom Packaging Shipped to ${withThe(c.country)}`,
    description: c.intro,
    alternates: { canonical: `/ship-to/${c.slug}` },
  };
}

export default async function ShipToPage({ params }: Props) {
  const c = getShipTo((await params).country);
  if (!c) notFound();
  const d = shipToDetails[c.slug]!;
  const others = shipTo.filter((s) => s.slug !== c.slug);
  const faqs = [...d.faqs, ...shipToSharedFaqs].slice(0, 5);
  const popular = d.popular.map((p) =>
    p.kind === "rigid" ? rigidCard(rigidStyles.find((r) => r.slug === p.slug)!) : printedCard(printedStyles.find((r) => r.slug === p.slug)!),
  );

  return (
    <>
      <JsonLd data={faqPage(faqs)} />
      <PageHero
        crumbs={[{ label: "Shipping", href: "/shipping" }, { label: c.country }]}
        eyebrow={`Ship to ${c.country}`}
        title={`Custom boxes delivered to ${withThe(c.country)}`}
        highlight="delivered"
        intro={<p>{c.intro}</p>}
        slotId="printed-shipping-hero"
        actions={
          <>
            <Button href={`${quoteHref}?country=${c.slug}`} size="lg" arrow>
              Get a Quote
            </Button>
            <Button href="/samples" size="lg" variant="secondary">
              Request a Sample
            </Button>
          </>
        }
      />

      <Section bg="silver">
        <SectionHeader eyebrow="Freight" title={`Getting boxes to ${withThe(c.country)}`} highlight="boxes" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { icon: Plane, name: "Air freight", text: c.air },
            { icon: Ship, name: "Sea freight", text: c.sea },
          ].map((m) => (
            <div key={m.name} className="rounded-2xl bg-white p-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <m.icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <h3 className="text-h4 mt-4">{m.name}</h3>
              <p className="mt-2 text-ink-500">{m.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <SpecTable
            caption={`Shipping to ${c.country} at a glance`}
            rows={[
              { label: "Transit time", value: "Confirmed with your quote" }, // TODO real transit times
              { label: "Quote currency", value: `USD; ${d.currency} (${d.currencyCode}) on request` },
              { label: "Packing", value: "Export cartons, assembled or flat" },
              { label: "Documents", value: "Commercial invoice, packing list" },
            ]}
          />
          <p className="self-center text-ink-500">
            Shipping overseas?{" "}
            <Link href="/collapsible-rigid-boxes" className="font-semibold text-blue-600 underline underline-offset-4">
              Collapsible rigid boxes
            </Link>{" "}
            ship flat and cut freight volume.
          </p>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Good to know" title="Before you import" highlight="import" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {c.notes.map((n) => (
            <div key={n.title} className="rounded-2xl border border-silver-300 p-6">
              <h3 className="text-h4">{n.title}</h3>
              <p className="mt-2 text-ink-500">{n.body}</p>
            </div>
          ))}
        </div>
        <Tag tone="orange" className="mt-6">
          General guidance, not customs advice
        </Tag>
      </Section>

      <Section bg="blue-50">
        <SectionHeader eyebrow="Popular" title={`Popular boxes in ${withThe(c.country)}`} highlight="Popular" />
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:gap-6 lg:grid-cols-4">
          {popular.map((p) => (
            <ProductCard key={p.href} {...p} />
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title={`Shipping to ${withThe(c.country)}`} highlight="Shipping" />
            <p className="mt-8 text-sm font-semibold text-ink-500">Other countries</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/ship-to/${o.slug}`} className="inline-flex h-10 items-center rounded-full border border-silver-300 px-4 text-sm font-medium hover:border-blue-600 hover:text-blue-600">
                    {o.country}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faqs} />
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <CTABand
          title={`Shipping to ${withThe(c.country)}?`}
          whatsapp={`packaging shipped to ${withThe(c.country)}`}
          highlight="Shipping"
          text={`We quote delivered prices from ${site.country}, by air or sea.`}
          actions={
            <>
              <Button href={`${quoteHref}?country=${c.slug}`} variant="accent" size="lg" arrow>
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
