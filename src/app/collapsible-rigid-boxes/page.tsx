import type { Metadata } from "next";
import { site } from "@/config/site.config";
import { getRigidStyle, rigidCommonFaqs } from "@/content/rigidStyles";
import { CollapsibleSnap } from "@/components/sections/CollapsibleSnap";
import { FactStrip } from "@/components/sections/FactStrip";
import { FreightSlider } from "@/components/sections/FreightSlider";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand, FaqList } from "@/components/sections/StyleDetailBlocks";
import { SiteImage } from "@/components/media/SiteImage";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Collapsible Rigid Boxes that ship flat",
  description: `Rigid boxes with hinged walls that pack flat for international shipping. Same board, wrap and foil as fixed rigid boxes. MOQ ${site.facts.collapsibleMoq}.`,
  alternates: { canonical: "/collapsible-rigid-boxes" },
};

const steps = [
  { title: "Made flat", body: "Walls are hinged into the base during wrapping, so the box leaves our line already folded." },
  { title: "Shipped flat", body: "Flat units stack tightly in cartons. Fewer cartons means less air and sea freight volume." },
  { title: "Stored flat", body: "Your warehouse or 3PL keeps them flat until needed, taking a fraction of the shelf space." },
  { title: "Assembled in seconds", body: "Lift the walls and they lock upright with built-in tape or magnets. No tools." },
];

export default function CollapsiblePage() {
  const style = getRigidStyle("collapsible");
  return (
    <>
      <PageHero
        tone="board"
        crumbs={[{ label: "Rigid Boxes", href: "/rigid-boxes" }, { label: "Collapsible Rigid Boxes" }]}
        spec={["For international buyers", `MOQ ${site.facts.collapsibleMoq}`]}
        title="Luxury boxes that ship flat."
        intro={
          <p>
            We manufacture in Pakistan and ship to {site.markets.join(", ")}. A fixed rigid box ships mostly air;
            a collapsible one ships as a flat panel and becomes a rigid box when your team unfolds it.
          </p>
        }
        actions={
          <>
            <Button href="/configure?type=collapsible" size="lg" arrow>
              Configure
            </Button>
            <Button href="/quote?style=collapsible" variant="secondary" size="lg">
              Get a {site.facts.quoteReplyHours}h Quote
            </Button>
          </>
        }
        visual={<CollapsibleSnap />}
      />

      <FactStrip
        items={[
          { label: "MOQ", value: String(site.facts.collapsibleMoq) },
          { label: "Board", value: "1.5–2.5 mm" },
          { label: "Ships", value: "Flat" },
          { label: "Production", value: "Made in-house" },
        ]}
      />

      <section className="container-x py-20 md:py-28">
        <SectionHeader spec={["How it works"]} title="Flat at every step except the last." />
        <ol className="mt-14 grid gap-x-6 gap-y-10 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="type-display mt-3 text-display-sm">{s.title}</h3>
              <p className="mt-3 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="tone-board">
        <div className="container-x py-20 md:py-28">
          <div className="grid-editorial mb-16 items-center gap-y-10">
            <div className="col-span-4 md:col-span-5">
              <SectionHeader spec={["Freight"]} title="Same carton, more boxes." className="!block" />
            </div>
            <div className="col-span-4 md:col-span-6 md:col-start-7">
              <SiteImage slotId="shipping-stack" sizes="(min-width: 768px) 45vw, 100vw" />
            </div>
          </div>
          <FreightSlider />
        </div>
      </section>

      <FaqList
        faqs={[
          ...(style?.faqs ?? []),
          { q: "Do you handle shipping to my country?", a: "Yes, by air or sea. We pack flat in export cartons and prepare the commercial paperwork; duties are paid on arrival unless agreed otherwise." }, // TODO confirm Incoterms wording
          ...rigidCommonFaqs,
        ]}
      />
      <CtaBand title="Fold one yourself." body="Order a sample and assemble it at your desk. The sample fee is credited to your bulk order." />
    </>
  );
}
