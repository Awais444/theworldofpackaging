import { z } from "zod";

export const NEEDS = ["Branding", "Packaging design", "Manufacturing", "All of it"] as const;
// TODO: confirm budget bands with sales.
export const BUDGETS = ["Under $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Not sure yet"] as const;

export const inlineContactSchema = z.object({
  name: z.string().trim().min(2, "Tell us your name."),
  email: z.email("Enter a valid email address."),
  needs: z.array(z.enum(NEEDS)).min(1, "Pick at least one."),
  budget: z.enum(BUDGETS, { error: "Pick a budget range." }),
  /** Honeypot: real visitors never see or fill this. */
  website: z.string().max(0).optional(),
});

export type InlineContactInput = z.infer<typeof inlineContactSchema>;

const optionalText = z.string().trim().max(2000).optional().or(z.literal(""));
const contact = {
  name: z.string().trim().min(2, "Tell us your name."),
  email: z.email("Enter a valid email address."),
  company: optionalText,
  country: z.string().trim().min(2, "Which country should we ship to?"),
  website: z.string().max(0).optional(), // honeypot
};

export const STAGES = ["New brand", "Existing brand", "Rebrand"] as const;
export const QTY_BANDS = ["Under 500", "500 – 1,000", "1,000 – 5,000", "5,000+", "Not sure yet"] as const;
export const TIMELINES = ["As soon as possible", "1 – 2 months", "3 – 6 months", "Flexible"] as const;

export const PROJECT_SERVICES = ["Brand identity", "Logo", "Packaging design", "Labels", "Production"] as const;

export const projectSchema = z.object({
  ...contact,
  brandName: optionalText,
  brandWebsite: optionalText,
  product: z.string().trim().min(10, "A sentence or two about the product helps us a lot."),
  stage: z.enum(STAGES, { error: "Pick one." }),
  services: z.array(z.enum(PROJECT_SERVICES)).min(1, "Pick at least one."),
  quantity: z.enum(QTY_BANDS, { error: "Pick a range." }),
  timeline: z.enum(TIMELINES, { error: "Pick a timeline." }),
  budget: z.enum(BUDGETS, { error: "Pick a budget range." }),
  links: optionalText,
  notes: optionalText,
});
export type ProjectInput = z.infer<typeof projectSchema>;

/** Homepage "Start your project" form: three fields. */

export const newsletterSchema = z.object({
  email: z.email("Enter a valid email address."),
  website: z.string().max(0).optional(), // honeypot
});

// ---- Quote builder (/get-a-quote, CLAUDE.md §10.1) ----

export const QUOTE_CATEGORIES = ["rigid", "collapsible", "printed", "unsure"] as const;
export const QUOTE_QTY_PRESETS = [500, 1000, 2500, 5000] as const;
export const QUOTE_ARTWORK = ["have", "basic", "design"] as const;
export const QUOTE_SHIP = ["air", "sea", "unsure"] as const;
export const QUOTE_PACKING = ["assembled", "flat"] as const;
export const DIM_UNITS = ["mm", "in"] as const;

/** Rigid and collapsible quotes start at the MOQ; printed and "not sure" accept smaller asks. */
export const quoteMinQty = (category: (typeof QUOTE_CATEGORIES)[number]) => (category === "rigid" || category === "collapsible" ? 500 : 100);

const toMm = (v: number, unit: (typeof DIM_UNITS)[number]) => (unit === "in" ? v * 25.4 : v);

export const quoteStepSchemas = {
  category: z.object({ category: z.enum(QUOTE_CATEGORIES, { error: "Pick a box category." }) }),
  style: z.object({ style: z.string().min(1, "Pick a style, or choose Not sure.") }),
  size: z
    .object({
      helpChoose: z.boolean(),
      unit: z.enum(DIM_UNITS),
      length: z.number().optional(),
      width: z.number().optional(),
      height: z.number().optional(),
    })
    .superRefine((d, ctx) => {
      if (d.helpChoose) return;
      for (const k of ["length", "width", "height"] as const) {
        const v = d[k];
        if (v === undefined || Number.isNaN(v)) ctx.addIssue({ code: "custom", path: [k], message: "Enter a number." });
        else if (toMm(v, d.unit) < 20 || toMm(v, d.unit) > 1000) ctx.addIssue({ code: "custom", path: [k], message: d.unit === "mm" ? "Between 20 and 1000 mm." : "Between 0.8 and 39 in." });
      }
    }),
  quantity: z.object({ category: z.enum(QUOTE_CATEGORIES), quantity: z.number({ error: "Enter a quantity." }).int("Whole boxes only.") }).superRefine((d, ctx) => {
    const min = quoteMinQty(d.category);
    if (d.quantity < min) ctx.addIssue({ code: "custom", path: ["quantity"], message: `Minimum is ${min} boxes for this category.` });
  }),
  materials: z.object({ materials: z.array(z.string()), finishes: z.array(z.string()) }),
  artwork: z.object({ artwork: z.enum(QUOTE_ARTWORK, { error: "Pick an artwork option." }), files: z.array(z.string().max(200)).max(10) }),
  shipping: z
    .object({
      country: z.string().trim().min(2, "Which country should we ship to?"),
      ship: z.enum(QUOTE_SHIP, { error: "Pick air, sea or not sure." }),
      category: z.enum(QUOTE_CATEGORIES),
      packing: z.enum(QUOTE_PACKING).optional(),
    })
    .superRefine((d, ctx) => {
      if (d.category === "collapsible" && !d.packing) ctx.addIssue({ code: "custom", path: ["packing"], message: "Assembled or flat?" });
    }),
  contact: z.object({
    name: z.string().trim().min(2, "Tell us your name."),
    email: z.email("Enter a valid email address."),
    company: z.string().trim().max(200).optional(),
    whatsapp: z.string().trim().max(40).optional(),
    notes: z.string().trim().max(2000).optional(),
  }),
};

/** Full quote request, validated again on the server. */
export const quoteRequestSchema = z
  .object({
    ...quoteStepSchemas.category.shape,
    ...quoteStepSchemas.style.shape,
    helpChoose: z.boolean(),
    unit: z.enum(DIM_UNITS),
    length: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    quantity: z.number().int(),
    ...quoteStepSchemas.materials.shape,
    ...quoteStepSchemas.artwork.shape,
    country: z.string().trim().min(2),
    ship: z.enum(QUOTE_SHIP),
    packing: z.enum(QUOTE_PACKING).optional(),
    ...quoteStepSchemas.contact.shape,
    website: z.string().max(0).optional(), // honeypot
  })
  .superRefine((d, ctx) => {
    for (const [key, schema] of [
      ["size", quoteStepSchemas.size],
      ["quantity", quoteStepSchemas.quantity],
      ["shipping", quoteStepSchemas.shipping],
    ] as const) {
      const r = schema.safeParse(d);
      if (!r.success) ctx.addIssue({ code: "custom", path: [key], message: r.error.issues[0]?.message ?? "Invalid" });
    }
  });
export type QuoteRequest = z.infer<typeof quoteRequestSchema>;
