import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Board and paper for every box";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Materials", title: "Board and paper for every box" });
}
