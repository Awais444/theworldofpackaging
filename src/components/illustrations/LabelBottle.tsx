import { arc3, cylinder3, path3, project, type Origin } from "./iso";
import { Callout, Illo, SpecText, type IllustrationProps } from "./primitives";

/** Bottle with a wrap-around label, for label design. */
export function LabelBottle({ className }: IllustrationProps) {
  const o: Origin = { x: 240, y: 300 };
  const r = 58;
  const body = cylinder3([0, 0, 0], r, 160, o);
  const neck = cylinder3([0, 0, 160], 20, 46, o);
  const cap = cylinder3([0, 0, 200], 24, 28, o);
  const front = (z: number, rr = r) => arc3([0, 0, z], [1, 0, 0], [0, 1, 0], rr, -Math.PI / 4, (3 * Math.PI) / 4, 24);
  const label = path3([...front(124), ...front(36).reverse()], o, true);
  const line = (z: number) => path3(arc3([0, 0, z], [1, 0, 0], [0, 1, 0], r, Math.PI / 8, Math.PI / 2 + Math.PI / 8, 12), o);
  return (
    <Illo className={className}>
      <path d={body.body} className="f2 ln" />
      <path d={body.top} className="f1 ln" />
      <path d={label} className="f1 ln" />
      <path d={line(98)} className="ln acc" />
      <path d={line(70)} className="ln-thin" />
      <path d={line(60)} className="ln-thin" />
      <path d={neck.body} className="f2 ln" />
      <path d={cap.body} className="f3 ln" />
      <path d={cap.top} className="f2 ln" />
      <Callout from={project([0, r, 80], o)} to={[96, 120]} label="Wrap label" align="end" />
      <Callout from={project([r, 0, 124], o)} to={[462, 150]} label="Label edge" align="end" />
      <SpecText items={["Label", "Wrap-around", "Gloss stock"]} y={352} />
    </Illo>
  );
}
