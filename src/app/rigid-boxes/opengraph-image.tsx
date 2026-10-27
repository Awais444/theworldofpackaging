import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Rigid boxes, made in-house.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Manufacturing / Own factory", title: "Rigid boxes, made in-house.", tone: "board" });
}
