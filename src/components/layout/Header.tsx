"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, createContext, useContext } from "react";
import { site, whatsappMessage, whatsappUrl } from "@/config/site";
import type { HeaderNav, MenuId } from "@/content/navigation";
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
  design: ["/packaging-design", "/pricing", "/services", "/packages", "/industries"],
  boxes: ["/boxes", "/rigid-boxes", "/printed-boxes", "/collapsible-rigid-boxes", "/materials", "/finishes", "/inserts"],
};
const topLink = "inline-flex items-center gap-1 whitespace-nowrap py-2 text-[15px] font-medium text-ink-800 transition-colors hover:text-blue-600";
// Links align with their heading: the pill padding is offset by a negative margin.
const menuLink = "-mx-3 block rounded-full px-3 text-[15px] font-medium leading-9 text-ink-900 transition-colors hover:bg-blue-50 hover:text-blue-600 focus-visible:bg-blue-50 focus-visible:text-blue-600";
const menuHeading = "text-[12px] font-bold uppercase tracking-[0.12em] text-blue-600";

/** Menu data from the server (layout), so content modules never ship to the browser. */
const NavContext = createContext<HeaderNav | null>(null);
const useNav = () => useContext(NavContext)!;

function BoxesPanel({ onNavigate }: { onNavigate: () => void }) {
  const { boxesMenu, boxesPromo } = useNav();
  return (
    <div className="grid grid-cols-4 gap-8">
      {boxesMenu.map((group) => (
        <div key={group.title} data-col>
          <p className={menuHeading}>
            {group.href ? (
              <Link href={group.href} onClick={onNavigate} className="hover:underline">
                {group.title}
              </Link>
            ) : (
              group.title
            )}
          </p>
          <ul className="mt-2">
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
      <Link href={boxesPromo.href} onClick={onNavigate} data-col className="group flex flex-col rounded-2xl bg-blue-50 p-5">
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
  const { designMenu, designMenuFooter } = useNav();
  return (
    <div>
      <div className="grid grid-cols-4 gap-8">
        {designMenu.map((group) => (
          <div key={group.title} data-col>
            <p className={menuHeading}>
              {group.href ? (
                <Link href={group.href} onClick={onNavigate} className="hover:underline">
                  {group.title}
                </Link>
              ) : (
                group.title
              )}
            </p>
            <ul className="mt-2">
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
      </div>
      <div data-col className="mt-6 flex items-center justify-between gap-6 rounded-2xl bg-blue-50 px-5 py-4">
        <p className="text-sm text-ink-900">
          <span className="font-semibold">Designed here, made here.</span> We also make your boxes, from {site.facts.rigidMoq} units.
        </p>
        <ul className="flex items-center gap-6">
          {designMenuFooter.map((l, i) => (
            <li key={l.href}>
              <Link href={l.href} onClick={onNavigate} className={cn("inline-flex items-center gap-1 text-sm font-semibold hover:underline", i === designMenuFooter.length - 1 ? "text-blue-600" : "text-ink-900")}>
                {l.label}
                {i === designMenuFooter.length - 1 && <ArrowRight aria-hidden="true" className="h-4 w-4" />}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const OPEN_DELAY = 120;
const CLOSE_DELAY = 250;
const FOCUSABLE = "a[href], button:not([disabled])";

/** Arrow keys inside a panel: left/right move between columns, up/down within a column. */
function onPanelKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
  if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
  const cols = [...e.currentTarget.querySelectorAll<HTMLElement>("[data-col]")];
  const ci = cols.findIndex((c) => c.contains(document.activeElement));
  if (ci < 0) return;
  e.preventDefault();
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    const next = cols[(ci + (e.key === "ArrowRight" ? 1 : cols.length - 1)) % cols.length];
    (next?.matches(FOCUSABLE) ? next : next?.querySelector<HTMLElement>(FOCUSABLE))?.focus();
    return;
  }
  const col = cols[ci]!;
  const items = col.matches(FOCUSABLE) ? [col] : [...col.querySelectorAll<HTMLElement>(FOCUSABLE)];
  const ii = items.indexOf(document.activeElement as HTMLElement);
  items[(ii + (e.key === "ArrowDown" ? 1 : items.length - 1)) % items.length]?.focus();
}

export function Header({ nav }: { nav: HeaderNav }) {
  const { mainNav, primaryCta } = nav;
  const pathname = usePathname();
  const reduce = useReducedMotion();
  // Menus remember the path they were opened on, so they close on navigation without an effect.
  const [menu, setMenu] = useState<{ id: MenuId; at: string; swap: boolean } | null>(null);
  const [mobileAt, setMobileAt] = useState<string | null>(null);
  const openId = menu?.at === pathname ? menu.id : null;
  const mobileOpen = mobileAt === pathname;
  const navRef = useRef<HTMLElement>(null);
  const mobileToggle = useRef<HTMLButtonElement>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  }, []);
  const closeMenu = useCallback(() => {
    clearTimers();
    setMenu(null);
  }, [clearTimers]);
  const openMenu = useCallback((id: MenuId, swap: boolean) => setMenu({ id, at: pathname, swap }), [pathname]);
  const closeMobile = useCallback(() => setMobileAt(null), []);

  // Hover intent on the wrapper (trigger + panel): open after 120ms, close 250ms after leaving.
  // Moving straight from one trigger to another swaps menus instantly. Touch uses taps only.
  const onWrapperEnter = (e: React.PointerEvent, id: MenuId) => {
    if (e.pointerType === "touch") return;
    clearTimers();
    if (openId === id) return;
    if (openId) openMenu(id, true);
    else openTimer.current = setTimeout(() => openMenu(id, false), OPEN_DELAY);
  };
  const onWrapperLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    if (openTimer.current) clearTimeout(openTimer.current);
    openTimer.current = null;
    closeTimer.current = setTimeout(() => setMenu(null), CLOSE_DELAY);
  };
  /** Pointer over Work, About, the logo or the buttons closes an open menu at once. */
  const closeOnEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "touch") closeMenu();
  };

  useEffect(() => clearTimers, [clearTimers]);

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

  return (
    <NavContext.Provider value={nav}>
    <>
      <UtilityBar />
      {/* Page overlay behind the open panel; clicking it closes the menu. */}
      <AnimatePresence>
        {openId && (
          <m.div
            key="overlay"
            aria-hidden="true"
            className="fixed inset-0 z-[90] hidden bg-[rgba(20,19,23,0.25)] lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>
      <header className={cn("sticky top-0 z-[100] h-[var(--header-h)] border-b border-silver-100 bg-white")}>
        <div className="container-x grid h-full grid-cols-[minmax(0,1fr)_auto] items-center gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-12">
          <div className="flex items-center justify-self-start" onPointerEnter={closeOnEnter}>
            <Logo />
          </div>

          <nav ref={navRef} aria-label="Main" className="hidden h-full justify-self-center lg:block">
            <ul className="flex h-full items-center gap-9">
              {mainNav.map((item) =>
                item.kind === "link" ? (
                  <li key={item.href} onPointerEnter={closeOnEnter}>
                    <Link
                      href={item.href}
                      className={cn(topLink, isActive(pathname, item.href) && "font-semibold text-blue-600!")}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ) : (
                  // One wrapper per trigger and its panel, full header height, so the pointer never
                  // crosses a gap. The panel is positioned against the header, flush at its bottom edge.
                  <li key={item.id} className="flex h-full items-center" onPointerEnter={(e) => onWrapperEnter(e, item.id)} onPointerLeave={onWrapperLeave}>
                    <button
                      type="button"
                      aria-expanded={openId === item.id}
                      aria-controls={`menu-${item.id}`}
                      onClick={() => (openId === item.id ? closeMenu() : openMenu(item.id, Boolean(openId)))}
                      onKeyDown={(e) => {
                        if (e.key !== "ArrowDown") return;
                        e.preventDefault();
                        openMenu(item.id, Boolean(openId));
                        requestAnimationFrame(() => document.getElementById(`menu-${item.id}`)?.querySelector<HTMLElement>(FOCUSABLE)?.focus());
                      }}
                      className={cn(topLink, (openId === item.id || menuPrefixes[item.id].some((p) => isActive(pathname, p))) && "text-blue-600!", menuPrefixes[item.id].some((p) => isActive(pathname, p)) && "font-semibold")}
                    >
                      {item.label}
                      <ChevronDown aria-hidden="true" className={cn("h-3.5 w-3.5 transition-transform duration-200 ease-in-out", openId === item.id && "rotate-180")} />
                    </button>
                    {openId === item.id && (
                      // Invisible hover bridge across the full width of the header's bottom band (below the
                      // nav links and buttons), so a slow diagonal path to any column stays inside the wrapper.
                      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[18px]" />
                    )}
                    {openId === item.id && (
                      // Solid white from the first frame: only translateY animates on the panel,
                      // plus a quick opacity on its inner content. Swapping between menus is instant.
                      <m.div
                        id={`menu-${item.id}`}
                        className="absolute inset-x-0 top-full border-b border-silver-300 bg-white shadow-md"
                        initial={reduce || menu?.swap ? false : { y: -8 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        onKeyDown={onPanelKeyDown}
                      >
                        <m.div className="container-x py-8" initial={reduce || menu?.swap ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.12 }}>
                          {item.id === "design" ? <DesignPanel onNavigate={closeMenu} /> : <BoxesPanel onNavigate={closeMenu} />}
                        </m.div>
                      </m.div>
                    )}
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5 justify-self-end" onPointerEnter={closeOnEnter}>
            <a
              href={whatsappUrl(whatsappMessage()) ?? "/contact"}
              {...(whatsappUrl() ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="hidden h-10 items-center gap-2 rounded-full border border-silver-300 px-4 text-sm font-semibold text-ink-900 transition-colors hover:border-blue-600 xl:inline-flex"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              WhatsApp
            </a>
            {/* Wrapper controls visibility: the button's own inline-flex would override `hidden`. */}
            <div className="hidden sm:block">
              <Button href={primaryCta.href} arrow className="h-10 px-[18px] text-sm font-semibold [&_svg]:h-4 [&_svg]:w-4">
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

        <MobileMenu id={MOBILE_ID} open={mobileOpen} onClose={closeMobile} toggleRef={mobileToggle} nav={nav} />
      </header>
    </>
    </NavContext.Provider>
  );
}
