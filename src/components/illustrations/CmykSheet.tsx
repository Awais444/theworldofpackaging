import { Illo, SpecText, type IllustrationProps } from "./primitives";

/**
 * A press sheet built from four separations. Each layer carries
 * `data-pass="c|m|y|k"` so a timeline can lay the inks down one at a time.
 * Layers multiply over fixed paper, so the overprints read correctly in any theme.
 */
export function CmykSheet({ className }: IllustrationProps) {
  return (
    <Illo className={className}>
      <rect x="60" y="34" width="360" height="270" fill="var(--paper)" className="ln-thin" />
      <g style={{ mixBlendMode: "multiply" }}>
        <g data-pass="c" fill="var(--cyan)">
          <circle cx="292" cy="150" r="78" />
          <rect x="60" y="246" width="360" height="22" />
        </g>
        <g data-pass="m" fill="var(--magenta)">
          <rect x="112" y="76" width="118" height="150" />
          <rect x="60" y="268" width="360" height="10" />
        </g>
        <g data-pass="y" fill="var(--yellow)">
          <circle cx="210" cy="176" r="66" />
          <rect x="330" y="60" width="62" height="62" />
        </g>
        <g data-pass="k" fill="var(--ink)">
          <text
            x="84"
            y="64"
            style={{ fontFamily: "var(--ff-display), sans-serif", fontWeight: 800, fontSize: 26 }}
          >
            WORDMARK
          </text>
          <rect x="84" y="222" width="180" height="2" />
          <rect x="84" y="230" width="120" height="2" />
          {Array.from({ length: 18 }, (_, i) => (
            <rect key={i} x={340 + i * 3.6} y="206" width={i % 3 === 0 ? 2.2 : 1.1} height="30" />
          ))}
        </g>
      </g>
      {/* Control strip and register marks stay on every pass. */}
      <g>
        {["var(--cyan)", "var(--magenta)", "var(--yellow)", "var(--ink)"].map((c, i) => (
          <rect key={c} x={84 + i * 12} y="288" width="10" height="8" fill={c} />
        ))}
      </g>
      <g className="ln-thin">
        <circle cx="240" cy="20" r="5" />
        <path d="M231 20H249M240 11V29" />
        <circle cx="240" cy="318" r="5" />
        <path d="M231 318H249M240 309V327" />
      </g>
      <SpecText items={["Offset", "Four-colour process", "Registered"]} y={348} />
    </Illo>
  );
}
