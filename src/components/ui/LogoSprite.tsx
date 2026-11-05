import fs from "node:fs";
import path from "node:path";

/** Symbol id that every <Logo /> references with <use> (Logo.tsx repeats it: client components cannot import this file). */
const LOGO_SYMBOL_ID = "twop-mark";

// The production mark, read from public/brand/logo-mark.svg at build time (pages are static), so the logo on
// the page is exactly that file. Its two paths: [0] blue "W", [1] orange shape.
const file = fs.readFileSync(path.join(process.cwd(), "public/brand/logo-mark.svg"), "utf8");
const viewBox = file.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 689 373";
const paths = [...file.matchAll(/<path [^>]*?d="([^"]+)"/g)].map((m) => m[1]!);

/**
 * The logo mark, inlined once per page as a hidden SVG symbol (rendered in the root layout). Header, footer
 * and mobile menu logos point at it with <use>, so the mark paints with the HTML (no image request) without
 * repeating its 57 KB path data three times. The blue part reads --logo-blue so the footer can make it white.
 */
export function LogoSprite() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
      <symbol id={LOGO_SYMBOL_ID} viewBox={viewBox}>
        <path fill="var(--logo-blue, #011EFD)" fillRule="evenodd" d={paths[0]} />
        <path fill="#FF7001" fillRule="evenodd" d={paths[1]} />
      </symbol>
    </svg>
  );
}
