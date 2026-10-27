"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { submitProject } from "@/app/actions/forms";
import { site } from "@/config/site";
import { packages } from "@/content/packages";
import { BUDGETS, PROJECT_SERVICES, projectSchema, QTY_BANDS, STAGES, TIMELINES, type ProjectInput } from "@/lib/schemas";
import { Chips, Honeypot, ReviewList, TextArea, TextField } from "./fields";
import { MultiStepForm, type FormStep } from "./MultiStepForm";

/** Which project service each /services page pre-selects. */
const SERVICE_PREFILL: Record<string, (typeof PROJECT_SERVICES)[number]> = {
  "brand-identity": "Brand identity",
  "logo-design": "Logo",
  "packaging-design": "Packaging design",
  "label-design": "Labels",
  "structural-dieline-design": "Packaging design",
  "3d-mockups": "Packaging design",
};

/** Design/branding project brief (CLAUDE.md §10.2). */
export function ProjectForm() {
  const form = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: { name: "", email: "", company: "", country: "", brandName: "", brandWebsite: "", product: "", services: [], links: "", notes: "", website: "" },
    mode: "onTouched",
  });
  const { register, formState, setValue } = form;
  const e = formState.errors;
  const v = useWatch({ control: form.control });

  // Prefill from ?service= or ?package= links on service and package pages.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const service = SERVICE_PREFILL[q.get("service") ?? ""];
    const pkg = packages.find((p) => p.slug === q.get("package"));
    if (service) setValue("services", [service]);
    if (pkg) {
      setValue("services", ["Brand identity", "Packaging design", "Production"]);
      setValue("notes", `Interested in the ${pkg.name} package.`);
    }
  }, [setValue]);

  const steps: FormStep<ProjectInput>[] = [
    {
      id: "you",
      title: "About you",
      fields: ["name", "email", "country"],
      content: (
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField label="Name" reg={register("name")} error={e.name} autoComplete="name" />
          <TextField label="Email" type="email" reg={register("email")} error={e.email} autoComplete="email" />
          <TextField label="Company (optional)" reg={register("company")} error={e.company} autoComplete="organization" />
          <TextField label="Country" reg={register("country")} error={e.country} autoComplete="country-name" />
          <Honeypot reg={register("website")} />
        </div>
      ),
    },
    {
      id: "brand",
      title: "Your brand",
      fields: ["stage", "brandName", "brandWebsite"],
      content: (
        <>
          <Chips legend="Is this a new or existing brand?" reg={register("stage")} options={STAGES} error={e.stage} />
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField label="Brand name (optional)" reg={register("brandName")} error={e.brandName} />
            <TextField label="Website or social link (optional)" type="url" reg={register("brandWebsite")} error={e.brandWebsite} inputMode="url" />
          </div>
        </>
      ),
    },
    {
      id: "services",
      title: "Services needed",
      fields: ["services"],
      content: <Chips legend="Pick all that apply" reg={register("services")} options={PROJECT_SERVICES} error={e.services} multiple />,
    },
    {
      id: "product",
      title: "Product and quantity",
      fields: ["product", "quantity"],
      content: (
        <>
          <TextArea label="What is the product?" reg={register("product")} error={e.product} hint="What it is, who buys it and where it sells." />
          <Chips legend={`Boxes per design (rigid MOQ ${site.facts.rigidMoq})`} reg={register("quantity")} options={QTY_BANDS} error={e.quantity} />
        </>
      ),
    },
    {
      id: "timeline",
      title: "Timeline",
      fields: ["timeline"],
      content: <Chips legend="When do you need it?" reg={register("timeline")} options={TIMELINES} error={e.timeline} />,
    },
    {
      id: "budget",
      title: "Budget",
      intro: "A range helps us propose the right scope. It is never a commitment.",
      fields: ["budget"],
      content: <Chips legend="Budget range" reg={register("budget")} options={BUDGETS} error={e.budget} />,
    },
    {
      id: "files",
      title: "Files and links",
      fields: ["links", "notes"],
      content: (
        <>
          <TextArea label="Links (optional)" reg={register("links")} error={e.links} rows={3} hint="A shared folder with logos, references or competitor packaging. For large files, a WeTransfer or Drive link." />
          <TextArea label="Anything else (optional)" reg={register("notes")} error={e.notes} rows={3} />
        </>
      ),
    },
    {
      id: "review",
      title: "Review",
      fields: [],
      content: (
        <ReviewList
          rows={[
            { label: "Name", value: v.name },
            { label: "Email", value: v.email },
            { label: "Company", value: v.company },
            { label: "Country", value: v.country },
            { label: "Brand", value: [v.stage, v.brandName].filter(Boolean).join(" · ") },
            { label: "Website", value: v.brandWebsite },
            { label: "Services", value: v.services?.join(", ") },
            { label: "Product", value: v.product },
            { label: "Quantity", value: v.quantity },
            { label: "Timeline", value: v.timeline },
            { label: "Budget", value: v.budget },
            { label: "Links", value: v.links },
            { label: "Notes", value: v.notes },
          ]}
        />
      ),
    },
  ];

  return (
    <MultiStepForm
      form={form}
      steps={steps}
      action={submitProject}
      success={{
        title: "Brief received",
        body: `Thanks. We reply ${site.facts.quoteReply} with a scope, a timeline and any questions we still have.`,
      }}
    />
  );
}
