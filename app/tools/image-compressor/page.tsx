"use client";

import { useCallback, useState } from "react";
import { Minimize2, Upload, Download, Loader2 } from "lucide-react";
import imageCompression from "browser-image-compression";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolHero from "@/components/ToolHero";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import ToolContentSection from "@/components/ToolContentSection";
import { ToolComments } from "@/components/ToolComments";

function formatBytes(b: number): string {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImageCompressorPage() {
  const tool = getToolById("image-compressor");
  const [original, setOriginal] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [compressed, setCompressed] = useState<Blob | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState(75);
  const [maxSize, setMaxSize] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFile = useCallback((f: File | null) => {
    setError(null);
    setCompressed(null);
    setCompressedPreview(null);
    if (!f) {
      setOriginal(null);
      setOriginalPreview(null);
      return;
    }
    if (!f.type.startsWith("image/")) {
      setError("Please choose a JPG, PNG, or WebP image.");
      return;
    }
    setOriginal(f);
    const reader = new FileReader();
    reader.onload = (e) => setOriginalPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const compress = async () => {
    if (!original) return;
    setBusy(true);
    setError(null);
    try {
      const out = await imageCompression(original, {
        maxSizeMB: maxSize,
        useWebWorker: true,
        initialQuality: quality / 100,
        maxWidthOrHeight: 4096,
      });
      setCompressed(out);
      const reader = new FileReader();
      reader.onload = (e) => setCompressedPreview(e.target?.result as string);
      reader.readAsDataURL(out);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Compression failed.");
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!compressed || !original) return;
    const url = URL.createObjectURL(compressed);
    const a = document.createElement("a");
    const ext = original.name.split(".").pop() || "jpg";
    const base = original.name.replace(/\.[^.]+$/, "");
    a.href = url;
    a.download = `${base}-compressed.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const savedPct = original && compressed ? Math.max(0, Math.round((1 - compressed.size / original.size) * 100)) : 0;

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <ToolHero
        toolId={tool?.id}
        icon={Minimize2}
        iconGradient="from-emerald-500 to-green-600"
        title="Image Compressor — Free Browser-Side JPG, PNG & WebP Compression"
        description="Compress images without losing quality, right in your browser. Live quality control, instant before-and-after size comparison, and nothing is ever uploaded to a server."
        shareTitle="Image Compressor"
        shareText="Free browser-side image compressor. No uploads."
      />
      <div className="p-8 max-w-5xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <label className="block border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-500 transition">
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => onFile(e.target.files?.[0] ?? null)}
              className="hidden"
            />
            <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {original ? original.name : "Click or drop a JPG, PNG, or WebP image"}
            </p>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                Quality: <span className="font-bold">{quality}%</span>
              </label>
              <input
                type="range"
                min={10}
                max={100}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                Max output size (MB): <span className="font-bold">{maxSize}</span>
              </label>
              <input
                type="range"
                min={0.1}
                max={10}
                step={0.1}
                value={maxSize}
                onChange={(e) => setMaxSize(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>
          </div>

          <button
            onClick={compress}
            disabled={!original || busy}
            className="w-full mt-6 bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 transition flex items-center justify-center gap-2"
          >
            {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : <Minimize2 className="w-5 h-5" />}
            {busy ? "Compressing..." : "Compress image"}
          </button>

          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
        </div>

        {(originalPreview || compressedPreview) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {originalPreview && original && (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">Original</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={originalPreview} alt="Original uploaded image preview" className="w-full rounded-lg" />
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{formatBytes(original.size)}</p>
              </div>
            )}
            {compressedPreview && compressed && (
              <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-emerald-300 dark:border-emerald-700 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs uppercase tracking-wide text-emerald-700 dark:text-emerald-300 font-semibold">Compressed · {savedPct}% smaller</p>
                  <button onClick={download} className="text-xs px-2 py-1 rounded bg-emerald-600 text-white flex items-center gap-1 hover:bg-emerald-700">
                    <Download className="w-3 h-3" /> Download
                  </button>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={compressedPreview} alt="Compressed image preview" className="w-full rounded-lg" />
                <p className="text-sm text-emerald-700 dark:text-emerald-300 font-semibold mt-2">{formatBytes(compressed.size)}</p>
              </div>
            )}
          </div>
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
