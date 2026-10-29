import { CheckCircle2, Clock, Factory, Tag as TagIcon } from "lucide-react";
import Link from "next/link";
import { site } from "@/config/site";
import { designHref, getDesignService, type DesignService } from "@/content/designServices";
import { countriesForService, guidesForService, industryForService } from "@/content/linking";
import { getIndustry } from "@/content/industries";
import { GuideCards, RegionLinks } from "@/components/sections/RelatedLinks";
import { RelatedWork } from "@/components/sections/RelatedWork";
import { relatedWork } from "@/content/caseStudies";
import { quoteHref } from "@/content/navigation";
import { designFeeNote, designTiers, priceLabel } from "@/content/pricing";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Media } from "@/components/media/Media";
import { FadeIn } from "@/components/motion/FadeIn";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/Cards";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StepList } from "@/components/ui/StepList";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { boxRefCard, type BoxCard } from "@/lib/boxView";
import { faqPage, service as serviceSchema } from "@/lib/schema";
import { PharmaExperience } from "./ClientExperience";
import { DesignCard } from "./DesignCard";

const steps = [
  { title: "Brief", body: "Your product, audience, references and where it will sell." },
  { title: "Concepts", body: `First design directions on 3D mockups, usually within ${site.facts.firstConceptHours} hours.` },
  { title: "Refine", body: "One direction developed across every panel and variant." },
  { title: "Artwork & proof", body: "Print-ready files on the real dieline, checked against our press." },
  { title: "Production", body: "Made in our factory if you want it, with production photos on WhatsApp before dispatch." },
];

