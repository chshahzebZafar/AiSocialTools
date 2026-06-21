/**
 * Snapchat username styles + validity, layered on the generic username engine.
 *
 * Snapchat rules enforced by `isValidSnap`:
 *  - 3–15 characters, must start with a letter
 *  - letters, numbers, and . _ - only
 *  - cannot end with a symbol, never two symbols in a row
 *
 * Each style supplies a (now much larger) word bank; the engine in
 * `username-engine.ts` then combines, mutates, and validates so a single click
 * yields hundreds of valid handles instead of a fixed dozen.
 */

import { buildUsernamePool, sampleBatch, type UsernameStyle } from "./username-engine";

export type { UsernameStyle };

export const snapSanitize = (s: string): string =>
  s.toLowerCase().replace(/[^a-z0-9._-]/g, "");

export const isValidSnap = (u: string): boolean =>
  /^[a-z][a-z0-9._-]{1,13}[a-z0-9]$/.test(u) &&
  u.length >= 3 &&
  u.length <= 15 &&
  !/[._-]{2,}/.test(u);

// Affixes every style draws on, on top of its own themed words.
const COMMON_PREFIXES = ["its", "iam", "the", "real", "official", "hey", "just", "mr", "ms", "lil", "yo", "im", "this", "thatone", "your"];
const COMMON_SUFFIXES = ["official", "real", "here", "now", "world", "daily", "vibes", "life", "era", "club", "gram", "hub", "zone", "wave", "energy"];
const COMMON_NUMBERS = ["01", "07", "08", "10", "11", "13", "17", "21", "22", "23", "24", "27", "99", "00", "000", "x", "xo", "yt"];

function style(prefixes: string[], suffixes: string[], numbers: string[] = []): UsernameStyle {
  return {
    prefixes: Array.from(new Set([...prefixes, ...COMMON_PREFIXES])),
    suffixes: Array.from(new Set([...suffixes, ...COMMON_SUFFIXES])),
    numbers: Array.from(new Set([...numbers, ...COMMON_NUMBERS])),
  };
}

export const SNAP_STYLES: Record<string, UsernameStyle> = {
  general: style(
    ["snap", "team", "house", "the"],
    ["snap", "snaps", "sc", "yt", "tv", "studio", "central", "diary", "story", "main", "core", "habit", "haven"],
    ["07x", "2k", "360"]
  ),
  funny: style(
    ["sir", "lord", "captain", "notyour", "average", "professor", "doctor", "agent", "uncle", "auntie"],
    ["lol", "memes", "clown", "chaos", "snackz", "haha", "ohno", "weirdo", "goofy", "nonsense", "fr", "lowkey", "menace", "gremlin", "potato", "soup", "vibecheck", "sus", "drama", "snorlax"],
    ["420", "69", "247", "123"]
  ),
  cool: style(
    ["dark", "neo", "von", "saint", "after"],
    ["ace", "rogue", "wolf", "shadow", "rebel", "storm", "blaze", "vortex", "onyx", "frost", "venom", "ghost", "raven", "phantom", "echo", "noir", "ember", "drift", "apex", "cipher", "nova", "zenith"],
    ["360", "777", "808", "00x"]
  ),
  aesthetic: style(
    ["soft", "luna", "hazy", "dreamy", "velvet", "ethereal", "lil", "pastel"],
    ["moon", "petal", "bloom", "soft", "dewy", "haze", "cloud", "honey", "aura", "glow", "muse", "willow", "fawn", "lush", "peony", "frost", "linen", "marble", "satin", "amber", "dusk", "ivory"],
    ["11", "22", "33", "444"]
  ),
  gaming: style(
    ["pro", "og", "ttv", "yt", "iron", "toxic", "shadow"],
    ["gg", "pro", "sniper", "fragz", "clutch", "rage", "boss", "ttv", "yt", "noscope", "ace", "respawn", "headshot", "meta", "tryhard", "smurf", "gamer", "loot", "raid", "combo", "godmode", "kills"],
    ["360", "420", "1v1", "ttv", "247", "1337"]
  ),
  girl: style(
    ["miss", "lady", "queenie", "lil"],
    ["girly", "queen", "babe", "diva", "rose", "angel", "barbie", "princess", "bloom", "honey", "darling", "muse", "sweetie", "cherie", "dolly", "fairy", "glow", "gem", "petal", "luxe", "bae"],
    ["xo", "11", "22", "07"]
  ),
  boy: style(
    ["young", "og", "big", "lil", "king"],
    ["king", "boss", "og", "savage", "beast", "ace", "guy", "wolf", "blaze", "rogue", "legend", "champ", "titan", "maverick", "hawk", "viper", "rider", "blaze", "stone", "knight", "bolt"],
    ["07", "23", "99", "808"]
  ),
  business: style(
    ["official", "team", "shop", "get", "go", "try"],
    ["official", "shop", "co", "studio", "hq", "store", "brand", "agency", "team", "media", "labs", "world", "group", "works", "collective", "supply", "house", "digital", "global", "ventures"],
    ["360", "24", "247", "hq", "co"]
  ),
};

/** Build a large validated pool for a style (use with sampleBatch for "Load more"). */
export function buildSnapPool(
  base: string,
  niche: string,
  styleKey: keyof typeof SNAP_STYLES,
  extraWords: string[] = []
): string[] {
  return buildUsernamePool({
    base,
    niche,
    style: SNAP_STYLES[styleKey] ?? SNAP_STYLES.general,
    extraWords,
    sanitize: snapSanitize,
    validate: isValidSnap,
  });
}

/** Convenience: build a pool and return one shuffled batch (backward-compatible). */
export function generateSnapUsernames(
  base: string,
  niche: string,
  styleKeyOrStyle: keyof typeof SNAP_STYLES | UsernameStyle,
  count = 30
): string[] {
  const styleKey =
    typeof styleKeyOrStyle === "string" ? styleKeyOrStyle : "general";
  const pool =
    typeof styleKeyOrStyle === "string"
      ? buildSnapPool(base, niche, styleKey)
      : buildUsernamePool({
          base,
          niche,
          style: styleKeyOrStyle,
          sanitize: snapSanitize,
          validate: isValidSnap,
        });
  return sampleBatch(pool, count, new Set());
}
