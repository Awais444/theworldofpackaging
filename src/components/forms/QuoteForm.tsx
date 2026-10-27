"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { submitQuote } from "@/app/actions/forms";
import { site } from "@/config/site.config";
import { printedStyles } from "@/content/printedStyles";
import { rigidStyles } from "@/content/rigidStyles";
import { formatMoney } from "@/lib/currency";
import { estimate } from "@/lib/pricing";
import { ARTWORK, BOX_TYPES, quoteSchema, SHIP_METHODS, type QuoteInput } from "@/lib/schemas";
import { useConfigurator } from "@/store/configurator";
import { Chips, Honeypot, ReviewList, TextArea, TextField } from "./fields";
import { MultiStepForm, type FormStep } from "./MultiStepForm";

const ARTWORK_LABELS: Record<(typeof ARTWORK)[number], string> = {
  upload: "Upload my design",
  basic: "Free basic setup",
  professional: "Professional design",
};

const styleName = (slug: string) =>
  rigidStyles.find((s) => s.slug === slug)?.name ?? printedStyles.find((s) => s.slug === slug)?.name ?? slug;

export function QuoteForm() {
  const form = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      country: "",
      style: "",
      material: "",
      wrap: "",
      print: "",
      finishes: [],
      insert: "",
      links: "",
      notes: "",
      website: "",
    },
    mode: "onTouched",
  });
  const { register, formState, reset, getValues, setValue } = form;
  const e = formState.errors;
  const v = useWatch({ control: form.control });
  const [fromConfig, setFromConfig] = useState<string | null>(null);

  // Prefill from the configurator (?from=configurator) or a style page (?style=).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const applyConfig = () => {
      const c = useConfigurator.getState().config;
      reset({
        ...getValues(),
        boxType: c.type,
        style: styleName(c.style),
        length: c.dims.l,
        width: c.dims.w,
        height: c.dims.h,
        material: c.type === "printed" ? c.board : `${c.board} mm greyboard`,
        wrap: c.wrap,
        print: c.print,
        finishes: c.finishes,
        insert: c.insert ?? "None",
        quantity: c.quantity,
        ship: c.ship,
        artwork: c.artwork,
      });
      setFromConfig(formatMoney(estimate(c).total, "USD", { decimals: 0 }));
    };
    if (q.get("from") === "configurator") {
      if (useConfigurator.persist.hasHydrated()) applyConfig();
      return useConfigurator.persist.onFinishHydration(applyConfig);
    }
    const slug = q.get("style");
    if (slug) {
      const rigid = rigidStyles.find((s) => s.slug === slug);
      setValue("style", styleName(slug));
      setValue("boxType", rigid ? (rigid.collapsible ? "collapsible" : "rigid") : "printed");
    }
  }, [reset, getValues, setValue]);

  const num = { valueAsNumber: true } as const;

  const steps: FormStep<QuoteInput>[] = [
    {
      id: "contact",
      title: "Contact",
      fields: ["name", "email", "country"],
      content: (
        <div className="grid gap-8 sm:grid-cols-2">
          <TextField label="Name" reg={register("name")} error={e.name} autoComplete="name" />
          <TextField label="Email" type="email" reg={register("email")} error={e.email} autoComplete="email" />
          <TextField label="Company (optional)" reg={register("company")} error={e.company} autoComplete="organization" />
          <TextField label="Ship to (country)" reg={register("country")} error={e.country} autoComplete="country-name" />
          <Honeypot reg={register("website")} />
        </div>
      ),
    },
    {
      id: "box",
      title: "The box",
      fields: ["boxType", "style", "length", "width", "height"],
      content: (
        <>
          <Chips
            legend="Box type"
            reg={register("boxType")}
            error={e.boxType}
            options={BOX_TYPES.map((t) => ({ value: t, label: { rigid: "Rigid", collapsible: "Collapsible rigid", printed: "Printed" }[t] }))}
          />
          <TextField label="Style" reg={register("style")} error={e.style} hint="e.g. Magnetic closure, Mailer, Tuck end" />
          <div className="grid gap-8 sm:grid-cols-3">
            <TextField label="Length (mm)" type="number" inputMode="decimal" reg={register("length", num)} error={e.length} />
            <TextField label="Width (mm)" type="number" inputMode="decimal" reg={register("width", num)} error={e.width} />
            <TextField label="Height (mm)" type="number" inputMode="decimal" reg={register("height", num)} error={e.height} />
          </div>
        </>
      ),
    },
    {
      id: "specs",
      title: "Materials and finish",
      intro: "Leave anything blank you are unsure about; we will suggest options.",
      fields: [],
      content: (
        <div className="grid gap-8 sm:grid-cols-2">
          <TextField label="Board or material" reg={register("material")} error={e.material} />
          <TextField label="Wrap (rigid only)" reg={register("wrap")} error={e.wrap} />
          <TextField label="Print" reg={register("print")} error={e.print} hint="Outside, inside + outside, or none" />
          <TextField label="Insert" reg={register("insert")} error={e.insert} />
          <TextArea label="Finishes and notes" reg={register("notes")} error={e.notes} rows={2} hint="Foil, emboss, spot UV, soft-touch, or other notes" className="sm:col-span-2" />
        </div>
      ),
    },
    {
      id: "qty",
      title: "Quantity and shipping",
      fields: ["quantity", "ship"],
      content: (
        <>
          <TextField
            label="Quantity"
            type="number"
            inputMode="numeric"
            reg={register("quantity", num)}
            error={e.quantity}
            hint={`Rigid and collapsible MOQ is ${site.facts.rigidMoq} per design.`}
          />
          <Chips legend="Freight" reg={register("ship")} error={e.ship} options={SHIP_METHODS.map((s) => ({ value: s, label: s === "not sure" ? "Not sure" : s === "air" ? "Air" : "Sea" }))} />
        </>
      ),
    },
    {
      id: "artwork",
      title: "Artwork and files",
      fields: ["artwork"],
      content: (
        <>
          <Chips legend="Artwork" reg={register("artwork")} error={e.artwork} options={ARTWORK.map((a) => ({ value: a, label: ARTWORK_LABELS[a] }))} />
          <TextArea label="Links (optional)" reg={register("links")} error={e.links} rows={3} hint="Dielines, artwork, references. Large files: WeTransfer or Drive link." />
        </>
      ),
    },
    {
      id: "review",
      title: "Review",
      fields: [],
      content: (
        <>
          {fromConfig && (
            <p className="spec">
              From the configurator · estimate {fromConfig} (example rates, confirmed in our quote)
            </p>
          )}
          <ReviewList
            rows={[
              { label: "Contact", value: [v.name, v.email, v.company].filter(Boolean).join(" · ") },
              { label: "Ship to", value: v.country },
              { label: "Box", value: [v.boxType, v.style].filter(Boolean).join(" · ") },
              { label: "Size", value: v.length && v.width && v.height ? `${v.length} × ${v.width} × ${v.height} mm` : "" },
              { label: "Material", value: [v.material, v.wrap].filter(Boolean).join(" · ") },
              { label: "Print / insert", value: [v.print, v.insert].filter(Boolean).join(" · ") },
              { label: "Finishes", value: [...(v.finishes ?? []), v.notes].filter(Boolean).join(", ") },
              { label: "Quantity", value: Number.isFinite(v.quantity) ? v.quantity?.toLocaleString("en-US") : "" },
              { label: "Freight", value: v.ship },
              { label: "Artwork", value: v.artwork ? ARTWORK_LABELS[v.artwork] : "" },
              { label: "Links", value: v.links },
            ]}
          />
        </>
      ),
    },
  ];

  return (
    <MultiStepForm
      form={form}
      steps={steps}
      action={submitQuote}
      success={{
        title: "Quote request in.",
        body: `We reply within ${site.facts.quoteReplyHours} hours on working days with unit prices, tooling and freight for your quantity.`,
      }}
    />
  );
}
