import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Notes from the studio and the floor.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Guides", title: "Notes from the studio and the floor.", tone: "paper" });
}
