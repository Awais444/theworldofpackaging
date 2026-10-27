import { cn } from "@/lib/utils";

type SpecLabelProps = {
  /** Parts joined with " / ", e.g. ["Style 04", "Magnetic", "2.0 mm board"]. */
  items: Array<string | number>;
  className?: string;
  as?: "span" | "p" | "div" | "h2" | "h3";
};

/** Mono, uppercase spec line in the style of a job ticket. */
export function SpecLabel({ items, className, as: Tag = "span" }: SpecLabelProps) {
  return (
    <Tag className={cn("spec text-muted", className)}>
      {items.map((item, i) => (
        <span key={`${item}-${i}`}>
          {i > 0 && <span aria-hidden="true"> / </span>}
          {item}
        </span>
      ))}
    </Tag>
  );
}
