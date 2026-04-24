"use client";

import { useCallback, useState } from "react";
import { Bookmark, Upload, Download, Copy, Check, Loader2 } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import ToolContentSection from "@/components/ToolContentSection";
import { ToolComments } from "@/components/ToolComments";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

const SIZES: { size: number; filename: string; label: string }[] = [
  { size: 16, filename: "favicon-16x16.png", label: "Browser tab" },
  { size: 32, filename: "favicon-32x32.png", label: "Browser tab (HD)" },
  { size: 48, filename: "favicon-48x48.png", label: "Windows site" },
  { size: 180, filename: "apple-touch-icon.png", label: "iOS home screen" },
  { size: 192, filename: "android-chrome-192x192.png", label: "Android / PWA" },
  { size: 512, filename: "android-chrome-512x512.png", label: "PWA splash" },
];

const HTML_SNIPPET = `<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">`;

export default function FaviconGeneratorPage() {
  const tool = getToolById("favicon-generator");
  const [source, setSource] = useState<string | null>(null);
  const [generated, setGenerated] = useState<Record<number, string>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const onFile = useCallback((f: File | null) => {
    setError(null);
    setGenerated({});
    if (!f) {
      setSource(null);
      return;
    }
    if (!f.type.startsWith("image/")) {
      setError("Please choose a PNG, JPG, or WebP image.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setSource(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const generate = async () => {
    if (!source) return;
    setBusy(true);
    setError(null);
    try {
      const img = new Image();
      img.src = source;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load source image."));
      });

      const out: Record<number, string> = {};
      for (const { size } of SIZES) {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas not supported.");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, size, size);
        out[size] = canvas.toDataURL("image/png");
      }
      setGenerated(out);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed.");
    } finally {
      setBusy(false);
    }
  };

  const downloadOne = (dataUrl: string, filename: string) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    a.click();
  };

  const copySnippet = async () => {
    await navigator.clipboard.writeText(HTML_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
              <Bookmark className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Favicon Generator — Free Multi-Size Favicon Maker
              </h1>
              <p className="text-slate-600 dark:text-slate-300">
                Upload any image, generate a full favicon pack (16×16 to 512×512) for browsers, iOS, Android, and PWAs, and grab the HTML snippet to paste in your site&rsquo;s head.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            {tool && <FavoriteButton toolId={tool.id} />}
            <ShareButtons title="Favicon Generator" text="Free favicon generator with every size + HTML snippet." />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <label className="block border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center cursor-pointer hover:border-amber-500 transition">
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={(e) => onFile(e.target.files?.[0] ?? null)}
              className="hidden"
            />
            <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {source ? "Image loaded — ready to generate" : "Click or drop a square image (PNG, JPG, WebP, SVG), ideally 512×512+"}
            </p>
          </label>

          <button
            onClick={generate}
            disabled={!source || busy}
            className="w-full mt-6 bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 disabled:opacity-50 transition flex items-center justify-center gap-2"
          >
            {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : <Bookmark className="w-5 h-5" />}
            {busy ? "Generating..." : "Generate favicon pack"}
          </button>

          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
        </div>

        {Object.keys(generated).length > 0 && (
          <>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Favicon pack</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {SIZES.map(({ size, filename, label }) => (
                  <div key={size} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex flex-col items-center text-center">
                    <div className="bg-slate-100 dark:bg-slate-900 rounded p-2 mb-2 flex items-center justify-center" style={{ width: 72, height: 72 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={generated[size]} alt={`Favicon preview ${size} by ${size} pixels`} style={{ width: Math.min(size, 64), height: Math.min(size, 64) }} />
                    </div>
                    <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">{size} × {size}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{label}</p>
                    <button
                      onClick={() => downloadOne(generated[size], filename)}
                      className="text-xs px-3 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" /> {filename}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Paste this into your &lt;head&gt;</h3>
                <button onClick={copySnippet} className="text-xs px-3 py-1 rounded border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-1">
                  {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="bg-slate-900 text-slate-100 text-xs p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">{HTML_SNIPPET}</pre>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Upload all downloaded PNGs to your site&rsquo;s root (or /public folder for Next.js).
              </p>
            </div>
          </>
        )}

        {tool && <ToolComments toolId={tool.id} />}
        {tool && <ToolFAQ tool={tool} />}
        {tool && <RelatedTools currentTool={tool} />}
        {tool && <ToolContentSection tool={tool} />}
        {tool && <ToolDetailsSection tool={tool} />}
      </div>
    </>
  );
}
