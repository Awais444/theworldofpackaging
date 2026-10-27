// Shared option vocabularies for rigid and printed boxes. Used by style pages,
// the materials / finishes / inserts pages and (Phase 5) the configurator.

export type Option = { name: string; detail: string };

export const boardThicknesses: Option[] = [
  { name: "1.5 mm", detail: "Light products, slim boxes, lowest weight for shipping." },
  { name: "2.0 mm", detail: "Our default. Rigid enough for most retail and gift boxes." },
  { name: "2.5 mm", detail: "Heavier products and larger formats that must not bow." },
  { name: "3.0 mm", detail: "Bottles, hardware and premium sets that need a solid hand-feel." },
];

export const wraps: Option[] = [
  { name: "Printed art paper", detail: "157 gsm coated paper printed CMYK or Pantone, then laminated." },
  { name: "Specialty textured paper", detail: "Uncoated or embossed stocks with colour through the sheet." },
  { name: "Linen cloth", detail: "Book-cloth with a woven texture; takes foil and debossing well." },
  { name: "Leatherette", detail: "PU material with a grain finish for watch, jewellery and gift sets." },
  { name: "Kraft paper", detail: "Natural brown wrap for a raw, recycled look." },
];

export const finishes: Option[] = [
  { name: "Hot foil blocking", detail: "Metallic or pigment foil pressed with a heated die. Gold, silver, copper, holographic." },
  { name: "Embossing", detail: "Raised artwork pressed from behind with a matched die." },
  { name: "Debossing", detail: "Artwork pressed into the surface. Works blind or with foil." },
  { name: "Spot UV", detail: "Gloss varnish on selected areas, usually over soft-touch or matt." },
  { name: "Soft-touch lamination", detail: "Velvet-feel matt film over printed wraps." },
  { name: "Matt or gloss lamination", detail: "Protective film that also sets the sheen of the print." },
];

export const inserts: Option[] = [
  { name: "EVA foam", detail: "CNC-cut cavities that hold each item tight. Black, white or grey." },
  { name: "Velvet-lined EVA", detail: "EVA wrapped in velvet or flocked fabric for jewellery and watches." },
  { name: "Card insert", detail: "Folded paperboard dividers. Recyclable and easy to print on." },
  { name: "Satin cushion", detail: "Padded satin pillow for single items such as watches or rings." },
];

export const printedMaterials: Option[] = [
  { name: "SBS board", detail: "Solid bleached board, 300–400 gsm. Bright white, sharp print." },
  { name: "Kraft board", detail: "Unbleached brown board for a natural look; prints best with bold artwork." },
  { name: "E-flute corrugated", detail: "About 1.5 mm. Mailers and retail boxes that need some crush strength." },
  { name: "B-flute corrugated", detail: "About 3 mm. Shipping cartons and heavier mailers." },
];

export const printOptions: Option[] = [
  { name: "CMYK", detail: "Full colour offset print for photography and gradients." },
  { name: "Pantone spot", detail: "Exact brand colours matched to a Pantone reference." },
  { name: "Inside print", detail: "Printing on the inside surface for an unboxing message or pattern." },
  { name: "Outside print", detail: "All visible outer panels, to the edge with bleed." },
];
