# Core Web Vitals Audit Report — aisocialtools.co

**Generated:** May 14, 2026  
**Auditor:** Core Web Vitals Expert  
**Target:** Next.js 15 App Router deployed on Netlify  
**Scope:** 290 pages, Priority 1 & 2 pages analyzed

---

## Executive Summary

| Page | LCP Risk | CLS Risk | INP Risk | Priority |
|------|----------|----------|----------|----------|
| `/` (homepage) | **HIGH** | Medium | Low | **Critical** |
| `/tools` | Low | Low | Low | Medium |
| `/tools/construction/concrete-calculator` | **HIGH** | Low | **HIGH** | **Critical** |
| `/tools/construction/roofing-calculator` | **HIGH** | Low | **HIGH** | **Critical** |
| `/tools/construction/flooring-calculator` | **HIGH** | Low | **HIGH** | **Critical** |
| `/tools/health-fitness/bmi-calculator` | **HIGH** | Low | **HIGH** | **Critical** |
| `/tools/hashtag-generator` | Medium | Low | Low | Medium |
| `/tools/tweet-generator` | Medium | Medium | **HIGH** | **Critical** |
| `/tools/instagram-post-generator` | Medium | Medium | Medium | Medium |
| `/tools/youtube-thumbnail` | Medium | Low | Low | Medium |
| `/tools/social-media-image-sizes` | Low | Low | Low | Low |
| `/ai-directory` | Medium | Low | Medium | Medium |
| `/blog` | Low | Low | Low | Low |
| `/tools/construction` | Low | Low | Low | Medium |
| `/tools/social-media` | Low | Low | Low | Medium |

**Key Finding:** All calculator pages are marked as `"use client"` with no server-rendered shell, meaning **LCP is blocked until JavaScript hydrates** — this is the #1 issue affecting your 290 unindexed pages.

---

## Per-Page Findings

### `/` (Homepage) — **CRITICAL**
**LCP element:** H1 text + WordRotator component

**LCP Issues:**
- WordRotator uses `useEffect` + `setState` causing hydration delay
- Uses `setInterval` for word rotation (250ms timer triggers React re-renders)
- Mount check `setMounted(true)` delays LCP visibility
- Animation components (CountUp, Reveal) use IntersectionObserver but still register as client components
- No priority hint for LCP element

**CLS Issues:**
- WordRotator reserves space with `minWidth: ${longest.length}ch` — good
- CountUp renders `0` then animates — acceptable with proper font metrics

**INP Issues:**
- Header search filters entire `socialTools` array on every keystroke (up to 70+ tools)
- Search runs `toLowerCase()` + string matching synchronously

**Bundle Concerns:**
- Homepage imports ALL animation components (CountUp, Reveal, PlatformMarquee, WordRotator)
- Imports `socialTools` array (70+ items) and `aiDirectoryTools` — not tree-shaken

---

### `/tools/construction/concrete-calculator` — **CRITICAL**
**LCP element:** H1 "Concrete Calculator" (blocked until hydration)

**LCP Issues:**
- `"use client"` at top — entire page is client-rendered
- No static shell — browser sees blank until JS loads
- No ` Suspense` boundary or loading fallback
- RelatedCategoryTools loads synchronously — blocks paint

**CLS Issues:**
- FAQ accordion expands/collapses without reserved space — **CLS violation**
- Results panel is sticky — safe

**INP Issues:**
- `useMemo` for calculations — good
- But 6 state variables (`unit`, `shape`, `length`, `width`, `depth`, `waste`) all trigger re-renders
- Every keystroke in number fields triggers full component re-render
- No `useDeferredValue` or `useTransition` for input throttling

**Bundle Concerns:**
- Imports Header, Footer, Breadcrumbs (all client components)
- No dynamic imports for below-fold content (FAQ section, Related tools)

---

### `/tools/construction/roofing-calculator` — **CRITICAL**
**LCP element:** H1 + complex calculator UI

**LCP Issues:**
- `"use client"` — 1108 lines of client-side code
- PDF export logic (`jspdf`) imported synchronously — **massive bundle bloat**
- `handleDownloadPDF` function embedded in component — parsed on every render

**CLS Issues:**
- Dynamic roof section addition/removal causes layout shift
- Material costs panel expands/collapses without reserved height
- "Add Section" button is below-fold content pushed down by results

**INP Issues:**
- Each section has 10+ input fields — all synchronous `onChange`
- `totals` calculation runs on every keystroke through `useMemo`
- No input debouncing

