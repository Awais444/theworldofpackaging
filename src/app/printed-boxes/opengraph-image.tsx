import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Printed boxes in any size";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Printed boxes", title: "Printed boxes in any size", tone: "paper" });
}
