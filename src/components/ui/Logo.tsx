import Link from "next/link";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** Black wordmark on light backgrounds, white on blue / Klein. */
  tone?: "dark" | "light";
  className?: string;
  /** Render as a link to the home page (default). */
  asLink?: boolean;
  /** Hide the wordmark text and show only the mark (e.g. tight spaces). */
  markOnly?: boolean;
};

/**
 * Temporary logo: orange circular "W" mark with a small red 4-point star, plus the
 * name in Space Grotesk 700. Swap for the real SVG at /public/brand/logo.svg later.
 */
export function Logo({ tone = "dark", className, asLink = true, markOnly = false }: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 40 40" className="h-8 w-8 shrink-0" aria-hidden="true">
        <circle cx="19" cy="21" r="17" className="fill-orange-500" />
        <text
          x="19"
          y="27.5"
          textAnchor="middle"
          className="fill-white"
          style={{ fontFamily: "var(--ff-heading), sans-serif", fontWeight: 700, fontSize: 18 }}
        >
          W
        </text>
        {/* 4-point star */}
        <path d="M33 1.5l1.6 4.4 4.4 1.6-4.4 1.6L33 13.5l-1.6-4.4-4.4-1.6 4.4-1.6z" className="fill-red-500" />
      </svg>
      {!markOnly && (
        <span
          className={cn(
            "whitespace-nowrap font-heading text-[17px] font-bold tracking-tight",
            tone === "light" ? "text-white" : "text-ink-900",
          )}
        >
          {site.name}
        </span>
      )}
    </span>
  );
  if (!asLink) return content;
  return (
    <Link href="/" aria-label={`${site.name}, home`} className="inline-flex rounded-lg">
      {content}
    </Link>
  );
}
