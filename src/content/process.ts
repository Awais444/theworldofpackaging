import { site } from "@/config/site";

export type ProcessStep = { title: string; body: string; you: string; us: string };

/** The six steps of a project (CLAUDE.md §9 /how-it-works). A real sequence, so numbering is used. */
export const processSteps: ProcessStep[] = [
  {
    title: "Brief",
    body: "Tell us about your product, quantity, deadline and where the boxes ship.",
    you: "Share the product, dimensions, quantity and any brand files.",
    us: `Reply ${site.facts.quoteReply} with questions, a recommended spec and a quote.`,
  },
  {
    title: "Design",
    body: "We design the packaging, or check and set up your artwork on the dieline.",
    you: "Review concepts or send print-ready files.",
    us: `First concepts usually within ${site.facts.firstConceptHours} hours, then artwork on the real dieline.`,
  },
  {
    title: "Sample",
    body: "A physical sample made on our production line with your materials and finishes.",
    you: "Hold it, test it with the product, and give feedback.",
    us: "Make the sample and send it by express courier.",
  },
  {
    title: "Approval",
    body: "You sign off the sample and the final spec before production starts.",
    you: "Approve the sample, spec sheet and final artwork.",
    us: "Lock the spec and book your production slot.",
  },
  {
    title: "Production",
    body: "Cutting, printing, wrapping, inserts and quality checks in our factory.",
    you: "Nothing. We send progress photos at key stages.",
    us: "Make your boxes and check every batch against the approved sample.",
  },
  {
    title: "Shipping",
    body: "Packed in export cartons, assembled or flat, sent by air or sea.",
    you: "Confirm the delivery address and any import details.",
    us: "Pack, prepare the paperwork and ship. You get tracking details.",
  },
];

/** Example timeline. TODO: replace with real typical durations; labelled as an example on the page. */
export const exampleTimeline = [
  { step: "Brief and quote", time: "1–2 days" },
  { step: "Design or artwork setup", time: "Agreed per project" },
  { step: "Sample", time: "Confirmed with your quote" },
  { step: "Production", time: "Confirmed with your quote" },
  { step: "Shipping", time: "Air: days · Sea: weeks" },
];

export const whatWeNeed = [
  "Product dimensions (L × W × H) or a physical sample",
  "Quantity per design",
  "Your logo and brand files, or a brief if you need design",
  "Box style, or what the box needs to do",
  "Delivery country and deadline",
  "Any regulatory text that must appear on the box",
];
