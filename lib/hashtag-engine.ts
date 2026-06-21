/**
 * Hashtag generation engine.
 *
 * Three data layers, mixed into a tiered result so users always get a deep,
 * relevant set instead of ~15 generic tags:
 *   1. Keyword-variation engine — turns any seed into dozens of on-brand tags.
 *   2. Curated niche packs — large bundled lists matched by trigger words
 *      (so "yoga", "skincare", "crossfit" all resolve to the right pack).
 *   3. Datamuse related words (passed in by the caller) — real topical breadth.
 *
 * Tiers map to the 70-20-10 strategy: niche (specific/branded), medium
 * (category), popular (high-volume reach).
 */

export type Tier = "niche" | "medium" | "popular";
export interface Hashtag {
  tag: string; // includes leading '#'
  tier: Tier;
}

const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

// ── Layer 2: curated niche packs ────────────────────────────────────────────
interface Pack {
  match: string[];
  tags: string[];
}

const PACKS: Pack[] = [
  {
    match: ["fitness", "gym", "workout", "exercise", "training", "bodybuilding", "crossfit", "lifting", "wellness", "yoga", "pilates", "running", "marathon", "meditation", "health", "weightloss", "cardio"],
    tags: ["fitness", "gym", "workout", "fitfam", "fitnessmotivation", "gymlife", "training", "bodybuilding", "fitspo", "gymrat", "fitnessjourney", "healthylifestyle", "gains", "cardio", "legday", "personaltrainer", "fitlife", "workoutmotivation", "noexcuses", "fitnessgoals", "gymmotivation", "fitgirl", "fitnessaddict", "homeworkout", "getfit", "strengthtraining"],
  },
  {
    match: ["travel", "vacation", "trip", "tourism", "wanderlust", "backpacking", "holiday", "adventure"],
    tags: ["travel", "wanderlust", "adventure", "explore", "travelgram", "instatravel", "vacation", "travelphotography", "traveltheworld", "travelblogger", "roamtheplanet", "passportready", "travellife", "exploremore", "bucketlist", "wander", "traveladdict", "globetrotter", "traveldiaries", "neverstopexploring", "traveling", "trip", "holiday", "travelmore", "openmyworld", "letsgosomewhere"],
  },
  {
    match: ["food", "foodie", "cooking", "recipe", "baking", "restaurant", "chef", "cuisine"],
    tags: ["food", "foodie", "foodporn", "instafood", "yummy", "delicious", "foodstagram", "foodphotography", "homemade", "cooking", "foodlover", "tasty", "foodblogger", "eat", "recipe", "dinner", "healthyfood", "foodgasm", "instagood", "chef", "baking", "feedfeed", "buzzfeedfood", "eeeeeats", "foodies", "comfortfood"],
  },
  {
    match: ["fashion", "style", "outfit", "clothing", "streetwear", "ootd", "apparel"],
    tags: ["fashion", "style", "ootd", "fashionista", "outfit", "fashionblogger", "streetstyle", "styleinspo", "fashionstyle", "outfitoftheday", "lookbook", "fashiongram", "instafashion", "fashionable", "trendy", "styleblogger", "fashionweek", "wiwt", "currentlywearing", "fashioninspo", "stylish", "outfitinspo", "fashiondaily", "fashionaddict", "menswear", "womensfashion"],
  },
  {
    match: ["beauty", "makeup", "skincare", "cosmetics", "mua", "glam", "hair"],
    tags: ["beauty", "makeup", "skincare", "mua", "makeupartist", "glam", "beautyblogger", "makeuplover", "instamakeup", "cosmetics", "makeupaddict", "beautytips", "skincareroutine", "glowup", "makeupoftheday", "beautygram", "makeuptutorial", "naturalbeauty", "selfcare", "beautyful", "makeupjunkie", "flawless", "beautycommunity", "skincarecommunity", "glowingskin", "beautyaddict"],
  },
  {
    match: ["business", "entrepreneur", "startup", "marketing", "ecommerce", "smallbusiness", "branding", "sales"],
    tags: ["business", "entrepreneur", "startup", "success", "motivation", "entrepreneurship", "smallbusiness", "marketing", "businessowner", "hustle", "branding", "digitalmarketing", "entrepreneurlife", "bossbabe", "ecommerce", "businesstips", "leadership", "growth", "sidehustle", "moneymindset", "successmindset", "businessgrowth", "startuplife", "girlboss", "workhard", "businessmindset"],
  },
  {
    match: ["tech", "technology", "coding", "programming", "developer", "software", "ai", "gadgets"],
    tags: ["technology", "tech", "coding", "programming", "developer", "software", "ai", "innovation", "techie", "code", "programmer", "javascript", "python", "webdeveloper", "machinelearning", "coderlife", "techgadgets", "computerscience", "techworld", "gadgets", "artificialintelligence", "datascience", "100daysofcode", "devlife", "technews", "futuretech"],
  },
  {
    match: ["art", "artist", "drawing", "painting", "illustration", "sketch", "digitalart", "design"],
    tags: ["art", "artist", "artwork", "drawing", "painting", "illustration", "sketch", "digitalart", "creative", "artoftheday", "instaart", "artistsoninstagram", "design", "contemporaryart", "drawingoftheday", "artgallery", "fineart", "artlovers", "sketchbook", "artwork", "artistic", "modernart", "artists", "draw", "paint", "artislife"],
  },
  {
    match: ["photography", "photo", "photographer", "camera", "portrait", "landscape"],
    tags: ["photography", "photo", "photooftheday", "photographer", "picoftheday", "instagood", "photoshoot", "portrait", "naturephotography", "photographylovers", "canon", "nikon", "landscapephotography", "streetphotography", "photgraphyeveryday", "capture", "moment", "snapshot", "shutterbug", "lensculture", "portraitphotography", "exposure", "composition", "photographysouls", "ig_photo", "thruthelens"],
  },
  {
    match: ["music", "musician", "song", "singer", "rap", "producer", "guitar", "band"],
    tags: ["music", "musician", "song", "singer", "newmusic", "musiclife", "rap", "producer", "guitar", "band", "livemusic", "songwriter", "musicproducer", "hiphop", "instamusic", "musicislife", "artist", "studio", "musicvideo", "spotify", "vocals", "beats", "musiclover", "soundcloud", "musicians", "originalmusic"],
  },
  {
    match: ["gaming", "gamer", "videogames", "esports", "streamer", "twitch", "ps5", "xbox"],
    tags: ["gaming", "gamer", "videogames", "games", "gamersofinstagram", "esports", "streamer", "twitch", "ps5", "xbox", "pcgaming", "gamingcommunity", "gamerlife", "playstation", "nintendo", "gameplay", "gaminglife", "instagaming", "videogame", "gamergirl", "letsplay", "gamingsetup", "onlinegaming", "gamingmemes", "progamer", "gamerguy"],
  },
  {
    match: ["pets", "dog", "cat", "puppy", "kitten", "animals", "petlover", "doglover"],
    tags: ["pets", "dog", "cat", "puppy", "petsofinstagram", "dogsofinstagram", "catsofinstagram", "petstagram", "doglover", "instapet", "petlover", "cute", "animals", "puppylove", "catlover", "doglife", "adoptdontshop", "petlife", "ilovemydog", "furbaby", "dogstagram", "kitten", "petsagram", "rescuedog", "doggo", "meow"],
  },
  {
    match: ["nature", "outdoors", "hiking", "mountains", "camping", "wildlife", "forest", "sunset"],
    tags: ["nature", "naturephotography", "naturelovers", "outdoors", "hiking", "mountains", "camping", "wildlife", "landscape", "sunset", "naturelover", "earth", "explore", "wilderness", "getoutside", "optoutside", "naturegram", "scenery", "adventure", "trees", "forest", "mothernature", "naturephoto", "beautifuldestinations", "wildernessculture", "outdoorlife"],
  },
  {
    match: ["motivation", "inspiration", "quotes", "mindset", "selfimprovement", "success", "positivity"],
    tags: ["motivation", "inspiration", "quotes", "mindset", "motivationalquotes", "success", "positivevibes", "selfimprovement", "inspirationalquotes", "goals", "hustle", "believe", "positivity", "mindsetiseverything", "quoteoftheday", "selflove", "growth", "dreambig", "neverGiveUp", "motivationmonday", "successquotes", "lifequotes", "personaldevelopment", "manifestation", "growthmindset", "inspire"],
  },
  {
    match: ["wedding", "bride", "engagement", "weddingplanner", "bridal", "marriage"],
    tags: ["wedding", "bride", "weddingday", "weddingphotography", "engagement", "weddinginspiration", "bridal", "weddingplanner", "weddingdress", "groom", "weddingideas", "love", "weddingseason", "justmarried", "weddingphotographer", "bridetobe", "weddinginspo", "weddingplanning", "destinationwedding", "weddingstyle", "marriage", "ido", "weddings", "realwedding", "bridalstyle", "weddinggoals"],
  },
  {
    match: ["realestate", "property", "home", "house", "realtor", "interior", "decor"],
    tags: ["realestate", "realtor", "property", "home", "househunting", "forsale", "newhome", "dreamhome", "realestateagent", "interiordesign", "homedecor", "luxuryrealestate", "investment", "realtorlife", "homesweethome", "homesforsale", "house", "realestateinvesting", "propertymanagement", "homedesign", "milliondollarlisting", "homebuyers", "decor", "architecture", "realestatelife", "justlisted"],
  },
  {
    match: ["parenting", "mom", "dad", "baby", "kids", "family", "momlife", "toddler"],
    tags: ["parenting", "mom", "momlife", "dad", "baby", "kids", "family", "motherhood", "parents", "toddler", "parenthood", "instamom", "momsofinstagram", "babiesofinstagram", "familytime", "kidsofinstagram", "newborn", "parentingtips", "raisingkids", "momblogger", "dadlife", "parentlife", "familygoals", "babylove", "gentleparenting", "mumlife"],
  },
  {
    match: ["coffee", "cafe", "espresso", "barista", "latte", "caffeine"],
    tags: ["coffee", "coffeelover", "coffeetime", "cafe", "espresso", "barista", "coffeeaddict", "coffeegram", "latte", "coffeeshop", "caffeine", "coffeholic", "butfirstcoffee", "coffeelife", "specialtycoffee", "coffeebreak", "morningcoffee", "instacoffee", "latteart", "coffeeculture", "coffeelovers", "coffeeoftheday", "coffeeholic", "icedcoffee", "coffeedaily", "coffeeart"],
  },
];

