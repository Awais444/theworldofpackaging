import type { IllustrationKey } from "@/components/illustrations";
import { agencyServices, hubs } from "./agencyServices";
import { caseSlot, caseStudies } from "./caseStudies";
import { industries } from "./industries";
import { printedStyles } from "./printedStyles";
import { rigidStyles } from "./rigidStyles";

export type MediaAspect = "16/9" | "4/3" | "1/1" | "3/4" | "21/9";

export type MediaSlot = {
  /** Matches the record key, e.g. "rigid-magnetic-closure-hero". */
  id: string;
  /** Real, descriptive alt text. Used for the photo and for the illustration fallback. */
  alt: string;
  /** Path under /public, e.g. "/images/rigid/rigid-magnetic-hero.webp". Empty = illustration. */
  src?: string;
  illustration: IllustrationKey;
  aspect: MediaAspect;
  /** Shot list fields (see MEDIA_SLOTS.md). */
  page: string;
  size: string;
  shot: string;
};

/**
 * Central image registry. To swap an illustration for a photo: put the file in
 * /public/images/<section>/<slot-id>.webp and fill `src`. Nothing else changes.
 */
const fixedSlots = {
  "mega-menu-feature": {
    id: "mega-menu-feature",
    alt: "Open magnetic rigid box with an EVA foam insert holding a product jar",
    illustration: "magnetic-open",
    aspect: "4/3",
    page: "Header mega-menu",
    size: "1200×900",
    shot: "Magnetic rigid box open, product in insert, dark set, three-quarter view",
  },
  "collapsible-flat": {
    id: "collapsible-flat",
    alt: "Three collapsible rigid boxes packed flat and stacked",
    illustration: "collapsible-flat",
    aspect: "4/3",
    page: "/collapsible-rigid-boxes",
    size: "2400×1800",
    shot: "Stack of flat-packed collapsible boxes on a pallet or table, side light showing thickness",
  },
  "printed-mailer-hero": {
    id: "printed-mailer-hero",
    alt: "Printed corrugated mailer box with a logo on the lid",
    illustration: "mailer-box",
    aspect: "4/3",
    page: "/printed-boxes/mailer",
    size: "2400×1800",
    shot: "Printed mailer box closed on paper-coloured backdrop, logo visible on lid",
  },
  "branding-hero": {
    id: "branding-hero",
    alt: "Brand board showing a type specimen, colour palette, wordmark and pattern",
    illustration: "brand-board",
    aspect: "4/3",
    page: "/branding",
    size: "2400×1800",
    shot: "Printed brand board / identity flat lay: swatches, type specimen, stationery",
  },
  "factory-press": {
    id: "factory-press",
    alt: "Four-colour sheet-fed offset press in the factory",
    illustration: "press-machine",
    aspect: "16/9",
    page: "/studio-and-factory",
    size: "2400×1350",
    shot: "Offset press running, operator at delivery end, wide shot, motion in sheets",
  },
  // Case study covers (placeholder projects, see caseStudies.ts).
  "case-halden-cover": {
    id: "case-halden-cover",
    alt: "Magnetic rigid gift box with a foil-blocked lid for a skincare brand",
    illustration: "magnetic-closed",
    aspect: "4/3",
    page: "/ and /work/halden-apothecary",
    size: "2400×1800",
    shot: "Hero shot of the finished gift box, lid closed, product beside it",
  },
  "case-ostra-cover": {
    id: "case-ostra-cover",
    alt: "Printed tea subscription mailer box",
    illustration: "mailer-box",
    aspect: "4/3",
    page: "/ and /work/ostra-tea",
    size: "2400×1800",
    shot: "Mailer closed on a table, printed lid visible, tea tin beside it",
  },
  "case-kiri-cover": {
    id: "case-kiri-cover",
    alt: "Brand board for a jewellery identity: wordmark, palette and pattern",
    illustration: "brand-board",
    aspect: "4/3",
    page: "/ and /work/kiri-atelier",
    size: "2400×1800",
    shot: "Identity flat lay: business cards, ring box, swatches",
  },
  "case-marrow-cover": {
    id: "case-marrow-cover",
    alt: "Collapsible rigid candle boxes packed flat",
    illustration: "collapsible-flat",
    aspect: "4/3",
    page: "/ and /work/marrow-and-vale",
    size: "2400×1800",
    shot: "Flat-packed boxes beside one assembled box with candle",
  },
} satisfies Record<string, MediaSlot>;


// Factory process steps, shown on every rigid style page and the factory page.
export const factorySteps = [
  { id: "factory-cut", label: "Cut", illustration: "factory-cut", shot: "Die cutter or V-groover cutting greyboard, close on the blade" },
  { id: "factory-wrap", label: "Wrap", illustration: "factory-wrap", shot: "Operator wrapping a tray in printed paper on the gluing machine" },
  { id: "factory-corner", label: "Corners", illustration: "factory-corner", shot: "Corner pasting machine taping a box corner, macro" },
  { id: "factory-insert", label: "Insert", illustration: "factory-insert", shot: "Hands placing an EVA insert into a finished box" },
  { id: "factory-qc", label: "QC", illustration: "factory-qc", shot: "Inspector measuring a box with a caliper, checklist in frame" },
] as const satisfies ReadonlyArray<{ id: string; label: string; illustration: IllustrationKey; shot: string }>;

