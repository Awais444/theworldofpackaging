import { designByGroup, designHref, designServices } from "./designServices";
import { industries } from "./industries";
import { printedStyles } from "./printedStyles";
import { rigidStyles } from "./rigidStyles";

export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { title: string; href?: string; links: NavLink[] };

/** Every quote CTA points here, so the route moves in one place . */
export const quoteHref = "/get-a-quote";

const rigidHref = (slug: string) => (slug === "collapsible" ? "/collapsible-rigid-boxes" : `/rigid-boxes/${slug}`);

const rigidLinks: NavLink[] = rigidStyles.map((s) => ({ label: s.name, href: rigidHref(s.slug) }));
const printedLinks: NavLink[] = printedStyles.filter((s) => s.slug !== "window").map((s) => ({ label: s.name, href: `/printed-boxes/${s.slug}` }));

export const boxesMenu: NavGroup[] = [
  { title: "Rigid boxes", href: "/rigid-boxes", links: rigidLinks },
  { title: "Printed boxes", href: "/printed-boxes", links: printedLinks },
  {
    title: "More",
    links: [
      { label: "Materials", href: "/materials" },
      { label: "Finishes", href: "/finishes" },
      { label: "Inserts", href: "/inserts" },
      { label: "Samples", href: "/samples" },
      { label: "All Boxes", href: "/boxes" },
    ],
  },
];

export const boxesPromo = {
  title: "Collapsible rigid boxes ship flat",
  text: "Rigid when it arrives, flat when it travels.",
  href: "/collapsible-rigid-boxes",
};

/** Packaging Design mega menu: By Product (top 12), By Format, By Service. */
const designLink = (slug: string): NavLink => {
  const d = designServices.find((x) => x.slug === slug)!;
  return { label: d.name.replace(/ Design$/, "").replace(/ Packaging$/, ""), href: designHref(slug) };
};

export const designMenu: NavGroup[] = [
  {
    title: "By Product",
    links: [
      "cosmetic-packaging-design",
      "skincare-packaging-design",
      "perfume-packaging-design",
      "food-packaging-design",
      "coffee-tea-packaging-design",
      "chocolate-packaging-design",
      "supplement-packaging-design",
      "cbd-packaging-design",
      "candle-packaging-design",
      "jewelry-packaging-design",
      "apparel-packaging-design",
      "gift-box-pr-kit-design",
    ].map(designLink),
  },
  { title: "By Format", links: designByGroup("format").map((d) => designLink(d.slug)) },
  { title: "By Service", links: designByGroup("service").map((d) => designLink(d.slug)) },
];

export const brandingMenu: NavLink[] = [
  { label: "Brand Identity", href: "/services/brand-identity", description: "Logo, colour and type as one system" },
  { label: "Logo Design", href: "/services/logo-design", description: "A mark that works from box to favicon" },
  { label: "Packaging Brand Strategy", href: designHref("packaging-brand-strategy"), description: "Positioning and on-pack messaging" },
  { label: "Amazon Packaging & Listing Images", href: "/services/amazon-packaging-and-listing-images", description: "Packaging plus the images that sell it" },
  { label: "Product Mockups for E-commerce", href: "/services/product-mockups-for-ecommerce", description: "Photo-real images before stock arrives" },
  { label: "Packages", href: "/packages", description: "Brand and packaging bundles" },
];

export const industriesMenu: NavLink[] = industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` }));

export type MenuId = "design" | "branding" | "boxes";
export type MainNavItem = { kind: "link"; label: string; href: string } | { kind: "menu"; label: string; id: MenuId; href: string };

export const mainNav: MainNavItem[] = [
  { kind: "menu", label: "Packaging Design", id: "design", href: "/packaging-design" },
  { kind: "menu", label: "Branding", id: "branding", href: "/services" },
  { kind: "menu", label: "Boxes & Printing", id: "boxes", href: "/boxes" },
  { kind: "link", label: "Industries", href: "/industries" },
  { kind: "link", label: "Work", href: "/work" },
];

export const primaryCta: NavLink = { label: "Get a Quote", href: quoteHref };

export const footerNav: NavGroup[] = [
  {
    title: "Boxes",
    links: [
      { label: "All boxes", href: "/boxes" },
      { label: "Rigid boxes", href: "/rigid-boxes" },
      { label: "Collapsible rigid boxes", href: "/collapsible-rigid-boxes" },
      { label: "Printed boxes", href: "/printed-boxes" },
      { label: "Mailer boxes", href: "/printed-boxes/mailer" },
      { label: "Magnetic boxes", href: "/rigid-boxes/magnetic-closure" },
      { label: "Samples", href: "/samples" },
    ],
  },
  {
    title: "Packaging Design",
    links: [
      { label: "All design services", href: "/packaging-design" },
      ...["cosmetic-packaging-design", "food-packaging-design", "coffee-tea-packaging-design", "supplement-packaging-design", "label-design", "rigid-luxury-box-design"].map(designLink),
    ],
  },
  { title: "Branding", links: brandingMenu.map(({ label, href }) => ({ label, href })) },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Pricing", href: "/pricing" },
      { label: "Factory", href: "/factory" },
      { label: "Industries", href: "/industries" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Work", href: "/work" },
      { label: "Shipping", href: "/shipping" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Sitemap", href: "/sitemap.xml" },
];
