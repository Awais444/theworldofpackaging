import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "A studio with a factory attached.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "About / Studio + factory", title: "A studio with a factory attached.", tone: "board" });
}
