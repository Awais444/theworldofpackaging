import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Rigid when it arrives. Flat when it ships.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Ships flat", title: "Rigid when it arrives. Flat when it ships.", tone: "board" });
}
