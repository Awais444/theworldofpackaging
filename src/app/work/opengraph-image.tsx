import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "From first sketch to delivered box";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Case studies", title: "From first sketch to delivered box", tone: "paper" });
}
