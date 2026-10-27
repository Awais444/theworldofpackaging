import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site.config";
import { agencyServices, hubs } from "@/content/agencyServices";
import { packages } from "@/content/packages";
import { printedStyles } from "@/content/printedStyles";
import { rigidStyles } from "@/content/rigidStyles";
import { priceFromLabel, ProjectCta } from "@/components/sections/AgencyBlocks";
import { PageHero } from "@/components/sections/PageHero";
import { FaqList } from "@/components/sections/StyleDetailBlocks";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";

export const metadata: Metadata = {
  title: "Pricing: rigid boxes, printed boxes, design and packages",
  description: `How pricing works for rigid boxes (MOQ ${site.facts.rigidMoq}), printed boxes, design services and bundled packages.`,
  alternates: { canonical: "/pricing" },
};

type Row = { href: string; name: string; cells: string[]; price: string };

function PriceTable({ head, rows, caption }: { head: string[]; rows: Row[]; caption: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line-strong">
            {[...head, "From"].map((h) => (
              <th key={h} scope="col" className="spec py-3 pr-4 font-medium text-muted">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.href} className="border-b border-dashed border-line">
              <th scope="row" className="py-4 pr-4 font-medium">
                <Link href={r.href} className="hover:text-accent">
                  {r.name}
                </Link>
              </th>
              {r.cells.map((c, i) => (
                <td key={i} className="py-4 pr-4 font-mono text-sm">
                  {c}
                </td>
              ))}
              <td className="py-4 font-mono text-sm">{r.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Drivers({ items }: { items: string[] }) {
  return (
    <div className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-[1fr_2fr]">
      <p className="spec text-muted">What sets the price</p>
      <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
        {items.map((d) => (
          <li key={d} className="flex gap-3 before:mt-[0.75em] before:h-px before:w-3 before:shrink-0 before:bg-line-strong">
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
}

const ON_QUOTE = "On quote"; // TODO: show real "from" prices once rates are confirmed

export default function PricingPage() {
  const rigid = (
    <>
      <PriceTable
        caption="Rigid box styles"
        head={["Style", "MOQ", "Board"]}
        rows={rigidStyles.map((s) => ({
          href: `/rigid-boxes/${s.slug}`,
          name: s.name,
          cells: [String(s.moq), `${Math.min(...s.boardMm).toFixed(1)}–${Math.max(...s.boardMm).toFixed(1)} mm`],
          price: s.priceFrom ? `$${s.priceFrom.toFixed(2)}/unit` : ON_QUOTE,
        }))}
      />
      <Drivers items={["Box size", "Board thickness", "Wrap material", "Finishes (foil, emboss, spot UV)", "Insert", "Quantity"]} />
    </>
  );

  const printed = (
    <>
      <PriceTable
        caption="Printed box styles"
        head={["Style", "Material"]}
        rows={printedStyles.map((s) => ({
          href: `/printed-boxes/${s.slug}`,
          name: s.name,
          cells: [s.materials[0] ?? ""],
          price: ON_QUOTE,
        }))}
      />
      <Drivers items={["Box size", "Board or flute", "Print sides and colours", "Finishes", "Quantity"]} />
    </>
  );

  const design = (
    <PriceTable
      caption="Design services"
      head={["Service", "Studio"]}
      rows={agencyServices.map((s) => ({
        href: `${hubs[s.hub].href}/${s.slug}`,
        name: s.name,
        cells: [hubs[s.hub].name],
        price: priceFromLabel(s.priceFrom),
      }))}
    />
  );

  const bundles = (
    <>
      <PriceTable
        caption="Packages"
        head={["Package", "For"]}
        rows={packages.map((p) => ({ href: `/packages#${p.slug}`, name: p.name, cells: [p.forWho], price: priceFromLabel(p.priceFrom) }))}
      />
      <Button href="/packages" variant="link" arrow className="mt-8">
        Compare packages
      </Button>
    </>
  );

  return (
    <>
      <PageHero
        crumbs={[{ label: "Pricing" }]}
        spec={["Pricing", "USD", "Ex. shipping + duties"]}
        title="What things cost, and why."
        intro={
          <p>
            Box prices depend on size, materials and quantity, so most are quoted per job. Use the configurator for a
            live estimate, or send a brief and get a fixed quote within {site.facts.quoteReplyHours} hours.
          </p>
        }
        actions={
          <>
            <Button href="/configure" size="lg" arrow>
              Get an estimate
            </Button>
            <Button href="/quote" variant="secondary" size="lg">
              Request a quote
            </Button>
          </>
        }
      />
      <section className="container-x pb-20 md:pb-28">
        <Tabs
          label="Pricing categories"
          items={[
            { id: "rigid", label: "Rigid", content: rigid },
            { id: "printed", label: "Printed", content: printed },
            { id: "design", label: "Design", content: design },
            { id: "packages", label: "Packages", content: bundles },
          ]}
        />
      </section>
      <FaqList
        faqs={[
          { q: "Are prices in USD?", a: "Quotes are in USD by default. The configurator can show estimates in GBP, EUR, CAD, AUD and AED for reference." },
          { q: "Is shipping included?", a: "No. We quote air and sea freight separately once we know quantity and destination." },
          { q: "How do I pay?", a: "Payment terms are set out in your quote." }, // TODO: confirm deposit / balance terms
        ]}
      />
      <ProjectCta title="Get a real number." body="Send the size, quantity and materials you have in mind. We reply with a fixed quote." />
    </>
  );
}
