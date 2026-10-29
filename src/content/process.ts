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
    title: "Proof",
    body: "A digital proof (PDF with dieline, colours and copy) and a 3D mockup of your box. We do not make physical samples.",
    you: "Check the proof and mockup with your team and send any changes.",
    us: "Prepare the proof on the real dieline and update it until it is right.",
    time: "Digital, no courier wait",
    deliverables: ["PDF proof with dieline, colours and copy", "3D mockup of your box", "Notes on any changes"],
  },
  {
    title: "Approval",
    body: "You sign off the proof and the final spec. Nothing is printed until you approve.",
    you: "Approve the proof, spec sheet and final artwork.",
    us: "Lock the spec and book your production slot.",
    time: "Your sign-off",
    deliverables: ["Approved proof and spec sheet", "Final artwork locked", "Production slot booked"],
  },
  {
    title: "Production",
    body: "Cutting, printing, wrapping, inserts and quality checks in our factory.",
    you: "Nothing. We send production photos and video on WhatsApp before dispatch.",
    us: "Make your boxes and check every batch against the approved proof.",
    time: leadTime,
    deliverables: ["Cutting, printing and wrapping in our factory", "Production photos and video on WhatsApp before dispatch", "Every batch checked against the approved proof"],
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
  "Product dimensions (L × W × H), or your product itself",
  "Quantity per design",
  "Your logo and brand files, or a brief if you need design",
  "Box style, or what the box needs to do",
  "Delivery country and deadline",
  "Any regulatory text that must appear on the box",
];
