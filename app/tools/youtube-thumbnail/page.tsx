"use client";

import { useState } from "react";
import { Youtube, Download, ExternalLink } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import ToolContentSection from "@/components/ToolContentSection";
import { ToolComments } from "@/components/ToolComments";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

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
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Best Free YouTube Thumbnail Downloader Online - Download HD Thumbnails 2025</h1>
            <p className="text-slate-600 dark:text-slate-300">
              Extract and download YouTube video thumbnails in high quality with the best free YouTube thumbnail downloader online. 
              Download thumbnails in max resolution (1280x720), HQ, MQ, or SD quality instantly. Perfect for content creators, 
              marketers, and video editors. No signup required - 100% free tool.
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          {tool && <FavoriteButton toolId={tool.id} />}
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
              alt="YouTube video thumbnail preview - Download in HD quality (1280x720 or higher)"
              className="w-full rounded-lg border border-slate-200"
              loading="lazy"
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

      <div className="mt-8 bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
        <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2 text-lg">💡 How to Download YouTube Thumbnails</h3>
        <ul className="text-sm text-red-800 dark:text-red-300 space-y-2">
          <li>• <strong>Paste YouTube URL:</strong> Copy and paste any YouTube video URL (watch, short, or embed format)</li>
          <li>• <strong>Extract Thumbnail:</strong> Click "Get Thumbnail" to instantly extract the video thumbnail</li>
          <li>• <strong>Choose Quality:</strong> Download in Max Res (1280x720+), HQ (480x360), MQ (320x180), or SD (640x480)</li>
          <li>• <strong>Download or Copy:</strong> Save the thumbnail image or copy the direct URL for embedding</li>
          <li>• <strong>Use Cases:</strong> Perfect for video thumbnails, social media posts, blog articles, and presentations</li>
        </ul>
      </div>

      {tool && (
        <ToolContentSection 
          tool={tool}
          content={{
            overview: `Our YouTube Thumbnail Downloader is the best free online tool for extracting and downloading YouTube video thumbnails in high quality. Whether you're a content creator looking to analyze competitor thumbnails, a marketer creating social media posts, or a blogger needing video previews, this tool provides instant access to YouTube thumbnails in multiple resolutions.`,
            benefits: [
              "Download thumbnails in 4 quality options (Max Res, HQ, MQ, SD)",
              "Works with any YouTube video URL format",
              "Instant extraction - no waiting or processing",
              "100% free with no signup or registration",
              "Copy direct thumbnail URLs for embedding",
              "Mobile-friendly interface"
            ],
            useCases: [
              "Content creators analyzing competitor thumbnails",
              "Social media managers creating posts with video previews",
              "Bloggers embedding video thumbnails in articles",
              "Marketers creating promotional materials",
              "Video editors referencing thumbnail designs",
              "Researchers collecting thumbnail data"
            ],
            tips: [
              "Max Res quality provides the highest resolution (1280x720 or higher)",
              "Use HQ quality for faster downloads if Max Res isn't available",
              "Copy the direct URL to embed thumbnails in websites",
              "Combine with our Image Resizer tool to adjust thumbnail sizes",
              "Save thumbnails for inspiration and design reference"
            ],
            features: [
              "Supports all YouTube URL formats (watch, short, embed)",
              "Multiple quality options for different use cases",
              "Direct URL copying for embedding",
              "Fast and reliable thumbnail extraction",
              "Works with public, unlisted, and private videos (if accessible)"
            ]
          }}
        />
      )}

      {tool && <ToolComments toolId={tool.id} />}
      {tool && <ToolFAQ tool={tool} />}
      {tool && <RelatedTools currentTool={tool} />}
      {tool && <ToolDetailsSection tool={tool} />}
    </div>
    </>
  );
}

