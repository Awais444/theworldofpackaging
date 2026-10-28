import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { site } from "@/config/site";
import { exampleTimeline, processSteps, whatWeNeed } from "@/content/process";
import { quoteHref } from "@/content/navigation";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpecTable } from "@/components/ui/SpecTable";
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
      <PageHero
        crumbs={[{ label: "How It Works" }]}
        eyebrow="How it works"
        title="From brief to boxes in six steps"
        highlight="six"
        intro={<p>One team takes your project from the first message to delivered boxes. Here is what happens at each step, and who does what.</p>}
        slotId="rigid-magnetic-closure-gallery-2"
        actions={
          <>
            <Button href={quoteHref} size="lg" arrow>
              Get a Quote
            </Button>
            <Button href="/start-a-project" size="lg" variant="secondary">
              Start a Project
            </Button>
          </>
        }
      />

      <Section bg="silver">
        <FadeIn>
          <SectionHeader eyebrow="The steps" title="What happens, and who does what" highlight="who" />
        </FadeIn>
        <ol className="mt-12 space-y-6">
          {processSteps.map((s, i) => (
            <li key={s.title} className="grid gap-6 rounded-3xl bg-white p-6 md:grid-cols-12 md:p-8">
              <div className="md:col-span-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-heading text-lg font-bold text-white">{i + 1}</span>
                <h3 className="text-h3 mt-4">{s.title}</h3>
                <p className="mt-2 text-ink-500">{s.body}</p>
              </div>
              <div className="rounded-2xl bg-orange-50 p-5 md:col-span-4">
                <p className="text-eyebrow text-orange-text">You</p>
                <p className="mt-2">{s.you}</p>
              </div>
              <div className="rounded-2xl bg-blue-50 p-5 md:col-span-4">
                <p className="text-eyebrow text-blue-600">Us</p>
                <p className="mt-2">{s.us}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Timeline" title="A typical timeline" highlight="typical" lead="Exact dates are set in your quote." />
            <div className="mt-8">
              <SpecTable caption="Example project timeline" rows={exampleTimeline.map((t) => ({ label: t.step, value: t.time }))} />
            </div>
          </div>
          <div>
            <SectionHeader eyebrow="Checklist" title="What we need from you" highlight="need" />
            <ul className="mt-8 space-y-3">
              {whatWeNeed.map((w) => (
                <li key={w} className="flex gap-3 rounded-2xl bg-silver-50 p-4">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
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
    </>
  );
}
