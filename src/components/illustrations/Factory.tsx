import { path3, project, roundedRect3, type Origin } from "./iso";
import { Callout, Illo, IsoBox, SpecText, type IllustrationProps } from "./primitives";

/** Die cutting: steel-rule die pressing a printed sheet. */
export function FactoryCut({ className }: IllustrationProps) {
  const teeth = Array.from({ length: 13 }, (_, i) => `M${130 + i * 18} 168v26`).join("");
  return (
    <Illo className={className}>
      <rect x="100" y="70" width="280" height="70" className="l2 ln" />
      <rect x="116" y="140" width="248" height="28" className="l3 ln" />
      <path d={teeth} className="ln" />
      <path d="M240 40v22M232 54l8 8 8-8" className="ln acc" />
      <rect x="80" y="214" width="320" height="10" className="f1 ln" />
      <path d="M130 214h220" className="fold" />
      <rect x="60" y="224" width="360" height="40" className="f3 ln" />
      <Callout from={[300, 194]} to={[466, 194]} label="Steel rule" align="end" />
      <Callout from={[200, 219]} to={[96, 300]} label="Printed sheet" align="end" />
      <SpecText items={["Die cutting", "Cut + crease in one pass"]} y={350} />
    </Illo>
  );
}

/** Wrapping: greyboard tray set on its glued wrap sheet. */
export function FactoryWrap({ className }: IllustrationProps) {
  const o: Origin = { x: 240, y: 140 };
  const L = 160;
  const W = 110;
  const M = 55; // wrap margin
  const sheet = path3(
    [[-M + 18, -M, 0], [L + M - 18, -M, 0], [L + M, -M + 18, 0], [L + M, W + M - 18, 0], [L + M - 18, W + M, 0], [-M + 18, W + M, 0], [-M, W + M - 18, 0], [-M, -M + 18, 0]],
    o,
    true,
  );
  return (
    <Illo className={className}>
      <path d={sheet} className="l1 ln" />
      <path d={path3([[0, 0, 0], [L, 0, 0], [L, W, 0], [0, W, 0]], o, true)} className="fold" />
      <IsoBox o={o} size={[L, W, 60]} hideTop />
      <path d={path3([[0, 0, 60], [L, 0, 60], [L, W, 60], [0, W, 60]], o, true)} className="f3 ln" />
      <Callout from={project([L + M - 10, W / 2, 0], o)} to={[466, 280]} label="Wrap paper" align="end" />
      <Callout from={project([L, W / 2, 40], o)} to={[466, 120]} label="Greyboard" align="end" />
      <SpecText items={["Wrapping", "Glued + turned in"]} y={350} />
    </Illo>
  );
}

/** Corner pasting: tape reinforcing a box corner (close-up). */
export function FactoryCorner({ className }: IllustrationProps) {
  const o: Origin = { x: 200, y: 140 };
  const L = 200;
  const W = 200;
  const H = 150;
  const T = 26;
  return (
    <Illo className={className}>
      <IsoBox o={o} size={[L, W, H]} hideTop />
      <path d={path3([[L - T, W, 10], [L, W, 10], [L, W, H - 10], [L - T, W, H - 10]], o, true)} className="acc-fill" style={{ opacity: 0.5 }} />
      <path d={path3([[L, W - T, 10], [L, W, 10], [L, W, H - 10], [L, W - T, H - 10]], o, true)} className="acc-fill" style={{ opacity: 0.7 }} />
      <Callout from={project([L, W, H / 2], o)} to={[466, 120]} label="Corner tape" align="end" />
      <SpecText items={["Corner pasting", "Square, tight corners"]} y={350} />
    </Illo>
  );
}

/** Insert placement: EVA insert lowered into an open rigid box. */
export function FactoryInsert({ className }: IllustrationProps) {
  const o: Origin = { x: 230, y: 175 };
  const L = 190;
  const W = 120;
  const H = 60;
  const cut = (cx: number, cy: number, z: number) => path3(roundedRect3(cx, cy, z, 50, 40, 10), o, true);
  return (
    <Illo className={className}>
      <IsoBox o={o} size={[L, W, H]} hideTop />
      <path d={path3([[5, 5, H], [L - 5, 5, H], [L - 5, W - 5, H], [5, W - 5, H]], o, true)} className="f3 ln" />
      <IsoBox o={o} at={[6, 6, H + 40]} size={[L - 12, W - 12, 22]} tone="white" />
      <path d={cut(60, W / 2, H + 62)} className="w3 ln" />
      <path d={cut(130, W / 2, H + 62)} className="w3 ln" />
      <Callout from={project([L - 6, W / 2, H + 50], o)} to={[466, 120]} label="EVA insert" align="end" />
      <SpecText items={["Insert placement", "CNC-cut EVA"]} y={350} />
    </Illo>
  );
}