const POPULAR = ["love", "instagood", "photooftheday", "instagram", "instadaily", "viral", "trending", "explore", "fyp", "reels", "explorepage", "picoftheday", "bestoftheday", "instamood", "igers", "happy", "follow", "instalike", "trendingnow", "reelsinstagram"];

// ── Layer 1: keyword-variation engine ───────────────────────────────────────
const VARIATION_SUFFIXES = ["", "life", "lover", "lovers", "addict", "community", "daily", "gram", "official", "oftheday", "stagram", "world", "vibes", "tips", "inspo", "goals", "nation", "fam", "love", "style"];
const VARIATION_PREFIXES = ["insta", "the", "my", "best", "love"];

function keywordVariations(seed: string): string[] {
  const k = clean(seed);
  if (!k) return [];
  const out = new Set<string>();
  out.add(k);
  for (const s of VARIATION_SUFFIXES) out.add(k + s);
  for (const p of VARIATION_PREFIXES) out.add(p + k);
  // year + camelCase readability variant
  out.add(k + "2026");
  return Array.from(out).filter((t) => t.length >= 3 && t.length <= 30);
}

// ── Mixer ───────────────────────────────────────────────────────────────────
export interface HashtagPool {
  all: Hashtag[];
  byTier: Record<Tier, string[]>; // tags without '#'
}

