"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TabItem = { id: string; label: string; content: ReactNode };

/**
 * Accessible tabs (arrow keys, Home/End). A matching URL hash selects a tab, so
 * links like /pricing#design work. Before hydration every panel renders in
 * sequence, so all content is readable without JS.
 */
export function Tabs({ items, label }: { items: TabItem[]; label: string }) {
  const base = useId();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(items[0]?.id ?? "");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (!items.some((t) => t.id === id)) return;
      setActive(id);
    };
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [items]);

  const select = (id: string) => {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
  };

  const onKey = (e: KeyboardEvent, i: number) => {
    const last = items.length - 1;
    const next = e.key === "ArrowRight" ? (i === last ? 0 : i + 1) : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : -1;
    if (next < 0) return;
    e.preventDefault();
    select(items[next]!.id);
    tabRefs.current[next]?.focus();
  };

  if (!mounted) {
    return (
      <div className="space-y-20">
        {items.map((t) => (
          <section key={t.id} aria-label={t.label}>
            <h2 className="spec mb-6 text-muted">{t.label}</h2>
            {t.content}
          </section>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-x-8 gap-y-2 border-b border-line">
        {items.map((t, i) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${base}-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "type-display relative -mb-px border-b-2 pb-3 text-display-sm transition-colors",
                selected ? "border-fg text-fg" : "border-transparent text-muted hover:text-fg",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {items.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${base}-panel-${t.id}`}
          aria-labelledby={`${base}-tab-${t.id}`}
          hidden={t.id !== active}
          tabIndex={0}
          className="page-in pt-12 focus-visible:outline-offset-8"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
