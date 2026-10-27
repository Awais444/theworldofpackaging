import type { Metadata } from "next";
import { site } from "@/config/site.config";
import { processSteps } from "@/content/process";
import { ProjectCta } from "@/components/sections/AgencyBlocks";
import { PageHero } from "@/components/sections/PageHero";
import { FaqList } from "@/components/sections/StyleDetailBlocks";
import { SpecLabel } from "@/components/ui/SpecLabel";

export const metadata: Metadata = {
  title: "Process: discover to ship",
  description: "How a project runs at our studio and factory: discover, brand, package, prototype and sample, manufacture, ship.",
  alternates: { canonical: "/process" },
};

// What each side does at every step. Durations are agreed per project.
const detail: Record<string, { you: string; us: string }> = {
  Discover: { you: "Share the product, audience, deadline and budget.", us: "Write the brief back, ask the awkward questions, propose a scope." },
  Brand: { you: "Review directions and choose one.", us: `First concepts usually within ${site.facts.firstConceptHours} hours, then refine one route.` },
  Package: { you: "Send product samples or exact dimensions.", us: "Choose structure and board, draw the dieline, place artwork." },
  "Prototype & sample": { you: "Hold the sample, test it with the product, sign off.", us: "Make the sample on the production line." },
  Manufacture: { you: "Approve the final proof.", us: "Print, cut, wrap, finish and check every stage." },
  Ship: { you: "Confirm delivery address and freight method.", us: "Pack, book freight and send documents." },
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Process" }]}
        spec={["Process", `${processSteps.length} steps`]}
        title="Discover to delivery."
        intro={<p>One team runs the whole sequence, so nothing gets lost between the designer, the printer and the box maker.</p>}
      />
      <section className="container-x pb-20 md:pb-28">
        <ol className="border-t border-line">
          {processSteps.map((s, i) => {
            const d = detail[s.title];
            return (
              <li key={s.title} className="grid-editorial gap-y-4 border-b border-line py-10 md:py-14">
                <div className="col-span-4 md:col-span-4">
                  <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="type-display mt-2 text-display-md">{s.title}</h2>
                  <SpecLabel items={[s.spec]} as="p" className="mt-2" />
                </div>
                <p className="col-span-4 text-lg md:col-span-4">{s.body}</p>
                {d && (
                  <dl className="col-span-4 space-y-3 text-sm md:col-span-3 md:col-start-10">
                    <div>
                      <dt className="spec text-muted">You</dt>
                      <dd className="mt-1">{d.you}</dd>
                    </div>
                    <div>
                      <dt className="spec text-muted">Us</dt>
                      <dd className="mt-1">{d.us}</dd>
                    </div>
                  </dl>
                )}
              </li>
            );
          })}
        </ol>
      </section>
      <FaqList
        faqs={[
          { q: "How long does a full project take?", a: "It depends on scope and quantity. We give you a dated timeline with the proposal." }, // TODO: typical durations
          { q: "Can I skip steps?", a: "Yes. If your brand is set, start at packaging. If your artwork is ready, start at sample." },
        ]}
      />
      <ProjectCta title="Start at step one." body="Brief us and we will map your project onto these steps with dates." />
    </>
  );
}
