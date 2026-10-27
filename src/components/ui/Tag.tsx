import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TagTone = "blue" | "orange" | "red" | "white";

const tones: Record<TagTone, string> = {
  blue: "bg-blue-50 text-blue-600",
  orange: "bg-orange-50 text-orange-text",
  red: "bg-red-500 text-ink-900",
  white: "bg-white text-ink-900",
};

/** Pill tag / badge, 28px tall (CLAUDE.md §4.4). */
export function Tag({ children, tone = "blue", className }: { children: ReactNode; tone?: TagTone; className?: string }) {
  return (
    <span className={cn("inline-flex h-7 items-center rounded-full px-3 text-[13px] font-semibold whitespace-nowrap", tones[tone], className)}>
      {children}
    </span>
  );
}
