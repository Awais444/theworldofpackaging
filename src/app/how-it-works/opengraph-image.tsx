import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "From brief to boxes in six steps";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "How it works", title: "From brief to boxes in six steps" });
}
