import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Hold your box before you order";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Samples", title: "Hold your box before you order" });
}
