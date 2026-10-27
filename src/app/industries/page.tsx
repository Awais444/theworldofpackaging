import type { Metadata } from "next";
import { industries } from "@/content/industries";
import { ProjectCta } from "@/components/sections/AgencyBlocks";
import { PageHero } from "@/components/sections/PageHero";
import { StyleGrid } from "@/components/sections/StyleGrid";

export const metadata: Metadata = {
  title: "Industries: packaging by category",
  description: "Packaging design and manufacturing for cosmetics, perfume, jewellery, watches, supplements, food, chocolate, CBD, candles, apparel, electronics and PR kits.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Industries" }]}
        spec={["Industries", `${industries.length} sectors`]}
        title="Packaging that fits the shelf it sits on."
        intro={<p>Every category has its own rules: what the box must protect, what it must say and what customers expect when they open it.</p>}
      />
      <section className="container-x pb-20 md:pb-28">
        <StyleGrid
          items={industries.map((i) => ({
            href: `/industries/${i.slug}`,
            name: i.name,
            summary: i.intro,
            slotId: `industry-${i.slug}-hero`,
            spec: i.styles,
          }))}
        />
      </section>
      <ProjectCta title="Not on the list?" body="We package plenty of products outside these sectors. Tell us what yours is." />
    </>
  );
}
