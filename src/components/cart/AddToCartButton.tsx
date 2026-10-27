"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useCart, type CartItem } from "@/store/cart";
import { Button } from "@/components/ui/Button";

/** Adds an item and confirms inline, with a link to the cart. */
export function AddToCartButton({ item, label = "Add to cart" }: { item: Omit<CartItem, "qty">; label?: string }) {
  const add = useCart((s) => s.add);
  const [done, setDone] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button
        onClick={() => {
          add(item);
          setDone(true);
          setTimeout(() => setDone(false), 2500);
        }}
        arrow
      >
        {label}
      </Button>
      <AnimatePresence>
        {done && (
          <motion.a
            href="/cart"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="spec underline underline-offset-4"
            role="status"
          >
            Added · view cart
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
