import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { withHighlight } from "./withHighlight";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  /** One word from `title` shown in orange with the swoosh underline. */
  highlight?: string;
  lead?: ReactNode;
  /** Optional link on the right (wide screens). */
  action?: ReactNode;
  /** Light text and orange eyebrow for Klein / ink / blue sections. */
  dark?: boolean;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  /** Older prop names still used by pages awaiting their phase. */
  intro?: ReactNode;
  aside?: ReactNode;
  spec?: string[];
};

/** Eyebrow, heading with one highlighted word, lead and optional right-side link (CLAUDE.md §4.4). */
export function SectionHeader({
  eyebrow,
  title,
  highlight,
  lead,
  action,
  dark = false,
  align = "left",
  as: Tag = "h2",
  id,
  className,
  intro,
  aside,
}: SectionHeaderProps) {
  const body = lead ?? intro;
  const side = action ?? aside;
  return (
    <header className={cn("flex flex-wrap items-end justify-between gap-6", align === "center" && "flex-col items-center text-center", dark && "on-dark", className)}>
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow && <p className={cn("text-eyebrow mb-4", dark ? "text-white/80" : "text-blue-600")}>{eyebrow}</p>}
        <Tag id={id} className={Tag === "h1" ? "text-h1" : "text-h2"}>
          {withHighlight(title, highlight)}
        </Tag>
        {body && <div className={cn("text-lead mt-4", dark && "!text-white/80")}>{body}</div>}
      </div>
      {side}
    </header>
  );
}
