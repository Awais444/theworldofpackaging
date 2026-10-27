import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Configure a box.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Configurator / Live estimate", title: "Configure a box.", tone: "board" });
}
