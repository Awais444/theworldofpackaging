import type { IllustrationKey } from "@/components/illustrations";

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date. TODO: set real publish dates. */
  date: string;
  readingMinutes: number;
  tags: string[];
  illustration: IllustrationKey;
};

// Bodies live in ./<slug>.mdx and are imported dynamically by the post route.
export const posts: Post[] = [
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
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
