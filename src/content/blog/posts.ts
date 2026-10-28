import type { IllustrationKey } from "@/components/illustrations";
import type { Faq } from "../rigidStyles";
import { compliancePosts } from "./compliancePosts";

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date. TODO: set real publish dates. */
  date: string;
  readingMinutes: number;
  tags: string[];
  illustration: IllustrationKey;
  /** Compliance guides (SEO plan Priority 2) carry a review date, sources and a disclaimer. */
  kind?: "compliance" | "guide";
  /** Page title before " | The World of Packaging" when it differs from the H1. */
  seoTitle?: string;
  /** ISO date the facts were last checked against the sources. */
  reviewed?: string;
  /** Official sources, listed under the article. */
  sources?: Array<{ label: string; url: string }>;
  /** Two related packaging design services (slugs). */
  services?: string[];
  faqs?: Faq[];
};

// Bodies live in ./<slug>.mdx and are imported dynamically by the post route.
export const posts: Post[] = [
  ...compliancePosts,
  {
    slug: "rigid-vs-folding-carton-boxes",
    title: "Rigid vs folding carton boxes: which does your product need?",
    description: "How the two constructions differ in board, feel, cost and shipping, and how to choose between them.",
    date: "2026-10-01",
    readingMinutes: 4,
    tags: ["Rigid boxes", "Folding cartons"],
    illustration: "magnetic-closed",
  },
  {
    slug: "how-to-measure-box-size",
    title: "How to measure your box size",
    description: "Length, width and height, inside dimensions, inserts and the mistakes that make boxes not fit.",
    date: "2026-10-08",
    readingMinutes: 4,
    tags: ["Sizing", "Ordering"],
    illustration: "tuck-end",
  },
  {
    slug: "collapsible-rigid-boxes-explained",
    title: "Collapsible rigid boxes explained",
    description: "How hinged walls let a rigid box ship flat, what it saves on freight and who it suits.",
    date: "2026-10-15",
    readingMinutes: 4,
    tags: ["Collapsible", "Shipping"],
    illustration: "collapsible-flat",
  },
  {
    slug: "packaging-cost-guide",
    title: "Packaging cost guide: what sets the price of custom boxes",
    description: "The five things that set box prices, one-off vs unit costs, and how to lower the price without making the box look cheaper.",
    date: "2026-10-22",
    readingMinutes: 5,
    tags: ["Pricing", "Ordering"],
    illustration: "tuck-end",
  },
  {
    slug: "box-finishes-explained",
    title: "Box finishes explained: foil, embossing, spot UV and soft-touch",
    description: "What each common finish does, when it is worth it, and combinations that work.",
    date: "2026-10-23",
    readingMinutes: 5,
    tags: ["Finishes", "Design"],
    illustration: "magnetic-closed",
  },
  {
    slug: "how-to-brief-a-packaging-designer",
    title: "How to brief a packaging designer",
    description: "The eight questions a good packaging brief answers, from product and customer to budget and sign-off.",
    date: "2026-10-24",
    readingMinutes: 5,
    tags: ["Design", "Process"],
    illustration: "brand-board",
  },
  {
    slug: "eva-vs-card-inserts",
    title: "EVA vs card inserts: which should you choose?",
    description: "How EVA foam and card inserts compare on protection, look, recyclability and cost, plus velvet, satin and moulded pulp.",
    date: "2026-10-25",
    readingMinutes: 4,
    tags: ["Inserts", "Materials"],
    illustration: "magnetic-open",
  },
  {
    slug: "shipping-rigid-boxes-internationally",
    title: "Shipping rigid boxes internationally",
    description: "Air vs sea, why volume drives cost, packing, documents and duties, and planning the timeline backwards.",
    date: "2026-10-26",
    readingMinutes: 5,
    tags: ["Shipping", "Rigid boxes"],
    illustration: "shipping-carton",
  },
  {
    slug: "choosing-board-thickness",
    title: "Choosing board thickness for your boxes",
    description: "Greyboard thickness for rigid boxes, paperboard weight for cartons and flute for mailers, and how to choose.",
    date: "2026-10-27",
    readingMinutes: 4,
    tags: ["Materials", "Rigid boxes"],
    illustration: "lid-and-base",
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
