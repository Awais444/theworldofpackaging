import type { Metadata } from "next";
import { inserts } from "@/content/materials";
import { OptionsGrid } from "@/components/sections/OptionsGrid";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand, FaqList } from "@/components/sections/StyleDetailBlocks";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Box Inserts: EVA foam, velvet, card and satin",
  description: "Custom inserts for rigid boxes, cut in-house to hold each product tight: EVA foam, velvet-lined EVA, card dividers and satin cushions.",
  alternates: { canonical: "/rigid-boxes/inserts" },
};

export default function InsertsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Rigid Boxes", href: "/rigid-boxes" }, { label: "Inserts" }]}
        spec={["Inserts", "Cut in-house"]}
        title="Inserts that hold the product still."
        intro={
          <p>
            An insert decides how the product sits when the lid comes off. We cut cavities from your product
            dimensions or a physical sample, then test the fit in a production box.
          </p>
        }
        actions={
          <Button href="/quote" size="lg" arrow>
            Quote an insert
          </Button>
        }
        slotId="insert-foam"
      />
      <OptionsGrid
        spec={["Insert types"]}
        title="Four materials, any layout."
        groups={[
          { title: "Materials", items: inserts },
          {
            title: "What we need from you",
            items: [
              { name: "Product dimensions", detail: "Length, width, height and weight of each item." },
              { name: "A physical sample", detail: "Best for irregular shapes such as bottles and jars." },
              { name: "Layout preference", detail: "Which item sits where, and what should be seen first." },
            ],
          },
        ]}
      />
      <FaqList
        faqs={[
          { q: "Can one insert hold several products?", a: "Yes. Multi-cavity inserts are common for sets and PR kits; each cavity is cut to its own item." },
          { q: "Is EVA recyclable?", a: "EVA is not widely recycled. For a recyclable option, choose a card insert." },
        ]}
      />
      <CtaBand title="Send us the product." body="We will propose an insert layout and test it in a sample box before production." />
    </>
  );
}
