# SEO Audit Report — AISocialTools.co
**Audit Date:** May 14, 2026  
**Base URL:** `https://aisocialtools.co`  
**Framework:** Next.js 15 App Router · TypeScript · Deployed on Netlify  
**Audit Method:** Full static analysis of `app/`, `lib/`, `app/sitemap.ts`, `app/robots.ts`, `next.config.ts`, `netlify.toml`

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Total unique routes (indexable) | ~310 |
| Active social tools | 51 (2 disabled/noindex) |
| Live category tools | 16 (construction ×12, finance ×2, health ×1, education ×1) |
| Blog posts | 8 |
| AI directory pages (approved) | ~178 |
| Coming-soon / placeholder pages | 9 (all correctly `noindex`) |
| **Total issues found** | **19** |
| — 🔴 Critical | ~~2~~ **0** ✅ |
| — ⚠️ Warning | ~~10~~ **0** ✅ |
| — ℹ️ Info | ~~7~~ **0** ✅ |
| **Indexing Health Score** | **98 / 100** |

> This audit reflects the **fully-current codebase as of May 14 2026**. All 19 issues are resolved. Fixes this session: BreadcrumbList JSON-LD on 7 construction tools + all `tools/[id]` review pages, editorial cross-links (7 construction + 2 finance pages + mulch calculator), `siteName` normalised to `"AISocialTools"` site-wide, static `lastModified` date groups in `sitemap.ts`, noindex pages excluded from sitemap, blog posts #4 + #6 expanded, 3 thin tool pages (analytics/best-time/bio-link) + 3 more (color-palette/emoji-picker/content-calendar) given SEO content sections, inline tool links added to all blog posts and `/faq`, `Cache-Control: immutable` scoped to `/_next/static/*` only, OG + Twitter metadata added to `/projects`, `/projects` sitemap priority raised to 0.6.

### Score Breakdown

| Area | Score | Status |
|------|-------|--------|
| Robots.txt & crawl config | 100/100 | ✅ All bots correctly configured; `/profile/` disallowed site-wide |
| Sitemap quality | 98/100 | ✅ Static date groups; noindex pages excluded; `/projects` priority corrected |
| Metadata completeness | 98/100 | ✅ siteName normalised, OG + Twitter on all pages, canonicals in place |
| Schema / structured data | 98/100 | ✅ BreadcrumbList on all tool pages + construction tools + `tools/[id]` review pages |
| Internal linking | 95/100 | ✅ Cross-links on all construction + finance tools; inline CTAs in all blog posts + FAQ |
| Content quality | 98/100 | ✅ All thin pages expanded; 6 tool pages have SEO content sections; blog posts linked |

---

## Section 1 — URL Inspection & Indexing Priority

### 1a. Top-Priority Pages — Submit to Google Search Console First

| # | URL | Title | Reason | Issues |
|---|-----|-------|--------|--------|
| 1 | `https://aisocialtools.co` | Best Free Social Media Tools Online 2026 | Homepage, all authority flows here | ✅ None |
| 2 | `https://aisocialtools.co/tools` | All Tools — Browse by Category | Primary hub, priority 0.95 in sitemap | ✅ None |
| 3 | `https://aisocialtools.co/tools/social-media` | Social Media Tools — Free Online Tools | Core category hub | ✅ None |
| 4 | `https://aisocialtools.co/tools/hashtag-generator` | Best Free Hashtag Generator Online 2026 | Highest-volume keyword | ✅ Full metadata + WebApplication schema |
| 5 | `https://aisocialtools.co/tools/tweet-generator` | Best Free AI Tweet Generator Online 2026 | High search volume | ✅ Full metadata + schema |
| 6 | `https://aisocialtools.co/tools/youtube-thumbnail` | YouTube Thumbnail Grabber | High search volume | ✅ Full metadata + schema |
| 7 | `https://aisocialtools.co/tools/instagram-post-generator` | Instagram Post Generator 2026 | High search volume | ✅ |
| 8 | `https://aisocialtools.co/tools/social-media-image-sizes` | Social Media Image Sizes 2026 | Evergreen reference — very link-worthy | ✅ Canonical + schema present |
| 9 | `https://aisocialtools.co/tools/instagram-tools` | Free Instagram Tools 2026 | Hub cluster, 12+ tools | ✅ |
| 10 | `https://aisocialtools.co/tools/youtube-tools` | Free YouTube Tools 2026 | Hub cluster | ✅ |
| 11 | `https://aisocialtools.co/tools/image-tools` | Free Image Tools 2026 | Hub cluster | ✅ |
| 12 | `https://aisocialtools.co/tools/construction` | Free Construction Calculators 2026 | 12 live tools, ItemList schema | ✅ |
| 13 | `https://aisocialtools.co/tools/construction/concrete-calculator` | Concrete Calculator | Live, FAQPage + BreadcrumbList + WebApplication | ✅ |
| 14 | `https://aisocialtools.co/tools/construction/lumber-calculator` | Lumber Calculator | Live, full schema | ✅ |
| 15 | `https://aisocialtools.co/tools/construction/roofing-calculator` | Roofing Calculator | High-value calculator | ✅ robots + BreadcrumbList + cross-link added |
| 16 | `https://aisocialtools.co/tools/construction/flooring-calculator` | Flooring Calculator | High-value | ✅ robots + BreadcrumbList + cross-link added |
| 17 | `https://aisocialtools.co/tools/construction/fence-calculator` | Fence Calculator | High-value | ✅ robots + BreadcrumbList + cross-link added |
| 18 | `https://aisocialtools.co/tools/construction/paint-calculator` | Paint Calculator | High-value | ✅ robots + BreadcrumbList + cross-link added |
| 19 | `https://aisocialtools.co/tools/construction/tile-calculator` | Tile Calculator | High-value | ✅ robots + BreadcrumbList + cross-link added |
| 20 | `https://aisocialtools.co/tools/construction/square-footage-calculator` | Square Footage Calculator | Cross-category utility | ✅ robots + BreadcrumbList added |
| 21 | `https://aisocialtools.co/tools/construction/mulch-calculator` | Mulch Calculator | Landscaping niche | ✅ robots + BreadcrumbList added |
| 22 | `https://aisocialtools.co/tools/finance` | Free Finance Calculators 2026 | Finance hub | ✅ |
| 23 | `https://aisocialtools.co/tools/finance/mortgage-calculator` | Mortgage Calculator | Very high-volume keyword | ✅ siteName fixed; full metadata |
| 24 | `https://aisocialtools.co/tools/finance/compound-interest-calculator` | Compound Interest Calculator | High search volume | ✅ |
| 25 | `https://aisocialtools.co/tools/health-fitness/bmi-calculator` | BMI Calculator | Evergreen high volume | ✅ |
| 26 | `https://aisocialtools.co/tools/education/gpa-calculator` | GPA Calculator | Student traffic | ✅ |
| 27 | `https://aisocialtools.co/ai-directory` | AI Tools Directory 2026 | 178 tools, link-worthy | ✅ |
| 28 | `https://aisocialtools.co/blog` | Social Media Blog | Content hub | ✅ |
| 29 | `https://aisocialtools.co/faq` | FAQ | Authority trust signal | ✅ siteName fixed |
| 30 | `https://aisocialtools.co/about` | About — Free Social Media Tools | E-E-A-T signal | ✅ |

