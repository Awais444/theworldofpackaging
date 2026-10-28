/**
 * Isometric line illustrations for the process steps: 1.5px ink strokes with one orange accent.
 * Decorative only (aria-hidden); the step text carries the meaning.
 */
type Props = { className?: string };

const ink = { fill: "none", stroke: "var(--ink-900)", strokeWidth: 1.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const accent = { fill: "var(--orange-500)", stroke: "var(--ink-900)", strokeWidth: 1.5, strokeLinejoin: "round" as const };

function Frame({ children, className }: Props & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 240 180" aria-hidden="true" className={className}>
      {children}
    </svg>
  );
}

/** Brief form on a clipboard, with a phone beside it. */
export function BriefLine({ className }: Props) {
  return (
    <Frame className={className}>
      <path {...ink} d="M60 60 L130 30 L190 60 L120 90 Z" />
      <path {...ink} d="M60 60 L60 66 L120 96 L190 66 L190 60" />
      <path {...ink} d="M90 54 L130 37" />
      <path {...ink} d="M98 60 L150 38" />
      <path {...ink} d="M106 66 L158 44" />
      <path {...ink} d="M114 72 L148 58" />
      <path {...accent} d="M138 74 L166 62 L174 66 L146 78 Z" />
      <path {...ink} d="M150 112 L178 100 L206 114 L178 126 Z" />
      <path {...ink} d="M150 112 L150 118 L178 132 L206 120 L206 114" />
      <path {...ink} d="M162 112 L180 104 L194 111 L176 119 Z" />
      <path {...ink} d="M40 130 L80 112" />
      <path {...ink} d="M50 140 L100 118" />
    </Frame>
  );
}

/** Design screen showing a box dieline. */
export function DesignLine({ className }: Props) {
  return (
    <Frame className={className}>
      <path {...ink} d="M50 50 L150 20 L200 45 L100 75 Z" />
      <path {...ink} d="M50 50 L50 115 L100 140 L100 75" />
      <path {...ink} d="M100 140 L200 110 L200 45" />
      <path {...ink} d="M60 60 L60 108 L95 126 L95 80 Z" />
      <path {...ink} d="M105 82 L190 56 L190 104 L105 130 Z" />
      <path {...ink} d="M125 88 L150 80 L150 104 L125 112 Z" />
      <path {...ink} d="M150 80 L172 73 L172 97 L150 104" />
      <path {...ink} d="M125 88 L132 78 L157 70 L150 80" />
      <path {...accent} d="M150 104 L172 97 L168 106 L146 113 Z" />
      <path {...ink} d="M100 140 L100 150 L160 168 L160 158" />
      <path {...ink} d="M130 149 L130 160" />
    </Frame>
  );
}

/** Factory machine with a finished box on the belt. */
export function FactoryLine({ className }: Props) {
  return (
    <Frame className={className}>
      <path {...ink} d="M40 90 L110 55 L170 85 L100 120 Z" />
      <path {...ink} d="M40 90 L40 110 L100 140 L170 105 L170 85" />
      <path {...ink} d="M100 120 L100 140" />
      <path {...ink} d="M70 76 L70 40 L110 20 L140 35 L140 70" />
      <path {...ink} d="M70 40 L100 55 L140 35" />
      <path {...ink} d="M100 55 L100 90" />
      <path {...ink} d="M84 48 L84 60" />
      <path {...ink} d="M150 112 L210 82" />
      <path {...ink} d="M162 120 L222 90" />
      <path {...accent} d="M176 96 L196 86 L212 94 L192 104 Z" />
      <path {...ink} d="M176 96 L176 108 L192 116 L212 106 L212 94" />
      <path {...ink} d="M192 104 L192 116" />
    </Frame>
  );
}

/** Delivery truck in front of a globe. */
export function DeliveryLine({ className }: Props) {
  return (
    <Frame className={className}>
      <circle {...ink} cx="160" cy="62" r="40" />
      <ellipse {...ink} cx="160" cy="62" rx="16" ry="40" />
      <path {...ink} d="M120 62 L200 62" />
      <path {...ink} d="M126 42 C 145 48, 175 48, 194 42" />
      <path {...ink} d="M126 82 C 145 76, 175 76, 194 82" />
      <path {...ink} d="M30 120 L100 85 L150 110 L80 145 Z" />
      <path {...ink} d="M30 120 L30 100 L100 65 L150 90 L150 110" />
      <path {...ink} d="M30 100 L80 125 L150 90" />
      <path {...ink} d="M80 125 L80 145" />
      <path {...accent} d="M150 90 L176 103 L176 123 L150 110 Z" />
      <path {...ink} d="M150 110 L176 123" />
      <circle {...ink} cx="58" cy="138" r="8" />
      <circle {...ink} cx="118" cy="130" r="8" />
      <circle {...ink} cx="160" cy="122" r="7" />
    </Frame>
  );
}

export const processLines = [BriefLine, DesignLine, FactoryLine, DeliveryLine];
