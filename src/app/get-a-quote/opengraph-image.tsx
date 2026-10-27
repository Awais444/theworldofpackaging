import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Get a price for your boxes";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Quote builder", title: "Get a price for your boxes" });
}
