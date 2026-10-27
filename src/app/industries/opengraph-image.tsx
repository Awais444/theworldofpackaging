import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Packaging for your industry";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Industries", title: "Packaging for your industry", tone: "paper" });
}
