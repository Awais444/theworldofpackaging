"use client";

import { useEffect } from "react";
import { useCart } from "@/store/cart";
import { useConfigurator } from "@/store/configurator";
import { useQuote } from "@/store/quote";

/** Loads persisted cart, configurator and quote state once, after hydration. */
export function StoreHydration() {
  useEffect(() => {
    void useCart.persist.rehydrate();
    void useConfigurator.persist.rehydrate();
    void useQuote.persist.rehydrate();
  }, []);
  return null;
}
