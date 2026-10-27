import { site } from "@/config/site";
import type { Faq, PriceTier } from "@/content/rigidStyles";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqPage } from "@/lib/schema";
import { CtaPanel } from "./CtaPanel";

/** Quantity tiers as a spec table. Unit prices stay "On quote" until real rates are set. */
export function PriceTiers({ tiers, note }: { tiers: PriceTier[]; note?: string }) {
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeader
          title="Pricing"
          intro={note ?? "Unit price depends on size, materials and finishes, and falls as quantity rises."}
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-silver-300">
          <table className="w-full min-w-[28rem] border-collapse text-left">
            <caption className="sr-only">Unit price by order quantity</caption>
            <thead className="bg-silver-100">
              <tr>
                <th scope="col" className="px-5 py-3 text-sm font-medium text-ink-500">Quantity</th>
                <th scope="col" className="px-5 py-3 text-sm font-medium text-ink-500">Unit price (USD)</th>
              </tr>
            </thead>
            <tbody className="font-mono text-sm">
              {tiers.map((t) => (
                <tr key={t.qty} className="border-t border-silver-300">
                  <td className="px-5 py-4">{t.qty.toLocaleString("en-US")}</td>
                  <td className="px-5 py-4">
                    {t.unitUsd === null ? `On quote, reply in ${site.facts.quoteReplyHours}h` : `$${t.unitUsd.toFixed(2)}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/** FAQ list on native <details>, so it works without JS. */
export function FaqList({
  faqs,
  title = "Questions",
  schema = true,
}: {
  faqs: Faq[];
  title?: string;
  /** Emit FAQPage JSON-LD. Turn off when a page combines several lists into one schema. */
  schema?: boolean;
}) {
  return (
    <section className="section-y">
      {schema && <JsonLd data={faqPage(faqs)} />}
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader title={title} />
        </div>
        <div className="border-t border-silver-300 lg:col-span-8">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-silver-300">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="mt-0.5 text-2xl leading-none text-blue-600 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-ink-500">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Closing call to action on product pages: the shared one-button panel. */
export function CtaBand({ title, body }: { title: string; body: string }) {
  return <CtaPanel title={title} body={body} />;
}
