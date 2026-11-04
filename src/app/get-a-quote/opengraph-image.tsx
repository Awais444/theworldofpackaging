import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Get a price for your boxes";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Get a quote", title: "Get a quote for your packaging" });
}
