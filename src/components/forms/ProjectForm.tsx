"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { submitProject } from "@/app/actions/forms";
import { site } from "@/config/site.config";
import { agencyServices } from "@/content/agencyServices";
import { packages } from "@/content/packages";
import { BUDGETS, NEEDS, projectSchema, QTY_BANDS, STAGES, TIMELINES, type ProjectInput } from "@/lib/schemas";
import { Chips, Honeypot, ReviewList, TextArea, TextField } from "./fields";
import { MultiStepForm, type FormStep } from "./MultiStepForm";

export function ProjectForm() {
  const form = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: { name: "", email: "", company: "", country: "", brandName: "", product: "", needs: [], links: "", notes: "", website: "" },
    mode: "onTouched",
  });
  const { register, formState, setValue } = form;
  const e = formState.errors;
  const v = useWatch({ control: form.control });

  // Prefill from ?service= or ?package= links on service and package pages.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const service = agencyServices.find((s) => s.slug === q.get("service"));
    const pkg = packages.find((p) => p.slug === q.get("package"));
    if (service) {
      setValue("needs", [service.hub === "branding" ? "Branding" : "Packaging design"]);
      setValue("notes", `Interested in: ${service.name}`);
    }
    if (pkg) {
      setValue("needs", ["All of it"]);
      setValue("notes", `Interested in the ${pkg.name} package`);
    }
  }, [setValue]);

  const steps: FormStep<ProjectInput>[] = [
    {
      id: "you",
      title: "About you",
      fields: ["name", "email", "country"],
      content: (
        <div className="grid gap-8 sm:grid-cols-2">
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
      title: "Your brand and product",
      fields: ["product", "stage"],
      content: (
        <>
          <TextField label="Brand name (optional)" reg={register("brandName")} error={e.brandName} />
          <TextArea label="What is the product?" reg={register("product")} error={e.product} hint="What it is, who buys it, where it sells." />
          <Chips legend="Where is the brand today?" reg={register("stage")} options={STAGES} error={e.stage} />
        </>
      ),
    },
    {
      id: "need",
      title: "What you need",
      fields: ["needs"],
      content: <Chips legend="Pick all that apply" reg={register("needs")} options={NEEDS} error={e.needs} multiple />,
    },
    {
      id: "qty",
      title: "Quantity and timeline",
      fields: ["quantity", "timeline"],
      content: (
        <>
          <Chips legend={`Boxes per design (rigid MOQ ${site.facts.rigidMoq})`} reg={register("quantity")} options={QTY_BANDS} error={e.quantity} />
          <Chips legend="When do you need it?" reg={register("timeline")} options={TIMELINES} error={e.timeline} />
        </>
      ),
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
          <TextArea
            label="Links (optional)"
            reg={register("links")}
            error={e.links}
            rows={3}
            hint="Website, Instagram, a shared folder with logos or references. Large files: send a WeTransfer or Drive link."
          />
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
            { label: "Brand", value: v.brandName },
            { label: "Product", value: v.product },
            { label: "Stage", value: v.stage },
            { label: "Needs", value: v.needs?.join(", ") },
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
        title: "Brief received.",
        body: `Thanks. We reply within ${site.facts.quoteReplyHours} hours on working days with a scope, a timeline and any questions we still have.`,
      }}
    />
  );
}
