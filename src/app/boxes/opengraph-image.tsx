import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Every box style we make";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "All boxes", title: "Every box style we make" });
}
