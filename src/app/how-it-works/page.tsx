import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { site } from "@/config/site";
import { processSteps, whatWeNeed } from "@/content/process";
import { quoteHref } from "@/content/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: "How it works: brief to delivered boxes",
  description: "Six steps from brief to delivery: brief, design, sample, approval, production and shipping by air or sea.",
  alternates: { canonical: "/how-it-works" },
};

const faqs = [
  { q: "How long does the whole process take?", a: "It depends on design rounds, finishes and shipping method. We give you a timeline with dates in your quote." }, // TODO typical timelines
  { q: "Can I skip the design step?", a: "Yes. Send print-ready files and we check them and set them up on the dieline for free." },
  { q: "Is the sample required?", a: "We strongly recommend it for a first order. For reorders of an approved box you can skip it." },
  { q: "Can I change things after the sample?", a: "Yes. Small changes are normal. We confirm changes in writing before production." },
  { q: "How do I track my order?", a: "We send progress photos during production and tracking details once it ships." },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={faqPage(faqs)} />
      <section className="bg-white pb-12 pt-8 md:pb-16">
        <div className="container-x">
          <Breadcrumbs items={[{ label: "How It Works" }]} />
          <div className="mt-10 grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-eyebrow text-blue-600">How it works</p>
              <h1 className="text-display mt-3">From brief to boxes</h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-lead text-ink-500">Six steps, one team. Here is what happens at each stage and what you get from it, from the first message to boxes at your door.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={quoteHref} size="lg" arrow>
                  Get a Quote
                </Button>
                <Button href="/start-a-project" size="lg" variant="secondary">
                  Start a Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section className="!pt-8">
        <ProcessTimeline steps={processSteps} />
      </Section>

      <Section bg="silver-50">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Checklist" title="What we need from you" highlight="need" lead="Have these ready and we can quote and start faster." />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {whatWeNeed.map((w) => (
              <li key={w} className="flex gap-3 rounded-2xl border border-silver-300 bg-white p-4">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <CTABand
          title="Start at step one"
          highlight="one"
          text={`Send your brief. We reply ${site.facts.quoteReply}.`}
          actions={
            <>
              <Button href={quoteHref} variant="accent" size="lg" arrow>
                Get a Quote
              </Button>
              <Button href="/start-a-project" variant="white" size="lg">
                Start a Project
              </Button>
            </>
          }
        />
      </Section>
      <Section bg="silver">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title="Process questions" highlight="questions" />
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faqs} />
          </div>
        </div>
      </Section>

    </>
  );
}
