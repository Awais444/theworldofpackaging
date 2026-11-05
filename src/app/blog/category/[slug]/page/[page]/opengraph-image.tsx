import { blogCategories, getBlogCategory } from "@/content/blog/categories";
import { pageCount } from "@/components/blog/CategoryPage";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Packaging guides by category";
export const size = ogSize;
export const contentType = ogContentType;
export const generateStaticParams = () =>
  blogCategories.flatMap((c) => Array.from({ length: pageCount(c.id) - 1 }, (_, i) => ({ slug: c.id, page: String(i + 2) })));

export default async function Image({ params }: { params: Promise<{ slug: string; page: string }> }) {
  const { slug, page } = await params;
  const c = getBlogCategory(slug);
  return renderOg({ eyebrow: `Packaging guides · page ${page}`, title: c ? `${c.name} guides` : "Packaging guides", tone: "paper" });
}
