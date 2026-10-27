import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Luxury boxes that ship flat.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Collapsible rigid / Ships flat", title: "Luxury boxes that ship flat.", tone: "board" });
}
