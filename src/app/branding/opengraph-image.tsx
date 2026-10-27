import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Brands built to be printed.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Studio / Branding", title: "Brands built to be printed.", tone: "paper" });
}
