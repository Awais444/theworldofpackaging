import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { getRigidStyle, rigidStyles } from "@/content/rigidStyles";
import { BoxStylePage } from "@/components/boxes/BoxStylePage";
import { rigidView } from "@/lib/boxView";

type Props = { params: Promise<{ style: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return rigidStyles.map((s) => ({ style: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const style = getRigidStyle((await params).style);
  if (!style) return {};
  return {
    title: `${style.name}: custom rigid boxes, MOQ ${style.moq}`,
    description: `${style.summary} Made in-house by ${site.name}, shipped worldwide.`,
    alternates: { canonical: `/rigid-boxes/${style.slug}` },
  };
}

export default async function RigidStylePage({ params }: Props) {
  const style = getRigidStyle((await params).style);
  if (!style) notFound();
  return <BoxStylePage box={rigidView(style)} />;
}
