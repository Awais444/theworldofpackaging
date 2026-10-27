import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Brands designed. Boxes made in-house.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Brand. Packaging. Made in-house.", title: "Brands designed. Boxes made in-house.", tone: "paper" });
}
