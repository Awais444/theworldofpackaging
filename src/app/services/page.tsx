import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { serviceCommonFaqs } from "@/content/agencyServices";
import { servicePages, type ServicePage } from "@/content/servicePages";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero } from "@/components/sections/PageHero";
import { serviceIcons } from "@/components/services/ServiceIcon";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ui/Cards";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StepList } from "@/components/ui/StepList";
import { Tabs } from "@/components/ui/Tabs";
import { faqPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Branding Services",
  description: "Brand identity, logo design, packaging design, label design, structural dielines and 3D mockups, from a studio with its own box factory.",
  alternates: { canonical: "/services" },
};

const benefits = [
  { title: "Designed for print", text: "Every design is checked against our own press." },
  { title: "Real dielines", text: "Artwork placed on the dieline we will cut." },
  { title: "One team", text: "Design and production, no hand-offs." },
  { title: "Fixed quotes", text: "Scope and revision rounds agreed up front." },
];

const faqs = [
  ...serviceCommonFaqs,
  { q: "Can I use your design service without manufacturing?", a: "Yes. You get print-ready files you can use with any printer, though most clients produce with us." },
  { q: "Do you work with brands outside Pakistan?", a: "Yes. Most of our clients are in the USA, UK, Canada, Australia, the UAE and Europe. We work over video calls, email and WhatsApp." },
  { q: "What do you need to start?", a: "A short brief: your product, audience, competitors you admire and any existing brand files. Our project form walks you through it." },
];

const cards = (list: ServicePage[]) => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {list.map((s) => (
      <ServiceCard key={s.path} icon={serviceIcons[s.icon]} title={s.name} text={s.summary} href={`/services/${s.path}`} bullets={s.deliverables.slice(0, 3).map((d) => d.name)} />
    ))}
  </div>
);

export default function ServicesHubPage() {
  return (
    <>
      <JsonLd data={faqPage(faqs)} />
      <PageHero
        crumbs={[{ label: "Services" }]}
        eyebrow="Design services"
        title="Branding and packaging design that gets made"
        highlight="made"
        intro={<p>Brand identity, packaging and structural design from a studio that runs its own factory. Every design is drawn for the board, press and finishes it will be made with.</p>}
        slotId="service-brand-identity-hero"
        actions={
          <>
            <Button href="/start-a-project" size="lg" arrow>
              Start a Project
            </Button>
            <Button href="/packages" size="lg" variant="secondary">
              See packages
            </Button>
          </>
        }
      />

      <Section bg="silver" className="!py-12 md:!py-16">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
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
          <SectionHeader eyebrow="Services" title="What we can do for you" highlight="you" />
        </FadeIn>
        <div className="mt-10">
          <Tabs
            label="Filter services"
            items={[
              { id: "all-services", label: "All services", content: cards(servicePages) },
              { id: "branding", label: "Branding", content: cards(servicePages.filter((s) => s.hub === "branding")) },
              { id: "packaging", label: "Packaging", content: cards(servicePages.filter((s) => s.hub === "packaging-design")) },
            ]}
          />
        </div>
      </Section>

      <Section bg="blue-50">
        <SectionHeader eyebrow="How we work" title="From brief to boxes" highlight="boxes" />
        <div className="mt-12">
          <StepList
            steps={[
              { title: "Brief", body: "A call or form about your product, audience and goals." },
              { title: "Concepts", body: "Two or three directions shown on real packaging mockups." },
              { title: "Refine", body: "We develop one direction and prepare print-ready files." },
              { title: "Produce", body: "Digital proof, then production in our own factory, if you want it." },
            ]}
          />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title="Common questions" highlight="questions" />
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faqs} />
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <CTABand
          title="Tell us about your brand"
          highlight="brand"
          text="We reply with a proposal and a fixed quote."
          actions={
            <>
              <Button href="/start-a-project" variant="accent" size="lg" arrow>
                Start a Project
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
