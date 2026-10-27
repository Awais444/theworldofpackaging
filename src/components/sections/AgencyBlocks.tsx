import Link from "next/link";
import { site } from "@/config/site.config";
import type { AgencyService } from "@/content/agencyServices";
import { caseStudies, type WorkCategory } from "@/content/caseStudies";
import { Button } from "@/components/ui/Button";
import { ColorBar } from "@/components/ui/ColorBar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkCard } from "./SelectedWork";

export function priceFromLabel(price: number | null) {
  return price === null ? "Quoted per project" : `From $${price.toLocaleString("en-US")}`;
}

/** Numbered steps for one service (a real sequence). */
export function ServiceProcess({ steps, title = "How it runs." }: { steps: { title: string; body: string }[]; title?: string }) {
  return (
    <section className="container-x py-20 md:py-28">
      <SectionHeader spec={["Process", `${steps.length} steps`]} title={title} />
      <ol className="mt-14 grid gap-x-6 gap-y-10 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title}>
            <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="type-display mt-3 text-display-sm">{s.title}</h3>
            <p className="mt-3 text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Up to two case studies in a category. Renders nothing if there are none. */
export function RelatedWork({ category, exclude }: { category?: WorkCategory; exclude?: string }) {
  const list = caseStudies.filter((c) => (!category || c.categories.includes(category)) && c.slug !== exclude).slice(0, 2);
  if (list.length === 0) return null;
  return (
    <section className="container-x py-20 md:py-28">
      <SectionHeader
        spec={["Related work"]}
        title="Where we have done this."
        aside={
          <Button href="/work" variant="link" arrow>
            All projects
          </Button>
        }
      />
      <div className="grid-editorial mt-14 gap-y-16">
        {list.map((c, i) => (
          <WorkCard key={c.slug} study={c} className={i === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-24"} />
        ))}
      </div>
    </section>
  );
}

/** Service rows linking to each service page. */
export function ServiceList({ services, base }: { services: AgencyService[]; base: string }) {
  return (
    <ul className="border-t border-line">
      {services.map((s) => (
        <li key={s.slug} className="border-b border-line">
          <Link href={`${base}/${s.slug}`} className="group grid-editorial items-baseline gap-y-3 py-8">
            <span className="type-display col-span-4 text-display-md transition-transform duration-300 ease-[var(--ease-press)] group-hover:translate-x-2 md:col-span-5">
              {s.name}
            </span>
            <span className="col-span-4 text-muted md:col-span-5">{s.summary}</span>
            <span className="spec col-span-4 text-muted md:col-span-2 md:text-right">{priceFromLabel(s.priceFrom)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Closing call to action for agency pages. */
export function ProjectCta({ title, body }: { title: string; body: string }) {
  return (
    <section className="tone-ink">
      <div className="container-x py-20 md:py-28">
        <ColorBar className="mb-12" />
        <div className="grid-editorial items-end gap-y-8">
          <div className="col-span-4 md:col-span-7">
            <p className="type-display text-display-lg">{title}</p>
            <p className="measure mt-5 text-lg text-muted">{body}</p>
          </div>
          <div className="col-span-4 flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <Button href="/start-a-project" size="lg" arrow>
              Start a Project
            </Button>
            <Button href="/packages" variant="secondary" size="lg">
              See packages
            </Button>
          </div>
        </div>
        <p className="spec mt-10 text-muted">First concepts usually within {site.facts.firstConceptHours} hours of the brief</p>
      </div>
    </section>
  );
}
