import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Packaging shipped to 190+ countries";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Countries", title: "Packaging shipped to 190+ countries" });
}
