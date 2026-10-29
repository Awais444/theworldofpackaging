import type { Metadata } from "next";
import { site } from "@/config/site";
import { hubFaqs, rigidTabs } from "@/content/hubs";
import { BoxHub, MaterialsTeaser, materialsTeaserItems } from "@/components/boxes/BoxHub";

export const metadata: Metadata = {
  title: "Custom Rigid Boxes",
  description: `Magnetic, lid & base, drawer, book, collapsible, shoulder neck, tube and window rigid boxes. ${site.facts.yearsExperience}+ years, MOQ ${site.facts.rigidMoq}, made in-house, worldwide.`,
  alternates: { canonical: "/rigid-boxes" },
};

export default function RigidHubPage() {
  return (
    <BoxHub
      crumb="Rigid Boxes"
      eyebrow="Made in our factory"
      title="Rigid boxes built to be kept"
      highlight="kept"
      intro={`Premium gift and retail boxes in eight styles, wrapped by hand in our own factory. From ${site.facts.rigidMoq} boxes per design.`}
      slot="rigid-magnetic-closure-hero"
      benefits={[
        { title: "Own factory", text: "Cut, wrapped and finished in-house, not outsourced." },
        { title: `MOQ ${site.facts.rigidMoq}`, text: "Small enough for launches, ready to scale." },
        { title: "Ships flat option", text: "Collapsible rigid boxes cut freight volume." },
        { title: "Digital proof first", text: "Approve a digital proof and 3D mockup before print." },
      ]}
      gridTitle="Choose your rigid box"
      gridHighlight="rigid"
      tabs={rigidTabs}
      supporting={<MaterialsTeaser items={materialsTeaserItems} />}
      faqs={hubFaqs}
      cta={{ title: "Not sure which style fits?", highlight: "style", text: "Tell us about your product and we will recommend a box." }}
    />
  );
}
