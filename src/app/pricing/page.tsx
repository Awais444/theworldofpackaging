import type { Metadata } from "next";
import { metaDescription, ogFor } from "@/lib/seo";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { site } from "@/config/site";
import { quoteHref } from "@/content/navigation";
import { packages } from "@/content/packages";
import { designFeeNote, designPricing, designTiers, priceLabel } from "@/content/pricing";
import { printedStyles } from "@/content/printedStyles";
import { rigidStyles } from "@/content/rigidStyles";
import { servicePages } from "@/content/servicePages";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tabs } from "@/components/ui/Tabs";
import { faqPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Packaging Design Cost and Pricing",
  description: metaDescription("Packaging design cost explained: what affects the price, design fees credited when we manufacture in our own factory. Get a free quote."),
  alternates: { canonical: "/pricing" }, openGraph: ogFor("/pricing"),
};

type Row = { href: string; name: string; cells: string[]; price: string };

function PriceTable({ head, rows, caption }: { head: string[]; rows: Row[]; caption: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-silver-300">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-silver-50">
          <tr>
            {[...head, "Price"].map((h) => (
              <th key={h} scope="col" className="px-5 py-3 text-sm font-semibold text-ink-500">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.href} className="border-t border-silver-300">
              <th scope="row" className="px-5 py-4 font-semibold">
                <Link href={r.href} className="hover:text-blue-600">
                  {r.name}
                </Link>
              </th>
              {r.cells.map((c, i) => (
                <td key={i} className="px-5 py-4 text-sm text-ink-500">
                  {c}
                </td>
              ))}
              <td className="px-5 py-4 text-sm font-semibold">{r.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Drivers({ items }: { items: string[] }) {
  return (
    <div className="mt-8 rounded-2xl bg-silver-50 p-6">
      <p className="text-sm font-semibold text-ink-500">What sets the price</p>
      <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
        {items.map((d) => (
          <li key={d} className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-orange-500" />
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
}

const faqs = [
  { q: "Is the design fee credited if you make my packaging?", a: `${designFeeNote} The amount and conditions are set out in your quote.` },
  { q: "Why do most prices say “Get a quote”?", a: "Packaging prices depend on size, materials, finishes and quantity, so we quote each job instead of showing misleading averages." },
  { q: "Are prices in USD?", a: "Quotes are in USD by default; other currencies on request." },
  { q: "Is shipping included?", a: "No. We quote air and sea freight separately once we know quantity and destination." },
  { q: "How do I pay?", a: "Payment terms are set out in your quote." }, // TODO: confirm deposit / balance terms
];

export default function PricingPage() {
  const design = (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {designPricing.map((p) => (
          <div key={p.id} className="flex flex-col rounded-3xl border border-silver-300 p-6">
            <h3 className="text-h4">{p.name}</h3>
            <p className="mt-2 text-sm text-ink-500">{p.summary}</p>
            {/* TODO: priceFrom values in content/pricing.ts */}
            <p className="mt-4 font-heading text-2xl font-bold">{priceLabel(p.priceFrom)}</p>
            <Button href={`${quoteHref}?service=${p.id}`} variant="secondary" className="mt-auto w-full" arrow>
              Get a quote
            </Button>
          </div>
        ))}
      </div>
      <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-text">
        <CheckCircle2 aria-hidden="true" className="h-4 w-4" /> {designFeeNote}
      </p>
      <div className="mt-10">
        <h3 className="text-h4">Design tiers for every service</h3>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          {designTiers.map((t) => (
            <div key={t.id} className={t.id === "standard" ? "rounded-3xl border-2 border-blue-600 p-6" : "rounded-3xl border border-silver-300 p-6"}>
              <p className="font-heading text-lg font-bold">{t.name}</p>
              <p className="mt-1 text-sm text-ink-500">{t.summary}</p>
              <p className="mt-3 font-semibold">{priceLabel(t.priceFrom)}</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {t.includes.map((i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Button href="/packaging-design" variant="ghost" arrow className="mt-8">
        All packaging design services
      </Button>
    </>
  );

  const rigid = (
    <>
      <PriceTable
        caption="Rigid box styles"
        head={["Style", "MOQ", "Board"]}
        rows={rigidStyles.map((s) => ({
          href: `/rigid-boxes/${s.slug}`,
          name: s.name,
          cells: [String(s.moq), `${Math.min(...s.boardMm).toFixed(1)}–${Math.max(...s.boardMm).toFixed(1)} mm`],
          price: priceLabel(s.priceFrom ?? null),
        }))}
      />
      <Drivers items={["Box size", "Board thickness", "Wrap material", "Finishes (foil, emboss, spot UV)", "Insert", "Quantity"]} />
    </>
  );

  const printed = (
    <>
      <PriceTable
        caption="Printed box styles"
        head={["Style", "Material"]}
        rows={printedStyles.map((s) => ({ href: `/printed-boxes/${s.slug}`, name: s.name, cells: [s.materials[0] ?? ""], price: priceLabel(null) }))}
      />
      <Drivers items={["Box size", "Board or flute", "Print sides and colours", "Finishes", "Quantity"]} />
    </>
  );

  const branding = (
    <PriceTable
      caption="Branding and imagery services"
      head={["Service"]}
      rows={servicePages.map((s) => ({ href: `/services/${s.path}`, name: s.name, cells: [s.summary], price: priceLabel(s.priceFrom) }))}
    />
  );

  const bundles = (
    <>
      <PriceTable
        caption="Packages"
        head={["Package", "For"]}
        rows={packages.map((p) => ({ href: `/packages#${p.slug}`, name: p.name, cells: [p.forWho], price: priceLabel(p.priceFrom) }))}
      />
      <Button href="/packages" variant="ghost" arrow className="mt-8">
        Compare packages
      </Button>
    </>
  );

  return (
    <>
      <JsonLd data={faqPage(faqs)} />
      <PageHero
        crumbs={[{ label: "Pricing" }]}
        eyebrow="Pricing"
        title="Packaging design cost and box pricing"
        highlight="cost"
        intro={<p>Packaging design cost depends on the scope: design is priced per project, and the design fee is credited when we manufacture your order. Box prices depend on size, materials and quantity, so we quote each job {site.facts.quoteReply}.</p>}
        actions={
          <Button href={quoteHref} size="lg" arrow>
            Get a Free Quote
          </Button>
        }
        whatsapp="pricing for packaging design and boxes"
      />
      <Section className="!pt-0">
        <Tabs
          label="Pricing categories"
          items={[
            { id: "packaging-design", label: "Packaging Design", content: design },
            { id: "rigid", label: "Rigid Boxes", content: rigid },
            { id: "printed", label: "Printed Boxes", content: printed },
            { id: "branding", label: "Branding", content: branding },
            { id: "packages", label: "Packages", content: bundles },
          ]}
        />
      </Section>
      <Section bg="silver">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title="Pricing questions" highlight="questions" />
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faqs} />
          </div>
        </div>
      </Section>
      <Section>
        <CTABand
          title="Get a real number"
          highlight="real"
          text="Send your product, size and quantity. We reply with a fixed quote."
          whatsapp="pricing for packaging design and boxes"
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
