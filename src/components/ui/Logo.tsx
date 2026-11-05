import Link from "next/link";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

const LOGO_SYMBOL_ID = "twop-mark"; // defined once per page by <LogoSprite /> in the root layout

type LogoProps = {
  /** "onDark" for Klein / blue backgrounds: the blue part of the mark and the wordmark turn white. */
  variant?: "default" | "onDark";
  className?: string;
  /** Render as a link to the home page (default). */
  asLink?: boolean;
  /** Hide the wordmark text and show only the mark (e.g. tight spaces). */
  markOnly?: boolean;
};

/**
 * Brand logo: the mark from public/brand/logo-mark.svg (blue "W" with the orange shape), 30px high,
 * plus the name in Space Grotesk 700. The mark is a <use> of the symbol in <LogoSprite />.
 */
export function Logo({ variant = "default", className, asLink = true, markOnly = false }: LogoProps) {
  const dark = variant === "onDark";
  const content = (
    <span className={cn("inline-flex min-w-0 max-w-full items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 689 373"
        aria-hidden="true"
        focusable="false"
        className="h-[30px] w-auto shrink-0 aspect-[689/373]"
        style={dark ? ({ "--logo-blue": "#FFFFFF" } as React.CSSProperties) : undefined}
      >
        <use href={`#${LOGO_SYMBOL_ID}`} />
      </svg>
      {!markOnly && <span className={cn("min-w-0 truncate font-heading text-[17px] font-bold tracking-tight", dark ? "text-white" : "text-ink-900")}>{site.name}</span>}
    </span>
  );
  if (!asLink) return content;
  return (
    // The visible name is the link text; only the mark-only logo needs a label.
    <Link href="/" aria-label={markOnly ? `${site.name}, home` : undefined} className="inline-flex min-w-0 max-w-full rounded-lg">
      {content}
    </Link>
  );
}
