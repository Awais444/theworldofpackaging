import { printedStyles } from "@/content/printedStyles";
import { rigidStyles } from "@/content/rigidStyles";
import type { QuoteBoxOption } from "@/lib/quotePrefill";

/** Box styles a ?box= link can preselect in the quote form. Names only: the full style content stays on the server. */
export const quoteBoxes: QuoteBoxOption[] = [
  ...rigidStyles.map((s) => ({ slug: s.slug, name: s.name, rigid: true })),
  ...printedStyles.map((s) => ({ slug: s.slug, name: s.name, rigid: false })),
];
