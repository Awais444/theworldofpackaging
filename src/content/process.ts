export type ProcessStep = { title: string; body: string; spec: string };

// A real sequence, so numbering is used on the page.
export const processSteps: ProcessStep[] = [
  {
    title: "Discover",
    body: "We learn the product, the customer and where the box gets opened. You get a short written brief back.",
    spec: "Brief",
  },
  {
    title: "Brand",
    body: "Identity work if you need it: name, mark, type, colour. Skipped if your brand is already set.",
    spec: "Identity",
  },
  {
    title: "Package",
    body: "Structure and graphics together: dieline, board, finishes, inserts and print-ready artwork.",
    spec: "Dieline + artwork",
  },
  {
    title: "Prototype & sample",
    body: "A physical sample made on our own line, so you hold the real board, wrap and foil before committing.",
    spec: "Sample box",
  },
  {
    title: "Manufacture",
    body: "Printing, cutting, wrapping, corner pasting and inserts in-house, with QC at each stage.",
    spec: "Production + QC",
  },
  {
    title: "Ship",
    body: "Packed assembled or flat, sent by air or sea. We prepare the paperwork for your market.",
    spec: "Air / sea",
  },
];
