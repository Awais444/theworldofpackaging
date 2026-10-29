import { CheckCircle2 } from "lucide-react";
import { publicCaseStudies as caseStudies } from "@/content/caseStudies";
import { printedStyles } from "@/content/printedStyles";
import { rigidStyles } from "@/content/rigidStyles";
import type { ServicePage } from "@/content/servicePages";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { CaseCard, ProductCard } from "@/components/ui/Cards";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StepList } from "@/components/ui/StepList";
import { Tag } from "@/components/ui/Tag";
import { priceLabel } from "@/content/pricing";
import { printedCard, rigidCard } from "@/lib/boxView";
import { faqPage, service as serviceSchema } from "@/lib/schema";
import { getWorkService } from "@/content/workServices";

/** Service page (CLAUDE.md §7.3). */
export function ServiceDetail({ s }: { s: ServicePage }) {
  const related = [...caseStudies.filter((c) => c.categories.includes(s.workCategory)), ...caseStudies.filter((c) => !c.categories.includes(s.workCategory))].slice(0, 3);
  const pair = s.pairWith.map((p) =>
    p.kind === "rigid" ? rigidCard(rigidStyles.find((r) => r.slug === p.slug)!) : printedCard(printedStyles.find((r) => r.slug === p.slug)!),
  );
  const href = `/services/${s.path}`;
  // Only services that are /work filter categories (e.g. Brand Identity) get a filtered link.
  const workFilter = getWorkService(s.path);

  return (
    <>
      <JsonLd data={[serviceSchema({ name: s.name, description: s.summary, path: href, category: s.hub === "branding" ? "Branding" : "Packaging design" }), faqPage(s.faqs)]} />
      <PageHero
        crumbs={[{ label: "Services", href: "/services" }, { label: s.name }]}
        eyebrow="Design service"
        title={s.name}
        intro={<p>{s.intro}</p>}
        slotId={`service-${s.slug}-hero`}
        actions={
          <>
            <Button href={`/start-a-project?service=${s.path}`} size="lg" arrow>
              Start a Project
            </Button>
            <Button href="/work" size="lg" variant="secondary">
              See work
            </Button>
          </>
        }
      />

      <Section bg="silver">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Deliverables" title="What you get" highlight="get" lead={s.summary} />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {s.deliverables.map((d) => (
              <li key={d.name} className="flex gap-3 rounded-2xl bg-white p-5">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                <div>
                  <p className="font-semibold">{d.name}</p>
                  <p className="mt-1 text-sm text-ink-500">{d.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <FadeIn>
          <SectionHeader eyebrow="Process" title={`Our process for ${s.name.toLowerCase()}`} highlight="process" />
        </FadeIn>
        <div className="mt-12">
          <StepList steps={s.process} />
        </div>
      </Section>

      {related.length > 0 && (
      <Section bg="blue-50">
        <SectionHeader
          eyebrow="Related work"
          title="Projects like this"
          highlight="this"
          action={
            <Button href={workFilter ? `/work?service=${workFilter.id}` : "/work"} variant="ghost" arrow>
              {workFilter ? `View all ${workFilter.label} work` : "All work"}
            </Button>
          }
        />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {related.map((c) => (
            <CaseCard key={c.slug} href={`/work/${c.slug}`} title={c.client} text={c.summary} slot={c.coverSlot} industry={c.industry} placeholder={c.placeholder} />
          ))}
        </div>
      </Section>
      )}

      <Section>
        <SectionHeader eyebrow="Production" title="Pair it with production" highlight="production" lead="We make the boxes too. Designs go straight to our factory, with no hand-off to another printer." />
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:gap-6 lg:grid-cols-4">
          {pair.map((c) => (
            <ProductCard key={c.href} {...c} />
          ))}
        </div>
      </Section>

      <Section bg="silver">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <p className="text-eyebrow text-blue-600">Starting price</p>
              {/* TODO: real "from" prices in agencyServices.ts */}
              <p className="mt-3 font-heading text-4xl font-bold">{priceLabel(s.priceFrom)}</p>
              <p className="mt-2 text-sm text-ink-500">Timeline: {s.timeline}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Tag tone="orange">Free design check</Tag>
                <Tag>Fixed quote</Tag>
              </div>
              <Button href={`/start-a-project?service=${s.path}`} className="mt-8 w-full" arrow>
                Get exact quote
              </Button>
            </div>
          </div>
          <div className="lg:col-span-8">
            <SectionHeader eyebrow="FAQ" title="Common questions" highlight="questions" />
            <div className="mt-8">
              <Accordion items={s.faqs} />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <CTABand
          title={`Start your ${s.name.toLowerCase()} project`}
          whatsapp={s.name}
          highlight="project"
          text="Tell us about your brand. We reply with a proposal and a fixed quote."
          actions={
            <>
              <Button href={`/start-a-project?service=${s.path}`} variant="accent" size="lg" arrow>
                Start a Project
              </Button>
              <Button href="/packages" variant="white" size="lg">
                See packages
              </Button>
            </>
          }
        />
      </Section>
    </>
  );
}
