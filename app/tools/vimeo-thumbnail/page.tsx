"use client";

import { useState } from "react";
import { Image as ImageIcon, Download } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

export default function VimeoThumbnailPage() {
  const tool = getToolById("vimeo-thumbnail");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [error, setError] = useState("");

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /vimeo\.com\/(\d+)/,
      /vimeo\.com\/.*\/(\d+)/,
      /player\.vimeo\.com\/video\/(\d+)/,
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
    const videoId = extractVideoId(videoUrl);
    
    if (!videoId) {
      setError("Invalid Vimeo URL. Please enter a valid Vimeo video URL.");
      return;
    }

    try {
      // Vimeo API endpoint for thumbnail
      // Note: This requires Vimeo API access. For public videos, we can try the oEmbed endpoint
      const oembedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(videoUrl)}`;
      
      const response = await fetch(oembedUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch video data");
      }
      
      const data = await response.json();
      if (data.thumbnail_url) {
        setThumbnailUrl(data.thumbnail_url);
      } else {
        throw new Error("Thumbnail not available");
      }
    } catch (err) {
      setError("Failed to fetch thumbnail. The video might be private or the URL is invalid.");
      // Error logged for debugging - remove console.error in production if needed
      if (process.env.NODE_ENV === 'development') {
        console.error(err);
      }
    }
  };

  const downloadThumbnail = () => {
    if (!thumbnailUrl) return;
    
    const a = document.createElement("a");
    a.href = thumbnailUrl;
    a.download = `vimeo-thumbnail-${extractVideoId(videoUrl)}.jpg`;
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
          <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">Vimeo Thumbnails Downloader</h1>
            <p className="text-slate-600">Download and save any Vimeo video thumbnail of the highest possible quality</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          {tool && <FavoriteButton toolId={tool.id} />}
          <ShareButtons
            title="Vimeo Thumbnail Grabber"
            text="Check out this free Vimeo thumbnail grabber tool!"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Vimeo Video URL
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://vimeo.com/..."
            className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
          <button
            onClick={getThumbnail}
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors flex items-center gap-2"
          >
            <ImageIcon className="w-5 h-5" />
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
              alt="Vimeo video thumbnail preview - Download in high quality"
              className="w-full rounded-lg border border-slate-200"
              loading="lazy"
              onError={() => {
                setError("Failed to load thumbnail.");
                setThumbnailUrl("");
              }}
            />
          </div>
          
          <button
            onClick={downloadThumbnail}
            className="w-full px-6 py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Thumbnail
          </button>

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

      <div className="mt-8 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">About Vimeo Thumbnails Downloader</h2>
          <p className="text-slate-700 leading-relaxed">
            Vimeo Thumbnails Downloader is a free online tool that allows you to download any Vimeo thumbnail easily.
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
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Possible Resolutions</h2>
          <p className="text-slate-700 mb-3 leading-relaxed">
            Depending on the video and original thumbnail resolutions, a Vimeo video can have up to 5 thumbnails:
          </p>
          <ul className="text-slate-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="font-semibold">Max Resolution (1080p)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold">High Definition (720p)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold">Standard Quality (480p)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold">Medium Quality (360p)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold">Lowest Quality (240p)</span>
            </li>
          </ul>
          <p className="text-slate-700 mt-3 leading-relaxed">
            With Vimeo Thumbnails Downloader, you can download the highest possible thumbnail resolution.
          </p>
        </div>

        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
          <h2 className="text-xl font-bold text-amber-900 mb-3">Disclaimer</h2>
          <p className="text-amber-800 leading-relaxed">
            Vimeo thumbnails are COPYRIGHTED and belongs to the video creator. Therefore, using a thumbnail for a personal project is not allowed without the permission of the owner. But it can be used for inspiration.
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

