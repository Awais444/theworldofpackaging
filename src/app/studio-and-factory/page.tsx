import type { Metadata } from "next";
import { site } from "@/config/site.config";
import { machines, qcChecklist, sustainability, team } from "@/content/company";
import { ProjectCta } from "@/components/sections/AgencyBlocks";
import { FactoryStrip } from "@/components/sections/FactoryStrip";
import { FactStrip } from "@/components/sections/FactStrip";
import { PageHero } from "@/components/sections/PageHero";
import { SiteImage } from "@/components/media/SiteImage";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Studio & Factory",
  description: `${site.name}: a packaging design studio and a rigid box factory under one roof in ${site.country}.`,
  alternates: { canonical: "/studio-and-factory" },
};

export default function StudioFactoryPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Studio & Factory" }]}
        spec={["About", "Studio", "Factory", site.country]}
        title="A studio with a factory attached."
        intro={
          <p>
            We started as packaging designers who were tired of handing files to printers and hoping. So we built the
            factory: presses, cutters and wrapping lines in the same building as the design desks.
          </p>
        }
        actions={
          <Button href="/start-a-project" size="lg" arrow>
            Start a Project
          </Button>
        }
        slotId="factory-press"
      />

      <FactStrip
        items={[
          { label: "Rigid MOQ", value: String(site.facts.rigidMoq) },
          { label: "Capacity", value: "Confirmed per order" /* TODO: real monthly capacity */ },
          { label: "Ships to", value: site.markets.join(" / ") },
          { label: "Based in", value: site.country },
        ]}
      />

      <section className="container-x py-20 md:py-28">
        <div className="grid-editorial gap-y-10">
          <div className="col-span-4 md:col-span-5">
            <SectionHeader spec={["Studio"]} title="The people at the desks." className="!block" />
          </div>
          <div className="col-span-4 space-y-5 text-lg md:col-span-6 md:col-start-7">
            {/* TODO: replace with the real studio story. */}
            <p>
              The studio covers strategy, naming, identity and packaging design. Designers work from real dielines and
              real stock, and walk the floor to see their work printed.
            </p>
            <p className="text-muted">
              Placeholder: add the founding story, the year the studio and factory opened, and the work you are proud of.
            </p>
          </div>
        </div>
        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <li key={`${m.role}-${i}`} className="border-t border-line pt-5">
              <div className="flex aspect-[3/4] items-end bg-surface-2 p-4">
                <span className="spec text-muted">Portrait · {m.placeholder ? "placeholder" : m.name}</span>
              </div>
              <p className="mt-4 font-medium">{m.name}</p>
              <p className="spec mt-1 text-muted">{m.role}</p>
              <p className="mt-3 text-sm text-muted">{m.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <FactoryStrip title="How a rigid box gets made." />

      <section className="container-x py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeader spec={["Factory floor"]} title="Machines." className="!block" />
            <ul className="mt-10 border-t border-line">
              {machines.map((m) => (
                <li key={m.type} className="grid gap-1 border-b border-dashed border-line py-4 sm:grid-cols-2">
                  <span className="font-medium">{m.type}</span>
                  <span className="text-muted">{m.use}</span>
                </li>
              ))}
            </ul>
            <p className="spec mt-4 text-muted">Machine models and formats to be listed</p>
          </div>
          <div>
            <SectionHeader spec={["Quality control"]} title="Checked at every stage." className="!block" />
            <ol className="mt-10 space-y-3">
              {qcChecklist.map((c, i) => (
                <li key={c} className="flex gap-4 border-b border-dashed border-line pb-3">
                  <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {c}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="tone-kraft">
        <div className="container-x grid-editorial gap-y-12 py-20 md:py-28">
          <div className="col-span-4 md:col-span-5">
            <SectionHeader spec={["Sustainability", "To be verified"]} title="Materials, honestly." className="!block" />
            <div className="mt-8">
              <SiteImage slotId="collapsible-flat" sizes="(min-width: 768px) 40vw, 100vw" cropMarks={false} />
            </div>
          </div>
          <ul className="col-span-4 space-y-8 md:col-span-6 md:col-start-7">
            {sustainability.map((s) => (
              <li key={s.title} className="border-t border-line pt-5">
                <h3 className="type-display text-display-sm">{s.title}</h3>
                <p className="mt-2">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProjectCta title="Come and see it." body="Visits to the studio and factory can be arranged for clients. Ask when you brief us." />
    </>
  );
}