export function buildHashtagPool(seed: string, related: string[] = []): HashtagPool {
  const k = clean(seed);
  const niche = new Set<string>();
  const medium = new Set<string>();
  const popular = new Set<string>();

  // Niche tier: keyword variations + related-word combos (specific, low volume)
  for (const v of keywordVariations(seed)) niche.add(v);
  const rel = Array.from(new Set(related.map(clean).filter((w) => w.length >= 3 && w.length <= 18)));
  for (const w of rel) {
    niche.add(w);
    if (k && (k.length + w.length) <= 24) niche.add(k + w);
  }

  // Medium tier: matched niche packs (category volume)
  const matchTerms = [k, ...rel];
  for (const pack of PACKS) {
    const hit = pack.match.some((m) => matchTerms.some((t) => t && (t.includes(m) || m.includes(t))));
    if (hit) pack.tags.forEach((t) => medium.add(t));
  }
  // If nothing matched, seed medium with a couple of broad popular packs' overlap via related only.

  // Popular tier: universal high-volume
  POPULAR.forEach((t) => popular.add(t));

  // De-dupe across tiers (a tag should appear in only its strongest-specificity tier)
  medium.forEach((t) => niche.delete(t));
  popular.forEach((t) => {
    niche.delete(t);
    medium.delete(t);
  });

  const byTier: Record<Tier, string[]> = {
    niche: Array.from(niche),
    medium: Array.from(medium),
    popular: Array.from(popular),
  };
  const all: Hashtag[] = [
    ...byTier.niche.map((tag) => ({ tag: `#${tag}`, tier: "niche" as Tier })),
    ...byTier.medium.map((tag) => ({ tag: `#${tag}`, tier: "medium" as Tier })),
    ...byTier.popular.map((tag) => ({ tag: `#${tag}`, tier: "popular" as Tier })),
  ];
  return { all, byTier };
}

const PLATFORM_LIMIT: Record<string, number> = {
  instagram: 30,
  tiktok: 10,
  linkedin: 5,
  twitter: 3,
};

function pick<T>(arr: T[], n: number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

/** A platform-optimized set following the 70-20-10 niche/medium/popular split. */
export function optimizedSet(pool: HashtagPool, platform: string): string[] {
  const limit = PLATFORM_LIMIT[platform] ?? 30;
  const nNiche = Math.max(1, Math.round(limit * 0.7));
  const nMedium = Math.max(1, Math.round(limit * 0.2));
  const nPop = Math.max(0, limit - nNiche - nMedium);
  const set = [
    ...pick(pool.byTier.niche, nNiche),
    ...pick(pool.byTier.medium, nMedium),
    ...pick(pool.byTier.popular, nPop),
  ];
  // Top up from whatever's left if a tier was short.
  const used = new Set(set);
  if (set.length < limit) {
    for (const h of pool.all) {
      const t = h.tag.slice(1);
      if (!used.has(t)) {
        set.push(t);
        used.add(t);
        if (set.length >= limit) break;
      }
    }
  }
  return set.slice(0, limit).map((t) => `#${t}`);
}

export { PLATFORM_LIMIT };
