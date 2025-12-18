"use client";

import { useState, useRef } from "react";
import { Filter, Upload, Download } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

export default function InstagramFiltersPage() {
  const tool = getToolById("instagram-filters");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filters = [
    { name: "Normal", class: "" },
    { name: "Clarendon", class: "brightness-110 contrast-125 saturate-110" },
    { name: "Gingham", class: "brightness-105 contrast-110 saturate-90" },
    { name: "Moon", class: "brightness-90 contrast-110 saturate-80 grayscale-20" },
    { name: "Lark", class: "brightness-110 contrast-105 saturate-125" },
    { name: "Reyes", class: "brightness-95 contrast-110 saturate-110 sepia-20" },
    { name: "Juno", class: "brightness-110 contrast-105 saturate-130" },
    { name: "Slumber", class: "brightness-95 contrast-110 saturate-90 sepia-10" },
    { name: "Crema", class: "brightness-105 contrast-110 saturate-115 sepia-15" },
    { name: "Ludwig", class: "brightness-110 contrast-120 saturate-110" },
    { name: "Aden", class: "brightness-105 contrast-105 saturate-120" },
    { name: "Perpetua", class: "brightness-110 contrast-105 saturate-110" },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadImage = async () => {
    if (!image || !selectedFilter) return;

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = image;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D | null;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = `instagram-filter-${selectedFilter}.png`;
        a.click();
      }
    } catch (error) {
      // Error logged for debugging
      if (process.env.NODE_ENV === 'development') {
        console.error("Error downloading image:", error);
      }
      alert("Failed to download image. Please try again.");
    }
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Filter className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">Instagram Filters - Apply Photo Filters Online Free</h1>
            <p className="text-slate-600">Apply beautiful Instagram-style filters to your photos. Free Instagram filter tool with multiple filter options. Edit photos online, no app required.</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          {tool && <FavoriteButton toolId={tool.id} />}
          <ShareButtons
            title="Instagram Filters"
            text="Check out this free Instagram filters tool!"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            {!image ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center cursor-pointer hover:border-purple-500 transition-colors"
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
                  <img
                    src={image}
                    alt={`Instagram filter preview with ${selectedFilter || 'no'} filter applied`}
                    className={`w-full ${selectedFilter ? filters.find(f => f.name === selectedFilter)?.class || "" : ""}`}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Change Image
                  </button>
                  {selectedFilter && (
                    <button
                      onClick={downloadImage}
                      className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  )}
                </div>
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
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Filters</h2>
          <div className="grid grid-cols-2 gap-2">
            {filters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => setSelectedFilter(filter.name)}
                className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                  selectedFilter === filter.name
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                {filter.name}
              </button>
            ))}
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

