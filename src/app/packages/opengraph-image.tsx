import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Design and boxes in one scope";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Packages", title: "Design and boxes in one scope", tone: "paper" });
}
