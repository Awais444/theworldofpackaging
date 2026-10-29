import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { Media } from "@/components/media/Media";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { withHighlight } from "@/components/ui/withHighlight";

type PageHeroProps = {
  crumbs: Crumb[];
  title: string;
  /** One word of the title shown in orange with the swoosh. */
  highlight?: string;
  eyebrow?: string;
  intro: ReactNode;
  /** Primary action, optionally a secondary one beside it. */
  actions?: ReactNode;
  /** Media slot for the visual; or pass `visual` for a custom element. */
  slotId?: string;
  visual?: ReactNode;
  /** Topic for the WhatsApp alternative next to the actions; defaults to the page crumb. false hides it. */
  whatsapp?: string | false;
  /** Older call sites still pass these; the hero no longer shows them. */
  spec?: string[];
  tone?: string;
};

/** Inner-page hero: breadcrumbs, eyebrow, H1, lead, actions, optional visual. */
export function PageHero({ crumbs, title, highlight, eyebrow, intro, actions, slotId, visual, whatsapp }: PageHeroProps) {
  const topic = whatsapp === false ? null : (whatsapp ?? crumbs[crumbs.length - 1]?.label);
  const media = visual ?? (slotId ? <Media slot={slotId} panel="blue" priority sizes="(min-width: 1024px) 45vw, 90vw" /> : null);
  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-8 md:pb-24">
      <span aria-hidden="true" className="absolute -right-48 -top-48 h-[30rem] w-[30rem] rounded-full bg-blue-50" />
      <div className="container-x relative">
        <Breadcrumbs items={crumbs} />
        <div className={media ? "mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-16" : "mt-10"}>
          <div className={media ? "lg:col-span-6" : "max-w-3xl"}>
            {eyebrow && <p className="text-eyebrow text-blue-600">{eyebrow}</p>}
            <h1 className="text-h1 mt-3">{withHighlight(title, highlight)}</h1>
            <div className="text-lead mt-5 max-w-2xl text-ink-500">{intro}</div>
            {actions && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {actions}
                {topic && <WhatsAppButton topic={topic} variant="ghost" />}
              </div>
            )}
          </div>
          {media && <div className="lg:col-span-6">{media}</div>}
        </div>
      </div>
    </section>
  );
}
