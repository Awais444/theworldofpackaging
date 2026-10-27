import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { InlineContact } from "@/components/forms/InlineContact";
import { Media } from "@/components/media/Media";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StepList } from "@/components/ui/StepList";
import { Tag } from "@/components/ui/Tag";
import { RATES } from "@/lib/pricing";
import { faqPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Order a Sample Box",
  description: "Physical sample boxes made on our production line. The sample fee is credited to your bulk order.",
  alternates: { canonical: "/samples" },
};

const samples = [
  {
    id: "sample-rigid",
    title: "Rigid sample box",
    body: "A rigid box in your size, board, wrap and finish, made on the production line.",
    priceUsd: RATES.samplePrice.rigid,
    slot: "rigid-magnetic-closure-hero",
    spec: ["Your spec", "Production line"],
  },
  {
    id: "sample-collapsible",
    title: "Collapsible sample box",
    body: "Ships to you flat so you can test the assembly yourself.",
    priceUsd: RATES.samplePrice.collapsible,
    slot: "collapsible-flat",
    spec: ["Ships flat", "Assemble at your desk"],
  },
  {
    id: "sample-printed",
    title: "Printed sample box",
    body: "A printed mailer or carton on production stock, to check colour and fit.",
    priceUsd: RATES.samplePrice.printed,
    slot: "printed-mailer-hero",
    spec: ["Production stock", "Colour check"],
  },
  {
    id: "swatch-kit",
    title: "Material swatch kit",
    body: "Greyboard thicknesses, wrap papers, linen, leatherette and foil swatches.",
    priceUsd: RATES.samplePrice.swatches,
    slot: "rigid-lid-and-base-hero",
    spec: ["Board + wraps", "Foil chips"],
  },
];

const included = [
  "Your exact size, board and wrap",
  "Your artwork printed, or our free basic setup",
  "Real finishes: foil, embossing, spot UV, soft-touch",
  "The insert, so you can check the product fit",
  "A spec sheet to approve before production",
  "Sample fee credited to your bulk order",
];

const faqs = [
  { q: "Is the sample fee refundable?", a: "It is credited against your production invoice when you place the bulk order." },
  { q: "Is shipping included in the sample price?", a: "Sample shipping is quoted when we confirm your spec, usually by express courier." }, // TODO confirm
  { q: "Can the sample have my artwork?", a: "Yes. Send print-ready files or choose our free basic setup and we print your design on the sample." },
  { q: "How long does a sample take?", a: "We confirm timing with your spec. It depends on finishes and inserts." }, // TODO real sample lead time
  { q: "Can I change the design after the sample?", a: "Yes. Small changes are normal. We confirm any changes in writing before production." },
];

export default function SamplesPage() {
  return (
    <>
      <JsonLd data={faqPage(faqs)} />
      <PageHero
        crumbs={[{ label: "Boxes", href: "/boxes" }, { label: "Samples" }]}
        eyebrow="Samples"
        title="Hold your box before you order"
        highlight="Hold"
        intro={<p>Samples are made on the same line, with the same board and finishes, as your bulk run. The sample fee comes off your production invoice when you go ahead.</p>}
        slotId="rigid-magnetic-closure-gallery-2"
        actions={
          <>
            <Button href="#choose" size="lg" arrow>
              Choose a sample
            </Button>
            <Button href="#request" size="lg" variant="secondary">
              Ask about samples
            </Button>
          </>
        }
      />

      <Section bg="silver">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="What's included" title="A real box, not a mockup" highlight="real" />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {included.map((i) => (
              <li key={i} className="flex gap-3 rounded-2xl bg-white p-5">
                <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0 text-orange-500" />
                <span className="font-medium">{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="choose">
        <FadeIn>
          <SectionHeader eyebrow="Choose" title="Pick your sample" highlight="sample" />
        </FadeIn>
        {!RATES.ratesConfirmed && (
          <p className="mt-6">
            <Tag tone="orange">Example prices, to be confirmed</Tag>
          </p>
        )}
        <ul className="mt-10 grid gap-8 md:grid-cols-2">
          {samples.map((s) => (
            <li key={s.id} className="rounded-3xl border border-silver-300 p-4 md:p-6">
              <Media slot={s.slot} sizes="(min-width: 768px) 45vw, 100vw" />
              <div className="mt-6 flex items-baseline justify-between gap-4">
                <h3 className="text-h3">{s.title}</h3>
                <p className="font-heading text-2xl font-bold text-blue-600">${s.priceUsd}</p>
              </div>
              <p className="mt-2 text-ink-500">{s.body}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {s.spec.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <div className="mt-6">
                <AddToCartButton item={{ id: s.id, kind: s.id === "swatch-kit" ? "swatches" : "sample", title: s.title, spec: s.spec, priceUsd: s.priceUsd }} />
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section bg="blue-50">
        <SectionHeader eyebrow="How it works" title="Sample, approve, produce" highlight="approve" />
        <div className="mt-12">
          <StepList
            steps={[
              { title: "Order", body: "Pick a sample here, or ask us below." },
              { title: "Confirm the spec", body: "We confirm size, materials and artwork before making it." },
              { title: "Approve", body: "Check the box in your hands and sign off." },
              { title: "Credit on production", body: "Go ahead and the sample fee is deducted from the bulk order." },
            ]}
          />
        </div>
      </Section>

      <Section>
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="FAQ" title="Sample questions" highlight="questions" />
            <div className="mt-10">
              <Accordion items={faqs} />
            </div>
          </div>
          <div id="request" className="scroll-mt-28 rounded-3xl bg-silver-100 p-6 md:p-10">
            <h2 className="text-h3">Ask about a sample</h2>
            <p className="mt-2 text-ink-500">Tell us the box and size. We reply with the sample spec and price.</p>
            <div className="mt-6">
              <InlineContact />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
