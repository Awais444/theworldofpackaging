import { getShipTo } from "@/content/shipTo";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

// Pre-render one image per page, same params as the page itself.
export { generateStaticParams } from "./page";

export const alt = "Page preview";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const s = getShipTo(country);
  return renderOg({ eyebrow: "Ship to", title: `Custom boxes delivered to ${s?.country ?? ""}`, tone: "paper" });
}
