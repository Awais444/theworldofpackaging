import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { DIM_UNITS, QUOTE_ARTWORK, QUOTE_CATEGORIES, QUOTE_PACKING, QUOTE_SHIP } from "@/lib/schemas";

export type QuoteDraft = {
  category?: (typeof QUOTE_CATEGORIES)[number];
  style: string;
  helpChoose: boolean;
  unit: (typeof DIM_UNITS)[number];
  length?: number;
  width?: number;
  height?: number;
  quantity?: number;
  materials: string[];
  finishes: string[];
  artwork?: (typeof QUOTE_ARTWORK)[number];
  /** File names only: files are requested by email after the first reply. */
  files: string[];
  country: string;
  ship?: (typeof QUOTE_SHIP)[number];
  packing?: (typeof QUOTE_PACKING)[number];
  name: string;
  email: string;
  company: string;
  whatsapp: string;
  notes: string;
};

const empty: QuoteDraft = {
  style: "",
  helpChoose: false,
  unit: "mm",
  materials: [],
  finishes: [],
  files: [],
  country: "",
  name: "",
  email: "",
  company: "",
  whatsapp: "",
  notes: "",
};

type QuoteState = {
  draft: QuoteDraft;
  step: number;
  set: (patch: Partial<QuoteDraft>) => void;
  toggle: (key: "materials" | "finishes", value: string) => void;
  goTo: (step: number) => void;
  reset: () => void;
};

/** Quote builder state, kept for the browser session so a refresh does not lose answers. */
export const useQuote = create<QuoteState>()(
  persist(
    (set) => ({
      draft: empty,
      step: 0,
      set: (patch) => set((s) => ({ draft: { ...s.draft, ...patch } })),
      toggle: (key, value) =>
        set((s) => {
          const list = s.draft[key];
          return { draft: { ...s.draft, [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] } };
        }),
      goTo: (step) => set({ step }),
      reset: () => set({ draft: empty, step: 0 }),
    }),
    { name: "twop-quote", storage: createJSONStorage(() => sessionStorage), skipHydration: true },
  ),
);
