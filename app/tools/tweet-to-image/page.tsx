"use client";

import { useState, useRef, useEffect } from "react";
import { FileImage, Download, Settings, X, Maximize2, Twitter, Check, Sliders, Image as ImageIcon, Globe, Eye, EyeOff, Link as LinkIcon, ExternalLink, Share2, MessageCircle, Facebook, Copy } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

type LayoutType = "wide" | "compact" | "square";
type BackgroundType = "gradient" | "solid" | "image";
type ShadowType = "none" | "small" | "medium" | "large";
type ImageQuality = "1x" | "2x" | "3x";
type GradientType = "preset" | "custom";

const gradients = {
  sunset: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
  ocean: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  forest: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
  fire: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  sky: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  purple: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  orange: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  blue: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
};

export default function TweetToImagePage() {
  const tool = getToolById("tweet-to-image");
  const seo = tool ? getSEOMetadata(tool) : null;
  const previewRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Tweet URL and capture
  const [tweetUrl, setTweetUrl] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  // Tweet Settings (Before Capture)
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [language, setLanguage] = useState("en");
  const [tweetTransparency, setTweetTransparency] = useState<"none" | "low" | "medium" | "high">("low");
  const [hideParentTweet, setHideParentTweet] = useState(true);
  const [hideFooter, setHideFooter] = useState(true);
  const [hideLinks, setHideLinks] = useState(true);

  // Image Settings
  const [layout, setLayout] = useState<LayoutType>("wide");
  const [backgroundType, setBackgroundType] = useState<BackgroundType>("gradient");
  const [gradientType, setGradientType] = useState<GradientType>("preset");
  const [selectedGradient, setSelectedGradient] = useState<keyof typeof gradients>("sunset");
  const [customGradientColors, setCustomGradientColors] = useState<string[]>(["#ff9a9e", "#fecfef"]);
  const [gradientAngle, setGradientAngle] = useState(135);
  const [padding, setPadding] = useState(20);
  const [shadow, setShadow] = useState<ShadowType>("none");
  const [imageQuality, setImageQuality] = useState<ImageQuality>("1x");
  const [addWatermark, setAddWatermark] = useState(true); // Default enabled
  const [supportWatermark, setSupportWatermark] = useState(true); // Default enabled
  const [customWatermarkText, setCustomWatermarkText] = useState("socialmediatools.netlify.app");
  const [watermarkPosition, setWatermarkPosition] = useState<"bottom-left" | "bottom-right" | "bottom-center" | "top-left" | "top-right" | "top-center">("bottom-right");
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.6);
  const [watermarkSize, setWatermarkSize] = useState(14);
  const [watermarkColor, setWatermarkColor] = useState("#ffffff");
  const [customBackgroundColor, setCustomBackgroundColor] = useState("#ffffff");
  const [borderRadius, setBorderRadius] = useState(12);
  const [showFullscreen, setShowFullscreen] = useState(false);

  // Mock tweet data (in real app, this would come from Twitter API)
  const [tweetData, setTweetData] = useState({
    name: "Social Media Tools",
    username: "@socialmediatools",
    avatar: "",
    text: "Hello world! 👋 Do you know that **Social Media Tools** offers the best online tool for converting tweets into fancy images with lots of customization options? 🐦🔄🖼️",
    hashtags: ["#tweet", "#image", "#converter"],
    timestamp: "7:13 PM · Feb 19, 2022",
    likes: 0,
    retweets: 0,
    replies: 0,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCapture = async () => {
    if (!tweetUrl.trim()) {
      alert("Please enter a Tweet URL");
      return;
    }

    setIsCapturing(true);
    // In a real implementation, you would fetch the tweet data from Twitter API
    // For now, we'll use mock data
    setTimeout(() => {
      setIsCapturing(false);
      // Mock tweet data would be set here
    }, 1000);
  };

  const generateImageCanvas = async () => {
    if (!previewRef.current) {
      console.error("Preview ref is not available");
      return null;
    }

    try {
      const html2canvasModule = await import("html2canvas");
      const scale = imageQuality === "1x" ? 1 : imageQuality === "2x" ? 2 : 3;
      
      // Create a temporary container to fix color issues
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      tempContainer.style.width = previewRef.current.offsetWidth + "px";
      tempContainer.style.height = previewRef.current.offsetHeight + "px";
      document.body.appendChild(tempContainer);

      // Clone the preview element
      const cloned = previewRef.current.cloneNode(true) as HTMLElement;
      tempContainer.appendChild(cloned);

      // Fix all colors to avoid lab() parsing issues
      const fixColors = (element: HTMLElement) => {
        const computedStyle = window.getComputedStyle(element);
        
        // Fix background colors
        const bgStyle = getBackgroundStyle();
        if (bgStyle) {
          element.style.background = bgStyle;
        }
        
        // Fix text colors
        if (theme === "dark") {
          element.style.color = "#ffffff";
        } else {
          element.style.color = "#000000";
        }
        
        // Fix border colors
        if (computedStyle.borderColor && computedStyle.borderColor !== "rgba(0, 0, 0, 0)") {
          element.style.borderColor = theme === "dark" ? "#333333" : "#e5e7eb";
        }

        // Recursively fix child elements
        Array.from(element.children).forEach((child) => {
          fixColors(child as HTMLElement);
        });
      };

      fixColors(cloned);

      // Get background color for canvas
      const bgColor = backgroundType === "solid" 
        ? (customBackgroundColor || "#ffffff")
        : (theme === "dark" ? "#000000" : "#ffffff");

      const canvas = await html2canvasModule.default(cloned, {
        backgroundColor: bgColor,
        scale: scale,
        useCORS: true,
        logging: false,
        allowTaint: true,
        removeContainer: true,
      });
      
      // Clean up
      document.body.removeChild(tempContainer);
      
      return canvas;
    } catch (error) {
      console.error("Error generating image:", error);
      if (process.env.NODE_ENV === 'development') {
        console.error("Full error details:", error);
      }
      return null;
    }
  };

  const downloadImage = async () => {
    const canvas = await generateImageCanvas();
    if (!canvas) {
      alert("Failed to generate image. Please try again.");
      return;
    }
    
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `tweet-image-${Date.now()}.png`;
    a.click();
  };

  const copyImageToClipboard = async () => {
    try {
      const canvas = await generateImageCanvas();
      if (!canvas) {
        alert("Failed to generate image. Please try again.");
        return;
      }

      // Convert canvas to blob
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/png");
      });

      if (!blob) {
        alert("Failed to convert image. Please try downloading instead.");
        return;
      }

      // Try modern clipboard API with image support
      if (navigator.clipboard && navigator.clipboard.write) {
        try {
          const item = new ClipboardItem({ "image/png": blob });
          await navigator.clipboard.write([item]);
          alert("Image copied to clipboard! You can now paste it anywhere.");
          return;
        } catch (err) {
          console.warn("ClipboardItem not supported, trying fallback:", err);
        }
      }

      // Fallback: Copy as data URL to clipboard (text)
      try {
        const dataUrl = canvas.toDataURL("image/png");
        await navigator.clipboard.writeText(dataUrl);
        alert("Image data copied! For better results, right-click the preview and select 'Copy Image' or download the image.");
      } catch (err) {
        console.error("Failed to copy image:", err);
        alert("Copying images is not supported in this browser. Please download the image and copy it manually.");
      }
    } catch (error) {
      console.error("Error copying image:", error);
      alert("Failed to copy image. Please try downloading instead.");
    }
  };

  const shareImage = async (platform?: "twitter" | "facebook" | "whatsapp" | "native") => {
    try {
      const canvas = await generateImageCanvas();
      if (!canvas) {
        alert("Failed to generate image. Please try again.");
        return;
      }

      // Convert canvas to blob
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/png");
      });

      if (!blob) {
        alert("Failed to convert image. Please try downloading instead.");
        return;
      }

      const file = new File([blob], `tweet-image-${Date.now()}.png`, { type: "image/png" });
      const shareUrl = typeof window !== "undefined" ? window.location.href : "";
      const shareText = "Check out this tweet image I created!";

      // Native share with file support
      if (platform === "native") {
        if (navigator.share) {
          // Check if file sharing is supported
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                title: "Tweet Image",
                text: shareText,
                files: [file],
              });
              return;
            } catch (err: any) {
              if (err.name !== "AbortError") {
                console.error("Share error:", err);
                // Fall through to URL sharing
              } else {
                // User cancelled
                return;
              }
            }
          }
          
          // Fallback: Share URL if file sharing not supported
          try {
            await navigator.share({
              title: "Tweet Image",
              text: shareText,
              url: shareUrl,
            });
            return;
          } catch (err: any) {
            if (err.name !== "AbortError") {
              console.error("Share error:", err);
            }
            // User cancelled or error
            return;
          }
        } else {
          alert("Sharing is not supported on this device. Please download the image and share manually.");
          return;
        }
      }

      // Social media platform sharing (URL-based)
      if (platform === "twitter") {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterUrl, "_blank", "noopener,noreferrer");
      } else if (platform === "facebook") {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(facebookUrl, "_blank", "noopener,noreferrer");
      } else if (platform === "whatsapp") {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      console.error("Error sharing image:", error);
      alert("Failed to share image. Please try downloading and sharing manually.");
    }
  };

  const getShadowStyle = () => {
    switch (shadow) {
      case "small":
        return "0 2px 4px rgba(0,0,0,0.1)";
      case "medium":
        return "0 4px 8px rgba(0,0,0,0.15)";
      case "large":
        return "0 8px 16px rgba(0,0,0,0.2)";
      default:
        return "none";
    }
  };

  const getTransparency = () => {
    switch (tweetTransparency) {
      case "none":
        return "1";
      case "low":
        return "0.95";
      case "medium":
        return "0.85";
      case "high":
        return "0.75";
      default:
        return "1";
    }
  };

  const formatTweetText = (text: string) => {
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">$1</a>'
    );
    return formatted;
  };

  const getBackgroundStyle = () => {
    if (backgroundType === "gradient") {
      if (gradientType === "custom") {
        const colorStops = customGradientColors.map((color, index) => {
          const percentage = (index / (customGradientColors.length - 1)) * 100;
          return `${color} ${percentage}%`;
        }).join(", ");
        return `linear-gradient(${gradientAngle}deg, ${colorStops})`;
      }
      return gradients[selectedGradient];
    } else if (backgroundType === "solid") {
      return customBackgroundColor || "#ffffff";
    }
    return gradients[selectedGradient]; // Default to gradient
  };

  const addGradientColor = () => {
    if (customGradientColors.length < 5) {
      setCustomGradientColors([...customGradientColors, "#000000"]);
    }
  };

  const removeGradientColor = (index: number) => {
    if (customGradientColors.length > 2) {
      setCustomGradientColors(customGradientColors.filter((_, i) => i !== index));
    }
  };

  const updateGradientColor = (index: number, color: string) => {
    const newColors = [...customGradientColors];
    newColors[index] = color;
    setCustomGradientColors(newColors);
  };

  const getLayoutClass = () => {
    switch (layout) {
      case "wide":
        return "w-full max-w-4xl";
      case "compact":
        return "w-full max-w-2xl";
      case "square":
        return "w-full max-w-lg aspect-square";
      default:
        return "w-full max-w-4xl";
    }
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <FileImage className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Tweet to Image Converter - Convert Twitter/X Posts to Images
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                Convert any Twitter/X tweet into a beautiful, customizable image with gradients, themes, and advanced settings. Perfect for social media sharing and marketing.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            {tool && <FavoriteButton toolId={tool.id} />}
            <ShareButtons
              title="Tweet to Image Converter"
              text="Check out this free tweet to image converter tool!"
            />
          </div>
        </div>

        {/* Top Section - URL Input and Actions */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Tweet URL
              </label>
              <input
                type="url"
                value={tweetUrl}
                onChange={(e) => setTweetUrl(e.target.value)}
                placeholder="e.g. https://x.com/socialmediatools/status/1495069139811061764"
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div className="flex items-end gap-3">
              <button
                onClick={handleCapture}
                disabled={isCapturing}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FileImage className="w-5 h-5" />
                {isCapturing ? "Capturing..." : "Capture"}
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  showSettings
                    ? "bg-purple-600 text-white"
                    : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600"
                }`}
              >
                <Settings className="w-5 h-5" />
                Settings
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Preview Section */}
          <div className={`${showSettings ? "lg:col-span-2" : "lg:col-span-3"}`}>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Preview</h2>
                <button
                  onClick={() => setShowFullscreen(!showFullscreen)}
                  className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                >
                  <Maximize2 className="w-4 h-4" />
                  Fullscreen Preview
                </button>
              </div>

              <div
                ref={previewRef}
                className={`${getLayoutClass()} mx-auto relative`}
                style={{
                  background: getBackgroundStyle(),
                  padding: `${padding}px`,
                  minHeight: "400px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: `${borderRadius}px`,
                  position: "relative",
                }}
              >
                <div
                  className={`w-full rounded-xl ${
                    theme === "dark" ? "bg-black text-white" : "bg-white text-black"
                  }`}
                  style={{
                    opacity: getTransparency(),
                    boxShadow: getShadowStyle(),
                    padding: "20px",
                  }}
                >
                  {/* Tweet Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                      <Twitter className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm">{tweetData.name}</span>
                        <span className="text-slate-500 dark:text-slate-400 text-sm">{tweetData.username}</span>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                      <X className="w-4 h-4 text-slate-500" />
                    </button>
                  </div>

                  {/* Tweet Content */}
                  <div className="mb-3">
                    <p
                      className="text-sm leading-relaxed whitespace-pre-wrap break-words"
                      dangerouslySetInnerHTML={{ __html: formatTweetText(tweetData.text) }}
                    />
                  </div>

                  {/* Hashtags */}
                  {tweetData.hashtags.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {tweetData.hashtags.map((tag, idx) => (
                        <span key={idx} className="text-blue-500 text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer (if not hidden) */}
                  {!hideFooter && (
                    <div className="flex items-center gap-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                      <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500">
                        <span className="text-sm">{tweetData.replies}</span>
                      </button>
                      <button className="flex items-center gap-2 text-slate-500 hover:text-green-500">
                        <span className="text-sm">{tweetData.retweets}</span>
                      </button>
                      <button className="flex items-center gap-2 text-slate-500 hover:text-red-500">
                        <span className="text-sm">{tweetData.likes}</span>
                      </button>
                    </div>
                  )}

                  {/* Timestamp */}
                  <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                    {tweetData.timestamp}
                  </div>
                </div>

                {/* Watermark - positioned absolutely over the preview */}
                {addWatermark && (
                  <div
                    className="absolute pointer-events-auto"
                    style={{
                      [watermarkPosition.includes("bottom") ? "bottom" : "top"]: `${padding + 10}px`,
                      [watermarkPosition.includes("left") ? "left" : watermarkPosition.includes("right") ? "right" : "left"]: watermarkPosition.includes("center") ? "50%" : `${padding + 10}px`,
                      transform: watermarkPosition.includes("center") ? "translateX(-50%)" : "none",
                      opacity: watermarkOpacity,
                      fontSize: `${watermarkSize}px`,
                      color: watermarkColor,
                      fontWeight: 500,
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      zIndex: 10,
                    }}
                  >
                    <a
                      href="https://socialmediatools.netlify.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      style={{ color: watermarkColor }}
                    >
                      {supportWatermark ? customWatermarkText : "Generated with Tweet to Image Converter"}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Customization Options */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="watermark"
                    checked={addWatermark}
                    onChange={(e) => setAddWatermark(e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="watermark" className="text-sm text-slate-700 dark:text-slate-300">
                    Add Your Watermark
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Layout
                  </label>
                  <div className="flex gap-3">
                    {(["wide", "compact", "square"] as LayoutType[]).map((layoutOption) => (
                      <button
                        key={layoutOption}
                        onClick={() => setLayout(layoutOption)}
                        className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors capitalize ${
                          layout === layoutOption
                            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                            : "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                        }`}
                      >
                        {layoutOption}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Background Type
                  </label>
                  <select
                    value={backgroundType}
                    onChange={(e) => setBackgroundType(e.target.value as BackgroundType)}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 capitalize"
                  >
                    <option value="gradient">Gradient</option>
                    <option value="solid">Solid</option>
                    <option value="image">Image</option>
                  </select>
                </div>

                {backgroundType === "gradient" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Gradient Type
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setGradientType("preset")}
                          className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
                            gradientType === "preset"
                              ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                              : "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                          }`}
                        >
                          Preset
                        </button>
                        <button
                          onClick={() => setGradientType("custom")}
                          className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
                            gradientType === "custom"
                              ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                              : "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                          }`}
                        >
                          Custom
                        </button>
                      </div>
                    </div>

                    {gradientType === "preset" ? (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Preset Gradients
                        </label>
                        <select
                          value={selectedGradient}
                          onChange={(e) => setSelectedGradient(e.target.value as keyof typeof gradients)}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 capitalize"
                        >
                          {Object.keys(gradients).map((grad) => (
                            <option key={grad} value={grad}>
                              {grad}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Gradient Angle: {gradientAngle}°
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="360"
                            value={gradientAngle}
                            onChange={(e) => setGradientAngle(parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Gradient Colors ({customGradientColors.length}/5)
                            </label>
                            {customGradientColors.length < 5 && (
                              <button
                                onClick={addGradientColor}
                                className="text-xs text-purple-600 dark:text-purple-400 hover:underline"
                              >
                                + Add Color
                              </button>
                            )}
                          </div>
                          <div className="space-y-2">
                            {customGradientColors.map((color, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <input
                                  type="color"
                                  value={color}
                                  onChange={(e) => updateGradientColor(index, e.target.value)}
                                  className="w-12 h-10 rounded border border-slate-300 dark:border-slate-600 cursor-pointer"
                                />
                                <input
                                  type="text"
                                  value={color}
                                  onChange={(e) => updateGradientColor(index, e.target.value)}
                                  className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm"
                                  placeholder="#000000"
                                />
                                {customGradientColors.length > 2 && (
                                  <button
                                    onClick={() => removeGradientColor(index)}
                                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    title="Remove color"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700" style={{ background: getBackgroundStyle(), minHeight: "60px" }}>
                            <p className="text-xs text-slate-600 dark:text-slate-400 text-center">Gradient Preview</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {backgroundType === "solid" && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Background Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={customBackgroundColor}
                        onChange={(e) => setCustomBackgroundColor(e.target.value)}
                        className="w-12 h-10 rounded border border-slate-300 dark:border-slate-600 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={customBackgroundColor}
                        onChange={(e) => setCustomBackgroundColor(e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm"
                        placeholder="#ffffff"
                      />
                    </div>
                    <div className="mt-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700" style={{ background: customBackgroundColor, minHeight: "60px" }}>
                      <p className="text-xs text-slate-600 dark:text-slate-400 text-center">Color Preview</p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <button
                    onClick={downloadImage}
                    className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Export Image
                  </button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => shareImage("native")}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2 text-sm"
                      title="Share image"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                    <button
                      onClick={copyImageToClipboard}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2 text-sm"
                      title="Copy image to clipboard"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 text-center">Share to:</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => shareImage("twitter")}
                        className="flex-1 px-3 py-2 bg-black dark:bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5 text-xs"
                        title="Share on Twitter/X"
                      >
                        <Twitter className="w-3.5 h-3.5" />
                        Twitter
                      </button>
                      <button
                        onClick={() => shareImage("facebook")}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 text-xs"
                        title="Share on Facebook"
                      >
                        <Facebook className="w-3.5 h-3.5" />
                        Facebook
                      </button>
                      <button
                        onClick={() => shareImage("whatsapp")}
                        className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-1.5 text-xs"
                        title="Share on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">Settings</h3>

                <div className="space-y-6">
                  {/* Tweet Settings */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Check className="w-4 h-4 text-green-500" />
                      <Twitter className="w-4 h-4 text-blue-500" />
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                        Tweet Settings (Before Capture)
                      </h4>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Theme
                        </label>
                        <select
                          value={theme}
                          onChange={(e) => setTheme(e.target.value as "light" | "dark")}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 capitalize"
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Language
                        </label>
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="cs">Czech</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Tweet Transparency
                        </label>
                        <select
                          value={tweetTransparency}
                          onChange={(e) => setTweetTransparency(e.target.value as typeof tweetTransparency)}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="none">No Transparency</option>
                          <option value="low">Low Transparency</option>
                          <option value="medium">Medium Transparency</option>
                          <option value="high">High Transparency</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="hideParent"
                            checked={hideParentTweet}
                            onChange={(e) => setHideParentTweet(e.target.checked)}
                            className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                          />
                          <label htmlFor="hideParent" className="text-sm text-slate-700 dark:text-slate-300">
                            Hide Parent Tweet (If any)
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="hideFooter"
                            checked={hideFooter}
                            onChange={(e) => setHideFooter(e.target.checked)}
                            className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                          />
                          <label htmlFor="hideFooter" className="text-sm text-slate-700 dark:text-slate-300">
                            Hide Footer (Like, Reply etc.)
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="hideLinks"
                            checked={hideLinks}
                            onChange={(e) => setHideLinks(e.target.checked)}
                            className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                          />
                          <label htmlFor="hideLinks" className="text-sm text-slate-700 dark:text-slate-300">
                            Hide Links (Follow, Read etc.)
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image Settings */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <ImageIcon className="w-4 h-4 text-purple-500" />
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">Image Settings</h4>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Padding: {padding}px
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={padding}
                          onChange={(e) => setPadding(parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Shadow
                        </label>
                        <select
                          value={shadow}
                          onChange={(e) => setShadow(e.target.value as ShadowType)}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 capitalize"
                        >
                          <option value="none">None</option>
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Image Quality
                        </label>
                        <select
                          value={imageQuality}
                          onChange={(e) => setImageQuality(e.target.value as ImageQuality)}
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="1x">Standard (1x)</option>
                          <option value="2x">High (2x)</option>
                          <option value="3x">Ultra (3x)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Border Radius: {borderRadius}px
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="50"
                          value={borderRadius}
                          onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="support"
                          checked={supportWatermark}
                          onChange={(e) => setSupportWatermark(e.target.checked)}
                          className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="support" className="text-sm text-slate-700 dark:text-slate-300">
                          Use Website Watermark
                        </label>
                      </div>

                      {/* Advanced Watermark Settings */}
                      {addWatermark && (
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-4">
                          <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Watermark Settings</h5>
                          
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Watermark Text
                            </label>
                            <input
                              type="text"
                              value={customWatermarkText}
                              onChange={(e) => setCustomWatermarkText(e.target.value)}
                              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 text-sm"
                              placeholder="socialmediatools.netlify.app"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Position
                            </label>
                            <select
                              value={watermarkPosition}
                              onChange={(e) => setWatermarkPosition(e.target.value as typeof watermarkPosition)}
                              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 text-sm"
                            >
                              <option value="bottom-right">Bottom Right</option>
                              <option value="bottom-left">Bottom Left</option>
                              <option value="bottom-center">Bottom Center</option>
                              <option value="top-right">Top Right</option>
                              <option value="top-left">Top Left</option>
                              <option value="top-center">Top Center</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Opacity: {Math.round(watermarkOpacity * 100)}%
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={watermarkOpacity}
                              onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Size: {watermarkSize}px
                            </label>
                            <input
                              type="range"
                              min="10"
                              max="24"
                              value={watermarkSize}
                              onChange={(e) => setWatermarkSize(parseInt(e.target.value))}
                              className="w-full"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Color
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="color"
                                value={watermarkColor}
                                onChange={(e) => setWatermarkColor(e.target.value)}
                                className="w-12 h-10 rounded border border-slate-300 dark:border-slate-600 cursor-pointer"
                              />
                              <input
                                type="text"
                                value={watermarkColor}
                                onChange={(e) => setWatermarkColor(e.target.value)}
                                className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm"
                                placeholder="#ffffff"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Custom Background Color (for solid background) */}
                      {backgroundType === "solid" && (
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Background Color
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={customBackgroundColor}
                              onChange={(e) => setCustomBackgroundColor(e.target.value)}
                              className="w-12 h-10 rounded border border-slate-300 dark:border-slate-600 cursor-pointer"
                            />
                            <input
                              type="text"
                              value={customBackgroundColor}
                              onChange={(e) => setCustomBackgroundColor(e.target.value)}
                              className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm"
                              placeholder="#ffffff"
                            />
                          </div>
                          <div className="mt-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700" style={{ background: customBackgroundColor, minHeight: "60px" }}>
                            <p className="text-xs text-slate-600 dark:text-slate-400 text-center">Color Preview</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Fullscreen Preview Modal */}
        {showFullscreen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={() => setShowFullscreen(false)}
          >
            <div
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowFullscreen(false)}
                className="absolute top-4 right-4 z-10 bg-white dark:bg-slate-800 rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              </button>
              <div
                className="bg-white dark:bg-slate-800 rounded-xl p-6 overflow-auto max-h-[90vh] relative"
                style={{
                  background: getBackgroundStyle(),
                  padding: `${padding}px`,
                  borderRadius: `${borderRadius}px`,
                }}
              >
                <div
                  className={`w-full rounded-xl ${
                    theme === "dark" ? "bg-black text-white" : "bg-white text-black"
                  }`}
                  style={{
                    opacity: getTransparency(),
                    boxShadow: getShadowStyle(),
                    padding: "20px",
                  }}
                >
                  {/* Tweet content - same as preview */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                      <Twitter className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm">{tweetData.name}</span>
                        <span className="text-slate-500 dark:text-slate-400 text-sm">{tweetData.username}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p
                      className="text-sm leading-relaxed whitespace-pre-wrap break-words"
                      dangerouslySetInnerHTML={{ __html: formatTweetText(tweetData.text) }}
                    />
                  </div>
                  {tweetData.hashtags.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {tweetData.hashtags.map((tag, idx) => (
                        <span key={idx} className="text-blue-500 text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {!hideFooter && (
                    <div className="flex items-center gap-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                      <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500">
                        <span className="text-sm">{tweetData.replies}</span>
                      </button>
                      <button className="flex items-center gap-2 text-slate-500 hover:text-green-500">
                        <span className="text-sm">{tweetData.retweets}</span>
                      </button>
                      <button className="flex items-center gap-2 text-slate-500 hover:text-red-500">
                        <span className="text-sm">{tweetData.likes}</span>
                      </button>
                    </div>
                  )}
                  <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                    {tweetData.timestamp}
                  </div>
                </div>
                {addWatermark && (
                  <div
                    className="absolute pointer-events-auto"
                    style={{
                      [watermarkPosition.includes("bottom") ? "bottom" : "top"]: `${padding + 10}px`,
                      [watermarkPosition.includes("left") ? "left" : watermarkPosition.includes("right") ? "right" : "left"]: watermarkPosition.includes("center") ? "50%" : `${padding + 10}px`,
                      transform: watermarkPosition.includes("center") ? "translateX(-50%)" : "none",
                      opacity: watermarkOpacity,
                      fontSize: `${watermarkSize}px`,
                      color: watermarkColor,
                      fontWeight: 500,
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    <a
                      href="https://socialmediatools.netlify.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      style={{ color: watermarkColor }}
                    >
                      {supportWatermark ? customWatermarkText : "Generated with Tweet to Image Converter"}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {tool && <ToolComments toolId={tool.id} />}
        {tool && <ToolFAQ tool={tool} />}
        {tool && <RelatedTools currentTool={tool} />}
        {tool && <ToolDetailsSection tool={tool} />}
      </div>
    </>
  );
}
