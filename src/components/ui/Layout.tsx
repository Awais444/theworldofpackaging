import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Max 1240px content width with 24px (16px mobile) side padding. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("container-x", className)}>{children}</div>;
}

export type SectionBg = "white" | "silver" | "blue-50" | "klein" | "ink" | "blue";

const backgrounds: Record<SectionBg, string> = {
  white: "bg-white text-ink-900",
  silver: "bg-silver-100 text-ink-900",
  "blue-50": "bg-blue-50 text-ink-900",
  klein: "bg-blue-900 text-white",
  ink: "bg-ink-900 text-white",
  blue: "bg-blue-600 text-white",
};

/** Section with standard vertical rhythm (96px desktop / 64px mobile) and a background variant. */
export function Section({
  children,
  bg = "white",
  className,
  id,
  containerClassName,
  "aria-labelledby": labelledBy,
}: {
  children: ReactNode;
  bg?: SectionBg;
  className?: string;
  id?: string;
  containerClassName?: string;
  "aria-labelledby"?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("section-y", backgrounds[bg], className)} data-bg={bg}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** True for backgrounds that need light text and orange (not blue) eyebrows. */
export const isDarkBg = (bg: SectionBg) => bg === "klein" || bg === "ink" || bg === "blue";
