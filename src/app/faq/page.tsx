import type { Metadata } from "next";
import { metaDescription } from "@/lib/seo";
import { faqGroups } from "@/content/faqs";
import { quoteHref } from "@/content/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { Tabs } from "@/components/ui/Tabs";
import { faqPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ",
  description: metaDescription("Answers on ordering, design, production, shipping and payment for rigid and printed boxes."),
  alternates: { canonical: "/faq" },
};

const total = faqGroups.reduce((n, g) => n + g.faqs.length, 0);

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPage(faqGroups.flatMap((g) => g.faqs))} />
      <PageHero
        crumbs={[{ label: "FAQ" }]}
        eyebrow={`FAQ · ${total} answers`}
        title="Questions, answered"
        highlight="answered"
        intro={<p>The things clients ask before their first order, grouped by topic. Missing one? Ask us directly.</p>}
        actions={
          <Button href="/contact" size="lg" arrow>
            Ask a question
          </Button>
        }
      />
      <Section className="!pt-0">
        <div className="mx-auto max-w-4xl">
          <Tabs label="FAQ topics" items={faqGroups.map((g) => ({ id: g.id, label: g.title, content: <Accordion items={g.faqs} defaultOpen={null} /> }))} />
        </div>
      </Section>
      <Section className="!pt-0">
        <CTABand
          title="Still have a question?"
          highlight="question"
          text="Send it with your brief and we will answer both."
          actions={
            <>
              <Button href="/contact" variant="accent" size="lg" arrow>
                Contact us
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
