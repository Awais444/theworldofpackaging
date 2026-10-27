import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "A design studio with its own factory";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "About us", title: "A design studio with its own factory" });
}
