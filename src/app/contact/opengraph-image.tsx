import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Talk to the studio";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Contact", title: "Talk to the studio" });
}
