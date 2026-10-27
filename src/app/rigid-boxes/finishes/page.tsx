import type { Metadata } from "next";
import { finishes } from "@/content/materials";
import { OptionsGrid } from "@/components/sections/OptionsGrid";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand, FaqList } from "@/components/sections/StyleDetailBlocks";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Box Finishes: foil, emboss, deboss, spot UV, soft-touch",
  description: "Hot foil blocking, embossing, debossing, spot UV and soft-touch lamination, applied in our own factory.",
  alternates: { canonical: "/rigid-boxes/finishes" },
};

export default function FinishesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Rigid Boxes", href: "/rigid-boxes" }, { label: "Finishes" }]}
        spec={["Finishes", "Applied in-house"]}
        title="The part people touch."
        intro={
          <p>
            Finishes are applied to the wrap before it goes around the board, so foil, emboss and varnish sit crisp
            on every face. One strong finish usually beats three competing ones.
          </p>
        }
        actions={
          <Button href="/configure?type=rigid" size="lg" arrow>
            Add finishes in the configurator
          </Button>
        }
        slotId="foil-stamping"
      />
      <OptionsGrid spec={["Finishes"]} title="What we can apply." groups={[{ title: "Finishes", items: finishes }]} />
      <FaqList
        faqs={[
          { q: "Can foil and emboss be combined?", a: "Yes, foil can be registered over an emboss for a raised metallic mark. It needs a matched die." },
          { q: "Which wraps take foil best?", a: "Smooth and laminated papers, linen and leatherette all work. Heavily textured papers can break up fine foil detail." },
        ]}
      />
      <CtaBand title="See the foil before the run." body="Your sample is finished on the same press and dies as the bulk order." />
    </>
  );
}
