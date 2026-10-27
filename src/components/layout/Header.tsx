"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { boxesMenu, boxesPromo, industriesMenu, mainNav, primaryCta, servicesMenu, type MainNavItem } from "@/content/navigation";
import { CartLink } from "@/components/cart/CartLink";
import { MagneticBoxClosed } from "@/components/illustrations";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { UtilityBar } from "./UtilityBar";

type MenuId = Extract<MainNavItem, { kind: "menu" }>["id"];

const MOBILE_ID = "mobile-menu";
const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);
const topLink = "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium text-ink-900 transition-colors hover:bg-blue-50 hover:text-blue-600";
const menuLink = "block rounded-lg px-2 py-1.5 text-[15px] text-ink-900 transition-colors hover:bg-blue-50 hover:text-blue-600";

function BoxesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-4 gap-8">
      {boxesMenu.map((group) => (
        <div key={group.title}>
          <p className="text-eyebrow text-blue-600">
            {group.href ? (
              <Link href={group.href} onClick={onNavigate} className="hover:underline">
                {group.title}
              </Link>
            ) : (
              group.title
            )}
          </p>
          <ul className="mt-3 space-y-0.5">
            {group.links.map((l) => (
              <li key={l.label}>
                <Link href={l.href} onClick={onNavigate} className={menuLink}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Link href={boxesPromo.href} onClick={onNavigate} className="group flex flex-col rounded-2xl bg-blue-50 p-5">
        <div className="aspect-[4/3]">
          <MagneticBoxClosed collapsible />
        </div>
        <p className="mt-2 font-heading text-lg font-bold leading-snug">{boxesPromo.title}</p>
        <p className="mt-1 text-sm text-ink-500">{boxesPromo.text}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
          See collapsible boxes <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </div>
  );
}

function ServicesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <ul className="grid grid-cols-3 gap-2">
      {servicesMenu.map((s) => (
        <li key={s.href}>
          <Link href={s.href} onClick={onNavigate} className="block rounded-xl p-3 transition-colors hover:bg-blue-50">
            <span className="block font-semibold text-ink-900">{s.label}</span>
            <span className="mt-0.5 block text-sm text-ink-500">{s.description}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function IndustriesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex gap-10">
      <ul className="grid flex-1 grid-cols-2 gap-x-8 gap-y-0.5">
        {industriesMenu.map((l) => (
          <li key={l.href}>
            <Link href={l.href} onClick={onNavigate} className={menuLink}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="w-64 rounded-2xl bg-silver-100 p-5">
        <p className="font-heading text-lg font-bold">Packaging by industry</p>
        <p className="mt-1 text-sm text-ink-500">Recommended box styles and finishes for your product.</p>
        <Button href="/industries" variant="ghost" arrow className="mt-3" onClick={onNavigate}>
          All industries
        </Button>
      </div>
    </div>
  );
}

const panels: Record<MenuId, (p: { onNavigate: () => void }) => React.ReactNode> = {
  boxes: BoxesPanel,
  services: ServicesPanel,
  industries: IndustriesPanel,
};

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  // Menus remember the path they were opened on, so they close on navigation without an effect.
  const [menu, setMenu] = useState<{ id: MenuId; at: string } | null>(null);
  const [mobileAt, setMobileAt] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const openId = menu?.at === pathname ? menu.id : null;
  const mobileOpen = mobileAt === pathname;
  const navRef = useRef<HTMLElement>(null);
  const mobileToggle = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setMenu(null), []);
  const closeMobile = useCallback(() => setMobileAt(null), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      closeMenu();
      navRef.current?.querySelector<HTMLButtonElement>(`[aria-controls="menu-${openId}"]`)?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) closeMenu();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [openId, closeMenu]);

  const Panel = openId ? panels[openId] : null;

  return (
    <>
      <UtilityBar />
      <header className={cn("sticky top-0 z-50 h-[var(--header-h)] border-b bg-white transition-shadow", scrolled ? "border-transparent shadow-sm" : "border-silver-300/60")}>
        <div className="container-x flex h-full items-center justify-between gap-6">
          <Logo />

          <nav ref={navRef} aria-label="Main" className="hidden lg:block" onMouseLeave={closeMenu}>
            <ul className="flex items-center gap-1">
              {mainNav.map((item) =>
                item.kind === "link" ? (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(topLink, isActive(pathname, item.href) && "text-blue-600")}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ) : (
                  <li key={item.id} onMouseEnter={() => setMenu({ id: item.id, at: pathname })}>
                    <button
                      type="button"
                      aria-expanded={openId === item.id}
                      aria-controls={`menu-${item.id}`}
                      onClick={() => (openId === item.id ? closeMenu() : setMenu({ id: item.id, at: pathname }))}
                      className={cn(topLink, openId === item.id && "bg-blue-50 text-blue-600")}
                    >
                      {item.label}
                      <ChevronDown aria-hidden="true" className={cn("h-4 w-4 transition-transform", openId === item.id && "rotate-180")} />
                    </button>
                  </li>
                ),
              )}
            </ul>
            <AnimatePresence>
              {openId && Panel && (
                <motion.div
                  key={openId}
                  id={`menu-${openId}`}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-x-0 top-full border-t border-silver-300/60 bg-white shadow-md"
                >
                  <div className="container-x py-8">
                    <Panel onNavigate={closeMenu} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          <div className="flex items-center gap-2">
            <CartLink />
            {/* Wrapper controls visibility: the button's own inline-flex would override `hidden`. */}
            <div className="hidden sm:block">
              <Button href={primaryCta.href} arrow>
                {primaryCta.label}
              </Button>
            </div>
            <button
              ref={mobileToggle}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-900 hover:bg-blue-50 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls={MOBILE_ID}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => (mobileOpen ? closeMobile() : setMobileAt(pathname))}
            >
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span className={cn("absolute left-0 top-0.5 h-0.5 w-5 rounded bg-current transition-transform duration-200", mobileOpen && "translate-y-1 rotate-45")} />
                <span className={cn("absolute bottom-0.5 left-0 h-0.5 w-5 rounded bg-current transition-transform duration-200", mobileOpen && "-translate-y-1 -rotate-45")} />
              </span>
            </button>
          </div>
        </div>

        <MobileMenu id={MOBILE_ID} open={mobileOpen} onClose={closeMobile} toggleRef={mobileToggle} />
      </header>
    </>
  );
}
