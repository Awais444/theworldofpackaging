import type { Metadata } from "next";
import Link from "next/link";
import { leadTimeLabel, site } from "@/config/site.config";
import { rigidStyles } from "@/content/rigidStyles";
import { FactoryStrip } from "@/components/sections/FactoryStrip";
import { FactStrip } from "@/components/sections/FactStrip";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/StyleDetailBlocks";
import { StyleGrid } from "@/components/sections/StyleGrid";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Custom Rigid Boxes, made in our own factory",
  description: `Magnetic, lid & base, drawer, book, collapsible, shoulder neck, tube and window rigid boxes. MOQ ${site.facts.rigidMoq}, designed and manufactured in-house, shipped worldwide.`,
  alternates: { canonical: "/rigid-boxes" },
};

const reasons = [
  {
    title: "No middleman",
    body: "Our studio and our factory share a building. The person who drew your dieline can walk over to the machine that cuts it.",
  },
  {
    title: "Print-ready, guaranteed",
    body: "We print the wraps ourselves, so we check every file against our own press, paper and foil before it goes near production.",
  },
  {
    title: "Samples from the real line",
    body: "Your sample is made with production board, wrap and finishes, not a hand-made mock-up that the bulk run cannot match.",
  },
];

const deepDives = [
  { href: "/rigid-boxes/inserts", title: "Inserts", body: "EVA foam, velvet, card and satin." },
  { href: "/rigid-boxes/materials", title: "Materials", body: "Greyboard, wrap papers, cloth and leatherette." },
  { href: "/rigid-boxes/finishes", title: "Finishes", body: "Foil, emboss, deboss, spot UV and soft-touch." },
];

export default function RigidHubPage() {
  return (
    <>
      <PageHero
        tone="board"
        crumbs={[{ label: "Rigid Boxes" }]}
        spec={["Manufacturing", "Own factory", `MOQ ${site.facts.rigidMoq}`]}
        title="Rigid boxes, made in-house."
        intro={
          <p>
            Greyboard cut to size, wrapped in printed paper, cloth or leatherette, finished with foil and fitted with
            inserts, all on our own line. Eight constructions, from {site.facts.rigidMoq} boxes per design.
          </p>
        }
        actions={
          <>
            <Button href="/configure?type=rigid" size="lg" arrow>
              Configure a box
            </Button>
            <Button href="/quote" variant="secondary" size="lg">
              Get a {site.facts.quoteReplyHours}h Quote
            </Button>
          </>
        }
        slotId="rigid-magnetic-closure-hero"
      />

      <FactStrip
        items={[
          { label: "MOQ", value: String(site.facts.rigidMoq) },
          { label: "Board", value: "1.5–3.0 mm" },
          { label: "Lead time", value: leadTimeLabel() },
          { label: "Production", value: "Made in-house" },
        ]}
      />

      <section className="container-x py-20 md:py-28">
        <SectionHeader spec={["Styles", `${rigidStyles.length} constructions`]} title="Pick a construction." />
        <div className="mt-14">
          <StyleGrid
            items={rigidStyles.map((s) => ({
              href: `/rigid-boxes/${s.slug}`,
              name: s.name,
              summary: s.summary,
              slotId: s.mediaSlots[0]!,
              spec: [s.short, `${Math.min(...s.boardMm).toFixed(1)}–${Math.max(...s.boardMm).toFixed(1)} mm`, ...(s.collapsible ? ["Ships flat"] : [])],
            }))}
          />
        </div>
      </section>

      <section className="container-x pb-20 md:pb-28">
        <SectionHeader spec={["Why in-house"]} title="Designed and made under one roof." />
        <div className="mt-12 grid border-t border-line md:grid-cols-3">
          {reasons.map((r, i) => (
            <div key={r.title} className={i > 0 ? "border-t border-line py-8 md:border-t-0 md:border-l md:pl-8" : "py-8 md:pr-8"}>
              <h3 className="type-display text-display-sm">{r.title}</h3>
              <p className="mt-3 text-muted">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      <FactoryStrip />

      <section className="container-x py-20 md:py-28">
        <SectionHeader spec={["Specify"]} title="Materials, finishes and inserts." />
        <ul className="mt-12 border-t border-line">
          {deepDives.map((d) => (
            <li key={d.href} className="border-b border-line">
              <Link href={d.href} className="group flex flex-wrap items-baseline justify-between gap-4 py-6">
                <span className="type-display text-display-md transition-transform duration-300 group-hover:translate-x-2">{d.title}</span>
                <span className="text-muted">{d.body}</span>
              </Link>
            </li>
          ))}
          <li className="border-b border-line">
            <Link href="/collapsible-rigid-boxes" className="group flex flex-wrap items-baseline justify-between gap-4 py-6">
              <span className="type-display text-display-md transition-transform duration-300 group-hover:translate-x-2">
                Collapsible rigid
              </span>
              <span className="text-muted">Ships flat, cuts freight volume.</span>
            </Link>
          </li>
        </ul>
      </section>

      <CtaBand
        title="Not sure which style fits?"
        body="Send us the product and where it sells. We will suggest two constructions and the board to go with them."
      />
    </>
  );
}
