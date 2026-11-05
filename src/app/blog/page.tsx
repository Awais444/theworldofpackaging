import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { collectionPage } from "@/lib/schema";
import { metaDescription, ogFor } from "@/lib/seo";
import { blogCategories, categoryHref, type BlogCategoryId } from "@/content/blog/categories";
import { posts } from "@/content/blog/posts";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { CategoryBar } from "@/components/blog/CategoryBar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/ui/Layout";
import { withHighlight } from "@/components/ui/withHighlight";
import { cn } from "@/lib/utils";

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
// Posts in the featured block are left out of the category rows below, so nothing shows twice on the page.
const featuredSlugs = new Set(featured.map((p) => p.slug));
const postCount = (id: BlogCategoryId) => posts.filter((p) => p.category === id).length;

/** Fills a short category row: links to the three largest other categories. */
function MoreGuides({ current }: { current: BlogCategoryId }) {
  const others = blogCategories.filter((c) => c.id !== current).sort((a, b) => postCount(b.id) - postCount(a.id)).slice(0, 3);
  return (
    <div className="flex h-full flex-col rounded-2xl border border-silver-300 bg-silver-50 p-6">
      <p className="font-heading text-lg font-bold">More guides</p>
      <p className="mt-1 text-[15px] text-ink-500">Related topics with more to read.</p>
      <ul className="mt-5 space-y-2">
        {others.map((c) => (
          <li key={c.id}>
            <Link href={categoryHref(c.id)} className="group flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 font-semibold text-ink-900 transition hover:text-blue-600 focus-visible:outline-none focus-visible:shadow-[var(--ring)]">
              <span className="flex items-center gap-2.5">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                {c.name}
              </span>
              <span className="flex items-center gap-1 text-sm text-ink-500">
                {postCount(c.id)}
                <ArrowRight aria-hidden="true" className="h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

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

      {/* One row per category: the 3 newest posts not already featured above, "View all" to the category page.
          Rows with fewer than 3 posts end with a "More guides" card, so no slot is empty. Swipe row on mobile. */}
      {blogCategories.map((c) => {
        const inCat = newest.filter((p) => p.category === c.id);
        const rowPosts = inCat.filter((p) => !featuredSlugs.has(p.slug)).slice(0, 3);
        if (!rowPosts.length) return null;
        const more = rowPosts.length < 3;
        const cols = rowPosts.length + (more ? 1 : 0);
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
            <ul className={cn("-mx-4 mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 [scrollbar-width:thin] md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0", cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2")}>
              {rowPosts.map((p) => (
                <li key={p.slug} className="w-[82%] shrink-0 snap-start md:w-auto">
                  <BlogCard post={p} />
                </li>
              ))}
              {more && (
                <li className="w-[82%] shrink-0 snap-start md:w-auto">
                  <MoreGuides current={c.id} />
                </li>
              )}
            </ul>
          </Section>
        );
      })}
    </>
  );
}
