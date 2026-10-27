import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Rigid boxes built to be kept";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Made in our factory", title: "Rigid boxes built to be kept", tone: "board" });
}
