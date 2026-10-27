import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { leadTimeLabel, site } from "@/config/site.config";
import { finishes, inserts, wraps, type Option } from "@/content/materials";
import { getRigidStyle, rigidCommonFaqs, rigidStyles } from "@/content/rigidStyles";
import { AnatomyDiagram } from "@/components/sections/AnatomyDiagram";
import { FactoryStrip } from "@/components/sections/FactoryStrip";
import { FactStrip } from "@/components/sections/FactStrip";
import { OptionsGrid } from "@/components/sections/OptionsGrid";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand, FaqList, Gallery, IndustryLinks, PriceTiers } from "@/components/sections/StyleDetailBlocks";
import { StyleGrid } from "@/components/sections/StyleGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { product } from "@/lib/schema";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Props = { params: Promise<{ style: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return rigidStyles.map((s) => ({ style: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const style = getRigidStyle((await params).style);
  if (!style) return {};
  return {
    title: `${style.name}: custom rigid boxes, MOQ ${style.moq}`,
    description: `${style.summary} Made in-house by ${site.name}, shipped worldwide.`,
    alternates: { canonical: `/rigid-boxes/${style.slug}` },
  };
}

/** Pick full option records (with detail text) for the names a style supports. */
const pick = (all: Option[], names: string[]) => names.map((n) => all.find((o) => o.name === n) ?? { name: n, detail: "" });

export default async function RigidStylePage({ params }: Props) {
  const style = getRigidStyle((await params).style);
  if (!style) notFound();

  const minBoard = Math.min(...style.boardMm).toFixed(1);
  const maxBoard = Math.max(...style.boardMm).toFixed(1);
  const related = rigidStyles.filter((s) => s.slug !== style.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={product({ name: style.name, description: style.summary, path: `/rigid-boxes/${style.slug}`, category: "Rigid boxes" })} />
      <PageHero
        tone="board"
        crumbs={[{ label: "Rigid Boxes", href: "/rigid-boxes" }, { label: style.name }]}
        spec={["Rigid box", style.short, `${minBoard}–${maxBoard} mm board`]}
        title={style.name}
        intro={
          <>
            <p className="text-fg">{style.summary}</p>
            <p className="mt-4">{style.description}</p>
          </>
        }
        actions={
          <>
            <Button href={`/configure?type=rigid&style=${style.slug}`} size="lg" arrow>
              Configure
            </Button>
            <Button href={`/quote?style=${style.slug}`} variant="secondary" size="lg">
              Get a {site.facts.quoteReplyHours}h Quote
            </Button>
          </>
        }
        slotId={style.mediaSlots[0]}
      />

      <FactStrip
        items={[
          { label: "MOQ", value: String(style.moq) },
          { label: "Board", value: `${minBoard}–${maxBoard} mm` },
          { label: "Lead time", value: leadTimeLabel(style.leadTimeDays ?? site.facts.rigidLeadTimeDays) },
          { label: "Production", value: "Made in-house" },
          ...(style.collapsible ? [{ label: "Ships", value: "Flat" }] : []),
        ]}
      />

      <AnatomyDiagram board={`${minBoard}–${maxBoard} mm, cut to size`} closure={style.closures[0] ?? "Lid"} />

      <OptionsGrid
        spec={["Options"]}
        title="Build it your way."
        intro="Every option below is produced on our own line. Mix them freely; we flag combinations that will not work."
        groups={[
          { title: "Board thickness", items: style.boardMm.map((mm) => `${mm.toFixed(1)} mm greyboard`) },
          { title: "Wrap", items: pick(wraps, style.wraps) },
          { title: "Finishes", items: pick(finishes, style.finishes) },
          { title: "Inserts", items: pick(inserts, style.inserts) },
          { title: "Closure", items: style.closures },
        ]}
      />

      <FactoryStrip />

      <Gallery slotIds={style.mediaSlots.slice(1)} title={`${style.short} boxes, up close.`} />

      <PriceTiers tiers={style.priceTiers} />

      <IndustryLinks slugs={style.industries} />

      <section className="container-x py-20 md:py-28">
        <SectionHeader spec={["Other rigid styles"]} title="Compare constructions." />
        <div className="mt-14">
          <StyleGrid
            items={related.map((s) => ({
              href: `/rigid-boxes/${s.slug}`,
              name: s.name,
              summary: s.summary,
              slotId: s.mediaSlots[0]!,
              spec: [s.short, `MOQ ${s.moq}`],
            }))}
          />
        </div>
      </section>

      <FaqList faqs={[...style.faqs, ...rigidCommonFaqs]} />

      <CtaBand
        title="Hold one before you order 500."
        body="A sample box is made on the production line with your board, wrap and finish. The sample fee comes off your bulk order."
      />
    </>
  );
}
