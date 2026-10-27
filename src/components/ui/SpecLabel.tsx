import { cn } from "@/lib/utils";

type SpecLabelProps = {
  /** Parts joined with " · ", e.g. ["Rigid", "1.5–3.0 mm"]. */
  items: Array<string | number>;
  className?: string;
  as?: "span" | "p" | "div" | "h2" | "h3";
};

/** Small muted supporting line under or above a title. */
export function SpecLabel({ items, className, as: Tag = "span" }: SpecLabelProps) {
  const parts = items.filter((i) => i !== "" && i !== null && i !== undefined);
  if (parts.length === 0) return null;
  return <Tag className={cn("text-sm text-ink-500", className)}>{parts.join(" · ")}</Tag>;
}
