import type { Metadata } from "next";
import { blogCategories } from "@/content/blog/categories";
import { CategoryPage, categoryMetadata, pageCount } from "@/components/blog/CategoryPage";

// Page 1 lives at /blog/category/[slug]; this route serves page 2 onwards.
export const dynamicParams = false;
export const generateStaticParams = () =>
  blogCategories.flatMap((c) => Array.from({ length: pageCount(c.id) - 1 }, (_, i) => ({ slug: c.id, page: String(i + 2) })));

export async function generateMetadata({ params }: { params: Promise<{ slug: string; page: string }> }): Promise<Metadata> {
  const { slug, page } = await params;
  return categoryMetadata(slug, Number(page));
}

export default async function Page({ params }: { params: Promise<{ slug: string; page: string }> }) {
  const { slug, page } = await params;
  return <CategoryPage slug={slug} page={Number(page)} />;
}
