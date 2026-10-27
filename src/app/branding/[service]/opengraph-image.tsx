import { getService } from "@/content/agencyServices";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

// Pre-render one image per page, same params as the page itself.
export { generateStaticParams } from "./page";

export const alt = "Page preview";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const s = getService("branding", service);
  return renderOg({ eyebrow: "Studio / Branding", title: s?.name ?? "Branding", tone: "paper" });
}
