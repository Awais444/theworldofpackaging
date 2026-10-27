import type { Metadata } from "next";
import { caseStudies } from "@/content/caseStudies";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProjectCta } from "@/components/sections/AgencyBlocks";
import { WorkCard } from "@/components/sections/SelectedWork";
import { WorkFilter } from "@/components/sections/WorkFilter";
import { RevealText } from "@/components/ui/RevealText";
import { SpecLabel } from "@/components/ui/SpecLabel";

export const metadata: Metadata = {
  title: "Work: branding, packaging and rigid box projects",
  description: "Case studies across brand identity, packaging design, rigid boxes and printed boxes, from brief to production.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="container-x pt-8 pb-24 md:pb-32">
        <Breadcrumbs items={[{ label: "Work" }]} />
        <div className="mt-12 md:mt-16">
          <SpecLabel items={["Case studies", `${caseStudies.length} projects`]} as="p" />
          <RevealText as="h1" text="Work, from brief to box." className="type-display mt-5 text-display-xl" />
          <p className="measure mt-6 text-lg text-muted">
            Brand identities, packaging systems and boxes we made ourselves. Filter by what you need.
          </p>
        </div>
        <div className="mt-14">
          <WorkFilter
            items={caseStudies.map((c) => ({
              slug: c.slug,
              categories: c.categories,
              card: <WorkCard study={c} />,
            }))}
          />
        </div>
      </section>
      <ProjectCta title="Your project next." body="Tell us what you are making. We reply with a scope, timeline and the questions we still have." />
    </>
  );
}
