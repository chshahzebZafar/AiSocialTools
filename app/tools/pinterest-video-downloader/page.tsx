"use client";

import { useState } from "react";
import { Download, Pin, AlertCircle, Video, Image as ImageIcon } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ToolComments } from "@/components/ToolComments";

interface PinData {
  type: "video" | "image" | "story";
  thumbnailUrl: string;
  downloadUrl: string;
  title?: string;
  description?: string;
}

export default function PinterestVideoDownloaderPage() {
  const tool = getToolById("pinterest-video-downloader");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [pinUrl, setPinUrl] = useState("");
  const [pinData, setPinData] = useState<PinData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const extractPinId = (url: string): string | null => {
    // Match patterns like:
    // https://www.pinterest.com/pin/123456789/
    // https://pinterest.com/pin/123456789
    // https://pin.it/abc123
    const pinPattern = /pinterest\.com\/pin\/(\d+)/;
    const shortPattern = /pin\.it\/(\w+)/;

    const pinMatch = url.match(pinPattern);
    if (pinMatch) return pinMatch[1];

    const shortMatch = url.match(shortPattern);
    if (shortMatch) return shortMatch[1];

    return null;
  };

  const extractPinData = async () => {
    setError("");
    setPinData(null);
    setLoading(true);

    const pinId = extractPinId(pinUrl);

    if (!pinId) {
      setError("Invalid Pinterest URL. Please enter a valid Pinterest pin URL (e.g., https://www.pinterest.com/pin/123456789/)");
      setLoading(false);
      return;
    }

    try {
      // Note: Pinterest's API requires authentication. This is a client-side only solution
      // that would need a backend service for actual implementation.
      // For demonstration, we'll show the expected structure.

      setTimeout(() => {
        setError("This feature requires a backend service. Pinterest content is protected and cannot be downloaded directly from the browser due to CORS and authentication requirements.");
        setLoading(false);
      }, 1000);

    } catch (err) {
      setError("Failed to extract pin data. Please check the URL and try again.");
      setLoading(false);
    }
  };

  const downloadContent = () => {
    if (!pinData?.downloadUrl) return;

    const a = document.createElement("a");
    a.href = pinData.downloadUrl;
    const extension = pinData.type === "video" ? ".mp4" : ".jpg";
    a.download = `pinterest-${pinData.type}-${Date.now()}${extension}`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
              <Pin className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900">Pinterest Video Downloader - Download Pinterest Videos & Images Free</h1>
              <p className="text-slate-600">Download videos and images from Pinterest pins. Free Pinterest downloader tool. Save Pinterest content for offline viewing. Note: Requires backend implementation.</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            {tool && <FavoriteButton toolId={tool.id} />}
            <ShareButtons
              title="Pinterest Video Downloader"
              text="Check out this free Pinterest video downloader tool!"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Pinterest Pin URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={pinUrl}
              onChange={(e) => setPinUrl(e.target.value)}
              placeholder="https://www.pinterest.com/pin/... or https://pin.it/..."
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <button
              onClick={extractPinData}
              disabled={loading || !pinUrl}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Pin className="w-5 h-5" />
              {loading ? "Extracting..." : "Extract"}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">Important Notice</h3>
                <p className="text-sm text-yellow-800">{error}</p>
                <p className="text-sm text-yellow-700 mt-2">
                  <strong>Note:</strong> To implement this feature properly, you will need:
                </p>
                <ul className="text-sm text-yellow-700 mt-2 list-disc list-inside space-y-1">
                  <li>A backend API service to handle Pinterest requests</li>
                  <li>Pinterest API access or web scraping service</li>
                  <li>Proper handling of authentication and rate limits</li>
                  <li>Respect for Pinterest Terms of Service</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {pinData && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Download Content</h2>
            <div className="space-y-4">
              {pinData.thumbnailUrl && (
                <div className="relative group">
                  <img
                    src={pinData.thumbnailUrl}
                    alt={pinData.title || "Pinterest content thumbnail"}
                    className="w-full max-w-md rounded-lg border border-slate-200"
                  />
                  <div className="absolute top-2 left-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      pinData.type === "video"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {pinData.type === "video" ? (
                        <span className="flex items-center gap-1">
                          <Video className="w-3 h-3" /> Video
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <ImageIcon className="w-3 h-3" /> Image
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              )}
              {pinData.title && (
                <h3 className="font-medium text-slate-900">{pinData.title}</h3>
              )}
              {pinData.description && (
                <p className="text-sm text-slate-600">{pinData.description}</p>
              )}
              <button
                onClick={downloadContent}
                className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download {pinData.type === "video" ? "Video" : "Image"}
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 bg-red-50 rounded-xl p-6 border border-red-200">
          <h3 className="font-semibold text-red-900 mb-2">Implementation Guide</h3>
          <p className="text-sm text-red-800 mb-3">
            This tool requires backend implementation. Here are your options:
          </p>
          <ul className="text-sm text-red-800 space-y-1">
            <li>Use Pinterest API (requires app approval and OAuth)</li>
            <li>Implement a backend scraper service (respect Pinterest ToS)</li>
            <li>Use third-party APIs like RapidAPI Pinterest services</li>
            <li>Consider browser extensions for personal use</li>
          </ul>
          <p className="text-sm text-red-700 mt-3">
            <strong>Important:</strong> Always respect Pinterest Terms of Service and copyright laws when downloading content.
          </p>
        </div>

        {tool && <ToolComments toolId={tool.id} />}
        {tool && <ToolFAQ tool={tool} />}
        {tool && <RelatedTools currentTool={tool} />}
        {tool && <ToolDetailsSection tool={tool} />}
      </div>
    </>
  );
}
