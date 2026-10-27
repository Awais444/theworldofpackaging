"use client";

import { AnimatePresence, motion } from "framer-motion";
import { formatMoney } from "@/lib/currency";
import { cartTotalUsd, useCart } from "@/store/cart";
import { Button } from "@/components/ui/Button";
import { SpecLabel } from "@/components/ui/SpecLabel";

export function CartView() {
  const { items, setQty, remove } = useCart();
  const total = cartTotalUsd(items);

  if (items.length === 0) {
    return (
      <div className="border-y border-silver-300 py-16">
        <p className="text-h3">Your cart is empty.</p>
        <p className="mt-3 text-ink-500">Samples and swatch kits you add will show up here.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/samples" arrow>
            Browse samples
          </Button>
          <Button href="/configure" variant="secondary">
            Configure a box
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <ul className="border-t border-silver-300 lg:col-span-8">
        <AnimatePresence initial={false}>
          {items.map((i) => (
            <motion.li
              key={i.id}
              layout
              exit={{ opacity: 0, x: -16 }}
              className="grid grid-cols-[1fr_auto] gap-4 border-b border-silver-300 py-6"
            >
              <div>
                <p className="font-medium">{i.title}</p>
                <SpecLabel items={i.spec} as="p" className="mt-1" />
                <button type="button" onClick={() => remove(i.id)} className="text-xs font-semibold uppercase tracking-wider mt-3 text-ink-500 underline underline-offset-4 hover:text-ink-900">
                  Remove
                </button>
              </div>
              <div className="flex flex-col items-end gap-3">
                <p>{formatMoney(i.priceUsd * i.qty, "USD")}</p>
                <div className="flex items-center border border-silver-300" role="group" aria-label={`Quantity for ${i.title}`}>
                  <button type="button" onClick={() => setQty(i.id, i.qty - 1)} aria-label="Decrease" className="h-9 w-9">
                    −
                  </button>
                  <span className="w-8 text-center" aria-live="polite">
                    {i.qty}
                  </span>
                  <button type="button" onClick={() => setQty(i.id, i.qty + 1)} aria-label="Increase" className="h-9 w-9">
                    +
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <aside className="lg:col-span-4">
        <div className="border border-silver-300 p-6 lg:sticky lg:top-[calc(var(--header-h)+24px)]">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Subtotal</p>
          <p className="font-heading font-bold mt-2 text-h3">{formatMoney(total, "USD")}</p>
          <p className="mt-2 text-sm text-ink-500">Shipping confirmed before payment. Sample fees are credited to your bulk order.</p>
          <Button href="/checkout" arrow className="mt-6 w-full">
            Checkout
          </Button>
        </div>
      </aside>
    </div>
  );
}
