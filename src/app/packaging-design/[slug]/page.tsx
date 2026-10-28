import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { designHref, designServices, getDesignService } from "@/content/designServices";
import { DesignServicePage } from "@/components/design/DesignServicePage";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return designServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getDesignService((await params).slug);
  if (!s) return {};
  return {
    title: s.name,
    description: `${s.short} ${s.intro.split(". ")[0]}.`.slice(0, 160),
    alternates: { canonical: designHref(s.slug) },
  };
}

export default async function DesignServiceRoute({ params }: Props) {
  const s = getDesignService((await params).slug);
  if (!s) notFound();
  return <DesignServicePage s={s} />;
}
