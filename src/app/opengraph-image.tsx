import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Custom boxes that make your brand unforgettable.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Packaging design + manufacturing", title: "Custom boxes that make your brand unforgettable." });
}
