import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudy, publicCaseStudies as caseStudies } from "@/content/caseStudies";
import { quoteHref } from "@/content/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Media } from "@/components/media/Media";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/Cards";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return {
    title: `${study.client} Packaging`,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    // Sample projects stay out of search until replaced with real work.
    robots: study.placeholder ? { index: false } : undefined,
  };
}

/** Case study (CLAUDE.md §7.5). */
export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length]!;

  const meta = [
    { label: "Client", value: study.client },
    { label: "Industry", value: study.industry },
    { label: "Services", value: study.services.join(", ") },
    ...(study.year ? [{ label: "Year", value: study.year }] : []),
  ];

  return (
    <article>
      <header className="bg-white pb-12 pt-8">
        <div className="container-x">
          <Breadcrumbs items={[{ label: "Work", href: "/work" }, { label: study.client }]} />
          <div className="mt-10 max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <Tag tone="orange">{study.industry}</Tag>
              {study.placeholder && <Tag tone="white" className="border border-silver-300">Sample project</Tag>}
            </div>
            <h1 className="text-h1 mt-4">
              {study.client}: {study.project}
            </h1>
            <p className="text-lead mt-4 text-ink-500">{study.summary}</p>
          </div>
          <Media slot={study.coverSlot} panel="blue" priority className="mt-10" sizes="(min-width: 1280px) 1240px, 100vw" />
          <dl className={`mt-8 grid grid-cols-2 gap-4 ${meta.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
            {meta.map((m) => (
              <div key={m.label} className="rounded-2xl bg-silver-50 px-5 py-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-ink-500">{m.label}</dt>
                <dd className="mt-1 font-semibold">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Challenge" title="The brief" highlight="brief" />
          </div>
          <p className="text-lead lg:col-span-8">{study.challenge}</p>
        </div>
      </Section>

      <Section bg="silver">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Solution" title="Our approach" highlight="approach" />
            <div className="mt-6 flex flex-wrap gap-2">
              {study.spec.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>
          <ol className="space-y-6 lg:col-span-8">
            {study.solution.map((s, i) => (
              <li key={i} className="flex gap-5 rounded-2xl bg-white p-6">
                <span className="font-heading text-3xl font-bold text-blue-600">0{i + 1}</span>
                <p className="text-lg">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="What we made" title="The finished packaging" highlight="finished" />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {study.made.map((m) => (
              <li key={m} className="flex gap-3 rounded-2xl border border-silver-300 p-4">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
        {study.gallery.length > 0 && (
          <div className="mt-12 grid gap-4 sm:grid-cols-2 md:gap-6">
            {study.gallery.map((slot) => (
              <Media key={slot} slot={slot} card sizes="(min-width: 640px) 50vw, 100vw" />
            ))}
          </div>
        )}
      </Section>

      <Section bg="blue-50">
        <SectionHeader eyebrow="Results" title="Results" highlight="Results" />
        {study.results.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {study.results.map((r) => (
              <StatCard key={r.label} value={r.value} label={r.label} />
            ))}
          </div>
        ) : (
          <p className="mt-6 max-w-2xl text-ink-500">Results for this project are being confirmed with the client and will be added here.</p>
        )}
      </Section>

      <Link href={`/work/${next.slug}`} className="group block border-t border-silver-300 bg-white">
        <div className="container-x flex flex-wrap items-center justify-between gap-6 py-14 md:py-20">
          <div>
            <p className="text-eyebrow text-blue-600">Next project</p>
            <p className="text-h2 mt-3 transition-colors group-hover:text-blue-600">{next.client}: {next.project}</p>
            <p className="mt-2 text-ink-500">{next.summary}</p>
          </div>
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white transition-transform group-hover:translate-x-1">
            <ArrowRight aria-hidden="true" className="h-6 w-6" />
          </span>
        </div>
      </Link>

      <Section className="!pt-0">
        <CTABand
          title="Start your project"
          highlight="project"
          text="Brand, packaging and production from one team. Tell us what you are launching."
          actions={
            <>
              <Button href="/start-a-project" variant="accent" size="lg" arrow>
                Start a Project
              </Button>
              <Button href={quoteHref} variant="white" size="lg">
                Get a Quote
              </Button>
            </>
          }
        />
      </Section>
    </article>
  );
}
