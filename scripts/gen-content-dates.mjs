// Last-modified dates for sitemaps, from the last git commit that touched each content/page file.
// Output: src/content/contentDates.json ({ "src/content/rigidStyles.ts": "2026-10-28T…", … }).
// If git history is not available (e.g. a shallow CI clone), the committed file is kept as it is.
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const out = path.resolve("src/content/contentDates.json");
const run = (cmd) => execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();

let commits = 0;
try { commits = Number(run("git rev-list --count HEAD")); } catch { /* no git */ }
if (commits < 2) {
  console.log("contentDates.json: git history not available, keeping the committed file");
  process.exit(0);
}

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const files = [...walk("src/content"), ...walk("src/app")].filter((f) => /\.(ts|tsx|mdx)$/.test(f) && !f.endsWith("contentDates.json"));
const dates = {};
for (const f of files) {
  const rel = f.split(path.sep).join("/");
  try {
    const d = run(`git log -1 --format=%cI -- "${rel}"`);
    if (d) dates[rel] = new Date(d).toISOString();
  } catch { /* untracked */ }
}
fs.writeFileSync(out, JSON.stringify(dates, null, 0) + "\n");
console.log(`contentDates.json: ${Object.keys(dates).length} files`);
