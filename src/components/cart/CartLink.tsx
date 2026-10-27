"use client";

import Link from "next/link";
import { cartCount, useCart } from "@/store/cart";

/** Header cart link; only shown once something is in the cart. */
export function CartLink() {
  const count = useCart((s) => cartCount(s.items));
  if (count === 0) return null;
  return (
    <Link href="/cart" className="text-xs font-semibold uppercase tracking-wider inline-flex h-9 items-center gap-1.5 px-2 text-ink-900 hover:text-blue-600" aria-label={`Cart, ${count} items`}>
      Cart <span>({count})</span>
    </Link>
  );
}
