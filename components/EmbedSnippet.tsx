"use client";

import { useState } from "react";
import { Check, Copy, Code2 } from "lucide-react";

const SITE = "https://aisocialtools.co";

interface EmbedSnippetProps {
  /** path under /embed, e.g. "engagement-calculator" */
  embedId: string;
  /** canonical tool page path, e.g. "/tools/engagement-calculator" */
  toolPath: string;
  /** anchor text for the attribution link on the host page */
  linkText: string;
  /** iframe height in px */
  height?: number;
}

/**
 * Renders a copy-paste embed snippet for a tool.
 *
 * The attribution <a> is deliberately OUTSIDE the iframe. An iframe on its own
 * is not a backlink — search engines treat framed content as a separate
 * document, not as a link from the host page. The anchor beneath it is the part
 * that actually earns the link, so it is included in the snippet by default
 * rather than offered as an afterthought.
 */
export default function EmbedSnippet({
  embedId,
  toolPath,
  linkText,
  height = 420,
}: EmbedSnippetProps) {
  const [copied, setCopied] = useState(false);

  const snippet = `<iframe src="${SITE}/embed/${embedId}" width="100%" height="${height}" style="border:1px solid #e4e4e7;border-radius:8px;max-width:680px" loading="lazy" title="${linkText}"></iframe>
<p style="font-size:12px;color:#71717a;max-width:680px">Powered by <a href="${SITE}${toolPath}">${linkText}</a> from AI Social Tools</p>`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (insecure context, permissions). The textarea
      // below is selectable, so the user can still copy manually.
      setCopied(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-8 pb-12">
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
        <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
          <div>
            <h2 className="text-lg font-semibold text-zinc-950 tracking-tight flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Embed this calculator
            </h2>
            <p className="text-sm text-zinc-600 mt-1 max-w-xl">
              Free to use on your own site. Paste this where you want the
              calculator to appear — it works on any page, no account needed.
            </p>
          </div>
          <button
            onClick={copy}
            className="inline-flex items-center gap-2 h-9 px-3 text-sm font-medium rounded-md border border-zinc-300 bg-white text-zinc-700 hover:text-zinc-950 hover:border-zinc-400 transition-colors shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copy code
              </>
            )}
          </button>
        </div>

        <textarea
          readOnly
          value={snippet}
          rows={5}
          onFocus={(e) => e.currentTarget.select()}
          className="w-full font-mono text-[11px] leading-relaxed p-3 rounded-md border border-zinc-300 bg-white text-zinc-800 resize-y"
          aria-label="Embed code"
        />

        <p className="text-xs text-zinc-500 mt-3">
          Please keep the attribution line — it is the only thing we ask in
          return, and it is what keeps the tool free.
        </p>
      </div>
    </section>
  );
}
