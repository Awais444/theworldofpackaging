import type { Metadata } from "next";
import { faqGroups } from "@/content/faqs";
import { ProjectCta } from "@/components/sections/AgencyBlocks";
import { PageHero } from "@/components/sections/PageHero";
import { FaqList } from "@/components/sections/StyleDetailBlocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers on rigid and printed boxes, minimum orders, samples, design, shipping and ordering.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPage(faqGroups.flatMap((g) => g.faqs))} />
      <PageHero
        crumbs={[{ label: "FAQ" }]}
        spec={["FAQ", `${faqGroups.reduce((n, g) => n + g.faqs.length, 0)} answers`]}
        title="Questions, answered."
        intro={<p>The things clients ask before their first order. Missing one? Ask us directly.</p>}
      />
      <nav aria-label="FAQ sections" className="container-x">
        <ul className="flex flex-wrap gap-2 border-y border-line py-4">
          {faqGroups.map((g) => (
            <li key={g.id}>
              <a href={`#${g.id}`} className="spec inline-flex h-9 items-center border border-line-strong px-3 hover:bg-fg hover:text-surface">
                {g.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {faqGroups.map((g) => (
        <div key={g.id} id={g.id}>
          <FaqList faqs={g.faqs} title={g.title} schema={false} />
        </div>
      ))}
      <ProjectCta title="Still wondering?" body="Send the question with your brief and we will answer both." />
    </>
  );
}
