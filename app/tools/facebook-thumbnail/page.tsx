"use client";

import { useState } from "react";
import { Facebook, Download, Copy } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import ShareButtons from "@/components/ShareButtons";

export default function FacebookThumbnailPage() {
  const tool = getToolById("facebook-thumbnail");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /facebook\.com\/watch\/\?v=(\d+)/,
      /facebook\.com\/.*\/videos\/(\d+)/,
      /facebook\.com\/video\.php\?v=(\d+)/,
      /fb\.watch\/([a-zA-Z0-9]+)/,
      /facebook\.com\/.*\/videos\/.*\/(\d+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const getThumbnail = async () => {
    setError("");
    setIsLoading(true);
    
    if (!videoUrl.trim()) {
      setError("Please enter a Facebook video URL");
      setIsLoading(false);
      return;
    }

    try {
      // Facebook oEmbed endpoint
      const oembedUrl = `https://www.facebook.com/plugins/video/oembed.json?url=${encodeURIComponent(videoUrl)}`;
      
      const response = await fetch(oembedUrl);
      
      if (!response.ok) {
        throw new Error("Failed to fetch video data");
      }
      
      const data = await response.json();
      
      // Facebook oEmbed returns thumbnail_url
      if (data.thumbnail_url) {
        setThumbnailUrl(data.thumbnail_url);
      } else {
        throw new Error("Thumbnail not available");
      }
    } catch (err) {
      setError("Failed to fetch thumbnail. The video might be private, unavailable, or the URL is invalid. Please make sure the video is public.");
      if (process.env.NODE_ENV === 'development') {
        console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const downloadThumbnail = () => {
    if (!thumbnailUrl) return;
    
    const videoId = extractVideoId(videoUrl) || "facebook-video";
    const a = document.createElement("a");
    a.href = thumbnailUrl;
    a.download = `facebook-thumbnail-${videoId}.jpg`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  };

  const copyUrl = () => {
    if (thumbnailUrl) {
      navigator.clipboard.writeText(thumbnailUrl);
      alert("URL copied to clipboard!");
    }
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Facebook className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900">Facebook Thumbnails Downloader</h1>
              <p className="text-slate-600">Download and save any Facebook video thumbnail of the highest possible quality</p>
            </div>
          </div>
          <div className="mt-4">
            <ShareButtons
              title="Facebook Thumbnail Grabber"
              text="Check out this free Facebook thumbnail grabber tool!"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Facebook Video URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.facebook.com/watch/?v=... or https://fb.watch/..."
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  getThumbnail();
                }
              }}
            />
            <button
              onClick={getThumbnail}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Facebook className="w-5 h-5" />
              {isLoading ? "Loading..." : "Get Thumbnail"}
            </button>
          </div>
          {error && (
            <div className="mt-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        {thumbnailUrl && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Thumbnail Preview</h2>
            <div className="mb-4">
              <img
                src={thumbnailUrl}
                alt="Facebook Thumbnail"
                className="w-full rounded-lg border border-slate-200"
                onError={() => {
                  setError("Failed to load thumbnail.");
                  setThumbnailUrl("");
                }}
              />
            </div>
            
            <div className="flex gap-3 mb-4">
              <button
                onClick={downloadThumbnail}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Thumbnail
              </button>
              <button
                onClick={copyUrl}
                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy URL
              </button>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-500 mb-2">Direct URL:</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={thumbnailUrl}
                  readOnly
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm"
                />
                <button
                  onClick={copyUrl}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded text-sm"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">About Facebook Thumbnails Downloader</h2>
            <p className="text-slate-700 leading-relaxed">
              Facebook Thumbnails Downloader is a free online tool that allows you to download any Facebook video thumbnail easily.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How To Download</h2>
            <ol className="text-slate-700 space-y-2 list-decimal list-inside">
              <li>Grab video URL from the browser</li>
              <li>Paste it in the input box</li>
              <li>Press ENTER or click the submit button</li>
              <li>Click the download button to get the thumbnail</li>
            </ol>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Download Thumbnails</h2>
            <p className="text-slate-700 mb-3 leading-relaxed">
              A thumbnail is the most important meta data for a video. A carefully designed thumbnail will certainly result in more views for your video. Some beautiful and creative thumbnails make many people want to download and save them. In general for the following reasons:
            </p>
            <ul className="text-slate-700 space-y-2 list-disc list-inside">
              <li>Save the thumbnail as wallpaper</li>
              <li>Share it with your friends on social media</li>
              <li>Use the thumbnail as source of inspiration for your next video cover</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Supported URL Formats</h2>
            <p className="text-slate-700 mb-3 leading-relaxed">
              Our tool supports various Facebook video URL formats:
            </p>
            <ul className="text-slate-700 space-y-2 list-disc list-inside">
              <li><code className="bg-slate-100 px-2 py-1 rounded">https://www.facebook.com/watch/?v=VIDEO_ID</code></li>
              <li><code className="bg-slate-100 px-2 py-1 rounded">https://www.facebook.com/username/videos/VIDEO_ID</code></li>
              <li><code className="bg-slate-100 px-2 py-1 rounded">https://www.facebook.com/video.php?v=VIDEO_ID</code></li>
              <li><code className="bg-slate-100 px-2 py-1 rounded">https://fb.watch/VIDEO_ID</code></li>
            </ul>
            <p className="text-slate-700 mt-3 leading-relaxed">
              With Facebook Thumbnails Downloader, you can download the highest possible thumbnail resolution available for the video.
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2 text-lg">💡 Important Notes</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Only public Facebook videos can have their thumbnails downloaded</li>
              <li>• Private or restricted videos will not work with this tool</li>
              <li>• The thumbnail quality depends on the original video quality</li>
              <li>• Some videos may not have thumbnails available</li>
            </ul>
          </div>

          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <h2 className="text-xl font-bold text-amber-900 mb-3">Disclaimer</h2>
            <p className="text-amber-800 leading-relaxed">
              Facebook thumbnails are COPYRIGHTED and belongs to the video creator. Therefore, using a thumbnail for a personal project is not allowed without the permission of the owner. But it can be used for inspiration.
            </p>
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

