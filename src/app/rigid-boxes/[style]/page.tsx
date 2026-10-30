import type { Metadata } from "next";
import { metaDescription, ogFor } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getRigidStyle, rigidStyles } from "@/content/rigidStyles";
import { BoxStylePage } from "@/components/boxes/BoxStylePage";
import { rigidView } from "@/lib/boxView";

/** Meta descriptions stay within 155 characters (SEO plan on-page rules). */

type Props = { params: Promise<{ style: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return rigidStyles.map((s) => ({ style: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const style = getRigidStyle((await params).style);
  if (!style) return {};
  return {
    title: `Custom ${style.name}${/box$/i.test(style.name) ? "es" : "s"}`,
    description: metaDescription(`${style.summary} Made in our own factory from MOQ ${style.moq}, shipped worldwide.`),
    alternates: { canonical: `/rigid-boxes/${style.slug}` },
    openGraph: ogFor(`/rigid-boxes/${style.slug}`),
  };
}

export default async function RigidStylePage({ params }: Props) {
  const style = getRigidStyle((await params).style);
  if (!style) notFound();
  return <BoxStylePage box={rigidView(style)} />;
}
