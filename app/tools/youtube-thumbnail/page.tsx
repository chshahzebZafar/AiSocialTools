"use client";

import { useState } from "react";
import { Youtube, Download, ExternalLink } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";

export default function YouTubeThumbnailPage() {
  const tool = getToolById("youtube-thumbnail");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [error, setError] = useState("");

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/.*[?&]v=([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const getThumbnail = () => {
    setError("");
    const videoId = extractVideoId(videoUrl);
    
    if (!videoId) {
      setError("Invalid YouTube URL. Please enter a valid YouTube video URL.");
      return;
    }

    // YouTube thumbnail URLs
    const thumbnails = {
      maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      hq: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      mq: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      sd: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    };

    setThumbnailUrl(thumbnails.maxres);
  };

  const downloadThumbnail = (quality: string) => {
    if (!thumbnailUrl) return;
    
    const videoId = extractVideoId(videoUrl);
    if (!videoId) return;

    const qualityUrls: Record<string, string> = {
      maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      hq: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      mq: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      sd: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    };

    const url = qualityUrls[quality] || qualityUrls.maxres;
    const a = document.createElement("a");
    a.href = url;
    a.download = `youtube-thumbnail-${videoId}-${quality}.jpg`;
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
          <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
            <Youtube className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">YouTube Thumbnail Grabber - Download YouTube Thumbnails Free</h1>
            <p className="text-slate-600">Extract and download YouTube video thumbnails in high quality. Free YouTube thumbnail grabber tool. Download thumbnails in max resolution, HQ, MQ, or SD quality instantly.</p>
          </div>
        </div>
        <div className="mt-4">
          <ShareButtons
            title="YouTube Thumbnail Grabber"
            text="Check out this free YouTube thumbnail grabber tool!"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          YouTube Video URL
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <button
            onClick={getThumbnail}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Youtube className="w-5 h-5" />
            Get Thumbnail
          </button>
        </div>
        {error && (
          <p className="text-red-600 text-sm mt-2">{error}</p>
        )}
      </div>

      {thumbnailUrl && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Thumbnail Preview</h2>
          <div className="mb-4">
            <img
              src={thumbnailUrl}
              alt="YouTube Thumbnail"
              className="w-full rounded-lg border border-slate-200"
              onError={() => {
                setError("Failed to load thumbnail. The video might be private or unavailable.");
                setThumbnailUrl("");
              }}
            />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-700">Download Quality</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button
                onClick={() => downloadThumbnail("maxres")}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Max Res
              </button>
              <button
                onClick={() => downloadThumbnail("hq")}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                HQ
              </button>
              <button
                onClick={() => downloadThumbnail("mq")}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                MQ
              </button>
              <button
                onClick={() => downloadThumbnail("sd")}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                SD
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 mb-2">Direct URL:</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={thumbnailUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(thumbnailUrl);
                  alert("URL copied to clipboard!");
                }}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded text-sm"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-red-50 rounded-xl p-6 border border-red-200">
        <h3 className="font-semibold text-red-900 mb-2">💡 How to Use</h3>
        <ul className="text-sm text-red-800 space-y-1">
          <li>• Paste any YouTube video URL</li>
          <li>• Click "Get Thumbnail" to extract the thumbnail</li>
          <li>• Download in your preferred quality (Max Res, HQ, MQ, or SD)</li>
          <li>• Max Res provides the highest quality (1280x720 or higher)</li>
        </ul>
      </div>

      {tool && <ToolComments toolId={tool.id} />}
      {tool && <ToolFAQ tool={tool} />}
      {tool && <RelatedTools currentTool={tool} />}
      {tool && <ToolDetailsSection tool={tool} />}
    </div>
    </>
  );
}

