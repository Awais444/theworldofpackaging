import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/content/blog/posts";
import { ProjectCta } from "@/components/sections/AgencyBlocks";
import { PageHero } from "@/components/sections/PageHero";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { illustrations } from "@/components/illustrations";

export const metadata: Metadata = {
  title: "Guides: packaging, boxes and print",
  description: "Practical guides on rigid and printed boxes, freight, and preparing print-ready packaging files.",
  alternates: { canonical: "/blog" },
};

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function BlogPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Guides" }]}
        spec={["Guides", `${posts.length} articles`]}
        title="Notes from the studio and the floor."
        intro={<p>What we explain to clients most often, written down once.</p>}
      />
      <section className="container-x pb-20 md:pb-28">
        <ul className="border-t border-line">
          {posts.map((p) => {
            const Art = illustrations[p.illustration];
            return (
              <li key={p.slug} className="border-b border-line">
                <Link href={`/blog/${p.slug}`} className="group grid-editorial items-center gap-y-6 py-10">
                  <div className="col-span-4 bg-surface-2 p-3 md:col-span-3" aria-hidden="true">
                    <Art />
                  </div>
                  <div className="col-span-4 md:col-span-8 md:col-start-5">
                    <SpecLabel items={[dateFmt.format(new Date(p.date)), `${p.readingMinutes} min`, ...p.tags]} as="p" />
                    <h2 className="type-display mt-3 text-display-md transition-colors group-hover:text-accent">{p.title}</h2>
                    <p className="mt-3 text-lg text-muted">{p.description}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      <ProjectCta title="Rather we just did it?" body="Brief us and we handle structure, artwork and production." />
    </>
  );
}
