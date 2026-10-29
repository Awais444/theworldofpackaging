"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronUp, CircleCheck, FileUp, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { submitQuoteRequest } from "@/app/actions/forms";
import { promises, site } from "@/config/site";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { finishes as finishOptions, inserts, printedMaterials, wraps } from "@/content/materials";
import { printedStyles } from "@/content/printedStyles";
import { rigidStyles } from "@/content/rigidStyles";
import { countries, getCountry } from "@/content/countries";
import { illustrations, type IllustrationKey } from "@/components/illustrations";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { QUOTE_QTY_PRESETS, quoteMinQty, quoteStepSchemas } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { useQuote, type QuoteDraft } from "@/store/quote";
import { useConfigurator } from "@/store/configurator";

type Category = NonNullable<QuoteDraft["category"]>;
type Errors = Record<string, string>;

const CATEGORIES: Array<{ id: Category; title: string; text: string; art: IllustrationKey }> = [
  { id: "rigid", title: "Rigid box", text: "Premium greyboard boxes, made in our factory.", art: "magnetic-closed" },
  { id: "collapsible", title: "Collapsible rigid", text: "Rigid boxes that ship and store flat.", art: "collapsible-flat" },
  { id: "printed", title: "Printed box", text: "Mailers, cartons and displays in any size.", art: "mailer-box" },
  { id: "unsure", title: "Not sure", text: "Tell us about the product and we will recommend.", art: "tuck-end" },
];

const NOT_SURE = "not-sure";

type StyleOption = { slug: string; name: string; art: IllustrationKey };
const rigidOptions: StyleOption[] = rigidStyles.filter((s) => !s.collapsible).map((s) => ({ slug: s.slug, name: s.name, art: s.illustration }));
const collapsibleOptions: StyleOption[] = rigidStyles.filter((s) => s.collapsible).map((s) => ({ slug: s.slug, name: s.name, art: s.illustration }));
const printedOptions: StyleOption[] = printedStyles.map((s) => ({ slug: s.slug, name: s.name, art: s.illustration }));
const stylesFor = (c?: Category): StyleOption[] =>
  c === "rigid" ? rigidOptions : c === "collapsible" ? collapsibleOptions : c === "printed" ? printedOptions : [...rigidOptions, ...collapsibleOptions, ...printedOptions];
const styleName = (slug: string) => (slug === NOT_SURE ? "Not sure yet" : [...rigidOptions, ...collapsibleOptions, ...printedOptions].find((s) => s.slug === slug)?.name ?? slug);

const rigidMaterials = [...wraps.map((w) => w.name), "1.5 mm board", "2.0 mm board", "2.5 mm board", "3.0 mm board"];
const materialsFor = (c?: Category) => (c === "printed" ? printedMaterials.map((m) => m.name) : c === "unsure" ? [...wraps.map((w) => w.name), ...printedMaterials.map((m) => m.name)] : rigidMaterials);
const finishList = [...finishOptions.map((f) => f.name), ...inserts.map((i) => i.name), "Window patch", "Ribbon"];

// Main markets first, then common others. "Other" is clarified in notes.
const COUNTRIES = [...countries.map((c) => c.name).sort((a, b) => a.localeCompare(b)), "Other (add in notes)"];

const ARTWORK = [
  { id: "have", title: "I have artwork", text: "Print-ready files or a design you want us to use." },
  { id: "basic", title: "Free basic setup", text: "We place your logo and text on the dieline at no cost." },
  { id: "design", title: "I need full packaging design", text: "Our studio designs the packaging for you." },
] as const;

const SHIP = [
  { id: "air", title: "Air", text: "Fastest. Best for launches and urgent stock." },
  { id: "sea", title: "Sea", text: "Lowest cost per box at volume." },
  { id: "unsure", title: "Not sure", text: "Quote both and we will compare." },
] as const;

const STEPS = ["Category", "Style", "Size", "Quantity", "Materials & finishes", "Artwork", "Shipping", "Contact", "Review"] as const;

function issues(result: { success: boolean; error?: { issues: Array<{ path: PropertyKey[]; message: string }> } }): Errors {
  if (result.success || !result.error) return {};
  const out: Errors = {};
  for (const i of result.error.issues) out[String(i.path[0] ?? "form")] ??= i.message;
  return out;
}

