"use client";

import { useState } from "react";
import { Instagram, Download, Copy, RefreshCw } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { getSEOMetadata } from "@/lib/seo-metadata";

export default function InstagramPostGeneratorPage() {
  const tool = getToolById("instagram-post-generator");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");

  const templates = [
    {
      name: "Product Launch",
      template: "🎉 Exciting news! We're launching something amazing!\n\n{content}\n\n{hashtags}",
    },
    {
      name: "Behind the Scenes",
      template: "✨ Behind the scenes of {content}\n\n{hashtags}",
    },
    {
      name: "Tip/Advice",
      template: "💡 Pro tip: {content}\n\nSave this post for later! 📌\n\n{hashtags}",
    },
    {
      name: "Question",
      template: "🤔 Quick question: {content}\n\nDrop your thoughts below! 👇\n\n{hashtags}",
    },
  ];

  const generatePost = (template: string) => {
    const content = caption || "Your content here";
    const tags = hashtags || "#instagram #socialmedia";
    const post = template
      .replace(/{content}/g, content)
      .replace(/{hashtags}/g, tags);
    setGeneratedPost(post);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost);
    alert("Post copied to clipboard!");
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Instagram className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Instagram Post Generator - Create Engaging Instagram Captions Free</h1>
            <p className="text-slate-600">Generate engaging Instagram captions and posts with our free Instagram post generator. Create viral content with templates, hashtags, and emoji suggestions. Boost your Instagram engagement.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Post Content
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What's your post about?"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
              rows={4}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Hashtags
            </label>
            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="#instagram #socialmedia #marketing"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Templates</h3>
            <div className="space-y-2">
              {templates.map((tpl) => (
                <button
                  key={tpl.name}
                  onClick={() => generatePost(tpl.template)}
                  className="w-full text-left px-4 py-2 border border-slate-300 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors"
                >
                  {tpl.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Generated Post</h2>
            {generatedPost && (
              <button
                onClick={copyToClipboard}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="Copy to clipboard"
              >
                <Copy className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 min-h-[300px]">
            {generatedPost ? (
              <p className="text-slate-800 whitespace-pre-wrap">{generatedPost}</p>
            ) : (
              <p className="text-slate-400 text-center py-8">
                Select a template to generate your post
              </p>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Character count: {generatedPost.length} / 2200
          </p>
        </div>
      </div>

      <div className="mt-8 bg-purple-50 rounded-xl p-6 border border-purple-200">
        <h3 className="font-semibold text-purple-900 mb-2">💡 Instagram Post Tips</h3>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• Use 5-10 relevant hashtags for better reach</li>
          <li>• Include a call-to-action in your caption</li>
          <li>• Use emojis to make your post more engaging</li>
          <li>• Ask questions to encourage comments</li>
          <li>• Keep captions concise but informative</li>
        </ul>
      </div>

      {tool && <ToolFAQ tool={tool} />}
      {tool && <RelatedTools currentTool={tool} />}
      {tool && <ToolDetailsSection tool={tool} />}
    </div>
    </>
  );
}

