import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import type { QUOTE_CONTACT, QUOTE_LOGO, QUOTE_PACKAGING, QUOTE_PRODUCTS, QUOTE_QTY, QUOTE_SKUS, QuoteNeed } from "@/lib/schemas";

export type QuoteDraft = {
  needs: QuoteNeed[];
  product?: (typeof QUOTE_PRODUCTS)[number];
  packaging: Array<(typeof QUOTE_PACKAGING)[number]>;
  skus?: (typeof QUOTE_SKUS)[number];
  quantity?: (typeof QUOTE_QTY)[number];
  country: string;
  logo?: (typeof QUOTE_LOGO)[number];
  about: string;
  links: string;
  /** File names only: files are requested by email after the first reply. */
  files: string[];
  /** Page the visitor came from (from the link params), for our team. */
  source: string;
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  contactBy: (typeof QUOTE_CONTACT)[number];
};

export const emptyQuote: QuoteDraft = {
  needs: [],
  packaging: [],
  country: "",
  about: "",
  links: "",
  files: [],
  source: "",
  name: "",
  email: "",
  whatsapp: "",
  company: "",
  contactBy: "email",
};

type QuoteState = {
  draft: QuoteDraft;
  step: number;
  set: (patch: Partial<QuoteDraft>) => void;
  goTo: (step: number) => void;
  reset: () => void;
};

/** localStorage can be missing or throw (private mode, blocked storage): the form then just doesn't autosave. */
const safeLocal: StateStorage = {
  getItem: (k) => {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  setItem: (k, v) => {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* not saved */
    }
  },
  removeItem: (k) => {
    try {
      localStorage.removeItem(k);
    } catch {
      /* nothing to remove */
    }
  },
};

/** Quote request draft, autosaved in localStorage so going back, refreshing or returning later keeps the answers. */
export const useQuote = create<QuoteState>()(
  persist(
    (set) => ({
      draft: emptyQuote,
      step: 0,
      set: (patch) => set((s) => ({ draft: { ...s.draft, ...patch } })),
      goTo: (step) => set({ step }),
      reset: () => set({ draft: emptyQuote, step: 0 }),
    }),
    {
      // v2: the 3-step form. Old 9-step drafts (sessionStorage, "twop-quote") are not read.
      name: "twop-quote-v2",
      storage: createJSONStorage(() => safeLocal),
      skipHydration: true,
      merge: (persisted, current) => {
        const p = persisted as Partial<QuoteState> | undefined;
        return { ...current, step: p?.step ?? 0, draft: { ...emptyQuote, ...p?.draft } };
      },
    },
  ),
);
