import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small outlined label for categories and project tags. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "spec inline-flex h-6 items-center border border-line-strong px-2 text-fg",
        className,
      )}
    >
      {children}
    </span>
  );
}