function validate(step: number, d: QuoteDraft): Errors {
  switch (step) {
    case 0:
      return issues(quoteStepSchemas.category.safeParse(d));
    case 1:
      return issues(quoteStepSchemas.style.safeParse(d));
    case 2:
      return issues(quoteStepSchemas.size.safeParse(d));
    case 3:
      return issues(quoteStepSchemas.quantity.safeParse({ category: d.category, quantity: d.quantity }));
    case 5:
      return issues(quoteStepSchemas.artwork.safeParse(d));
    case 6:
      return issues(quoteStepSchemas.shipping.safeParse(d));
    case 7:
      return issues(quoteStepSchemas.contact.safeParse(d));
    default:
      return {};
  }
}

/** Large selectable card backed by a real radio or checkbox input. */
function ChoiceCard({ name, checked, onChange, title, text, art, type = "radio" }: { name: string; checked: boolean; onChange: () => void; title: string; text?: string; art?: IllustrationKey; type?: "radio" | "checkbox" }) {
  const Art = art ? illustrations[art] : null;
  return (
    <label className="block cursor-pointer">
      <input type={type} name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="relative flex h-full flex-col rounded-2xl border-2 border-silver-300 bg-white p-4 transition peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-focus-visible:shadow-[var(--ring)] hover:border-blue-600">
        {checked && (
          <span className="absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
            <Check aria-hidden="true" className="h-4 w-4" />
          </span>
        )}
        {Art && (
          <span className="mb-3 block aspect-[4/3] rounded-xl bg-silver-100 p-[8%]" aria-hidden="true">
            <Art />
          </span>
        )}
        <span className="font-heading font-bold">{title}</span>
        {text && <span className="mt-1 text-sm text-ink-500">{text}</span>}
      </span>
    </label>
  );
}

function Chip({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: ReactNode }) {
  return (
    <label className="cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="inline-flex h-11 items-center gap-2 rounded-full border border-silver-300 bg-white px-4 text-[15px] font-medium transition peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white peer-focus-visible:shadow-[var(--ring)] hover:border-blue-600">
        {checked && <Check aria-hidden="true" className="h-4 w-4" />}
        {children}
      </span>
    </label>
  );
}

function ErrorMsg({ error }: { error?: string }) {
  return error ? (
    <p role="alert" className="mt-3 text-sm font-medium text-error">
      {error}
    </p>
  ) : null;
}

function summaryRows(d: QuoteDraft): Array<{ label: string; value: string; step: number }> {
  const cat = CATEGORIES.find((c) => c.id === d.category)?.title;
  const size = d.helpChoose ? "Help me choose" : d.length && d.width && d.height ? `${d.length} × ${d.width} × ${d.height} ${d.unit}` : "";
  return [
    { label: "Category", value: cat ?? "", step: 0 },
    { label: "Style", value: d.style ? styleName(d.style) : "", step: 1 },
    { label: "Size (L × W × H)", value: size, step: 2 },
    { label: "Quantity", value: d.quantity ? d.quantity.toLocaleString("en-US") : "", step: 3 },
    { label: "Materials", value: d.materials.join(", "), step: 4 },
    { label: "Finishes & inserts", value: d.finishes.join(", "), step: 4 },
    { label: "Artwork", value: ARTWORK.find((a) => a.id === d.artwork)?.title ?? "", step: 5 },
    { label: "Ship to", value: [d.country, SHIP.find((s) => s.id === d.ship)?.title, d.packing && (d.packing === "flat" ? "Packed flat" : "Assembled")].filter(Boolean).join(" · "), step: 6 },
  ];
}

function Summary({ d, onEdit, compact = false }: { d: QuoteDraft; onEdit?: (step: number) => void; compact?: boolean }) {
  return (
    <dl className={cn("divide-y divide-silver-300", compact && "text-sm")}>
      {summaryRows(d).map((r) => (
        <div key={r.label} className="flex items-start justify-between gap-4 py-3">
          <div className="min-w-0">
            <dt className="text-xs font-semibold uppercase tracking-wider text-ink-500">{r.label}</dt>
            <dd className={cn("mt-0.5 break-words", r.value ? "font-medium text-ink-900" : "text-ink-500")}>{r.value || "Not set yet"}</dd>
          </div>
          {onEdit && r.value && (
            <button type="button" onClick={() => onEdit(r.step)} className="shrink-0 text-sm font-semibold text-blue-600 hover:underline">
              Edit
            </button>
          )}
        </div>
      ))}
    </dl>
  );
}