**Bundle Concerns:**
- **MAJOR:** `jspdf` imported statically — adds ~70KB gzipped
- Should be: `const { jsPDF } = await import("jspdf")` on button click only

---

### `/tools/construction/flooring-calculator` — **CRITICAL**
Same pattern as roofing calculator with PDF export bundle bloat.

---

### `/tools/health-fitness/bmi-calculator` — **CRITICAL**
**LCP element:** H1 + calculator form

**LCP Issues:**
- `"use client"` — same hydration-blocking pattern
- Result panel shows placeholder text "Enter your height..." until input — this is acceptable but delays LCP

**CLS Issues:**
- BMI range bar appears/disappears based on result — **CLS risk**
- FAQ accordion same issue as concrete calculator

**INP Issues:**
- Height/weight inputs update state synchronously on every keystroke
- `useMemo` for result calculation — good, but state updates still trigger renders

---

### `/tools/tweet-generator` — **CRITICAL**
**LCP element:** H1 + tweet preview

**LCP Issues:**
- `"use client"` with `html2canvas` loaded synchronously — **massive bundle impact**
- 979 lines of client code
- FileReader operations in render path

**CLS Issues:**
- Tweet images load without explicit dimensions (user-uploaded)
- Advanced settings panel expands/collapses
- Font size slider changes preview size — causes layout recalc

**INP Issues:**
- Every input (name, username, tweet text) updates state immediately
- `formatTweetText` runs regex replace on every keystroke
- Image upload uses FileReader synchronously

**Bundle Concerns:**
- **CRITICAL:** `html2canvas` should be dynamically imported ONLY when download is clicked
- Currently adds ~180KB+ to initial bundle

---

### `/ai-directory` — **MEDIUM RISK**
**LCP element:** H1 + tool grid

**LCP Issues:**
- `"use client"` — 496 lines of client code
- 178 tools rendered with staggered Reveal animation (delays up to 250ms)
- Filters re-render entire grid on every keystroke

**CLS Issues:**
- Review marquee scrolls content — acceptable with CSS-only animation
- Filter results count changes height slightly

**INP Issues:**
- Search filters through 178 tools with string concatenation + `toLowerCase()` on every keystroke
- `useMemo` dependency array includes `searchQuery` — recalculates on every keystroke

**Bundle Concerns:**
- All 178 tools loaded via `aiDirectoryTools` import — not virtualized
- Reviews marquee CSS animation may cause compositor issues on mobile

---

## Issue Table

| File | Issue | Metric Affected | Severity | Fix |
|------|-------|-----------------|----------|-----|
| `app/layout.tsx:127` | GoogleAnalytics component uses `afterInteractive` — loads after hydration, OK but web-vitals import blocks | LCP | Low | Move to `lazyOnload` |
| `app/layout.tsx:134` | AdSense `lazyOnload` — good | — | — | No change needed |
| `app/page.tsx:282` | WordRotator delays LCP with useEffect mount check | LCP | **Critical** | See Fix #1 |
| `app/page.tsx:344` | CountUp uses RAF animation — acceptable | — | — | No change |
| `components/Header.tsx:32` | Search filters entire tools array synchronously | INP | **High** | See Fix #2 |
| `components/Header.tsx:112` | Search input has no debounce | INP | Medium | Add debounce |
| `app/tools/construction/*/page.tsx:1` | All calculator pages are `"use client"` with no SSR shell | LCP | **Critical** | See Fix #3 |
| `app/tools/construction/roofing-calculator/page.tsx:299` | PDF export imports `jspdf` synchronously | Bundle/LCP | **Critical** | See Fix #4 |
| `app/tools/tweet-generator/page.tsx:170` | `html2canvas` imported synchronously | Bundle/LCP | **Critical** | See Fix #5 |
| `app/ai-directory/page.tsx:343` | 178 tools rendered without virtualization | INP | **High** | Add virtualization |
| `app/ai-directory/page.tsx:297` | Search filters 178 tools on every keystroke | INP | **High** | Add debounce + memoization |
| `components/RelatedCategoryTools.tsx:10` | Loads tools synchronously — blocks paint | LCP | Medium | See Fix #6 |
| Calculator pages | FAQ accordions have no reserved space | CLS | Medium | Add `min-height` |
| Calculator pages | Number inputs update state on every keystroke | INP | Medium | Add `useDeferredValue` |

---

## Quick Wins (Ordered by Impact/Effort)

