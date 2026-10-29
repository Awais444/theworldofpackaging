"use client";

import { useEffect } from "react";
import { useConfigurator } from "@/store/configurator";
import { useQuote } from "@/store/quote";

/** Loads persisted configurator and quote state once, after hydration. */
export function StoreHydration() {
  useEffect(() => {
    void useConfigurator.persist.rehydrate();
    void useQuote.persist.rehydrate();
  }, []);
  return null;
}
