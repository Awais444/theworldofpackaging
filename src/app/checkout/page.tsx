import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CheckoutView } from "@/components/cart/CheckoutView";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <section className="container-x pt-8 pb-24">
      <Breadcrumbs items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <h1 className="type-display mt-10 mb-12 text-display-lg">Checkout.</h1>
      <CheckoutView />
    </section>
  );
}
