"use client";

import { useState } from "react";
import { FileText, Copy, Download } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolHero from "@/components/ToolHero";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";

interface Template {
  name: string;
  category: string;
  template: string;
}

const templates: Template[] = [
  {
    name: "Product Launch",
    category: "Business",
    template: "🎉 Exciting news! We're launching {product}!\n\n{description}\n\nGet yours now: {link}\n\n{hashtags}"
  },
  {
    name: "Behind the Scenes",
    category: "Lifestyle",
    template: "✨ Behind the scenes of {topic}\n\n{content}\n\n{hashtags}"
  },
  {
    name: "Tip/Advice",
    category: "Education",
    template: "💡 Pro tip: {tip}\n\n{explanation}\n\nSave this post for later! 📌\n\n{hashtags}"
  },
  {
    name: "Question",
    category: "Engagement",
    template: "🤔 Quick question: {question}\n\nDrop your thoughts below! 👇\n\n{hashtags}"
  },
  {
    name: "Motivational",
    category: "Inspiration",
    template: "🌟 {quote}\n\nRemember: {message}\n\n{hashtags}"
  },
  {
    name: "Announcement",
    category: "Business",
    template: "📢 Important announcement!\n\n{announcement}\n\nStay tuned for more updates! 🔔\n\n{hashtags}"
  },
  {
    name: "Thank You",
    category: "Gratitude",
    template: "🙏 Thank you to everyone who {action}!\n\n{message}\n\n{hashtags}"
  },
  {
    name: "Tutorial",
    category: "Education",
    template: "📚 How to {action}:\n\n1. {step1}\n2. {step2}\n3. {step3}\n\n{hashtags}"
  }
];

export default function CaptionTemplatesPage() {
  const tool = getToolById("caption-templates");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [filledCaption, setFilledCaption] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(templates.map(t => t.category)))];

  const fillTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setFilledCaption(template.template);
  };

  const copyCaption = () => {
    navigator.clipboard.writeText(filledCaption);
    alert("Caption copied to clipboard!");
  };

  const downloadCaption = () => {
    const blob = new Blob([filledCaption], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "caption.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredTemplates = category === "All" 
    ? templates 
    : templates.filter(t => t.category === category);

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <ToolHero
        toolId={tool?.id}
        icon={FileText}
        iconGradient="from-pink-500 to-rose-500"
        title="Instagram Caption Templates - Free Social Media Caption Templates"
        description="Browse and use pre-made Instagram caption templates. Free social media caption templates for posts, stories, and reels. Copy, customize, and use instantly."
        shareTitle="Instagram Caption Templates"
        shareText="Check out these free Instagram caption templates!"
      />
      <div className="p-8 max-w-6xl mx-auto">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 mb-4"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <h3 className="text-sm font-medium text-slate-700 mb-3">Templates</h3>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {filteredTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => fillTemplate(template)}
                  className={`w-full text-left p-3 border-2 rounded-lg transition-colors ${
                    selectedTemplate?.name === template.name
                      ? "border-pink-500 bg-pink-50"
                      : "border-slate-200 hover:border-pink-300"
                  }`}
                >
                  <div className="font-medium text-slate-900">{template.name}</div>
                  <div className="text-xs text-slate-500">{template.category}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Caption Editor</h2>
            {filledCaption && (
              <div className="flex gap-2">
                <button
                  onClick={copyCaption}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Copy"
                >
                  <Copy className="w-5 h-5" />
                </button>
                <button
                  onClick={downloadCaption}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Download"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
          <textarea
            value={filledCaption}
            onChange={(e) => setFilledCaption(e.target.value)}
            placeholder="Select a template to get started..."
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 resize-none"
            rows={12}
          />
          {filledCaption && (
            <>
              <p className="text-xs text-slate-500 mt-2">
                Character count: {filledCaption.length}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <ShareButtons
                  title="Instagram Caption"
                  text="Check out this Instagram caption I created!"
                  resultText={filledCaption}
                />
              </div>
            </>
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

