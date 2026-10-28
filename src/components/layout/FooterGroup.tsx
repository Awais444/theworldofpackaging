"use client";

import { Plus } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Footer link group: an accordion on mobile, an always-open column from the md breakpoint. */
export function FooterGroup({ title, children }: { title: string; children: ReactNode }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/15 md:border-0">
      <h2 className="text-[14px] font-bold leading-9 text-white">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between py-2 text-left md:pointer-events-none md:py-0"
        >
          {title}
          <Plus aria-hidden="true" className={cn("h-4 w-4 transition-transform duration-200 md:hidden", open && "rotate-45")} />
        </button>
      </h2>
      <div id={id} className={cn("pb-4 md:block md:pb-0", open ? "block" : "hidden")}>
        {children}
      </div>
    </div>
  );
}
