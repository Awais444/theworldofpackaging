import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPrintedStyle, printedStyles } from "@/content/printedStyles";
import { BoxStylePage } from "@/components/boxes/BoxStylePage";
import { printedView } from "@/lib/boxView";

/** Meta descriptions stay within 155 characters (SEO plan on-page rules). */
const clamp = (d: string) => (d.length > 155 ? `${d.slice(0, 152).replace(/\s+\S*$/, "")}...` : d);

type Props = { params: Promise<{ style: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return printedStyles.map((s) => ({ style: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const style = getPrintedStyle((await params).style);
  if (!style) return {};
  return {
    title: `Custom Printed ${style.name}`,
    description: clamp(`${style.summary} Designed, printed and cut in our own factory.`),
    alternates: { canonical: `/printed-boxes/${style.slug}` },
  };
}

export default async function PrintedStylePage({ params }: Props) {
  const style = getPrintedStyle((await params).style);
  if (!style) notFound();
  return <BoxStylePage box={printedView(style)} />;
}
