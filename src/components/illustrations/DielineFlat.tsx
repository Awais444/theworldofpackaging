import { Illo, type IllustrationProps } from "./primitives";

// Reverse tuck end carton, flat. Panels: glue 18 | front 90 | side 50 | back 90 | side 50.
// Body runs y 114–234; top lid + tuck on the back panel, bottom lid + tuck on the front.
export const DIELINE_CUT =
  "M108 114H198L199 86L207 79H242L248 104V64L250 56Q252 50 260 50H326Q334 50 336 56L338 64V104L344 79H379L387 86L388 114" +
  "V234L387 262L379 269H344L338 244V234H248V244L242 269H207L199 262L198 234" +
  "V284L196 292Q194 298 186 298H120Q112 298 110 292L108 284V234L90 226V122Z";

export const DIELINE_FOLDS = [
  "M108 114V234",
  "M198 114V234",
  "M248 114V234",
  "M338 114V234",
  "M248 114H338",
  "M198 114H248",
  "M338 114H388",
  "M248 64H338",
  "M108 234H198",
  "M198 234H248",
  "M338 234H388",
  "M108 284H198",
];

/** Flat dieline: solid = cut, dashed = fold. */
export function DielineFlat({ className }: IllustrationProps) {
  return (
    <Illo className={className}>
      <path d={DIELINE_CUT} className="f1" />
      {DIELINE_FOLDS.map((d) => (
        <path key={d} d={d} className="fold" />
      ))}
      <path d={DIELINE_CUT} className="ln" />
    </Illo>
  );
}
