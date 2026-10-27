import { CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import { quoteHref } from "@/content/navigation";
import type { Faq } from "@/content/rigidStyles";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/Cards";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tabs } from "@/components/ui/Tabs";
import type { BoxCard } from "@/lib/boxView";
import { faqPage } from "@/lib/schema";

export type HubTab = { id: string; label: string; cards: BoxCard[] };

type BoxHubProps = {
  crumb: string;
  title: string;
  highlight: string;
  eyebrow: string;
  intro: string;
  slot: string;
  benefits: Array<{ title: string; text: string }>;
  gridTitle: string;
  gridHighlight: string;
  tabs: HubTab[];
  /** Materials/finishes or process section. */
  supporting: ReactNode;
  faqs: Faq[];
  cta: { title: string; highlight: string; text: string };
};

const grid = (cards: BoxCard[]) => (
  <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-6 lg:grid-cols-4">
    {cards.map((c) => (
      <ProductCard key={c.href} {...c} />
    ))}
  </div>
);

/** Hub page (CLAUDE.md §7.2): hero, benefits, filterable grid, supporting section, FAQ, CTA. */
export function BoxHub(p: BoxHubProps) {
  return (
    <>
      <PageHero
        crumbs={[{ label: p.crumb }]}
        eyebrow={p.eyebrow}
        title={p.title}
        highlight={p.highlight}
        intro={<p>{p.intro}</p>}
        slotId={p.slot}
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

      <Section bg="silver" className="!py-12 md:!py-16">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {p.benefits.map((b) => (
            <li key={b.title} className="flex gap-3">
              <CheckCircle2 aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-orange-500" />
              <div>
                <p className="font-heading text-lg font-bold">{b.title}</p>
                <p className="mt-1 text-sm text-ink-500">{b.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <FadeIn>
          <SectionHeader eyebrow="Styles" title={p.gridTitle} highlight={p.gridHighlight} />
        </FadeIn>
        <div className="mt-10">
          <Tabs label="Filter box styles" items={p.tabs.map((t) => ({ id: t.id, label: t.label, content: grid(t.cards) }))} />
        </div>
      </Section>

      {p.supporting}

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title="Common questions" highlight="questions" />
          </div>
          <div className="lg:col-span-8">
            <Accordion items={p.faqs} />
          </div>
        </div>
        <JsonLd data={faqPage(p.faqs)} />
      </Section>

      <Section className="!pt-0">
        <CTABand
          title={p.cta.title}
          highlight={p.cta.highlight}
          text={p.cta.text}
          actions={
            <>
              <Button href={quoteHref} variant="accent" size="lg" arrow>
                Get a Quote
              </Button>
              <Button href="/contact" variant="white" size="lg">
                Talk to us
              </Button>
            </>
          }
        />
      </Section>
    </>
  );
}

/** Small linked cards to /materials, /finishes and /inserts, used as a hub's supporting section. */
export function MaterialsTeaser({ items }: { items: Array<{ title: string; text: string; href: string }> }) {
  return (
    <Section bg="blue-50">
      <FadeIn>
        <SectionHeader eyebrow="Make it yours" title="Materials, finishes and inserts" highlight="finishes" />
      </FadeIn>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((i) => (
          <a key={i.href} href={i.href} className="group rounded-2xl bg-white p-6 transition hover:-translate-y-1 hover:shadow-md">
            <h3 className="text-h4 group-hover:text-blue-600">{i.title}</h3>
            <p className="mt-2 text-ink-500">{i.text}</p>
            <span className="mt-4 inline-block font-semibold text-blue-600">Explore →</span>
          </a>
        ))}
      </div>
    </Section>
  );
}

export const materialsTeaserItems = [
  { title: "Materials", text: "Greyboard, SBS, kraft, corrugated and specialty wraps.", href: "/materials" },
  { title: "Finishes", text: "Foil, embossing, spot UV, soft-touch and more.", href: "/finishes" },
  { title: "Inserts", text: "EVA foam, velvet, card, satin and moulded pulp.", href: "/inserts" },
];
