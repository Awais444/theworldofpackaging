import { site } from "@/config/site";
import type { Faq } from "./rigidStyles";

/** FAQ page groups (CLAUDE.md §9 /faq). Answers marked TODO need confirming before launch. */
export const faqGroups: { id: string; title: string; faqs: Faq[] }[] = [
  {
    id: "ordering",
    title: "Ordering",
    faqs: [
      { q: "What do you do?", a: "We design brands and packaging, and manufacture rigid boxes and printed boxes in our own factory." },
      { q: "What is the minimum order?", a: `${site.facts.rigidMoq} boxes per design for rigid and collapsible rigid boxes. Printed box minimums depend on the style and are confirmed with your quote.` },
      { q: "How do I get a price?", a: `Send a quote request with size, quantity and finishes. We reply ${site.facts.quoteReply}.` },
      { q: "Can I order several sizes in one order?", a: "Yes. Each size is its own design with its own minimum, but they can be produced and shipped together." },
      { q: "Can I get a sample first?", a: "Yes. We make a physical sample before production. The sample fee is credited to your bulk order." },
      { q: "Can I reorder the same box later?", a: "Yes. We keep your dielines and approved specs on file, so reorders are quicker and need no new sample." },
    ],
  },
  {
    id: "design",
    title: "Design",
    faqs: [
      { q: "Do I need my own designer?", a: "No. Free design support comes with every order, and our studio offers full branding and packaging design." },
      { q: "What is included in free design support?", a: "Artwork checks, dieline setup and help placing your logo and text. New concepts are part of our design services." },
      { q: "What file formats do you accept?", a: "Vector PDF or AI files are best. We can work from high-resolution PNGs for simple logos." },
      { q: "How quickly do I see first concepts?", a: `Usually within ${site.facts.firstConceptHours} hours of the brief being agreed, for logo and packaging concept rounds.` },
      { q: "How many revision rounds are included?", a: "We agree rounds in the proposal before work starts, so there are no surprises." },
      { q: "Can you match my Pantone colours?", a: "Yes. We print Pantone spot colours and check the first sheet against your reference." },
    ],
  },
  {
    id: "production",
    title: "Production",
    faqs: [
      { q: "Do you make the boxes yourselves?", a: "Yes. Rigid boxes are cut, wrapped and finished in our own factory, and we print all types of boxes." },
      { q: "How long does production take?", a: "It depends on the box style, finishes and quantity. We confirm the lead time with your quote." }, // TODO real lead times
      { q: "What is a collapsible rigid box?", a: "A rigid box with hinged walls that folds flat for shipping and storage, then locks into a rigid box in seconds." },
      { q: "Which finishes can I choose?", a: "Foil stamping, embossing, debossing, spot UV, matte or gloss lamination, soft-touch, window patches, ribbons and magnets." },
      { q: "How do you check quality?", a: "Every batch is checked against the approved sample: board, colour, wrap, corners, finishes and insert fit." },
      { q: "Do you offer recycled or certified materials?", a: "We can source recycled boards and certified papers for many specs. Ask with your quote and we confirm what is available." }, // TODO verify
    ],
  },
  {
    id: "shipping",
    title: "Shipping",
    faqs: [
      { q: "Which countries do you ship to?", a: "Worldwide. Most of our clients are in the USA, UK, Canada, Australia, the UAE and the EU." },
      { q: "Air or sea?", a: "Air for samples and urgent stock; sea for production volumes. We quote both on request." },
      { q: "Who pays import duties?", a: "Usually the importer. We can quote delivered-duty-paid where possible." }, // TODO confirm DDP
      { q: "Can you deliver to my 3PL or Amazon warehouse?", a: "Yes. Give us the address and any labelling rules before we pack." },
      { q: "How are boxes packed?", a: "In strong export cartons with corner protection. Collapsible boxes are packed flat." },
    ],
  },
  {
    id: "payment",
    title: "Payment",
    faqs: [
      { q: "How do I pay?", a: "Payment terms and methods are set out in your quote." }, // TODO deposit / balance terms and methods
      { q: "Which currency do you quote in?", a: "We quote in US dollars by default. Other currencies on request." },
      { q: "Is the sample fee refundable?", a: "It is credited against your production invoice when you place the bulk order." },
      { q: "Are there hidden costs?", a: "No. Your quote lists boxes, finishes, inserts and freight separately, so you see the full cost before you approve." },
      { q: "Do prices drop at higher quantities?", a: "Yes. Unit price falls as quantity rises. Ask for quotes at two or three quantities to compare." },
    ],
  },
];
