import { Illo, SpecText, type IllustrationProps } from "./primitives";

const SW = 54; // swatch width
const SH = 64; // swatch height

const SWATCHES: Array<{ fill?: string; label: string; hatch?: boolean }> = [
  { fill: "var(--ink)", label: "Ink" },
  { fill: "var(--board)", label: "Board" },
  { fill: "var(--kraft)", label: "Kraft" },
  { fill: "var(--foil)", label: "Foil" },
  { fill: "var(--paper)", label: "Stock" },
  { label: "Pattern", hatch: true },
];

/** 45° hatch lines clipped to a swatch by geometry (no <pattern> ids to collide). */
function hatch(x: number, y: number) {
  const segments: string[] = [];
  for (let k = -SH; k < SW; k += 6) {
    const t0 = Math.max(0, -k);
    const t1 = Math.min(SH, SW - k);
    if (t1 > t0) segments.push(`M${x + k + t0} ${y + SH - t0}L${x + k + t1} ${y + SH - t1}`);
  }
  return segments.join("");
}

/** Brand board: type specimen, palette, wordmark lockup and pattern. */
export function BrandBoard({ className }: IllustrationProps) {
  return (
    <Illo className={className}>
      <rect x="24" y="24" width="432" height="296" className="fs ln-thin" />
      <path d="M244 24V320M24 236H244" className="ln-thin" />

      {/* Type specimen */}
      <text x="40" y="58" className="lbl">Display</text>
      <text
        x="36"
        y="168"
        style={{ fontFamily: "var(--ff-display), sans-serif", fontWeight: 800, fontSize: 132, letterSpacing: "-0.02em" }}
        fill="currentColor"
      >
        Aa
      </text>
      <text x="40" y="190" className="lbl">Body</text>
      <rect x="40" y="200" width="176" height="4" className="f3" />
      <rect x="40" y="210" width="150" height="4" className="f3" />
      <rect x="40" y="220" width="164" height="4" className="f3" />

      {/* Wordmark lockup */}
      <g transform="translate(58 280)">
        <circle r="17" className="ln" />
        <circle r="7" className="acc-fill" />
        <path d="M-24 0H24M0 -24V24" className="ln-thin" />
      </g>
      <text
        x="88"
        y="290"
        style={{ fontFamily: "var(--ff-display), sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: "0.02em" }}
        fill="currentColor"
      >
        WORDMARK
      </text>

      {/* Palette */}
      <text x="260" y="58" className="lbl">Palette</text>
      {SWATCHES.map((s, i) => {
        const x = 260 + (i % 3) * 62;
        const y = 68 + Math.floor(i / 3) * 92;
        return (
          <g key={s.label}>
            {s.hatch ? (
              <>
                <rect x={x} y={y} width={SW} height={SH} className="fs ln-thin" />
                <path d={hatch(x, y)} className="ln-thin" />
              </>
            ) : (
              <rect x={x} y={y} width={SW} height={SH} style={{ fill: s.fill }} className="ln-thin" />
            )}
            <text x={x} y={y + 78} className="lbl">{s.label}</text>
          </g>
        );
      })}

      {/* Pattern strip */}
      <text x="260" y="256" className="lbl">Pattern</text>
      <g opacity="0.4">
        {Array.from({ length: 36 }, (_, i) => (
          <circle key={i} cx={267 + (i % 12) * 15} cy={272 + Math.floor(i / 12) * 15} r="2.2" fill="currentColor" />
        ))}
      </g>

      <SpecText items={["Brand board", "Identity system"]} />
    </Illo>
  );
}