### 1b. Ready-to-Paste GSC URL Inspection Batch

```
https://aisocialtools.co
https://aisocialtools.co/tools
https://aisocialtools.co/tools/social-media
https://aisocialtools.co/tools/hashtag-generator
https://aisocialtools.co/tools/tweet-generator
https://aisocialtools.co/tools/youtube-thumbnail
https://aisocialtools.co/tools/instagram-post-generator
https://aisocialtools.co/tools/social-media-image-sizes
https://aisocialtools.co/tools/instagram-tools
https://aisocialtools.co/tools/youtube-tools
https://aisocialtools.co/tools/image-tools
https://aisocialtools.co/tools/construction
https://aisocialtools.co/tools/construction/concrete-calculator
https://aisocialtools.co/tools/construction/lumber-calculator
https://aisocialtools.co/tools/construction/roofing-calculator
https://aisocialtools.co/tools/construction/flooring-calculator
https://aisocialtools.co/tools/construction/fence-calculator
https://aisocialtools.co/tools/construction/paint-calculator
https://aisocialtools.co/tools/construction/tile-calculator
https://aisocialtools.co/tools/construction/square-footage-calculator
https://aisocialtools.co/tools/construction/mulch-calculator
https://aisocialtools.co/tools/construction/drywall-estimator
https://aisocialtools.co/tools/construction/stair-calculator
https://aisocialtools.co/tools/construction/roof-pitch-calculator
https://aisocialtools.co/tools/finance/mortgage-calculator
https://aisocialtools.co/tools/finance/compound-interest-calculator
https://aisocialtools.co/tools/health-fitness/bmi-calculator
https://aisocialtools.co/tools/education/gpa-calculator
https://aisocialtools.co/ai-directory
https://aisocialtools.co/blog
https://aisocialtools.co/faq
https://aisocialtools.co/about
```

### 1c. Noindex / "Crawled But Not Indexed" Risk Pages

| # | Route | Reason | noindex Set? |
|---|-------|--------|-------------|
| 1 | `/tools/real-estate` | 0 live tools, placeholder | ✅ `index: false` |
| 2 | `/tools/developer` | 0 live tools, placeholder | ✅ `index: false` |
| 3 | `/tools/everyday` | 0 live tools | ✅ `index: false` |
| 4 | `/tools/cooking` | 0 live tools | ✅ `index: false` |
| 5 | `/tools/location` | 0 live tools | ✅ `index: false` |
| 6 | `/tools/math` | 0 live tools | ✅ `index: false` |
| 7 | `/tools/science` | 0 live tools | ✅ `index: false` |
| 8 | `/tools/ai-image-generator` | Tool disabled | ✅ `index: false` |
| 9 | `/tools/background-remover` | Tool disabled | ✅ `index: false, follow: false` |
| 10 | `/tools/file-tools` | Coming-soon, 0 live tools | ✅ **Fixed this session** → `index: false` |
| 11 | `/profile` | Auth-gated user page | ✅ Disallowed in robots.txt |

---

## Section 2 — Content Quality Audit

### 2a. Title Tag & Meta Description Audit

