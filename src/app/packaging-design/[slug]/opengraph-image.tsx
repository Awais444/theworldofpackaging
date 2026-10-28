import { getDesignService } from "@/content/designServices";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

// Pre-render one image per page, same params as the page itself.
export { generateStaticParams } from "./page";

export const alt = "Packaging design service";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const s = getDesignService((await params).slug);
  return renderOg({ eyebrow: "Packaging design", title: s?.name ?? "Packaging design" });
}
