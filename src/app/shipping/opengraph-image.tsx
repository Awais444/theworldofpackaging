import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "From our floor to yours.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Shipping / Air + sea", title: "From our floor to yours.", tone: "paper" });
}
