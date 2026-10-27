export type PackageBundle = {
  slug: string;
  name: string;
  forWho: string;
  includes: string[];
  /** USD. TODO: real "from" prices. null renders as "Quoted per project". */
  priceFrom: number | null;
  featured?: boolean;
};

export const packages: PackageBundle[] = [
  {
    slug: "box-ready",
    name: "Box Ready",
    forWho: "You have a brand. You need the box designed and made.",
    includes: ["Packaging design for one box", "Dieline + print-ready artwork", "Sample box", "500 rigid boxes"],
    priceFrom: null, // TODO
  },
  {
    slug: "launch",
    name: "Launch",
    forWho: "A new product that needs a brand and its first run of packaging.",
    includes: ["Logo + core identity", "Packaging design for one box", "Insert design", "Sample box", "500 rigid boxes"],
    priceFrom: null, // TODO
    featured: true,
  },
  {
    slug: "full-system",
    name: "Full System",
    forWho: "A range: several SKUs, outer shippers and brand guidelines.",
    includes: ["Full identity + guidelines", "Packaging system, up to 3 SKUs", "Mailer or shipper", "Samples", "Production"],
    priceFrom: null, // TODO
  },
];

/** Side-by-side comparison rows: true = included, false = not included, string = scope. */
export const packageComparison: Array<{ label: string; values: Record<string, boolean | string> }> = [
  { label: "Logo design", values: { "box-ready": false, launch: true, "full-system": true } },
  { label: "Brand identity", values: { "box-ready": false, launch: "Core", "full-system": "Full + guidelines" } },
  { label: "Packaging design", values: { "box-ready": "1 box", launch: "1 box", "full-system": "Up to 3 SKUs" } },
  { label: "Dieline + print-ready artwork", values: { "box-ready": true, launch: true, "full-system": true } },
  { label: "Insert design", values: { "box-ready": false, launch: true, "full-system": true } },
  { label: "Mailer or shipper design", values: { "box-ready": false, launch: false, "full-system": true } },
  { label: "Physical sample", values: { "box-ready": true, launch: true, "full-system": true } },
  { label: "Production", values: { "box-ready": "500 rigid boxes", launch: "500 rigid boxes", "full-system": "Quoted per range" } },
];
