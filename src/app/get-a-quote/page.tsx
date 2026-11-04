import Link from "next/link";
import type { Metadata } from "next";
import { metaDescription, ogFor } from "@/lib/seo";
import { site } from "@/config/site";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { QuoteBuilder } from "@/components/forms/QuoteBuilder";
import { countries } from "@/content/countries";
import { printedStyles } from "@/content/printedStyles";
import { rigidStyles } from "@/content/rigidStyles";
import { withHighlight } from "@/components/ui/withHighlight";

export const metadata: Metadata = {
  title: "Get a Quote",
  description: metaDescription(`Get a quote for packaging design, brand identity or printing in three short steps. We reply ${site.facts.quoteReply}.`),
  alternates: { canonical: "/get-a-quote" }, openGraph: ogFor("/get-a-quote"),
};

// Box styles a ?box= link can preselect. Names only: the full style content stays on the server.
const boxes = [
  ...rigidStyles.map((s) => ({ slug: s.slug, name: s.name, rigid: true })),
  ...printedStyles.map((s) => ({ slug: s.slug, name: s.name, rigid: false })),
];

export default function GetAQuotePage() {
  return (
    <section className="bg-white pb-20 pt-8">
      <div className="container-x">
        <Breadcrumbs items={[{ label: "Get a Quote" }]} />
        <div className="mb-10 mt-8 max-w-3xl">
          <h1 className="text-h1">{withHighlight("Get a quote for your packaging", "packaging")}</h1>
          <p className="text-lead mt-4 text-ink-500">Tell us what you need in under a minute. We reply {site.facts.quoteReply}.</p>
          <p className="mt-3 text-sm text-ink-500">
            Know the exact box you want?{" "}
            <Link href="/configure" className="font-semibold text-blue-600 underline-offset-4 hover:underline">
              Build it in the box configurator
            </Link>
            .
          </p>
        </div>
        <QuoteBuilder countries={countries.map(({ slug, name }) => ({ slug, name }))} boxes={boxes} />
      </div>
    </section>
  );
}
