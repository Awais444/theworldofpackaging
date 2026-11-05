import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { collectionPage } from "@/lib/schema";
import { metaDescription, ogFor } from "@/lib/seo";
import { blogCategories, categoryHref } from "@/content/blog/categories";
import { posts } from "@/content/blog/posts";
import { quoteHref } from "@/content/navigation";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { CategoryBar } from "@/components/blog/CategoryBar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { withHighlight } from "@/components/ui/withHighlight";

export const metadata: Metadata = {
  title: "Packaging guides",
  description: metaDescription("Packaging guides by topic: labelling and compliance, packaging design, materials and finishes, cost, e-commerce, printing and shipping."),
  alternates: { canonical: "/blog" }, openGraph: ogFor("/blog"),
};

const newest = [...posts].sort((a, b) => b.date.localeCompare(a.date));
// Featured block: posts flagged featured, topped up with the newest. A photo cover leads (the large card).
const featured = [...newest.filter((p) => p.featured), ...newest.filter((p) => !p.featured)]
  .slice(0, 3)
  .sort((a, b) => Number("photo" in b.cover) - Number("photo" in a.cover));
const [lead, ...side] = featured;

export default function BlogPage() {
  return (
    <>
      <JsonLd data={collectionPage({ name: "Packaging guides", description: "Packaging guides from The World of Packaging.", path: "/blog", items: posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })) })} />
      <section className="bg-white pb-8 pt-8">
        <div className="container-x">
          <Breadcrumbs items={[{ label: "Blog" }]} />
          <h1 className="text-h1 mt-8">{withHighlight("Packaging guides", "guides")}</h1>
          <p className="text-lead mt-4 max-w-2xl text-ink-500">
            Practical guides on labelling, design, materials, cost, printing and shipping, written down from the questions clients ask us most. New to the terms? Start with the{" "}
            <Link href="/glossary" className="font-semibold text-blue-600 hover:underline">
              packaging glossary
            </Link>
            .
          </p>
          <div className="mt-6">
            <BlogSearch
              posts={posts.map((p) => {
                const c = blogCategories.find((x) => x.id === p.category)!;
                return { slug: p.slug, title: p.title, description: p.description, tags: p.tags, category: c.name, color: c.color };
              })}
            />
          </div>
        </div>
      </section>
      <CategoryBar active="all" />

      {/* Featured: one large post (2/3) and two stacked smaller posts. */}
      {lead && (
        <Section className="!pb-0 !pt-12">
          <h2 className="sr-only">Featured guides</h2>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <BlogCard post={lead} large priority sizes="(min-width: 1024px) 800px, 100vw" />
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
              {side.map((p) => (
                <BlogCard key={p.slug} post={p} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* One row per category: the 3 newest posts, "View all" to the category page. Swipe row on mobile. */}
      {blogCategories.map((c) => {
        const inCat = newest.filter((p) => p.category === c.id);
        if (!inCat.length) return null;
        return (
          <Section key={c.id} className="!pb-0 !pt-16" aria-labelledby={`cat-${c.id}`}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 id={`cat-${c.id}`} className="flex items-center gap-3 font-heading text-h3 font-bold">
                  <span aria-hidden="true" className="h-3 w-3 rounded-full" style={{ background: c.color }} />
                  {c.name}
                </h2>
                <p className="mt-1 text-ink-500">{c.short}</p>
              </div>
              <Link href={categoryHref(c.id)} className="inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:underline">
                View all {inCat.length} <span className="sr-only">{c.name} guides</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <ul className="-mx-4 mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 [scrollbar-width:thin] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
              {inCat.slice(0, 3).map((p) => (
                <li key={p.slug} className="w-[82%] shrink-0 snap-start md:w-auto">
                  <BlogCard post={p} />
                </li>
              ))}
            </ul>
          </Section>
        );
      })}

      <Section className="!pt-16">
        <CTABand title="Rather we just did it?" highlight="did" text="Brief us and we handle structure, artwork and production." primary={{ href: quoteHref, label: "Get a Quote" }} />
      </Section>
    </>
  );
}