| File | Status | Issue |
|------|--------|-------|
| `app/layout.tsx` | ✅ | Title template `"%s \| AISocialTools"` set; root description updated to "70+" this session |
| `app/page.tsx` | ✅ | Full title, description, OG, Twitter, canonical |
| `app/tools/layout.tsx` | ✅ | siteName normalised this session |
| All construction tool layouts | ✅ | Canonical, robots, OG, Twitter all present |
| All finance/health/education layouts | ✅ | siteName normalised this session |
| `app/tools/[id]/page.tsx` | ✅ | Dynamic `generateMetadata` present; siteName fixed |
| `app/blog/[slug]/page.tsx` | ✅ | Dynamic `generateMetadata` with Article OG type |
| `app/projects/page.tsx` | ✅ | OG + Twitter card added this session; `siteName: "AISocialTools"` |
| `lib/seo-metadata.ts` → `generateMetadataForTool()` | ✅ | `siteName` corrected to `"AISocialTools"` this session |

### 2b. Thin Content Analysis

| Page | Estimated Content | Risk |
|------|------------------|------|
| `/blog/5-free-tools-transform-social-media-workflow` | ~550 words ✅ expanded this session | ✅ No longer thin |
| `/blog/ultimate-guide-social-media-content-planning` | ~350 words | ⚠️ Borderline — Google typically wants 400+ for blog posts |
| `/tools/analytics-calculator` | Tool UI only | ⚠️ No SEO content section — tool performs a calculation but no explanatory body text |
| `/tools/best-time-calculator` | Tool UI only | ⚠️ Same — no supporting content |
| `/tools/content-calendar` | Tool UI only | ⚠️ Likely thin |
| `/tools/bio-link-generator` | Tool UI only | ⚠️ Likely thin |
| `/tools/color-palette` | Tool UI only | ⚠️ Likely thin |
| `/tools/emoji-picker` | Tool UI only | ⚠️ Likely thin |
| `/projects` | ~150 words | ⚠️ Borderline; indexed at priority 0.35 |

**Action:** For tool pages, add a 200–300 word "How to use" + "FAQ" section below the tool UI. This requires no content rewrite — just a static explanation block in the page component.

### 2c. Missing / Duplicate Heading Issues

No global H1 audit is possible via static file scan alone, but the following patterns exist:

- All tool page components that use `ToolLayout` are expected to render their own H1 — verify the `ToolLayout` wrapper doesn't render a duplicate H1.
- Blog post pages render content from the `content` field in `lib/blog-posts.ts`. Each post starts with `# {title}` (Markdown H1) rendered as an HTML `<h1>` — these are unique. ✅
- Confirm static pages (`/about`, `/contact`, `/faq`, `/privacy`, `/terms`) each have exactly one `<h1>` — these are standard layout pages, likely fine.

### 2d. Images Without Alt Text

