import Link from "next/link";
import { site } from "@/config/site.config";
import { industries } from "@/content/industries";
import type { Faq, PriceTier } from "@/content/rigidStyles";
import { SiteImage } from "@/components/media/SiteImage";
import { Button } from "@/components/ui/Button";
import { ColorBar } from "@/components/ui/ColorBar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPage } from "@/lib/schema";
import { cn } from "@/lib/utils";

/** Asymmetric gallery of media slots. */
export function Gallery({ slotIds, title }: { slotIds: string[]; title: string }) {
  const layout = ["md:col-span-7", "md:col-span-5 md:mt-24", "md:col-span-6 md:col-start-4"];
  return (
    <section className="container-x py-20 md:py-28">
      <SectionHeader spec={["Gallery"]} title={title} />
      <div className="grid-editorial mt-14 gap-y-12">
        {slotIds.map((id, i) => (
          <SiteImage key={id} slotId={id} className={cn("col-span-4", layout[i % layout.length])} sizes="(min-width: 768px) 55vw, 100vw" />
        ))}
      </div>
    </section>
  );
}

/** Quantity tiers. Unit prices stay "On quote" until real rates are set. */
export function PriceTiers({ tiers, note }: { tiers: PriceTier[]; note?: string }) {
  return (
    <section className="container-x py-20 md:py-28">
      <SectionHeader
        spec={["Pricing", "Per unit"]}
        title="Price falls as quantity rises."
        intro={note ?? "Unit prices depend on size, board, wrap and finishes. Use the configurator for an estimate, or ask for a quote."}
      />
      <div className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-left">
          <caption className="sr-only">Unit price by order quantity</caption>
          <thead>
            <tr className="border-b border-line-strong">
              <th scope="col" className="spec py-3 font-medium text-muted">Quantity</th>
              <th scope="col" className="spec py-3 font-medium text-muted">Unit price (USD)</th>
              <th scope="col" className="spec py-3 font-medium text-muted">Status</th>
            </tr>
          </thead>
          <tbody className="font-mono text-sm">
            {tiers.map((t) => (
              <tr key={t.qty} className="border-b border-dashed border-line">
                <td className="py-4">{t.qty.toLocaleString("en-US")}</td>
                <td className="py-4">{t.unitUsd === null ? "On quote" : `$${t.unitUsd.toFixed(2)}`}</td>
                <td className="py-4 text-muted">{t.unitUsd === null ? `Reply in ${site.facts.quoteReplyHours}h` : "Estimate"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button href="/configure" variant="link" arrow className="mt-8">
        Estimate in the configurator
      </Button>
    </section>
  );
}

/** Links to the industries that commonly use this style. */
export function IndustryLinks({ slugs }: { slugs: string[] }) {
  const list = industries.filter((i) => slugs.includes(i.slug));
  if (list.length === 0) return null;
  return (
    <section className="container-x py-16 md:py-20">
      <SpecLabel items={["Used in"]} as="h2" className="mb-6" />
      <ul className="flex flex-wrap gap-3">
        {list.map((ind) => (
          <li key={ind.slug}>
            <Link
              href={`/industries/${ind.slug}`}
              className="type-display inline-flex h-14 items-center border border-line-strong px-5 text-display-sm transition-colors hover:bg-fg hover:text-surface"
            >
              {ind.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** FAQ list on native <details>, so it works without JS. */
export function FaqList({
  faqs,
  title = "Questions we get asked.",
  schema = true,
}: {
  faqs: Faq[];
  title?: string;
  /** Emit FAQPage JSON-LD. Turn off when a page combines several lists into one schema. */
  schema?: boolean;
}) {
  return (
    <section className="container-x py-20 md:py-28">
      {schema && <JsonLd data={faqPage(faqs)} />}
      <div className="grid-editorial gap-y-10">
        <div className="col-span-4 md:col-span-4">
          <SectionHeader spec={["FAQ"]} title={title} className="!block" />
        </div>
        <div className="col-span-4 md:col-span-7 md:col-start-6">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="mt-1 font-mono text-accent transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="measure pb-6 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Closing call to action: sample box and quote. */
export function CtaBand({ title, body }: { title: string; body: string }) {
  return (
    <section className="tone-kraft">
      <div className="container-x py-20 md:py-28">
        <ColorBar className="mb-12" />
        <div className="grid-editorial items-end gap-y-8">
          <div className="col-span-4 md:col-span-7">
            <p className="type-display text-display-lg">{title}</p>
            <p className="measure mt-5 text-lg">{body}</p>
          </div>
          <div className="col-span-4 flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <Button href="/samples" size="lg" arrow>
              Order a sample
            </Button>
            <Button href="/quote" variant="secondary" size="lg">
              Get a {site.facts.quoteReplyHours}h quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
