import { getCaseStudy } from "@/content/caseStudies";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

// Pre-render one image per page, same params as the page itself.
export { generateStaticParams } from "./page";

export const alt = "Page preview";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getCaseStudy(slug);
  return renderOg({ eyebrow: `Case study / ${s?.industry ?? ""}`, title: s?.client ?? "Case study", tone: "paper" });
}
