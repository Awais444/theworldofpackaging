"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { site, type CurrencyCode } from "@/config/site";
import { finishes as allFinishes } from "@/content/materials";
import { printedStyles } from "@/content/printedStyles";
import { getRigidStyle, rigidStyles } from "@/content/rigidStyles";
import { CURRENCIES, formatMoney, fromUsd } from "@/lib/currency";
import { estimate, MOQ, RATES, type Artwork, type BoxConfig, type BoxType, type PrintSides } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { useConfigurator } from "@/store/configurator";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Button } from "@/components/ui/Button";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { BoxPreview3D } from "./BoxPreview3D";
import { ChoiceGroup, MultiChoice, NumberField } from "./Controls";

const MM_PER_IN = 25.4;
const DIM = { min: 30, max: 600 };

type Step = { id: string; label: string; render: () => React.ReactNode };

/** Options available for the current type and style. */
function useOptions(c: BoxConfig) {
  return useMemo(() => {
    if (c.type === "printed") {
      const s = printedStyles.find((p) => p.slug === c.style) ?? printedStyles[0]!;
      return {
        styles: printedStyles.map((p) => ({ value: p.slug, label: p.name, detail: p.summary })),
        boards: s.materials.map((m) => ({ value: m, label: m })),
        wraps: [],
        finishes: s.finishes,
        inserts: ["Card insert"],
        styleName: s.name,
      };
    }
    const pool = rigidStyles.filter((s) => (c.type === "collapsible" ? s.collapsible : !s.collapsible));
    const s = getRigidStyle(c.style) ?? pool[0]!;
    return {
      styles: pool.map((p) => ({ value: p.slug, label: p.name, detail: p.summary })),
      boards: s.boardMm.map((mm) => ({ value: mm.toFixed(1), label: `${mm.toFixed(1)} mm greyboard` })),
      wraps: s.wraps.map((w) => ({ value: w, label: w })),
      finishes: s.finishes,
      inserts: s.inserts,
      styleName: s.name,
    };
  }, [c.type, c.style]);
}

