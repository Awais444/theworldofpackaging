import { site } from "@/config/site";

export type ProcessStep = { title: string; body: string; you: string; us: string; time: string; deliverables: [string, string, string] };

const leadTime = site.facts.rigidLeadTime === "TODO" ? "Set in your quote" : site.facts.rigidLeadTime;

/** The six steps of a project (CLAUDE.md §9 /how-it-works). A real sequence, so numbering is used. */
export const processSteps: ProcessStep[] = [
  {
    title: "Brief",
    body: "Tell us about your product, quantity, deadline and where the boxes ship.",
    you: "Share the product, dimensions, quantity and any brand files.",
    us: `Reply ${site.facts.quoteReply} with questions, a recommended spec and a quote.`,
    time: `Day 1 · reply ${site.facts.quoteReply}`,
    deliverables: ["Questions about your product and market", "A recommended box and material spec", "A fixed quote"],
  },
  {
    title: "Design",
    body: "We design the packaging, or check and set up your artwork on the dieline.",
    you: "Review concepts or send print-ready files.",
    us: `First concepts usually within ${site.facts.firstConceptHours} hours, then artwork on the real dieline.`,
    time: `Concepts in ${site.facts.firstConceptHours} hrs`,
    deliverables: ["Concepts on 3D mockups", "One direction refined across every SKU", "Artwork on the real dieline"],
  },
  {
    title: "Sample",
    body: "A physical sample made on our production line with your materials and finishes.",
    you: "Hold it, test it with the product, and give feedback.",
    us: "Make the sample and send it by express courier.",
    time: site.facts.sampleDays ? `About ${site.facts.sampleDays} working days` : "Express courier",
    deliverables: ["A physical sample in your materials", "Finishes and insert fit to check", "Notes on any changes"],
  },
  {
    title: "Approval",
    body: "You sign off the sample and the final spec before production starts.",
    you: "Approve the sample, spec sheet and final artwork.",
    us: "Lock the spec and book your production slot.",
    time: "Your sign-off",
    deliverables: ["Approved sample and spec sheet", "Final artwork locked", "Production slot booked"],
  },
  {
    title: "Production",
    body: "Cutting, printing, wrapping, inserts and quality checks in our factory.",
    you: "Nothing. We send progress photos at key stages.",
    us: "Make your boxes and check every batch against the approved sample.",
    time: leadTime,
    deliverables: ["Cutting, printing and wrapping in our factory", "Progress photos at key stages", "Every batch checked against the sample"],
  },
  {
    title: "Delivery",
    body: "Packed in export cartons, assembled or flat, sent by air or sea.",
    you: "Confirm the delivery address and any import details.",
    us: "Pack, prepare the paperwork and ship. You get tracking details.",
    time: "Air or sea, tracked",
    deliverables: ["Export cartons, assembled or flat", "Shipping documents prepared", "Tracking details sent to you"],
  },
];


export const whatWeNeed = [
  "Product dimensions (L × W × H) or a physical sample",
  "Quantity per design",
  "Your logo and brand files, or a brief if you need design",
  "Box style, or what the box needs to do",
  "Delivery country and deadline",
  "Any regulatory text that must appear on the box",
];
