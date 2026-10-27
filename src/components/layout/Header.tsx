"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { mainNav, primaryCta } from "@/content/navigation";
import { CartLink } from "@/components/cart/CartLink";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Wordmark } from "@/components/ui/Wordmark";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

const MEGA_ID = "mega-manufacturing";
const MOBILE_ID = "mobile-menu";
const CLOSE_DELAY = 140;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

// Hover = dashed (fold) underline, active = solid (cut) underline.
const navLinkClass =
  "relative inline-flex h-[var(--header-h)] items-center whitespace-nowrap text-sm transition-colors hover:text-fg after:absolute after:inset-x-0 after:bottom-[18px] after:h-px after:opacity-0 after:transition-opacity hover:after:opacity-100 after:bg-[repeating-linear-gradient(90deg,currentColor_0_4px,transparent_4px_7px)]";
const navLinkActive = "text-fg after:!bg-fg after:!opacity-100";

export function Header({ megaFeature }: { megaFeature: ReactNode }) {
  const pathname = usePathname();
  // Menus remember the path they were opened on, so they close on navigation without an effect.
  const [megaOpenAt, setMegaOpenAt] = useState<string | null>(null);
  const [mobileOpenAt, setMobileOpenAt] = useState<string | null>(null);
  const megaOpen = megaOpenAt === pathname;
  const mobileOpen = mobileOpenAt === pathname;
  const [scrolled, setScrolled] = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaTriggerRef = useRef<HTMLButtonElement>(null);
  const megaWrapRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const openMega = () => {
    cancelClose();
    setMegaOpenAt(pathname);
  };
  const closeMega = useCallback(() => setMegaOpenAt(null), []);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(closeMega, CLOSE_DELAY);
  };
  const closeMobile = useCallback(() => setMobileOpenAt(null), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mega-menu: Escape returns focus to the trigger; clicks outside close it.
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMega();
        megaTriggerRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!megaWrapRef.current?.contains(e.target as Node)) closeMega();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [megaOpen, closeMega]);

  useEffect(() => cancelClose, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[var(--header-h)] border-b bg-surface transition-colors duration-300",
        scrolled || megaOpen || mobileOpen ? "border-line" : "border-transparent",
      )}
    >
      <div ref={megaWrapRef} className="h-full">
        <div className="container-x flex h-full items-center justify-between gap-6">
          <Wordmark />

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-7 text-muted">
              {mainNav.map((item) =>
                item.kind === "link" ? (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(navLinkClass, isActive(pathname, item.href) && navLinkActive)}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ) : (
                  <li key={item.id} onPointerEnter={(e) => e.pointerType === "mouse" && openMega()} onPointerLeave={(e) => e.pointerType === "mouse" && scheduleClose()}>
                    <button
                      ref={megaTriggerRef}
                      type="button"
                      aria-expanded={megaOpen}
                      aria-controls={MEGA_ID}
                      onClick={() => (megaOpen ? closeMega() : openMega())}
                      className={cn(
                        navLinkClass,
                        "gap-1.5",
                        (megaOpen || item.items.some((i) => isActive(pathname, i.href))) && navLinkActive,
                      )}
                    >
                      {item.label}
                      <svg
                        viewBox="0 0 10 10"
                        className={cn("h-2.5 w-2.5 transition-transform duration-300", megaOpen && "rotate-180")}
                        aria-hidden="true"
                      >
                        <path d="M1 3.5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    </button>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <CartLink />
            <ThemeToggle />
            <div className="hidden sm:block">
              <MagneticButton href={primaryCta.href}>{primaryCta.label}</MagneticButton>
            </div>
            <button
              ref={mobileToggleRef}
              type="button"
              className="spec inline-flex h-11 items-center gap-2 px-2 text-fg xl:hidden"
              aria-expanded={mobileOpen}
              aria-controls={MOBILE_ID}
              onClick={() => (mobileOpen ? closeMobile() : setMobileOpenAt(pathname))}
            >
              <span>{mobileOpen ? "Close" : "Menu"}</span>
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0.5 h-px w-5 bg-current transition-transform duration-300",
                    mobileOpen && "translate-y-1 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 bottom-0.5 h-px w-5 bg-current transition-transform duration-300",
                    mobileOpen && "-translate-y-1 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        {mainNav.map(
          (item) =>
            item.kind === "menu" && (
              <MegaMenu
                key={item.id}
                id={MEGA_ID}
                open={megaOpen}
                items={item.items}
                feature={megaFeature}
                onNavigate={closeMega}
                onPointerEnter={cancelClose}
                onPointerLeave={scheduleClose}
              />
            ),
        )}
      </div>

      <MobileMenu id={MOBILE_ID} open={mobileOpen} onClose={closeMobile} toggleRef={mobileToggleRef} />
    </header>
  );
}
