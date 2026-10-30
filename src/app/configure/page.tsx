import type { Metadata } from "next";
import { metaDescription, ogFor } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Configurator } from "@/components/configurator/Configurator";
import { SpecLabel } from "@/components/ui/SpecLabel";

export const metadata: Metadata = {
  title: "Configure a Box: live estimate",
  description: metaDescription("Build a rigid, collapsible or printed box step by step and see a live estimate in six currencies."),
  alternates: { canonical: "/configure" }, openGraph: ogFor("/configure"),
};

export default function ConfigurePage() {
  return (
    <section className="container-x pt-8 pb-32 lg:pb-24">
      <Breadcrumbs items={[{ label: "Configure a Box" }]} />
      <div className="mt-10 mb-14">
        <SpecLabel items={["Configurator", "Live estimate"]} as="p" />
        <h1 className="font-heading font-bold mt-4 text-h2">Configure a box.</h1>
        <p className="max-w-2xl mt-4 text-lg text-ink-500">
          About ten quick choices. The preview and estimate update as you go; send it to us as a quote when it looks right.
        </p>
      </div>
      <Configurator />
    </section>
  );
}
