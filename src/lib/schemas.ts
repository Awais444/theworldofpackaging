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

export const newsletterSchema = z.object({
  email: z.email("Enter a valid email address."),
  website: z.string().max(0).optional(), // honeypot
});

// ---- Quote request (/get-a-quote): 3 steps, design first, printing optional ----

export const QUOTE_NEEDS = ["design", "brand", "design-print", "print"] as const;
export type QuoteNeed = (typeof QUOTE_NEEDS)[number];
export const QUOTE_PRODUCTS = ["Cosmetic", "Skincare", "Food", "Snacks", "Coffee & Tea", "Supplement", "CBD", "Candle", "Pharma", "Apparel", "Other"] as const;
export const QUOTE_PACKAGING = ["Box", "Rigid box", "Label", "Pouch", "Bottle/Jar label", "Bag", "Not sure"] as const;
export const QUOTE_SKUS = ["1", "2–3", "4+"] as const;
export const QUOTE_QTY = ["500", "1,000", "2,500", "5,000+", "Not sure"] as const;
export const QUOTE_LOGO = ["Yes", "No", "Needs a refresh"] as const;
export const QUOTE_CONTACT = ["email", "whatsapp"] as const;

/** Printing is involved when either printing option is picked. */
export const needsPrinting = (needs: readonly QuoteNeed[]) => needs.includes("design-print") || needs.includes("print");
/** Brand identity on its own: no packaging questions. */
export const brandOnly = (needs: readonly QuoteNeed[]) => needs.length === 1 && needs[0] === "brand";

const optional = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

const needsField = z
  .array(z.enum(QUOTE_NEEDS))
  .min(1, "Pick at least one.")
  .refine((n) => !(n.includes("design-print") && n.includes("print")), "Pick design + printing or printing only, not both.");

const projectFields = z
  .object({
    needs: needsField,
    product: z.enum(QUOTE_PRODUCTS, { error: "Pick a product type." }),
    packaging: z.array(z.enum(QUOTE_PACKAGING)),
    skus: z.enum(QUOTE_SKUS, { error: "How many designs?" }),
    quantity: z.enum(QUOTE_QTY).optional(),
    country: optional(80),
    logo: z.enum(QUOTE_LOGO).optional(),
    about: optional(2000),
    links: optional(1000),
    source: optional(300),
  })
  .superRefine((d, ctx) => {
    if (!brandOnly(d.needs) && d.packaging.length === 0) ctx.addIssue({ code: "custom", path: ["packaging"], message: "Pick at least one, or Not sure." });
    if (brandOnly(d.needs) && !d.logo) ctx.addIssue({ code: "custom", path: ["logo"], message: "Do you have a logo already?" });
    if (needsPrinting(d.needs) && !d.quantity) ctx.addIssue({ code: "custom", path: ["quantity"], message: "Pick a quantity, or Not sure." });
    if (needsPrinting(d.needs) && !d.country?.trim()) ctx.addIssue({ code: "custom", path: ["country"], message: "Which country should we ship to?" });
  });

const detailFields = z
  .object({
    name: z.string().trim().min(2, "Tell us your name."),
    email: z.email("Enter a valid email address."),
    whatsapp: optional(40),
    company: optional(200),
    contactBy: z.enum(QUOTE_CONTACT),
  })
  .superRefine((d, ctx) => {
    if (d.contactBy === "whatsapp" && !d.whatsapp?.trim()) ctx.addIssue({ code: "custom", path: ["whatsapp"], message: "Add your WhatsApp number, with country code." });
  });

export const quoteStepSchemas = {
  needs: z.object({ needs: needsField }),
  project: projectFields,
  details: detailFields,
};

/** Full quote request, validated again on the server. */
export const quoteRequestSchema = z
  .object({ ...projectFields.shape, ...detailFields.shape, website: z.string().max(0).optional() }) // website = honeypot
  .superRefine((d, ctx) => {
    for (const schema of [projectFields, detailFields]) {
      const r = schema.safeParse(d);
      if (!r.success) for (const i of r.error.issues) ctx.addIssue({ code: "custom", path: i.path, message: i.message });
    }
  });
export type QuoteRequest = z.infer<typeof quoteRequestSchema>;
