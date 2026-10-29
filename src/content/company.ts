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
  "First die-cut sheet checked against the dieline",
  "Wrap register and corner finish inspected",
  "Foil, emboss and spot UV checked for fill and alignment",
  "Insert fit tested with the product or a dummy",
  "Random boxes measured and opened from every batch",
  "Export cartons checked for count, labels and packing",
];

// TODO: verify every claim before publishing. Wording is deliberately conditional.
export const sustainability = [
  { title: "Recycled greyboard", body: "Greyboard is made largely from recycled paper fibre. Ask for the specification of the board on your job." },
  { title: "Certified paper options", body: "FSC-certified papers and boards can be requested for many specs, subject to availability." },
  { title: "Recyclable inserts", body: "Card inserts are an alternative to EVA foam where recyclability matters more than cushioning." },
  { title: "Less freight", body: "Collapsible boxes ship flat, reducing carton volume per box on international shipments." },
];

// TODO: add the real founding story and dates when available. Current copy states only what the business does.
export const story = {
  intro: "The World of Packaging is a packaging design studio with its own box factory in Pakistan. Our designers and our production team work on the same projects, so every design is drawn for the board, press and finishes it will be made with.",
  body: "We design packaging for brands in the USA, UK, Canada, Australia, the UAE and Europe, and make rigid, collapsible and printed boxes in-house, from 500 boxes per design.",
  mission: "Make premium packaging possible for growing brands: well designed, made properly and delivered at a minimum order they can manage.",
};

export const differences = [
  { title: "Design and factory together", text: "Designers check every idea against the board, press and finishes we will use." },
  { title: "Low minimums", text: `Rigid and collapsible rigid boxes from 500 units per design.` },
  { title: "Proof first", text: "A digital proof and 3D mockup before print, so nothing is a surprise." },
  { title: "Built for export", text: "Collapsible boxes and export packing cut freight for international brands." },
];

// TODO: add verified company numbers (years, brands served, countries, monthly output) to site.facts when available.

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
  { title: "QC", body: "Every batch checked against the approved proof." },
  { title: "Pack", body: "Packed in export cartons, assembled or flat." },
];

// TODO: real daily/monthly capacity.
export const capacityNote = "Capacity depends on box style and finishes. We confirm a production slot and lead time with every quote.";

/**
 * Teams by role, used on /about and /team. Describes what each team does; no invented names.
 * TODO: add real people (name, role, photo) to `team` above and set placeholder: false to show them on /team.
 */
export const teamGroups = [
  {
    name: "Packaging design studio",
    summary: "Concepts, artwork and print-ready files on the real dieline.",
    does: ["Packaging concepts and 3D mockups", "Label and box artwork", "Finish layers for foil, spot UV and embossing", "Range and SKU systems"],
  },
  {
    name: "Brand designers",
    summary: "Logos and identity systems built to work on packaging first.",
    does: ["Logo and wordmark design", "Colour and type systems", "Brand guidelines", "Packaging-first brand strategy"],
  },
  {
    name: "Structure and pre-press",
    summary: "Dielines, 3D mockups and file checks before anything is printed.",
    does: ["Dielines and structural design", "Insert and cavity design", "Pre-press file checks", "Colour proofing"],
  },
  {
    name: "Factory and quality control",
    summary: "Cutting, printing, wrapping, inserts and checks on every batch.",
    does: ["Rigid box production", "Printing and finishing", "Quality checks against the approved proof", "Export packing and shipping"],
  },
];

/**
 * About page timeline. TODO: every milestone is a placeholder until you confirm the year and wording.
 * Do not add dates or events that are not confirmed.
 */
export const milestones: import("@/components/ui/Timeline").Milestone[] = [
  { year: null, title: "Started printing", text: "TODO: when and how the business began.", placeholder: true },
  { year: null, title: "Opened the factory", text: "TODO: first factory and what it made.", placeholder: true },
  { year: null, title: "Began rigid box production", text: "TODO: when rigid boxes were added.", placeholder: true },
  { year: null, title: "First international clients", text: "TODO: first markets served abroad.", placeholder: true },
  { year: null, title: "Launched the design studio", text: "TODO: when branding and packaging design started.", placeholder: true },
];
