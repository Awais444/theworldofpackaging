import type { Metadata } from "next";
import { site } from "@/config/site.config";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Button } from "@/components/ui/Button";
import { SpecLabel } from "@/components/ui/SpecLabel";

export const metadata: Metadata = {
  title: "Get a Box Quote",
  description: `Request a quote for rigid, collapsible or printed boxes. Reply within ${site.facts.quoteReplyHours} hours.`,
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <section className="container-x pt-8 pb-24">
      <Breadcrumbs items={[{ label: "Quote" }]} />
      <div className="mt-10 mb-14">
        <SpecLabel items={["Box quote", `Reply in ${site.facts.quoteReplyHours}h`]} as="p" />
        <h1 className="type-display mt-4 text-display-xl">Get a quote.</h1>
        <p className="measure mt-4 text-lg text-muted">
          Size, quantity and materials are enough to start. Not sure of the specs? Build it in the configurator first.
        </p>
        <Button href="/configure" variant="link" arrow className="mt-4">
          Open the configurator
        </Button>
      </div>
      <QuoteForm />
    </section>
  );
}
