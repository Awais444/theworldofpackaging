// No imports: next.config.ts loads this file directly, outside the @/ alias.
/** Old /branding and /packaging-design URLs and where they now live. */
export const legacyServiceRedirects: Record<string, string> = {
  "/branding": "/services",
  "/packaging-design": "/services",
  "/branding/strategy-naming": "/services/brand-identity",
  "/branding/logo-design": "/services/logo-design",
  "/branding/brand-identity": "/services/brand-identity",
  "/branding/brand-guidelines": "/services/brand-identity",
  "/branding/rebranding": "/services/brand-identity",
  "/packaging-design/packaging-design": "/services/packaging-design",
  "/packaging-design/rigid-box-design": "/services/packaging-design",
  "/packaging-design/label-design": "/services/label-design",
  "/packaging-design/structural-dieline": "/services/structural-dieline-design",
  "/packaging-design/3d-mockups": "/services/3d-mockups",
};

/** Phase 5 renamed this industry slug to match CLAUDE.md §9. */
export const legacyIndustryRedirects: Record<string, string> = {
  "/industries/pr-kits-corporate-gifts": "/industries/gifts-pr-kits",
};

/** Phase 6 moved company pages and replaced the guides (CLAUDE.md §9). */
export const legacyCompanyRedirects: Record<string, string> = {
  "/studio-and-factory": "/about",
  "/process": "/how-it-works",
  "/blog/rigid-vs-printed-boxes": "/blog/rigid-vs-folding-carton-boxes",
  "/blog/collapsible-rigid-boxes-freight": "/blog/collapsible-rigid-boxes-explained",
  "/blog/print-ready-packaging-checklist": "/blog",
};

/** Phase 7 moved the quote form (CLAUDE.md §9). */
export const legacyQuoteRedirects: Record<string, string> = {
  "/quote": "/get-a-quote",
};
