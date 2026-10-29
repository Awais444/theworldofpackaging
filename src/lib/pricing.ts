/**
 * Live estimate for the configurator. Every number lives in RATES below.
 * TODO real rates: all values are placeholders for the formula and the UI.
 * While `ratesConfirmed` is false the site labels estimates as example figures.
 */

export type BoxType = "rigid" | "collapsible" | "printed";
export type ShipMethod = "air" | "sea";
export type Packing = "assembled" | "flat";
export type Artwork = "upload" | "basic" | "professional";
export type PrintSides = "none" | "outside" | "inside-outside";

export type BoxConfig = {
  type: BoxType;
  style: string;
  /** Millimetres, always stored in mm. */
  dims: { l: number; w: number; h: number };
  /** Rigid: board thickness "2.0"; printed: material name. */
  board: string;
  /** Rigid: wrap material; printed: unused. */
  wrap: string;
  print: PrintSides;
  finishes: string[];
  insert: string | null;
  quantity: number;
  ship: ShipMethod;
  packing: Packing;
  artwork: Artwork;
};

// TODO real rates — every value in this object.
export const RATES = {
  ratesConfirmed: false,
  /** Per-unit base cost (USD) before size and options. */
  base: { rigid: 1.6, collapsible: 1.9, printed: 0.25 },
  /** USD per m² of box surface. */
  area: { rigid: 6.0, collapsible: 6.5, printed: 1.2 },
  /** Multiplier on the area cost by board thickness (rigid) or stock (printed). */
  board: {
    "1.5": 0.9,
    "2.0": 1,
    "2.5": 1.12,
    "3.0": 1.25,
    "SBS board": 1,
    "Kraft board": 0.95,
    "E-flute corrugated": 1.15,
    "B-flute corrugated": 1.3,
  } as Record<string, number>,
  /** USD per m² of wrap material (rigid only). */
  wrap: {
    "Printed art paper": 1.0,
    "Specialty textured paper": 2.2,
    "Linen cloth": 3.0,
    Leatherette: 3.4,
    "Kraft paper": 0.8,
  } as Record<string, number>,
  /** USD per m² for printing. */
  print: { none: 0, outside: 0.6, "inside-outside": 1.1 } as Record<PrintSides, number>,
  /** Per-unit adders (USD). */
  finishes: {
    "Hot foil blocking": 0.18,
    Embossing: 0.14,
    Debossing: 0.14,
    "Spot UV": 0.12,
    "Soft-touch lamination": 0.16,
    "Matt or gloss lamination": 0.08,
  } as Record<string, number>,
  inserts: {
    "EVA foam": 0.55,
    "Velvet-lined EVA": 0.9,
    "Card insert": 0.22,
    "Satin cushion": 0.7,
    "EVA foam (packed separately)": 0.55,
    "EVA foam disc": 0.3,
  } as Record<string, number>,
  /** One-off tooling: cutting dies, foil/emboss plates, print plates (USD). */
  setup: { rigid: 180, collapsible: 220, printed: 140, perFinishPlate: 60 },
  /** Volume discount by minimum quantity (multiplier on unit cost). */
  tiers: [
    { min: 10000, mult: 0.58 },
    { min: 5000, mult: 0.64 },
    { min: 2500, mult: 0.72 },
    { min: 1000, mult: 0.85 },
    { min: 0, mult: 1 },
  ],
  design: { upload: 0, basic: 0, professional: 650 } as Record<Artwork, number>,
  shipping: {
    /** USD per chargeable kg by air; chargeable kg = max(actual, m³ × 167). */
    airPerKg: 6.5,
    /** USD per m³ by sea, with a minimum charge. */
    seaPerM3: 140,
    seaMinimum: 350,
    /** Packed thickness of a flat unit, mm. */
    flatThicknessMm: 12,
    /** Carton and pallet overhead on raw volume. */
    packingFactor: 1.25,
    /** Approximate weight per unit: kg per m² of surface by type. */
    kgPerM2: { rigid: 1.6, collapsible: 1.7, printed: 0.45 },
  },
};

export const MOQ: Record<BoxType, number> = { rigid: 500, collapsible: 500, printed: 500 }; // printed TODO: site.facts.printedMoq

export type Estimate = {
  unit: number;
  goods: number;
  setup: number;
  design: number;
  shipping: number;
  total: number;
  tierMult: number;
  cbm: number;
  lines: { label: string; amount: number }[];
};

const round2 = (n: number) => Math.round(n * 100) / 100;

export function tierMultiplier(qty: number) {
  return RATES.tiers.find((t) => qty >= t.min)?.mult ?? 1;
}

export function estimate(c: BoxConfig): Estimate {
  const { l, w, h } = c.dims;
  const areaM2 = (2 * (l * w + l * h + w * h)) / 1e6;
  const boardMult = RATES.board[c.board] ?? 1;

  let unitRaw = RATES.base[c.type] + areaM2 * RATES.area[c.type] * boardMult;
  if (c.type !== "printed") unitRaw += areaM2 * (RATES.wrap[c.wrap] ?? 1);
  unitRaw += areaM2 * RATES.print[c.print];
  const finishCost = c.finishes.reduce((n, f) => n + (RATES.finishes[f] ?? 0.1), 0);
  const insertCost = c.insert ? (RATES.inserts[c.insert] ?? 0.4) : 0;
  unitRaw += finishCost + insertCost;

  const tierMult = tierMultiplier(c.quantity);
  const unit = round2(unitRaw * tierMult);
  const goods = round2(unit * c.quantity);
  const setup = RATES.setup[c.type] + c.finishes.length * RATES.setup.perFinishPlate;
  const design = RATES.design[c.artwork];

  // Freight volume: flat units only take board thickness, not box height.
  const s = RATES.shipping;
  const depthMm = c.packing === "flat" ? s.flatThicknessMm : h;
  const cbm = ((l * w * depthMm) / 1e9) * c.quantity * s.packingFactor;
  const kg = areaM2 * s.kgPerM2[c.type] * c.quantity;
  const shipping =
    c.ship === "air" ? round2(Math.max(kg, cbm * 167) * s.airPerKg) : round2(Math.max(s.seaMinimum, cbm * s.seaPerM3));

  const total = round2(goods + setup + design + shipping);
  return {
    unit,
    goods,
    setup,
    design,
    shipping,
    total,
    tierMult,
    cbm: round2(cbm),
    lines: [
      { label: `Boxes (${c.quantity.toLocaleString("en-US")} × unit)`, amount: goods },
      { label: "Tooling + plates", amount: setup },
      { label: "Artwork", amount: design },
      { label: `Freight (${c.ship}, ${c.packing})`, amount: shipping },
    ],
  };
}
