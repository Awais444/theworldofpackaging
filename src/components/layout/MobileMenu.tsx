"use client";

import { AnimatePresence, m } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import type { HeaderNav } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  id: string;
  open: boolean;
  onClose: () => void;
  toggleRef: RefObject<HTMLButtonElement | null>;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Full-screen drawer: accordion groups, large tap targets, sticky quote button. */
export function MobileMenu({ id, open, onClose, toggleRef, nav }: MobileMenuProps & { nav: HeaderNav }) {
  const { mobileNav, primaryCta } = nav;
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Lock page scroll and keep focus inside while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const toggle = toggleRef.current;
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
      toggle?.focus();
    };
  }, [open, onClose, toggleRef]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={panelRef}
          id={id}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[60] flex flex-col bg-white xl:hidden"
        >
          <div className="container-x flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-silver-300/60">
            <Logo />
            <button type="button" onClick={onClose} aria-label="Close menu" className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-blue-50">
              <X aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <nav aria-label="Main" className="container-x flex-1 overflow-y-auto py-4">
            <ul className="divide-y divide-silver-300/60">
              {mobileNav.map((nav) => {
                if (!nav.groups) {
                  return (
                    <li key={nav.label}>
                      <Link href={nav.href} onClick={onClose} className="flex min-h-14 items-center font-heading text-xl font-bold">
                        {nav.label}
                      </Link>
                    </li>
                  );
                }
                const isOpen = expanded === nav.label;
                const panelId = `m-${nav.href.slice(1)}`;
                return (
                  <li key={nav.label}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setExpanded(isOpen ? null : nav.label)}
                      className="flex min-h-14 w-full items-center justify-between font-heading text-xl font-bold"
                    >
                      {nav.label}
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        {isOpen ? <Minus aria-hidden="true" className="h-4 w-4" /> : <Plus aria-hidden="true" className="h-4 w-4" />}
                      </span>
                    </button>
                    <div id={panelId} hidden={!isOpen} className="pb-4">
                      {nav.groups.map((g, i) => (
                        <div key={g.title ?? i} className={cn(i > 0 && "mt-4")}>
                          {g.title && <p className="text-eyebrow text-blue-600">{g.title}</p>}
                          <ul className="mt-1">
                            {g.links.map((l) => (
                              <li key={l.label}>
                                <Link href={l.href} onClick={onClose} className="flex min-h-11 items-center text-base text-ink-500 hover:text-blue-600">
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="container-x shrink-0 border-t border-silver-300/60 bg-white py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Button href={primaryCta.href} onClick={onClose} size="lg" arrow className="w-full">
              {primaryCta.label}
            </Button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