function generatedSlots(): MediaSlot[] {
  const out: MediaSlot[] = [];
  const angles = ["three-quarter view, lid closed", "open, product in insert", "detail: corner, wrap and finish close-up"];
  for (const s of rigidStyles) {
    const page = `/rigid-boxes/${s.slug}`;
    s.mediaSlots.forEach((id, i) =>
      out.push({
        id,
        alt: i === 0 ? `${s.name}, made in our factory` : `${s.name}: ${angles[i - 1]}`,
        illustration: s.illustration,
        aspect: "4/3",
        page,
        size: "2400×1800",
        shot: i === 0 ? `${s.name} hero shot on dark greyboard set` : `${s.name}, ${angles[i - 1]}`,
      }),
    );
  }
  for (const s of printedStyles) {
    const page = `/printed-boxes/${s.slug}`;
    s.mediaSlots.forEach((id, i) =>
      out.push({
        id,
        alt: i === 0 ? `Printed ${s.name.toLowerCase()}` : `${s.name}, ${i === 1 ? "printed detail" : "in use"}`,
        illustration: s.illustration,
        aspect: "4/3",
        page,
        size: "2400×1800",
        shot: i === 0 ? `${s.name} on paper-coloured backdrop` : `${s.name}, ${i === 1 ? "print detail close-up" : "packed with product"}`,
      }),
    );
  }
  for (const f of factorySteps) {
    out.push({
      id: f.id,
      alt: `Factory step: ${f.label.toLowerCase()}`,
      illustration: f.illustration,
      aspect: "4/3",
      page: "Rigid style pages, /studio-and-factory",
      size: "1600×1200",
      shot: f.shot,
    });
  }
  for (const ind of industries) {
    out.push({
      id: `industry-${ind.slug}-hero`,
      alt: `${ind.name} packaging made in our factory`,
      illustration: ind.illustration,
      aspect: "4/3",
      page: `/industries/${ind.slug}`,
      size: "2400×1800",
      shot: `${ind.name} product in its box, styled for the category`,
    });
  }
  out.push({
    id: "world-map",
    alt: "World map with shipping routes from Pakistan to the USA, UK, Canada, Australia, UAE and Europe",
    illustration: "world-map",
    aspect: "16/9",
    page: "/shipping",
    size: "2400×1350",
    shot: "Keep as illustration, or: export cartons being loaded into a container",
  });
  for (const s of agencyServices) {
    out.push({
      id: `service-${s.slug}-hero`,
      alt: `${s.name}: example deliverable`,
      illustration: s.illustration,
      aspect: "4/3",
      page: `${hubs[s.hub].href}/${s.slug}`,
      size: "2400×1800",
      shot: `Representative ${s.name.toLowerCase()} work from a real project`,
    });
  }
  const caseParts = [
    ["identity", "brand-board", "Identity applied: logo, palette, stationery or labels"],
    ["packaging", "magnetic-open", "Finished packaging, open, with product"],
    ["production", "press-machine", "The job on our factory floor: press, wrapping or QC"],
  ] as const;
  for (const c of caseStudies) {
    for (const [part, illustration, shot] of caseParts) {
      out.push({
        id: caseSlot(c.slug, part),
        alt: `${c.client}: ${part}`,
        illustration,
        aspect: "16/9",
        page: `/work/${c.slug}`,
        size: "2400×1350",
        shot,
      });
    }
  }
  out.push({
    id: "packaging-design-hero",
    alt: "Flat dieline with cut and fold lines for a packaging design project",
    illustration: hubs["packaging-design"].illustration,
    aspect: "4/3",
    page: "/packaging-design",
    size: "2400×1800",
    shot: "Designer marking up a printed dieline at the studio desk",
  });
  out.push(
    {
      id: "foil-stamping",
      alt: "Hot foil blocking press applying gold foil to a box wrap",
      illustration: "foil-stamping",
      aspect: "4/3",
      page: "/rigid-boxes/finishes",
      size: "2400×1800",
      shot: "Foil press mid-stroke, gold foil web visible",
    },
    {
      id: "insert-foam",
      alt: "Black EVA foam insert with cut cavities for several products",
      illustration: "insert-foam",
      aspect: "4/3",
      page: "/rigid-boxes/inserts",
      size: "2400×1800",
      shot: "EVA insert top-down, empty cavities, on paper backdrop",
    },
    {
      id: "shipping-stack",
      alt: "Same shipping carton packed with assembled boxes and with flat-packed collapsible boxes",
      illustration: "shipping-stack",
      aspect: "4/3",
      page: "/collapsible-rigid-boxes",
      size: "2400×1800",
      shot: "Two open cartons side by side: few assembled boxes vs many flat boxes",
    },
  );
  return out;
}

/**
 * Real photos for generated slots (style pages, factory steps). Key = slot id.
 * Example: "rigid-magnetic-closure-hero": "/images/rigid/rigid-magnetic-closure-hero.webp"
 * Fixed slots above take `src` directly.
 */
const photos: Record<string, string> = {};

/** Central image registry: every slot on the site. See MEDIA_SLOTS.md for the shot list. */
export const media: Record<string, MediaSlot> = Object.fromEntries(
  [...generatedSlots(), ...Object.values(fixedSlots)].map((s: MediaSlot) => [
    s.id,
    photos[s.id] ? { ...s, src: photos[s.id] } : s,
  ]),
);

export type MediaSlotId = string;

export function getMedia(id: MediaSlotId): MediaSlot {
  const slot = media[id];
  if (!slot) throw new Error(`Unknown media slot "${id}". Add it to src/content/media.ts.`);
  return slot;
}
