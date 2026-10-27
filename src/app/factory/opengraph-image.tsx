import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Where your boxes are made";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Our factory", title: "Where your boxes are made" });
}
