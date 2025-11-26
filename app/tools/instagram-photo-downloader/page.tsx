"use client";

import { useState } from "react";
import { Download, Instagram, AlertCircle } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";

export default function InstagramPhotoDownloaderPage() {
  const tool = getToolById("instagram-photo-downloader");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [postUrl, setPostUrl] = useState("");
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const extractMedia = async () => {
    setError("");
    setMediaUrls([]);
    setLoading(true);

    // Note: Instagram's API requires authentication. This is a client-side only solution
    // that works for public posts by extracting from the page source.
    // For production, you'd need a backend service.

    try {
      // This is a placeholder - in production, you'd need to:
      // 1. Use a backend API to fetch Instagram content
      // 2. Or use Instagram's official API with authentication
      // 3. Or scrape the page (which may violate Instagram's ToS)

      setError("This feature requires a backend service. Instagram's content is protected and cannot be downloaded directly from the browser due to CORS and authentication requirements.");
      
      // Placeholder for demonstration
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Failed to extract media. Please check the URL and try again.");
      setLoading(false);
    }
  };

  const downloadMedia = (url: string, index: number) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `instagram-media-${index + 1}.jpg`;
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
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Download className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">Instagram Photo Downloader - Download Instagram Photos & Videos Free</h1>
            <p className="text-slate-600">Download photos and videos from Instagram posts. Free Instagram downloader tool. Save Instagram content for offline viewing. Note: Requires backend implementation.</p>
          </div>
        </div>
        <div className="mt-4">
          <ShareButtons
            title="Instagram Photo Downloader"
            text="Check out this free Instagram photo downloader tool!"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Instagram Post URL
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={postUrl}
            onChange={(e) => setPostUrl(e.target.value)}
            placeholder="https://www.instagram.com/p/..."
            className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <button
            onClick={extractMedia}
            disabled={loading || !postUrl}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Instagram className="w-5 h-5" />
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
                <strong>Note:</strong> To implement this feature properly, you'll need:
              </p>
              <ul className="text-sm text-yellow-700 mt-2 list-disc list-inside space-y-1">
                <li>A backend API service to handle Instagram requests</li>
                <li>Instagram API access or web scraping service</li>
                <li>Proper handling of authentication and rate limits</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {mediaUrls.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Download Media</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mediaUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Media ${index + 1}`}
                  className="w-full rounded-lg border border-slate-200"
                />
                <button
                  onClick={() => downloadMedia(url, index)}
                  className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center"
                >
                  <Download className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 bg-purple-50 rounded-xl p-6 border border-purple-200">
        <h3 className="font-semibold text-purple-900 mb-2">📝 Implementation Guide</h3>
        <p className="text-sm text-purple-800 mb-3">
          This tool requires backend implementation. Here are your options:
        </p>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• Use Instagram Basic Display API (requires app approval)</li>
          <li>• Implement a backend scraper service (check Instagram ToS)</li>
          <li>• Use third-party APIs like RapidAPI Instagram services</li>
          <li>• Consider using browser extensions for personal use</li>
        </ul>
      </div>

      {tool && <ToolFAQ tool={tool} />}
      {tool && <RelatedTools currentTool={tool} />}
      {tool && <ToolDetailsSection tool={tool} />}
    </div>
    </>
  );
}

