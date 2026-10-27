import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Graphics and structure, drawn together.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Studio / Packaging design", title: "Graphics and structure, drawn together.", tone: "paper" });
}
