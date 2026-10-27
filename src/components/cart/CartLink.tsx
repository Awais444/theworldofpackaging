"use client";

import Link from "next/link";
import { cartCount, useCart } from "@/store/cart";

/** Header cart link; only shown once something is in the cart. */
export function CartLink() {
  const count = useCart((s) => cartCount(s.items));
  if (count === 0) return null;
  return (
    <Link href="/cart" className="spec inline-flex h-9 items-center gap-1.5 px-2 text-fg hover:text-accent" aria-label={`Cart, ${count} items`}>
      Cart <span className="font-mono">({count})</span>
    </Link>
  );
}
