import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, servicesByHub } from "@/content/agencyServices";
import { ServiceDetailView } from "@/components/sections/ServiceViews";

const HUB = "branding" as const;
type Props = { params: Promise<{ service: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return servicesByHub(HUB).map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService(HUB, (await params).service);
  if (!service) return {};
  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/${HUB}/${service.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const service = getService(HUB, (await params).service);
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
