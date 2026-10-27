import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/config/site.config";
import { finishes, printedMaterials, printOptions, type Option } from "@/content/materials";
import { getPrintedStyle, printedCommonFaqs, printedStyles } from "@/content/printedStyles";
import { FactStrip } from "@/components/sections/FactStrip";
import { OptionsGrid } from "@/components/sections/OptionsGrid";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand, FaqList, Gallery, IndustryLinks, PriceTiers } from "@/components/sections/StyleDetailBlocks";
import { StyleGrid } from "@/components/sections/StyleGrid";
import { SiteImage } from "@/components/media/SiteImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { product } from "@/lib/schema";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Props = { params: Promise<{ style: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return printedStyles.map((s) => ({ style: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const style = getPrintedStyle((await params).style);
  if (!style) return {};
  return {
    title: `Custom Printed ${style.name}`,
    description: `${style.summary} Designed, printed and cut in-house by ${site.name}.`,
    alternates: { canonical: `/printed-boxes/${style.slug}` },
  };
}

const pick = (all: Option[], names: string[]) => names.map((n) => all.find((o) => o.name === n) ?? { name: n, detail: "" });

export default async function PrintedStylePage({ params }: Props) {
  const style = getPrintedStyle((await params).style);
  if (!style) notFound();
  const related = printedStyles.filter((s) => s.slug !== style.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={product({ name: style.name, description: style.summary, path: `/printed-boxes/${style.slug}`, category: "Printed boxes" })} />
      <PageHero
        crumbs={[{ label: "Printed Boxes", href: "/printed-boxes" }, { label: style.name }]}
        spec={["Printed box", style.short, style.materials[0] ?? ""]}
        title={style.name}
        intro={
          <>
            <p className="text-fg">{style.summary}</p>
            <p className="mt-4">{style.description}</p>
          </>
        }
        actions={
          <>
            <Button href={`/configure?type=printed&style=${style.slug}`} size="lg" arrow>
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
        className="tone-kraft"
        items={[
          { label: "MOQ", value: style.moq ? String(style.moq) : "On quote" },
          { label: "Material", value: style.materials.join(" / ") },
          { label: "Print", value: "CMYK / Pantone" },
          { label: "Production", value: "Printed in-house" },
        ]}
      />

      <OptionsGrid
        spec={["Specification"]}
        title="Stock, print and finish."
        groups={[
          { title: "Material", items: pick(printedMaterials, style.materials) },
          { title: "Print", items: pick(printOptions, style.print) },
          { title: "Finishes", items: pick(finishes, style.finishes) },
        ]}
      />

      <section className="tone-kraft">
        <div className="container-x grid-editorial items-center gap-y-10 py-20 md:py-28">
          <div className="col-span-4 md:col-span-5">
            <SectionHeader
              spec={["Pre-press"]}
              title="Checked against our own press."
              intro="Every file gets a dieline overlay check: bleed, safe area, fold positions and colour mode, before plates are made."
              className="!block"
            />
          </div>
          <div className="col-span-4 md:col-span-6 md:col-start-7">
            <SiteImage slotId="factory-press" sizes="(min-width: 768px) 45vw, 100vw" />
          </div>
        </div>
      </section>

      <Gallery slotIds={style.mediaSlots.slice(1)} title={`${style.short} boxes in print.`} />

      <PriceTiers tiers={style.priceTiers} />

      <IndustryLinks slugs={style.industries} />

      <section className="container-x py-20 md:py-28">
        <SectionHeader spec={["Other printed styles"]} title="Compare styles." />
        <div className="mt-14">
          <StyleGrid
            items={related.map((s) => ({
              href: `/printed-boxes/${s.slug}`,
              name: s.name,
              summary: s.summary,
              slotId: s.mediaSlots[0]!,
              spec: [s.short, s.materials[0] ?? ""],
            }))}
          />
        </div>
      </section>

      <FaqList faqs={[...style.faqs, ...printedCommonFaqs]} />

      <CtaBand title="Get a printed proof." body="We can print a sample on production stock so you check colour and fit before the run." />
    </>
  );
}
