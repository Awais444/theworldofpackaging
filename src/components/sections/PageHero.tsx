import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { SiteImage } from "@/components/media/SiteImage";
import { RevealText } from "@/components/ui/RevealText";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  crumbs: Crumb[];
  spec: string[];
  title: string;
  intro: ReactNode;
  actions?: ReactNode;
  /** Media slot for the visual; or pass `visual` for a custom element. */
  slotId?: string;
  visual?: ReactNode;
  tone?: "paper" | "board" | "kraft";
};

/** Inner-page hero: breadcrumbs, spec line, H1, intro, CTAs and a framed visual. */
export function PageHero({ crumbs, spec, title, intro, actions, slotId, visual, tone = "paper" }: PageHeroProps) {
  return (
    <section className={cn(tone === "board" && "tone-board", tone === "kraft" && "tone-kraft")}>
      <div className="container-x pt-8 pb-20 md:pb-24">
        <Breadcrumbs items={crumbs} />
        <div className="grid-editorial mt-12 items-center gap-y-14 md:mt-16">
          <div className="col-span-4 md:col-span-12 lg:col-span-6">
            <SpecLabel items={spec} as="p" />
            <RevealText as="h1" text={title} className="type-display mt-5 text-display-xl" />
            <div className="measure mt-8 text-lg text-muted">{intro}</div>
            {actions && <div className="mt-10 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {(slotId || visual) && (
            <div className="col-span-4 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-7">
              {visual ?? (slotId && <SiteImage slotId={slotId} priority sizes="(min-width: 1024px) 45vw, 90vw" />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
