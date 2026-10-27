import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { RevealText } from "./RevealText";
import { SpecLabel } from "./SpecLabel";

type SectionHeaderProps = {
  spec: string[];
  title: string;
  intro?: ReactNode;
  className?: string;
  /** Extra element aligned to the right of the title on wide screens (e.g. a link). */
  aside?: ReactNode;
};

export function SectionHeader({ spec, title, intro, className, aside }: SectionHeaderProps) {
  return (
    <header className={cn("grid-editorial gap-y-6", className)}>
      <div className="col-span-4 md:col-span-8">
        <SpecLabel items={spec} as="p" className="mb-5" />
        <RevealText text={title} className="type-display text-display-lg" />
        {intro && <p className="measure mt-6 text-lg text-muted">{intro}</p>}
      </div>
      {aside && <div className="col-span-4 self-end md:col-span-4 md:justify-self-end">{aside}</div>}
    </header>
  );
}
