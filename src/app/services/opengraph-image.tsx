import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Branding and packaging design that gets made";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Design services", title: "Branding and packaging design that gets made" });
}
