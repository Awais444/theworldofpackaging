import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Work, from brief to box.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Case studies", title: "Work, from brief to box.", tone: "paper" });
}
