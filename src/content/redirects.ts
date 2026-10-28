// No imports: next.config.ts loads this file directly, outside the @/ alias.
/**
 * Old service URLs and where they now live. /packaging-design is the packaging design hub
 * (design-first focus); /services keeps branding and imagery services.
 */
export const legacyServiceRedirects: Record<string, string> = {
  "/branding": "/services",
  "/branding/strategy-naming": "/packaging-design/packaging-brand-strategy",
  "/branding/logo-design": "/services/logo-design",
  "/branding/brand-identity": "/services/brand-identity",
  "/branding/brand-guidelines": "/services/brand-identity",
  "/branding/rebranding": "/packaging-design/packaging-redesign",
  "/packaging-design/packaging-design": "/packaging-design/box-packaging-design",
  "/packaging-design/rigid-box-design": "/packaging-design/rigid-luxury-box-design",
  "/packaging-design/structural-dieline": "/packaging-design/structural-dieline-design",
  "/packaging-design/3d-mockups": "/packaging-design/3d-packaging-mockups",
  "/services/packaging-design": "/packaging-design",
  "/services/label-design": "/packaging-design/label-design",
  "/services/structural-dieline-design": "/packaging-design/structural-dieline-design",
  "/services/3d-mockups": "/packaging-design/3d-packaging-mockups",
  // SEO plan slugs (2026-10-28): old URLs move to the keyword-matched ones.
  "/packaging-design/perfume-packaging-design": "/packaging-design/perfume-fragrance-packaging-design",
  "/packaging-design/supplement-packaging-design": "/packaging-design/supplement-label-design",
  "/packaging-design/beverage-juice-packaging-design": "/packaging-design/beverage-packaging-design",
  "/packaging-design/wine-spirits-beer-label-design": "/packaging-design/wine-spirits-label-design",
  "/packaging-design/pet-product-packaging-design": "/packaging-design/pet-food-packaging-design",
  "/packaging-design/pouch-sachet-design": "/packaging-design/pouch-packaging-design",
  "/packaging-design/amazon-ecommerce-packaging-design": "/packaging-design/amazon-packaging-design",
  "/services/amazon-packaging-and-listing-images": "/packaging-design/amazon-packaging-design",
  "/services/product-mockups-for-ecommerce": "/packaging-design/3d-packaging-mockups",
};

/** Old /ship-to pages and short aliases move to /countries (COUNTRY_PAGES_PLAN.md §1). */
export const legacyCountryRedirects: Record<string, string> = {
  "/ship-to/usa": "/countries/united-states",
  "/ship-to/uk": "/countries/united-kingdom",
  "/ship-to/canada": "/countries/canada",
  "/ship-to/australia": "/countries/australia",
  "/ship-to/uae": "/countries/uae",
  "/ship-to/germany": "/countries/germany",
  "/usa": "/countries/united-states",
  "/uk": "/countries/united-kingdom",
  "/uae": "/countries/uae",
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
  // Browsers ask for these by convention; the real icons are app/icon.svg and app/apple-icon.
  "/favicon.ico": "/icon.svg",
  "/apple-touch-icon.png": "/apple-icon",
  "/apple-touch-icon-precomposed.png": "/apple-icon",
};
