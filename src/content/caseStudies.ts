import type { MediaSlotId } from "./media";

export type WorkCategory = "Branding" | "Packaging" | "Rigid" | "Printed";

export type CaseSection = { heading: string; body: string; mediaSlot?: MediaSlotId };

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  services: string[];
  categories: WorkCategory[];
  year: number;
  summary: string;
  coverSlot: MediaSlotId;
  /** Spec line shown on cards, e.g. box style and board. */
  spec: string[];
  sections: CaseSection[];
  /** True until replaced with a real client project. Shows a "Sample project" badge. */
  placeholder: boolean;
};

/** Slot ids for a case study's in-page images (see media.ts). */
export const caseSlot = (slug: string, part: "identity" | "packaging" | "production") => `case-${slug}-${part}`;

const RESULTS_PLACEHOLDER =
  "Placeholder: describe what changed after launch in the client's own words. Use real, approved figures only.";

// TODO: replace all four with real projects. Brand names are fictional on purpose.
export const caseStudies: CaseStudy[] = [
  {
    slug: "halden-apothecary",
    client: "Halden Apothecary",
    industry: "Cosmetics",
    services: ["Brand identity", "Packaging design", "Rigid boxes"],
    categories: ["Branding", "Packaging", "Rigid"],
    year: 2026,
    summary: "A skincare launch: identity, a three-SKU packaging system and a magnetic gift box with a foiled lid.",
    coverSlot: "case-halden-cover",
    spec: ["Magnetic closure", "2.0 mm board", "Gold foil"],
    sections: [
      { heading: "Challenge", body: "A new skincare line needed a brand, retail cartons for three products and a gift box for launch, all ready for one production window." },
      { heading: "Strategy", body: "Position the range as quiet and clinical rather than decorative, so the gift box could carry the only flourish: a foil mark on the lid." },
      { heading: "Identity", body: "A narrow serif wordmark, an apothecary-label layout and a palette of two greys with one mineral green.", mediaSlot: caseSlot("halden-apothecary", "identity") },
      { heading: "Packaging & structure", body: "Tuck end cartons for each SKU and a magnetic rigid box with an EVA insert holding all three.", mediaSlot: caseSlot("halden-apothecary", "packaging") },
      { heading: "Production", body: "Cartons and rigid boxes printed and made in our factory, with the foil die shared across both.", mediaSlot: caseSlot("halden-apothecary", "production") },
      { heading: "Results", body: RESULTS_PLACEHOLDER },
    ],
    placeholder: true,
  },
  {
    slug: "ostra-tea",
    client: "Ostra Tea Co.",
    industry: "Food & beverage",
    services: ["Packaging design", "Printed boxes"],
    categories: ["Packaging", "Printed"],
    year: 2026,
    summary: "Subscription mailers printed inside and out, with a dieline built around a tin and two sachets.",
    coverSlot: "case-ostra-cover",
    spec: ["Mailer", "E-flute", "CMYK inside + out"],
    sections: [
      { heading: "Challenge", body: "A monthly tea subscription was shipping in plain mailers with loose contents that rattled in transit." },
      { heading: "Strategy", body: "Make the box itself the monthly moment: a printed interior that changes each season, on a structure that stays the same." },
      { heading: "Identity", body: "The existing logo was kept; we added an illustrated pattern system for the interior print.", mediaSlot: caseSlot("ostra-tea", "identity") },
      { heading: "Packaging & structure", body: "An E-flute mailer with a folded card insert that locks one tin and two sachets in place.", mediaSlot: caseSlot("ostra-tea", "packaging") },
      { heading: "Production", body: "Printed CMYK inside and out, die-cut and folded in-house, shipped flat to the fulfilment partner.", mediaSlot: caseSlot("ostra-tea", "production") },
      { heading: "Results", body: RESULTS_PLACEHOLDER },
    ],
    placeholder: true,
  },
  {
    slug: "kiri-atelier",
    client: "Kiri Atelier",
    industry: "Jewellery",
    services: ["Brand identity", "Brand guidelines"],
    categories: ["Branding"],
    year: 2025,
    summary: "A wordmark, palette and pattern system for a small-batch jeweller, built to work at ring-box scale.",
    coverSlot: "case-kiri-cover",
    spec: ["Identity", "Guidelines", "Pattern system"],
    sections: [
      { heading: "Challenge", body: "A jeweller selling at markets and online had a hand-drawn logo that broke down when foiled on small boxes." },
      { heading: "Strategy", body: "Keep the handmade warmth, but rebuild the mark so it survives 10 mm foil and one-colour print." },
      { heading: "Identity", body: "A redrawn wordmark, a compact monogram for ring boxes and a repeat pattern for tissue and inner lids.", mediaSlot: caseSlot("kiri-atelier", "identity") },
      { heading: "Packaging & structure", body: "Applied to drawer boxes and pouches, with guidelines for the printer on foil size limits.", mediaSlot: caseSlot("kiri-atelier", "packaging") },
      { heading: "Production", body: "Foil tests run on our press at three sizes to set the minimum size in the guidelines.", mediaSlot: caseSlot("kiri-atelier", "production") },
      { heading: "Results", body: RESULTS_PLACEHOLDER },
    ],
    placeholder: true,
  },
  {
    slug: "marrow-and-vale",
    client: "Marrow & Vale",
    industry: "Candles",
    services: ["Packaging design", "Collapsible rigid boxes"],
    categories: ["Packaging", "Rigid"],
    year: 2025,
    summary: "Collapsible rigid boxes for a candle brand shipping to the US, packed flat to cut freight volume.",
    coverSlot: "case-marrow-cover",
    spec: ["Collapsible rigid", "Ships flat", "Linen wrap"],
    sections: [
      { heading: "Challenge", body: "Fixed rigid boxes were filling containers with air on the way to a US warehouse." },
      { heading: "Strategy", body: "Switch to collapsible construction without losing the linen-wrapped feel customers associated with the brand." },
      { heading: "Identity", body: "Existing brand kept; packaging graphics simplified to a debossed mark on linen.", mediaSlot: caseSlot("marrow-and-vale", "identity") },
      { heading: "Packaging & structure", body: "A collapsible rigid box with a card insert sized for two candle diameters.", mediaSlot: caseSlot("marrow-and-vale", "packaging") },
      { heading: "Production", body: "Made, packed flat and shipped by sea in our export cartons.", mediaSlot: caseSlot("marrow-and-vale", "production") },
      { heading: "Results", body: RESULTS_PLACEHOLDER },
    ],
    placeholder: true,
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
