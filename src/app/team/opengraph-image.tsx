import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "The people behind your packaging";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Our team", title: "The people behind your packaging" });
}
