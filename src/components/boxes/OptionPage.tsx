import { quoteHref } from "@/content/navigation";
import type { OptionPageContent } from "@/content/optionPages";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpecTable } from "@/components/ui/SpecTable";
import { Tag } from "@/components/ui/Tag";
import { faqPage } from "@/lib/schema";

/** Materials, finishes and inserts pages: option groups, a "which to choose" table, FAQ and CTA. */
export function OptionPage({ page }: { page: OptionPageContent }) {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Boxes", href: "/boxes" }, { label: page.crumb }]}
        eyebrow={page.eyebrow}
        title={page.title}
        highlight={page.highlight}
        intro={<p>{page.intro}</p>}
        slotId={page.slot}
        actions={
          <>
            <Button href={quoteHref} size="lg" arrow>
              Get a Quote
            </Button>
            <Button href="/samples" size="lg" variant="secondary">
              Request a Sample
            </Button>
          </>
        }
      />

      {page.groups.map((g, gi) => (
        <Section key={g.title} bg={gi % 2 === 0 ? "silver" : "white"}>
          <FadeIn>
            <SectionHeader title={g.title} highlight={g.highlight} lead={g.lead} />
          </FadeIn>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {g.cards.map((c) => (
              <li key={c.name} className="flex flex-col rounded-2xl border border-silver-300 bg-white p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-h4">{c.name}</h3>
                  {c.tag && <Tag tone={c.tag === "Rigid" ? "blue" : "orange"}>{c.tag}</Tag>}
                </div>
                <p className="mt-3 text-ink-500">{c.text}</p>
                <p className="mt-auto pt-5 text-sm">
                  <span className="font-semibold text-ink-900">Best for: </span>
                  <span className="text-ink-500">{c.bestFor}</span>
                </p>
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section bg="blue-50">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Guide" title={page.compare.caption} highlight="choose" lead="Not sure? Send your product details and we will recommend a spec." />
          </div>
          <div className="lg:col-span-7">
            <SpecTable caption={page.compare.caption} rows={page.compare.rows} />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title="Common questions" highlight="questions" />
          </div>
          <div className="lg:col-span-8">
            <Accordion items={page.faqs} />
          </div>
        </div>
        <JsonLd data={faqPage(page.faqs)} />
      </Section>

      <Section className="!pt-0">
        <CTABand
          title="Feel it before you choose"
          highlight="Feel"
          text="We send swatches with your sample, so you pick materials and finishes in hand."
          actions={
            <>
              <Button href="/samples" variant="accent" size="lg" arrow>
                Request a Sample
              </Button>
              <Button href={quoteHref} variant="white" size="lg">
                Get a Quote
              </Button>
            </>
          }
        />
      </Section>
    </>
  );
}
