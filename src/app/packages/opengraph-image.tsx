import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Design and boxes, one scope.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Packages / Design + manufacturing", title: "Design and boxes, one scope.", tone: "paper" });
}