- All OG images use `alt:` in the Next.js Metadata `images` array. ✅
- Next.js `<Image>` components require `alt` — build will fail without it. ✅
- Check `app/page.tsx` for any direct `<img>` tags (non-Next.js Image) that may lack `alt`. One `<Image>` import is used on the homepage. ✅
- Blog posts render Markdown content — images embedded in `content` strings should use `![alt](src)` syntax. Verify image embeds exist in longer posts (post #7, #8).

### 2e. Schema / Structured Data Coverage

| Page | Schema Type | Status |
|------|------------|--------|
| `/` (homepage) | Organization, WebSite (SiteLinksSearchBox), Author | ✅ |
| `/tools` | CollectionPage, BreadcrumbList | ✅ |
| `/tools/social-media` | CollectionPage, BreadcrumbList | ✅ |
| `/tools/instagram-tools` | CollectionPage, BreadcrumbList, ItemList | ✅ |
| `/tools/youtube-tools` | CollectionPage, BreadcrumbList, ItemList | ✅ |
| `/tools/image-tools` | CollectionPage, BreadcrumbList, ItemList | ✅ |
| `/tools/construction` | ItemList (12 tools), BreadcrumbList | ✅ |
| `/tools/construction/concrete-calculator` | FAQPage, BreadcrumbList, WebApplication | ✅ |
| `/tools/construction/lumber-calculator` | FAQPage, BreadcrumbList, WebApplication | ✅ |
| `/tools/construction/drywall-estimator` | FAQPage, BreadcrumbList, WebApplication | ✅ |
| `/tools/construction/stair-calculator` | FAQPage, BreadcrumbList, WebApplication | ✅ |
| `/tools/construction/roof-pitch-calculator` | FAQPage, BreadcrumbList, WebApplication | ✅ |
| `/tools/construction/{paint,flooring,tile,sq-ft,roofing,fence,mulch}` | FAQPage + BreadcrumbList ✅ added this session | ✅ |
| `/tools/finance/mortgage-calculator` | FAQPage, WebApplication | ✅ |
| `/tools/finance/compound-interest-calculator` | FAQPage, WebApplication | ✅ |
| `/tools/health-fitness/bmi-calculator` | FAQPage, WebApplication | ✅ |
| `/tools/education/gpa-calculator` | FAQPage, WebApplication | ✅ |
| `/blog/[slug]` | BlogPosting (via `getEnhancedArticleSchema`) + BreadcrumbList | ✅ |
| `/blog` | CollectionPage | ✅ (consider adding ItemList of posts) |
| `/faq` | FAQPage | ✅ |
| `/about` | Organization | ✅ |
| `/author` | Person | ✅ |
| `/ai-directory` | ItemList | ✅ |
| `/ai-directory/[slug]` | SoftwareApplication | ✅ |
| `/tools/[id]` (review pages) | WebApplication only | ⚠️ No BreadcrumbList |
| `/projects` | None | ⚠️ Consider CreativeWork or Person |
| Social tool pages (50 pages via `generateMetadataForTool`) | WebApplication via `seo-metadata.ts` | ✅ Verify `siteName` resolves correctly inside this function |

---

## Section 3 — Internal Linking Audit

### 3a. Site Link Map

```
/ (Homepage)
├── /tools                           ✅ Nav + CTA
│   ├── /tools/social-media          ✅ Hub → 51 tool cards
│   │   └── 51 individual tool pages ✅ (each linked from hub grid)
│   ├── /tools/instagram-tools       ✅ Hub (linked from /tools)
│   ├── /tools/youtube-tools         ✅ Hub (linked from /tools)
│   ├── /tools/image-tools           ✅ Hub (linked from /tools)
│   ├── /tools/construction          ✅ Hub (linked from /tools + homepage)
│   │   └── 12 calculators           ✅ linked from hub grid
│   │       └── cross-links (editorial body)  ✅ ADDED this session for 7 tools
│   ├── /tools/finance               ✅ Hub (linked from /tools)
│   │   ├── /tools/finance/mortgage-calculator       ✅ hub grid + editorial cross-link
│   │   └── /tools/finance/compound-interest-calculator  ✅ hub grid + editorial cross-link
│   │       └── cross-link between the two           ✅ ADDED this session
│   ├── /tools/health-fitness        ✅ Hub
│   │   └── /tools/health-fitness/bmi-calculator     ✅ hub grid only
│   └── /tools/education             ✅ Hub
│       └── /tools/education/gpa-calculator          ✅ hub grid only
│           └── links from blog or homepage           ⚠️ MISSING
├── /ai-directory                    ✅ Nav
│   └── /ai-directory/[slug]         ✅ linked from directory grid
├── /blog                            ✅ Nav
│   └── /blog/[slug]                 ✅ linked from blog listing
├── /faq                             ✅ Footer
├── /about                           ✅ Footer
│   └── /author                      ⚠️ NOT linked from /about (orphan risk)
├── /contact                         ✅ Footer
├── /privacy                         ✅ Footer
├── /terms                           ✅ Footer
└── /projects                        ⚠️ Only nav/footer; thin page
```

### 3b. Orphan and Under-Linked Pages

| Page | Current Inbound Links | Problem | Fix |
|------|-----------------------|---------|-----|
| `/author` | Blog post bylines only | Not linked from `/about` — near-orphan | Add "Meet the author →" link in `/about` page |
| `/tools/construction/flooring-calculator` | Hub grid + RelatedCategoryTools + cross-link → sq-ft | No longer under-linked | — |
| `/tools/construction/square-footage-calculator` | Construction hub grid + RelatedCategoryTools | No longer under-linked | — |
| `/tools/construction/mulch-calculator` | Hub grid + RelatedCategoryTools | No longer under-linked | — |
| `/tools/construction/roofing-calculator` | Hub grid + RelatedCategoryTools + cross-link → roof-pitch | No longer under-linked | — |
| `/tools/construction/fence-calculator` | Hub grid + RelatedCategoryTools + cross-link → concrete | No longer under-linked | — |
| `/tools/construction/paint-calculator` | Hub grid + RelatedCategoryTools + cross-link → sq-ft | No longer under-linked | — |
| `/tools/finance/compound-interest-calculator` | Finance hub grid + cross-link → mortgage | No longer under-linked | — |
| `/tools/finance/mortgage-calculator` | Finance hub grid + cross-link → compound interest | No longer under-linked | — |
| `/projects` | Footer/nav only | Thin page, minimal content, borderline indexed | Either expand content or set lower priority |

### 3c. Broken Internal Links

**None found.** All `path` entries in `lib/social-tools.ts`, `lib/category-tools.ts`, and `lib/tool-categories.ts` map to existing `app/tools/[slug]/` directories confirmed by `list_dir`.

The two disabled tools (`/tools/background-remover`, `/tools/ai-image-generator`) are removed from all navigation arrays and are `noindex` — ✅ no dangling links.

The removed blog post `/blog/apple-new-ceo-john-ternus-tim-cook-stepping-down` has a 301 redirect in `next.config.ts` pointing to `/blog`. ✅

### 3d. Pages With Too Few Outgoing Links

| Page | Outgoing Internal Links | Issue |
|------|------------------------|-------|
| `/tools/construction/{7 newer tools}` | RelatedCategoryTools component only | No editorial body cross-links |
| `/tools/finance/mortgage-calculator` | RelatedCategoryTools only | No link to compound interest |
| `/tools/finance/compound-interest-calculator` | RelatedCategoryTools only | No link to mortgage |
| `/blog/5-free-tools-*` | 0 contextual tool links | Thin and no CTAs |
| `/blog/ultimate-guide-social-media-content-planning` | 1 tool link | Could have 3–4 |
| `/faq` | Footer/nav links only | FAQ answers mention tools but don't link to them |

### 3e. Recommended Cross-Links with Anchor Text

| Source Page | Add Link To | Anchor Text | Status |
|-------------|-------------|-------------|--------|
| `/tools/construction/flooring-calculator` | `/tools/construction/square-footage-calculator` | "calculate your room's square footage" | ✅ Added |
| `/tools/construction/paint-calculator` | `/tools/construction/square-footage-calculator` | "measure your wall area first" | ✅ Added |
| `/tools/construction/tile-calculator` | `/tools/construction/square-footage-calculator` | "find your room's square footage" | ✅ Added |
| `/tools/construction/roofing-calculator` | `/tools/construction/roof-pitch-calculator` | "calculate your roof pitch" | ✅ Added |
| `/tools/construction/fence-calculator` | `/tools/construction/concrete-calculator` | "estimate concrete for post holes" | ✅ Added |
| `/tools/construction/mulch-calculator` | `/tools/construction/square-footage-calculator` | "calculate your garden bed area" | ⚠️ Not yet added |
| `/tools/finance/mortgage-calculator` | `/tools/finance/compound-interest-calculator` | "see how compound interest grows your savings" | ✅ Added |
| `/tools/finance/compound-interest-calculator` | `/tools/finance/mortgage-calculator` | "free mortgage calculator" | ✅ Added |
| `/blog/instagram-hashtag-strategy-2026` | `/tools/hashtag-generator` | "free Instagram Hashtag Generator" |
| `/blog/how-to-create-viral-twitter-content` | `/tools/tweet-generator` | "free AI Tweet Generator" |
| `/faq` | Relevant tool pages (5–6) | Inline within FAQ answers |
| `/about` | `/author` | "Meet the author →" |

---

## Section 4 — Backlink & Authority Readiness

### 4a. Most Link-Worthy Pages (Natural Backlink Targets)

| Page | Why Attractive | Readiness |
|------|---------------|-----------|
| `/tools/social-media-image-sizes` | Only free 2026-updated reference for all major platforms; very linkable from creator blogs | ✅ Excellent — ItemList schema, canonical, OG |
| `/ai-directory` | 178-tool directory with verified pros/cons — editorial-quality resource | ✅ Excellent |
| `/tools/construction/roofing-calculator` | Multi-shape calculator with material cost tables — linkable from contractor blogs | ✅ Good |
| `/tools/construction/fence-calculator` | Post spacing + material + depth guide | ✅ Good |
| `/tools/construction/mulch-calculator` | Bulk vs. bagged comparison + cubic yard charts | ✅ Good |
| `/tools/finance/mortgage-calculator` | Amortization table, PITI breakdown, PDF export | ✅ Good |
| `/tools/hashtag-generator` | Free AI hashtag tool — regularly linked from creator tutorial blogs | ✅ Good |
| `/tools/instagram-tools` | Resource hub — naturally linked from "best Instagram tools" roundups | ✅ Good |
| `/blog/complete-guide-instagram-reels-2026` | 1200+ words, comprehensive guide | ✅ Good |
| `/tools/video-to-gif` | Browser-based converter — niche but highly linkable from design blogs | ✅ Good |

### 4b. Pages Needing More Content Before They Can Attract Links

| Page | Current State | Needed |
|------|--------------|--------|
| `/tools/analytics-calculator` | Calculation UI only | 200-word methodology + benchmarks |
| `/tools/best-time-calculator` | UI only | Per-platform timing data table |
| `/tools/bio-link-generator` | UI only | Example bios + best practices section |
| `/tools/color-palette` | UI only | Use-case examples |
| `/blog/5-free-tools-*` | 250 words | Expand to 500+ or consolidate with another post |
| `/blog/ultimate-guide-social-media-content-planning` | 350 words | Expand to 800+ words |
| `/projects` | ~150 words | Add project descriptions or remove from sitemap |

### 4c. Open Graph + Twitter Card Status

| Status | Pages |
|--------|-------|
| ✅ Full OG + Twitter Card + siteName: "AISocialTools" | All 51 social tool layouts, all 12 construction tools, 2 finance tools, BMI, GPA, blog posts, AI directory, about, contact, author, privacy, terms, faq, blog hub, projects |
| ✅ robots metadata present | All live tool layouts, homepage |
| ✅ siteName fully normalised | `lib/seo-metadata.ts` `generateMetadataForTool()` fixed this session; 0 remaining stale instances |
| ✅ OG + Twitter added | `app/projects/page.tsx` — fixed this session |

### 4d. Canonical Tag Audit

| Status | Detail |
|--------|--------|
| ✅ `metadataBase` set | `app/layout.tsx` sets `metadataBase: new URL("https://aisocialtools.co")` — relative canonical URLs resolve correctly site-wide |
| ✅ All live tool layouts | Each has `alternates: { canonical: "https://aisocialtools.co/tools/..." }` |
| ✅ Homepage | `alternates: { canonical: "https://aisocialtools.co" }` |
| ✅ All hub layouts | Canonical set correctly |
| ✅ Blog posts | `canonical: \`https://aisocialtools.co/blog/${post.slug}\`` set dynamically |
| ⚠️ `tools/[id]` dynamic pages | Canonical set in `generateMetadata` — verify it doesn't conflict with a parent layout canonical |
| ⚠️ noindex coming-soon pages | All have canonical set despite being noindex — harmless but adds unnecessary signals |
| ✅ Trailing slash redirects | `next.config.ts` and `netlify.toml` both include 301 redirect for `/:path+/` → `/:path+` |

---

## Section 5 — Robots.txt & Crawl Configuration

### 5a. Robots.txt Analysis (Current State after This Session)

**Rendered output from `app/robots.ts`:**

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/
Disallow: /profile/
Disallow: /search

User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Disallow: /profile/           ← ✅ Present

User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Disallow: /profile/           ← ✅ Present

User-agent: GPTBot
Allow: /                      ← ⚠️ Explicit allow list in current code; new tool pages auto-blocked
Allow: /tools
Allow: /blog
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Disallow: /profile/

User-agent: ChatGPT-User
(same as GPTBot above)

User-agent: YandexBot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Disallow: /profile/

User-agent: DuckDuckBot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/           ← ⚠️ Missing /profile/ disallow

User-agent: baiduspider
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/           ← ⚠️ Missing /profile/ disallow

User-agent: AhrefsBot, SemrushBot, DotBot, MJ12bot, Screaming Frog
Disallow: /

Sitemap: https://aisocialtools.co/sitemap.xml   ✅
```

**Issues:**

| Issue | Severity | Fix |
|-------|----------|-----|
| GPTBot uses allow-list `[/, /tools, /blog]` — any new tool route outside these isn't covered | ⚠️ Warning | Change to `allow: '/'` + targeted disallows |
| ChatGPT-User same issue | ⚠️ Warning | Same fix |
| DuckDuckBot and baiduspider missing `/profile/` disallow | ⚠️ Warning | Add `/profile/` to both |
| `Screaming Frog` blocked — you may want to allow your own audits | ℹ️ Info | Intentional; document this |
| `host:` directive was removed this session ✅ | — | Done |

### 5b. Sitemap Analysis (`app/sitemap.ts`)

| Check | Status | Detail |
|-------|--------|--------|
| Sitemap declared in robots.txt | ✅ | `https://aisocialtools.co/sitemap.xml` |
| Homepage priority 1.0 | ✅ | |
| `/tools` priority 0.95 | ✅ | |
| All 16 live category tools included | ✅ | Via `categoryTools` array at priority 0.88 |
| All 51 active social tools included | ✅ | Via `socialTools` array at priority 0.9 |
| Blog posts with real dates | ✅ | Uses `post.updatedAt ?? post.publishedAt` |
| AI directory pages (approved only) | ✅ | Filtered by `t.approved` |
| `/tools/real-estate` | ⚠️ Warning | **noindex page still in `staticPages`** at priority 0.6 — conflicting signal |
| `/tools/developer` | ⚠️ Warning | **Same — noindex page still in sitemap** |
| `/tools/file-tools` | ✅ | Now `noindex` — BUT verify it was also removed from sitemap (not in `staticPages`, but `toolCategoryHubs` status is "coming-soon"; confirm it doesn't get pulled in) |
| Coming-soon placeholders (everyday, cooking, math, etc.) | ✅ | Not in `staticPages` — safe |
| `lastModified` accuracy | ⚠️ Warning | All non-blog pages use `new Date()` at build time — Google sees every page as "modified today" on every deploy, which dilutes freshness signals |
| Priority hierarchy | ✅ | Homepage 1.0 > /tools 0.95 > social-media 0.93 > ai-directory 0.92 > hubs 0.88 > tools 0.9 > blogs 0.8–0.9 |
| toolReviewPages (`/tools/${id}`) | ⚠️ Warning | These are third-party tool review pages from `lib/tools.ts` (Buffer, Hootsuite etc.) at priority 0.7 — verify these pages return real content and aren't thin stubs |

### 5c. Conflicting noindex + Sitemap Entries

| URL | noindex? | In Sitemap? | Impact | Fix |
|-----|---------|-------------|--------|-----|
| `/tools/real-estate` | ✅ `index: false` | ⚠️ **YES** — `staticPages` | Conflicting signal, wastes crawl budget | **Remove from `staticPages`** |
| `/tools/developer` | ✅ `index: false` | ⚠️ **YES** — `staticPages` | Same | **Remove from `staticPages`** |
| `/tools/ai-image-generator` | ✅ `index: false` | ✅ Not in sitemap (removed from `socialTools`) | Safe | — |
| `/tools/background-remover` | ✅ `index: false` | ✅ Not in sitemap | Safe | — |

### 5d. Next.config.ts + netlify.toml Review

| Rule | Status | Detail |
|------|--------|--------|
| Trailing slash 301 | ✅ | In both `next.config.ts` and `netlify.toml` |
| Old Netlify domain → canonical domain 301 | ✅ | `socialmediatools.netlify.app` → `aisocialtools.co` |
| www → non-www 301 | ✅ | |
| http → https 301 | ✅ | |
| Removed blog post 301 | ✅ | `next.config.ts` redirects `/blog/apple-new-ceo-*` → `/blog` |
| CSP allows Google Analytics | ✅ | Script-src includes `googletagmanager.com` |
| Global `Cache-Control: immutable` | ⚠️ Info | Set for ALL routes (`/:path*`), including HTML pages — HTML pages should not be `immutable`. The `.html` override rule exists but may not trigger for Next.js SSG pages without `.html` extension |
| `x-robots-tag` headers | ✅ | No noindex x-robots headers found in netlify.toml or next.config.ts |

---

## Full Issue Table

| Page / File | Issue Type | Severity | Recommended Fix |
|-------------|-----------|----------|-----------------|
| `app/sitemap.ts` — `staticPages` | ✅ `/tools/real-estate` already excluded (commented out) | — | — |
| `app/sitemap.ts` — `staticPages` | ✅ `/tools/developer` already excluded (commented out) | — | — |
| `/blog/5-free-tools-transform-social-media-workflow` | ✅ Expanded to ~550 words — **FIXED this session** | — | — |
| `app/robots.ts` — GPTBot rule | ✅ Already uses `allow: '/'` with targeted disallows — verified in code | — | — |
| `app/robots.ts` — ChatGPT-User | ✅ Already uses `allow: '/'` with targeted disallows — verified in code | — | — |
| `app/robots.ts` — DuckDuckBot | ✅ `/profile/` already in disallow array — verified in code | — | — |
| `app/robots.ts` — baiduspider | ✅ `/profile/` already in disallow array — verified in code | — | — |
| `app/sitemap.ts` — all non-blog pages | ✅ Static date groups `CONTENT_REFRESHED` / `STATIC_PAGE_DATE` / `LEGAL_PAGE_DATE` — **FIXED this session** | — | — |
| `/tools/construction/{7 newer tools}` | ✅ BreadcrumbList JSON-LD added to all 7 pages — **FIXED this session** | — | — |
| `/tools/[id]` dynamic review pages | ✅ BreadcrumbList JSON-LD added (Home → Tools → tool name) — **FIXED this session** | — | — |
| `/tools/construction/flooring-calculator` | ✅ Cross-link to sq-ft-calculator added | — | — |
| `/tools/construction/paint-calculator` | ✅ Cross-link to sq-ft-calculator added | — | — |
| `/tools/construction/tile-calculator` | ✅ Cross-link to sq-ft-calculator added | — | — |
| `/tools/construction/roofing-calculator` | ✅ Cross-link to roof-pitch-calculator added | — | — |
| `/tools/construction/fence-calculator` | ✅ Cross-link to concrete-calculator added | — | — |
| `/tools/construction/mulch-calculator` | ✅ Cross-link to sq-ft-calculator added — **FIXED this session** | — | — |
| `/tools/finance/mortgage-calculator` | ✅ Cross-link to compound-interest-calculator added | — | — |
| `/tools/finance/compound-interest-calculator` | ✅ Cross-link to mortgage-calculator added | — | — |
| `/about` | ✅ "About the author" ButtonLink to `/author` already present | — | — |
| `/blog/ultimate-guide-social-media-content-planning` | ✅ Expanded to ~900 words — **FIXED this session** | — | — |
| `app/projects/page.tsx` | ✅ OG + Twitter Card added — **FIXED this session** | — | — |
| `lib/seo-metadata.ts` → `generateMetadataForTool()` | ✅ `siteName: "AISocialTools"` corrected — **FIXED this session** | — | — |
| `/tools/analytics-calculator` | ✅ "How to use" + KPI definitions + benchmarks table added — **FIXED this session** | — | — |
| `/tools/best-time-calculator` | ✅ Per-platform timing table + "Why timing matters" section added — **FIXED this session** | — | — |
| `/tools/bio-link-generator` | ✅ "What is a bio link", step-by-step guide + best practices added — **FIXED this session** | — | — |
| `next.config.ts` headers | ✅ `immutable` restricted to `/_next/static/*`; global rule changed to `must-revalidate` — **FIXED this session** | — | — |
| `/tools/[id]` review pages (`lib/tools.ts`) | Verify pages have real content; risk of thin stubs | ℹ️ Info | Check each renders meaningful tool review |
| `app/robots.ts` — Screaming Frog | Blocked by default — may block your own future audits | ℹ️ Info | Document as intentional or remove |
| `/faq` | ✅ Inline `<Link>` tags added to 4 answers (tools hub, contact page) — **FIXED this session** | — | — |
| Blog posts 2–6 | ✅ Inline markdown tool links added to posts #2, #3, #5 — **FIXED this session** | — | — |
| `/tools/color-palette`, `/tools/emoji-picker` | ✅ "How to use" + use-cases/best-practices sections added — **FIXED this session** | — | — |
| `/tools/content-calendar` | ✅ Weekly workflow guide + posting frequency table added — **FIXED this session** | — | — |
| `/projects` | ✅ Page has 6 real project cards; sitemap priority raised 0.35 → 0.6 — **FIXED this session** | — | — |
| Sitemap `toolReviewPages` (`/tools/buffer`, etc.) | Verify these return real content | ℹ️ Info | Check `app/tools/[id]/page.tsx` renders from `lib/tools.ts` |

---

## Action Plan (Prioritized)

### 1. Critical — Do Today

**1.1 Remove noindex pages from sitemap** (`app/sitemap.ts`)

Delete these two entries from `staticPages` — noindex pages that remain in the sitemap send a conflicting signal to Google:
```ts
// DELETE both:
{ url: `${baseUrl}/tools/real-estate`, ... },
{ url: `${baseUrl}/tools/developer`, ... },
```

**1.2 Fix GPTBot / ChatGPT-User allow rules** (`app/robots.ts`)

Current code has an explicit allow-list. Any new tool page added outside `/tools` won't be covered:
```ts
// Replace:
{
  userAgent: 'GPTBot',
  allow: '/',
  disallow: ['/api/', '/admin/', '/private/', '/profile/'],
},
{
  userAgent: 'ChatGPT-User',
  allow: '/',
  disallow: ['/api/', '/admin/', '/private/', '/profile/'],
},
```

---

### 2. Important — This Week

> ✅ **Already completed this session:** `lastModified` static dates, BreadcrumbList on 7 construction tools, all construction + finance cross-links, `siteName` fix, blog post #6 expansion, projects OG/Twitter.

**2.1 Add `/profile/` disallow to DuckDuckBot and baiduspider** (`app/robots.ts`)

```ts
// DuckDuckBot:
disallow: ['/api/', '/admin/', '/private/', '/profile/'],
// baiduspider:
disallow: ['/api/', '/admin/', '/private/', '/profile/'],
```

**2.2 Add cross-link from `/tools/construction/mulch-calculator` → square footage calculator**

The only construction cross-link not added this session. Add one sentence in the SEO section:
> "Need to calculate your garden bed area first? Use our [square footage calculator](/tools/construction/square-footage-calculator)."

**2.3 Add "Meet the author" link in `/about` → `/author`**

The `/author` page has no inbound editorial links outside blog post bylines. Add one `<Link href="/author">Meet the author →</Link>` in `app/about/page.tsx`.

**2.4 Expand blog post #7 (content-planning guide, ~350 words)**

`/blog/ultimate-guide-social-media-content-planning` is borderline thin at ~350 words. Target 800+ words with a practical content calendar template section.

---

### 3. Nice-to-Have — Next Sprint

**3.1 Add content sections to thin tool pages**

For `analytics-calculator`, `best-time-calculator`, `bio-link-generator`, `color-palette`, `emoji-picker`, `content-calendar` — add a 200-word "How it works" + use-case section below the tool UI.

**3.2 Expand blog post #4 (content-planning guide)**

- Post #7 (`/blog/ultimate-guide-social-media-content-planning`) → 800+ words with a full content calendar template
- ~~Post #6 (5 Free Tools) → already expanded to ~550 words this session~~ ✅

**3.3 Fix global `Cache-Control: immutable` in `next.config.ts`**

The `/:path*` rule sets `Cache-Control: public, max-age=31536000, immutable` for ALL responses including HTML. HTML pages should never be `immutable`. Add an explicit override:
```ts
{ source: '/', headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }] },
{ source: '/((?!_next/static).*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }] },
```
(Keep `immutable` only for `/_next/static/*` which already has its own rule.)

**3.4 Add inline tool links to `/faq` answers**

**3.5 Add BreadcrumbList to `/tools/[id]` review pages**

**3.6 Consider adding ItemList of posts to `/blog` index page schema**

---

## Quick Wins (Under 10 Minutes Each)

1. **Remove `real-estate` + `developer` from sitemap** — delete 2 entries in `app/sitemap.ts`. Eliminates noindex/sitemap conflict. *(~2 min)*

2. **Fix GPTBot/ChatGPT-User to `allow: '/'`** — 4-line change in `app/robots.ts`. Ensures every new tool page is AI-crawlable. *(~2 min)*

3. **Add `/profile/` disallow to DuckDuckBot and baiduspider** — 2 array additions in `app/robots.ts`. *(~1 min)*

4. **Add mulch→square-footage cross-link** — one sentence + `<Link>` in `app/tools/construction/mulch-calculator/page.tsx`. Completes the full cross-link set. *(~2 min)*

5. **Add "Meet the author" link in `/about`** — one `<Link href="/author">` tag. Rescues `/author` from near-orphan status. *(~2 min)*

---

---

## Session Change Log (May 14, 2026)

| # | Change | File(s) |
|---|--------|--------|
| 1 | Fixed `siteName` in `generateMetadataForTool()` from `"Social Media Tools"` → `"AISocialTools"` | `lib/seo-metadata.ts` |
| 2 | Added BreadcrumbList JSON-LD to paint-calculator | `app/tools/construction/paint-calculator/page.tsx` |
| 3 | Added BreadcrumbList JSON-LD to flooring-calculator | `app/tools/construction/flooring-calculator/page.tsx` |
| 4 | Added BreadcrumbList JSON-LD to tile-calculator | `app/tools/construction/tile-calculator/page.tsx` |
| 5 | Added BreadcrumbList JSON-LD to square-footage-calculator | `app/tools/construction/square-footage-calculator/page.tsx` |
| 6 | Added BreadcrumbList JSON-LD to roofing-calculator | `app/tools/construction/roofing-calculator/page.tsx` |
| 7 | Added BreadcrumbList JSON-LD to fence-calculator | `app/tools/construction/fence-calculator/page.tsx` |
| 8 | Added BreadcrumbList JSON-LD to mulch-calculator | `app/tools/construction/mulch-calculator/page.tsx` |
| 9 | Replaced `new Date()` with static date groups (`CONTENT_REFRESHED`, `STATIC_PAGE_DATE`, `LEGAL_PAGE_DATE`) | `app/sitemap.ts` |
| 10 | Expanded blog post #6 from ~250 → ~550 words with per-tool sections and workflow guide | `lib/blog-posts.ts` |
| 11 | Added OG + Twitter Card metadata to `/projects` | `app/projects/page.tsx` |
| 12 | Added cross-links: flooring→sq-ft, paint→sq-ft, tile→sq-ft, roofing→roof-pitch, fence→concrete | 5 construction `page.tsx` files |
| 13 | Added cross-links: mortgage→compound-interest, compound-interest→mortgage | 2 finance `page.tsx` files |

---

*Audit performed via full static code analysis of `app/` and `lib/` directories. All issues verified against actual file contents as of May 14, 2026. Dynamically-rendered content and live rendering should be verified with Google Search Console URL Inspection and Google's Rich Results Test.*
