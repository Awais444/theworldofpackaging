import type { Faq } from "./rigidStyles";
import { longformA } from "./designServices.longform.a";
import { longformB } from "./designServices.longform.b";
import { longformC } from "./designServices.longform.c";

/**
 * SEO long-form copy for the Priority 1 service pages in SEO_CONTENT_PLAN.md.
 * Rules: primary keyword in title, H1 and intro; supporting keywords in H2s and FAQs;
 * original copy only. Regulatory statements stay general and point to the client's adviser.
 */
export type LongForm = {
  /** Primary keyword from the plan. */
  keyword: string;
  /** Page title before " | The World of Packaging" (≤60 chars in total). */
  title: string;
  /** Meta description, ≤155 chars: benefit + own factory + call to action. */
  description: string;
  h1?: string;
  intro?: string;
  sections: Array<{ h2: string; paragraphs: string[] }>;
  /** Keyword-focused questions; the three shared questions are added after these. */
  faqs: Faq[];
  /** Blog slugs: three related guides linked from the page. */
  guides: string[];
};

export const longform: Record<string, LongForm> = { ...longformA, ...longformB, ...longformC };
