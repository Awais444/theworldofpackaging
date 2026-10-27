/**
 * Single place for name, contact details and confirmed business facts (CLAUDE.md §3).
 * Metadata, footer, JSON-LD, OG images and copy all read from here.
 * Anything marked TODO is a placeholder to confirm before launch.
 */

export type CurrencyCode = "USD" | "GBP" | "EUR" | "CAD" | "AUD" | "AED";

const QUOTE_REPLY_HOURS = 24; // TODO confirm

export const site = {
  name: "The World of Packaging",
  shortName: "TWOP",
  tagline: "Packaging design and manufacturing under one roof.",
  pitch: "Packaging design and manufacturing under one roof: from first sketch to delivered box.",
  description:
    "Packaging design and branding agency with its own factory. Rigid boxes, collapsible rigid boxes and printed boxes, designed and made in-house and shipped worldwide.",
  url: "https://theworldofpackaging.com", // TODO confirm
  email: "hello@theworldofpackaging.com", // TODO confirm
  whatsapp: "+92 300 0000000", // TODO
  phone: "+92 300 0000000", // TODO
  address: "Factory address, Pakistan", // TODO
  hours: "Mon–Sat, 9:00–18:00 PKT", // TODO
  country: "Pakistan",
  markets: ["USA", "UK", "Canada", "Australia", "UAE", "EU"],
  socials: { instagram: "", linkedin: "", facebook: "", pinterest: "", behance: "" }, // TODO
  facts: {
    rigidMoq: 500,
    collapsibleMoq: 500,
    printedMoq: null as number | null, // TODO
    rigidLeadTime: "TODO", // e.g. "3–4 weeks"
    printedLeadTime: "TODO",
    quoteReply: `within ${QUOTE_REPLY_HOURS} hours`,
    quoteReplyHours: QUOTE_REPLY_HOURS,
    firstConceptHours: 48, // TODO confirm
  },
  currency: {
    base: "USD" as CurrencyCode,
    // TODO: static display rates for the configurator, update periodically. 1 USD = rate.
    rates: { USD: 1, GBP: 0.79, EUR: 0.92, CAD: 1.37, AUD: 1.52, AED: 3.67 } satisfies Record<CurrencyCode, number>,
  },
} as const;

export type Site = typeof site;

/** Lead time for display; neutral wording until the real figure is set. */
export function leadTimeLabel(value: string = site.facts.rigidLeadTime) {
  return value === "TODO" ? "Confirmed with your quote" : value;
}

/** WhatsApp click-to-chat URL built from the configured number. */
export function whatsappUrl(message?: string) {
  const digits = site.whatsapp.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/$/, "");
}
