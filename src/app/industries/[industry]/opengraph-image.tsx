import { getIndustry } from "@/content/industries";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

// Pre-render one image per page, same params as the page itself.
export { generateStaticParams } from "./page";

export const alt = "Page preview";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const s = getIndustry(industry);
  return renderOg({ eyebrow: "Industry", title: `${s?.name ?? ""} packaging.`, tone: "paper" });
}
