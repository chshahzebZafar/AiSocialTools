"use client";

import { useState, useRef, useEffect } from "react";
import { Instagram, Download, Upload, Image as ImageIcon, MoreHorizontal, Bookmark, Share2, MessageCircle, Heart, MapPin, X } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

export default function InstagramPostGeneratorPage() {
  const tool = getToolById("instagram-post-generator");
  const postPreviewRef = useRef<HTMLDivElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const postImageInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [username, setUsername] = useState("johndoe");
  const [isVerified, setIsVerified] = useState(false);
  const [avatar, setAvatar] = useState<string>("");
  const [location, setLocation] = useState("New York, USA");
  const [postDate, setPostDate] = useState("1m");
  const [postImage, setPostImage] = useState<string>("");
  const [imageCount, setImageCount] = useState(1);
  const [postText, setPostText] = useState("This is a sample post text. @mentions, #hashtags, https://links.com are all automatically converted.");
  const [likeCount, setLikeCount] = useState(1234);
  const [commentCount, setCommentCount] = useState(1234);
  const [isLiked, setIsLiked] = useState(true);
  const [isTagged, setIsTagged] = useState(true);
  const [hasStory, setHasStory] = useState(true);
  const [showComments, setShowComments] = useState(true);
  const [firstCommentUsername, setFirstCommentUsername] = useState("janedoe");
  const [firstCommentText, setFirstCommentText] = useState("I liked the post John. Thanks for sharing.");
  const [secondCommentUsername, setSecondCommentUsername] = useState("johnniedoe");
  const [secondCommentText, setSecondCommentText] = useState("🔥🔥🔥");

  // Export settings
  const [exportFormat, setExportFormat] = useState<"png" | "jpg">("png");
  const [exportQuality, setExportQuality] = useState(0.9);

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

  const handlePostImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatPostText = (text: string) => {
    let formatted = text;
    // Convert URLs to links (using Instagram blue #0095F6)
    formatted = formatted.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #0095F6; text-decoration: none;">$1</a>'
    );
    // Convert mentions
    formatted = formatted.replace(
      /@(\w+)/g,
      '<a href="https://instagram.com/$1" target="_blank" rel="noopener noreferrer" style="color: #0095F6; text-decoration: none; font-weight: 600;">@$1</a>'
    );
    // Convert hashtags
    formatted = formatted.replace(
      /#(\w+)/g,
      '<a href="https://instagram.com/explore/tags/$1" target="_blank" rel="noopener noreferrer" style="color: #0095F6; text-decoration: none;">#$1</a>'
    );
    return formatted;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const downloadImage = async () => {
    if (!postPreviewRef.current) return;

    try {
      const html2canvasModule = await import("html2canvas");
      
      // Create a temporary container to fix color issues
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      tempContainer.style.width = postPreviewRef.current.offsetWidth + "px";
      tempContainer.style.overflow = "visible"; // Ensure content is not clipped
      document.body.appendChild(tempContainer);

      // Clone the preview element
      const cloned = postPreviewRef.current.cloneNode(true) as HTMLElement;
      cloned.style.width = postPreviewRef.current.offsetWidth + "px";
      cloned.style.maxWidth = "100%";
      cloned.style.overflow = "visible"; // Ensure content is not clipped
      tempContainer.appendChild(cloned);

      // Fix all colors to avoid lab() parsing issues
      const fixColors = (element: HTMLElement) => {
        const computedStyle = window.getComputedStyle(element);
        const tagName = element.tagName.toLowerCase();
        
        // Skip SVG elements and their children
        if (tagName === 'svg' || tagName === 'path' || tagName === 'defs' || tagName === 'linearGradient' || tagName === 'stop' || tagName === 'g') {
          // Only process text nodes if it's a text element
          Array.from(element.children).forEach((child) => {
            if (child.tagName.toLowerCase() !== 'svg' && child.tagName.toLowerCase() !== 'path') {
              fixColors(child as HTMLElement);
            }
          });
          return;
        }
        
        // Fix background for container elements
        const bgColor = computedStyle.backgroundColor;
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent' && !bgColor.includes('gradient')) {
          const bg = theme === "dark" ? "#000000" : "#ffffff";
          if (bgColor === 'rgb(0, 0, 0)' || bgColor === 'rgb(255, 255, 255)' || bgColor.includes('black') || bgColor.includes('white')) {
            element.style.backgroundColor = bg;
          }
        }
        
        // Fix text color based on computed styles
        const textColor = computedStyle.color;
        const hasTextColor = textColor && textColor !== 'rgba(0, 0, 0, 0)' && textColor !== 'transparent';
        
        if (hasTextColor) {
          // Check if it's a link (has inline style with Instagram blue or is an <a> tag)
          const isLink = tagName === 'a' || element.closest('a') || element.style.color === '#0095F6' || element.style.color === 'rgb(0, 149, 246)';
          
          if (isLink) {
            // Keep link color as Instagram blue
            element.style.color = "#0095F6";
          } else {
            // Since we're using conditional classes, preserve the computed color
            // but ensure black/white text is correct for the theme
            const rgbColor = textColor;
            if (rgbColor === 'rgb(0, 0, 0)' || rgbColor.includes('rgb(0, 0, 0)')) {
              element.style.color = theme === "dark" ? "#ffffff" : "#000000";
            } else if (rgbColor === 'rgb(255, 255, 255)' || rgbColor.includes('rgb(255, 255, 255)')) {
              element.style.color = theme === "dark" ? "#ffffff" : "#000000";
            }
            // For gray colors, preserve them as they're already set by conditional classes
          }
        }
        
        // Fix border colors
        if (computedStyle.borderColor && computedStyle.borderColor !== "rgba(0, 0, 0, 0)" && computedStyle.borderColor !== 'transparent') {
          element.style.borderColor = theme === "dark" ? "#333333" : "#e5e7eb";
        }

        // Recursively fix child elements
        Array.from(element.children).forEach((child) => {
          fixColors(child as HTMLElement);
        });
      };

      fixColors(cloned);

      const canvas = await html2canvasModule.default(cloned, {
        backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        removeContainer: true,
        windowWidth: cloned.scrollWidth,
        windowHeight: cloned.scrollHeight,
      });
      
      document.body.removeChild(tempContainer);
      
      const mimeType = exportFormat === "jpg" ? "image/jpeg" : "image/png";
      const url = canvas.toDataURL(mimeType, exportFormat === "jpg" ? exportQuality : undefined);
      const a = document.createElement("a");
      a.href = url;
      a.download = `instagram-post-${Date.now()}.${exportFormat}`;
      a.click();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Error generating image:", error);
      }
      alert("Failed to generate image. Please try again.");
    }
  };

  const defaultAvatar = (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
      {username.charAt(0).toUpperCase()}
    </div>
  );

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Instagram Post Generator - Create Beautiful Instagram Post Mockups
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mt-2">
                Create professional Instagram post mockups with customizable images, captions, comments, and engagement metrics. Perfect for marketing, design, and social media planning.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            {tool && <FavoriteButton toolId={tool.id} />}
            <ShareButtons
              title="Instagram Post Generator"
              text="Check out this free Instagram post generator tool!"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preview Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Preview</h2>
              <div className="flex items-center gap-2">
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as "light" | "dark")}
                  className="px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
                <button
                  onClick={downloadImage}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2 text-sm"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            <div
              ref={postPreviewRef}
              className={`w-full max-w-sm mx-auto rounded-lg border ${
                theme === "dark" ? "bg-black border-gray-800" : "bg-white border-gray-200"
              }`}
            >
              {/* Header */}
              <div className={`flex items-center justify-between p-3 border-b ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    defaultAvatar
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-semibold text-sm ${theme === "dark" ? "text-white" : "text-black"}`}>
                        {username}
                      </span>
                      {isVerified && (
                        <div className="flex items-center justify-center w-4 h-4 flex-shrink-0">
                          <svg
                            viewBox="0 0 24 24"
                            aria-label="Verified"
                            className="w-4 h-4"
                            fill="#0095F6"
                          >
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-6.157 6.156a1.003 1.003 0 01-1.414 0l-3.5-3.5a1.003 1.003 0 011.414-1.414l2.793 2.793 5.543-5.543a1.003 1.003 0 011.321-.08z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {location && (
                      <div className={`flex items-center gap-1 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        <MapPin className="w-3 h-3" />
                        <span>{location}</span>
                      </div>
                    )}
                    {!location && (
                      <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{postDate}</span>
                    )}
                  </div>
                </div>
                <MoreHorizontal className={`w-5 h-5 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
              </div>

              {/* Post Image */}
              <div className="relative aspect-square bg-slate-100 dark:bg-slate-900">
                {postImage ? (
                  <>
                    <img
                      src={postImage}
                      alt="Post"
                      className="w-full h-full object-cover"
                    />
                    {imageCount > 1 && (
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
                        {Array.from({ length: imageCount }).map((_, i) => (
                          <div
                            key={i}
                            className={`rounded-full transition-all ${
                              i === 0 
                                ? "w-1.5 h-1.5 bg-white" 
                                : "w-1.5 h-1.5 bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600">
                    <ImageIcon className="w-16 h-16" />
                  </div>
                )}
              </div>

              {/* Engagement Icons */}
              <div className={`flex items-center justify-between p-3 border-b ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
                <div className="flex items-center gap-4">
                  <Heart className={`w-6 h-6 ${isLiked ? "text-red-500 fill-red-500" : theme === "dark" ? "text-gray-300" : "text-gray-700"}`} />
                  <MessageCircle className={`w-6 h-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`} />
                  <Share2 className={`w-6 h-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`} />
                </div>
                <Bookmark className={`w-6 h-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`} />
              </div>

              {/* Likes */}
              <div className="px-3 py-2">
                <span className={`font-semibold text-sm ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {formatNumber(likeCount)} likes
                </span>
              </div>

              {/* Caption */}
              <div className="px-3 pb-2">
                <div className={`text-sm ${theme === "dark" ? "text-white" : "text-black"}`}>
                  <span className="font-semibold">{username}</span>{" "}
                  <span dangerouslySetInnerHTML={{ __html: formatPostText(postText) }} />
                </div>
              </div>

              {/* Comments */}
              {showComments && commentCount > 0 && (
                <div className="px-3 pb-2">
                  <button className={`text-sm ${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}>
                    View all {formatNumber(commentCount)} comments
                  </button>
                  {firstCommentText && (
                    <div className="mt-2 text-sm">
                      <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
                        {firstCommentUsername}
                      </span>{" "}
                      <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>{firstCommentText}</span>
                    </div>
                  )}
                  {secondCommentText && (
                    <div className="mt-1 text-sm">
                      <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
                        {secondCommentUsername}
                      </span>{" "}
                      <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>{secondCommentText}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className={`px-3 py-2 text-xs border-t ${theme === "dark" ? "text-gray-400 border-gray-800" : "text-gray-500 border-gray-200"}`}>
                {postDate}
              </div>
            </div>
          </div>

          {/* Configuration Section */}
          <div className="space-y-6">
            {/* Post Body */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Post Body</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Theme
                  </label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value as "light" | "dark")}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Username
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      placeholder="johndoe"
                    />
                    <button
                      onClick={() => setIsVerified(!isVerified)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        isVerified
                          ? "bg-blue-500 text-white"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      Verified
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Description (Location)
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    placeholder="New York, USA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Post Date
                  </label>
                  <input
                    type="text"
                    value={postDate}
                    onChange={(e) => setPostDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    placeholder="1m"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Avatar
                  </label>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => avatarInputRef.current?.click()}
                    className="w-full px-4 py-2 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:border-purple-500 dark:hover:border-purple-500 transition-colors text-slate-600 dark:text-slate-400"
                  >
                    Click to upload
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Post Image
                  </label>
                  <input
                    ref={postImageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePostImageUpload}
                    className="hidden"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => postImageInputRef.current?.click()}
                      className="flex-1 px-4 py-2 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:border-purple-500 dark:hover:border-purple-500 transition-colors text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      {postImage ? "Change Image" : "Upload"}
                    </button>
                    {postImage && (
                      <button
                        onClick={() => setPostImage("")}
                        className="p-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  {postImage && (
                    <div className="mt-2 relative w-20 h-20 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                      <img
                        src={postImage}
                        alt="Post preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Post Text (max. 120 characters will be seen)
                  </label>
                  <textarea
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 resize-none"
                    rows={4}
                    placeholder="Write your post caption here..."
                    maxLength={2200}
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {postText.length} / 2200 characters
                  </p>
                </div>
              </div>
            </div>

            {/* Stats & States */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Stats & States</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Image Count
                  </label>
                  <select
                    value={imageCount}
                    onChange={(e) => setImageCount(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Like Count
                  </label>
                  <input
                    type="number"
                    value={likeCount}
                    onChange={(e) => setLikeCount(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Comment Count
                  </label>
                  <input
                    type="number"
                    value={commentCount}
                    onChange={(e) => setCommentCount(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isLiked}
                      onChange={(e) => setIsLiked(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Is post liked by viewer?</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isTagged}
                      onChange={(e) => setIsTagged(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Is someone tagged?</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasStory}
                      onChange={(e) => setHasStory(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Has an Instagram story?</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showComments}
                      onChange={(e) => setShowComments(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Are comments displayed?</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Comments */}
            {showComments && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Comments</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      First Comment Username
                    </label>
                    <input
                      type="text"
                      value={firstCommentUsername}
                      onChange={(e) => setFirstCommentUsername(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      placeholder="janedoe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      First Comment Text
                    </label>
                    <input
                      type="text"
                      value={firstCommentText}
                      onChange={(e) => setFirstCommentText(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      placeholder="Comment text..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Second Comment Username
                    </label>
                    <input
                      type="text"
                      value={secondCommentUsername}
                      onChange={(e) => setSecondCommentUsername(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      placeholder="johnniedoe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Second Comment Text
                    </label>
                    <input
                      type="text"
                      value={secondCommentText}
                      onChange={(e) => setSecondCommentText(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      placeholder="Comment text..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Export Settings */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Export Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Format
                  </label>
                  <select
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value as "png" | "jpg")}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="png">PNG</option>
                    <option value="jpg">JPG</option>
                  </select>
                </div>

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

                <button
                  onClick={downloadImage}
                  className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Export Instagram Post
                </button>
              </div>
            </div>

            {/* Footer Note */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
                By using Instagram Post Generator by{" "}
                <a href="https://socialmediatools.netlify.app" className="text-purple-600 hover:underline">
                  socialmediatools.netlify.app
                </a>
                , you agree to our Usage Policy.
              </p>
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
