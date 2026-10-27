import { cn } from "@/lib/utils";

type RegMarkProps = {
  className?: string;
  /** Slowly rotate, for loading states. Stops under reduced motion. */
  spinning?: boolean;
  label?: string;
};

/** Registration target. Decorative unless given a label (then it reads as a status). */
export function RegMark({ className, spinning = false, label }: RegMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-6 w-6", spinning && "animate-[spin-slow_2.4s_linear_infinite]", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <path d="M12 0v24M0 12h24" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
