import type { Metadata } from "next";
import { blogCategories } from "@/content/blog/categories";
import { CategoryPage, categoryMetadata } from "@/components/blog/CategoryPage";

export const dynamicParams = false;
export const generateStaticParams = () => blogCategories.map((c) => ({ slug: c.id }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return categoryMetadata((await params).slug, 1);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <CategoryPage slug={(await params).slug} page={1} />;
}
