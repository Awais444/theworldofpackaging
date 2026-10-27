import { arc3, cylinder3, path3, project, roundedRect3, type Origin, type Vec3 } from "./iso";
import { Callout, Illo, IsoBox, Line3, SpecText, type IllustrationProps } from "./primitives";

/** Open-topped tray: rim ring plus dark interior, drawn at the box's top plane. */
function OpenTop({ o, at = [0, 0, 0], size, wall = 5 }: { o: Origin; at?: Vec3; size: Vec3; wall?: number }) {
  const [x0, y0, z0] = at;
  const [l, w, h] = size;
  const z = z0 + h;
  const outer = path3([[x0, y0, z], [x0 + l, y0, z], [x0 + l, y0 + w, z], [x0, y0 + w, z]], o, true);
  const innerPts: Vec3[] = [
    [x0 + wall, y0 + wall, z],
    [x0 + wall, y0 + w - wall, z],
    [x0 + l - wall, y0 + w - wall, z],
    [x0 + l - wall, y0 + wall, z],
  ];
  return (
    <g>
      <path d={path3(innerPts, o, true)} className="f3" />
      <path d={`${outer}${path3(innerPts, o, true)}`} fillRule="evenodd" className="f1 ln" />
    </g>
  );
}

/** Two-piece lid & base, lid lifted. */
export function LidAndBaseBox({ className }: IllustrationProps) {
  const o: Origin = { x: 225, y: 160 };
  const L = 200;
  const W = 130;
  const H = 70;
  const lidZ = 110;
  const corners: Vec3[] = [[L, 0, 0], [L, W, 0], [0, W, 0]];
  return (
    <Illo className={className}>
      <IsoBox o={o} size={[L, W, H]} hideTop />
      <OpenTop o={o} size={[L, W, H]} />
      {corners.map(([x, y], i) => (
        <Line3 key={i} o={o} a={[x, y, H + 6]} b={[x, y, lidZ - 4]} className="fold" />
      ))}
      <IsoBox o={o} at={[-3, -3, lidZ]} size={[L + 6, W + 6, 34]} />
      <path
        d={path3(arc3([L / 2, W / 2, lidZ + 34], [1, 0, 0], [0, 1, 0], 22, 0, Math.PI * 2, 40), o, true)}
        className="ln acc"
      />
      <Callout from={project([L + 3, W / 2, lidZ + 17], o)} to={[462, 92]} label="Full-depth lid" align="end" />
      <SpecText items={["Lid & base", "2.0 mm board", "Friction fit"]} y={350} />
    </Illo>
  );
}

/** Drawer box: rigid tray pulled part-way out of its sleeve, with ribbon pull. */
export function DrawerBox({ className }: IllustrationProps) {
  const o: Origin = { x: 220, y: 140 };
  const L = 170;
  const W = 120;
  const H = 60;
  const OUT = 80;
  const t = 4;
  const [rx, ry] = project([L + OUT, W / 2, H / 2], o);
  return (
    <Illo className={className}>
      {/* Sleeve */}
      <path d={path3([[0, 0, H], [L, 0, H], [L, W, H], [0, W, H]], o, true)} className="f1 ln" />
      <path d={path3([[0, W, 0], [L, W, 0], [L, W, H], [0, W, H]], o, true)} className="f2 ln" />
      <path d={path3([[L, 0, 0], [L, W, 0], [L, W, H], [L, 0, H]], o, true)} className="f3 ln" />
      {/* Tray sliding out of the opening */}
      <IsoBox o={o} at={[L - 10, t, t]} size={[OUT + 10, W - 2 * t, H - 2 * t]} hideTop />
      <OpenTop o={o} at={[L - 10, t, t]} size={[OUT + 10, W - 2 * t, H - 2 * t]} wall={4} />
      <path d={`M${rx} ${ry - 6}c10 -4 18 4 14 14c-3 8 -14 6 -14 -2`} className="ln acc" />
      <path d={`M${rx} ${ry - 6}v22`} className="ln acc" />
      <Callout from={project([L, W, H / 2], o)} to={[110, 300]} label="Rigid sleeve" align="end" />
      <Callout from={[rx + 8, ry + 6]} to={[466, ry + 40]} label="Ribbon pull" align="end" />
      <SpecText items={["Drawer", "Tray + sleeve", "Ribbon pull"]} y={350} />
    </Illo>
  );
}

/** Book style: cover hinged on the spine, opened back. */
export function BookStyleBox({ className }: IllustrationProps) {
  const o: Origin = { x: 250, y: 200 };
  const L = 130;
  const W = 120;
  const H = 46;
  const phi = (140 * Math.PI) / 180;
  const c = Math.cos(phi);
  const s = Math.sin(phi);
  const far = (y: number): Vec3 => [(L + 3) * c, y, H + 3 + (L + 3) * s];
  return (
    <Illo className={className}>
      <path d={path3([[0, -3, H + 3], [0, W + 3, H + 3], far(W + 3), far(-3)], o, true)} className="f2 ln" />
      <path
        d={path3(arc3([((L + 3) * c) / 2, W / 2, H + 3 + ((L + 3) * s) / 2], [c, 0, s], [0, 1, 0], 16, 0, Math.PI * 2, 40), o, true)}
        className="ln-thin acc"
      />
      <IsoBox o={o} size={[L, W, H]} hideTop />
      <OpenTop o={o} size={[L, W, H]} />
      <Line3 o={o} a={[0, -3, H + 3]} b={[0, W + 3, H + 3]} className="ln acc" />
      <Callout from={project([0, W / 2, H + 3], o)} to={[70, 300]} label="Spine hinge" align="end" />
      <Callout from={project([L, W / 2, H / 2], o)} to={[462, 260]} label="Rigid tray" align="end" />
      <SpecText items={["Book style", "2.5 mm board", "Magnetic cover"]} y={350} />
    </Illo>
  );
}

