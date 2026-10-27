import type { Metadata } from "next";
import { boardThicknesses, wraps } from "@/content/materials";
import { OptionsGrid } from "@/components/sections/OptionsGrid";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand, FaqList } from "@/components/sections/StyleDetailBlocks";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Rigid Box Materials: greyboard and wrap papers",
  description: "Greyboard from 1.5 to 3.0 mm, wrapped in printed art paper, specialty textured paper, linen cloth, leatherette or kraft.",
  alternates: { canonical: "/rigid-boxes/materials" },
};

export default function MaterialsPage() {
  return (
    <>
      <PageHero
        tone="board"
        crumbs={[{ label: "Rigid Boxes", href: "/rigid-boxes" }, { label: "Materials" }]}
        spec={["Materials", "Board + wrap"]}
        title="Board inside, wrap outside."
        intro={
          <p>
            Every rigid box is two materials: greyboard for structure and a wrap for the surface. The board sets how
            the box feels in the hand; the wrap sets how it looks and what finishes it can take.
          </p>
        }
        actions={
          <Button href="/samples" size="lg" arrow>
            Order material swatches
          </Button>
        }
        slotId="factory-wrap"
      />
      <OptionsGrid
        spec={["Specification"]}
        title="Choose the board, then the wrap."
        groups={[
          { title: "Greyboard thickness", items: boardThicknesses },
          { title: "Wrap materials", items: wraps },
        ]}
      />
      <FaqList
        faqs={[
          { q: "What is greyboard?", a: "Dense board made from recycled paper fibre. It does not flex like folding carton, which is what makes a box rigid." },
          {
            q: "Do you offer FSC-certified or recycled options?",
            a: "We can source certified and recycled boards and papers for many specs. Ask with your quote and we will confirm what is available for your order.", // TODO: confirm certifications
          },
        ]}
      />
      <CtaBand title="Feel it before you choose." body="We can send wrap and board swatches with your sample, so you pick materials in hand rather than on screen." />
    </>
  );
}
