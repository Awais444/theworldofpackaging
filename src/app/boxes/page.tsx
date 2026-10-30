import type { Metadata } from "next";
import { printedHref, rigidHref } from "@/lib/boxView";
import { printedStyles } from "@/content/printedStyles";
import { rigidStyles } from "@/content/rigidStyles";
import { JsonLd } from "@/components/seo/JsonLd";
import { collectionPage } from "@/lib/schema";
import { metaDescription, ogFor } from "@/lib/seo";
import { site } from "@/config/site";
import { orderSteps } from "@/content/boxDetails";
import { boxesTabs, hubFaqs } from "@/content/hubs";
import { BoxHub } from "@/components/boxes/BoxHub";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StepList } from "@/components/ui/StepList";

export const metadata: Metadata = {
  title: "All Custom Boxes: rigid and printed",
  description: metaDescription(`Every box style we make: rigid gift boxes from MOQ ${site.facts.rigidMoq}, collapsible rigid boxes that ship flat, and printed mailers, cartons and displays.`),
  alternates: { canonical: "/boxes" }, openGraph: ogFor("/boxes"),
};

export default function BoxesHubPage() {
  return (
    <>
      <JsonLd data={collectionPage({ name: "All custom boxes", description: "All custom boxes made by The World of Packaging.", path: "/boxes", items: [...rigidStyles.map((s) => ({ name: s.name, path: rigidHref(s.slug) })), ...printedStyles.map((s) => ({ name: s.name, path: printedHref(s.slug) }))] })} />
      <BoxHub
      crumb="Boxes"
      eyebrow="All boxes"
      title="Every box style we make"
      highlight="every"
      intro="Rigid boxes from our own factory and printed boxes in any size. Pick a style, or tell us about your product and we will recommend one."
      slot="home-hero"
      benefits={[
        { title: "16+ styles", text: "Rigid and printed, all made to order." },
        { title: `MOQ ${site.facts.rigidMoq}`, text: "For rigid and collapsible rigid boxes." },
        { title: "Free design support", text: "Artwork checks and dieline setup included." },
        { title: "Ships worldwide", text: "By air or sea, assembled or flat." },
      ]}
      gridTitle="Browse all boxes"
      gridHighlight="all"
      tabs={boxesTabs}
      supporting={
        <Section bg="blue-50">
          <SectionHeader eyebrow="How it works" title="From brief to boxes" highlight="boxes" />
          <div className="mt-12">
            <StepList steps={orderSteps} />
          </div>
        </Section>
      }
      faqs={hubFaqs}
      cta={{ title: "Not sure which box you need?", highlight: "box", text: "Send your product details and we will recommend a style and spec." }}
    />
    </>
  );
}
