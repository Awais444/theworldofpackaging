import { site } from "@/config/site.config";

export type NavLink = { label: string; href: string; spec?: string };

export const manufacturingNav: NavLink[] = [
  { label: "Rigid Boxes", href: "/rigid-boxes", spec: `8 styles / MOQ ${site.facts.rigidMoq}` },
  { label: "Collapsible Rigid", href: "/collapsible-rigid-boxes", spec: "Ships flat" },
  { label: "Printed Boxes", href: "/printed-boxes", spec: "Mailer / carton / shipping" },
  { label: "Inserts", href: "/rigid-boxes/inserts", spec: "EVA / velvet / card" },
  { label: "Materials & Finishes", href: "/rigid-boxes/materials", spec: "Board / wraps / foil" },
  { label: "Configure a Box", href: "/configure", spec: "Live estimate" },
];

export type MainNavItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "menu"; label: string; id: "manufacturing"; items: NavLink[] };

export const mainNav: MainNavItem[] = [
  { kind: "link", label: "Work", href: "/work" },
  { kind: "link", label: "Branding", href: "/branding" },
  { kind: "link", label: "Packaging Design", href: "/packaging-design" },
  { kind: "menu", label: "Manufacturing", id: "manufacturing", items: manufacturingNav },
  { kind: "link", label: "Packages", href: "/packages" },
  { kind: "link", label: "Studio & Factory", href: "/studio-and-factory" },
];

export const primaryCta: NavLink = { label: "Start a Project", href: "/start-a-project" };

export const footerNav: Array<{ title: string; links: NavLink[] }> = [
  {
    title: "Studio",
    links: [
      { label: "Work", href: "/work" },
      { label: "Branding", href: "/branding" },
      { label: "Packaging Design", href: "/packaging-design" },
      { label: "Packages", href: "/packages" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Manufacturing",
    links: [
      { label: "Rigid Boxes", href: "/rigid-boxes" },
      { label: "Collapsible Rigid", href: "/collapsible-rigid-boxes" },
      { label: "Printed Boxes", href: "/printed-boxes" },
      { label: "Configure a Box", href: "/configure" },
      { label: "Order Samples", href: "/samples" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Studio & Factory", href: "/studio-and-factory" },
      { label: "Process", href: "/process" },
      { label: "Industries", href: "/industries" },
      { label: "Shipping", href: "/shipping" },
      { label: "Guides", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
