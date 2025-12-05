# Tool Page Template for Future Tools

This guide shows how to create new tool pages with all required components, including the FavoriteButton.

## Required Imports

```typescript
"use client";

import { useState } from "react";
import { IconName } from "lucide-react"; // Replace with actual icon
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton"; // ⭐ REQUIRED
```

## Page Structure Template

```typescript
export default function YourToolPage() {
  const tool = getToolById("your-tool-id"); // ⭐ Use your tool ID from social-tools.ts
  const seo = tool ? getSEOMetadata(tool) : null;
  // ... your state variables

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <YourIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900">
                Your Tool Name - Description
              </h1>
              <p className="text-slate-600">
                Your tool description for SEO and user understanding.
              </p>
            </div>
          </div>
          
          {/* ⭐ REQUIRED: FavoriteButton + ShareButtons */}
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            {tool && <FavoriteButton toolId={tool.id} />}
            <ShareButtons
              title="Your Tool Name"
              text="Check out this free tool!"
            />
          </div>
        </div>

        {/* Your Tool Content */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          {/* Your tool UI here */}
        </div>

        {/* Required Components at Bottom */}
        {tool && <ToolComments toolId={tool.id} />}
        {tool && <ToolFAQ tool={tool} />}
        {tool && <RelatedTools currentTool={tool} />}
        {tool && <ToolDetailsSection tool={tool} />}
      </div>
    </>
  );
}
```

## Key Points

### 1. FavoriteButton Placement
- **Always** add `FavoriteButton` next to `ShareButtons`
- Use: `{tool && <FavoriteButton toolId={tool.id} />}`
- Place in a flex container: `className="flex items-center gap-3 flex-wrap"`

### 2. Tool ID
- Get tool ID from `getToolById("your-tool-id")`
- Make sure the tool is defined in `lib/social-tools.ts`
- Use `tool.id` (not hardcoded string) for FavoriteButton

### 3. Required Components
Every tool page must include:
- ✅ `ToolSEO` - For SEO metadata
- ✅ `FavoriteButton` - For favorites feature
- ✅ `ShareButtons` - For social sharing
- ✅ `ToolComments` - For user comments
- ✅ `ToolFAQ` - For FAQ section
- ✅ `RelatedTools` - For related tool suggestions
- ✅ `ToolDetailsSection` - For tool details

### 4. Layout File
Don't forget to create `layout.tsx`:

```typescript
import { generateMetadataForTool } from "@/lib/seo-metadata";
import { getToolById } from "@/lib/social-tools";
import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = generateMetadataForTool(getToolById("your-tool-id")!);

export default function YourToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ToolLayout>{children}</ToolLayout>;
}
```

## Example: Complete Tool Page

See `app/tools/hashtag-generator/page.tsx` or `app/tools/tweet-generator/page.tsx` for complete examples.

## Checklist for New Tools

- [ ] Tool added to `lib/social-tools.ts` with unique ID
- [ ] Tool page created at `app/tools/{tool-id}/page.tsx`
- [ ] Layout file created at `app/tools/{tool-id}/layout.tsx`
- [ ] FavoriteButton imported and added
- [ ] ShareButtons added
- [ ] All required components included (ToolSEO, ToolComments, ToolFAQ, etc.)
- [ ] SEO metadata added to `lib/seo-metadata.ts`
- [ ] Tool tested and working

## Notes

- The FavoriteButton automatically handles login requirements
- Users must be logged in to add favorites
- Favorites appear in the sidebar under "Favorite Tools"
- All tool pages use the same ToolLayout which includes the sidebar

