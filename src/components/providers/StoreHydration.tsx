"use client";

import { useEffect } from "react";
import { useConfigurator } from "@/store/configurator";
import { useQuote } from "@/store/quote";

/**
 * Loads persisted configurator and quote state once, after hydration. Rendered by the configurator
 * and quote builder only (not the root layout), so Zustand never ships on other pages.
 */
export function StoreHydration() {
  useEffect(() => {
    void useConfigurator.persist.rehydrate();
    void useQuote.persist.rehydrate();
  }, []);
  return null;
}
