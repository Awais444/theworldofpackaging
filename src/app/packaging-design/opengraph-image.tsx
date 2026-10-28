import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Packaging design for every product";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Packaging design", title: "Packaging design for every product" });
}
