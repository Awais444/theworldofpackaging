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
    slug: "rigid-vs-printed-boxes",
    title: "Rigid vs printed boxes: which does your product need?",
    description: "How the two constructions differ in board, cost, feel and shipping, and how to choose between them.",
    date: "2026-10-01",
    readingMinutes: 5,
    tags: ["Rigid boxes", "Printed boxes"],
    illustration: "magnetic-closed",
  },
  {
    slug: "collapsible-rigid-boxes-freight",
    title: "How collapsible rigid boxes cut freight volume",
    description: "Why fixed rigid boxes ship mostly air, and what changes when the walls fold flat.",
    date: "2026-10-08",
    readingMinutes: 4,
    tags: ["Collapsible", "Shipping"],
    illustration: "collapsible-flat",
  },
  {
    slug: "print-ready-packaging-checklist",
    title: "Print-ready packaging files: a pre-press checklist",
    description: "The checks we run on every packaging file before it reaches the press, so you can run them first.",
    date: "2026-10-15",
    readingMinutes: 6,
    tags: ["Pre-press", "Artwork"],
    illustration: "dieline-flat",
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
