import Link from "next/link";
import type { Metadata } from "next";
import { metaDescription, ogFor } from "@/lib/seo";
import { site } from "@/config/site";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { QuoteBuilder } from "@/components/forms/QuoteBuilder";
import { countries } from "@/content/countries";
import { quoteBoxes } from "@/lib/quoteBoxes";
import { withHighlight } from "@/components/ui/withHighlight";

export const metadata: Metadata = {
  title: "Start a Project",
  description: metaDescription(`Brief us on packaging design, branding or printing in three short steps. We reply ${site.facts.quoteReply}.`),
  alternates: { canonical: "/start-a-project" }, openGraph: ogFor("/start-a-project"),
};

/** Same 3-step form as /get-a-quote, sent as a project brief with Packaging design preselected. */
export default function StartProjectPage() {
  return (
    <section className="bg-white pb-20 pt-8">
      <div className="container-x">
        <Breadcrumbs items={[{ label: "Start a Project" }]} />
        <div className="mb-10 mt-8 max-w-3xl">
          <h1 className="text-h1">{withHighlight("Start your packaging project", "packaging")}</h1>
          <p className="text-lead mt-4 text-ink-500">Tell us about your product in under a minute. We reply {site.facts.quoteReply}.</p>
          <p className="mt-3 text-sm text-ink-500">
            Need a price for boxes you already know?{" "}
            <Link href="/get-a-quote" className="font-semibold text-blue-600 underline-offset-4 hover:underline">
              Get a quote
            </Link>
            .
          </p>
        </div>
        <QuoteBuilder kind="project" countries={countries.map(({ slug, name }) => ({ slug, name }))} boxes={quoteBoxes} />
      </div>
    </section>
  );
}
