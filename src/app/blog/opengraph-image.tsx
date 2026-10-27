import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Packaging guides from our studio";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Blog", title: "Packaging guides from our studio", tone: "paper" });
}
