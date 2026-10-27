import { cn } from "@/lib/utils";

/** Mono fact strip, e.g. MOQ 500 · BOARD 1.5–3.0 MM · LEAD TIME · MADE IN-HOUSE. */
export function FactStrip({ items, className }: { items: { label: string; value: string }[]; className?: string }) {
  return (
    <div className={cn("border-y border-line", className)}>
      <dl className="container-x grid grid-cols-2 md:flex md:flex-wrap md:justify-between md:gap-x-10">
        {items.map((f, i) => (
          <div
            key={f.label}
            className={cn(
              "flex flex-col gap-1 py-5 md:flex-row md:items-baseline md:gap-3",
              i % 2 === 1 && "border-l border-line pl-4 md:border-0 md:pl-0",
            )}
          >
            <dt className="spec text-muted">{f.label}</dt>
            <dd className="font-mono text-sm uppercase tracking-wider">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
