import type { Metadata } from "next";
import { caseStudies } from "@/content/caseStudies";
import { quoteHref } from "@/content/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { WorkFilter } from "@/components/sections/WorkFilter";
import { Button } from "@/components/ui/Button";
import { CaseCard } from "@/components/ui/Cards";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";

export const metadata: Metadata = {
  title: "Work: branding, packaging and rigid box projects",
  description: "Case studies across brand identity, packaging design, rigid boxes and printed boxes, from brief to production.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Work" }]}
        eyebrow="Our work"
        title="From first sketch to delivered box"
        highlight="delivered"
        intro={<p>Brand identities, packaging systems and boxes made in our own factory. Filter by what you need.</p>}
        actions={
          <Button href="/start-a-project" size="lg" arrow>
            Start a Project
          </Button>
        }
      />
      <Section className="!pt-0">
        <WorkFilter
          items={caseStudies.map((c) => ({
            slug: c.slug,
            categories: c.categories,
            card: <CaseCard href={`/work/${c.slug}`} title={c.client} text={c.summary} slot={c.coverSlot} industry={c.industry} placeholder={c.placeholder} />,
          }))}
        />
      </Section>
      <Section className="!pt-0">
        <CTABand
          title="Your project next"
          highlight="next"
          text="Tell us what you are making. We reply with a scope, timeline and a fixed quote."
          actions={
            <>
              <Button href="/start-a-project" variant="accent" size="lg" arrow>
                Start a Project
              </Button>
              <Button href={quoteHref} variant="white" size="lg">
                Get a Quote
              </Button>
            </>
          }
        />
      </Section>
    </>
  );
}
