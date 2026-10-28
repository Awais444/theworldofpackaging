import type { Metadata } from "next";
import { CheckCircle2, Cog } from "lucide-react";
import { site } from "@/config/site";
import { capacityNote, machines, productionSteps, qcChecklist, sustainability } from "@/content/company";
import { factorySteps } from "@/content/media";
import { quoteHref } from "@/content/navigation";
import { Media } from "@/components/media/Media";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StepList } from "@/components/ui/StepList";

export const metadata: Metadata = {
  title: "Our Rigid Box Factory",
  description: `Cutting, printing, wrapping, corner pasting, inserts and quality control under one roof in ${site.country}.`,
  alternates: { canonical: "/factory" },
};

export default function FactoryPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Factory" }]}
        eyebrow="Our factory"
        title="Where your boxes are made"
        highlight="made"
        intro={<p>Rigid boxes are cut, printed, wrapped and checked in our own factory. No outsourcing, no hand-offs between suppliers.</p>}
        slotId="factory-press"
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

      <Section bg="silver">
        <FadeIn>
          <SectionHeader eyebrow="Capabilities" title="Machines on our floor" highlight="floor" lead="Machine types we run. Make and model details to follow." />
        </FadeIn>
        {/* TODO: real machine list in content/company.ts */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {machines.map((m) => (
            <li key={m.type} className="flex gap-4 rounded-2xl bg-white p-5">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <Cog aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold">{m.type}</p>
                <p className="mt-1 text-sm text-ink-500">{m.use}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <FadeIn>
          <SectionHeader eyebrow="Production" title="Seven steps to a finished box" highlight="finished" />
        </FadeIn>
        <div className="mt-12">
          <StepList steps={productionSteps} />
        </div>
      </Section>

      <Section bg="blue-50">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Quality control" title="Checked at every stage" highlight="every" />
            <div className="mt-8 rounded-2xl bg-white p-6">
              <p className="font-heading text-lg font-bold">Capacity</p>
              {/* TODO: real capacity figures */}
              <p className="mt-2 text-ink-500">{capacityNote}</p>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {qcChecklist.map((c) => (
              <li key={c} className="flex gap-3 rounded-2xl bg-white p-4">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Sustainability" title="Materials and footprint" highlight="footprint" />
        {/* TODO: verify sustainability claims before launch (content/company.ts). */}
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sustainability.map((s) => (
            <li key={s.title} className="rounded-2xl border border-silver-300 p-6">
              <h3 className="text-h4">{s.title}</h3>
              <p className="mt-2 text-ink-500">{s.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section bg="silver">
        <SectionHeader eyebrow="Gallery" title="On the factory floor" highlight="floor" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {[...factorySteps.map((f) => f.id), "factory-press"].map((slot) => (
            <Media key={slot} slot={slot} panel="white" sizes="(min-width: 1024px) 33vw, 50vw" />
          ))}
        </div>
      </Section>

      <Section>
        <CTABand
          title="See it in your hands"
          highlight="hands"
          text="Order a sample made on our production line. The fee is credited to your bulk order."
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
