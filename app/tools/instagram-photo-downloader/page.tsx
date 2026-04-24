"use client";

import { useState } from "react";
import { Download, Instagram, AlertCircle, Loader2, Image as ImageIcon, Play } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ToolComments } from "@/components/ToolComments";

interface MediaItem {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
}

interface ApiResponse {
  success: boolean;
  error?: string;
  type?: "image" | "video" | "carousel";
  media?: MediaItem[];
  title?: string;
  description?: string;
  author?: string;
}

export default function InstagramPhotoDownloaderPage() {
  const tool = getToolById("instagram-photo-downloader");
  const [postUrl, setPostUrl] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [meta, setMeta] = useState<{ title: string; author: string; description: string } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const extractMedia = async () => {
    setError("");
    setMedia([]);
    setMeta(null);

    if (!postUrl.trim()) {
      setError("Please paste an Instagram URL.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/instagram-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: postUrl.trim() }),
      });
      const data: ApiResponse = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || `Request failed with status ${res.status}.`);
        return;
      }
      setMedia(data.media || []);
      setMeta({ title: data.title || "", author: data.author || "", description: data.description || "" });
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const download = async (url: string, index: number) => {
    try {
      // Stream through our origin to bypass Instagram's CDN CORS on direct download-as
      const res = await fetch(url);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const ext = blob.type.startsWith("video") ? "mp4" : "jpg";
      a.href = objectUrl;
      a.download = `instagram-${meta?.author?.replace("@", "") || "media"}-${index + 1}.${ext}`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    } catch {
      // Fallback: open in new tab
      window.open(url, "_blank", "noopener");
    }
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
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Instagram Photo & Video Downloader — Free, No Signup
              </h1>
              <p className="text-slate-600 dark:text-slate-300">
                Paste any public Instagram post, reel, or IGTV URL and download the media in one click. Works for photos, videos, and carousels. Private posts cannot be downloaded.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            {tool && <FavoriteButton toolId={tool.id} />}
            <ShareButtons title="Instagram Photo Downloader" text="Free Instagram photo and video downloader tool." />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
            Instagram post URL
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="url"
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              placeholder="https://www.instagram.com/p/..."
              onKeyDown={(e) => e.key === "Enter" && extractMedia()}
              className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <button
              onClick={extractMedia}
              disabled={loading || !postUrl}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Instagram className="w-5 h-5" />}
              {loading ? "Extracting..." : "Extract media"}
            </button>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Supported: posts (/p/...), reels (/reel/...), IGTV (/tv/...). Private, age-gated, and geo-restricted content will fail.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-5 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-200 mb-1">Couldn&rsquo;t download</h3>
              <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
            </div>
          </div>
        )}

        {media.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {media.length} item{media.length === 1 ? "" : "s"} ready to download
              </h2>
              {meta?.author && (
                <p className="text-sm text-slate-600 dark:text-slate-300">From {meta.author}</p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {media.map((item, index) => (
                <div key={index} className="relative group border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  {item.type === "video" ? (
                    <div className="relative aspect-square bg-slate-100 dark:bg-slate-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.thumbnail || item.url}
                        alt={`Instagram video ${index + 1} thumbnail`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play className="w-10 h-10 text-white drop-shadow" />
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-square bg-slate-100 dark:bg-slate-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.url}
                        alt={`Instagram image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <button
                    onClick={() => download(item.url, index)}
                    className="absolute inset-0 bg-black/0 hover:bg-black/60 transition flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-900 rounded-lg font-medium text-sm">
                      <Download className="w-4 h-4" />
                      Download {item.type === "video" ? "video" : "photo"}
                    </span>
                  </button>
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                      {item.type === "video" ? <Play className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                      {item.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-5 text-sm text-purple-900 dark:text-purple-100">
          <h3 className="font-semibold mb-2">Usage notes</h3>
          <ul className="space-y-1">
            <li>&bull; Only public Instagram content is supported — private accounts, age-restricted, and geo-blocked posts will fail.</li>
            <li>&bull; Always credit the original creator and respect Instagram&rsquo;s Terms of Service when reusing content.</li>
            <li>&bull; If a URL fails, try again in a minute — Instagram sometimes rate-limits repeated requests.</li>
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
