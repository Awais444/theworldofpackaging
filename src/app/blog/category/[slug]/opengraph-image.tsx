import { blogCategories, getBlogCategory } from "@/content/blog/categories";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Packaging guides by category";
export const size = ogSize;
export const contentType = ogContentType;
export const generateStaticParams = () => blogCategories.map((c) => ({ slug: c.id }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const c = getBlogCategory((await params).slug);
  return renderOg({ eyebrow: "Packaging guides", title: c ? `${c.name} guides` : "Packaging guides", tone: "paper" });
}
