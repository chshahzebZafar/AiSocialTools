"""Build public/ai-directory-index.json from data/ai-directory-import.json.

The index is the searchable listing for imported (unreviewed) directory tools.
It is served statically and fetched on demand by /ai-directory.

Anything listed in data/directory-blocklist.json is excluded, matched by slug
AND by domain - so a blocked tool cannot return under a new slug through a
future re-import.

Usage (from the repo root):
    py -3 scripts/build-directory-index.py
"""
import json
import os
import sys
from urllib.parse import urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'data', 'ai-directory-import.json')
BLOCK = os.path.join(ROOT, 'data', 'directory-blocklist.json')
OUT = os.path.join(ROOT, 'public', 'ai-directory-index.json')


def domain(url):
    host = urlparse((url or '').strip()).netloc.lower()
    return host[4:] if host.startswith('www.') else host


def main():
    entries = json.load(open(SRC, encoding='utf-8'))
    blocked_slugs, blocked_domains = set(), set()
    if os.path.exists(BLOCK):
        for b in json.load(open(BLOCK, encoding='utf-8'))['entries']:
            blocked_slugs.add(b['slug'])
            if b.get('domain'):
                blocked_domains.add(b['domain'])

    # Positional format: repeating six JSON keys 19k times costs more than the
    # data, so categories and pricing are lookup tables and each tool is a flat
    # array [name, tagline, url, categoryIndex, pricingIndex].
    cats, prices, cat_ix, price_ix = [], [], {}, {}

    def idx(value, table, lookup):
        v = (value or '').strip()
        if v not in lookup:
            lookup[v] = len(table)
            table.append(v)
        return lookup[v]

    tools, skipped = [], 0
    for e in entries:
        name = (e.get('name') or '').strip()
        url = (e.get('url') or '').strip()
        if not name or not url:
            continue
        if e.get('slug') in blocked_slugs or domain(url) in blocked_domains:
            skipped += 1
            continue
        tools.append([name, (e.get('tagline') or '').strip(), url,
                      idx(e.get('category'), cats, cat_ix),
                      idx(e.get('pricing'), prices, price_ix)])

    payload = {
        'v': 1,
        'note': 'Imported directory index. Listing data only - no detail pages.',
        'categories': cats,
        'pricing': prices,
        'tools': tools,
    }
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(payload, f, ensure_ascii=False, separators=(',', ':'))

    print(f"index written: {len(tools)} tools ({skipped} excluded by blocklist) -> {OUT}")
    return 0


if __name__ == '__main__':
    sys.exit(main())
