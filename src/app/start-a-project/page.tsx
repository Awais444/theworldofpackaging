import type { Metadata } from "next";
import { site } from "@/config/site.config";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { SpecLabel } from "@/components/ui/SpecLabel";

export const metadata: Metadata = {
  title: "Start a Project",
  description: `Brief us on branding, packaging design or manufacturing. Reply within ${site.facts.quoteReplyHours} hours.`,
  alternates: { canonical: "/start-a-project" },
};

export default function StartProjectPage() {
  return (
    <section className="container-x pt-8 pb-24">
      <Breadcrumbs items={[{ label: "Start a Project" }]} />
      <div className="mt-10 mb-14">
        <SpecLabel items={["Project brief", "7 short steps", `Reply in ${site.facts.quoteReplyHours}h`]} as="p" />
        <h1 className="type-display mt-4 text-display-xl">Start a project.</h1>
        <p className="measure mt-4 text-lg text-muted">
          Tell us about the product and what you need. Brand, packaging, boxes, or all three.
        </p>
      </div>
      <ProjectForm />
    </section>
  );
}
