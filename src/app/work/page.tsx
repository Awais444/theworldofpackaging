import type { Metadata } from "next";
import { publicCaseStudies } from "@/content/caseStudies";
import { featuredDesignSlugs, getDesignService, type DesignService } from "@/content/designServices";
import { quoteHref } from "@/content/navigation";
import { printedStyles } from "@/content/printedStyles";
import { rigidStyles } from "@/content/rigidStyles";
import { DesignCard } from "@/components/design/DesignCard";
import { PageHero } from "@/components/sections/PageHero";
import { WorkFilter } from "@/components/sections/WorkFilter";
import { Button } from "@/components/ui/Button";
import { CaseCard, ProductCard } from "@/components/ui/Cards";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { printedCard, rigidCard } from "@/lib/boxView";

export const metadata: Metadata = {
  title: "Work: packaging we design and make",
  description: "Packaging design projects and the boxes we make in our own factory: cosmetic, food, coffee, candle and jewellery packaging, labels, rigid and printed boxes.",
  alternates: { canonical: "/work" },
};

/** Shown until real, approved case studies exist (sample projects are never published). */
function WhatWeDesignAndMake() {
  const design = featuredDesignSlugs.map(getDesignService).filter((s): s is DesignService => Boolean(s));
  const boxes = [
    ...rigidStyles.filter((s) => ["magnetic-closure", "drawer", "collapsible", "shoulder-neck"].includes(s.slug)).map(rigidCard),
    ...printedStyles.filter((s) => ["mailer", "tuck-end", "display", "sleeve"].includes(s.slug)).map(printedCard),
  ];
  return (
    <>
      <Section className="!pt-0">
        <SectionHeader
          eyebrow="Design"
          title="Packaging we design"
          highlight="design"
          action={
            <Button href="/packaging-design" variant="ghost" arrow>
              All design services
            </Button>
          }
        />
        <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {design.map((s) => (
            <DesignCard key={s.slug} s={s} />
          ))}
        </div>
      </Section>
      <Section bg="silver">
        <SectionHeader
          eyebrow="Production"
          title="Boxes we make in our factory"
          highlight="make"
          action={
            <Button href="/boxes" variant="ghost" arrow>
              All boxes
            </Button>
          }
        />
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:gap-6 lg:grid-cols-4">
          {boxes.map((b) => (
            <ProductCard key={b.href} {...b} />
          ))}
        </div>
      </Section>
    </>
  );
}

export default function WorkPage() {
  const hasWork = publicCaseStudies.length > 0;
  return (
    <>
      <PageHero
        crumbs={[{ label: "Work" }]}
        eyebrow="Our work"
        title="Packaging we design and make"
        highlight="design"
        intro={
          <p>
            {hasWork
              ? "Brand identities, packaging systems and boxes made in our own factory. Filter by what you need."
              : "From cosmetic cartons to coffee bags and rigid gift boxes: the packaging our studio designs and our factory makes. Ask us for examples in your category."}
          </p>
        }
        actions={
          <Button href={quoteHref} size="lg" arrow>
            Get a Free Quote
          </Button>
        }
        whatsapp="examples of your packaging work"
      />
      {hasWork ? (
        <Section className="!pt-0">
          <WorkFilter
            items={publicCaseStudies.map((c) => ({
              slug: c.slug,
              categories: c.categories,
              card: <CaseCard href={`/work/${c.slug}`} title={c.client} text={c.summary} slot={c.coverSlot} industry={c.industry} />,
            }))}
          />
        </Section>
      ) : (
        <WhatWeDesignAndMake />
      )}
      <Section>
        <CTABand
          title="Your project next"
          highlight="next"
          text="Tell us what you are making. We reply with a design route, a box recommendation and a fixed quote."
          whatsapp="examples of your packaging work"
          actions={
            <>
              <Button href={quoteHref} variant="accent" size="lg" arrow>
                Get a Free Quote
              </Button>
              <Button href="/start-a-project" variant="white" size="lg">
                Start a Project
              </Button>
            </>
          }
        />
      </Section>
    </>
  );
}
