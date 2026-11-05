import type { IllustrationKey } from "@/components/illustrations";
import type { Faq } from "../rigidStyles";
import { postMeta, type BlogCategoryId } from "./categories";
import { compliancePosts } from "./compliancePosts";
import { guidePosts } from "./guidePosts";

/** A post as written in the content files. Category, cover and featured come from ./categories.ts. */
export type PostInput = {
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
const postInputs: PostInput[] = [
  ...compliancePosts,
  ...guidePosts,
  {
    slug: "rigid-vs-folding-carton-boxes",
    title: "Rigid vs folding carton boxes: which does your product need?",
    seoTitle: "Rigid vs Folding Carton Boxes",
    description: "How the two constructions differ in board, feel, cost and shipping, and how to choose between them.",
    date: "2026-10-01",
    readingMinutes: 4,
    tags: ["Rigid boxes", "Folding cartons"],
    illustration: "magnetic-closed",
    services: ["box-packaging-design", "rigid-luxury-box-design"],
  },
  {
    slug: "how-to-measure-box-size",
    title: "How to measure your box size",
    description: "Length, width and height, inside dimensions, inserts and the mistakes that make boxes not fit.",
    date: "2026-10-08",
    readingMinutes: 4,
    tags: ["Sizing", "Ordering"],
    illustration: "tuck-end",
    services: ["box-packaging-design", "structural-dieline-design"],
  },
  {
    slug: "collapsible-rigid-boxes-explained",
    title: "Collapsible rigid boxes explained",
    description: "How hinged walls let a rigid box ship flat, what it saves on freight and who it suits.",
    date: "2026-10-15",
    readingMinutes: 4,
    tags: ["Collapsible", "Shipping"],
    illustration: "collapsible-flat",
    services: ["rigid-luxury-box-design", "luxury-packaging-design"],
  },
  {
    slug: "packaging-cost-guide",
    title: "Packaging cost guide: what sets the price of custom boxes",
    seoTitle: "Custom Box Packaging Cost Guide",
    description: "The five things that set box prices, one-off vs unit costs, and how to lower the price without making the box look cheaper.",
    date: "2026-10-22",
    readingMinutes: 5,
    tags: ["Pricing", "Ordering"],
    illustration: "tuck-end",
    services: ["box-packaging-design", "packaging-redesign"],
  },
  {
    slug: "box-finishes-explained",
    title: "Box finishes explained: foil, embossing, spot UV and soft-touch",
    seoTitle: "Box Finishes Explained",
    description: "What each common finish does, when it is worth it, and combinations that work.",
    date: "2026-10-23",
    readingMinutes: 5,
    tags: ["Finishes", "Design"],
    illustration: "magnetic-closed",
    services: ["luxury-packaging-design", "box-packaging-design"],
  },
  {
    slug: "how-to-brief-a-packaging-designer",
    title: "How to brief a packaging designer",
    description: "The eight questions a good packaging brief answers, from product and customer to budget and sign-off.",
    date: "2026-10-24",
    readingMinutes: 5,
    tags: ["Design", "Process"],
    illustration: "brand-board",
    services: ["packaging-brand-strategy", "box-packaging-design"],
  },
  {
    slug: "eva-vs-card-inserts",
    title: "EVA vs card inserts: which should you choose?",
    seoTitle: "EVA vs Card Box Inserts",
    description: "How EVA foam and card inserts compare on protection, look, recyclability and cost, plus velvet, satin and moulded pulp.",
    date: "2026-10-25",
    readingMinutes: 4,
    tags: ["Inserts", "Materials"],
    illustration: "magnetic-open",
    services: ["rigid-luxury-box-design", "unboxing-packaging-design"],
  },
  {
    slug: "shipping-rigid-boxes-internationally",
    title: "Shipping rigid boxes internationally",
    seoTitle: "Shipping Rigid Boxes Abroad",
    description: "Air vs sea, why volume drives cost, packing, documents and duties, and planning the timeline backwards.",
    date: "2026-10-26",
    readingMinutes: 5,
    tags: ["Shipping", "Rigid boxes"],
    illustration: "shipping-carton",
    services: ["rigid-luxury-box-design", "amazon-packaging-design"],
  },
];

export type Post = PostInput & { category: BlogCategoryId; featured: boolean; cover: (typeof postMeta)[string]["cover"] };

/** Every post with its one primary category and card cover. A post missing from postMeta fails the build. */
export const posts: Post[] = postInputs.map((p) => {
  const meta = postMeta[p.slug];
  if (!meta) throw new Error(`Blog post "${p.slug}" has no category in content/blog/categories.ts`);
  return { ...p, category: meta.category, featured: meta.featured ?? false, cover: meta.cover };
});

// Every category entry belongs to a real post, and no two posts share a cover photo.
{
  const slugs = new Set(postInputs.map((p) => p.slug));
  const stray = Object.keys(postMeta).filter((s) => !slugs.has(s));
  if (stray.length) throw new Error(`content/blog/categories.ts lists unknown posts: ${stray.join(", ")}`);
  const photos = posts.flatMap((p) => ("photo" in p.cover ? [p.cover.photo] : []));
  const dupes = photos.filter((ph, i) => photos.indexOf(ph) !== i);
  if (dupes.length) throw new Error(`Blog covers reuse photos: ${dupes.join(", ")}`);
}

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
