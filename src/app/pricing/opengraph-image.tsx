import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "What things cost, and why.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Pricing", title: "What things cost, and why.", tone: "paper" });
}
