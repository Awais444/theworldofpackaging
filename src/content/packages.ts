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
