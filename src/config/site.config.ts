/**
 * Single source of truth for company identity and confirmed business facts.
 * Every page, metadata block, footer, JSON-LD schema and OG image reads from here.
 * Anything marked TODO is a placeholder that must be confirmed before launch.
 */

export type CurrencyCode = "USD" | "GBP" | "EUR" | "CAD" | "AUD" | "AED";

export const site = {
  name: "Studio Name", // TODO: final company name
  shortName: "Studio", // TODO
  tagline: "Brand. Packaging. Made in-house.",
  description:
    "Packaging design and branding studio with its own rigid box factory. We design your brand, engineer your packaging and manufacture it, in one place.",
  domain: "https://example.com", // TODO
  email: "hello@example.com", // TODO
  whatsapp: "+920000000000", // TODO
  address: "Factory address, Pakistan", // TODO
  country: "Pakistan",
  markets: ["USA", "UK", "Canada", "Australia", "UAE", "EU"],
  socials: {
    instagram: "", // TODO
    linkedin: "", // TODO
    behance: "", // TODO
    pinterest: "", // TODO
  },
  facts: {
    rigidMoq: 500,
    collapsibleMoq: 500,
    printedMoq: null as number | null, // TODO
    rigidLeadTimeDays: null as [number, number] | null, // TODO e.g. [21, 28]
    firstConceptHours: 48, // TODO confirm
    quoteReplyHours: 24, // TODO confirm
  },
  currency: {
    base: "USD" as CurrencyCode,
    // TODO: static display rates, update periodically. 1 USD = rate.
    rates: { USD: 1, GBP: 0.79, EUR: 0.92, CAD: 1.37, AUD: 1.52, AED: 3.67 } satisfies Record<
      CurrencyCode,
      number
    >,
  },
} as const;

export type Site = typeof site;

/** Human-readable lead time, or neutral wording when not yet confirmed. */
export function leadTimeLabel(days: readonly [number, number] | null = site.facts.rigidLeadTimeDays) {
  return days ? `${days[0]}–${days[1]} days` : "Confirmed with quote";
}

/** WhatsApp click-to-chat URL built from the configured number. */
export function whatsappUrl(message?: string) {
  const digits = site.whatsapp.replace(/[^\d]/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || site.domain).replace(/\/$/, "");
}
