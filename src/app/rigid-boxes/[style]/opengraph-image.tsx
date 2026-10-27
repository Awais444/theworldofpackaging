import { getRigidStyle } from "@/content/rigidStyles";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

// Pre-render one image per page, same params as the page itself.
export { generateStaticParams } from "./page";

export const alt = "Page preview";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ style: string }> }) {
  const { style } = await params;
  const s = getRigidStyle(style);
  return renderOg({ eyebrow: `Rigid box / MOQ ${s?.moq ?? ""}`, title: s?.name ?? "Rigid box", tone: "board" });
}
