import { Illo, SpecText, type IllustrationProps } from "./primitives";

const UNITS = [
  { ink: "var(--accent)", label: "C" },
  { ink: "var(--accent)", label: "M" },
  { ink: "var(--accent)", label: "Y" },
  { ink: "var(--accent)", label: "K" },
];
const GROUND = 282;
const NIP = 216; // where the sheet passes between blanket and impression cylinders

function Sheets({ x, w, top, count }: { x: number; w: number; top: number; count: number }) {
  return (
    <g>
      {Array.from({ length: count }, (_, i) => (
        <path key={i} d={`M${x} ${top + i * 4}H${x + w}`} className="ln-thin" />
      ))}
    </g>
  );
}

/** Four-colour sheet-fed offset press in side elevation. */
export function PressMachine({ className }: IllustrationProps) {
  return (
    <Illo className={className}>
      {/* Feeder */}
      <path d={`M26 ${GROUND}V150H100V${GROUND}`} className="f1 ln" />
      <path d="M34 168H92M63 150V168" className="ln-thin" />
      <Sheets x={34} w={58} top={208} count={10} />
      <rect x="32" y="250" width="62" height="10" className="l2 ln" />

      {/* Print units */}
      {UNITS.map((u, i) => {
        const x = 104 + i * 70;
        const cx = x + 33;
        return (
          <g key={u.label}>
            <path d={`M${x} ${GROUND}V136Q${x} 126 ${x + 10} 126H${x + 56}Q${x + 66} 126 ${x + 66} 136V${GROUND}`} className="f1 ln" />
            <rect x={x + 12} y="132" width="42" height="7" fill={u.ink} />
            {[x + 18, x + 33, x + 48].map((rx, k) => (
              <circle key={rx} cx={rx} cy={k === 1 ? 150 : 154} r="5" className="f2 ln-thin" />
            ))}
            <circle cx={cx} cy={NIP - 45} r="15" className="f2 ln" />
            <circle cx={cx} cy={NIP - 15} r="15" className="f3 ln" />
            <circle cx={cx} cy={NIP + 19} r="19" className="l2 ln" />
            <circle cx={cx} cy={NIP + 19} r="2" fill="currentColor" />
          </g>
        );
      })}

      {/* Sheet path */}
      <path d={`M96 ${NIP}H400`} className="fold acc" />

      {/* Delivery */}
      <path d={`M384 ${GROUND}V140H454V${GROUND}`} className="f1 ln" />
      <path d="M392 158H446M392 158V176M446 158V176" className="ln-thin" />
      <Sheets x={392} w={54} top={230} count={6} />
      <rect x="390" y="254" width="58" height="10" className="l2 ln" />

      {/* Floor */}
      <path d={`M14 ${GROUND}H466`} className="ln" />
      {Array.from({ length: 23 }, (_, i) => (
        <path key={i} d={`M${20 + i * 20} ${GROUND + 2}l-8 8`} className="ln-thin" />
      ))}

      <text x="63" y="310" textAnchor="middle" className="lbl">Feeder</text>
      <text x="244" y="310" textAnchor="middle" className="lbl">Print units</text>
      <text x="419" y="310" textAnchor="middle" className="lbl">Delivery</text>
      <SpecText items={["Sheet-fed offset", "CMYK + Pantone"]} />
    </Illo>
  );
}
