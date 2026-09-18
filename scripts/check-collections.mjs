/**
 * Verifies every collection pick points at a real, approved directory entry.
 *
 * Collections are hand-written, so a pick can silently rot when an entry is
 * renamed or removed during a cleanup pass (as happened when 143 listings were
 * pulled). The page drops missing picks at render, which fails quietly - this
 * fails loudly instead.
 *
 * Deliberately string-based rather than importing the TS: it runs without a
 * build step, in a prepush hook or by hand.
 *
 *   node scripts/check-collections.mjs
 */
import { readFile } from "node:fs/promises";

const MARK = 'slug: "';

function slugsIn(text) {
  const out = [];
  let i = text.indexOf(MARK);
  while (i !== -1) {
    const start = i + MARK.length;
    const end = text.indexOf('"', start);
    if (end === -1) break;
    out.push({ slug: text.slice(start, end), at: start });
    i = text.indexOf(MARK, end);
  }
  return out;
}

const directory = await readFile("lib/ai-directory.ts", "utf8");
const collections = await readFile("lib/directory-collections.ts", "utf8");

// Every slug the directory knows about, and whether it is published.
const known = new Map();
for (const { slug, at } of slugsIn(directory)) {
  // approved lives a few lines below slug inside the same entry object.
  const window = directory.slice(at, at + 2000);
  known.set(slug, !window.includes("approved: false"));
}

// A pick is a one-line object: { slug: "x", why: "..." }. Collection headers
// have a slug too, but no why on the same line.
const picks = [];
for (const line of collections.split("\n")) {
  if (line.includes(MARK) && line.includes("why:")) {
    const start = line.indexOf(MARK) + MARK.length;
    picks.push(line.slice(start, line.indexOf('"', start)));
  }
}

const missing = picks.filter((s) => !known.has(s));
const unapproved = picks.filter((s) => known.has(s) && !known.get(s));

console.log(`Checked ${picks.length} picks across collections.`);
if (missing.length) console.error("MISSING from directory: " + missing.join(", "));
if (unapproved.length) console.error("NOT APPROVED: " + unapproved.join(", "));

if (missing.length || unapproved.length) process.exit(1);
console.log("All picks resolve to approved entries.");
