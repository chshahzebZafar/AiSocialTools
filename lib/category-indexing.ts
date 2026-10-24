import { aiDirectoryTools, type AIDirectoryTool } from "@/lib/ai-directory";
import { getPublishedTools } from "@/lib/directory-store";
import { directoryCategories, MIN_TOOLS_TO_INDEX } from "@/lib/directory-categories";

/**
 * Which tools a directory category holds, and whether that is enough to index.
 *
 * This exists because the page and the sitemap had each grown their own answer
 * and quietly disagreed. The page counted curated tools plus the live Supabase
 * ones plus anything listing the category as a subcategory; the sitemap counted
 * curated tools alone. So /ai-directory/category/ai-agents-automation served
 * "index, follow" with fifteen tools on it while being absent from the sitemap
 * - Google was told to index a page it was never pointed at.
 *
 * Both now read these two functions. They cannot drift again without someone
 * deliberately changing this file.
 *
 * Note this is async and hits the store: the live tool set changes when a
 * submission is approved in /admin, and a category that crosses the threshold
 * should start being advertised without waiting for a deploy.
 */
export async function toolsInCategory(name: string): Promise<AIDirectoryTool[]> {
  const curated = aiDirectoryTools.filter(
    (t) => t.approved && (t.category === name || t.subcategories?.includes(name as never))
  );
  const live = (await getPublishedTools()).filter((t) => t.category === name);
  const taken = new Set(curated.map((t) => t.slug));
  return [...curated, ...live.filter((t) => !taken.has(t.slug))];
}

/**
 * The category slugs worth advertising to Google, by the same threshold the
 * pages themselves apply.
 */
export async function indexableCategorySlugs(): Promise<string[]> {
  const out: string[] = [];
  for (const c of directoryCategories) {
    const tools = await toolsInCategory(c.name);
    if (tools.length >= MIN_TOOLS_TO_INDEX) out.push(c.slug);
  }
  return out;
}
