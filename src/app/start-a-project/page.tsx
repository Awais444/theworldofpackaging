import type { Metadata } from "next";
import { site } from "@/config/site";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { withHighlight } from "@/components/ui/withHighlight";

export const metadata: Metadata = {
  title: "Start a Project",
  description: `Brief us on branding, packaging design or production. We reply ${site.facts.quoteReply}.`,
  alternates: { canonical: "/start-a-project" },
};

export default function StartProjectPage() {
  return (
    <section className="bg-white pb-20 pt-8">
      <div className="container-x">
        <Breadcrumbs items={[{ label: "Start a Project" }]} />
        <div className="mb-10 mt-8 max-w-3xl">
          <p className="text-eyebrow text-blue-600">Project brief · 8 short steps</p>
          <h1 className="text-h1 mt-3">{withHighlight("Start your design project", "design")}</h1>
          <p className="text-lead mt-4 text-ink-500">Tell us about your brand and what you need: identity, packaging, labels, production, or all of it. We reply {site.facts.quoteReply}.</p>
        </div>
        <ProjectForm />
      </div>
    </section>
  );
}
