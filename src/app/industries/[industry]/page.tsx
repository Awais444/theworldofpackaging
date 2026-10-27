import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { agencyServices, hubs } from "@/content/agencyServices";
import { getIndustry, industries } from "@/content/industries";
import { printedStyles } from "@/content/printedStyles";
import { rigidCommonFaqs, rigidStyles } from "@/content/rigidStyles";
import { ProjectCta, RelatedWork } from "@/components/sections/AgencyBlocks";
import { PageHero } from "@/components/sections/PageHero";
import { FaqList } from "@/components/sections/StyleDetailBlocks";
import { StyleGrid, type StyleCardData } from "@/components/sections/StyleGrid";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Link from "next/link";

type Props = { params: Promise<{ industry: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ind = getIndustry((await params).industry);
  if (!ind) return {};
  return {
    title: `${ind.name} Packaging: boxes, labels and branding`,
    description: ind.intro,
    alternates: { canonical: `/industries/${ind.slug}` },
  };
}

export default async function IndustryPage({ params }: Props) {
  const ind = getIndustry((await params).industry);
  if (!ind) notFound();

  const cards: StyleCardData[] = [
    ...ind.rigid.flatMap((slug) => {
      const s = rigidStyles.find((r) => r.slug === slug);
      return s ? [{ href: `/rigid-boxes/${s.slug}`, name: s.name, summary: s.summary, slotId: s.mediaSlots[0]!, spec: ["Rigid", s.short] }] : [];
    }),
    ...ind.printed.flatMap((slug) => {
      const s = printedStyles.find((p) => p.slug === slug);
      return s ? [{ href: `/printed-boxes/${s.slug}`, name: s.name, summary: s.summary, slotId: s.mediaSlots[0]!, spec: ["Printed", s.short] }] : [];
    }),
  ].slice(0, 6);
  const services = ind.services.flatMap((slug) => agencyServices.filter((s) => s.slug === slug));

  return (
    <>
      <PageHero
        crumbs={[{ label: "Industries", href: "/industries" }, { label: ind.name }]}
        spec={["Industry", ind.name]}
        title={`${ind.name} packaging.`}
        intro={<p>{ind.intro}</p>}
        actions={
          <>
            <Button href="/start-a-project" size="lg" arrow>
              Start a Project
            </Button>
            <Button href="/quote" variant="secondary" size="lg">
              Get a quote
            </Button>
          </>
        }
        slotId={`industry-${ind.slug}-hero`}
      />

      <section className="container-x py-20 md:py-28">
        <SectionHeader spec={["Challenges"]} title={`What ${ind.name.toLowerCase()} packaging has to solve.`} />
        <div className="mt-12 grid border-t border-line md:grid-cols-3">
          {ind.challenges.map((c, i) => (
            <div key={c.title} className={i > 0 ? "border-t border-line py-8 md:border-t-0 md:border-l md:pl-8" : "py-8 md:pr-8"}>
              <h3 className="type-display text-display-sm">{c.title}</h3>
              <p className="mt-3 text-muted">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {cards.length > 0 && (
        <section className="container-x pb-20 md:pb-28">
          <SectionHeader spec={["Recommended styles"]} title="Boxes that suit the category." />
          <div className="mt-14">
            <StyleGrid items={cards} />
          </div>
        </section>
      )}

      <section className="container-x pb-20 md:pb-28">
        <SectionHeader spec={["Services"]} title="Where the studio helps." />
        <ul className="mt-12 border-t border-line">
          {services.map((s) => (
            <li key={s.slug} className="border-b border-line">
              <Link href={`${hubs[s.hub].href}/${s.slug}`} className="group flex flex-wrap items-baseline justify-between gap-4 py-6">
                <span className="type-display text-display-sm transition-transform duration-300 group-hover:translate-x-2">{s.name}</span>
                <span className="text-muted">{s.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <RelatedWork />

      <section className="container-x pb-8">
        <div className="border border-dashed border-line-strong p-6 md:p-8">
          <p className="spec text-accent">Compliance notes · to be reviewed</p>
          <p className="measure mt-3 text-muted">{ind.compliance}</p>
        </div>
      </section>

      <FaqList faqs={[...ind.faqs, ...rigidCommonFaqs.slice(0, 2)]} />
      <ProjectCta title={`Launching in ${ind.name.toLowerCase()}?`} body="Tell us about the product. We reply with box suggestions, a scope and a timeline." />
    </>
  );
}
