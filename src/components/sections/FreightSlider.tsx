"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { freightExample as ex } from "@/content/shipping";

function calc(qty: number, perCarton: number) {
  const cartons = Math.ceil(qty / perCarton);
  return { cartons, m3: cartons * ex.cartonM3 };
}

/** Assembled vs collapsible shipping volume, driven by order quantity. Example figures only. */
export function FreightSlider() {
  const id = useId();
  const reduce = useReducedMotion();
  const [qty, setQty] = useState(2000);
  const assembled = calc(qty, ex.assembledPerCarton);
  const collapsible = calc(qty, ex.collapsiblePerCarton);
  const saving = Math.round((1 - collapsible.m3 / assembled.m3) * 100);

  const rows = [
    { label: "Assembled", ...assembled, ratio: 1, perCarton: ex.assembledPerCarton },
    { label: "Collapsible", ...collapsible, ratio: collapsible.m3 / assembled.m3, perCarton: ex.collapsiblePerCarton },
  ];

  return (
    <div className="border-t border-line pt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="type-display text-display-sm">Assembled vs collapsible shipping</h3>
        <p className="spec bg-yellow px-2 py-1 text-ink">Example figures</p>
      </div>

      <div className="mt-8 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <label htmlFor={id} className="spec text-muted">
            Order quantity
          </label>
          <output htmlFor={id} className="type-display mt-2 block text-display-md">
            {qty.toLocaleString("en-US")}
          </output>
          <input
            id={id}
            type="range"
            min={ex.minQty}
            max={ex.maxQty}
            step={ex.step}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="mt-4 w-full accent-[var(--accent)]"
          />
          <p className="spec mt-3 text-muted">Box {ex.boxSize}</p>
        </div>

        <div className="space-y-8 md:col-span-7 md:col-start-6">
          {rows.map((r) => (
            <div key={r.label}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <span className="font-medium">{r.label}</span>
                <span className="font-mono text-sm text-muted">
                  {r.perCarton}/carton · {r.cartons.toLocaleString("en-US")} cartons · {r.m3.toFixed(1)} m³
                </span>
              </div>
              <div className="mt-3 h-3 bg-surface-2">
                <motion.div
                  className="h-full origin-left bg-accent"
                  initial={false}
                  animate={{ scaleX: r.ratio }}
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 160, damping: 24 }}
                />
              </div>
            </div>
          ))}
          <p className="text-lg">
            In this example, collapsible boxes take <strong className="font-mono">{saving}%</strong> less freight volume.
            Real savings depend on box size and carton spec; we calculate yours with the quote.
          </p>
        </div>
      </div>
    </div>
  );
}
