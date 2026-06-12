"use client";

import { useCallback, useState } from "react";
import { Replace, Upload, Download, Loader2 } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolHero from "@/components/ToolHero";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import ToolContentSection from "@/components/ToolContentSection";
import { ToolComments } from "@/components/ToolComments";

type Format = "image/png" | "image/jpeg" | "image/webp";

const FORMATS: { value: Format; label: string; ext: string }[] = [
  { value: "image/png", label: "PNG (lossless)", ext: "png" },
  { value: "image/jpeg", label: "JPG (smaller)", ext: "jpg" },
  { value: "image/webp", label: "WebP (smallest)", ext: "webp" },
];

function formatBytes(b: number): string {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImageConverterPage() {
  const tool = getToolById("image-converter");
  const [source, setSource] = useState<File | null>(null);
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);
  const [target, setTarget] = useState<Format>("image/webp");
  const [quality, setQuality] = useState(85);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFile = useCallback((f: File | null) => {
    setError(null);
    setResult(null);
    if (!f) {
      setSource(null);
      setSourceUrl(null);
      return;
    }
    if (!f.type.startsWith("image/")) {
      setError("Please choose a PNG, JPG, or WebP image.");
      return;
    }
    setSource(f);
    const reader = new FileReader();
    reader.onload = (e) => setSourceUrl(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const convert = async () => {
    if (!source || !sourceUrl) return;
    setBusy(true);
    setError(null);
    try {
      const img = new Image();
      img.src = sourceUrl;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image."));
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported in this browser.");

      if (target === "image/jpeg") {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);

      const q = target === "image/png" ? undefined : quality / 100;
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, target, q));
      if (!blob) throw new Error("Conversion returned no data.");
      setResult({ blob, url: URL.createObjectURL(blob) });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed.");
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!result || !source) return;
    const ext = FORMATS.find((f) => f.value === target)?.ext ?? "png";
    const base = source.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `${base}.${ext}`;
    a.click();
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <ToolHero
        toolId={tool?.id}
        icon={Replace}
        iconGradient="from-indigo-500 to-violet-500"
        title="Image Format Converter — PNG, JPG, WebP, Free in Your Browser"
        description="Convert between PNG, JPG, and WebP with full quality control. Everything runs in your browser — no file upload, no watermark, no signup."
        shareTitle="Image Format Converter"
        shareText="Free PNG, JPG, WebP image converter — runs entirely in the browser."
      />
      <div className="p-8 max-w-5xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <label className="block border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-500 transition">
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => onFile(e.target.files?.[0] ?? null)}
              className="hidden"
            />
            <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {source ? source.name : "Click or drop any PNG, JPG, or WebP image"}
            </p>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Convert to</label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value as Format)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg"
              >
                {FORMATS.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>
            {target !== "image/png" && (
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
                  className="w-full accent-indigo-500"
                />
              </div>
            )}
            {target === "image/jpeg" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                  Background (transparent areas)
                </label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-10 w-20"
                />
              </div>
            )}
          </div>

          <button
            onClick={convert}
            disabled={!source || busy}
            className="w-full mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition flex items-center justify-center gap-2"
          >
            {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : <Replace className="w-5 h-5" />}
            {busy ? "Converting..." : "Convert"}
          </button>

          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
        </div>

        {result && source && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-indigo-300 dark:border-indigo-700 p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Converted image</h2>
              <button onClick={download} className="px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-sm flex items-center gap-2">
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={result.url} alt="Converted image preview in chosen format" className="w-full rounded-lg" />
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">
              Original: {formatBytes(source.size)} → Converted: {formatBytes(result.blob.size)}
            </p>
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
