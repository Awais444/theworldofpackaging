import { site } from "@/config/site";
import type { IllustrationKey } from "@/components/illustrations";

export type Faq = { q: string; a: string };
export type PriceTier = { qty: number; unitUsd: number | null };

export type RigidStyle = {
  slug: string;
  name: string;
  /** Short spec name used in labels, e.g. "Magnetic". */
  short: string;
  summary: string;
  description: string;
  moq: number;
  boardMm: number[];
  closures: string[];
  inserts: string[];
  wraps: string[];
  finishes: string[];
  collapsible: boolean;
  industries: string[];
  priceFrom?: number;
  /** Placeholder price table. TODO: real unit prices per tier. */
  priceTiers: PriceTier[];
  illustration: IllustrationKey;
  /** Hero slot followed by gallery slots (see media.ts). */
  mediaSlots: string[];
  faqs: Faq[];
};

const WRAPS = ["Printed art paper", "Specialty textured paper", "Linen cloth", "Leatherette", "Kraft paper"];
const FINISHES = ["Hot foil blocking", "Embossing", "Debossing", "Spot UV", "Soft-touch lamination"];
const INSERTS = ["EVA foam", "Velvet-lined EVA", "Card insert", "Satin cushion"];
const TIERS: PriceTier[] = [500, 1000, 2500, 5000].map((qty) => ({ qty, unitUsd: null })); // TODO

const slots = (slug: string) => [`rigid-${slug}-hero`, ...Array.from({ length: 6 }, (_, i) => `rigid-${slug}-gallery-${i + 1}`)];

/** Questions every rigid style answers the same way. */
export const rigidCommonFaqs: Faq[] = [
  {
    q: "What is the minimum order?",
    a: `${site.facts.rigidMoq} boxes per design. Several sizes in one order can be discussed, but each size needs its own tooling.`,
  },
  {
    q: "How do I approve the design before printing?",
    a: "You get a digital proof (PDF with dieline, colours and copy) and a 3D mockup with your board, wrap and finishes. Nothing is printed until you approve.",
  },
  {
    q: "Do you design the artwork too?",
    a: "If you need it. You can send print-ready files, take our free basic setup, or have our studio design the packaging properly.",
  },
];

