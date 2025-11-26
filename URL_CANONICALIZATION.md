# URL Canonicalization Setup

This document outlines the URL canonicalization strategy implemented for the Social Media Tools website.

## Primary URL Format

**Preferred URL:** `https://socialmediatools.netlify.app` (without trailing slash, HTTPS)

## Redirect Rules Implemented

### 1. Next.js Redirects (`next.config.ts`)

- **Trailing Slash Removal**: All URLs with trailing slashes (except root `/`) are redirected to non-trailing versions
  - Example: `/tools/` → `/tools`
  - Status: 301 (Permanent Redirect)

### 2. Netlify Redirects (`netlify.toml`)

- **HTTP to HTTPS**: All HTTP requests are redirected to HTTPS
  - Example: `http://socialmediatools.netlify.app/*` → `https://socialmediatools.netlify.app/*`
  - Status: 301 (Permanent Redirect)

- **Trailing Slash Removal**: Backup redirect for trailing slashes
  - Example: `/:path+/` → `/:path+`
  - Status: 301 (Permanent Redirect)

## Canonical URLs

All pages have canonical URLs set in their metadata to prevent duplicate content issues:

### Static Pages
- Homepage: `https://socialmediatools.netlify.app`
- Tools: `https://socialmediatools.netlify.app/tools`
- About: `https://socialmediatools.netlify.app/about`
- Contact: `https://socialmediatools.netlify.app/contact`
- FAQ: `https://socialmediatools.netlify.app/faq`
- Privacy: `https://socialmediatools.netlify.app/privacy`
- Terms: `https://socialmediatools.netlify.app/terms`
- Author: `https://socialmediatools.netlify.app/author`

### Dynamic Pages
- Tool Pages: `https://socialmediatools.netlify.app/tools/{tool-id}`
- Tool Review Pages: `https://socialmediatools.netlify.app/tools/{id}`

## Implementation Details

### Files Modified

1. **`next.config.ts`**
   - Added `redirects()` function to handle trailing slash removal

2. **`netlify.toml`**
   - Created new file with redirect rules for Netlify deployment
   - Includes HTTP to HTTPS redirects
   - Includes security headers

3. **All Page Files**
   - Canonical URLs are set in metadata using `alternates.canonical`
   - All URLs follow the format: `https://socialmediatools.netlify.app{path}` (no trailing slash)

## Benefits

1. **SEO Improvement**: Prevents duplicate content penalties
2. **Consistent URLs**: All variations redirect to preferred format
3. **Better Indexing**: Search engines understand the preferred URL
4. **User Experience**: Users always land on the canonical URL
5. **Link Equity**: Consolidates link signals to one URL

## Testing

To verify redirects are working:

1. Test trailing slash redirects:
   - Visit `https://socialmediatools.netlify.app/tools/`
   - Should redirect to `https://socialmediatools.netlify.app/tools`

2. Test HTTP to HTTPS:
   - Visit `http://socialmediatools.netlify.app`
   - Should redirect to `https://socialmediatools.netlify.app`

3. Check canonical tags:
   - View page source
   - Verify `<link rel="canonical">` tag points to preferred URL

## Maintenance

- When adding new pages, ensure canonical URLs are set
- Always use the format: `https://socialmediatools.netlify.app{path}` (no trailing slash)
- Update this document if URL structure changes

