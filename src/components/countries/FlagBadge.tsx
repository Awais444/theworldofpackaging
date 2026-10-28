import { cn } from "@/lib/utils";

/**
 * Country code badge. Stands in for a flag until a local SVG flag set is added
 * (COUNTRY_PAGES_PLAN.md asks for local flags, not a CDN). Decorative: the country name is always shown beside it.
 */
export function FlagBadge({ iso2, size = "md", className }: { iso2: string; size?: "sm" | "md" | "lg"; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg bg-blue-50 font-heading font-bold tracking-wide text-blue-600",
        size === "sm" && "h-7 w-9 text-xs",
        size === "md" && "h-9 w-12 text-sm",
        size === "lg" && "h-12 w-16 text-lg",
        className,
      )}
    >
      {iso2}
    </span>
  );
}
