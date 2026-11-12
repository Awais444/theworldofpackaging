import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Packaging terms explained";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Glossary", title: "Packaging terms explained" });
}
