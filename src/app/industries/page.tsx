import type { Metadata } from "next";
import { collectionPage } from "@/lib/schema";
import { metaDescription } from "@/lib/seo";
import { CheckCircle2 } from "lucide-react";
import { orderSteps } from "@/content/boxDetails";
import { industries, type Industry } from "@/content/industries";
import { industrySharedFaqs } from "@/content/industryDetails";
import { quoteHref } from "@/content/navigation";
import { industryIcon } from "@/components/industries/industryIcons";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { IndustryCard } from "@/components/ui/Cards";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StepList } from "@/components/ui/StepList";
import { Tabs } from "@/components/ui/Tabs";
import { faqPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Industries: packaging by category",
  description: metaDescription("Packaging design and boxes for cosmetics, perfume, jewellery, watches, supplements, food, chocolate, CBD, candles, apparel, electronics and PR kits."),
  alternates: { canonical: "/industries" },
};

const groups: Array<{ id: string; label: string; slugs: string[] }> = [
  { id: "beauty", label: "Beauty & wellness", slugs: ["cosmetics", "perfume", "supplements", "cbd", "candles"] },
  { id: "luxury", label: "Luxury & gifts", slugs: ["jewelry", "watches", "gifts-pr-kits"] },
  { id: "food", label: "Food", slugs: ["food-bakery", "chocolates"] },
  { id: "retail", label: "Retail & tech", slugs: ["apparel", "electronics"] },
];

const faqs = [
  { q: "My industry is not listed. Can you still help?", a: "Yes. These are our most common categories, not a limit. Tell us about your product and we recommend a box." },
  ...industrySharedFaqs,
];

const grid = (list: Industry[]) => (
  <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
    {list.map((i) => (
      <IndustryCard key={i.slug} href={`/industries/${i.slug}`} name={i.name} icon={industryIcon(i.slug)} boxes={i.styles.slice(0, 3)} />
    ))}
  </div>
);

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={collectionPage({ name: "Packaging by industry", description: "Packaging by industry from The World of Packaging.", path: "/industries", items: industries.map((i) => ({ name: i.name, path: `/industries/${i.slug}` })) })} />
      <JsonLd data={faqPage(faqs)} />
      <PageHero
        crumbs={[{ label: "Industries" }]}
        eyebrow="Industries"
        title="Packaging for your industry"
        highlight="industry"
        intro={<p>Every category has its own needs: what the box protects, what it must say and how it opens. Pick yours for recommended boxes and finishes.</p>}
        slotId="industry-cosmetics-hero"
        actions={
          <>
            <Button href={quoteHref} size="lg" arrow>
              Get a Quote
            </Button>
            <Button href="/boxes" size="lg" variant="secondary">
              Explore Boxes
            </Button>
          </>
        }
      />

      <Section bg="silver" className="!py-12 md:!py-16">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "12 categories", text: "From cosmetics to electronics." },
            { title: "Category know-how", text: "Inserts, finishes and formats that work." },
            { title: "Compliance-ready layout", text: "Space for your regulatory text." },
            { title: "Shipping by market", text: "Air or sea, to where you sell." },
          ].map((b) => (
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
        <FadeIn>
          <SectionHeader eyebrow="Categories" title="Find your category" highlight="category" />
        </FadeIn>
        <div className="mt-10">
          <Tabs
            label="Filter industries"
            items={[
              { id: "all-industries", label: "All", content: grid(industries) },
              ...groups.map((g) => ({ id: g.id, label: g.label, content: grid(industries.filter((i) => g.slugs.includes(i.slug))) })),
            ]}
          />
        </div>
      </Section>

      <Section bg="blue-50">
        <SectionHeader eyebrow="How it works" title="From brief to boxes" highlight="boxes" />
        <div className="mt-12">
          <StepList steps={orderSteps} />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title="Common questions" highlight="questions" />
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faqs} />
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <CTABand
          title="Not on the list?"
          highlight="list"
          text="We package plenty of other products. Tell us what yours is."
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
