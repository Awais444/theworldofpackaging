import { site } from "@/config/site";
import type { Faq } from "./rigidStyles";

/** Finishes that suit each industry (CLAUDE.md §7.4 "Finishes that work"). */
export const industryFinishes: Record<string, string[]> = {
  cosmetics: ["Soft-touch lamination", "Gold foil", "Spot UV", "Embossing", "Window patch"],
  perfume: ["Hot foil blocking", "Embossing", "Linen wrap", "Velvet-lined EVA", "Debossing"],
  jewelry: ["Linen wrap", "Foil logo", "Velvet insert", "Satin cushion", "Leatherette"],
  watches: ["Leatherette wrap", "Debossing", "Satin cushion", "Foil logo", "Magnetic closure"],
  supplements: ["Matte lamination", "Spot UV", "Pantone brand colours", "Hang tab", "Tamper seal stickers"],
  "food-bakery": ["Window patch", "Kraft board", "Matte lamination", "Food-contact board", "Handle"],
  chocolates: ["Gold foil", "Embossing", "Specialty paper wrap", "Card insert", "Ribbon pull"],
  cbd: ["Soft-touch lamination", "Spot UV", "Kraft board", "Foil logo", "Child-resistant options on request"],
  candles: ["Kraft wrap", "Debossing", "Foil logo", "EVA or card insert", "Specialty paper"],
  apparel: ["Inside print", "Tissue and sticker seals", "Kraft board", "Ribbon pull", "Matte lamination"],
  electronics: ["Soft-touch lamination", "Multi-layer EVA", "Spot UV", "Magnetic closure", "Moulded pulp"],
  "gifts-pr-kits": ["Foil logo", "Custom multi-cavity insert", "Inside print", "Ribbon", "Magnetic closure"],
};

/** Which sample case study to show per industry (by case study slug). */
export const industryCase: Record<string, string> = {
  cosmetics: "halden-apothecary",
  perfume: "halden-apothecary",
  supplements: "halden-apothecary",
  cbd: "halden-apothecary",
  jewelry: "kiri-atelier",
  watches: "kiri-atelier",
  "food-bakery": "ostra-tea",
  chocolates: "ostra-tea",
  candles: "marrow-and-vale",
  apparel: "marrow-and-vale",
  electronics: "kiri-atelier",
  "gifts-pr-kits": "marrow-and-vale",
};

/** Shared questions so every industry page has five FAQs. */
export const industrySharedFaqs: Faq[] = [
  { q: "What is the minimum order?", a: `${site.facts.rigidMoq} boxes per design for rigid and collapsible rigid boxes. Printed box minimums are confirmed with your quote.` },
  { q: "Can I get a sample first?", a: "Yes. We make a physical sample with your materials and finishes. The fee is credited to your bulk order." },
  { q: "Do you add the regulatory text for my market?", a: "We lay out the text you supply on the box. The wording itself must come from you or your compliance adviser." },
  { q: "Do you ship to my country?", a: "Yes, by air or sea to the USA, UK, Canada, Australia, the UAE, the EU and more." },
];
