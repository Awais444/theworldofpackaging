import type { IllustrationProps } from "./primitives";

/*
 * Filled close-ups of two finishes, used until real macro photos exist (media slots finish-embossing and
 * finish-spot-uv). Brand colours only; the Media panel behind them is blue-50. Decorative: the slot has alt text.
 */

/** Embossing: a raised logo on a white box lid, lit from the top left (light edge up, shadow edge down). */
export function EmbossCloseUp({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 480 360" className={`h-full w-full ${className ?? ""}`} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="emb-lid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--white)" />
          <stop offset="1" stopColor="var(--silver-100)" />
        </linearGradient>
        <filter id="emb-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="var(--blue-900)" floodOpacity="0.16" />
        </filter>
      </defs>
      {/* Lid */}
      <rect x="70" y="50" width="340" height="260" rx="18" fill="url(#emb-lid)" filter="url(#emb-soft)" />
      {/* Raised ring: highlight up-left, shadow down-right */}
      <circle cx="240" cy="180" r="74" fill="none" stroke="var(--silver-300)" strokeWidth="10" transform="translate(4 5)" />
      <circle cx="240" cy="180" r="74" fill="none" stroke="var(--white)" strokeWidth="10" transform="translate(-3 -3)" />
      <circle cx="240" cy="180" r="74" fill="none" stroke="var(--silver-50)" strokeWidth="8" />
      {/* Raised "W" mark */}
      <path d="M196 150 L216 214 L240 172 L264 214 L284 150" fill="none" stroke="var(--silver-300)" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" transform="translate(4 5)" />
      <path d="M196 150 L216 214 L240 172 L264 214 L284 150" fill="none" stroke="var(--white)" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" transform="translate(-3 -3)" />
      <path d="M196 150 L216 214 L240 172 L264 214 L284 150" fill="none" stroke="var(--silver-50)" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
      {/* Orange tab on the lid edge */}
      <rect x="226" y="300" width="28" height="18" rx="4" fill="var(--orange-500)" />
    </svg>
  );
}

/** Spot UV: gloss pattern on a matte Klein Blue carton; the gloss areas carry a light sheen. */
export function SpotUvCloseUp({ className }: IllustrationProps) {
  const dots = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) dots.push({ x: 128 + c * 56 + (r % 2) * 28, y: 108 + r * 50 });
  return (
    <svg viewBox="0 0 480 360" className={`h-full w-full ${className ?? ""}`} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="uv-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--white)" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="var(--white)" stopOpacity="0.08" />
          <stop offset="1" stopColor="var(--white)" stopOpacity="0.3" />
        </linearGradient>
        <filter id="uv-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="var(--ink-900)" floodOpacity="0.2" />
        </filter>
        <clipPath id="uv-face">
          <rect x="80" y="60" width="320" height="240" rx="18" />
        </clipPath>
      </defs>
      {/* Matte carton face */}
      <rect x="80" y="60" width="320" height="240" rx="18" fill="var(--blue-900)" filter="url(#uv-soft)" />
      <g clipPath="url(#uv-face)">
        {/* Gloss (spot UV) dots: same colour, lifted by a sheen */}
        {dots.map((d) => (
          <g key={`${d.x}-${d.y}`}>
            <circle cx={d.x} cy={d.y} r="16" fill="var(--blue-600)" />
            <circle cx={d.x} cy={d.y} r="16" fill="url(#uv-sheen)" />
          </g>
        ))}
        {/* Light streak across the gloss */}
        <path d="M40 300 L300 20 L340 20 L80 300 Z" fill="var(--white)" opacity="0.09" />
      </g>
      {/* Orange accent stripe */}
      <rect x="80" y="276" width="320" height="10" fill="var(--orange-500)" clipPath="url(#uv-face)" />
    </svg>
  );
}
