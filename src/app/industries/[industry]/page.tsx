import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gift, Info, ShieldCheck, Store, type LucideIcon } from "lucide-react";
import { caseStudies } from "@/content/caseStudies";
import { getIndustry, industries } from "@/content/industries";
import { industryCase, industryFinishes, industrySharedFaqs } from "@/content/industryDetails";
import { quoteHref } from "@/content/navigation";
import { printedStyles } from "@/content/printedStyles";
import { rigidStyles } from "@/content/rigidStyles";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { CaseCard, ProductCard } from "@/components/ui/Cards";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { printedCard, rigidCard } from "@/lib/boxView";
import { faqPage } from "@/lib/schema";

type Props = { params: Promise<{ industry: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ind = getIndustry((await params).industry);
  if (!ind) return {};
  return {
    title: `${ind.name} Packaging: custom boxes and design`,
    description: ind.intro,
    alternates: { canonical: `/industries/${ind.slug}` },
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
  const study = caseStudies.find((c) => c.slug === industryCase[ind.slug]) ?? caseStudies[0]!;
  const faqs = [...ind.faqs, ...industrySharedFaqs].slice(0, 5);
  const finishes = industryFinishes[ind.slug] ?? [];

  return (
    <>
      <JsonLd data={faqPage(faqs)} />
      <PageHero
        crumbs={[{ label: "Industries", href: "/industries" }, { label: ind.name }]}
        eyebrow="Industry"
        title={`${ind.name} packaging`}
        highlight="packaging"
        intro={<p>{ind.intro}</p>}
        slotId={`industry-${ind.slug}-hero`}
        actions={
          <>
            <Button href={`${quoteHref}?industry=${ind.slug}`} size="lg" arrow>
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
            <Tag tone="orange" className="mt-4">
              To verify
            </Tag>
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
            <SectionHeader eyebrow="Finishes" title="Finishes that work" highlight="work" lead="Popular combinations for this category. Every finish is shown on your sample." />
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
          <div className="lg:col-span-6">
            <p className="text-eyebrow text-blue-600">Case study</p>
            <div className="mt-4">
              <CaseCard href={`/work/${study.slug}`} title={study.client} text={study.summary} slot={study.coverSlot} industry={study.industry} placeholder={study.placeholder} />
            </div>
          </div>
        </div>
      </Section>

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

      <Section className="!pt-0">
        <CTABand
          title={`Launching in ${ind.name.toLowerCase()}?`}
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
