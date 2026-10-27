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
