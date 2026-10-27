import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = { title: "Cart", robots: { index: false } };

export default function CartPage() {
  return (
    <section className="container-x pt-8 pb-24">
      <Breadcrumbs items={[{ label: "Cart" }]} />
      <h1 className="type-display mt-10 mb-12 text-display-lg">Cart.</h1>
      <CartView />
    </section>
  );
}
