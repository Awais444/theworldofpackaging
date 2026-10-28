import type { Metadata } from "next";
import { Check, CheckCircle2, Minus } from "lucide-react";
import { site } from "@/config/site";
import { packageComparison, packages } from "@/content/packages";
import { priceLabel } from "@/content/pricing";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { faqPage } from "@/lib/schema";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Packages: design + manufacturing bundles",
  description: `Fixed-scope bundles that combine branding, packaging design and rigid box production. From ${site.facts.rigidMoq} boxes.`,
  alternates: { canonical: "/packages" },
};

const faqs = [
  { q: "Can I change what is in a package?", a: "Yes. Packages are starting points; we adjust quantities, box style or design scope and requote." },
  { q: "What is not included?", a: "Shipping, import duties and product photography are quoted separately unless stated in your proposal." },
  { q: "Can I order more than 500 boxes?", a: "Of course. Unit price drops at higher quantities. Ask for a quote with your quantities." },
  { q: "How long does a package take?", a: "It depends on design rounds and production. We give you a timeline with dates in the proposal." }, // TODO typical timelines
  { q: "Do I pay everything up front?", a: "Payment terms are set out in your proposal." }, // TODO deposit / balance terms
];

const included = [
  "Design by our in-house studio",
  "Artwork on the real dieline",
  "A physical sample before production",
  "Production in our own factory",
  "Free design support on reorders",
  "One team from brief to delivery",
];

export default function PackagesPage() {
  return (
    <>
      <JsonLd data={faqPage(faqs)} />
      <PageHero
        crumbs={[{ label: "Services", href: "/services" }, { label: "Packages" }]}
        eyebrow="Packages"
        title="Design and boxes in one scope"
        highlight="one"
        intro={<p>Three bundles for the most common starting points. Each runs through our studio and factory without a hand-off, and each ends with boxes, not just files.</p>}
        slotId="mega-menu-feature"
        actions={
          <>
            <Button href="#bundles" size="lg" arrow>
              Compare packages
            </Button>
            <Button href="/start-a-project" size="lg" variant="secondary">
              Start a Project
            </Button>
          </>
        }
      />

      <Section id="bundles" bg="silver">
        <SectionHeader eyebrow="Bundles" title="Pick your starting point" highlight="starting" align="center" />
        <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
          {packages.map((p) => (
            <article
              key={p.slug}
              id={p.slug}
              className={cn("relative flex h-full scroll-mt-28 flex-col rounded-3xl bg-white p-8", p.featured ? "border-2 border-blue-600 shadow-md lg:-mt-4 lg:pb-12" : "border border-silver-300")}
            >
              {p.featured && <span className="absolute -top-3.5 left-8 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-900">Most popular</span>}
              <h2 className="text-h3">{p.name}</h2>
              <p className="mt-2 text-ink-500">{p.forWho}</p>
              {/* TODO: real prices in content/packages.ts */}
              <p className="mt-6 font-heading text-3xl font-bold">{priceLabel(p.priceFrom)}</p>
              <ul className="mt-6 space-y-3">
                {p.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Button href={`/start-a-project?package=${p.slug}`} variant={p.featured ? "primary" : "secondary"} className="w-full" arrow>
                  Choose {p.name}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Every package" title="What's always included" highlight="always" />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {included.map((i) => (
              <li key={i} className="flex gap-3 rounded-2xl bg-silver-50 p-5">
                <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0 text-orange-500" />
                <span className="font-medium">{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section bg="blue-50">
        <SectionHeader eyebrow="Compare" title="Side by side" highlight="side" />
        <div className="mt-12 overflow-x-auto rounded-2xl border border-silver-300 bg-white">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <caption className="sr-only">What each package includes</caption>
            <thead>
              <tr className="border-b border-silver-300">
                <th scope="col" className="px-5 py-4 text-sm font-semibold text-ink-500">
                  Included
                </th>
                {packages.map((p) => (
                  <th key={p.slug} scope="col" className="px-5 py-4 text-center">
                    <span className="font-heading font-bold">{p.name}</span>
                    {p.featured && (
                      <span className="ml-2 align-middle">
                        <Tag tone="orange">Popular</Tag>
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {packageComparison.map((row) => (
                <tr key={row.label} className="odd:bg-silver-50">
                  <th scope="row" className="px-5 py-4 font-medium">
                    {row.label}
                  </th>
                  {packages.map((p) => {
                    const v = row.values[p.slug];
                    return (
                      <td key={p.slug} className="px-5 py-4 text-center text-sm">
                        {v === true ? (
                          <Check aria-label="Included" className="mx-auto h-5 w-5 text-blue-600" />
                        ) : v === false || v === undefined ? (
                          <Minus aria-label="Not included" className="mx-auto h-5 w-5 text-ink-400" />
                        ) : (
                          v
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title="Package questions" highlight="questions" />
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faqs} />
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <CTABand
          title="Not sure which package fits?"
          highlight="fits"
          text="Tell us what you are launching and we will recommend a package or a custom scope."
          actions={
            <>
              <Button href="/start-a-project" variant="accent" size="lg" arrow>
                Start a Project
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
