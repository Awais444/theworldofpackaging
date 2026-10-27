import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Packaging that fits the shelf it sits on.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Industries", title: "Packaging that fits the shelf it sits on.", tone: "paper" });
}
