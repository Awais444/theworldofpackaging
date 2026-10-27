// Studio & factory content. Everything flagged placeholder or TODO needs real details.

export type TeamMember = { name: string; role: string; bio: string; placeholder: boolean };

// TODO: real team. Names are generic role placeholders, not people.
export const team: TeamMember[] = [
  { name: "Team member", role: "Creative Director", bio: "Placeholder bio: background, past work and what they lead in the studio.", placeholder: true },
  { name: "Team member", role: "Packaging Designer", bio: "Placeholder bio: structural and graphic packaging experience.", placeholder: true },
  { name: "Team member", role: "Brand Designer", bio: "Placeholder bio: identity and typography work.", placeholder: true },
  { name: "Team member", role: "Production Manager", bio: "Placeholder bio: years on the factory floor and what they oversee.", placeholder: true },
];

// TODO: real machine list (make, model, format). Kept to generic machine types until confirmed.
export const machines: { type: string; use: string; placeholder: boolean }[] = [
  { type: "Sheet-fed offset press", use: "CMYK and Pantone printing of wraps and cartons", placeholder: true },
  { type: "Automatic die cutter", use: "Cutting and creasing printed sheets", placeholder: true },
  { type: "Greyboard cutter / V-groover", use: "Cutting and grooving rigid board", placeholder: true },
  { type: "Wrapping and gluing line", use: "Wrapping trays and lids in paper, cloth or leatherette", placeholder: true },
  { type: "Corner pasting machine", use: "Taping box corners square", placeholder: true },
  { type: "Hot foil stamping press", use: "Foil blocking, embossing and debossing", placeholder: true },
  { type: "CNC foam cutter", use: "Cutting EVA inserts", placeholder: true },
];

export const qcChecklist = [
  "Board thickness and flatness checked on arrival",
  "First sheet colour checked against the approved proof",
  "Die-cut sample checked against the dieline",
  "Wrap register and corner finish inspected",
  "Foil, emboss and spot UV checked for fill and alignment",
  "Insert fit tested with the product or a dummy",
  "Random samples measured and opened from every batch",
  "Export cartons checked for count, labels and packing",
];

// TODO: verify every claim before publishing. Wording is deliberately conditional.
export const sustainability = [
  { title: "Recycled greyboard", body: "Greyboard is made largely from recycled paper fibre. Ask for the specification of the board on your job." },
  { title: "Certified paper options", body: "FSC-certified papers and boards can be requested for many specs, subject to availability." },
  { title: "Recyclable inserts", body: "Card inserts are an alternative to EVA foam where recyclability matters more than cushioning." },
  { title: "Less freight", body: "Collapsible boxes ship flat, reducing carton volume per box on international shipments." },
];

// TODO: replace with the real founding story and dates.
export const story = {
  intro: "The World of Packaging started on a factory floor. We made rigid boxes for other people's designs, and kept seeing good products let down by packaging that was designed without knowing how it would be made.",
  body: "So we built a design studio next to the production line. Today our designers and our factory team work on the same projects, from first sketch to delivered box, for brands across the USA, UK, Canada, Australia, the UAE and Europe.",
  mission: "Make premium packaging possible for growing brands: well designed, made properly and delivered at a minimum order they can manage.",
};

export const differences = [
  { title: "Design and factory together", text: "Designers check every idea against the board, press and finishes we will use." },
  { title: "Low minimums", text: `Rigid and collapsible rigid boxes from 500 units per design.` },
  { title: "Sample first", text: "A physical sample before production, so nothing is a surprise." },
  { title: "Built for export", text: "Collapsible boxes and export packing cut freight for international brands." },
];

/** Numbers block. TODO: real, verified figures only. */
export const companyNumbers = [
  { value: "TBC", label: "Years making boxes" },
  { value: "TBC", label: "Brands served" },
  { value: "TBC", label: "Countries shipped to" },
  { value: "TBC", label: "Boxes made per month" },
];

export const values = [
  { title: "Honest numbers", text: "Clear quotes, real lead times and no surprise costs." },
  { title: "Made properly", text: "Square corners, tight wraps and inserts that fit." },
  { title: "Useful design", text: "Design that sells the product and survives production." },
  { title: "Easy to work with", text: "Fast replies, plain English and one point of contact." },
];

/** Factory production sequence (CLAUDE.md §9 /factory). */
export const productionSteps = [
  { title: "Cut", body: "Greyboard is cut and grooved to your dieline." },
  { title: "Print", body: "Wrap paper or cartons printed CMYK or Pantone." },
  { title: "Wrap", body: "Trays and lids wrapped by hand in paper, cloth or leatherette." },
  { title: "Corner", body: "Corners taped square for strength." },
  { title: "Insert", body: "EVA, card or pulp inserts cut and fitted." },
  { title: "QC", body: "Every batch checked against the approved sample." },
  { title: "Pack", body: "Packed in export cartons, assembled or flat." },
];

// TODO: real daily/monthly capacity.
export const capacityNote = "Capacity depends on box style and finishes. We confirm a production slot and lead time with every quote.";
