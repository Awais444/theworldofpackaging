import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "From our factory to your door";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Worldwide shipping", title: "From our factory to your door", tone: "paper" });
}
