import type { Metadata } from "next";
import { site } from "@/config/site";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { QuoteBuilder } from "@/components/forms/QuoteBuilder";
import { withHighlight } from "@/components/ui/withHighlight";

export const metadata: Metadata = {
  title: "Get a Quote",
  description: `Build a quote for rigid, collapsible or printed boxes in a few steps. We reply ${site.facts.quoteReply}.`,
  alternates: { canonical: "/get-a-quote" },
};

export default function GetAQuotePage() {
  return (
    <section className="bg-white pb-20 pt-8">
      <div className="container-x">
        <Breadcrumbs items={[{ label: "Get a Quote" }]} />
        <div className="mb-10 mt-8 max-w-3xl">
          <p className="text-eyebrow text-blue-600">Quote builder</p>
          <h1 className="text-h1 mt-3">{withHighlight("Get a price for your boxes", "price")}</h1>
          <p className="text-lead mt-4 text-ink-500">
            A few questions about your box. Not sure of something? Pick &quot;Not sure&quot; and we will recommend. We reply {site.facts.quoteReply}.
          </p>
        </div>
        <QuoteBuilder />
      </div>
    </section>
  );
}
