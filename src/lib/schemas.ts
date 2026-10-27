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

export const projectSchema = z.object({
  ...contact,
  brandName: optionalText,
  product: z.string().trim().min(10, "A sentence or two about the product helps us a lot."),
  stage: z.enum(STAGES, { error: "Pick one." }),
  needs: z.array(z.enum(NEEDS)).min(1, "Pick at least one."),
  quantity: z.enum(QTY_BANDS, { error: "Pick a range." }),
  timeline: z.enum(TIMELINES, { error: "Pick a timeline." }),
  budget: z.enum(BUDGETS, { error: "Pick a budget range." }),
  links: optionalText,
  notes: optionalText,
});
export type ProjectInput = z.infer<typeof projectSchema>;

export const BOX_TYPES = ["rigid", "collapsible", "printed"] as const;
export const SHIP_METHODS = ["air", "sea", "not sure"] as const;
export const ARTWORK = ["upload", "basic", "professional"] as const;

const dim = z.number({ error: "Enter a number in mm." }).min(30, "At least 30 mm.").max(600, "At most 600 mm.");

export const quoteSchema = z.object({
  ...contact,
  boxType: z.enum(BOX_TYPES, { error: "Pick a box type." }),
  style: z.string().trim().min(2, "Which style?"),
  length: dim,
  width: dim,
  height: dim,
  material: optionalText,
  wrap: optionalText,
  print: optionalText,
  finishes: z.array(z.string()).optional(),
  insert: optionalText,
  quantity: z.number({ error: "Enter a quantity." }).int().min(100, "Quantities start at 100 for a quote; rigid MOQ is 500."),
  ship: z.enum(SHIP_METHODS, { error: "Pick a freight option." }),
  artwork: z.enum(ARTWORK, { error: "Pick an artwork option." }),
  links: optionalText,
  notes: optionalText,
});
export type QuoteInput = z.infer<typeof quoteSchema>;

export const checkoutSchema = z.object({
  name: contact.name,
  email: contact.email,
  company: optionalText,
  address: z.string().trim().min(5, "Enter a street address."),
  city: z.string().trim().min(2, "Enter a city."),
  postcode: z.string().trim().min(2, "Enter a postcode or ZIP."),
  country: contact.country,
  phone: optionalText,
});
export type CheckoutInput = z.infer<typeof checkoutSchema>;
