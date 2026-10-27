import { getServicePage } from "@/content/servicePages";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

// Pre-render one image per page, same params as the page itself.
export { generateStaticParams } from "./page";

export const alt = "Page preview";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const s = getServicePage((await params).slug);
  return renderOg({ eyebrow: "Services", title: s?.name ?? "Services", tone: "paper" });
}
