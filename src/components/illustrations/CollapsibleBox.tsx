import { path3, project, type Origin, type Vec3 } from "./iso";
import { Callout, Illo, IsoBox, Shadow, Line3, SpecText, type IllustrationProps } from "./primitives";
import { MagneticBoxClosed } from "./MagneticBox";

const o: Origin = { x: 225, y: 150 };
const L = 220;
const W = 150;
const T = 9; // packed depth of one unit
const GAP = 3;
const UNITS = 3;
const WALL = 38; // wall height folded onto the base

/** Collapsible rigid boxes packed flat, three units stacked. */
export function CollapsibleBoxFlat({ className }: IllustrationProps) {
  const zTop = UNITS * T + (UNITS - 1) * GAP;
  const inner: Vec3[] = [
    [WALL, WALL, zTop],
    [L - WALL, WALL, zTop],
    [L - WALL, W - WALL, zTop],
    [WALL, W - WALL, zTop],
  ];
  const corners: Vec3[] = [
    [0, 0, zTop],
    [L, 0, zTop],
    [L, W, zTop],
    [0, W, zTop],
  ];
  const [sx, sy] = project([L, W, zTop / 2], o);
  return (
    <Illo className={className}>
      <Shadow o={o} size={[L, W]} />
      {Array.from({ length: UNITS }, (_, i) => (
        <IsoBox key={i} o={o} at={[0, 0, i * (T + GAP)]} size={[L, W, T]} />
      ))}
      {/* Walls folded in: fold line where each wall meets the base, mitred seams at the corners. */}
      <path d={path3(inner, o, true)} className="fold" />
      {corners.map((c, i) => (
        <Line3 key={i} o={o} a={c} b={inner[i]!} className="ln-thin" />
      ))}
      <Line3 o={o} a={[L / 2 - 20, W, zTop - T / 2]} b={[L / 2 + 20, W, zTop - T / 2]} className="ln acc" />
      <Callout from={[sx, sy]} to={[322, 348]} label="Ships flat" align="start" />
      <SpecText items={["Collapsible rigid", "Flat-packed", `${UNITS} units`]} y={30} />
    </Illo>
  );
}

/** Collapsible rigid box, assembled. Same lid as the magnetic style, hinged walls. */
export function CollapsibleBoxAssembled({ className }: IllustrationProps) {
  return <MagneticBoxClosed className={className} collapsible />;
}
