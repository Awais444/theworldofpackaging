import { arc3, cylinder3, path3, project, type Origin, type Vec3 } from "./iso";
import { Callout, Illo, IsoBox, Shadow, Line3, SpecText, type IllustrationProps } from "./primitives";

/** Tuck end carton, top lid open with dust flap up. */
export function TuckEndBox({ className }: IllustrationProps) {
  const o: Origin = { x: 240, y: 250 };
  const L = 100;
  const W = 76;
  const H = 170;
  const phi = Math.PI / 3;
  const lid = (x: number): Vec3 => [x, W * Math.cos(phi), H + W * Math.sin(phi)];
  const tuck = (x: number): Vec3 => [x, W * Math.cos(phi) + 16 * Math.sin(phi), H + W * Math.sin(phi) - 16 * Math.cos(phi)];
  return (
    <Illo className={className}>
      <Shadow o={o} size={[L, W]} />
      <IsoBox o={o} size={[L, W, H]} hideTop />
      <path d={path3([[0, 0, H], [L, 0, H], [L, W, H], [0, W, H]], o, true)} className="f3 ln" />
      <path d={path3([[L, 4, H], [L, W - 4, H], [L, W - 12, H + 22], [L, 12, H + 22]], o, true)} className="f2 ln" />
      <path d={path3([[0, 0, H], [L, 0, H], lid(L), lid(0)], o, true)} className="l1 ln" />
      <path d={path3([lid(0), lid(L), tuck(L), tuck(0)], o, true)} className="l2 ln" />
      <Line3 o={o} a={[0, 0, H]} b={[L, 0, H]} className="fold" />
      <path d={path3(arc3([L / 2, W, H / 2], [1, 0, 0], [0, 0, 1], 22, 0, Math.PI * 2, 32), o, true)} className="ln acc" />
      <Callout from={project(tuck(L / 2), o)} to={[100, 60]} label="Tuck flap" align="end" />
      <Callout from={project([L, W / 2, H + 12], o)} to={[440, 110]} label="Dust flap" align="end" />
      <SpecText items={["Reverse tuck end", "350 gsm SBS"]} y={350} />
    </Illo>
  );
}

/** Regular slotted shipping carton, taped, with handling marks. */
export function ShippingCarton({ className }: IllustrationProps) {
  const o: Origin = { x: 220, y: 150 };
  const L = 220;
  const W = 150;
  const H = 130;
  const T = 12; // half tape width
  const arrow = (x: number) => {
    const [ax, ay] = project([x, W, 40], o);
    const [bx, by] = project([x, W, 80], o);
    return `M${ax} ${ay}L${bx} ${by}M${bx - 5} ${by + 7}L${bx} ${by}L${bx + 5} ${by + 7}`;
  };
  return (
    <Illo className={className}>
      <Shadow o={o} size={[L, W]} />
      <IsoBox o={o} size={[L, W, H]} />
      <path d={path3([[0, W / 2 - T, H], [L, W / 2 - T, H], [L, W / 2 + T, H], [0, W / 2 + T, H]], o, true)} className="l1" />
      <path d={path3([[L, W / 2 - T, H], [L, W / 2 + T, H], [L, W / 2 + T, H - 45], [L, W / 2 - T, H - 45]], o, true)} className="l3" />
      <Line3 o={o} a={[0, W / 2, H]} b={[L, W / 2, H]} className="ln" />
      <path d={`${arrow(40)}${arrow(64)}`} className="ln" />
      <Callout from={project([L * 0.7, W / 2, H], o)} to={[466, 60]} label="Taped seam" align="end" />
      <SpecText items={["Shipping carton", "B-flute", "RSC"]} y={350} />
    </Illo>
  );
}

/** Counter display tray with header card and a row of products. */
export function DisplayBox({ className }: IllustrationProps) {
  const o: Origin = { x: 230, y: 185 };
  const L = 200;
  const W = 110;
  const header: Vec3[] = [[0, 0, 40], [L, 0, 40], [L, 0, 135], [L / 2, 0, 152], [0, 0, 135]];
  return (
    <Illo className={className}>
      <Shadow o={o} size={[L, W]} />
      <path d={path3(header, o, true)} className="l2 ln" />
      <path d={path3(arc3([L / 2, 0, 100], [1, 0, 0], [0, 0, 1], 22, 0, Math.PI * 2, 32), o, true)} className="ln acc" />
      <path d={path3([[0, 0, 8], [L, 0, 8], [L, W, 8], [0, W, 8]], o, true)} className="f3 ln-thin" />
      {[35, 80, 125, 170].map((x) => {
        const c = cylinder3([x, 55, 8], 15, 50, o);
        return (
          <g key={x}>
            <path d={c.body} className="w2 ln" />
            <path d={c.top} className="w1 ln" />
          </g>
        );
      })}
      <path d={path3([[0, W, 0], [L, W, 0], [L, W, 25], [0, W, 25]], o, true)} className="f2 ln" />
      <path d={path3([[L, 0, 0], [L, W, 0], [L, W, 25], [L, 0, 40]], o, true)} className="f3 ln" />
      <Callout from={project([L, 0, 120], o)} to={[466, 60]} label="Header card" align="end" />
      <SpecText items={["Counter display", "E-flute", "Ships flat"]} y={350} />
    </Illo>
  );
}

