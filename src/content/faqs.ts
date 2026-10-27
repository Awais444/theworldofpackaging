import { site } from "@/config/site.config";
import { serviceCommonFaqs } from "./agencyServices";
import { printedCommonFaqs } from "./printedStyles";
import { rigidCommonFaqs, type Faq } from "./rigidStyles";

export const faqGroups: { id: string; title: string; faqs: Faq[] }[] = [
  {
    id: "general",
    title: "General",
    faqs: [
      { q: "What do you do?", a: "We design brands and packaging, and manufacture rigid boxes and printed boxes in our own factory." },
      { q: "Where are you based?", a: `Our studio and factory are in ${site.country}. We work with clients in ${site.markets.join(", ")} and elsewhere.` },
      { q: "Do I have to use both design and manufacturing?", a: "No. Many clients only need one. Doing both with us saves hand-offs and reprints." },
    ],
  },
  { id: "rigid", title: "Rigid boxes", faqs: rigidCommonFaqs },
  { id: "printed", title: "Printed boxes", faqs: printedCommonFaqs },
  { id: "design", title: "Design", faqs: serviceCommonFaqs },
  {
    id: "shipping",
    title: "Shipping",
    faqs: [
      { q: "Which countries do you ship to?", a: "Worldwide. Most of our clients are in the USA, UK, Canada, Australia, UAE and the EU." },
      { q: "Air or sea?", a: "Air for samples and urgent stock; sea for production volumes. We quote both on request." },
      { q: "Who pays import duties?", a: "Usually the importer. We can quote delivered-duty-paid where possible." },
    ],
  },
  {
    id: "ordering",
    title: "Ordering",
    faqs: [
      { q: "How do I get a price?", a: `Use the configurator for an estimate or send a quote request; we reply within ${site.facts.quoteReplyHours} hours on working days.` },
      { q: "How do I pay?", a: "Payment terms are set out in your quote." }, // TODO: deposit / balance terms
    ],
  },
];
