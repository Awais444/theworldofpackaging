import type { Metadata } from "next";
import Link from "next/link";
import { metaDescription, ogFor } from "@/lib/seo";
import { glossary } from "@/content/glossary";
import { quoteHref } from "@/content/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { withHighlight } from "@/components/ui/withHighlight";
import { definedTermSet } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Packaging Glossary: dielines, boards and finishes",
  description: metaDescription("Plain-English definitions of packaging terms: dielines, bleed, greyboard, E-flute, SBS, foil stamping, spot UV, EVA inserts, CMYK, Pantone, MOQ, DDP and more."),
  alternates: { canonical: "/glossary" }, openGraph: ogFor("/glossary"),
};

const terms = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
const letters = [...new Set(terms.map((t) => t.term[0]!.toUpperCase()))];

export default function GlossaryPage() {
  return (
    <>
      <JsonLd data={definedTermSet({ name: "Packaging glossary", path: "/glossary", terms })} />
      <section className="bg-white pb-10 pt-8">
        <div className="container-x">
          <Breadcrumbs items={[{ label: "Glossary" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="text-eyebrow text-blue-600">Glossary</p>
            <h1 className="text-h1 mt-3">{withHighlight("Packaging glossary", "glossary")}</h1>
            <p className="text-lead mt-5 text-ink-500">
              A packaging glossary of the terms printers, box makers and designers use, explained in plain English. Each entry gives a short definition and links to the page or guide that covers it in more depth, from dielines and greyboard to foil stamping, MOQ and shipping terms.
            </p>
          </div>
          <nav aria-label="Jump to letter" className="mt-8 flex flex-wrap gap-2">
            {letters.map((l) => (
              <a key={l} href={`#letter-${l}`} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-silver-300 text-sm font-semibold hover:border-blue-600 hover:text-blue-600">
                {l}
              </a>
            ))}
          </nav>
        </div>
      </section>
      <Section className="!pt-0">
        <div className="max-w-3xl">
          {letters.map((l) => (
            <section key={l} aria-labelledby={`letter-${l}`} className="mt-10 first:mt-0">
              <h2 id={`letter-${l}`} className="text-h3 scroll-mt-32">{l}</h2>
              <dl className="mt-4 divide-y divide-silver-300 border-y border-silver-300">
                {terms.filter((t) => t.term[0]!.toUpperCase() === l).map((t) => (
                  <div key={t.id} id={t.id} className="scroll-mt-32 py-4">
                    <dt className="font-heading text-lg font-bold">{t.term}</dt>
                    <dd className="mt-1 text-ink-500">
                      {t.definition}
                      {t.href && (
                        <>
                          {" "}
                          <Link href={t.href} className="font-semibold text-blue-600 hover:underline">
                            More on {t.term.toLowerCase()} →
                          </Link>
                        </>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </Section>
      <Section>
        <CTABand
          title="Questions about your packaging?"
          highlight="packaging"
          text="Send us your product and we will recommend the right box, board and finishes."
          actions={
            <Button href={quoteHref} variant="accent" size="lg" arrow>
              Get a Free Quote
            </Button>
          }
        />
      </Section>
    </>
  );
}
