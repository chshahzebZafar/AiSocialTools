"use client";

import { useState, useRef } from "react";
import { Palette, Upload, Copy } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

export default function ColorPalettePage() {
  const tool = getToolById("color-palette");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        extractColors(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const extractColors = (imageSrc: string) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D | null;
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const colorMap = new Map<string, number>();

      // Sample pixels (every 10th pixel for performance)
      for (let i = 0; i < data.length; i += 40) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a < 128) continue; // Skip transparent pixels

        const color = `#${[r, g, b].map(x => x.toString(16).padStart(2, "0")).join("")}`;
        colorMap.set(color, (colorMap.get(color) || 0) + 1);
      }

      // Get top 8 most common colors
      const sortedColors = Array.from(colorMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([color]) => color);

      setColors(sortedColors);
    };
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    alert(`Copied: ${color}`);
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">Color Palette Generator - Extract Colors from Images Free</h1>
            <p className="text-slate-600">Extract color palettes from images for branding and design. Free color palette generator. Get dominant colors from photos. Perfect for social media branding.</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          {tool && <FavoriteButton toolId={tool.id} />}
          <ShareButtons
            title="Color Palette Generator"
            text="Check out this free color palette generator tool!"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            {!image ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center cursor-pointer hover:border-purple-500 transition-colors"
              >
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 mb-2">Click to upload an image</p>
                <p className="text-sm text-slate-500">PNG, JPG, or WEBP</p>
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
                  <img src={image} alt="Uploaded image for color palette extraction" className="w-full" />
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
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Color Palette</h2>
          {colors.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => copyColor(color)}
                >
                  <div
                    className="h-24 w-full"
                    style={{ backgroundColor: color }}
                  />
                  <div className="p-3 bg-slate-50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-900">{color}</span>
                      <Copy className="w-4 h-4 text-slate-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
              <p className="text-slate-400">Upload an image to extract colors</p>
            </div>
          )}
        </div>
      </div>

      {/* SEO content section */}
      <div className="mt-12 pt-10 border-t border-slate-200 max-w-3xl space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">How to Extract a Color Palette from an Image</h2>
          <p className="text-slate-600 leading-relaxed">
            Upload any PNG, JPG, or WebP image and the tool samples pixels across the image to identify the
            8 most dominant colors. Each color is returned as a hex code you can copy with one click —
            ready to paste into Figma, CSS, Canva, or your brand style guide.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Common Use Cases</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Brand color extraction", body: "Upload a logo or product photo to pull exact brand hex codes for use across social media graphics." },
              { title: "Competitor analysis", body: "Extract the color palette from a competitor's website screenshot to understand their visual strategy." },
              { title: "Social media consistency", body: "Match your post colors to your brand palette to create a cohesive, recognizable Instagram or Pinterest feed." },
              { title: "Design inspiration", body: "Upload a photo you love — a landscape, fashion shot, or interior — and use its natural color palette in your designs." },
            ].map(({ title, body }) => (
              <div key={title} className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <p className="font-semibold text-purple-900 mb-1">{title}</p>
                <p className="text-sm text-purple-800">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <h3 className="font-semibold text-slate-900 mb-2">Tips for Better Results</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>• Use high-resolution images — larger images give the sampler more pixels to work with</li>
            <li>• Crop to the most relevant area if you only want colors from a specific part of the image</li>
            <li>• For logo extraction, use a PNG with a white or transparent background</li>
            <li>• Results are sorted by frequency — the first color is the most dominant in the image</li>
          </ul>
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
