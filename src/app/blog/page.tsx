import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { collectionPage } from "@/lib/schema";
import { metaDescription } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { posts } from "@/content/blog/posts";
import { quoteHref } from "@/content/navigation";
import { illustrations } from "@/components/illustrations";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { Tag } from "@/components/ui/Tag";

export const metadata: Metadata = {
  title: "Blog: packaging guides",
  description: metaDescription("Practical guides on rigid and folding carton boxes, measuring box sizes and collapsible rigid boxes."),
  alternates: { canonical: "/blog" },
};

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function BlogPage() {
  return (
    <>
      <JsonLd data={collectionPage({ name: "Packaging guides", description: "Packaging guides from The World of Packaging.", path: "/blog", items: posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })) })} />
      <PageHero
        crumbs={[{ label: "Blog" }]}
        eyebrow="Blog"
        title="Packaging guides from our studio"
        highlight="guides"
        intro={<p>What we explain to clients most often, written down once.</p>}
      />
      <Section className="!pt-0">
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => {
            const Art = illustrations[p.illustration];
            return (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col">
                  <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-blue-50 p-[8%]" aria-hidden="true">
                    <Art className={`transition-transform duration-500 group-hover:scale-[1.04] ${i === 1 ? "illo--orange" : ""}`} />
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  <h2 className="text-h4 mt-3 group-hover:text-blue-600">{p.title}</h2>
                  <p className="mt-2 text-ink-500">{p.description}</p>
                  <p className="mt-auto flex items-center justify-between pt-4 text-sm text-ink-500">
                    <span>
                      {dateFmt.format(new Date(p.date))} · {p.readingMinutes} min
                    </span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-1" />
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>
      <Section className="!pt-0">
        <CTABand
          title="Rather we just did it?"
          highlight="did"
          text="Brief us and we handle structure, artwork and production."
          actions={
            <>
              <Button href={quoteHref} variant="accent" size="lg" arrow>
                Get a Quote
              </Button>
              <Button href="/start-a-project" variant="white" size="lg">
                Start a Project
              </Button>
            </>
          }
        />
      </Section>
    </>
  );
}
