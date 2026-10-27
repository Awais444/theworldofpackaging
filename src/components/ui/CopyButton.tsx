"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/** Copies a value to the clipboard; the value itself stays visible as plain text next to it. */
export function CopyButton({ value, label, className }: { value: string; label: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked: the text is on screen to copy by hand.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label}`}
      className={cn("inline-flex h-8 items-center rounded-full border border-silver-300 px-3 text-xs font-semibold text-ink-500 hover:border-blue-600 hover:text-blue-600", className)}
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