export const rigidStyles: RigidStyle[] = [
  {
    slug: "magnetic-closure",
    name: "Magnetic Closure Box",
    short: "Magnetic",
    summary: "A hinged lid with a front flap that closes on hidden magnets. The default luxury gift box.",
    description:
      "The lid wraps the back of the box and folds over the front, where two magnets sit under the wrap paper. It opens with a satisfying pull and closes on its own, so it works as a keepsake long after the product is gone.",
    moq: site.facts.rigidMoq,
    boardMm: [1.5, 2.0, 2.5, 3.0],
    closures: ["Concealed magnets", "Ribbon pull tab"],
    inserts: INSERTS,
    wraps: WRAPS,
    finishes: FINISHES,
    collapsible: false,
    industries: ["cosmetics", "perfume", "gifts-pr-kits", "watches", "electronics"],
    priceTiers: TIERS,
    illustration: "magnetic-closed",
    mediaSlots: slots("magnetic-closure"),
    faqs: [
      {
        q: "How strong are the magnets?",
        a: "Strong enough to keep the lid shut when the box is lifted by its sides. We size them to the lid weight on each project.",
      },
    ],
  },
  {
    slug: "lid-and-base",
    name: "Lid & Base Box",
    short: "Lid & base",
    summary: "Two-piece rigid box: a base and a separate lid that slides over it. Clean, classic, very versatile.",
    description:
      "The most adaptable rigid construction. Lid depth can be full (covering the whole base) or partial (showing a band of the base in a second colour), and the slight air resistance as the lid lifts reads as quality.",
    moq: site.facts.rigidMoq,
    boardMm: [1.5, 2.0, 2.5],
    closures: ["Friction fit", "Full-depth lid", "Partial-depth lid"],
    inserts: INSERTS,
    wraps: WRAPS,
    finishes: FINISHES,
    collapsible: false,
    industries: ["chocolates", "apparel", "jewelry", "electronics", "candles"],
    priceTiers: TIERS,
    illustration: "lid-and-base",
    mediaSlots: slots("lid-and-base"),
    faqs: [
      {
        q: "Full or partial lid depth?",
        a: "Full depth looks seamless and protects more. Partial depth shows the base wrap and lets you use two contrasting papers.",
      },
    ],
  },
  {
    slug: "drawer",
    name: "Drawer Box",
    short: "Drawer",
    summary: "A rigid tray that slides out of an outer sleeve, pulled by a ribbon or thumb cut.",
    description:
      "The slide-out reveal suits jewellery, cosmetics sets and small accessories. Both the sleeve and the tray are rigid board, so the drawer runs smoothly and the sleeve keeps its shape.",
    moq: site.facts.rigidMoq,
    boardMm: [1.5, 2.0],
    closures: ["Ribbon pull", "Thumb cut", "Leather tab"],
    inserts: INSERTS,
    wraps: WRAPS,
    finishes: FINISHES,
    collapsible: false,
    industries: ["jewelry", "cosmetics", "chocolates", "gifts-pr-kits"],
    priceTiers: TIERS,
    illustration: "drawer",
    mediaSlots: slots("drawer"),
    faqs: [
      {
        q: "Will the drawer slide out by itself?",
        a: "No. We set the tolerance between tray and sleeve so the drawer holds in place but pulls out without force.",
      },
    ],
  },
  {
    slug: "book-style",
    name: "Book Style Box",
    short: "Book",
    summary: "Opens like a hardback: a cover hinged on a spine, closing over a rigid tray.",
    description:
      "The spine gives you a third face for branding and makes the box stand on a shelf. Covers close with magnets or a ribbon, and the inside of the cover can carry a printed message.",
    moq: site.facts.rigidMoq,
    boardMm: [2.0, 2.5, 3.0],
    closures: ["Concealed magnets", "Ribbon tie"],
    inserts: INSERTS,
    wraps: WRAPS,
    finishes: FINISHES,
    collapsible: false,
    industries: ["watches", "gifts-pr-kits", "electronics", "perfume"],
    priceTiers: TIERS,
    illustration: "book-style",
    mediaSlots: slots("book-style"),
    faqs: [
      {
        q: "Can the inside cover be printed?",
        a: "Yes. The inner cover is a separate wrap, so it can carry a different print, a pocket for a card, or a foil message.",
      },
    ],
  },
  {
    slug: "collapsible",
    name: "Collapsible Rigid Box",
    short: "Collapsible",
    summary: "Rigid box with hinged walls that ships flat and snaps upright on arrival.",
    description:
      "Same greyboard, wraps and finishes as a fixed rigid box, but the walls fold into the base. That cuts carton volume for international freight and warehouse storage, which matters most when shipping from our factory to your market.",
    moq: site.facts.collapsibleMoq,
    boardMm: [1.5, 2.0, 2.5],
    closures: ["Magnetic flap lid", "Ribbon closure"],
    inserts: ["Card insert", "EVA foam (packed separately)"],
    wraps: WRAPS,
    finishes: FINISHES,
    collapsible: true,
    industries: ["apparel", "candles", "cosmetics", "gifts-pr-kits"],
    priceTiers: TIERS,
    illustration: "collapsible-assembled",
    mediaSlots: slots("collapsible"),
    faqs: [
      {
        q: "Is a collapsible box as strong as a fixed one?",
        a: "Once assembled it uses the same board thickness. Double-sided tape or magnets in the walls lock it upright.",
      },
    ],
  },
  {
    slug: "shoulder-neck",
    name: "Shoulder Neck Box",
    short: "Shoulder neck",
    summary: "Three-piece box: base, raised neck and lid. The neck shows as a contrast band when closed.",
    description:
      "The inner neck sits higher than the base, so the lid rests on a shoulder and leaves a visible band. It is the most premium-feeling two-part construction and a natural fit for perfume and spirits.",
    moq: site.facts.rigidMoq,
    boardMm: [2.0, 2.5, 3.0],
    closures: ["Friction fit on neck"],
    inserts: INSERTS,
    wraps: WRAPS,
    finishes: FINISHES,
    collapsible: false,
    industries: ["perfume", "cosmetics", "gifts-pr-kits"],
    priceTiers: TIERS,
    illustration: "shoulder-neck",
    mediaSlots: slots("shoulder-neck"),
    faqs: [
      {
        q: "Can the neck be a different colour?",
        a: "That is the point of it. The neck is wrapped separately, often in a contrast paper or a foil-blocked band.",
      },
    ],
  },
  {
    slug: "tube",
    name: "Rigid Tube",
    short: "Tube",
    summary: "Cylindrical rigid box with a lid, for candles, bottles, tea and rolled goods.",
    description:
      "Spiral- or convolute-wound board tubes wrapped in printed paper, with a matching lid and an optional inner neck. Ends can be board or metal.",
    moq: site.facts.rigidMoq,
    boardMm: [1.5, 2.0],
    closures: ["Lid over neck", "Lid over body"],
    inserts: ["EVA foam disc", "Card insert"],
    wraps: ["Printed art paper", "Specialty textured paper", "Kraft paper"],
    finishes: ["Hot foil blocking", "Spot UV", "Soft-touch lamination", "Embossing"],
    collapsible: false,
    industries: ["candles", "perfume", "food-bakery", "apparel"],
    priceTiers: TIERS,
    illustration: "tube",
    mediaSlots: slots("tube"),
    faqs: [
      {
        q: "What diameters can you make?",
        a: "Tubes are made on mandrels per diameter. Tell us the product size and we will confirm the closest tooling.",
      },
    ],
  },
  {
    slug: "window",
    name: "Window Rigid Box",
    short: "Window",
    summary: "Rigid box with a die-cut window in the lid, backed with clear film to show the product.",
    description:
      "The window is cut before wrapping and backed with PET film, so the edge stays clean. Shapes can follow your logo or product outline.",
    moq: site.facts.rigidMoq,
    boardMm: [1.5, 2.0],
    closures: ["Lid & base", "Magnetic flap"],
    inserts: INSERTS,
    wraps: ["Printed art paper", "Specialty textured paper", "Kraft paper"],
    finishes: FINISHES,
    collapsible: false,
    industries: ["chocolates", "food-bakery", "cosmetics", "candles"],
    priceTiers: TIERS,
    illustration: "window-box",
    mediaSlots: slots("window"),
    faqs: [
      {
        q: "Is the window film food safe?",
        a: "We can use food-contact grade PET where needed. Tell us if the product touches the film directly.",
      },
    ],
  },
];

export function getRigidStyle(slug: string) {
  return rigidStyles.find((s) => s.slug === slug);
}
