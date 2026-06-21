"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Instagram, AlertCircle, Loader2, Image as ImageIcon, Play } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolHero from "@/components/ToolHero";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
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
      <ToolHero
        toolId={tool?.id}
        icon={Download}
        iconGradient="from-purple-500 to-pink-500"
        title="Instagram Photo & Video Downloader — Free, No Signup"
        description="Paste any public Instagram post, reel, or IGTV URL and download the media in one click. Works for photos, videos, and carousels. Private posts cannot be downloaded."
        shareTitle="Instagram Photo Downloader"
        shareText="Free Instagram photo and video downloader tool."
      />
      <div className="p-8 max-w-4xl mx-auto">

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

        {/* SEO content */}
        <section className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">
            Instagram Profile Photo Downloader: A Complete Beginner&apos;s Guide
          </h2>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">What Is an Instagram Profile Photo Downloader?</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            An Instagram Profile Photo Downloader is a tool that helps users view and save Instagram
            profile pictures in better quality. Instagram normally displays profile photos in a small
            size, which makes it difficult to see details. Many people use an Instagram Profile Photo
            Downloader when they want a clearer view of a profile image.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Users often search for tools like esuit photos downloader for instagram because they want a
            simple way to access profile pictures. Some people also use an Instagram photo downloader app
            to save images quickly on their devices.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">Why Do People Use an Instagram Profile Photo Downloader?</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            There are many reasons why users choose an Instagram Profile Photo Downloader. Sometimes they
            want to view a profile picture more clearly. Other times they may need to save an image for
            reference or identification purposes.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            People frequently ask, can photos be downloaded from Instagram? The answer depends on the
            content and the tools being used. Many users turn to an Instagram photo downloader app to make
            the process easier and faster.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">How Does an Instagram Profile Photo Downloader Work?</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            An Instagram Profile Photo Downloader works by accessing publicly available profile picture
            data and displaying it in a larger size. The process is usually simple and requires only a
            username.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Some users compare different tools by reading discussions on Instagram photo downloader Reddit
            communities. These discussions often share experiences with popular downloaders, including
            esuit photos downloader for instagram and other similar platforms.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">Benefits of Using an Instagram Profile Photo Downloader</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            An Instagram Profile Photo Downloader offers several advantages. The biggest benefit is the
            ability to view profile pictures more clearly. Small images can hide important details, while
            a downloader provides a larger version. Many users also prefer an Instagram photo downloader
            app because it allows quick access from mobile devices.
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Better Image Visibility</h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            One reason people use an Instagram Profile Photo Downloader is improved image visibility. A
            larger profile photo helps users see facial details, logos, and other important elements more
            clearly. Many recommendations found on Instagram photo downloader Reddit suggest using trusted
            tools that provide high-quality image previews.
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Quick and Easy Access</h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            An Instagram Profile Photo Downloader is usually very easy to use. Most tools require only a
            username and a few clicks to display a profile image. Once saved, you can resize the picture
            for any platform with our{" "}
            <Link href="/tools/image-resizer" className="text-purple-600 hover:text-purple-700 underline">
              Image Resizer
            </Link>
            .
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">Features to Look for in an Instagram Profile Photo Downloader</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Not all download tools offer the same experience. When choosing an Instagram Profile Photo
            Downloader, look for useful features that improve usability and performance. Many users search
            Instagram photo downloader Reddit discussions to learn which tools are fast, reliable, and safe.
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">High-Quality Downloads</h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            A good Instagram Profile Photo Downloader should provide clear and high-quality profile images.
            Poor-quality downloads may not be useful when users want to view details. Tools such as esuit
            photos downloader for instagram are often discussed because users value image clarity.
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">User-Friendly Interface</h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            Another important feature is a simple interface. Users should be able to access profile photos
            without complicated steps. Many beginners choose an Instagram photo downloader app because
            mobile-friendly designs are easier to understand.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">Understanding Public and Private Content</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            When using an Instagram Profile Photo Downloader, it is important to understand the difference
            between public and private accounts. Public profile photos are generally visible to everyone,
            while private content has restrictions.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Some users search for an Instagram private photo downloader, hoping to access private content.
            However, privacy settings exist to protect user information. Responsible use of any downloader
            should respect platform rules and user privacy.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            The question &ldquo;can photos be downloaded from Instagram&rdquo; often appears when discussing
            privacy. Public content may be easier to access, but private content should always be treated
            with respect and according to applicable rules.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">Common Uses of an Instagram Profile Photo Downloader</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            An Instagram Profile Photo Downloader can be useful for many purposes. Some people use it to
            view profile pictures more clearly. Businesses may use it to identify brand accounts and logos.
            You can also grab video thumbnails from other platforms with our{" "}
            <Link href="/tools/facebook-thumbnail" className="text-purple-600 hover:text-purple-700 underline">
              Facebook Thumbnail Downloader
            </Link>{" "}
            and{" "}
            <Link href="/tools/pinterest-video-downloader" className="text-purple-600 hover:text-purple-700 underline">
              Pinterest Video Downloader
            </Link>
            .
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">Tips for Safe Usage</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Using an Instagram Profile Photo Downloader safely is important. Always choose trusted tools and
            avoid websites that request unnecessary personal information. Many users rely on recommendations
            found in Instagram photo downloader Reddit communities because real experiences help identify
            reliable platforms.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            It is also important to respect privacy and avoid misuse. While users may ask, can photos be
            downloaded from Instagram, ethical use should always guide the decision. Explore more of our
            free{" "}
            <Link href="/tools/image-design" className="text-purple-600 hover:text-purple-700 underline">
              image tools
            </Link>{" "}
            for editing images you are allowed to use.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">Common Mistakes to Avoid</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            A common mistake when using an Instagram Profile Photo Downloader is choosing untrusted websites.
            Some platforms may contain misleading advertisements or poor-quality services. Another mistake is
            assuming an Instagram private photo downloader can legally provide access to restricted content —
            users should understand privacy rules and use download tools responsibly. Reading feedback on
            Instagram photo downloader Reddit can help users avoid unreliable services.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">The Future of Instagram Profile Photo Downloader Tools</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            As social media continues to grow, the demand for an Instagram Profile Photo Downloader is likely
            to increase. Users want fast and simple ways to view profile images in better quality. Future
            tools may include more advanced features within an Instagram photo downloader app while
            maintaining ease of use.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">Conclusion</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            An Instagram Profile Photo Downloader can be a useful tool for viewing profile pictures more
            clearly and accessing image details that may not be visible in Instagram&apos;s default display.
            Whether you use esuit photos downloader for instagram, an Instagram photo downloader app, or learn
            from discussions on Instagram photo downloader Reddit, choosing a trusted and safe solution is
            important. While many users ask, can photos be downloaded from Instagram, it is equally important
            to respect privacy settings and avoid misuse of any Instagram private photo downloader. When used
            responsibly, these tools can provide a simple and helpful way to enhance the Instagram viewing
            experience.
          </p>
        </section>

        {tool && <ToolComments toolId={tool.id} />}
        {tool && <ToolFAQ tool={tool} />}
        {tool && <RelatedTools currentTool={tool} />}
        {tool && <ToolDetailsSection tool={tool} />}
      </div>
    </>
  );
}
