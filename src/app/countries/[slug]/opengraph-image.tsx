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
  return renderOg({ eyebrow: c ? `${c.iso2} · ${c.region}` : "Countries", title: `Packaging design & custom boxes for ${c?.name ?? "your country"}` });
}
