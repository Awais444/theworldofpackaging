import { site } from "@/config/site";
import { printedStyles } from "./printedStyles";
import { rigidStyles } from "./rigidStyles";
import { printedCard, rigidCard, type BoxCard } from "@/lib/boxView";
import type { Faq } from "./rigidStyles";

const rigidBy = (slugs: string[]): BoxCard[] => slugs.map((s) => rigidCard(rigidStyles.find((r) => r.slug === s)!));
const printedBy = (slugs: string[]): BoxCard[] => slugs.map((s) => printedCard(printedStyles.find((p) => p.slug === s)!));

export const allRigidCards = rigidStyles.map(rigidCard);
export const allPrintedCards = printedStyles.map(printedCard);

export const rigidTabs = [
  { id: "all", label: "All rigid", cards: allRigidCards },
  { id: "gift", label: "Gift boxes", cards: rigidBy(["magnetic-closure", "lid-and-base", "drawer", "book-style"]) },
  { id: "bottles", label: "Bottles & round", cards: rigidBy(["shoulder-neck", "tube"]) },
  { id: "display", label: "Display & flat-pack", cards: rigidBy(["window", "collapsible"]) },
];

export const printedTabs = [
  { id: "all", label: "All printed", cards: allPrintedCards },
  { id: "ecommerce", label: "E-commerce", cards: printedBy(["mailer", "shipping"]) },
  { id: "retail", label: "Retail", cards: printedBy(["tuck-end", "folding-carton", "display", "sleeve", "window"]) },
  { id: "gift", label: "Gift & carry", cards: printedBy(["pillow", "gable"]) },
];

export const boxesTabs = [
  { id: "all-boxes", label: "All boxes", cards: [...allRigidCards, ...allPrintedCards] },
  { id: "rigid", label: "Rigid", cards: allRigidCards },
  { id: "printed", label: "Printed", cards: allPrintedCards },
];

export const hubFaqs: Faq[] = [
  { q: "What is the difference between rigid and printed boxes?", a: "Rigid boxes are made from thick greyboard wrapped in paper and do not fold. Printed boxes are folded from paperboard or corrugated and ship flat." },
  { q: "What is the minimum order?", a: `${site.facts.rigidMoq} boxes per design for rigid and collapsible rigid boxes. Printed box minimums depend on the style and are confirmed with your quote.` },
  { q: "Can I get a sample first?", a: "Yes. We make a physical sample before production, and the sample fee is credited to your bulk order." },
  { q: "Do you design the artwork?", a: "Free design support comes with every order. We also offer full packaging design if you need it." },
  { q: "Do you ship worldwide?", a: "Yes, by air or sea to the USA, UK, Canada, Australia, UAE, the EU and more." },
];
