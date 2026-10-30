import { leadTimeLabel, site } from "@/config/site";
import { printedExtraFaqs, printedFeatures, rigidExtraFaqs, rigidFeatures, type BoxFeature } from "@/content/boxDetails";
import { finishes, inserts, printedMaterials, printOptions, wraps, type Option } from "@/content/materials";
import { printedCommonFaqs, printedStyles, type PrintedStyle } from "@/content/printedStyles";
import { rigidCommonFaqs, rigidStyles, type Faq, type RigidStyle } from "@/content/rigidStyles";

export type BoxKind = "rigid" | "printed";

export type OptionGroup = { title: string; items: Option[] };

/** Everything a box style page (CLAUDE.md §7.1) renders, for rigid and printed styles alike. */
export type BoxView = {
  kind: BoxKind;
  slug: string;
  name: string;
  href: string;
  summary: string;
  /** Rigid MOQ; null for printed (MOQ on quote). */
  moq: number | null;
  description: string;
  chips: Array<{ label: string; value: string }>;
  highlights: string[];
  options: OptionGroup[];
  features: BoxFeature[];
  slots: string[];
  specs: Array<{ label: string; value: string }>;
  industries: string[];
  faqs: Faq[];
  related: BoxCard[];
};

export type BoxCard = { href: string; name: string; text: string; slot: string; tags: string[] };

export const rigidHref = (slug: string) => (slug === "collapsible" ? "/collapsible-rigid-boxes" : `/rigid-boxes/${slug}`);
export const printedHref = (slug: string) => `/printed-boxes/${slug}`;

const pick = (all: Option[], names: string[]) => names.map((n) => all.find((o) => o.name === n) ?? { name: n, detail: "" });
const plain = (names: string[]) => names.map((name) => ({ name, detail: "" }));
const moqLabel = (moq: number | null) => (moq ? `MOQ ${moq}` : "MOQ on quote");

export const rigidCard = (s: RigidStyle): BoxCard => ({
  href: rigidHref(s.slug),
  name: s.name,
  text: s.short === "Collapsible" ? "Rigid box that ships flat." : s.summary.split(". ")[0]!.replace(/\.$/, "") + ".",
  slot: s.mediaSlots[0]!,
  tags: [moqLabel(s.moq), s.collapsible ? "Ships flat" : "Rigid"],
});

export const printedCard = (s: PrintedStyle): BoxCard => ({
  href: printedHref(s.slug),
  name: s.name,
  text: s.summary.split(". ")[0]!.replace(/\.$/, "") + ".",
  slot: s.mediaSlots[0]!,
  tags: [moqLabel(s.moq), "Printed"],
});

function boardRange(mm: number[]) {
  return `${Math.min(...mm).toFixed(1)}–${Math.max(...mm).toFixed(1)} mm greyboard`;
}

