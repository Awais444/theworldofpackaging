import * as Flags from "country-flag-icons/react/3x2";
import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "h-5 w-[30px]",
  md: "h-8 w-12",
  lg: "h-10 w-[60px]",
};

/**
 * Country flag from country-flag-icons (MIT, bundled locally, no CDN). Server component: keep it out
 * of client components so the whole flag set is not shipped to the browser. Falls back to an ISO
 * code badge when no flag exists. Decorative: the country name is always shown beside it.
 */
export function FlagBadge({ iso2, size = "md", className }: { iso2: string; size?: "sm" | "md" | "lg"; className?: string }) {
  const Flag = (Flags as Record<string, ComponentType<SVGProps<SVGSVGElement>> | undefined>)[iso2.toUpperCase()];
  if (Flag) {
    return <Flag aria-hidden="true" focusable="false" className={cn("shrink-0 overflow-hidden rounded-[4px] shadow-[0_0_0_1px_rgba(20,19,23,0.08)]", sizes[size], className)} />;
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[4px] bg-blue-50 font-heading text-xs font-bold tracking-wide text-blue-600",
        sizes[size],
        className,
      )}
    >
      {iso2}
    </span>
  );
}