| Fix | File | Change | Expected Impact | Time |
|-----|------|--------|-----------------|------|
| **1. Dynamic import jspdf** | `roofing-calculator/page.tsx` | Move `jspdf` to dynamic import on button click | -70KB bundle, faster LCP | 5 min |
| **2. Dynamic import html2canvas** | `tweet-generator/page.tsx` | Move `html2canvas` to dynamic import | -180KB bundle, faster LCP | 5 min |
| **3. Add search debounce** | `Header.tsx:112` | Wrap search in 150ms debounce | Better INP | 10 min |
| **4. Add useDeferredValue to calculator inputs** | Calculator pages | Wrap input values in `useDeferredValue` | Better INP | 10 min |
| **5. Add FAQ accordion min-height** | Calculator pages | Reserve space for FAQ content | Eliminate CLS | 5 min |
| **6. Virtualize AI directory grid** | `ai-directory/page.tsx` | Add react-window or similar | Better INP for 178 items | 30 min |
| **7. Optimize WordRotator** | `WordRotator.tsx` | Remove mount delay, use CSS animation | Faster LCP on homepage | 15 min |
| **8. Split calculator pages** | Calculator pages | Extract static layout to server component | Dramatic LCP improvement | 45 min |
| **9. Add preconnect hints** | `layout.tsx` | Already present — verify working | Faster TTFB | — |
| **10. Lazy load RelatedCategoryTools** | Calculator pages | Dynamic import below fold | Better LCP | 10 min |

---

## Bundle Analysis Estimates

Based on package.json and code analysis:

| Library | Current Import | Size (gzipped) | Should Be | Savings |
|---------|---------------|----------------|-----------|---------|
| jspdf | Static in calculators | ~70KB | Dynamic on click | 70KB |
| html2canvas | Static in tweet-generator | ~180KB | Dynamic on download | 180KB |
| pdf-lib | (not analyzed) | ~50KB | Dynamic if used | 50KB |
| lucide-react | Full icons imported | ~15KB | Tree-shake specific icons | 5KB |
| **Total Potential** | | **~300KB+** | | **~300KB** |

For 290 pages, this is likely **150-250KB per page** of unnecessary JavaScript blocking hydration.

---

## Netlify-Specific Performance

| Configuration | Status | Notes |
|---------------|--------|-------|
| Static asset caching | ✅ Good | `/_next/static/*` has `max-age=31536000, immutable` |
| HTML caching | ✅ Good | `max-age=0, must-revalidate` for HTML |
| Brotli compression | ✅ Enabled by default | Verify in Network tab |
| Next.js image optimization | ⚠️ Check | `remotePatterns: []` — no external images optimized |
| Edge functions | ❌ Not used | Could move API routes to edge for cold start reduction |

---

## Font Loading Analysis

| Aspect | Status | Notes |
|--------|--------|-------|
| `next/font/google` | ✅ Used correctly | Geist + Geist_Mono with `preload: true` |
| `display: swap` | ✅ Set | Fonts use `display: swap` |
| `adjustFontFallback` | ❌ Not set | Should add for reduced CLS |
| Preconnect hints | ✅ Present | `fonts.googleapis.com` and `fonts.gstatic.com` |

---

## Recommendations Summary

### Immediate (This Week)
1. Convert all calculator PDF exports to dynamic imports — **massive bundle savings**
2. Add debounce to Header search — **INP improvement**
3. Add `min-height` to FAQ accordions — **CLS fix**

### Short-term (Next 2 Weeks)
4. Virtualize AI directory listing
5. Refactor calculator pages to use server components for layout
6. Add `useDeferredValue` to calculator inputs

### Medium-term (Next Month)
7. Implement proper loading skeletons for tool pages
8. Add resource hints for critical above-fold content
9. Consider pre-rendering popular calculator pages at build time

---

## Appendix: Critical Code Patterns Found

### Pattern 1: Synchronous heavy library import (ANTI-PATTERN)
```typescript
// BAD — in roofing-calculator/page.tsx
import { jsPDF } from "jspdf"; // Adds 70KB to bundle

const handleDownloadPDF = () => {
  const doc = new jsPDF(); // Only used on button click
};
```

### Pattern 2: No debounced search (ANTI-PATTERN)
```typescript
// BAD — in Header.tsx:114
onChange={(e) => {
  setSearchQuery(e.target.value); // Runs on every keystroke
  setIsSearchOpen(e.target.value.length > 0);
}}
```

### Pattern 3: Full client-side calculator (ANTI-PATTERN)
```typescript
// BAD — All calculator pages
"use client"; // Entire page is client-rendered

export default function CalculatorPage() {
  // 400+ lines of client code
  // No server-rendered shell
}
```

---

*End of Audit Report*
