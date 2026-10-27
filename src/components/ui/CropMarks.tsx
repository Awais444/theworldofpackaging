import { cn } from "@/lib/utils";

// Each corner is a 20px box; the frame corner sits 12px in from the outer edges,
// so marks stop 4px short of the artwork, as on a printed sheet.
const corners = [
  { pos: "top-0 left-0", d: "M0 12H8M12 0V8" },
  { pos: "top-0 right-0", d: "M12 12H20M8 0V8" },
  { pos: "bottom-0 left-0", d: "M0 8H8M12 12V20" },
  { pos: "bottom-0 right-0", d: "M12 8H20M8 12V20" },
] as const;

/** Printer's crop marks around the nearest positioned parent. Decorative only. */
export function CropMarks({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("pointer-events-none absolute -inset-3 text-line-strong", className)}>
      {corners.map((c) => (
        <svg key={c.pos} viewBox="0 0 20 20" className={cn("absolute h-5 w-5", c.pos)}>
          <path d={c.d} stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      ))}
    </span>
  );
}
