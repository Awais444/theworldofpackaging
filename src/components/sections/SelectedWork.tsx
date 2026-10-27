import Link from "next/link";
import { caseStudies, type CaseStudy } from "@/content/caseStudies";
import { DIELINE_CUT, DIELINE_FOLDS } from "@/components/illustrations/DielineFlat";
import { SiteImage } from "@/components/media/SiteImage";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";

// Asymmetric placement: [column classes, vertical offset]. Cycles if more projects are added.
const LAYOUT = [
  "md:col-span-10 lg:col-span-7",
  "md:col-span-10 md:col-start-3 lg:col-span-5 lg:col-start-auto lg:mt-40",
  "md:col-span-10 lg:col-span-5 lg:col-start-2",
  "md:col-span-10 md:col-start-3 lg:col-span-5 lg:col-start-8 lg:-mt-24",
];

/** Dieline drawn over the image on hover: the cut line traces itself, folds fade in. */
function DielineOverlay() {
  return (
    <svg
      viewBox="0 0 480 360"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full p-[8%] text-fg opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      <path
        d={DIELINE_CUT}
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeDasharray="1"
        className="[stroke-dashoffset:1] transition-[stroke-dashoffset] duration-[1100ms] ease-[var(--ease-press)] group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0]"
      />
      {DIELINE_FOLDS.map((d) => (
        <path key={d} d={d} fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" opacity="0.7" />
      ))}
    </svg>
  );
}

export function WorkCard({ study, className }: { study: CaseStudy; className?: string }) {
  return (
    <article className={cn("col-span-4", className)}>
      <Link href={`/work/${study.slug}`} className="group block">
        <div className="relative">
          <SiteImage slotId={study.coverSlot} sizes="(min-width: 768px) 50vw, 100vw" />
          {/* Veil + dieline so the overlay reads on photos too. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-surface/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          />
          <DielineOverlay />
          <ul className="absolute bottom-4 left-4 flex flex-wrap gap-2 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100 md:translate-y-2">
            {study.categories.map((c) => (
              <li key={c}>
                <Tag className="bg-surface">{c}</Tag>
              </li>
            ))}
          </ul>
          {study.placeholder && (
            <span className="spec absolute right-3 top-3 bg-fg px-2 py-1 text-surface">Sample project</span>
          )}
        </div>
        <div className="mt-6">
          <SpecLabel items={[study.industry, study.year]} as="p" />
          <h3 className="type-display mt-2 text-display-sm transition-colors group-hover:text-accent">{study.client}</h3>
          <p className="measure mt-2 text-muted">{study.summary}</p>
        </div>
        <SpecLabel items={study.spec} as="p" className="mt-3" />
      </Link>
    </article>
  );
}

export function SelectedWork() {
  return (
    <section className="container-x py-24 md:py-32">
      <SectionHeader
        spec={["Selected work"]}
        title="From the first sketch to the shipped box."
        aside={
          <Button href="/work" variant="link" arrow>
            All projects
          </Button>
        }
      />
      <div className="grid-editorial mt-16 gap-y-16 md:mt-24 md:gap-y-24">
        {caseStudies.slice(0, 4).map((study, i) => (
          <WorkCard key={study.slug} study={study} className={LAYOUT[i % LAYOUT.length]} />
        ))}
      </div>
    </section>
  );
}
