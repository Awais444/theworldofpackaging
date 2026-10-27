import type { Faq } from "./rigidStyles";

/** Market details per ship-to page. TODO: real transit times from your freight partner. */
export const shipToDetails: Record<string, { currency: string; currencyCode: string; popular: Array<{ kind: "rigid" | "printed"; slug: string }>; faqs: Faq[] }> = {
  usa: {
    currency: "US dollar",
    currencyCode: "USD",
    popular: [{ kind: "printed", slug: "mailer" }, { kind: "rigid", slug: "magnetic-closure" }, { kind: "rigid", slug: "collapsible" }, { kind: "printed", slug: "tuck-end" }],
    faqs: [{ q: "Can you deliver to my 3PL or Amazon prep centre?", a: "Yes. Give us the address and any labelling rules and we pack to suit." }],
  },
  uk: {
    currency: "Pound sterling",
    currencyCode: "GBP",
    popular: [{ kind: "rigid", slug: "magnetic-closure" }, { kind: "printed", slug: "mailer" }, { kind: "rigid", slug: "drawer" }, { kind: "rigid", slug: "collapsible" }],
    faqs: [{ q: "Do I need an EORI number?", a: "Usually yes for UK imports. Your customs broker can confirm what you need." }],
  },
  canada: {
    currency: "Canadian dollar",
    currencyCode: "CAD",
    popular: [{ kind: "printed", slug: "mailer" }, { kind: "rigid", slug: "lid-and-base" }, { kind: "printed", slug: "folding-carton" }, { kind: "rigid", slug: "collapsible" }],
    faqs: [{ q: "Can you label cartons in English and French?", a: "We can print the carton labels you supply in both languages." }],
  },
  australia: {
    currency: "Australian dollar",
    currencyCode: "AUD",
    popular: [{ kind: "rigid", slug: "collapsible" }, { kind: "printed", slug: "mailer" }, { kind: "rigid", slug: "magnetic-closure" }, { kind: "printed", slug: "shipping" }],
    faqs: [{ q: "Are there rules for packing materials?", a: "Australia has biosecurity rules for some packing materials. We use treated or exempt materials; your broker confirms requirements." }], // TODO verify
  },
  uae: {
    currency: "UAE dirham",
    currencyCode: "AED",
    popular: [{ kind: "rigid", slug: "shoulder-neck" }, { kind: "rigid", slug: "magnetic-closure" }, { kind: "rigid", slug: "book-style" }, { kind: "rigid", slug: "drawer" }],
    faqs: [{ q: "Do you make boxes for perfume and oud?", a: "Yes. Shoulder-neck and magnetic rigid boxes with fitted inserts are popular for fragrance." }],
  },
  germany: {
    currency: "Euro",
    currencyCode: "EUR",
    popular: [{ kind: "printed", slug: "mailer" }, { kind: "rigid", slug: "lid-and-base" }, { kind: "printed", slug: "folding-carton" }, { kind: "rigid", slug: "collapsible" }],
    faqs: [{ q: "Do I need to register packaging in Germany?", a: "Brands selling packaged goods in Germany usually register with the packaging register (LUCID). Check your obligations with an adviser." }], // TODO verify
  },
};

export const shipToSharedFaqs: Faq[] = [
  { q: "Air or sea?", a: "Air for samples and urgent stock; sea for production volumes. We quote both on request." },
  { q: "Who pays import duties?", a: "Usually the importer. We can quote delivered-duty-paid where possible." }, // TODO confirm DDP availability
  { q: "How long does shipping take?", a: "Transit time depends on the route and service. We confirm it with your quote." }, // TODO real transit times
  { q: "Can collapsible boxes cut my freight cost?", a: "Yes. They ship flat, so more boxes fit per carton. We compare both options in your quote." },
];
