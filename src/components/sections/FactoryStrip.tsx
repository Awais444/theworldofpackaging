import { factorySteps } from "@/content/media";
import { SiteImage } from "@/components/media/SiteImage";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** Cut → wrap → corners → insert → QC. A real sequence, so steps are numbered. */
export function FactoryStrip({ title = "From our factory floor." }: { title?: string }) {
  return (
    <section className="tone-board">
      <div className="container-x py-20 md:py-28">
        <SectionHeader spec={["In-house production", `${factorySteps.length} stages`]} title={title} />
        <ol className="-mx-4 mt-14 flex snap-x gap-4 overflow-x-auto px-4 pb-4 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
          {factorySteps.map((step, i) => (
            <li key={step.id} className="w-[70vw] shrink-0 snap-start sm:w-[42vw] lg:w-auto">
              <SiteImage slotId={step.id} sizes="(min-width: 1024px) 18vw, 70vw" cropMarks={false} />
              <p className="mt-4 flex items-baseline gap-3">
                <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="type-display text-display-sm">{step.label}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
