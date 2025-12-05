"use client";

import { useState, useRef } from "react";
import { Maximize2, Upload, Download } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";
import { ToolComments } from "@/components/ToolComments";

interface PlatformSize {
  name: string;
  width: number;
  height: number;
}

const platformSizes: PlatformSize[] = [
  { name: "Instagram Post", width: 1080, height: 1080 },
  { name: "Instagram Story", width: 1080, height: 1920 },
  { name: "Instagram Reel", width: 1080, height: 1920 },
  { name: "Facebook Post", width: 1200, height: 630 },
  { name: "Twitter/X Post", width: 1200, height: 675 },
  { name: "LinkedIn Post", width: 1200, height: 627 },
  { name: "Pinterest Pin", width: 1000, height: 1500 },
  { name: "YouTube Thumbnail", width: 1280, height: 720 },
  { name: "TikTok Video", width: 1080, height: 1920 },
];

export default function ImageResizerPage() {
  const tool = getToolById("image-resizer");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [image, setImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState(platformSizes[0]);
  const [customWidth, setCustomWidth] = useState(1080);
  const [customHeight, setCustomHeight] = useState(1080);
  const [useCustom, setUseCustom] = useState(false);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResizedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeImage = async () => {
    if (!image) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = image;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const targetWidth = useCustom ? customWidth : selectedSize.width;
    const targetHeight = useCustom ? customHeight : selectedSize.height;

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
    const resized = canvas.toDataURL("image/png");
    setResizedImage(resized);
  };

  const downloadImage = () => {
    if (!resizedImage) return;
    const a = document.createElement("a");
    a.href = resizedImage;
    a.download = `resized-${useCustom ? `${customWidth}x${customHeight}` : selectedSize.name.replace(/\s+/g, "-")}.png`;
    a.click();
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
            <Maximize2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">Social Media Image Resizer - Resize Images for Instagram, Facebook Free</h1>
            <p className="text-slate-600">Resize images for Instagram, Facebook, Twitter, LinkedIn, and more. Free social media image resizer with platform-specific dimensions. Optimize images for social media instantly.</p>
          </div>
        </div>
        <div className="mt-4">
          <ShareButtons
            title="Social Media Image Resizer"
            text="Check out this free image resizer tool!"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            {!image ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center cursor-pointer hover:border-orange-500 transition-colors"
              >
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 mb-2">Click to upload an image</p>
                <p className="text-sm text-slate-500">PNG, JPG, or WEBP up to 10MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden border border-slate-200">
                  <img src={image} alt="Original uploaded image for resizing" className="w-full" />
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Change Image
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={useCustom}
                onChange={(e) => setUseCustom(e.target.checked)}
                className="w-4 h-4"
              />
              <label className="text-sm font-medium text-slate-700">Use Custom Size</label>
            </div>

            {useCustom ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Width</label>
                  <input
                    type="number"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Height</label>
                  <input
                    type="number"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Platform Size
                </label>
                <select
                  value={selectedSize.name}
                  onChange={(e) => {
                    const size = platformSizes.find(s => s.name === e.target.value);
                    if (size) setSelectedSize(size);
                  }}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  {platformSizes.map((size) => (
                    <option key={size.name} value={size.name}>
                      {size.name} ({size.width} × {size.height})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={resizeImage}
              disabled={!image}
              className="w-full mt-4 bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Resize Image
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Resized Image</h2>
          {resizedImage ? (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center p-4">
                <img
                  src={resizedImage}
                  alt={`Resized image for ${useCustom ? `${customWidth} × ${customHeight}` : selectedSize.name} social media platform`}
                  className="max-w-full max-h-96"
                />
              </div>
              <button
                onClick={downloadImage}
                className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Resized Image
              </button>
              <p className="text-xs text-slate-500 text-center">
                Size: {useCustom ? `${customWidth} × ${customHeight}` : `${selectedSize.width} × ${selectedSize.height}`}px
              </p>
            </div>
          ) : (
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
              <p className="text-slate-400">Resized image will appear here</p>
            </div>
          )}
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

