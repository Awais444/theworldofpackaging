import { getPrintedStyle } from "@/content/printedStyles";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

// Pre-render one image per page, same params as the page itself.
export { generateStaticParams } from "./page";

export const alt = "Page preview";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ style: string }> }) {
  const { style } = await params;
  const s = getPrintedStyle(style);
  return renderOg({ eyebrow: "Printed box", title: s?.name ?? "Printed box", tone: "paper" });
}
