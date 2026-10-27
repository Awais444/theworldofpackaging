import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Printed boxes for shelf, post and counter.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Manufacturing / Printed", title: "Printed boxes for shelf, post and counter.", tone: "paper" });
}
