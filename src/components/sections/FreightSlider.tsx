"use client";

import { m, useReducedMotion } from "framer-motion";
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
    <div className="rounded-3xl border border-silver-300 bg-white p-6 md:p-10">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="text-h3">Assembled vs collapsible shipping</h3>
        <p className="rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-text">Example figures</p>
      </div>

      <div className="mt-8 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <label htmlFor={id} className="text-sm font-semibold text-ink-500">
            Order quantity
          </label>
          <output htmlFor={id} className="mt-2 block font-heading text-5xl font-bold text-blue-600">
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
            className="mt-4 w-full accent-blue-600"
          />
          <p className="mt-3 text-sm text-ink-500">Example box {ex.boxSize}</p>
        </div>

        <div className="space-y-8 md:col-span-7 md:col-start-6">
          {rows.map((r) => (
            <div key={r.label}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <span className="font-medium">{r.label}</span>
                <span className="text-sm text-ink-500">
                  {r.perCarton}/carton · {r.cartons.toLocaleString("en-US")} cartons · {r.m3.toFixed(1)} m³
                </span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-silver-100">
                <m.div
                  className={r.label === "Collapsible" ? "h-full origin-left rounded-full bg-orange-500" : "h-full origin-left rounded-full bg-blue-600"}
                  initial={false}
                  animate={{ scaleX: r.ratio }}
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 160, damping: 24 }}
                />
              </div>
            </div>
          ))}
          <p className="text-lg">
            In this example, collapsible boxes take <strong>{saving}%</strong> less freight volume.
            Real savings depend on box size and carton spec; we calculate yours with the quote.
          </p>
        </div>
      </div>
    </div>
  );
}
