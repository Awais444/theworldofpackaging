import type { Metadata } from "next";
import { site } from "@/config/site.config";
import { packages } from "@/content/packages";
import { priceFromLabel, ProjectCta } from "@/components/sections/AgencyBlocks";
import { PageHero } from "@/components/sections/PageHero";
import { FaqList } from "@/components/sections/StyleDetailBlocks";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Packages: design + manufacturing bundles",
  description: `Fixed-scope bundles that combine branding, packaging design and rigid box production. From ${site.facts.rigidMoq} boxes.`,
  alternates: { canonical: "/packages" },
};

// Every line item any package includes, in a stable order, for the comparison table.
const allItems = Array.from(new Set(packages.flatMap((p) => p.includes)));

export default function PackagesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Packages" }]}
        spec={["Packages", "Design + manufacturing"]}
        title="Design and boxes, one scope."
        intro={
          <p>
            Three bundles for the most common starting points. Each one runs through our studio and factory without a
            hand-off, and each one ends with boxes, not just files.
          </p>
        }
        actions={
          <Button href="/start-a-project" size="lg" arrow>
            Start a Project
          </Button>
        }
        slotId="mega-menu-feature"
      />

      <section className="container-x py-20 md:py-28">
        <div className="grid border-y border-line lg:grid-cols-3">
          {packages.map((p, i) => (
            <article
              key={p.slug}
              id={p.slug}
              className={cn(
                "flex scroll-mt-24 flex-col py-10 lg:px-8",
                i > 0 && "border-t border-line lg:border-t-0 lg:border-l",
                i === 0 && "lg:pl-0",
                p.featured && "tone-kraft px-6 lg:px-8",
              )}
            >
              <p className="spec text-muted">{p.featured ? "Most chosen" : "Package"}</p>
              <h2 className="type-display mt-3 text-display-lg">{p.name}</h2>
              <p className="mt-3 text-lg">{p.forWho}</p>
              <ul className="mt-8 space-y-2">
                {p.includes.map((item) => (
                  <li key={item} className="flex gap-3 before:mt-[0.75em] before:h-px before:w-3 before:shrink-0 before:bg-line-strong">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <p className="font-mono">{priceFromLabel(p.priceFrom)}</p>
                <Button href={`/start-a-project?package=${p.slug}`} className="mt-5" arrow>
                  Choose {p.name}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-x pb-20 md:pb-28">
        <SectionHeader spec={["Compare"]} title="Side by side." />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <caption className="sr-only">What each package includes</caption>
            <thead>
              <tr className="border-b border-line-strong">
                <th scope="col" className="spec py-3 font-medium text-muted">Included</th>
                {packages.map((p) => (
                  <th key={p.slug} scope="col" className="spec py-3 text-center font-medium">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allItems.map((item) => (
                <tr key={item} className="border-b border-dashed border-line">
                  <th scope="row" className="py-3 pr-4 font-normal">{item}</th>
                  {packages.map((p) => (
                    <td key={p.slug} className="py-3 text-center font-mono">
                      {p.includes.includes(item) ? <span aria-label="Included">●</span> : <span aria-label="Not included" className="text-muted">–</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <FaqList
        faqs={[
          { q: "Can I change what is in a package?", a: "Yes. Packages are starting points; we adjust quantities, box style or design scope and requote." },
          { q: "What is not included?", a: "Shipping, import duties and product photography are quoted separately unless stated in your proposal." },
          { q: "Can I order more than 500 boxes?", a: "Of course. Unit price drops at higher quantities; see pricing or ask for a quote." },
        ]}
      />
      <ProjectCta title="Not sure which fits?" body="Tell us what you are launching and we will recommend a package, or a custom scope." />
    </>
  );
}
