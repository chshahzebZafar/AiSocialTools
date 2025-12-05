"use client";

import { useState } from "react";
import { Share2, Copy, Code } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";

export default function OpenGraphGeneratorPage() {
  const tool = getToolById("open-graph-generator");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    image: "",
    siteName: "",
    type: "website",
  });

  const generateMetaTags = () => {
    const tags = [];
    
    if (formData.title) {
      tags.push(`<meta property="og:title" content="${formData.title}" />`);
    }
    if (formData.description) {
      tags.push(`<meta property="og:description" content="${formData.description}" />`);
    }
    if (formData.url) {
      tags.push(`<meta property="og:url" content="${formData.url}" />`);
    }
    if (formData.image) {
      tags.push(`<meta property="og:image" content="${formData.image}" />`);
    }
    if (formData.siteName) {
      tags.push(`<meta property="og:site_name" content="${formData.siteName}" />`);
    }
    tags.push(`<meta property="og:type" content="${formData.type}" />`);
    
    // Twitter Card tags
    tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
    if (formData.title) {
      tags.push(`<meta name="twitter:title" content="${formData.title}" />`);
    }
    if (formData.description) {
      tags.push(`<meta name="twitter:description" content="${formData.description}" />`);
    }
    if (formData.image) {
      tags.push(`<meta name="twitter:image" content="${formData.image}" />`);
    }

    return tags.join("\n");
  };

  const copyToClipboard = () => {
    const code = generateMetaTags();
    navigator.clipboard.writeText(code);
    alert("Meta tags copied to clipboard!");
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">Open Graph Meta Tags Generator - Free OG Tags Generator for SEO</h1>
            <p className="text-slate-600">Generate Open Graph meta tags for Facebook, Twitter, and LinkedIn. Free OG tags generator with preview. Improve social media sharing and SEO. Create perfect social media cards.</p>
          </div>
        </div>
        <div className="mt-4">
          <ShareButtons
            title="Open Graph Meta Tags Generator"
            text="Check out this free Open Graph meta tags generator tool!"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Your page title"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of your page"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
              rows={3}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              URL
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://example.com/page"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <p className="text-xs text-slate-500 mt-1">
              Recommended: 1200x630px
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Site Name
            </label>
            <input
              type="text"
              value={formData.siteName}
              onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
              placeholder="Your Website Name"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="website">Website</option>
              <option value="article">Article</option>
              <option value="product">Product</option>
              <option value="video">Video</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Generated Meta Tags</h2>
            <button
              onClick={copyToClipboard}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          {generateMetaTags() && (
            <div className="mb-4 pb-4 border-b border-slate-200">
              <ShareButtons
                title="Open Graph Meta Tags"
                text="Check out these Open Graph meta tags I generated!"
                resultText={generateMetaTags()}
              />
            </div>
          )}
          <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
              <code>{generateMetaTags() || "Fill in the form to generate meta tags"}</code>
            </pre>
          </div>
          {formData.image && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-slate-700 mb-2">Preview</h3>
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                <img
                  src={formData.image}
                  alt="Open Graph image preview"
                  className="w-full rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            </div>
          )}
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

