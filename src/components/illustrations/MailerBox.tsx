import { arc3, path3, project, type Origin } from "./iso";
import { Dim3, Illo, IsoBox, Shadow, Line3, SpecText, type IllustrationProps } from "./primitives";

const o: Origin = { x: 232, y: 128 };
const L = 200;
const W = 140;
const H = 70;

/** Roll-end tuck-front mailer, closed, with dimension lines. */
export function MailerBox({ className }: IllustrationProps) {
  const notch = arc3([L / 2, W, H], [1, 0, 0], [0, 0, -1], 12, 0, Math.PI, 16);
  const logo = arc3([L / 2 + 10, W / 2, H], [1, 0, 0], [0, 1, 0], 24, 0, Math.PI * 2, 40);
  return (
    <Illo className={className}>
      <Shadow o={o} size={[L, W]} />
      <IsoBox o={o} size={[L, W, H]} />
      {/* Lid hinge crease and rolled double wall on the side. */}
      <Line3 o={o} a={[0, 12, H]} b={[L, 12, H]} className="fold" />
      <Line3 o={o} a={[L, 0, H - 7]} b={[L, W, H - 7]} className="ln-thin" />
      <Line3 o={o} a={[0, W, H - 7]} b={[L / 2 - 12, W, H - 7]} className="ln-thin" />
      <Line3 o={o} a={[L / 2 + 12, W, H - 7]} b={[L, W, H - 7]} className="ln-thin" />
      {/* Thumb notch. */}
      <path d={path3(notch, o, true)} className="f3 ln" />
      {/* Printed logo area on the lid. */}
      <path d={path3(logo, o, true)} className="ln acc" />
      <text x={project([L / 2 + 10, W / 2, H], o)[0]} y={project([L / 2 + 10, W / 2, H], o)[1] + 3} textAnchor="middle" className="lbl">
        Logo
      </text>
      <Dim3 o={o} a={[0, W, 0]} b={[L, W, 0]} offset={[0, 26, 0]} label="300 mm" labelDx={-14} labelDy={18} />
      <Dim3 o={o} a={[L, 0, 0]} b={[L, W, 0]} offset={[26, 0, 0]} label="220 mm" labelDx={18} labelDy={16} />
      <Dim3 o={o} a={[0, W, 0]} b={[0, W, H]} offset={[0, 26, 0]} label="80 mm" labelDx={-10} labelDy={4} anchor="end" />
      <SpecText items={["Mailer", "E-flute", "300 × 220 × 80 mm"]} />
    </Illo>
  );
}
