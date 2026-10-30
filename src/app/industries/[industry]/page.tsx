import type { Metadata } from "next";
import { industryAnswer } from "@/content/answers";
import { metaDescription, ogFor } from "@/lib/seo";
import { notFound } from "next/navigation";
import { ArrowRight, Gift, Info, ShieldCheck, Store, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { relatedWork } from "@/content/caseStudies";
import { RelatedWork } from "@/components/sections/RelatedWork";
import { designHref, getDesignService, industryDesignService } from "@/content/designServices";
import { getIndustry, industries } from "@/content/industries";
import { industryFinishes, industrySharedFaqs } from "@/content/industryDetails";
import { quoteHref } from "@/content/navigation";
import { printedStyles } from "@/content/printedStyles";
import { rigidStyles } from "@/content/rigidStyles";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/Cards";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { printedCard, rigidCard } from "@/lib/boxView";
import { faqPage } from "@/lib/schema";
import { guidesForIndustry } from "@/content/linking";
import { GuideCards } from "@/components/sections/RelatedLinks";

type Props = { params: Promise<{ industry: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ind = getIndustry((await params).industry);
  if (!ind) return {};
  return {
    title: `${ind.name} Boxes and Packaging`,
    description: metaDescription(ind.intro),
    alternates: { canonical: `/industries/${ind.slug}` },
    openGraph: ogFor(`/industries/${ind.slug}`),
  };
}

const needIcons: LucideIcon[] = [ShieldCheck, Store, Gift];

export default async function IndustryPage({ params }: Props) {
  const ind = getIndustry((await params).industry);
  if (!ind) notFound();

  const boxes = [
    ...ind.rigid.flatMap((slug) => {
      const s = rigidStyles.find((r) => r.slug === slug);
      return s ? [rigidCard(s)] : [];
    }),
    ...ind.printed.flatMap((slug) => {
      const s = printedStyles.find((p) => p.slug === slug);
      return s ? [printedCard(s)] : [];
    }),
  ].slice(0, 6);
  const work = relatedWork({ industry: ind.slug });
  const faqs = [...ind.faqs, ...industrySharedFaqs].slice(0, 5);
  const design = getDesignService(industryDesignService[ind.slug] ?? "");
  const finishes = industryFinishes[ind.slug] ?? [];

  return (
    <>
      <JsonLd data={faqPage(faqs)} />
      <PageHero
        crumbs={[{ label: "Industries", href: "/industries" }, { label: ind.name }]}
        eyebrow="Industry"
        title={`${ind.name} boxes and packaging`}
        highlight="boxes"
        intro={<p>{industryAnswer(ind)}</p>}
        slotId={`industry-${ind.slug}-hero`}
        actions={
          <>
            <Button href={`${quoteHref}?industry=${ind.slug}`} size="lg" arrow>
              Get a Quote
            </Button>
          </>
        }
      />

      {design && (
        <Section className="!py-0">
          <Link
            href={designHref(design.slug)}
            className="group flex flex-col gap-4 rounded-3xl bg-blue-600 p-6 text-white transition hover:bg-blue-700 md:flex-row md:items-center md:justify-between md:p-8"
          >
            <div>
              <p className="text-eyebrow text-white/80">Need it designed?</p>
              <p className="text-h3 mt-2">{design.name}</p>
              <p className="mt-1 text-white/80">{design.short} Designed by our studio, made in our factory.</p>
            </div>
            <span className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-white px-6 font-semibold text-blue-600">
              View the design service <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Section>
      )}

      <Section bg="silver">
        <FadeIn>
          <SectionHeader eyebrow="Packaging needs" title={`What ${ind.name.toLowerCase()} packaging must do`} highlight="must" />
        </FadeIn>
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:gap-6 lg:grid-cols-4">
          {ind.challenges.slice(0, 3).map((c, i) => {
            const Icon = needIcons[i % needIcons.length]!;
            return (
              <li key={c.title} className="rounded-2xl bg-white p-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <h3 className="text-h4 mt-4">{c.title}</h3>
                <p className="mt-2 text-ink-500">{c.body}</p>
              </li>
            );
          })}
          {/* TODO: compliance notes need review before launch (see content/industries.ts). */}
          <li className="rounded-2xl border-2 border-dashed border-silver-300 bg-white p-6">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-500">
              <Info aria-hidden="true" className="h-6 w-6" />
            </span>
            <h3 className="text-h4 mt-4">Compliance notes</h3>
            <p className="mt-2 text-ink-500">{ind.compliance}</p>
          </li>
        </ul>
      </Section>

      <Section>
        <FadeIn>
          <SectionHeader
            eyebrow="Recommended boxes"
            title={`Boxes that suit ${ind.name.toLowerCase()}`}
            highlight="suit"
            action={
              <Button href="/boxes" variant="ghost" arrow>
                All boxes
              </Button>
            }
          />
        </FadeIn>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:gap-6 lg:grid-cols-3">
          {boxes.map((b) => (
            <ProductCard key={b.href} {...b} />
          ))}
        </div>
      </Section>

      <Section bg="blue-50">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeader eyebrow="Finishes" title="Finishes that work" highlight="work" lead="Popular combinations for this category. Every finish is shown on your 3D mockup and digital proof." />
            <ul className="mt-8 flex flex-wrap gap-3">
              {finishes.map((f) => (
                <li key={f} className="inline-flex h-11 items-center rounded-full bg-white px-5 font-medium">
                  {f}
                </li>
              ))}
            </ul>
            <Button href="/finishes" variant="ghost" arrow className="mt-8">
              All finishes
            </Button>
          </div>
        </div>
      </Section>

      <RelatedWork studies={work} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title={`${ind.name} packaging questions`} highlight="questions" />
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faqs} />
          </div>
        </div>
      </Section>

      <Section>
        <GuideCards guides={guidesForIndustry(ind.slug)} title={`Guides for ${ind.name.toLowerCase()} brands`} />
      </Section>

      <Section className="!pt-0">
        <CTABand
          title={`Launching in ${ind.name.toLowerCase()}?`}
          whatsapp={`${ind.name} packaging`}
          highlight="Launching"
          text="Tell us about the product. We recommend a box and send a quote."
          actions={
            <>
              <Button href={`${quoteHref}?industry=${ind.slug}`} variant="accent" size="lg" arrow>
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
