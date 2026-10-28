import type { Metadata } from "next";
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
  description: `Packaging design for ${designServices.length}+ product types and formats: cosmetics, food, coffee, supplements, candles, labels, rigid boxes and more. Made in our own factory.`,
  alternates: { canonical: "/packaging-design" },
};

const reasons = [
  { title: "Designed for print", text: "Every design is drawn for the board, press and finishes it will be made with." },
  { title: "Made in our factory", text: `Rigid and printed boxes from ${site.facts.rigidMoq} units, with a sample first.` },
  { title: "Fee credited", text: designFeeNote },
  { title: "Fast first concepts", text: `First directions usually within ${site.facts.firstConceptHours} hours.` },
];

const faqs = [
  { q: "What does packaging design include?", a: "Concepts on 3D mockups, refinement, artwork on the real dieline for every panel, finish layers and print-ready files. Structure and inserts can be added." },
  { q: "Can you design only and let me print elsewhere?", a: "Yes. You receive print-ready files and the dieline. Most clients produce with us because the design is made for our presses." },
  { q: "Is the design fee refundable if I manufacture with you?", a: `${designFeeNote} Details are in your quote.` },
  { q: "Do you design labels as well as boxes?", a: "Yes. We design product labels for bottles, jars, tubes, cans and boxes, plus the boxes and displays they go in." },
  { q: "How fast is the first concept?", a: `Usually within ${site.facts.firstConceptHours} hours of an agreed brief.` },
];

export default function PackagingDesignHub() {
  return (
    <>
      <JsonLd data={faqPage(faqs)} />
      <PageHero
        crumbs={[{ label: "Packaging Design" }]}
        whatsapp="packaging design"
        eyebrow="Packaging design services"
        title="Packaging design for every product"
        highlight="every"
        intro={<p>Boxes, labels, pouches and displays designed by our studio and made in our own factory. Choose your product or format below.</p>}
        slotId="design-cosmetic-packaging-design-1"
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
