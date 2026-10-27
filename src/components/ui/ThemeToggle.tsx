"use client";

import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY } from "@/components/providers/ThemeScript";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    // Sync with the value the pre-paint script resolved.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode): the choice lasts for this page view.
    }
    setTheme(next);
  };

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "group inline-flex h-9 w-9 items-center justify-center text-fg transition-colors hover:text-accent",
        className,
      )}
    >
      {/* Half-filled disc: paper / ink. Rotates to show the active half. */}
      <svg
        viewBox="0 0 20 20"
        className="h-[18px] w-[18px] transition-transform duration-500 ease-[var(--ease-press)] dark:rotate-180"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 1.75a8.25 8.25 0 0 1 0 16.5Z" fill="currentColor" />
      </svg>
    </button>
  );
}
