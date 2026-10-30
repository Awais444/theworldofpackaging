import type { Metadata } from "next";
import { metaDescription, ogFor } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getServicePage, servicePages } from "@/content/servicePages";
import { ServiceDetail } from "@/components/services/ServiceDetail";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.path }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getServicePage((await params).slug);
  if (!s) return {};
  return { title: s.name, description: metaDescription(s.summary), alternates: { canonical: `/services/${s.path}` }, openGraph: ogFor(`/services/${s.path}`) };
}

export default async function ServicePageRoute({ params }: Props) {
  const s = getServicePage((await params).slug);
  if (!s) notFound();
  return <ServiceDetail s={s} />;
}