/** QC: checklist beside a box being measured with a caliper. */
export function FactoryQc({ className }: IllustrationProps) {
  const rows = ["Dimensions", "Board", "Wrap register", "Corners", "Foil", "Insert fit"];
  return (
    <Illo className={className}>
      <rect x="40" y="60" width="160" height="220" className="fs ln-thin" />
      {rows.map((r, i) => (
        <g key={r}>
          <rect x="56" y={84 + i * 32} width="12" height="12" className="ln-thin" />
          <path d={`M58 ${91 + i * 32}l3 4 6-8`} className="ln acc" />
          <text x="78" y={94 + i * 32} className="lbl lbl-strong">{r}</text>
        </g>
      ))}
      <rect x="250" y="150" width="170" height="110" className="f2 ln" />
      <path d="M240 120V142M430 120V142M240 128H430" className="ln" />
      <rect x="300" y="112" width="70" height="18" className="l1 ln" />
      <text x="335" y="125" textAnchor="middle" className="lbl lbl-strong">250.0</text>
      <SpecText items={["Quality control", "Every stage"]} y={350} />
    </Illo>
  );
}

/** Hot foil stamping: heated die, foil web, board. */
export function FoilStamping({ className }: IllustrationProps) {
  return (
    <Illo className={className}>
      <rect x="170" y="50" width="140" height="60" className="l2 ln" />
      <rect x="200" y="110" width="80" height="24" className="l3 ln" />
      <path d="M216 116h48" className="ln acc" />
      <circle cx="80" cy="160" r="26" className="f1 ln" />
      <circle cx="400" cy="160" r="26" className="f1 ln" />
      <path d="M80 186L200 150H280L400 186" className="ln acc" strokeWidth="3" />
      <rect x="120" y="200" width="240" height="14" className="f1 ln" />
      <rect x="208" y="196" width="64" height="4" className="acc-fill" />
      <rect x="100" y="214" width="280" height="40" className="f3 ln" />
      <Callout from={[240, 80]} to={[466, 60]} label="Heated die" align="end" />
      <Callout from={[140, 168]} to={[96, 300]} label="Foil web" align="end" />
      <SpecText items={["Hot foil blocking", "Gold / silver / copper"]} y={350} />
    </Illo>
  );
}

/** EVA foam insert, top-down, with product cavities. */
export function InsertFoam({ className }: IllustrationProps) {
  return (
    <Illo className={className}>
      <rect x="70" y="60" width="340" height="230" rx="4" className="w2 ln" />
      <circle cx="160" cy="175" r="52" className="f3 ln" />
      <rect x="240" y="95" width="130" height="70" rx="10" className="f3 ln" />
      <rect x="240" y="185" width="60" height="70" rx="10" className="f3 ln" />
      <rect x="310" y="185" width="60" height="70" rx="10" className="f3 ln" />
      <path d="M140 145h40M240 120h40" className="ln-thin" />
      <Callout from={[160, 227]} to={[96, 320]} label="Cavity" align="end" />
      <SpecText items={["EVA insert", "CNC cut", "Black / white / grey"]} y={350} />
    </Illo>
  );
}

/** Same carton, two loads: assembled boxes vs flat-packed. Example only. */
export function ShippingStack({ className }: IllustrationProps) {
  const carton = (x: number) => <rect x={x} y="70" width="170" height="200" className="fs ln" />;
  return (
    <Illo className={className}>
      {carton(40)}
      {[0, 1, 2].map((i) => (
        <rect key={i} x="52" y={84 + i * 60} width="146" height="54" className="l2 ln" />
      ))}
      {carton(270)}
      {Array.from({ length: 16 }, (_, i) => (
        <rect key={i} x="282" y={84 + i * 11.5} width="146" height="9" className="f2 ln-thin" />
      ))}
      <text x="125" y="292" textAnchor="middle" className="lbl lbl-strong">Assembled</text>
      <text x="355" y="292" textAnchor="middle" className="lbl lbl-strong">Collapsible, flat</text>
      <SpecText items={["Same carton", "Example only"]} y={350} />
    </Illo>
  );
}
