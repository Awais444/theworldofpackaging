import type { Metadata } from "next";
import { metaDescription } from "@/lib/seo";
import Link from "next/link";
import { site } from "@/config/site";
import { rigidExtraFaqs } from "@/content/boxDetails";
import { getIndustry } from "@/content/industries";
import { quoteHref } from "@/content/navigation";
import { getRigidStyle, rigidCommonFaqs } from "@/content/rigidStyles";
import { CollapsibleSequence } from "@/components/boxes/CollapsibleSequence";
import { FadeIn } from "@/components/motion/FadeIn";
import { FreightSlider } from "@/components/sections/FreightSlider";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/Cards";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { rigidCard } from "@/lib/boxView";
import { faqPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Collapsible Rigid Boxes",
  description: metaDescription(`Rigid boxes with hinged walls that pack flat for international shipping. Same board, wrap and finishes as fixed rigid boxes. MOQ ${site.facts.collapsibleMoq}.`),
  alternates: { canonical: "/collapsible-rigid-boxes" },
};

const industrySlugs = ["cosmetics", "perfume", "apparel", "gifts-pr-kits", "electronics", "candles"];

export default function CollapsiblePage() {
  const collapsible = getRigidStyle("collapsible")!;
  const magnetic = getRigidStyle("magnetic-closure")!;
  const faqs = [
    ...collapsible.faqs,
    {
      q: "Do you handle shipping to my country?",
      a: "Yes, by air or sea. We pack flat in export cartons and prepare the commercial paperwork; duties are paid on arrival unless agreed otherwise.",
    }, // TODO confirm Incoterms wording
    ...rigidCommonFaqs,
    ...rigidExtraFaqs,
  ].slice(0, 6);

  return (
    <>
      <JsonLd data={faqPage(faqs)} />
      <PageHero
        crumbs={[{ label: "Rigid Boxes", href: "/rigid-boxes" }, { label: "Collapsible Rigid Boxes" }]}
        eyebrow="Ships flat"
        title="Rigid when it arrives. Flat when it ships."
        highlight="Flat"
        intro={
          <p>
            A collapsible rigid box looks and feels like a fixed one, but folds flat for shipping. Fewer cartons, lower freight and less warehouse
            space. MOQ {site.facts.collapsibleMoq}.
          </p>
        }
        slotId="collapsible-flat"
        actions={
          <>
            <Button href={`${quoteHref}?style=collapsible`} size="lg" arrow>
              Get a Quote
            </Button>
          </>
        }
      />

      <CollapsibleSequence />

      <Section>
        <FadeIn>
          <SectionHeader
            eyebrow="Freight"
            title="Ship boxes, not air"
            highlight="air"
            lead="Move the slider to compare carton volume for assembled and collapsible boxes. These are example figures; we calculate yours with the quote."
          />
        </FadeIn>
        <div className="mt-12">
          <FreightSlider />
        </div>
      </Section>

      <Section bg="silver">
        <FadeIn>
          <SectionHeader eyebrow="Styles" title="Available collapsible styles" highlight="collapsible" />
        </FadeIn>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:gap-6 lg:grid-cols-4">
          <ProductCard {...rigidCard(collapsible)} href="/rigid-boxes/collapsible" />
          <ProductCard {...rigidCard(magnetic)} name="Magnetic Closure (flat-pack)" text="Our magnetic box with hinged walls." tags={[`MOQ ${site.facts.collapsibleMoq}`, "Ships flat"]} />
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Industries" title="Popular with brands that ship abroad" highlight="abroad" />
        <ul className="mt-10 flex flex-wrap gap-3">
          {industrySlugs.map((slug) => {
            const ind = getIndustry(slug);
            return ind ? (
              <li key={slug}>
                <Link href={`/industries/${slug}`} className="inline-flex h-11 items-center rounded-full border border-silver-300 px-5 font-medium transition-colors hover:border-blue-600 hover:text-blue-600">
                  {ind.name}
                </Link>
              </li>
            ) : null;
          })}
        </ul>
      </Section>

      <Section bg="silver">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title="Collapsible box questions" highlight="questions" />
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faqs} />
          </div>
        </div>
      </Section>

      <Section>
        <CTABand
          title="Get a price for collapsible boxes"
          whatsapp="Collapsible Rigid Boxes"
          highlight="collapsible"
          text="Send your size and quantity. We include freight options in the quote."
          actions={
            <>
              <Button href={`${quoteHref}?style=collapsible`} variant="accent" size="lg" arrow>
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
