import type { Metadata } from "next";
import { site } from "@/config/site.config";
import { printedMaterials } from "@/content/materials";
import { printedStyles } from "@/content/printedStyles";
import { FactStrip } from "@/components/sections/FactStrip";
import { OptionsGrid } from "@/components/sections/OptionsGrid";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/StyleDetailBlocks";
import { StyleGrid } from "@/components/sections/StyleGrid";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Custom Printed Boxes: mailers, cartons, shipping and display",
  description: `Mailer, tuck end, folding carton, shipping, display, pillow, sleeve, gable and window boxes, printed in-house by ${site.name}.`,
  alternates: { canonical: "/printed-boxes" },
};

export default function PrintedHubPage() {
  return (
    <>
      <PageHero
        tone="kraft"
        crumbs={[{ label: "Printed Boxes" }]}
        spec={["Manufacturing", "Offset + digital", "CMYK / Pantone"]}
        title="Printed boxes for shelf, post and counter."
        intro={
          <p>
            Paperboard and corrugated boxes in every common style, printed inside and out and die-cut on our own
            line. Designed by our studio or printed from your files.
          </p>
        }
        actions={
          <>
            <Button href="/configure?type=printed" size="lg" arrow>
              Configure a box
            </Button>
            <Button href="/quote" variant="secondary" size="lg">
              Get a {site.facts.quoteReplyHours}h Quote
            </Button>
          </>
        }
        slotId="printed-mailer-hero"
      />
      <FactStrip
        items={[
          { label: "MOQ", value: site.facts.printedMoq ? String(site.facts.printedMoq) : "On quote" },
          { label: "Stock", value: "SBS / kraft / corrugated" },
          { label: "Print", value: "Inside + outside" },
          { label: "Production", value: "Printed in-house" },
        ]}
      />
      <section className="container-x py-20 md:py-28">
        <SectionHeader spec={["Styles", `${printedStyles.length} styles`]} title="Choose a style." />
        <div className="mt-14">
          <StyleGrid
            items={printedStyles.map((s) => ({
              href: `/printed-boxes/${s.slug}`,
              name: s.name,
              summary: s.summary,
              slotId: s.mediaSlots[0]!,
              spec: [s.short, s.materials[0] ?? ""],
            }))}
          />
        </div>
      </section>
      <OptionsGrid spec={["Stocks"]} title="What we print on." groups={[{ title: "Materials", items: printedMaterials }]} />
      <CtaBand title="Need something more premium?" body="Many brands pair a printed mailer outside with a rigid box inside. Ask us to quote both together." />
    </>
  );
}