/** Pillow box in elevation, curved end folds dashed. */
export function PillowBox({ className }: IllustrationProps) {
  return (
    <Illo className={className}>
      <ellipse cx="240" cy="272" rx="140" ry="18" className="shadow" filter="url(#illo-soft)" />
      <path d="M110 110H370Q336 180 370 250H110Q144 180 110 110Z" className="f1 ln" />
      <path d="M110 110Q144 180 110 250Q160 180 110 110Z" className="f2" />
      <path d="M370 110Q336 180 370 250Q320 180 370 110Z" className="f3" />
      <path d="M150 112Q182 180 150 248M330 112Q298 180 330 248" className="fold" />
      <path d="M110 110Q160 180 110 250M370 110Q320 180 370 250" className="ln-thin" />
      <circle cx="240" cy="180" r="26" className="ln acc" />
      <Callout from={[150, 180]} to={[96, 300]} label="Curved score" align="end" />
      <SpecText items={["Pillow box", "350 gsm SBS", "No glue"]} y={350} />
    </Illo>
  );
}

/** Printed sleeve slid part-way off a tray. */
export function SleeveBox({ className }: IllustrationProps) {
  const o: Origin = { x: 215, y: 150 };
  const W = 140;
  const H = 60;
  return (
    <Illo className={className}>
      <Shadow o={o} size={[230, W]} />
      <IsoBox o={o} at={[0, -2, -2]} size={[150, W + 4, H + 4]} />
      <path d={path3([[50, -2, H + 2], [90, -2, H + 2], [90, W + 2, H + 2], [50, W + 2, H + 2]], o, true)} className="l1" />
      <path d={path3([[50, W + 2, -2], [90, W + 2, -2], [90, W + 2, H + 2], [50, W + 2, H + 2]], o, true)} className="l2" />
      <IsoBox o={o} at={[150, 2, 0]} size={[80, W - 4, H - 4]} tone="white" />
      <Callout from={project([70, 0, H + 2], o)} to={[150, 40]} label="Printed sleeve" align="end" />
      <Callout from={project([230, W / 2, H / 2], o)} to={[466, 260]} label="Plain tray" align="end" />
      <SpecText items={["Sleeve + tray", "SBS sleeve"]} y={350} />
    </Illo>
  );
}

/** Gable carry box with handle. */
export function GableBox({ className }: IllustrationProps) {
  const o: Origin = { x: 230, y: 190 };
  const L = 150;
  const W = 100;
  const H = 90;
  const R = H + 45; // ridge
  const slot = arc3([L / 2, W / 2, R + 22], [1, 0, 0], [0, 0, 1], 8, Math.PI / 2, (3 * Math.PI) / 2, 10);
  const slot2 = arc3([L / 2 + 30, W / 2, R + 22], [1, 0, 0], [0, 0, 1], 8, -Math.PI / 2, Math.PI / 2, 10);
  return (
    <Illo className={className}>
      <Shadow o={o} size={[L, W]} />
      <IsoBox o={o} size={[L, W, H]} hideTop />
      <path d={path3([[0, W, H], [L, W, H], [L, W / 2, R], [0, W / 2, R]], o, true)} className="f1 ln" />
      <path d={path3([[L, 0, H], [L, W, H], [L, W / 2, R]], o, true)} className="f3 ln" />
      <path d={path3([[0, W / 2, R], [L, W / 2, R], [L, W / 2, R + 42], [0, W / 2, R + 42]], o, true)} className="l2 ln" />
      <path d={path3([...slot, ...slot2], o, true)} className="fs ln" />
      <Callout from={project([L, W / 2, R + 30], o)} to={[466, 80]} label="Handle" align="end" />
      <SpecText items={["Gable box", "Food-safe SBS"]} y={350} />
    </Illo>
  );
}
