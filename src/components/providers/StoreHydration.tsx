"use client";

import { useEffect } from "react";
import { useCart } from "@/store/cart";
import { useConfigurator } from "@/store/configurator";

/** Loads persisted cart and configurator state once, after hydration. */
export function StoreHydration() {
  useEffect(() => {
    void useCart.persist.rehydrate();
    void useConfigurator.persist.rehydrate();
  }, []);
  return null;
}
