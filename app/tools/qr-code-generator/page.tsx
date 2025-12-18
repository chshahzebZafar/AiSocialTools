"use client";

import { useState } from "react";
import { QrCode, Download, Copy } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

export default function QRCodeGeneratorPage() {
  const tool = getToolById("qr-code-generator");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [url, setUrl] = useState("https://example.com");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("M");

  const downloadQR = () => {
    const svg = document.getElementById("qrcode-svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D | null;
    if (!ctx) return;
    const img = new Image();

    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "qrcode.png";
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const copyQR = async () => {
    const svg = document.getElementById("qrcode-svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const item = new ClipboardItem({ "image/svg+xml": blob });
    
    try {
      await navigator.clipboard.write([item]);
      alert("QR code copied to clipboard!");
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Failed to copy:", err);
      }
      alert("Failed to copy QR code. Try downloading instead.");
    }
  };

  const presetLinks = [
    { name: "Instagram", url: "https://instagram.com/yourusername" },
    { name: "Twitter", url: "https://twitter.com/yourusername" },
    { name: "Facebook", url: "https://facebook.com/yourusername" },
    { name: "LinkedIn", url: "https://linkedin.com/in/yourusername" },
    { name: "YouTube", url: "https://youtube.com/@yourusername" },
    { name: "TikTok", url: "https://tiktok.com/@yourusername" },
  ];

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
            <QrCode className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">Free QR Code Generator - Create QR Codes for Social Media Links</h1>
            <p className="text-slate-600">Generate QR codes for Instagram, Twitter, Facebook, and any URL. Free QR code generator with customizable colors and sizes. Download QR codes as PNG. Perfect for social media marketing.</p>
          </div>
        </div>
        <div className="mt-4">
          <ShareButtons
            title="Free QR Code Generator"
            text="Check out this free QR code generator tool!"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              URL or Text
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-4"
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Quick Links
              </label>
              <div className="grid grid-cols-2 gap-2">
                {presetLinks.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setUrl(preset.url)}
                    className="px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Size: {size}px
                </label>
                <input
                  type="range"
                  min="128"
                  max="512"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Error Correction
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as "L" | "M" | "Q" | "H")}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                >
                  <option value="L">Low (~7%)</option>
                  <option value="M">Medium (~15%)</option>
                  <option value="Q">Quartile (~25%)</option>
                  <option value="H">High (~30%)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Foreground Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-12 h-10 rounded border border-slate-300"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Background Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-12 h-10 rounded border border-slate-300"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">QR Code Preview</h2>
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-lg mb-4">
            <div id="qrcode-svg">
              <QRCodeSVG
                value={url || " "}
                size={size}
                fgColor={fgColor}
                bgColor={bgColor}
                level={level}
              />
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            <button
              onClick={downloadQR}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={copyQR}
              className="flex-1 bg-slate-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>
          <div className="pt-4 border-t border-slate-200 flex items-center gap-3 flex-wrap">
            {tool && <FavoriteButton toolId={tool.id} />}
            <ShareButtons
              title="QR Code Generator"
              text={`Check out this QR code I generated for: ${url}`}
            />
          </div>
        </div>
      </div>

      {tool && <ToolComments toolId={tool.id} />}
      {tool && <ToolFAQ tool={tool} />}
      {tool && <RelatedTools currentTool={tool} />}
      {tool && <ToolDetailsSection tool={tool} />}
    </div>
    </>
  );
}

