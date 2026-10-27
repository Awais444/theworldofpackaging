import type { Metadata } from "next";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { SiteImage } from "@/components/media/SiteImage";
import { PageHero } from "@/components/sections/PageHero";
import { FaqList } from "@/components/sections/StyleDetailBlocks";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { RATES } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Order a Sample Box",
  description: "Paid sample boxes made on our production line. The sample fee is credited to your bulk order.",
  alternates: { canonical: "/samples" },
};

const samples = [
  {
    id: "sample-rigid",
    title: "Rigid sample box",
    body: "A rigid box in your size, board, wrap and finish, made on the production line.",
    priceUsd: RATES.samplePrice.rigid,
    slotId: "rigid-magnetic-closure-hero",
    spec: ["Your spec", "Production line"],
  },
  {
    id: "sample-collapsible",
    title: "Collapsible sample box",
    body: "Ships to you flat so you can test the assembly yourself.",
    priceUsd: RATES.samplePrice.collapsible,
    slotId: "collapsible-flat",
    spec: ["Ships flat", "Assemble at your desk"],
  },
  {
    id: "sample-printed",
    title: "Printed sample box",
    body: "A printed mailer or carton on production stock, to check colour and fit.",
    priceUsd: RATES.samplePrice.printed,
    slotId: "printed-mailer-hero",
    spec: ["Production stock", "Colour check"],
  },
  {
    id: "swatch-kit",
    title: "Material swatch kit",
    body: "Greyboard thicknesses, wrap papers, linen, leatherette and foil swatches.",
    priceUsd: RATES.samplePrice.swatches,
    slotId: "factory-wrap",
    spec: ["Board + wraps", "Foil chips"],
  },
];

export default function SamplesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Samples" }]}
        spec={["Samples", "Credited to bulk order"]}
        title="Hold it before you order 500."
        intro={
          <p>
            Samples are made on the same line, with the same board and finishes, as your bulk run. The sample fee comes
            off your production invoice when you go ahead.
          </p>
        }
        actions={
          <Button href="/configure" variant="secondary" size="lg">
            Specify in the configurator
          </Button>
        }
      />
      <section className="container-x pb-20 md:pb-28">
        {!RATES.ratesConfirmed && <p className="spec mb-8 inline-block bg-yellow px-2 py-1 text-ink">Example prices</p>}
        <ul className="grid gap-x-6 gap-y-16 md:grid-cols-2">
          {samples.map((s) => (
            <li key={s.id}>
              <SiteImage slotId={s.slotId} sizes="(min-width: 768px) 45vw, 100vw" cropMarks={false} />
              <div className="mt-6 flex items-baseline justify-between gap-4">
                <h2 className="type-display text-display-sm">{s.title}</h2>
                <p className="font-mono">${s.priceUsd}</p>
              </div>
              <p className="mt-2 text-muted">{s.body}</p>
              <SpecLabel items={s.spec} as="p" className="mt-3" />
              <div className="mt-6">
                <AddToCartButton item={{ id: s.id, kind: s.id === "swatch-kit" ? "swatches" : "sample", title: s.title, spec: s.spec, priceUsd: s.priceUsd }} />
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="container-x pb-20 md:pb-28">
        <SectionHeader spec={["How it works"]} title="Sample, approve, produce." />
        <ol className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-3">
          {[
            ["Order", "Pay for the sample here, or configure a box and add its sample from the configurator."],
            ["We confirm the spec", "We email to confirm size, materials and artwork before making it."],
            ["Credit on production", "Go ahead with the bulk order and the sample fee is deducted."],
          ].map(([t, b], i) => (
            <li key={t}>
              <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="type-display mt-3 text-display-sm">{t}</h3>
              <p className="mt-2 text-muted">{b}</p>
            </li>
          ))}
        </ol>
      </section>
      <FaqList
        faqs={[
          { q: "Is shipping included in the sample price?", a: "Sample shipping is quoted at checkout confirmation, usually by express courier." }, // TODO confirm
          { q: "Can the sample have my artwork?", a: "Yes. Send print-ready files or choose our basic setup and we print your design on the sample." },
        ]}
      />
    </>
  );
}
