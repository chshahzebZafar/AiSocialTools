"use client";

import { useState, useRef } from "react";
import { FileImage, Download, Copy, RefreshCw } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { getSEOMetadata } from "@/lib/seo-metadata";

export default function TweetToImagePage() {
  const tool = getToolById("tweet-to-image");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [tweet, setTweet] = useState("Your amazing tweet goes here! 🚀");
  const [username, setUsername] = useState("@username");
  const [name, setName] = useState("Your Name");
  const [theme, setTheme] = useState("light");
  const tweetRef = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (!tweetRef.current) return;

    try {
      const html2canvasModule = await import("html2canvas");
      const canvas = await html2canvasModule.default(tweetRef.current, {
        backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
        scale: 2,
      });
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "tweet-image.png";
      a.click();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Error generating image:", error);
      }
      alert("Failed to generate image. Please try again.");
    }
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <FileImage className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Tweet to Image Converter - Convert Tweets to Images Free
              </h1>
              <p className="text-slate-600">
                Convert your Twitter posts into beautiful shareable images. Free tweet to image converter 
                with customizable themes, download as PNG. Perfect for social media marketing.
              </p>
            </div>
          </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tweet Text
            </label>
            <textarea
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              placeholder="Enter your tweet text..."
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={6}
            />
            <p className="text-xs text-slate-500 mt-1">
              {tweet.length} / 280 characters
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@username"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Theme
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setTheme("light")}
                className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
                  theme === "light"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
                  theme === "dark"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Dark
              </button>
            </div>
          </div>

          <button
            onClick={downloadImage}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Image
          </button>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Preview</h2>
          <div className="flex justify-center">
            <div
              ref={tweetRef}
              className={`w-full max-w-md p-6 rounded-2xl ${
                theme === "dark" ? "bg-black text-white" : "bg-white text-slate-900 border border-slate-200"
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-12 h-12 rounded-full ${
                  theme === "dark" ? "bg-slate-700" : "bg-blue-500"
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                      {name}
                    </span>
                    <span className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                      {username}
                    </span>
                  </div>
                  <p className={`text-base leading-relaxed ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>
                    {tweet || "Your tweet text will appear here"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {tool && <ToolFAQ tool={tool} />}
      {tool && <RelatedTools currentTool={tool} />}
      {tool && <ToolDetailsSection tool={tool} />}
    </div>
    </>
  );
}

