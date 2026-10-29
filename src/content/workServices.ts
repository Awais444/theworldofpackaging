// No imports from caseStudies here (caseStudies imports this file).

/** /work filter categories = our packaging design services, in pill order. `id` matches the service URL slug. */
export const WORK_SERVICES = [
  { id: "product-packaging-design", label: "Product Packaging Design", href: "/packaging-design" },
  { id: "box-packaging-design", label: "Box Packaging Design", href: "/packaging-design/box-packaging-design" },
  { id: "rigid-luxury-box-design", label: "Rigid & Luxury Box Design", href: "/packaging-design/rigid-luxury-box-design" },
  { id: "label-design", label: "Label Design", href: "/packaging-design/label-design" },
  { id: "pouch-packaging-design", label: "Pouch & Sachet Design", href: "/packaging-design/pouch-packaging-design" },
  { id: "bottle-label-design", label: "Bottle & Jar Label Design", href: "/packaging-design/bottle-label-design" },
  { id: "shopping-bag-design", label: "Bag & Shopping Bag Design", href: "/packaging-design/shopping-bag-design" },
  { id: "retail-display-design", label: "Retail & Display Packaging", href: "/packaging-design/retail-display-design" },
  { id: "unboxing-packaging-design", label: "Unboxing & Mailer Design", href: "/packaging-design/unboxing-packaging-design" },
  { id: "brand-identity", label: "Brand Identity", href: "/services/brand-identity" },
] as const;

export type WorkServiceId = (typeof WORK_SERVICES)[number]["id"];

export const getWorkService = (id: string) => WORK_SERVICES.find((s) => s.id === id);
