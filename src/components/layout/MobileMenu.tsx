"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, type RefObject } from "react";
import { site } from "@/config/site.config";
import { mainNav, primaryCta } from "@/content/navigation";
import { useLenis } from "@/components/providers/SmoothScroll";
import { Button } from "@/components/ui/Button";
import { ColorBar } from "@/components/ui/ColorBar";

type MobileMenuProps = {
  id: string;
  open: boolean;
  onClose: () => void;
  toggleRef: RefObject<HTMLButtonElement | null>;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ id, open, onClose, toggleRef }: MobileMenuProps) {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock scrolling and manage focus while open.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const toggle = toggleRef.current;
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current || !toggle) return;
      // Trap focus between the toggle button and the panel.
      const nodes = [toggle, ...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = nodes[0]!;
      const last = nodes[nodes.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
      lenis?.start();
      toggle?.focus();
    };
  }, [open, lenis, onClose, toggleRef]);

  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id={id}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto bg-surface xl:hidden"
          data-lenis-prevent
        >
          <motion.nav
            aria-label="Main"
            className="container-x flex min-h-full flex-col pb-10 pt-6"
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: reduce ? 0 : 0.05, delayChildren: 0.05 }}
          >
            <ul className="border-t border-line">
              {mainNav.map((nav) => (
                <motion.li
                  key={nav.label}
                  variants={item}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-line"
                >
                  {nav.kind === "link" ? (
                    <Link href={nav.href} onClick={onClose} className="type-display block py-3 text-5xl">
                      {nav.label}
                    </Link>
                  ) : (
                    <div className="py-3">
                      <span className="type-display block text-5xl">{nav.label}</span>
                      <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                        {nav.items.map((sub) => (
                          <li key={sub.href}>
                            <Link href={sub.href} onClick={onClose} className="block py-1 text-base text-muted hover:text-fg">
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.li>
              ))}
            </ul>
            <motion.div variants={item} className="mt-auto pt-10">
              <Button href={primaryCta.href} onClick={onClose} size="lg" arrow className="w-full">
                {primaryCta.label}
              </Button>
              <p className="spec mt-6 text-muted">
                {site.email} <span aria-hidden="true">/</span> WhatsApp {site.whatsapp}
              </p>
              <ColorBar className="mt-6" />
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
