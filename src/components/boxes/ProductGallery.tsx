"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Main image plus thumbnails. Media is rendered on the server and passed in, so
 * this component only switches which one is visible.
 */
export function ProductGallery({ main, thumbs, labels }: { main: ReactNode[]; thumbs: ReactNode[]; labels: string[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      {main.map((m, i) => (
        <div key={i} hidden={i !== active}>
          {m}
        </div>
      ))}
      <ul className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
        {thumbs.map((t, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}: ${labels[i]}`}
              aria-pressed={i === active}
              className={cn("block w-full overflow-hidden rounded-xl ring-2 ring-transparent transition", i === active ? "ring-blue-600" : "hover:ring-silver-300")}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
