import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site.config";
import { shipTo } from "@/content/shipTo";
import { ProjectCta } from "@/components/sections/AgencyBlocks";
import { FreightSlider } from "@/components/sections/FreightSlider";
import { PageHero } from "@/components/sections/PageHero";
import { FaqList } from "@/components/sections/StyleDetailBlocks";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Worldwide Shipping: air and sea",
  description: `Packaging shipped from ${site.country} to ${site.markets.join(", ")} by air and sea, with export documents prepared.`,
  alternates: { canonical: "/shipping" },
};

const modes = [
  { name: "Air freight", points: ["Fastest door-to-door", "Charged on actual or volumetric weight, whichever is higher", "Best for samples, launches and urgent stock"] },
  { name: "Sea freight", points: ["Slowest, lowest cost per box at volume", "Charged on volume, with a minimum", "Best for production runs and repeat stock"] },
];

export default function ShippingPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Shipping" }]}
        spec={["Shipping", "Air + sea", "Worldwide"]}
        title="From our floor to yours."
        intro={
          <p>
            We pack in export cartons, book freight and prepare the documents. You choose air for speed or sea for cost;
            collapsible boxes make either one cheaper.
          </p>
        }
        actions={
          <Button href="/quote" size="lg" arrow>
            Quote with freight
          </Button>
        }
        slotId="world-map"
      />

      <section className="container-x py-20 md:py-28">
        <SectionHeader spec={["Air vs sea"]} title="Two ways to ship." />
        <div className="mt-12 grid border-y border-line md:grid-cols-2">
          {modes.map((m, i) => (
            <div key={m.name} className={i ? "border-t border-line py-10 md:border-t-0 md:border-l md:pl-10" : "py-10 md:pr-10"}>
              <h3 className="type-display text-display-md">{m.name}</h3>
              <ul className="mt-5 space-y-2">
                {m.points.map((p) => (
                  <li key={p} className="flex gap-3 before:mt-[0.75em] before:h-px before:w-3 before:shrink-0 before:bg-line-strong">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="tone-board">
        <div className="container-x py-20 md:py-28">
          <SectionHeader spec={["Collapsible savings"]} title="Ship boxes, not air." className="mb-14" />
          <FreightSlider />
          <Button href="/collapsible-rigid-boxes" variant="link" arrow className="mt-10">
            Collapsible rigid boxes
          </Button>
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <SectionHeader spec={["Duties + documents"]} title="What happens at the border." />
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {[
            ["Documents", "Commercial invoice and packing list with every shipment; certificate of origin on request."],
            ["Duties and taxes", "Import duty and VAT or sales tax are set by your country and usually paid by the importer. We can quote delivered-duty-paid on request."],
            ["Your broker", "For sea freight you will normally need a customs broker at destination. We work with yours or suggest one."],
          ].map(([t, b]) => (
            <div key={t} className="border-t border-line pt-5">
              <h3 className="type-display text-display-sm">{t}</h3>
              <p className="mt-3 text-muted">{b}</p>
            </div>
          ))}
        </div>
        <p className="spec mt-8 text-muted">General guidance, not customs advice. Rules vary by product and country.</p>
      </section>

      <section className="container-x pb-20 md:pb-28">
        <SectionHeader spec={["Ship to"]} title="Country guides." />
        <ul className="mt-10 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {shipTo.map((c) => (
            <li key={c.slug} className="border-b border-line">
              <Link href={`/ship-to/${c.slug}`} className="group flex items-baseline justify-between py-6 pr-6">
                <span className="type-display text-display-md transition-transform duration-300 group-hover:translate-x-2">{c.country}</span>
                <span aria-hidden="true" className="text-accent">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <FaqList
        faqs={[
          { q: "Do you ship samples by courier?", a: "Yes, by express courier with tracking." },
          { q: "Can you deliver to my 3PL or Amazon warehouse?", a: "We deliver to any address you give us. For marketplaces, tell us their labelling rules before packing." },
        ]}
      />
      <ProjectCta title="Get a delivered price." body="Tell us the destination and we include freight in your quote." />
    </>
  );
}
