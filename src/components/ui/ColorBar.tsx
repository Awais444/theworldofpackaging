import { cn } from "@/lib/utils";

// A press control strip: solids, 50% tints, overprints and a grey step.
const patches = [
  "var(--cyan)",
  "var(--magenta)",
  "var(--yellow)",
  "var(--ink)",
  "color-mix(in srgb, var(--cyan) 50%, white)",
  "color-mix(in srgb, var(--magenta) 50%, white)",
  "color-mix(in srgb, var(--yellow) 50%, white)",
  "#8a8a8a",
  "color-mix(in srgb, var(--cyan), var(--magenta))",
  "color-mix(in srgb, var(--magenta), var(--yellow))",
  "color-mix(in srgb, var(--yellow), var(--cyan))",
  "#c4c4c4",
];

type ColorBarProps = {
  className?: string;
  /** Optional mono caption at the end of the strip. */
  label?: string;
};

/** Thin CMYK control strip, used as a section divider. */
export function ColorBar({ className, label }: ColorBarProps) {
  return (
    <div className={cn("flex items-center gap-4", className)} aria-hidden="true">
      <div className="flex h-2 shrink-0">
        {patches.map((bg, i) => (
          <span key={i} className="h-2 w-3 sm:w-4" style={{ backgroundColor: bg }} />
        ))}
      </div>
      <span className="h-px flex-1 bg-line" />
      {label && <span className="spec hidden text-muted sm:inline">{label}</span>}
    </div>
  );
}
