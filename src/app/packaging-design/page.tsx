import type { Metadata } from "next";
import { collectionPage } from "@/lib/schema";
import { metaDescription } from "@/lib/seo";
import Link from "next/link";
import { getPost } from "@/content/blog/posts";
import { hubFaqs, hubGuides, hubSections } from "@/content/designHubCopy";
import { CheckCircle2 } from "lucide-react";
import { site } from "@/config/site";
import { designServices } from "@/content/designServices";
import { quoteHref } from "@/content/navigation";
import { designFeeNote } from "@/content/pricing";
import { DesignHubBrowser } from "@/components/design/DesignHubBrowser";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Packaging Design Services",
  description: metaDescription(`${site.facts.yearsExperience}+ years in packaging. Design for boxes, labels and pouches, made in our own factory from ${site.facts.rigidMoq} units. Concepts in 48 hours. Free quote.`),
  alternates: { canonical: "/packaging-design" },
};

const reasons = [
  { title: "Designed for print", text: "Every design is drawn for the board, press and finishes it will be made with." },
  { title: "Made in our factory", text: `Rigid and printed boxes from ${site.facts.rigidMoq} units, with a digital proof before print.` },
  { title: "Fee credited", text: designFeeNote },
  { title: "Fast first concepts", text: `First directions usually within ${site.facts.firstConceptHours} hours.` },
];

const faqs = hubFaqs;
const guides = hubGuides.map(getPost).filter((p): p is NonNullable<ReturnType<typeof getPost>> => Boolean(p));

export default function PackagingDesignHub() {
  return (
    <>
      <JsonLd data={collectionPage({ name: "Packaging design services", description: "Packaging design services from The World of Packaging.", path: "/packaging-design", items: designServices.map((d) => ({ name: d.name, path: `/packaging-design/${d.slug}` })) })} />
      <JsonLd data={faqPage(faqs)} />
      <PageHero
        crumbs={[{ label: "Packaging Design" }]}
        whatsapp="packaging design"
        eyebrow="Packaging design services"
        title="Packaging design services for every product"
        highlight="every"
        intro={<p>Our packaging design services cover boxes, labels, pouches and displays, designed by our studio and made in our own factory. Choose your product or format below.</p>}
        slotId="packaging-design-hub"
        actions={
          <>
            <Button href={quoteHref} size="lg" arrow>
              Get a Free Quote
            </Button>
          </>
        }
      />

      <Section bg="silver" className="!py-12 md:!py-16">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((b) => (
            <li key={b.title} className="flex gap-3">
              <CheckCircle2 aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-orange-500" />
              <div>
                <p className="font-heading text-lg font-bold">{b.title}</p>
                <p className="mt-1 text-sm text-ink-500">{b.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeader eyebrow="Services" title="Find your packaging design service" highlight="your" />
        <div className="mt-10">
          <DesignHubBrowser items={designServices.map(({ slug, name, short, illustration, group, formats }) => ({ slug, name, short, illustration, group, formats }))} />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <article className="max-w-[70ch] lg:col-span-8">
            {hubSections.map((sec, i) => (
              <div key={sec.h2} className={i > 0 ? "mt-12" : undefined}>
                <h2 className="text-h3">{sec.h2}</h2>
                {sec.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="mt-4 text-ink-500">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </article>
          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-silver-300 p-6 lg:sticky lg:top-[120px]">
              <p className="text-eyebrow text-blue-600">Related guides</p>
              <ul className="mt-4 space-y-3">
                {guides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/blog/${g.slug}`} className="font-semibold text-ink-900 hover:text-blue-600 hover:underline">
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <Section bg="silver">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title="Packaging design questions" highlight="questions" />
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faqs} />
          </div>
        </div>
      </Section>

      <Section>
        <CTABand
          title="Tell us what you are packaging"
          highlight="packaging"
          text="Send your product details. We recommend a design route and a box, and quote both."
          whatsapp="packaging design"
          actions={
            <>
              <Button href={quoteHref} variant="accent" size="lg" arrow>
                Get a Free Quote
              </Button>
            </>
          }
        />
      </Section>
    </>
  );
}
