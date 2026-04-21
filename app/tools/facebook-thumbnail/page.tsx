"use client";

import { useState } from "react";
import { Facebook, Download, Copy, ExternalLink, Smartphone, Monitor, CheckCircle2 } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";
import Link from "next/link";

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
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Facebook Thumbnail Downloader - Free Online Tool</h1>
              <p className="text-slate-600 dark:text-slate-400">Download high-resolution thumbnails from Facebook videos, reels, stories, groups, images, and carousel posts. Extract thumbnail sprites and HD images instantly.</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            {tool && <FavoriteButton toolId={tool.id} />}
          <ShareButtons
              title="Facebook Thumbnail Grabber"
              text="Check out this free Facebook thumbnail grabber tool!"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Facebook Video URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.facebook.com/watch/?v=... or https://fb.watch/..."
              className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Thumbnail Preview</h2>
            <div className="mb-4">
              <img
                src={thumbnailUrl}
                alt="Facebook video thumbnail preview - Download thumbnail image in high quality"
                className="w-full rounded-lg border border-slate-200"
                loading="lazy"
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

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Direct URL:</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={thumbnailUrl}
                  readOnly
                  className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-sm text-slate-900 dark:text-slate-100"
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

        {/* Ad Unit - After Thumbnail Section */}
        <div className="my-8">
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1544013803258168"
               crossOrigin="anonymous"></script>
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-1544013803258168"
               data-ad-slot="1169725018"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          <script dangerouslySetInnerHTML={{
            __html: `(adsbygoogle = window.adsbygoogle || []).push({});`
          }} />
        </div>

        <div className="mt-8 space-y-6">
          {/* About Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">About Facebook Thumbnail Downloader</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              A <strong>Facebook Thumbnail Downloader</strong> is an online web app that allows users to extract and download thumbnails from <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">Facebook <ExternalLink className="w-3 h-3" /></a> videos, reels, stories, groups, images, or even from carousel posts.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Apart from regular photo and video thumbnails, our tool also offers <strong>thumbnail sprite images</strong> for video posts. A thumbnail sprite is a collage of several mini thumbnails taken from different moments from Facebook videos.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              In addition to thumbnail sprites, <strong>high-resolution images</strong> downloaded by our tool is also a huge advantage. By using this free online tool, users can easily download these thumbnails without any complex process on Facebook.
            </p>
          </div>

          {/* How to Download Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">How to Download Facebook Thumbnails?</h2>
            
            {/* Mobile Instructions */}
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">For Mobile Devices</h3>
              </div>
              <ol className="text-slate-700 dark:text-slate-300 space-y-2 list-decimal list-inside ml-2">
                <li>Open <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Facebook application</a> and go to the post that you need the thumbnail from.</li>
                <li>Tap on the <strong>share button</strong>. It&apos;s located on bottom side of photo and video posts and it&apos;s overlaid on right side while viewing videos in fullscreen.</li>
                <li>Next, tap on <strong>&quot;Copy link&quot;</strong> button.</li>
                <li>Finally, go to this tool by using your mobile browser and paste the URL to the web application box.</li>
                <li>You will get the downloadable thumbnail options.</li>
              </ol>
            </div>

            {/* PC Instructions */}
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-3">
                <Monitor className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h3 className="font-semibold text-green-900 dark:text-green-100">For PC/Desktop</h3>
              </div>
              <ol className="text-slate-700 dark:text-slate-300 space-y-2 list-decimal list-inside ml-2">
                <li>First step is to go to <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">facebook.com</a> and find the post. There is no need to login to a Facebook account.</li>
                <li>Copy the URL of the post from the address bar.</li>
                <li>Go to this tool and paste the URL to the box at the top.</li>
                <li>You will be shown a list of downloadable thumbnail images in couple of seconds.</li>
              </ol>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Top Features of Facebook Thumbnail Downloader</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Quick and Easy Downloads</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Download thumbnails in seconds with just a few clicks. No registration required.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">High Resolution Images</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Download thumbnails in their original high resolution for best quality.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Thumbnail Sprite Images</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Get thumbnail sprite images for video posts - a collage of mini thumbnails from different moments.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Cross-Platform Support</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Compatible with mobile devices and computers. Works on all modern browsers.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Supported Formats */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Supported Facebook URL Formats</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
              Our tool supports various Facebook video URL formats:
            </p>
            <ul className="text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside mb-4">
              <li><code className="bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded text-sm">https://www.facebook.com/watch/?v=VIDEO_ID</code></li>
              <li><code className="bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded text-sm">https://www.facebook.com/username/videos/VIDEO_ID</code></li>
              <li><code className="bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded text-sm">https://www.facebook.com/video.php?v=VIDEO_ID</code></li>
              <li><code className="bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded text-sm">https://fb.watch/VIDEO_ID</code></li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              With our Facebook Thumbnail Downloader, you can download the <strong>highest possible thumbnail resolution</strong> available for the video in <strong>JPG or PNG format</strong>.
            </p>
          </div>

          {/* Related Tools Section */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl shadow-sm border border-blue-200 dark:border-blue-800 p-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Related Thumbnail Tools</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Looking for other thumbnail downloaders? Check out our related tools:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/tools/youtube-thumbnail" className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="font-semibold text-slate-900 dark:text-slate-100">YouTube Thumbnail Grabber</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Download thumbnails from YouTube videos</div>
              </Link>
              <Link href="/tools/vimeo-thumbnail" className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="font-semibold text-slate-900 dark:text-slate-100">Vimeo Thumbnail Grabber</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Extract thumbnails from Vimeo videos</div>
              </Link>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Important Notes
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>Only <strong>public Facebook videos</strong> can have their thumbnails downloaded</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>Private or restricted videos will not work with this tool</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>The thumbnail quality depends on the original video quality</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>After downloading, thumbnails are saved to your device&apos;s download folder (PC) or gallery (mobile)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>You can download thumbnails from live Facebook videos, but you need to wait for the live streaming to be completed first</span>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
            <h2 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3">Copyright Disclaimer</h2>
            <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
              Facebook thumbnails are <strong>COPYRIGHTED</strong> and belong to the video creator. Therefore, using a thumbnail for a personal project is not allowed without the permission of the owner. However, thumbnails can be used for inspiration and reference purposes. Always respect content creators&apos; intellectual property rights.
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

