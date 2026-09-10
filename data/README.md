# `data/` — staging data, not runtime data

## `ai-directory-import.json`

19,012 AI tools imported from `ai-directory-master-19k.csv` on 2026-09-10.

**Nothing in this file is live.** Every entry has `approved: false`, and no
application code imports this file. It exists so the data is in the repo and
ready to curate — not so it renders.

That is deliberate. Importing it into `lib/ai-directory.ts` would add roughly
575,000 lines to a file that is 5,500 today, and `generateStaticParams` would
try to prerender 19,000 pages.

### Read this before approving anything

The source data is thin. Measured across the file:

| | |
|---|---|
| Median description length | **11 words** |
| Rows under 20 words | 19,004 of 19,192 |
| Rows where `features` merely restated the description | **19,011 of 19,012** |
| Rows with `alternatives` | 178 |
| Rows with `addedAt` | 180 (the rest stamped with the import date) |

For comparison, the 181 curated entries in `lib/ai-directory.ts` average about
66 words — and Search Console already reports those as *"Crawled — currently
not indexed"*. Google looked at 66-word pages and declined them.

Publishing 19,000 pages at 11 words, where the title, tagline and description
are the same sentence, would be the same mistake at a hundred times the scale,
on a domain that currently has no inbound links and almost no crawl budget.

Pricing is also unreliable — e.g. `scrip-ai` has the tagline "Free AI writer…"
and `pricing: Paid`.

### Curation workflow

1. Pick candidates from this file — recognisable tools, or ones you have used.
2. Write a real description. Not the tagline again: what it does, who it is
   for, what is actually different about it.
3. Fill `features` with genuine features, and `pricingDetails` from the
   vendor's live pricing page.
4. Verify the URL resolves and the product matches the description.
5. Move the finished entry into `aiDirectoryTools` in `lib/ai-directory.ts`
   with `approved: true`, and delete it from this file.
6. Directory pages are currently `noindex` site-wide — see
   `app/ai-directory/[slug]/page.tsx` for why, and flip individual entries to
   `index: true` only once they carry original content.

Ten well-written entries will outperform ten thousand stubs. That is not a
style preference; it is what the Search Console data for this domain says.

### Related files

- `aisocialtools.co-audit/import-domain-collisions.csv` — 6 imported entries
  whose domain already appears under a different slug in the live directory.
  Check these before approving, they may be duplicates.
- `aisocialtools.co-audit/ai-directory-export.csv` — the 181 live entries.

### Note on `fathom-finance`

The source CSV was missing `fathom-finance`, which is live in
`lib/ai-directory.ts`. The import merges rather than replaces, so it was not
affected — but treat that file as a partial snapshot, not the source of truth.
