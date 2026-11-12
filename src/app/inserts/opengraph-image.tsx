import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Box inserts that hold your product";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Inserts", title: "Box inserts that hold your product" });
}
