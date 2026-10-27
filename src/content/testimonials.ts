export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** True until replaced with a real, approved client quote. */
  placeholder: boolean;
};

// TODO: replace with real client quotes (with written permission).
export const testimonials: Testimonial[] = [
  {
    quote: "Placeholder: a client quote about getting brand, packaging and production from one team.",
    name: "Client name",
    role: "Founder, brand name",
    placeholder: true,
  },
  {
    quote: "Placeholder: a client quote about the sample matching the bulk order.",
    name: "Client name",
    role: "Operations lead, brand name",
    placeholder: true,
  },
  {
    quote: "Placeholder: a client quote about freight savings from collapsible boxes.",
    name: "Client name",
    role: "Head of e-commerce, brand name",
    placeholder: true,
  },
];
