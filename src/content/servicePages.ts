import { agencyServices, serviceCommonFaqs, type AgencyService } from "./agencyServices";
import type { Faq } from "./rigidStyles";

/** The six public service pages (CLAUDE.md §9), built on the agency service records. */
export type ServicePage = AgencyService & {
  /** URL slug under /services. */
  path: string;
  icon: "palette" | "pen" | "package" | "tag" | "ruler" | "box";
  /** Box pages to pair the service with (§7.3 "Pair it with production"). */
  pairWith: Array<{ kind: "rigid" | "printed"; slug: string }>;
};

const extraFaqs: Faq[] = [
  { q: "Do you also manufacture the boxes?", a: "Yes. Our own factory makes rigid boxes and prints all types of boxes, so design goes straight into production." },
  { q: "Who owns the final files?", a: "You do. Final artwork and source files are handed over when the project is paid in full." },
];

const config: Array<{ agency: string; path: string; icon: ServicePage["icon"]; pairWith: ServicePage["pairWith"] }> = [
  { agency: "brand-identity", path: "brand-identity", icon: "palette", pairWith: [{ kind: "rigid", slug: "magnetic-closure" }, { kind: "printed", slug: "mailer" }, { kind: "rigid", slug: "drawer" }, { kind: "printed", slug: "tuck-end" }] },
  { agency: "logo-design", path: "logo-design", icon: "pen", pairWith: [{ kind: "rigid", slug: "lid-and-base" }, { kind: "printed", slug: "mailer" }, { kind: "printed", slug: "sleeve" }, { kind: "rigid", slug: "book-style" }] },
  { agency: "packaging-design", path: "packaging-design", icon: "package", pairWith: [{ kind: "rigid", slug: "magnetic-closure" }, { kind: "rigid", slug: "collapsible" }, { kind: "printed", slug: "folding-carton" }, { kind: "printed", slug: "mailer" }] },
  { agency: "label-design", path: "label-design", icon: "tag", pairWith: [{ kind: "rigid", slug: "tube" }, { kind: "rigid", slug: "shoulder-neck" }, { kind: "printed", slug: "tuck-end" }, { kind: "printed", slug: "sleeve" }] },
  { agency: "structural-dieline", path: "structural-dieline-design", icon: "ruler", pairWith: [{ kind: "printed", slug: "folding-carton" }, { kind: "printed", slug: "display" }, { kind: "rigid", slug: "drawer" }, { kind: "rigid", slug: "window" }] },
  { agency: "3d-mockups", path: "3d-mockups", icon: "box", pairWith: [{ kind: "rigid", slug: "magnetic-closure" }, { kind: "rigid", slug: "book-style" }, { kind: "printed", slug: "mailer" }, { kind: "printed", slug: "gable" }] },
];

export const servicePages: ServicePage[] = config.map((c) => {
  const s = agencyServices.find((a) => a.slug === c.agency)!;
  return { ...s, path: c.path, icon: c.icon, pairWith: c.pairWith, faqs: [...s.faqs, ...serviceCommonFaqs, ...extraFaqs].slice(0, 5) };
});

export const getServicePage = (path: string) => servicePages.find((s) => s.path === path);

