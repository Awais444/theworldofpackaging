import * as flags from "country-flag-icons/string/3x2";
import { getCountry } from "@/content/countries";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

// One image per country, same params as the page.
export { generateStaticParams } from "./page";

export const alt = "Country page preview";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCountry(slug);
  const flagSvg = c ? (flags as Record<string, string | undefined>)[c.iso2] : undefined;
  return renderOg({ eyebrow: c ? c.region : "Countries", title: `Packaging design & custom boxes for ${c?.name ?? "your country"}`, flagSvg });
}
