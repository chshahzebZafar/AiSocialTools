/**
 * Thin client for the free, keyless Datamuse API (https://www.datamuse.com/api/).
 * CORS-enabled, so it runs straight from the browser with no backend.
 *
 * Used to widen generator output with real related/synonym words. Every call
 * fails *soft*: on network error, rate-limit, or offline it returns [] and the
 * caller falls back to its bundled word banks — the tool never breaks.
 */

const BASE = "https://api.datamuse.com/words";

async function fetchWords(query: string): Promise<string[]> {
  try {
    const res = await fetch(`${BASE}?${query}`, { cache: "force-cache" });
    if (!res.ok) return [];
    const data: { word: string }[] = await res.json();
    return data.map((d) => d.word).filter(Boolean);
  } catch {
    return [];
  }
}

/**
 * Single-token alphabetic words related to `seed` — ideal for usernames.
 * mode: "ml" = means-like (default), "syn" = synonyms, "trg" = topically associated.
 */
export async function relatedWords(
  seed: string,
  opts: { max?: number; mode?: "ml" | "syn" | "trg" } = {}
): Promise<string[]> {
  const s = seed.trim();
  if (!s) return [];
  const param = opts.mode === "trg" ? "rel_trg" : opts.mode === "syn" ? "rel_syn" : "ml";
  const words = await fetchWords(`${param}=${encodeURIComponent(s)}&max=${opts.max ?? 30}`);
  // Usernames need single-token, alphabetic words.
  return words.filter((w) => /^[a-zA-Z]+$/.test(w)).map((w) => w.toLowerCase());
}

/**
 * Topically associated words for `seed` (may be multi-word) — ideal for hashtags.
 * Returns lowercased words; multi-word entries are kept (caller can camelCase them).
 */
export async function topicWords(seed: string, max = 40): Promise<string[]> {
  const s = seed.trim();
  if (!s) return [];
  const words = await fetchWords(`rel_trg=${encodeURIComponent(s)}&max=${max}`);
  return words.map((w) => w.toLowerCase());
}