/** Packaging design service page. */
export function DesignServicePage({ s }: { s: DesignService }) {
  const href = designHref(s.slug);
  const topic = s.name.replace(/ Design$/, " design");
  const boxes = s.recommendedBoxes.map(boxRefCard).filter((b): b is BoxCard => Boolean(b));
  const related = s.relatedServices.map(getDesignService).filter((r): r is DesignService => Boolean(r));
  const turnaround = s.turnaround ?? `First concepts in ${site.facts.firstConceptHours} hours`;
  const guides = guidesForService(s.slug, s.seo?.guides);
  const regions = countriesForService(s.slug);
  const industry = getIndustry(industryForService(s.slug) ?? "");

  return (
    <>
      <JsonLd data={[serviceSchema({ name: s.name, description: s.intro, path: href, category: "Packaging design" }), faqPage(s.faqs)]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white pb-16 pt-8 md:pb-24">
        <span aria-hidden="true" className="absolute -right-48 -top-48 h-[30rem] w-[30rem] rounded-full bg-blue-50" />
        <div className="container-x relative">
          <Breadcrumbs items={[{ label: "Packaging Design", href: "/packaging-design" }, { label: s.name }]} />
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <p className="text-eyebrow text-blue-600">Packaging design service</p>
              <h1 className="text-h1 mt-3">{s.h1}</h1>
              <p className="text-lead mt-5 text-ink-500">{s.intro}</p>
              <ul className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
                <li className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-blue-600">
                  <TagIcon aria-hidden="true" className="h-4 w-4" /> {priceLabel(s.priceFrom ?? null)}
                </li>
                <li className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-orange-text">
                  <Clock aria-hidden="true" className="h-4 w-4" /> {turnaround}
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={`${quoteHref}?service=${s.slug}`} size="lg" arrow>
                  Get a Free Quote
                </Button>
                <WhatsAppButton topic={topic} />
              </div>
            </div>
            <div className="lg:col-span-6">
              <Media slot={s.portfolioSlots[0]!} panel="blue" priority sizes="(min-width: 1024px) 45vw, 90vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Long-form copy (SEO plan) with related guides */}
      {s.seo && (
        <Section>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <article className="max-w-[70ch] lg:col-span-8">
              {s.seo.sections.map((sec, i) => (
                <div key={sec.h2} className={i > 0 ? "mt-12" : undefined}>
                  <h2 className="text-h3">{sec.h2}</h2>
                  {sec.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)} className="mt-4 text-ink-500">
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </article>
            <aside className="lg:col-span-4">
              <div className="space-y-6 lg:sticky lg:top-[120px]">
                {guides.length > 0 && (
                  <div className="rounded-2xl border border-silver-300 p-6">
                    <p className="text-eyebrow text-blue-600">Related guides</p>
                    <ul className="mt-4 space-y-3">
                      {guides.map((g) => (
                        <li key={g.slug}>
                          <Link href={`/blog/${g.slug}`} className="font-semibold text-ink-900 hover:text-blue-600 hover:underline">
                            {g.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="rounded-2xl bg-blue-50 p-6">
                  <p className="font-heading text-h4 font-bold">Get a fixed quote</p>
                  <p className="mt-2 text-sm text-ink-500">Send your product and quantity. We reply {site.facts.quoteReply} with a design route and price.</p>
                  <Button href={`${quoteHref}?service=${s.slug}`} size="sm" arrow className="mt-4">
                    Get a Free Quote
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Section>
      )}

      {/* What we design */}
      <Section bg="silver">
        <FadeIn>
          <SectionHeader eyebrow="What we design" title={`${s.name.replace(/ Design$/, "")} formats we design`} highlight="formats" />
        </FadeIn>
        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {s.formats.map((f) => (
            <li key={f} className="flex items-center gap-3 rounded-2xl bg-white p-5 font-semibold">
              <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-orange-500" />
              {f}
            </li>
          ))}
        </ul>
      </Section>

      {/* Portfolio */}
      <Section>
        <SectionHeader eyebrow="Category examples" title="Design directions for this category" highlight="directions" lead="Example visuals of this packaging format, not client projects." />
        <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
          {s.portfolioSlots.map((slot) => (
            <Media key={slot} slot={slot} sizes="(min-width: 1024px) 33vw, 50vw" />
          ))}
        </div>
      </Section>

      {/* Deliverables + considerations */}
      <Section bg="blue-50">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Deliverables" title="What you get" highlight="get" />
            <ul className="mt-8 space-y-3">
              {s.deliverables.map((d) => (
                <li key={d} className="flex gap-3 rounded-2xl bg-white p-4">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                  <span className="font-medium">{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader eyebrow="Good to know" title="What this category needs" highlight="needs" />
            <ul className="mt-8 space-y-3">
              {s.categoryNotes.map((n) => (
                <li key={n} className="rounded-2xl bg-white p-4 text-ink-500">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {s.slug === "pharmaceutical-packaging-design" && <PharmaExperience />}

      {/* Process */}
      <Section>
        <FadeIn>
          <SectionHeader eyebrow="Process" title="Five steps from brief to box" highlight="Five" />
        </FadeIn>
        <div className="mt-12">
          <StepList steps={steps} />
        </div>
      </Section>

      {/* Designed here, made here */}
      {boxes.length > 0 && (
        <Section bg="klein">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-eyebrow text-white/80">Designed here, made here</p>
              <h2 className="text-h2 mt-3">We also make the box</h2>
              <p className="text-lead mt-4 text-white/80">
                Your design goes straight to our own factory, with {site.facts.yearsExperience}+ years in packaging behind it: rigid and printed boxes from {site.facts.rigidMoq} units, with a digital proof before print.
              </p>
            </div>
            <Factory aria-hidden="true" className="h-16 w-16 text-orange-500" />
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 rounded-3xl bg-white p-4 text-ink-900 md:gap-6 md:p-6 lg:grid-cols-4">
            {boxes.map((b) => (
              <ProductCard key={b.href} {...b} />
            ))}
          </div>
        </Section>
      )}

      {/* Pricing */}
      <Section>
        <SectionHeader eyebrow="Pricing" title="Design packages" highlight="packages" lead={designFeeNote} />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {designTiers.map((t) => (
            <div key={t.id} className={t.id === "standard" ? "rounded-3xl border-2 border-blue-600 p-6" : "rounded-3xl border border-silver-300 p-6"}>
              <h3 className="text-h4">{t.name}</h3>
              <p className="mt-1 text-sm text-ink-500">{t.summary}</p>
              <p className="mt-4 font-heading text-2xl font-bold">{priceLabel(t.priceFrom)}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {t.includes.map((i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                    {i}
                  </li>
                ))}
              </ul>
              <Button href={`${quoteHref}?service=${s.slug}&tier=${t.id}`} variant={t.id === "standard" ? "primary" : "secondary"} className="mt-6 w-full">
                Get a quote
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section bg="silver">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title={`${s.name.replace(/ Design$/, "")} questions`} highlight="questions" />
          </div>
          <div className="lg:col-span-8">
            <Accordion items={s.faqs} />
          </div>
        </div>
      </Section>

      {/* Guides, industry and regions (internal linking rules) */}
      <Section>
        {!s.seo && <GuideCards guides={guides} />}
        <div className={s.seo ? "space-y-8" : "mt-14 space-y-8"}>
          {industry && (
            <p className="text-ink-500">
              Selling in this category? See our{" "}
              <Link href={`/industries/${industry.slug}`} className="font-semibold text-blue-600 hover:underline">
                {industry.name.toLowerCase()} packaging overview
              </Link>{" "}
              for box styles, finishes and common questions.
            </p>
          )}
          <RegionLinks countries={regions} />
        </div>
      </Section>

      <RelatedWork studies={relatedWork({ designService: s.slug })} bg="silver-50" service={s.slug} />

      {/* Related */}
      {related.length > 0 && (
        <Section>
          <SectionHeader
            eyebrow="Related services"
            title="You might also need"
            highlight="need"
            action={
              <Link href="/packaging-design" className="font-semibold text-blue-600 hover:underline">
                All packaging design services →
              </Link>
            }
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <DesignCard key={r.slug} s={r} />
            ))}
          </div>
        </Section>
      )}

      <Section className="!pt-0">
        <CTABand
          title={`Start your ${topic.toLowerCase()} project`}
          highlight="project"
          text={designFeeNote}
          whatsapp={topic}
          actions={
            <>
              <Button href={`${quoteHref}?service=${s.slug}`} variant="accent" size="lg" arrow>
                Get a Free Quote
              </Button>
            </>
          }
        />
      </Section>
    </>
  );
}
