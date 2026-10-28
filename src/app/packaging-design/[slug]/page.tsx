import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { designHref, designServices, getDesignService } from "@/content/designServices";
import { DesignServicePage } from "@/components/design/DesignServicePage";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

/** Titles for long service names, so "{title} | The World of Packaging" stays within 60 characters. */
const shortTitles: Record<string, string> = {
  "bakery-confectionery-packaging-design": "Bakery & Confectionery Packaging",
  "soap-bath-packaging-design": "Soap & Bath Packaging Design",
  "household-cleaning-packaging-design": "Cleaning Product Packaging Design",
  "packaging-range-design": "Packaging Range Design",
};

export function generateStaticParams() {
  return designServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getDesignService((await params).slug);
  if (!s) return {};
  return {
    title: s.seo?.title ?? shortTitles[s.slug] ?? s.name,
    description: s.seo?.description ?? `${s.short} ${s.intro.split(". ")[0]}.`.slice(0, 160),
    alternates: { canonical: designHref(s.slug) },
  };
}

export default async function DesignServiceRoute({ params }: Props) {
  const s = getDesignService((await params).slug);
  if (!s) notFound();
  return <DesignServicePage s={s} />;
}