function Success({ onRestart }: { onRestart: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} role="status" className="mx-auto max-w-2xl rounded-3xl bg-blue-50 p-8 text-center md:p-12">
      <CircleCheck aria-hidden="true" className="mx-auto h-16 w-16 text-blue-600" />
      <h2 className="text-h2 mt-6">Quote request sent</h2>
      <p className="text-lead mt-4 text-ink-500">Thank you. We&apos;ll reply {site.facts.quoteReply} with a price and any questions about your spec.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <WhatsAppButton message="Hi, I just sent a quote request on your website." label="Message us on WhatsApp" variant="primary" />
        <Button href="/work" size="lg" variant="secondary">
          Browse our work
        </Button>
      </div>
      <button type="button" onClick={onRestart} className="mt-6 text-sm font-semibold text-blue-600 hover:underline">
        Start another quote
      </button>
    </motion.div>
  );
}

/** Multi-step quote builder (CLAUDE.md §10.1). State lives in the Zustand quote store. */
export function QuoteBuilder() {
  const { draft: d, step, set, toggle, goTo, reset } = useQuote();
  const reduce = useReducedMotion();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const ids = useId();
  const last = step === STEPS.length - 1;

  // Prefill from links: ?style=, ?country=, ?industry= or ?from=configurator.
  useEffect(() => {
    void (async () => {
      await useQuote.persist.rehydrate();
      const q = new URLSearchParams(window.location.search);
      const { set: patch, draft } = useQuote.getState();
      if (q.get("from") === "configurator") {
        await useConfigurator.persist.rehydrate();
        const c = useConfigurator.getState().config;
        patch({ category: c.type, style: c.style, unit: "mm", helpChoose: false, length: c.dims.l, width: c.dims.w, height: c.dims.h, quantity: c.quantity, finishes: c.finishes });
        return;
      }
      const style = q.get("style");
      if (style && !draft.style) {
        const category: Category | undefined = collapsibleOptions.some((s) => s.slug === style) ? "collapsible" : rigidOptions.some((s) => s.slug === style) ? "rigid" : printedOptions.some((s) => s.slug === style) ? "printed" : undefined;
        if (category) patch({ category, style });
      }
      const country = getCountry(q.get("country") ?? "")?.name;
      if (country && !draft.country) patch({ country });
      const service = q.get("service");
      if (service && !draft.notes) patch({ notes: `Design service: ${service.replace(/-/g, " ")}${q.get("tier") ? ` (${q.get("tier")} tier)` : ""}. ` });
      const industry = q.get("industry");
      if (industry && !draft.notes) patch({ notes: `Industry: ${industry.replace(/-/g, " ")}. ` });
    })();
  }, []);

  const move = (n: number) => {
    setErrors({});
    goTo(n);
    requestAnimationFrame(() => heading.current?.focus());
  };

  const next = () => {
    const e = validate(step, d);
    setErrors(e);
    if (Object.keys(e).length) return;
    move(step + 1);
  };

  const submit = async () => {
    // Re-check every step before sending.
    for (let i = 0; i < STEPS.length - 1; i++) {
      const e = validate(i, d);
      if (Object.keys(e).length) {
        move(i);
        setErrors(e);
        return;
      }
    }
    setStatus("sending");
    const res = await submitQuoteRequest({ ...d, website: honeypot });
    if (res.ok) {
      setStatus("sent");
      reset();
    } else {
      setStatus("error");
      setServerError(res.error);
    }
  };

  if (status === "sent") return <Success onRestart={() => setStatus("idle")} />;

  const minQty = quoteMinQty(d.category ?? "unsure");
  const filled = summaryRows(d).filter((r) => r.value).length;

  const content: ReactNode[] = [
    // 1. Category
    <div key="category">
      <div role="radiogroup" aria-label="Box category" className="grid gap-4 sm:grid-cols-2">
        {CATEGORIES.map((c) => (
          <ChoiceCard
            key={c.id}
            name="category"
            checked={d.category === c.id}
            onChange={() => set({ category: c.id, style: d.category === c.id ? d.style : "", packing: c.id === "collapsible" ? d.packing : undefined })}
            title={c.title}
            text={c.text}
            art={c.art}
          />
        ))}
      </div>
      <ErrorMsg error={errors.category} />
    </div>,
    // 2. Style
    <div key="style">
      <div role="radiogroup" aria-label="Box style" className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {stylesFor(d.category).map((s) => (
          <ChoiceCard key={s.slug} name="style" checked={d.style === s.slug} onChange={() => set({ style: s.slug })} title={s.name} art={s.art} />
        ))}
        <ChoiceCard name="style" checked={d.style === NOT_SURE} onChange={() => set({ style: NOT_SURE })} title="Not sure yet" text="We will recommend a style." />
      </div>
      <ErrorMsg error={errors.style} />
    </div>,
    // 3. Size
    <div key="size" className="space-y-6">
      <div className="inline-flex rounded-full bg-silver-100 p-1" role="radiogroup" aria-label="Units">
        {(["mm", "in"] as const).map((u) => (
          <label key={u} className="cursor-pointer">
            <input type="radio" name="unit" checked={d.unit === u} onChange={() => set({ unit: u })} className="peer sr-only" />
            <span className="inline-flex h-10 items-center rounded-full px-5 text-sm font-semibold peer-checked:bg-blue-600 peer-checked:text-white peer-focus-visible:shadow-[var(--ring)]">{u === "mm" ? "Millimetres" : "Inches"}</span>
          </label>
        ))}
      </div>
      <fieldset disabled={d.helpChoose} className="grid gap-4 disabled:opacity-50 sm:grid-cols-3">
        <legend className="sr-only">Inside dimensions</legend>
        {(["length", "width", "height"] as const).map((k) => (
          <Field key={k} label={`${k[0]!.toUpperCase()}${k.slice(1)} (${d.unit})`} htmlFor={`${ids}-${k}`} error={errors[k]}>
            <Input
              id={`${ids}-${k}`}
              type="number"
              inputMode="decimal"
              min={0}
              step={d.unit === "mm" ? 1 : 0.1}
              value={d[k] ?? ""}
              aria-invalid={!!errors[k]}
              onChange={(e) => set({ [k]: e.target.value === "" ? undefined : Number(e.target.value) })}
            />
          </Field>
        ))}
      </fieldset>
      <p className="text-sm text-ink-500">
        Inside dimensions: the space your product needs. Not sure how to measure?{" "}
        <Link href="/blog/how-to-measure-box-size" target="_blank" className="font-semibold text-blue-600 underline underline-offset-4">
          Read our measuring guide
        </Link>
        .
      </p>
      <Chip checked={d.helpChoose} onChange={() => set({ helpChoose: !d.helpChoose })}>
        Help me choose a size
      </Chip>
    </div>,
    // 4. Quantity
    <div key="quantity" className="space-y-6">
      <div role="radiogroup" aria-label="Quantity" className="flex flex-wrap gap-3">
        {QUOTE_QTY_PRESETS.map((q) => (
          <label key={q} className="cursor-pointer">
            <input type="radio" name="qty" checked={d.quantity === q} onChange={() => set({ quantity: q })} className="peer sr-only" />
            <span className="inline-flex h-14 min-w-28 items-center justify-center rounded-2xl border-2 border-silver-300 px-5 font-heading text-lg font-bold transition peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-focus-visible:shadow-[var(--ring)] hover:border-blue-600">
              {q.toLocaleString("en-US")}
            </span>
          </label>
        ))}
      </div>
      <Field label="Or a custom quantity" htmlFor={`${ids}-qty`} error={errors.quantity} hint={`Minimum ${minQty.toLocaleString("en-US")} for this category.`} className="max-w-xs">
        <Input id={`${ids}-qty`} type="number" inputMode="numeric" min={minQty} step={50} value={d.quantity ?? ""} aria-invalid={!!errors.quantity} onChange={(e) => set({ quantity: e.target.value === "" ? undefined : Number(e.target.value) })} />
      </Field>
    </div>,
    // 5. Materials & finishes
    <div key="materials" className="space-y-8">
      <fieldset>
        <legend className="mb-3 text-sm font-semibold">Materials (pick any)</legend>
        <div className="flex flex-wrap gap-2">
          {materialsFor(d.category).map((m) => (
            <Chip key={m} checked={d.materials.includes(m)} onChange={() => toggle("materials", m)}>
              {m}
            </Chip>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-3 text-sm font-semibold">Finishes and inserts (pick any)</legend>
        <div className="flex flex-wrap gap-2">
          {finishList.map((f) => (
            <Chip key={f} checked={d.finishes.includes(f)} onChange={() => toggle("finishes", f)}>
              {f}
            </Chip>
          ))}
        </div>
      </fieldset>
      <p className="text-sm text-ink-500">Optional. Skip this step and we will recommend a spec.</p>
    </div>,
    // 6. Artwork
    <div key="artwork" className="space-y-6">
      <div role="radiogroup" aria-label="Artwork" className="grid gap-4 md:grid-cols-3">
        {ARTWORK.map((a) => (
          <ChoiceCard key={a.id} name="artwork" checked={d.artwork === a.id} onChange={() => set({ artwork: a.id })} title={a.title} text={a.text} />
        ))}
      </div>
      <ErrorMsg error={errors.artwork} />
      {d.artwork === "have" && (
        <div className="rounded-2xl border-2 border-dashed border-silver-300 p-6">
          <label htmlFor={`${ids}-files`} className="flex cursor-pointer flex-col items-center gap-2 text-center">
            <FileUp aria-hidden="true" className="h-8 w-8 text-blue-600" />
            <span className="font-semibold">Choose artwork files</span>
            <span className="text-sm text-ink-500">PDF, AI, PNG or JPG. We note the file names now and ask you to send the files when we reply.</span>
          </label>
          <input
            id={`${ids}-files`}
            type="file"
            multiple
            accept=".pdf,.ai,.eps,.svg,.png,.jpg,.jpeg"
            className="sr-only"
            onChange={(e) => set({ files: [...d.files, ...Array.from(e.target.files ?? []).map((f) => f.name)].slice(0, 10) })}
          />
          {d.files.length > 0 && (
            <ul className="mt-4 space-y-2">
              {d.files.map((f) => (
                <li key={f} className="flex items-center justify-between gap-3 rounded-lg bg-silver-50 px-3 py-2 text-sm">
                  <span className="truncate">{f}</span>
                  <button type="button" aria-label={`Remove ${f}`} onClick={() => set({ files: d.files.filter((x) => x !== f) })} className="text-ink-500 hover:text-error">
                    <X aria-hidden="true" className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>,
    // 7. Shipping
    <div key="shipping" className="space-y-6">
      <Field label="Ship to" htmlFor={`${ids}-country`} error={errors.country} className="max-w-md">
        <Select id={`${ids}-country`} value={d.country} aria-invalid={!!errors.country} onChange={(e) => set({ country: e.target.value })}>
          <option value="">Choose a country</option>
          {COUNTRIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
      </Field>
      <div>
        <p className="mb-3 text-sm font-semibold">Freight</p>
        <div role="radiogroup" aria-label="Freight" className="grid gap-4 md:grid-cols-3">
          {SHIP.map((s) => (
            <ChoiceCard key={s.id} name="ship" checked={d.ship === s.id} onChange={() => set({ ship: s.id })} title={s.title} text={s.text} />
          ))}
        </div>
        <ErrorMsg error={errors.ship} />
      </div>
      {d.category === "collapsible" && (
        <div>
          <p className="mb-3 text-sm font-semibold">Packing</p>
          <div role="radiogroup" aria-label="Packing" className="grid gap-4 md:grid-cols-2">
            <ChoiceCard name="packing" checked={d.packing === "flat"} onChange={() => set({ packing: "flat" })} title="Flat" text="Lowest freight volume. Assemble in seconds." />
            <ChoiceCard name="packing" checked={d.packing === "assembled"} onChange={() => set({ packing: "assembled" })} title="Assembled" text="Ready to pack on arrival." />
          </div>
          <ErrorMsg error={errors.packing} />
        </div>
      )}
    </div>,
    // 8. Contact
    <div key="contact" className="grid gap-5 sm:grid-cols-2">
      <Field label="Name" htmlFor={`${ids}-name`} error={errors.name}>
        <Input id={`${ids}-name`} autoComplete="name" value={d.name} aria-invalid={!!errors.name} onChange={(e) => set({ name: e.target.value })} />
      </Field>
      <Field label="Email" htmlFor={`${ids}-email`} error={errors.email}>
        <Input id={`${ids}-email`} type="email" autoComplete="email" value={d.email} aria-invalid={!!errors.email} onChange={(e) => set({ email: e.target.value })} />
      </Field>
      <Field label="Company (optional)" htmlFor={`${ids}-company`}>
        <Input id={`${ids}-company`} autoComplete="organization" value={d.company} onChange={(e) => set({ company: e.target.value })} />
      </Field>
      <Field label="WhatsApp (optional)" htmlFor={`${ids}-wa`}>
        <Input id={`${ids}-wa`} type="tel" autoComplete="tel" value={d.whatsapp} onChange={(e) => set({ whatsapp: e.target.value })} />
      </Field>
      <Field label="Notes (optional)" htmlFor={`${ids}-notes`} className="sm:col-span-2" hint="Product, deadline, anything else we should know.">
        <Textarea id={`${ids}-notes`} rows={4} value={d.notes} onChange={(e) => set({ notes: e.target.value })} />
      </Field>
      {/* Honeypot: hidden from people, filled by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>
    </div>,
    // 9. Review
    <div key="review" className="space-y-6">
      <div className="rounded-2xl bg-silver-50 px-5">
        <Summary d={d} onEdit={move} />
      </div>
      <div className="rounded-2xl bg-silver-50 p-5 text-sm">
        <p className="font-semibold">
          {d.name} · {d.email}
        </p>
        {(d.company || d.whatsapp) && <p className="mt-1 text-ink-500">{[d.company, d.whatsapp].filter(Boolean).join(" · ")}</p>}
        {d.notes && <p className="mt-2 text-ink-500">{d.notes}</p>}
        <button type="button" onClick={() => move(7)} className="mt-2 font-semibold text-blue-600 hover:underline">
          Edit contact details
        </button>
      </div>
    </div>,
  ];

  return (
    <div className="grid gap-10 pb-24 lg:grid-cols-12 lg:pb-0">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (last) void submit();
          else next();
        }}
        className="relative rounded-3xl border border-silver-300 bg-white p-5 md:p-8 lg:col-span-8"
      >
        <div className="flex items-center justify-between gap-4 text-sm font-semibold">
          <span className="text-blue-600">
            Step {step + 1} of {STEPS.length}
          </span>
          <span className="text-ink-500">{Math.round(((step + 1) / STEPS.length) * 100)}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-silver-100" role="progressbar" aria-label="Quote progress" aria-valuemin={1} aria-valuemax={STEPS.length} aria-valuenow={step + 1}>
          <motion.div className="h-full origin-left rounded-full bg-blue-600" initial={false} animate={{ scaleX: (step + 1) / STEPS.length }} transition={{ duration: reduce ? 0 : 0.4 }} />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.fieldset
            key={step}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 min-h-[20rem]"
          >
            <legend className="sr-only">{STEPS[step]}</legend>
            <h2 ref={heading} tabIndex={-1} className="text-h3 mb-6 outline-none">
              {STEPS[step]}
            </h2>
            {content[step]}
          </motion.fieldset>
        </AnimatePresence>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-silver-300 pt-6">
          <Button type="button" variant="ghost" onClick={() => move(step - 1)} disabled={step === 0} className="disabled:invisible">
            Back
          </Button>
          <Button type="submit" size="lg" arrow disabled={status === "sending"}>
            {last ? (status === "sending" ? "Sending…" : "Send quote request") : `Next: ${STEPS[step + 1]}`}
          </Button>
        </div>
        {status === "error" && (
          <p role="alert" className="mt-4 text-sm font-medium text-error">
            {serverError || "That did not go through."} You can also email {site.email}.
          </p>
        )}
      </form>

      {/* Live summary: sticky sidebar on desktop. */}
      <aside className="hidden lg:col-span-4 lg:block">
        <div className="sticky top-[calc(var(--header-h)+1.5rem)] rounded-3xl bg-silver-100 p-6">
          <h2 className="font-heading text-lg font-bold">Your quote</h2>
          <div className="mt-2">
            <Summary d={d} onEdit={move} compact />
          </div>
          <ul className="mt-4 space-y-1.5 text-sm font-medium">
            {promises().map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-orange-500" />
                {p}
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-orange-500" />
              Free design support with every order
            </li>
          </ul>
        </div>
      </aside>

      {/* Live summary: collapsible bottom sheet on mobile. */}
      <div data-bottom-sheet className="fixed inset-x-0 bottom-0 z-40 border-t border-silver-300 bg-white shadow-md lg:hidden">
        <button type="button" aria-expanded={sheetOpen} aria-controls={`${ids}-sheet`} onClick={() => setSheetOpen(!sheetOpen)} className="container-x flex h-14 w-full items-center justify-between font-semibold">
          <span>
            Your quote <span className="text-ink-500">({filled}/8 set)</span>
          </span>
          <ChevronUp aria-hidden="true" className={cn("h-5 w-5 transition-transform", !sheetOpen && "rotate-180")} />
        </button>
        <div id={`${ids}-sheet`} hidden={!sheetOpen} className="container-x max-h-[60vh] overflow-y-auto pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Summary
            d={d}
            compact
            onEdit={(s) => {
              setSheetOpen(false);
              move(s);
            }}
          />
        </div>
      </div>
    </div>
  );
}
