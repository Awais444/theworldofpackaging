"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { site, whatsappMessage, whatsappUrl } from "@/config/site";
import { boxesMenu, boxesPromo, brandingMenu, designMenu, mainNav, primaryCta, type MenuId } from "@/content/navigation";
import { CartLink } from "@/components/cart/CartLink";
import { MagneticBoxClosed } from "@/components/illustrations";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { UtilityBar } from "./UtilityBar";


const MOBILE_ID = "mobile-menu";
const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);
// Section prefixes that light up each top-level menu.
const menuPrefixes: Record<MenuId, string[]> = {
  design: ["/packaging-design", "/pricing"],
  branding: ["/services", "/packages"],
  boxes: ["/boxes", "/rigid-boxes", "/printed-boxes", "/collapsible-rigid-boxes", "/materials", "/finishes", "/inserts", "/samples"],
};
const topLink = "inline-flex items-center gap-1 whitespace-nowrap py-2 text-[15px] font-medium text-ink-800 transition-colors hover:text-blue-600";
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

function DesignPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div>
      <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-8">
        {designMenu.map((group) => (
          <div key={group.title}>
            <p className="text-eyebrow text-blue-600">{group.title}</p>
            <ul className={cn("mt-3 gap-x-6 gap-y-0.5", group.title === "By Product" ? "grid grid-cols-2" : "space-y-0.5")}>
              {group.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={onNavigate} className={menuLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between rounded-2xl bg-blue-50 px-5 py-4">
        <p className="text-sm text-ink-900">
          <span className="font-semibold">Designed here, made here.</span> We also make your boxes, from {site.facts.rigidMoq} units.
        </p>
        <div className="flex items-center gap-6">
          <Button href="/pricing" variant="ghost" onClick={onNavigate}>
            See pricing
          </Button>
          <Button href="/packaging-design" variant="ghost" arrow onClick={onNavigate}>
            View all services
          </Button>
        </div>
      </div>
    </div>
  );
}

function BrandingPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <ul className="grid grid-cols-3 gap-2">
      {brandingMenu.map((s) => (
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

const panels: Record<MenuId, (p: { onNavigate: () => void }) => React.ReactNode> = {
  design: DesignPanel,
  branding: BrandingPanel,
  boxes: BoxesPanel,
};

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  // Menus remember the path they were opened on, so they close on navigation without an effect.
  const [menu, setMenu] = useState<{ id: MenuId; at: string } | null>(null);
  const [mobileAt, setMobileAt] = useState<string | null>(null);
  const openId = menu?.at === pathname ? menu.id : null;
  const mobileOpen = mobileAt === pathname;
  const navRef = useRef<HTMLElement>(null);
  const mobileToggle = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setMenu(null), []);
  const closeMobile = useCallback(() => setMobileAt(null), []);

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
      <header className={cn("sticky top-0 z-[100] h-[var(--header-h)] border-b border-silver-100 bg-white")}>
        <div className="container-x grid h-full grid-cols-[1fr_auto] items-center gap-6 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:gap-8">
          <div className="justify-self-start">
            <Logo />
          </div>

          <nav ref={navRef} aria-label="Main" className="hidden justify-self-center xl:block" onMouseLeave={closeMenu}>
            <ul className="flex items-center gap-9">
              {mainNav.map((item) =>
                item.kind === "link" ? (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(topLink, isActive(pathname, item.href) && "font-semibold text-blue-600!")}
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
                      className={cn(topLink, (openId === item.id || menuPrefixes[item.id].some((p) => isActive(pathname, p))) && "text-blue-600!", menuPrefixes[item.id].some((p) => isActive(pathname, p)) && "font-semibold")}
                    >
                      {item.label}
                      <ChevronDown aria-hidden="true" className={cn("h-3.5 w-3.5 transition-transform", openId === item.id && "rotate-180")} />
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

          <div className="flex items-center gap-3 justify-self-end">
            <CartLink />
            <a
              href={whatsappUrl(whatsappMessage()) ?? "/contact"}
              {...(whatsappUrl() ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="hidden h-[42px] items-center gap-2 rounded-full border border-silver-300 px-[18px] text-sm font-semibold text-ink-900 transition-colors hover:border-blue-600 xl:inline-flex"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              WhatsApp
            </a>
            {/* Wrapper controls visibility: the button's own inline-flex would override `hidden`. */}
            <div className="hidden sm:block">
              <Button href={primaryCta.href} arrow className="h-[42px] px-[18px] text-sm font-semibold [&_svg]:h-4 [&_svg]:w-4">
                {primaryCta.label}
              </Button>
            </div>
            <button
              ref={mobileToggle}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-900 hover:bg-blue-50 xl:hidden"
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
