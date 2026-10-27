import Link from "next/link";
import { site } from "@/config/site.config";
import { cn } from "@/lib/utils";
import { RegMark } from "./RegMark";

type WordmarkProps = {
  className?: string;
  /** Render as a link to the home page (default). */
  asLink?: boolean;
};

/** Text wordmark from site.name until a real logo file is supplied. */
export function Wordmark({ className, asLink = true }: WordmarkProps) {
  const mark = (
    <span className={cn("inline-flex items-center gap-2 leading-none", className)}>
      <RegMark className="h-[0.9em] w-[0.9em] shrink-0" />
      <span className="type-display whitespace-nowrap text-[1.05rem] tracking-[0.01em] sm:text-[1.375rem]">{site.name}</span>
    </span>
  );
  if (!asLink) return mark;
  return (
    <Link href="/" aria-label={`${site.name}, home`} className="inline-flex">
      {mark}
    </Link>
  );
}