/** Shoulder neck: base, raised contrast neck and lifted lid. */
export function ShoulderNeckBox({ className }: IllustrationProps) {
  const o: Origin = { x: 225, y: 170 };
  const L = 190;
  const W = 130;
  const BASE = 60;
  const NECK = 82;
  const LID = 104;
  return (
    <Illo className={className}>
      <path d={path3([[0, 0, BASE], [L, 0, BASE], [L, W, BASE], [0, W, BASE]], o, true)} className="f1 ln" />
      <g style={{ opacity: 0.9 }}>
        <path d={path3([[5, W - 5, BASE], [L - 5, W - 5, BASE], [L - 5, W - 5, NECK], [5, W - 5, NECK]], o, true)} className="acc-fill" style={{ opacity: 0.45 }} />
        <path d={path3([[5, W - 5, BASE], [L - 5, W - 5, BASE], [L - 5, W - 5, NECK], [5, W - 5, NECK]], o, true)} className="ln" />
        <path d={path3([[L - 5, 5, BASE], [L - 5, W - 5, BASE], [L - 5, W - 5, NECK], [L - 5, 5, NECK]], o, true)} className="acc-fill" style={{ opacity: 0.65 }} />
        <path d={path3([[L - 5, 5, BASE], [L - 5, W - 5, BASE], [L - 5, W - 5, NECK], [L - 5, 5, NECK]], o, true)} className="ln" />
      </g>
      <OpenTop o={o} at={[5, 5, 0]} size={[L - 10, W - 10, NECK]} wall={4} />
      <path d={path3([[0, W, 0], [L, W, 0], [L, W, BASE], [0, W, BASE]], o, true)} className="f2 ln" />
      <path d={path3([[L, 0, 0], [L, W, 0], [L, W, BASE], [L, 0, BASE]], o, true)} className="f3 ln" />
      <IsoBox o={o} at={[-2, -2, LID]} size={[L + 4, W + 4, 40]} />
      <Callout from={project([L - 5, W / 2, (BASE + NECK) / 2], o)} to={[466, 200]} label="Contrast neck" align="end" />
      <SpecText items={["Shoulder neck", "Three-piece", "3.0 mm board"]} y={350} />
    </Illo>
  );
}

/** Rigid tube with lid lifted off an inner neck. */
export function TubeBox({ className }: IllustrationProps) {
  const o: Origin = { x: 240, y: 290 };
  const r = 70;
  const body = cylinder3([0, 0, 0], r, 130, o);
  const neck = cylinder3([0, 0, 120], r - 4, 32, o);
  const lid = cylinder3([0, 0, 165], r + 3, 40, o);
  const band = (z: number) =>
    path3(arc3([0, 0, z], [1, 0, 0], [0, 1, 0], r, -Math.PI / 4, (3 * Math.PI) / 4, 24), o);
  return (
    <Illo className={className}>
      <path d={body.body} className="f2 ln" />
      <path d={band(40)} className="ln-thin acc" />
      <path d={band(86)} className="ln-thin acc" />
      <path d={neck.body} className="acc-fill" style={{ opacity: 0.5 }} />
      <path d={neck.body} className="ln" />
      <path d={neck.top} className="f3 ln" />
      <path d={lid.body} className="f2 ln" />
      <path d={lid.top} className="f1 ln" />
      <Callout from={project([0, r, 63], o)} to={[96, 240]} label="Printed wrap" align="end" />
      <Callout from={project([r - 4, 0, 140], o)} to={[462, 150]} label="Inner neck" align="end" />
      <SpecText items={["Rigid tube", "Wound board", "Lid over neck"]} y={352} />
    </Illo>
  );
}

/** Window box: die-cut window in the lid with PET film. */
export function WindowBox({ className }: IllustrationProps) {
  const o: Origin = { x: 228, y: 130 };
  const L = 210;
  const W = 140;
  const H = 70;
  const win = roundedRect3(L / 2, W / 2, H, 120, 72, 14);
  const glare = (k: number) => path3([[L / 2 - 30 + k, W / 2 - 22, H], [L / 2 - 10 + k, W / 2 + 18, H]], o);
  return (
    <Illo className={className}>
      <IsoBox o={o} size={[L, W, H]} />
      <path d={path3(win, o, true)} className="f3 ln" />
      <path d={glare(0)} className="ln-thin" />
      <path d={glare(14)} className="ln-thin" />
      <Callout from={project([L / 2 + 40, W / 2, H], o)} to={[466, 70]} label="PET window" align="end" />
      <SpecText items={["Window box", "Die-cut lid", "Clear film"]} y={350} />
    </Illo>
  );
}
