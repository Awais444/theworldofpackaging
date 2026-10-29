/**
 * HowTo steps for guides whose body has a numbered procedure. The text must match the visible steps
 * in the .mdx file word for word; update both together.
 */
export const howToSteps: Record<string, { name: string; steps: Array<{ name: string; text: string }> }> = {
  "what-is-a-dieline": {
    name: "How a dieline is made",
    steps: [
      { name: "Measure the product", text: "Everything starts with accurate product dimensions: length, width and height, plus any irregular shapes, caps or handles." },
      { name: "Choose the box style", text: "The box style, such as tuck end, mailer, rigid lid and base or drawer, determines the basic structure. Standard styles have well-established dieline patterns." },
      { name: "Account for the material", text: "Board thickness changes everything. A 400 gsm folding carton, an E-flute mailer and a 2 mm rigid greyboard box all need different allowances at folds and joints." },
      { name: "Draw the structure", text: "A structural designer draws the dieline in CAD software, adding allowances for board thickness, fold tolerances and how the box will be made: by machine, by hand, or a mix." },
      { name: "Check and test", text: "The dieline is checked against the product's dimensions and shown as a 3D mockup to confirm fit, closing and appearance. Adjustments are made before artwork is finalised." },
    ],
  },
  "how-to-measure-box-size": {
    name: "How to measure your product for a box",
    steps: [
      { name: "Measure at the widest points", text: "Measure the product at its widest points, including caps, pumps and handles." },
      { name: "Add space for extras", text: "Add space for anything else in the box: inserts, tissue, cards or accessories." },
      { name: "Add a small allowance", text: "Add a small allowance so the product slides in without forcing. A few millimetres is usually enough; an insert takes up the rest." },
      { name: "Round and note the unit", text: "Round to the nearest millimetre and note whether the figures are in mm or inches." },
    ],
  },
};
