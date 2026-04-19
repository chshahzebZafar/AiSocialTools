"use client";

import { useState, useRef, useEffect } from "react";
import { Twitter, Copy, Download, Upload, Image as ImageIcon, MoreHorizontal, Bookmark, Share2, MessageCircle, Repeat2, Heart, BarChart3, MapPin, X, Settings, Palette, Type, ImagePlus, Trash2, Sparkles } from "lucide-react";
import Link from "next/link";
import { getToolById } from "@/lib/social-tools";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import ToolFAQ from "@/components/ToolFAQ";
import { ToolComments } from "@/components/ToolComments";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";
import ToolSEO from "@/components/ToolSEO";

export default function TweetGeneratorPage() {
  const tool = getToolById("tweet-generator");
  const seo = tool ? getSEOMetadata(tool) : null;
  const tweetPreviewRef = useRef<HTMLDivElement>(null);

  // Form state
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [avatar, setAvatar] = useState<string>("");
  const [tweetImages, setTweetImages] = useState<string[]>([]);
  const [name, setName] = useState("John Doe");
  const [username, setUsername] = useState("johndoe");
  const [isVerified, setIsVerified] = useState(false);
  const [tweetDate, setTweetDate] = useState("December 18, 2026 5:40 PM");
  const [tweetText, setTweetText] = useState("This is a sample tweet. @mentions, #hashtags, https://links.com are all automatically converted.");
  const [location, setLocation] = useState("");
  const [replyCount, setReplyCount] = useState(0);
  const [retweetCount, setRetweetCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  
  // Advanced features
  const [exportFormat, setExportFormat] = useState<"png" | "jpg">("png");
  const [exportQuality, setExportQuality] = useState(0.9);
  const [fontSize, setFontSize] = useState(15);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customBackgroundColor, setCustomBackgroundColor] = useState("");
  const [customTextColor, setCustomTextColor] = useState("");
  const [showQuoteTweet, setShowQuoteTweet] = useState(false);
  const [quoteTweetText, setQuoteTweetText] = useState("");
  const [quoteTweetAuthor, setQuoteTweetAuthor] = useState("");

  // Fix hydration by only rendering time-dependent content on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = 4 - tweetImages.length;
    if (files.length > remainingSlots) {
      alert(`Maximum 4 images allowed. You can add ${remainingSlots} more.`);
      return;
    }
    const readers = files.map(file => {
      const reader = new FileReader();
      return new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(results => {
      setTweetImages([...tweetImages, ...results].slice(0, 4));
    });
  };

  const removeImage = (index: number) => {
    setTweetImages(tweetImages.filter((_, i) => i !== index));
  };

  const clearAllImages = () => {
    setTweetImages([]);
  };

  const loadPreset = (preset: string) => {
    switch (preset) {
      case "viral":
        setTweetText("🚀 Just dropped something HUGE! This is going to change everything. RT if you agree! #gamechanger");
        setLikeCount(12500);
        setRetweetCount(3200);
        setReplyCount(890);
        setViewCount(125000);
        setIsVerified(true);
        break;
      case "announcement":
        setTweetText("📢 Big announcement coming soon! Stay tuned for updates. #exciting");
        setLikeCount(4500);
        setRetweetCount(1200);
        setReplyCount(340);
        setViewCount(45000);
        break;
      case "question":
        setTweetText("What's your favorite productivity tip? Drop it below! 👇");
        setLikeCount(2300);
        setRetweetCount(560);
        setReplyCount(890);
        setViewCount(23000);
        break;
      case "thread":
        setTweetText("🧵 A quick thread on why this matters:\n\n1. First point\n2. Second point\n3. Third point\n\nWhat do you think?");
        setLikeCount(6800);
        setRetweetCount(2100);
        setReplyCount(450);
        setViewCount(68000);
        break;
    }
  };

  const formatTweetText = (text: string) => {
    // Convert URLs to links
    let formatted = text.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">$1</a>'
    );
    // Convert mentions
    formatted = formatted.replace(
      /@(\w+)/g,
      '<a href="https://twitter.com/$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">@$1</a>'
    );
    // Convert hashtags
    formatted = formatted.replace(
      /#(\w+)/g,
      '<a href="https://twitter.com/hashtag/$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">#$1</a>'
    );
    return formatted;
  };

  const formatTimeAgo = (dateString: string) => {
    // Return original date string during SSR to avoid hydration mismatch
    if (typeof window === "undefined") {
      return dateString;
    }
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      
      if (diffInSeconds < 60) return `${diffInSeconds}s`;
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
      if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
      return dateString;
    } catch {
      return dateString;
    }
  };

  const downloadImage = async () => {
    if (!tweetPreviewRef.current) return;

    try {
      const html2canvasModule = await import("html2canvas");
      
      // Create a temporary container to fix color issues
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      tempContainer.style.width = tweetPreviewRef.current.offsetWidth + "px";
      document.body.appendChild(tempContainer);

      // Clone the preview element
      const cloned = tweetPreviewRef.current.cloneNode(true) as HTMLElement;
      tempContainer.appendChild(cloned);

      // Fix all colors to avoid lab() parsing issues
      const fixColors = (element: HTMLElement) => {
        const computedStyle = window.getComputedStyle(element);
        
        // Fix background
        const bg = customBackgroundColor || (theme === "dark" ? "#000000" : "#ffffff");
        element.style.backgroundColor = bg;
        
        // Fix text color
        const textColor = customTextColor || (theme === "dark" ? "#ffffff" : "#000000");
        element.style.color = textColor;
        
        // Fix border colors
        if (computedStyle.borderColor) {
          element.style.borderColor = theme === "dark" ? "#333333" : "#e5e7eb";
        }

        // Recursively fix child elements
        Array.from(element.children).forEach((child) => {
          fixColors(child as HTMLElement);
        });
      };

      fixColors(cloned);

      const canvas = await html2canvasModule.default(cloned, {
        backgroundColor: customBackgroundColor || (theme === "dark" ? "#000000" : "#ffffff"),
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        removeContainer: true,
      });
      
      document.body.removeChild(tempContainer);
      
      const mimeType = exportFormat === "jpg" ? "image/jpeg" : "image/png";
      const url = canvas.toDataURL(mimeType, exportFormat === "jpg" ? exportQuality : undefined);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tweet-${Date.now()}.${exportFormat}`;
      a.click();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Error generating image:", error);
      }
      alert("Failed to generate image. Please try again.");
    }
  };

  const copyTweetText = () => {
    navigator.clipboard.writeText(tweetText);
    alert("Tweet text copied to clipboard!");
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Twitter className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Free Online Tweet Generator - Create Realistic Fake Twitter/X Mockups
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                Generate realistic fake tweets for entertainment and jokes with friends. Our free Tweet Generator creates authentic-looking Twitter/X mockups with customizable avatars, verified badges, engagement metrics, themes, and more. Perfect for social media mockups, presentations, and harmless pranks.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <FavoriteButton toolId="tweet-generator" />
            <ShareButtons
              title="Fake Tweet Generator"
              text="Check out this free fake tweet generator tool!"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Tweet Preview */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Preview</h2>
                <div className="flex gap-2">
                  <button
                    onClick={copyTweetText}
                    className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    title="Copy tweet text"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={downloadImage}
                    className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    title="Download as image"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div
                ref={tweetPreviewRef}
                className={`${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} rounded-lg border border-slate-200 dark:border-slate-700 p-4`}
              >
                {/* Tweet Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-slate-300 dark:bg-slate-600 flex-shrink-0 overflow-hidden">
                    {avatar ? (
                      <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">
                        <Twitter className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="font-bold text-sm">{name || "Name"}</span>
                      {isVerified && (
                        <div className="flex items-center justify-center w-4 h-4 flex-shrink-0">
                          <svg
                            viewBox="0 0 22 22"
                            aria-label="Verified account"
                            className="w-4 h-4"
                            fill="#1DA1F2"
                          >
                            <g>
                              <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44-.54-.354-1.17-.55-1.816-.57-.646-.02-1.28.158-1.844.487-.564.33-1.034.804-1.38 1.38-.33.564-.507 1.198-.487 1.844.02.646.216 1.276.57 1.816.354.54.704.853 1.245 1.44-.607.223-1.264.27-1.897.14-.634-.13-1.218-.437-1.687-.882-.445-.47-.75-1.053-.882-1.687-.13-.633-.083-1.29.14-1.897-.587-.273-1.086-.704-1.44-1.245-.354-.54-.55-1.17-.57-1.816-.02-.646.158-1.28.487-1.844.33-.564.804-1.034 1.38-1.38.564-.33 1.198-.507 1.844-.487.646.02 1.276.216 1.816.57.54.354.972.852 1.246 1.438.607-.223 1.264-.27 1.897-.14.634.131 1.218.437 1.687.882.47.445.75 1.053.882 1.687.13.633.083 1.29-.14 1.897.587.273 1.086.704 1.44 1.245.354.54.55 1.17.57 1.816.02.646-.158 1.28-.487 1.844-.33.564-.804 1.034-1.38 1.38-.564.33-1.198.507-1.844.487zm-8.814 4.622c-1.25 0-2.427-.49-3.322-1.396-.895-.895-1.396-2.072-1.396-3.322 0-1.25.49-2.427 1.396-3.322.895-.895 2.072-1.396 3.322-1.396 1.25 0 2.427.49 3.322 1.396.895.895 1.396 2.072 1.396 3.322 0 1.25-.49 2.427-1.396 3.322-.895.895-2.072 1.396-3.322 1.396zm4.316-4.922l-1.503 1.504-3.586-3.586 1.503-1.504 3.586 3.586z" />
                            </g>
                          </svg>
                        </div>
                      )}
                      <span className="text-slate-500 dark:text-slate-400 text-sm">@{username || "username"}</span>
                      {location && (
                        <>
                          <span className="text-slate-500 dark:text-slate-400">·</span>
                          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm">
                            <MapPin className="w-3 h-3" />
                            <span>{location}</span>
                          </div>
                        </>
                      )}
                      <span className="text-slate-500 dark:text-slate-400">·</span>
                      <span className="text-slate-500 dark:text-slate-400 text-sm">
                        {isMounted ? formatTimeAgo(tweetDate) : tweetDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    </button>
                    <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                      <Bookmark className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    </button>
                    <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                      <Share2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* Tweet Content */}
                <div className="mb-3">
                  <p
                    className="leading-relaxed whitespace-pre-wrap break-words"
                    style={{ fontSize: `${fontSize}px` }}
                    dangerouslySetInnerHTML={{ __html: formatTweetText(tweetText) }}
                  />
                </div>

                {/* Tweet Images */}
                {tweetImages.length > 0 && (
                  <div className={`mb-3 rounded-lg overflow-hidden ${
                    tweetImages.length === 1 ? "" : "grid grid-cols-2 gap-1"
                  }`}>
                    {tweetImages.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Tweet image ${idx + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    ))}
                  </div>
                )}

                {/* Tweet Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                  <button className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{formatNumber(replyCount)}</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-green-500 transition-colors">
                    <Repeat2 className="w-4 h-4" />
                    <span className="text-sm">{formatNumber(retweetCount)}</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{formatNumber(likeCount)}</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors">
                    <BarChart3 className="w-4 h-4" />
                    <span className="text-sm">{formatNumber(viewCount)}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Form Controls */}
          <div className="space-y-4">
            {/* Theme */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Theme
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as "light" | "dark")}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            {/* Avatar */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Avatar
              </label>
              <label className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <Upload className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Click to upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Tweet Images */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Tweet Images (Up to 4)
                </label>
                {tweetImages.length > 0 && (
                  <button
                    onClick={clearAllImages}
                    className="text-xs text-red-600 dark:text-red-400 hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>
              {tweetImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {tweetImages.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={img}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                      />
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <label className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <ImageIcon className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {tweetImages.length > 0 ? `Add more (${tweetImages.length}/4)` : "Click to upload"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Template Presets */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Quick Templates
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => loadPreset("viral")}
                  className="px-3 py-2 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  Viral
                </button>
                <button
                  onClick={() => loadPreset("announcement")}
                  className="px-3 py-2 text-xs bg-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Announcement
                </button>
                <button
                  onClick={() => loadPreset("question")}
                  className="px-3 py-2 text-xs bg-green-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Question
                </button>
                <button
                  onClick={() => loadPreset("thread")}
                  className="px-3 py-2 text-xs bg-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Thread
                </button>
              </div>
            </div>

            {/* Name */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>

            {/* Username & Verified */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Username
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                  placeholder="johndoe"
                />
                <button
                  onClick={() => setIsVerified(!isVerified)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isVerified
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Verified
                </button>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                User Region (Location)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                placeholder="New York, NY"
              />
            </div>

            {/* Tweet Date */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Tweet Date
              </label>
              <input
                type="text"
                value={tweetDate}
                onChange={(e) => setTweetDate(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                placeholder="December 18, 2026 5:40 PM"
              />
            </div>

            {/* Tweet Text */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Tweet Text
              </label>
              <textarea
                value={tweetText}
                onChange={(e) => setTweetText(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 resize-none"
                rows={6}
                placeholder="Enter your tweet text here..."
              />
              <div className="mt-2 text-right text-xs text-slate-500 dark:text-slate-400">
                {tweetText.length} / 4000
              </div>
            </div>

            {/* Advanced Settings Toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Advanced Settings</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">{showAdvanced ? "Hide" : "Show"}</span>
            </button>

            {/* Advanced Settings */}
            {showAdvanced && (
              <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                {/* Export Format */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Export Format
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setExportFormat("png")}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                        exportFormat === "png"
                          ? "bg-blue-600 text-white"
                          : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600"
                      }`}
                    >
                      PNG
                    </button>
                    <button
                      onClick={() => setExportFormat("jpg")}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                        exportFormat === "jpg"
                          ? "bg-blue-600 text-white"
                          : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600"
                      }`}
                    >
                      JPG
                    </button>
                  </div>
                </div>

                {/* Export Quality (for JPG) */}
                {exportFormat === "jpg" && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Quality: {Math.round(exportQuality * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      value={exportQuality}
                      onChange={(e) => setExportQuality(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                )}

                {/* Font Size */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Font Size: {fontSize}px
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="24"
                    step="1"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Custom Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      Background Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={customBackgroundColor || (theme === "dark" ? "#000000" : "#ffffff")}
                        onChange={(e) => setCustomBackgroundColor(e.target.value)}
                        className="w-12 h-10 rounded border border-slate-300 dark:border-slate-600 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={customBackgroundColor || (theme === "dark" ? "#000000" : "#ffffff")}
                        onChange={(e) => setCustomBackgroundColor(e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
                        placeholder="#ffffff"
                      />
                      {customBackgroundColor && (
                        <button
                          onClick={() => setCustomBackgroundColor("")}
                          className="px-2 text-red-600 dark:text-red-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                      <Type className="w-4 h-4" />
                      Text Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={customTextColor || (theme === "dark" ? "#ffffff" : "#000000")}
                        onChange={(e) => setCustomTextColor(e.target.value)}
                        className="w-12 h-10 rounded border border-slate-300 dark:border-slate-600 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={customTextColor || (theme === "dark" ? "#ffffff" : "#000000")}
                        onChange={(e) => setCustomTextColor(e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
                        placeholder="#000000"
                      />
                      {customTextColor && (
                        <button
                          onClick={() => setCustomTextColor("")}
                          className="px-2 text-red-600 dark:text-red-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Counts */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Reply Count
                </label>
                <input
                  type="number"
                  value={replyCount}
                  onChange={(e) => setReplyCount(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Retweet Count
                </label>
                <input
                  type="number"
                  value={retweetCount}
                  onChange={(e) => setRetweetCount(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Like Count
                </label>
                <input
                  type="number"
                  value={likeCount}
                  onChange={(e) => setLikeCount(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  View Count
                </label>
                <input
                  type="number"
                  value={viewCount}
                  onChange={(e) => setViewCount(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content Sections */}
        <div className="mt-12 space-y-6">
          {/* About Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">What is Online Tweet Generator?</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              <strong>Tweet Generator</strong> is a free online tool for generating tweets for making jokes to your friends, colleagues, or community. It works like a <strong>Tweet maker</strong> that allows you to create realistic-looking Twitter/X mockups. <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Twitter</a> is one of the biggest social networks, and with billions of users sharing information daily, it&apos;s not always possible to verify if the information shared is 100% true or not, just like all other internet sources.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              You can make fun with your friends by generating real-looking tweets online and share the generated tweet images with your friends. Don&apos;t forget that the main intention of this tool is just to <strong>entertain and make jokes</strong> with people, nothing more. So, check out the usage policy below if you have any questions on your mind about usage details.
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              If you need an <strong>online fake Tweet Generator</strong> to make fun of people, this tool will do most of the work for you. For now, basic tweet capabilities are available for keeping things simple. If users need more complex features like link sharing, tweet sharing, tweet flood, liked or retweeted tweet, theming, they will be added soon.
            </p>
          </div>

          {/* How to Use Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">How to Use Online Tweet Generator?</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              You can generate tweet images by following these simple steps:
            </p>
            <ol className="text-slate-700 dark:text-slate-300 space-y-3 list-decimal list-inside">
              <li>
                <strong>Upload images:</strong> Upload the images that will be used in the tweet. You can upload an avatar and up to 4 tweet images. Both are optional, but adding images makes your fake tweet look more realistic.
              </li>
              <li>
                <strong>Choose your theme:</strong> Select between <strong>light</strong> and <strong>dark</strong> themes. This will change the color palette of the tweet to match Twitter&apos;s actual interface.
              </li>
              <li>
                <strong>Enter required fields:</strong> Fill in the name, username, tweet date, tweet content, location, and other details. You can also set tweet statistics that show reply, retweet, like, and view counts to make it look more authentic.
              </li>
              <li>
                <strong>Customize advanced settings (optional):</strong> Use our advanced settings to adjust font size, custom colors, export format (PNG or JPG), and quality settings for the best results.
              </li>
              <li>
                <strong>Export your tweet:</strong> When you&apos;re satisfied with the preview, you can export the tweet according to your needs. You can download it as an image using the &quot;Download&quot; button or copy the tweet text to your clipboard and paste it directly into your messaging channels.
              </li>
            </ol>
          </div>

          {/* Features Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-sm border border-blue-200 dark:border-blue-800 p-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Key Features of Our Tweet Generator</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Realistic Tweet Mockups</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">Create authentic-looking Twitter/X tweets with verified badges, engagement metrics, and proper formatting.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Multiple Image Support</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">Upload up to 4 images per tweet and customize your avatar to match any profile style.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Theme Customization</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">Choose between light and dark themes to match Twitter&apos;s actual interface design.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Quick Templates</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">Use our preset templates for viral tweets, announcements, questions, and threads to get started quickly.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">High-Quality Export</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">Download your tweets as PNG or JPG images with customizable quality settings for sharing on any platform.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Advanced Customization</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">Customize font sizes, colors, engagement metrics, location, and verified badges for complete control.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Handling Note */}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl shadow-sm border border-amber-200 dark:border-amber-800 p-6">
            <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Important Note About Tweet Images
            </h3>
            <p className="text-amber-800 dark:text-amber-200 leading-relaxed mb-3">
              For tweet images, Twitter has a special algorithm to decide which part of the image is worth showing in the tweet body. It detects faces and texts in images and uses these parts in previews. This tool does not have such a mechanism; it just centers the image.
            </p>
            <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
              If you want to show a specific part of an image which is not in the center of the image, you can use our <Link href="/tools/image-resizer" className="text-amber-900 dark:text-amber-100 font-semibold hover:underline">image cropper tool</Link> to crop your images before uploading them to the tweet generator.
            </p>
          </div>

          {/* Usage Policy Section */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl shadow-sm border border-red-200 dark:border-red-800 p-6">
            <h2 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-4">Usage Policy</h2>
            <p className="text-red-800 dark:text-red-200 leading-relaxed mb-4">
              <strong>We are not responsible for the generated images by users.</strong> By using this Tweet Generator, you agree to use our tool lawfully and ethically, and in accordance with these rules:
            </p>
            <ul className="text-red-800 dark:text-red-200 space-y-3 list-disc list-inside">
              <li>
                <strong>No harmful intent:</strong> You do not use generated images to create content that has ill intent including but not limited to harass, attack, incite violence, slander, threaten, disparage, intimidate, or otherwise hurt other people or entities.
              </li>
              <li>
                <strong>No false information:</strong> You do not use generated images to spread false information that will affect human life in a negative way.
              </li>
              <li>
                <strong>Transparency:</strong> You do not present generated images as fact. As described, the main intent is having a good time by making fun of people, not just misleading them.
              </li>
              <li>
                <strong>Clear disclosure:</strong> You make it obvious to any viewers that generated images are not original/genuine. Always indicate that the tweet is a mockup or fake when sharing.
              </li>
            </ul>
            <p className="text-red-800 dark:text-red-200 leading-relaxed mt-4 font-semibold">
              Remember: This tool is designed for entertainment purposes only. Use it responsibly and ethically.
            </p>
          </div>

          {/* Related Tools Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl shadow-sm border border-purple-200 dark:border-purple-800 p-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Related Social Media Tools</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Looking for more social media tools? Check out our other free online tools:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/tools/tweet-to-image" className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Tweet to Image Converter</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Convert your tweets into beautiful images</div>
              </Link>
              <Link href="/tools/instagram-post-generator" className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Instagram Post Generator</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Generate engaging Instagram posts</div>
              </Link>
              <Link href="/tools/image-resizer" className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Image Resizer & Cropper</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Crop and resize images for social media</div>
              </Link>
              <Link href="/tools/hashtag-generator" className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Hashtag Generator</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Generate trending hashtags for your tweets</div>
              </Link>
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