export function Configurator() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const { config: c, unit, currency, step, set, reset, setUnit, setCurrency, setStep } = useConfigurator();
  const opts = useOptions(c);
  const est = useMemo(() => estimate(c), [c]);

  // Apply ?type=&style= from style pages once persisted state has loaded.
  useEffect(() => {
    const apply = () => {
      const q = new URLSearchParams(window.location.search);
      const type = q.get("type") as BoxType | null;
      if (type && ["rigid", "collapsible", "printed"].includes(type)) {
        reset(type, q.get("style") ?? undefined);
        setStep(1);
        window.history.replaceState(null, "", "/configure");
      }
    };
    if (useConfigurator.persist.hasHydrated()) apply();
    return useConfigurator.persist.onFinishHydration(apply);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toDisplay = (mm: number) => (unit === "mm" ? mm : Math.round((mm / MM_PER_IN) * 100) / 100);
  const fromDisplay = (v: number) => (unit === "mm" ? Math.round(v) : Math.round(v * MM_PER_IN));
  const dimOk = (["l", "w", "h"] as const).every((k) => c.dims[k] >= DIM.min && c.dims[k] <= DIM.max);
  const qtyOk = c.quantity >= MOQ[c.type];
  const money = (usd: number) => formatMoney(fromUsd(usd, currency), currency);

  const steps: Step[] = [
    {
      id: "type",
      label: "Box type",
      render: () => (
        <ChoiceGroup<BoxType>
          legend="What are we making?"
          value={c.type}
          columns={3}
          onChange={(t) => reset(t)}
          options={[
            { value: "rigid", label: "Rigid box", detail: "Greyboard, wrapped. Premium." },
            { value: "collapsible", label: "Collapsible rigid", detail: "Rigid, ships flat." },
            { value: "printed", label: "Printed box", detail: "Paperboard or corrugated." },
          ]}
        />
      ),
    },
    {
      id: "style",
      label: "Style",
      render: () => <ChoiceGroup legend="Construction" value={c.style} options={opts.styles} onChange={(style) => reset(c.type, style)} />,
    },
    {
      id: "dims",
      label: "Dimensions",
      render: () => (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Inside dimensions</p>
            <div role="group" aria-label="Units" className="flex border border-silver-300">
              {(["mm", "in"] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  aria-pressed={unit === u}
                  onClick={() => setUnit(u)}
                  className={cn("text-xs font-semibold uppercase tracking-wider h-9 px-3", unit === u ? "bg-ink-900 text-white" : "text-ink-900")}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {(["l", "w", "h"] as const).map((k) => (
              <NumberField
                key={k}
                label={{ l: "Length", w: "Width", h: "Height" }[k]}
                value={toDisplay(c.dims[k])}
                min={toDisplay(DIM.min)}
                max={toDisplay(DIM.max)}
                step={unit === "mm" ? 1 : 0.1}
                suffix={unit}
                onChange={(v) => set({ dims: { ...c.dims, [k]: fromDisplay(v) } })}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "board",
      label: c.type === "printed" ? "Material" : "Board",
      render: () => (
        <ChoiceGroup legend={c.type === "printed" ? "Board or flute" : "Greyboard thickness"} value={c.board} options={opts.boards} onChange={(board) => set({ board })} />
      ),
    },
    ...(c.type === "printed"
      ? []
      : [
          {
            id: "wrap",
            label: "Wrap",
            render: () => <ChoiceGroup legend="Wrap material" value={c.wrap} options={opts.wraps} onChange={(wrap: string) => set({ wrap })} />,
          },
        ]),
    {
      id: "print",
      label: "Print",
      render: () => (
        <ChoiceGroup<PrintSides>
          legend="Print sides"
          value={c.print}
          columns={3}
          onChange={(print) => set({ print })}
          options={[
            { value: "none", label: "No print", detail: c.type === "printed" ? "Plain board" : "Plain wrap, foil only" },
            { value: "outside", label: "Outside", detail: "All visible panels" },
            { value: "inside-outside", label: "Inside + outside", detail: "Unboxing print" },
          ]}
        />
      ),
    },
    {
      id: "finishes",
      label: "Finishes",
      render: () => (
        <div>
          <MultiChoice legend="Finishes (any)" values={c.finishes} options={opts.finishes} onChange={(finishes) => set({ finishes })} />
          <ul className="mt-6 space-y-1 text-sm text-ink-500">
            {allFinishes
              .filter((f) => c.finishes.includes(f.name))
              .map((f) => (
                <li key={f.name}>
                  <span className="text-ink-900">{f.name}:</span> {f.detail}
                </li>
              ))}
          </ul>
        </div>
      ),
    },
    {
      id: "insert",
      label: "Insert",
      render: () => (
        <ChoiceGroup
          legend="Insert"
          value={c.insert ?? "none"}
          onChange={(v) => set({ insert: v === "none" ? null : v })}
          options={[{ value: "none", label: "No insert" }, ...opts.inserts.map((i) => ({ value: i, label: i }))]}
        />
      ),
    },
    {
      id: "qty",
      label: "Quantity",
      render: () => (
        <div>
          <NumberField
            label="Quantity"
            value={c.quantity}
            min={MOQ[c.type]}
            max={100000}
            step={50}
            suffix="boxes"
            hint={`Minimum ${MOQ[c.type]}. Unit price drops at 1,000, 2,500, 5,000 and 10,000.`}
            onChange={(quantity) => set({ quantity: Math.round(quantity) })}
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {RATES.tiers
              .map((t) => Math.max(t.min, MOQ[c.type]))
              .filter((v, i, a) => a.indexOf(v) === i)
              .sort((a, b) => a - b)
              .map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => set({ quantity: q })}
                  className={cn("text-xs font-semibold uppercase tracking-wider h-9 border px-3", c.quantity === q ? "border-ink-900 bg-ink-900 text-white" : "border-silver-300")}
                >
                  {q.toLocaleString("en-US")}
                </button>
              ))}
          </div>
        </div>
      ),
    },
    {
      id: "ship",
      label: "Shipping",
      render: () => (
        <div className="space-y-8">
          <ChoiceGroup
            legend="Freight"
            value={c.ship}
            onChange={(ship) => set({ ship })}
            options={[
              { value: "air", label: "Air", detail: "Faster, priced by weight or volume" },
              { value: "sea", label: "Sea", detail: "Slower, priced by volume" },
            ]}
          />
          <ChoiceGroup
            legend="Packing"
            value={c.packing}
            onChange={(packing) => set({ packing })}
            options={[
              { value: "assembled", label: "Assembled", disabled: c.type === "printed", detail: c.type === "printed" ? "Printed boxes ship flat" : "Ready to use" },
              { value: "flat", label: "Flat-packed", disabled: c.type === "rigid", detail: c.type === "rigid" ? "Choose collapsible to ship flat" : "Less freight volume" },
            ]}
          />
        </div>
      ),
    },
    {
      id: "artwork",
      label: "Artwork",
      render: () => (
        <ChoiceGroup<Artwork>
          legend="Artwork"
          value={c.artwork}
          columns={3}
          onChange={(artwork) => set({ artwork })}
          options={[
            { value: "upload", label: "Upload my design", detail: "Print-ready files checked by pre-press" },
            { value: "basic", label: "Free basic setup", detail: "Your logo placed on the dieline" },
            { value: "professional", label: "Professional design", detail: "Our studio designs it properly" },
          ]}
        />
      ),
    },
  ];

  const current = Math.min(step, steps.length - 1);
  const active = steps[current]!;
  const go = (n: number) => setStep(Math.max(0, Math.min(steps.length - 1, n)));
  const canAdvance = active.id === "dims" ? dimOk : active.id === "qty" ? qtyOk : true;

  const sendAsQuote = () => router.push("/get-a-quote?from=configurator");
  // Example rates are never shown publicly: prices appear only once RATES.ratesConfirmed is true.
  const showPrices = RATES.ratesConfirmed;

  const summary = (
    <div className="space-y-6">
      {showPrices ? (
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Estimated total</p>
          <AnimatedNumber value={fromUsd(est.total, currency)} format={(n) => formatMoney(n, currency, { decimals: 0 })} className="font-heading font-bold mt-1 block text-h3" />
          <p className="text-sm">
            <AnimatedNumber value={fromUsd(est.unit, currency)} format={(n) => formatMoney(n, currency, { decimals: 2 })} /> per box
          </p>
        </div>
        <label className="text-xs font-semibold uppercase tracking-wider flex flex-col gap-1 text-ink-500">
          Currency
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            className="h-9 border border-silver-300 bg-white px-2 text-ink-900"
          >
            {CURRENCIES.map((code) => (
              <option key={code}>{code}</option>
            ))}
          </select>
        </label>
      </div>
      ) : (
        <div className="rounded-2xl bg-blue-50 p-5">
          <p className="font-heading text-lg font-bold">Get a quote for this spec</p>
          <p className="mt-1 text-sm text-ink-500">Send it to us and we reply {site.facts.quoteReply} with a price.</p>
        </div>
      )}
      <dl className="divide-y divide-dashed divide-silver-300 border-y border-silver-300 text-sm">
        {showPrices && est.lines.map((l) => (
          <div key={l.label} className="flex justify-between gap-4 py-2">
            <dt className="text-ink-500">{l.label}</dt>
            <dd>{money(l.amount)}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-4 py-2">
          <dt className="text-ink-500">Freight volume</dt>
          <dd>{est.cbm} m³</dd>
        </div>
      </dl>
      {showPrices && <p className="text-sm text-ink-500">Estimated, final price confirmed in quote.</p>}
      <div className="flex flex-wrap gap-3">
        <Button onClick={sendAsQuote} arrow disabled={!dimOk || !qtyOk}>
          Send as quote
        </Button>
      </div>
    </div>
  );

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <ol className="mb-10 flex flex-wrap gap-x-4 gap-y-2" aria-label="Configurator steps">
          {steps.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={i === current ? "step" : undefined}
                className={cn("text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 py-1", i === current ? "text-ink-900" : "text-ink-500 hover:text-ink-900")}
              >
                <span className={cn(i === current && "text-blue-600")}>{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </button>
            </li>
          ))}
        </ol>
        <div className="h-px bg-silver-300">
          <motion.div
            className="h-px origin-left bg-ink-900"
            initial={false}
            animate={{ scaleX: (current + 1) / steps.length }}
            transition={{ duration: reduce ? 0 : 0.4 }}
          />
        </div>

        <div className="relative mt-10 min-h-[22rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.section
              key={active.id}
              aria-labelledby={`step-${active.id}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 id={`step-${active.id}`} className="font-heading font-bold mb-8 text-h3">
                {active.label}
              </h2>
              {active.render()}
            </motion.section>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-silver-300 pt-6">
          <Button variant="link" onClick={() => go(current - 1)} disabled={current === 0}>
            Back
          </Button>
          {current < steps.length - 1 ? (
            <Button onClick={() => go(current + 1)} arrow disabled={!canAdvance}>
              Next: {steps[current + 1]!.label}
            </Button>
          ) : (
            <Button onClick={sendAsQuote} arrow disabled={!dimOk || !qtyOk}>
              Send as quote
            </Button>
          )}
        </div>
      </div>

      <aside className="lg:col-span-5" aria-label="Preview and estimate">
        <div className="space-y-8 lg:sticky lg:top-[calc(var(--header-h)+24px)]">
          <BoxPreview3D dims={c.dims} type={c.type} />
          <SpecLabel items={[opts.styleName, c.type === "printed" ? c.board : `${c.board} mm`, `${c.quantity.toLocaleString("en-US")} pcs`]} as="p" />
          {summary}
        </div>
      </aside>

      {/* Mobile: total always in reach. */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between border-t border-silver-300 bg-white px-4 py-3 lg:hidden">
        <span className="text-sm">
          {showPrices ? (
            <>
              {money(est.total)} <span className="text-ink-500">· {money(est.unit)}/box</span>
            </>
          ) : (
            "Ready for a quote"
          )}
        </span>
        <Button size="md" onClick={sendAsQuote} disabled={!dimOk || !qtyOk}>
          Quote
        </Button>
      </div>
    </div>
  );
}
