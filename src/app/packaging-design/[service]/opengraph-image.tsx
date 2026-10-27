import { getService } from "@/content/agencyServices";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

// Pre-render one image per page, same params as the page itself.
export { generateStaticParams } from "./page";

export const alt = "Page preview";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const s = getService("packaging-design", service);
  return renderOg({ eyebrow: "Studio / Packaging design", title: s?.name ?? "Packaging design", tone: "paper" });
}
