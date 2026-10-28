import * as Flags from "country-flag-icons/react/3x2";
import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

const sizes = { sm: "h-3 w-4", md: "h-[18px] w-6" };

/**
 * Small decorative country flag (country-flag-icons, MIT, bundled locally). sm 16×12 everywhere,
 * md 24×18 on the country page hero only. Server component, so the flag set never ships to the browser.
 * The hairline outline keeps white flags (Japan, Canada) visible; use tone="dark" on blue backgrounds.
 */
export function Flag({ iso2, size = "sm", tone = "light", className }: { iso2: string; size?: "sm" | "md"; tone?: "light" | "dark"; className?: string }) {
  const Svg = (Flags as Record<string, ComponentType<SVGProps<SVGSVGElement>> | undefined>)[iso2.toUpperCase()];
  const base = cn(
    "block shrink-0 overflow-hidden rounded-[2px] object-cover",
    tone === "dark" ? "shadow-[0_0_0_1px_rgba(255,255,255,0.15)]" : "shadow-[0_0_0_1px_rgba(0,0,0,0.08)]",
    sizes[size],
    className,
  );
  if (Svg) return <Svg aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice" className={base} />;
  return <span aria-hidden="true" className={cn(base, "bg-silver-100")} />;
}
