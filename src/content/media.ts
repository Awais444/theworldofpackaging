import type { IllustrationKey } from "@/components/illustrations";
import { designServices } from "./designServices";
import { servicePages } from "./servicePages";
import { caseStudies } from "./caseStudies";
import { industries } from "./industries";
import { printedStyles } from "./printedStyles";
import { rigidStyles } from "./rigidStyles";

export type MediaAspect = "16/9" | "4/3" | "1/1" | "3/4";
export type MediaVariant = "blue" | "klein" | "orange" | "white";

export type MediaSlot = {
  /** Matches the record key, e.g. "rigid-magnetic-closure-hero". */
  id: string;
  /** Real, descriptive alt text. Used for the photo and for the illustration fallback. */
  alt: string;
  /** Path under /public, e.g. "/images/rigid/rigid-magnetic-hero.webp". Empty = illustration. */
  src?: string;
  /** Optional short looping video (MP4/WebM under /public). Used where a slot supports motion, e.g. the home hero. */
  video?: string;
  illustration: IllustrationKey;
  /** Colour variant for the illustration body (lids stay orange, inserts white). */
  variant?: MediaVariant;
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
  "home-hero": {
    id: "home-hero",
    alt: "A rigid gift box, a mailer box and a tube, made in our factory",
    illustration: "magnetic-open",
    aspect: "4/3",
    page: "/",
    size: "2400×1800 still, or 1920×1440 video loop (5–8 s, muted)",
    shot: "Three finished boxes (rigid gift box, mailer, tube) on a white or light grey backdrop, soft daylight",
  },
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
  "factory-press": {
    id: "factory-press",
    alt: "Four-colour sheet-fed offset press in the factory",
    illustration: "press-machine",
    aspect: "16/9",
    page: "/about, /factory",
    size: "2400×1350",
    shot: "Offset press running, operator at delivery end, wide shot, motion in sheets",
  },
  "home-factory": {
    id: "home-factory",
    alt: "Rigid boxes being wrapped and finished on our factory floor",
    illustration: "lid-and-base",
    variant: "klein",
    aspect: "3/4",
    page: "/",
    size: "1600×2130",
    shot: "Operator wrapping rigid boxes at a workbench, finished boxes stacked beside, warm daylight",
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
  const rigidAngles = ["three-quarter view, lid closed", "open, product in insert", "detail: corner, wrap and finish close-up", "top view showing the foil logo", "stack of finished boxes", "in a customer's hands"];
  const printedAngles = ["printed detail close-up", "packed with product", "open, inside print visible", "flat sheet before folding", "stack of finished boxes", "in use"];
  const galleryVariants: MediaVariant[] = ["blue", "klein", "orange", "white"];
  for (const s of rigidStyles) {
    const page = `/rigid-boxes/${s.slug}`;
    s.mediaSlots.forEach((id, i) => {
      const angle = rigidAngles[(i - 1) % rigidAngles.length]!;
      out.push({
        id,
        alt: i === 0 ? `${s.name}, made in our factory` : `${s.name}: ${angle}`,
        illustration: s.illustration,
        variant: galleryVariants[i % galleryVariants.length],
        aspect: "4/3",
        page,
        size: "2400×1800",
        shot: i === 0 ? `${s.name} on a Pale Silver background, soft light` : `${s.name}, ${angle}`,
      });
    });
  }
  for (const s of printedStyles) {
    const page = `/printed-boxes/${s.slug}`;
    s.mediaSlots.forEach((id, i) => {
      const angle = printedAngles[(i - 1) % printedAngles.length]!;
      out.push({
        id,
        alt: i === 0 ? `Printed ${s.name.toLowerCase()}` : `${s.name}: ${angle}`,
        illustration: s.illustration,
        variant: galleryVariants[i % galleryVariants.length],
        aspect: "4/3",
        page,
        size: "2400×1800",
        shot: i === 0 ? `${s.name} on a Pale Silver background, soft light` : `${s.name}, ${angle}`,
      });
    });
  }
  for (const f of factorySteps) {
    out.push({
      id: f.id,
      alt: `Factory step: ${f.label.toLowerCase()}`,
      illustration: f.illustration,
      aspect: "4/3",
      page: "/factory",
      size: "1600×1200",
      shot: f.shot,
    });
  }
  for (const ind of industries) {
    out.push({
      id: `industry-${ind.slug}-hero`,
      alt: `${ind.name} packaging made in our factory`,
      illustration: ind.illustration,
      variant: industries.indexOf(ind) % 2 ? "klein" : "blue",
      aspect: "4/3",
      page: `/industries/${ind.slug}`,
      size: "2400×1800",
      shot: `${ind.name} product in its box, styled for the category`,
    });
  }
  for (const s of servicePages) {
    out.push({
      id: `service-${s.slug}-hero`,
      alt: `${s.name}: example deliverable`,
      illustration: s.illustration,
      aspect: "4/3",
      page: `/services/${s.path}`,
      size: "2400×1800",
      shot: `Representative ${s.name.toLowerCase()} work from a real project`,
    });
  }
  const designShots = ["hero pack on a Pale Silver background", "range lined up together", "detail: finish and print close-up", "open, product in pack", "in use or on shelf", "flat dieline and artwork"];
  for (const d of designServices) {
    d.portfolioSlots.forEach((id, i) =>
      out.push({
        id,
        alt: `${d.name}: ${designShots[i]}`,
        illustration: i === 5 ? "dieline-flat" : d.illustration,
        variant: galleryVariants[i % galleryVariants.length],
        aspect: "4/3",
        page: `/packaging-design/${d.slug}`,
        size: "2400×1800",
        shot: `${d.name.replace(/ Design$/, "")}, ${designShots[i]}`,
      }),
    );
  }
  const caseShots = ["identity applied: logo, palette, stationery or labels", "finished packaging, open, with product", "detail: finish and print close-up", "the range together", "on our factory floor", "in the customer's hands"];
  for (const c of caseStudies) {
    out.push({
      id: c.coverSlot,
      alt: `${c.client}: ${c.summary.split(":")[0]!.toLowerCase()}`,
      illustration: c.illustration,
      variant: "blue",
      aspect: "4/3",
      page: `/work/${c.slug}, /work, /`,
      size: "2400×1800",
      shot: `Hero shot of the finished ${c.spec[0]!.toLowerCase()} for ${c.client}`,
    });
    c.gallery.forEach((id, i) =>
      out.push({
        id,
        alt: `${c.client}: ${caseShots[i]}`,
        illustration: i === 0 ? "brand-board" : c.illustration,
        variant: galleryVariants[(i + 1) % galleryVariants.length],
        aspect: "4/3",
        page: `/work/${c.slug}`,
        size: "2400×1800",
        shot: `${c.client}, ${caseShots[i]}`,
      }),
    );
  }
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
