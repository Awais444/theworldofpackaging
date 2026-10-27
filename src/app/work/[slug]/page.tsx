import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/content/caseStudies";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteImage } from "@/components/media/SiteImage";
import { ProjectCta } from "@/components/sections/AgencyBlocks";
import { RevealText } from "@/components/ui/RevealText";
import { SpecLabel } from "@/components/ui/SpecLabel";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return {
    title: `${study.client}: ${study.services.join(", ")}`,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    // Sample projects stay out of search until replaced with real work.
    robots: study.placeholder ? { index: false } : undefined,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length]!;

  const meta = [
    { label: "Client", value: study.client },
    { label: "Industry", value: study.industry },
    { label: "Services", value: study.services.join(", ") },
    { label: "Year", value: String(study.year) },
  ];

  return (
    <article>
      <header className="container-x pt-8">
        <Breadcrumbs items={[{ label: "Work", href: "/work" }, { label: study.client }]} />
        <div className="mt-12 md:mt-16">
          {study.placeholder && <p className="spec mb-5 inline-block bg-yellow px-2 py-1 text-ink">Sample project</p>}
          <RevealText as="h1" text={study.client} className="type-display text-display-2xl" />
          <p className="measure mt-6 text-xl">{study.summary}</p>
        </div>
        <SiteImage slotId={study.coverSlot} priority className="mt-14" sizes="100vw" />
        <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 md:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="spec text-muted">{m.label}</dt>
              <dd className="mt-1 font-mono text-sm uppercase tracking-wider">{m.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="container-x py-20 md:py-28">
        {study.sections.map((s) => (
          <section key={s.heading} className="grid-editorial gap-y-6 border-t border-line py-12 md:py-16">
            <h2 className="type-display col-span-4 text-display-md md:col-span-4">{s.heading}</h2>
            <p className="measure col-span-4 text-lg md:col-span-7 md:col-start-6">{s.body}</p>
            {s.mediaSlot && <SiteImage slotId={s.mediaSlot} className="col-span-4 mt-8 md:col-span-12" sizes="100vw" />}
          </section>
        ))}
        <SpecLabel items={study.spec} as="p" className="border-t border-line pt-6" />
      </div>

      <Link href={`/work/${next.slug}`} className="group block border-t border-line">
        <div className="container-x py-16 md:py-24">
          <p className="spec text-muted">Next project</p>
          <p className="type-display mt-4 text-display-xl transition-colors group-hover:text-accent">{next.client} →</p>
          <p className="mt-3 text-muted">{next.summary}</p>
        </div>
      </Link>

      <ProjectCta title="Start yours." body="Brand, packaging and production from one team. Tell us what you are launching." />
    </article>
  );
}
