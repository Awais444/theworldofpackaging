import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { collectionPage } from "@/lib/schema";
import { metaDescription, ogFor } from "@/lib/seo";
import { BLOG_PAGE_SIZE, categoryHref, getBlogCategory, type BlogCategoryId } from "@/content/blog/categories";
import { posts } from "@/content/blog/posts";
import { quoteHref } from "@/content/navigation";
import { BlogCard } from "@/components/blog/BlogCard";
import { CategoryBar } from "@/components/blog/CategoryBar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABand } from "@/components/ui/CTABand";
import { Section } from "@/components/ui/Layout";
import { cn } from "@/lib/utils";

const postsIn = (id: string) => posts.filter((p) => p.category === id).sort((a, b) => b.date.localeCompare(a.date));
export const pageCount = (id: string) => Math.max(1, Math.ceil(postsIn(id).length / BLOG_PAGE_SIZE));

/** 3 columns, or 4 when 3 would leave one card alone on the last row (and 4 does not). */
const balancedCols = (n: number) => (n > 1 && n % 3 === 1 && n % 4 !== 1 ? 4 : 3);

/** Unique title, description and canonical per category page. */
export function categoryMetadata(slug: string, page: number): Metadata {
  const c = getBlogCategory(slug);
  if (!c) return {};
  const path = categoryHref(c.id, page);
  return {
    // Page 2+ drops "guides" so titles stay within 60 characters with the brand suffix.
    title: page > 1 ? `${c.name}, page ${page}` : `${c.name} guides`,
    description: metaDescription(page > 1 ? `Page ${page}: ${c.metaDescription}` : c.metaDescription),
    alternates: { canonical: path },
    openGraph: ogFor(path),
  };
}

/** /blog/category/[slug] and /blog/category/[slug]/page/[n]: intro, 12 posts per page, numbered pagination. */
export function CategoryPage({ slug, page }: { slug: string; page: number }) {
  const c = getBlogCategory(slug);
  if (!c) notFound();
  const all = postsIn(c.id);
  const pages = pageCount(c.id);
  if (page < 1 || page > pages) notFound();
  const shown = all.slice((page - 1) * BLOG_PAGE_SIZE, page * BLOG_PAGE_SIZE);
  const path = categoryHref(c.id, page);

  return (
    <>
      <JsonLd data={collectionPage({ name: `${c.name} guides`, description: c.metaDescription, path, items: shown.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })) })} />
      <section className="bg-white pb-8 pt-8">
        <div className="container-x">
          {/* Breadcrumbs also render the BreadcrumbList schema. */}
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: c.name, href: page > 1 ? categoryHref(c.id) : undefined }, ...(page > 1 ? [{ label: `Page ${page}` }] : [])]} />
          <p className="mt-8 flex items-center gap-2 text-eyebrow text-blue-600">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
            Packaging guides
          </p>
          <h1 className="text-h1 mt-3">
            {c.name}
            {page > 1 && <span className="text-ink-400"> · page {page}</span>}
          </h1>
          <p className="text-lead mt-4 max-w-3xl text-ink-500">{c.intro}</p>
        </div>
      </section>
      <CategoryBar active={c.id as BlogCategoryId} />
      <Section className="!pt-12">
        <p className="text-sm text-ink-500">
          {all.length} {all.length === 1 ? "guide" : "guides"}
          {pages > 1 && ` · page ${page} of ${pages}`}
        </p>
        {/* Desktop columns chosen so the last row never holds a single card (e.g. 7 posts: 4 + 3, not 3 + 3 + 1). */}
        <ul className={cn("mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2", balancedCols(shown.length) === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
          {shown.map((p, i) => (
            <li key={p.slug}>
              <BlogCard post={p} priority={i < 3} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
            </li>
          ))}
        </ul>
        {pages > 1 && (
          <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
            {page > 1 ? (
              <Link href={categoryHref(c.id, page - 1)} rel="prev" className="inline-flex h-10 items-center gap-1 rounded-full border border-silver-300 px-4 font-semibold text-blue-600 hover:border-blue-600">
                <ChevronLeft aria-hidden="true" className="h-4 w-4" /> Previous
              </Link>
            ) : null}
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <Link
                key={n}
                href={categoryHref(c.id, n)}
                aria-current={n === page ? "page" : undefined}
                aria-label={`Page ${n}`}
                className={cn("inline-flex h-10 w-10 items-center justify-center rounded-full font-semibold", n === page ? "bg-blue-600 text-white" : "border border-silver-300 text-ink-900 hover:border-blue-600")}
              >
                {n}
              </Link>
            ))}
            {page < pages ? (
              <Link href={categoryHref(c.id, page + 1)} rel="next" className="inline-flex h-10 items-center gap-1 rounded-full border border-silver-300 px-4 font-semibold text-blue-600 hover:border-blue-600">
                Next <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            ) : null}
          </nav>
        )}
      </Section>
      <Section className="!pt-0">
        <CTABand title="Rather we just did it?" highlight="did" text="Brief us and we handle structure, artwork and production." primary={{ href: quoteHref, label: "Get a Quote" }} />
      </Section>
    </>
  );
}
