import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { getPrintedStyle, printedStyles } from "@/content/printedStyles";
import { BoxStylePage } from "@/components/boxes/BoxStylePage";
import { printedView } from "@/lib/boxView";

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
    description: `${style.summary} Designed, printed and cut in-house by ${site.name}.`,
    alternates: { canonical: `/printed-boxes/${style.slug}` },
  };
}

export default async function PrintedStylePage({ params }: Props) {
  const style = getPrintedStyle((await params).style);
  if (!style) notFound();
  return <BoxStylePage box={printedView(style)} />;
}
