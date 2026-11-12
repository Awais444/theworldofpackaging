import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Terms of service";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Terms", title: "Terms of service" });
}