export function rigidView(s: RigidStyle): BoxView {
  const board = boardRange(s.boardMm);
  return {
    kind: "rigid",
    slug: s.slug,
    name: s.name,
    href: rigidHref(s.slug),
    summary: s.summary,
    moq: s.moq,
    description: s.description,
    chips: [
      { label: "MOQ", value: String(s.moq) },
      { label: "Lead time", value: leadTimeLabel(site.facts.rigidLeadTime) },
      { label: "Material", value: board },
      { label: "Print", value: "CMYK + Pantone" },
    ],
    highlights: [
      `${board}, wrapped by hand`,
      `Closure: ${s.closures.join(" or ").toLowerCase()}`,
      `Wraps: ${s.wraps.slice(0, 3).join(", ").toLowerCase()} and more`,
      s.collapsible ? "Folds flat for shipping and storage" : "Made in our own factory",
    ],
    options: [
      { title: "Sizes", items: plain(["Custom L × W × H", "Millimetres or inches", "Sized to your product"]) },
      { title: "Board", items: pick([], s.boardMm.map((mm) => `${mm.toFixed(1)} mm greyboard`)) },
      { title: "Printing", items: pick(printOptions, ["CMYK", "Pantone spot", "Inside print"]) },
      { title: "Finishes", items: pick(finishes, s.finishes) },
      { title: "Inserts", items: pick(inserts, s.inserts) },
      { title: "Wrap & closure", items: [...pick(wraps, s.wraps.slice(0, 3)), ...plain(s.closures)] },
    ],
    features: rigidFeatures[s.slug] ?? [],
    slots: s.mediaSlots,
    specs: [
      { label: "Board", value: board },
      { label: "Wrap", value: s.wraps.join(", ") },
      { label: "Print", value: "CMYK offset, Pantone spot colours" },
      { label: "Finishes", value: s.finishes.join(", ") },
      { label: "Inserts", value: s.inserts.join(", ") },
      { label: "Closure", value: s.closures.join(", ") },
      { label: "MOQ", value: `${s.moq} boxes per design` },
      { label: "Lead time", value: leadTimeLabel(site.facts.rigidLeadTime) },
      { label: "Ships", value: s.collapsible ? "Flat (assembles in seconds)" : "Assembled, in export cartons" },
    ],
    industries: s.industries,
    faqs: [...s.faqs, ...rigidCommonFaqs, ...rigidExtraFaqs].slice(0, 5),
    related: rigidStyles.filter((r) => r.slug !== s.slug).slice(0, 4).map(rigidCard),
  };
}

export function printedView(s: PrintedStyle): BoxView {
  const material = s.materials.join(", ");
  return {
    kind: "printed",
    slug: s.slug,
    name: s.name,
    href: printedHref(s.slug),
    summary: s.summary,
    moq: null,
    description: s.description,
    chips: [
      { label: "MOQ", value: s.moq ? String(s.moq) : "On quote" },
      { label: "Lead time", value: leadTimeLabel(site.facts.printedLeadTime) },
      { label: "Material", value: s.materials[0] ?? "Paperboard" },
      { label: "Print", value: "CMYK + Pantone" },
    ],
    highlights: [
      `Made in ${material.toLowerCase()}`,
      "Full-colour print inside and out",
      `Finishes: ${s.finishes.slice(0, 3).join(", ").toLowerCase()}`,
      "Ships flat, folds up in seconds",
    ],
    options: [
      { title: "Sizes", items: plain(["Custom L × W × H", "Custom dieline", "Sized to your product"]) },
      { title: "Materials", items: pick(printedMaterials, s.materials) },
      { title: "Printing", items: pick(printOptions, s.print) },
      { title: "Finishes", items: pick(finishes, s.finishes) },
      { title: "Inserts", items: pick(inserts, ["Card insert"]) },
      { title: "Add-ons", items: plain(["Window patch", "Hang tab", "Tear strip", "Stickers and seals"]) },
    ],
    features: printedFeatures[s.slug] ?? [],
    slots: s.mediaSlots,
    specs: [
      { label: "Material", value: material },
      { label: "Print", value: s.print.join(", ") },
      { label: "Finishes", value: s.finishes.join(", ") },
      { label: "MOQ", value: s.moq ? `${s.moq} boxes per design` : "Confirmed with your quote" },
      { label: "Lead time", value: leadTimeLabel(site.facts.printedLeadTime) },
      { label: "Ships", value: "Flat, in export cartons" },
    ],
    industries: s.industries,
    faqs: [...s.faqs, ...printedCommonFaqs, ...printedExtraFaqs].slice(0, 5),
    related: printedStyles.filter((p) => p.slug !== s.slug).slice(0, 4).map(printedCard),
  };
}

/** Card for a box reference such as "rigid:magnetic-closure" or "printed:mailer". */
export function boxRefCard(ref: `rigid:${string}` | `printed:${string}`): BoxCard | null {
  const [kind, slug] = ref.split(":") as [BoxKind, string];
  if (kind === "rigid") {
    const s = rigidStyles.find((r) => r.slug === slug);
    return s ? rigidCard(s) : null;
  }
  const s = printedStyles.find((p) => p.slug === slug);
  return s ? printedCard(s) : null;
}
