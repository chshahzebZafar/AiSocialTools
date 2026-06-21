/**
 * Generic, platform-agnostic username generation engine.
 *
 * The old approach was `base + smallSuffixArray` → ~16 repetitive results.
 * This engine STACKS many independent strategies (base mutations × affixes ×
 * separators × numbers × extra/related words) so even a modest word bank
 * explodes into hundreds–thousands of unique, *validated* candidates. The
 * caller supplies `sanitize` + `validate` so each platform keeps its own rules.
 *
 * Pair `buildUsernamePool` (build once) with `sampleBatch` (paginate / "Load
 * more" without repeats) for an effectively endless feel.
 */

export interface UsernameStyle {
  prefixes: string[];
  suffixes: string[];
  numbers: string[];
}

const SEPS = ["", "_", ".", "-"];

const LEET: Record<string, string> = { a: "4", e: "3", i: "1", o: "0", s: "5", t: "7" };
const LEETABLE = /[aeiost]/;

/** Leet the LAST eligible character (keeps the first char a letter for platforms that require it). */
function leetTail(s: string): string {
  for (let i = s.length - 1; i > 0; i--) {
    if (LEET[s[i]]) return s.slice(0, i) + LEET[s[i]] + s.slice(i + 1);
  }
  return s;
}

/** Leet every eligible char except the first. */
function leetAllButFirst(s: string): string {
  if (s.length < 2) return s;
  return s[0] + s.slice(1).replace(/[aeiost]/g, (c) => LEET[c] || c);
}

function vowelDrop(s: string): string {
  const r = s.replace(/[aeiou]/g, "");
  return r.length >= 2 ? r : s;
}

/** Distinct mutations of the base keyword that feed the combinatorial step. */
export function baseVariants(base: string): string[] {
  const v = new Set<string>([base]);
  if (base.length >= 2) v.add(base + base.slice(-1)); // doubled last letter
  v.add(vowelDrop(base));
  if (LEETABLE.test(base.slice(1))) {
    v.add(leetTail(base));
    v.add(leetAllButFirst(base));
  }
  if (base.length >= 3) v.add(base.split("").reverse().join(""));
  return Array.from(v).filter(Boolean);
}

export interface BuildOpts {
  base: string;
  niche?: string;
  style: UsernameStyle;
  /** Related/synonym words (e.g. from Datamuse) to widen the pool. */
  extraWords?: string[];
  sanitize: (s: string) => string;
  validate: (s: string) => boolean;
  /** Safety cap on candidate count (default 4000). */
  max?: number;
}

export function buildUsernamePool(o: BuildOpts): string[] {
  const base = o.sanitize(o.base);
  if (!base) return [];
  const niche = o.niche ? o.sanitize(o.niche) : "";
  const extra = Array.from(
    new Set((o.extraWords || []).map(o.sanitize).filter((w) => w && w.length >= 2 && w.length <= 12))
  );
  const suffixes = Array.from(new Set([...o.style.suffixes, ...extra]));
  const prefixes = o.style.prefixes;
  const bases = baseVariants(base);
  const cap = o.max ?? 4000;
  const pool = new Set<string>();
  const add = (s: string) => {
    if (pool.size < cap) pool.add(s);
  };

  for (const bv of bases) {
    add(bv);
    if (niche) {
      add(bv + niche);
      add(niche + bv);
    }
    for (const sep of SEPS) {
      for (const suf of suffixes) add(bv + sep + suf);
      for (const pre of prefixes) add(pre + sep + bv);
      for (const w of extra) {
        add(bv + sep + w);
        add(w + sep + bv);
      }
      if (niche) for (const suf of suffixes) add(bv + sep + niche + sep + suf);
      if (pool.size >= cap) break;
    }
    for (const num of o.style.numbers) {
      if (!num) continue;
      add(bv + num);
      add(bv + "_" + num);
      add(bv + "." + num);
      if (niche) add(bv + niche + num);
    }
    if (pool.size >= cap) break;
  }

  return Array.from(pool).filter(o.validate);
}

/** Pull `count` fresh items from the pool, skipping anything already shown. */
export function sampleBatch(pool: string[], count: number, exclude: Set<string>): string[] {
  const avail = pool.filter((u) => !exclude.has(u));
  for (let i = avail.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [avail[i], avail[j]] = [avail[j], avail[i]];
  }
  return avail.slice(0, count);
}
