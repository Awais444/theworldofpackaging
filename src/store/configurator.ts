import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CurrencyCode } from "@/config/site";
import { printedStyles } from "@/content/printedStyles";
import { getRigidStyle, rigidStyles } from "@/content/rigidStyles";
import { MOQ, type BoxConfig, type BoxType } from "@/lib/pricing";

export type DimUnit = "mm" | "in";

/** Sensible starting config for a box type and style. */
export function defaultsFor(type: BoxType, styleSlug?: string): BoxConfig {
  if (type === "printed") {
    const s = printedStyles.find((p) => p.slug === styleSlug) ?? printedStyles[0]!;
    return {
      type,
      style: s.slug,
      dims: { l: 250, w: 180, h: 80 },
      board: s.materials[0] ?? "SBS board",
      wrap: "",
      print: "outside",
      finishes: [],
      insert: null,
      quantity: MOQ.printed,
      ship: "sea",
      packing: "flat",
      artwork: "upload",
    };
  }
  const pool = type === "collapsible" ? rigidStyles.filter((s) => s.collapsible) : rigidStyles.filter((s) => !s.collapsible);
  const s = (styleSlug && getRigidStyle(styleSlug)) || pool[0]!;
  return {
    type,
    style: s.slug,
    dims: { l: 250, w: 180, h: 80 },
    board: s.boardMm.includes(2) ? "2.0" : s.boardMm[0]!.toFixed(1),
    wrap: s.wraps[0] ?? "Printed art paper",
    print: "outside",
    finishes: [],
    insert: null,
    quantity: MOQ[type],
    ship: type === "collapsible" ? "sea" : "air",
    packing: type === "collapsible" ? "flat" : "assembled",
    artwork: "upload",
  };
}

type State = {
  config: BoxConfig;
  unit: DimUnit;
  currency: CurrencyCode;
  /** True once the visitor picks a currency; until then Canadian visitors get CAD by default. */
  currencyChosen: boolean;
  step: number;
  set: (patch: Partial<BoxConfig>) => void;
  reset: (type: BoxType, style?: string) => void;
  setUnit: (u: DimUnit) => void;
  setCurrency: (c: CurrencyCode) => void;
  setStep: (n: number) => void;
};

export const useConfigurator = create<State>()(
  persist(
    (set) => ({
      config: defaultsFor("rigid"),
      unit: "mm",
      currency: "USD",
      currencyChosen: false,
      step: 0,
      set: (patch) => set((s) => ({ config: { ...s.config, ...patch } })),
      reset: (type, style) => set({ config: defaultsFor(type, style) }),
      setUnit: (unit) => set({ unit }),
      setCurrency: (currency) => set({ currency, currencyChosen: true }),
      setStep: (step) => set({ step }),
    }),
    // Rehydrated after mount by StoreHydration. Session storage: a configuration survives navigating to /quote and back, not forever.
    { name: "configurator", storage: createJSONStorage(() => sessionStorage), skipHydration: true },
  ),
);

/** Canadian visitor, judged by browser region or time zone (no network lookup). */
export function isCanadianVisitor(): boolean {
  try {
    if (new Intl.Locale(navigator.language).maximize().region === "CA") return true;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return ["America/Toronto", "America/Vancouver", "America/Edmonton", "America/Winnipeg", "America/Halifax", "America/St_Johns", "America/Regina", "America/Moncton", "America/Whitehorse", "America/Yellowknife", "America/Iqaluit", "America/Montreal"].includes(tz);
  } catch {
    return false;
  }
}
