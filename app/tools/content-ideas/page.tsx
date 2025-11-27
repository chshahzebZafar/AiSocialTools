"use client";

import { useState } from "react";
import { Lightbulb, RefreshCw, Copy } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";

const contentIdeas = {
  instagram: [
    "Share a before and after transformation",
    "Post a day in the life story",
    "Create a carousel with 5 tips",
    "Share a behind-the-scenes moment",
    "Post a user-generated content feature",
    "Create a poll or question sticker",
    "Share a motivational quote with your photo",
    "Post a tutorial or how-to guide",
    "Share a product review or unboxing",
    "Create a 'this or that' comparison post"
  ],
  twitter: [
    "Share a hot take on current trends",
    "Post a thread with valuable insights",
    "Engage with trending topics",
    "Share a quick tip or hack",
    "Post a question to start a discussion",
    "Share a quote that resonates",
    "Post a behind-the-scenes moment",
    "Share industry news with your take",
    "Create a poll to engage followers",
    "Share a personal story or experience"
  ],
  linkedin: [
    "Share a professional achievement",
    "Post industry insights or analysis",
    "Share a career lesson learned",
    "Post about company culture",
    "Share a professional tip or advice",
    "Post about industry trends",
    "Share a networking experience",
    "Post about professional development",
    "Share a success story",
    "Post about leadership insights"
  ],
  tiktok: [
    "Create a trending dance or challenge",
    "Share a quick tutorial or hack",
    "Post a day in the life video",
    "Create a before and after video",
    "Share a funny moment or skit",
    "Post a transformation video",
    "Create a POV style video",
    "Share a recipe or cooking tip",
    "Post a product review",
    "Create a duet or collaboration"
  ]
};

export default function ContentIdeasPage() {
  const tool = getToolById("content-ideas");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [platform, setPlatform] = useState("instagram");
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([]);

  const generateIdeas = () => {
    const ideas = contentIdeas[platform as keyof typeof contentIdeas] || contentIdeas.instagram;
    const shuffled = [...ideas].sort(() => Math.random() - 0.5);
    setGeneratedIdeas(shuffled.slice(0, 5));
  };

  const copyIdea = (idea: string) => {
    navigator.clipboard.writeText(idea);
    alert("Idea copied to clipboard!");
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Content Ideas Generator",
            url: "https://socialmediatools.netlify.app/tools/content-ideas",
            description: "Free AI content ideas generator for Instagram, Twitter, LinkedIn, and TikTok. Generate creative content ideas to inspire your next viral post.",
            applicationCategory: "Utility",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD"
            },
            creator: {
              "@type": "Person",
              name: "Shahzeb Zafar"
            }
          }),
        }}
      />
      <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">Content Ideas Generator - Generate Social Media Content Ideas Free</h1>
            <p className="text-slate-600">Generate creative content ideas for Instagram, Twitter, LinkedIn, and TikTok. Free content ideas generator. Get inspiration for your next viral post.</p>
          </div>
        </div>
        <div className="mt-4">
          <ShareButtons
            title="Content Ideas Generator"
            text="Check out this free content ideas generator tool!"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Platform
        </label>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 mb-4"
        >
          <option value="instagram">Instagram</option>
          <option value="twitter">Twitter/X</option>
          <option value="linkedin">LinkedIn</option>
          <option value="tiktok">TikTok</option>
        </select>

        <button
          onClick={generateIdeas}
          className="w-full bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Generate Content Ideas
        </button>
      </div>

      {generatedIdeas.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Generated Ideas ({generatedIdeas.length})
            </h2>
            <ShareButtons
              title="Content Ideas"
              text={`Check out these ${generatedIdeas.length} content ideas I generated for ${platform}!`}
              resultText={generatedIdeas.join("\n")}
            />
          </div>
          <div className="space-y-3">
            {generatedIdeas.map((idea, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-600 font-semibold">#{index + 1}</span>
                  </div>
                  <p className="text-slate-800">{idea}</p>
                </div>
                <button
                  onClick={() => copyIdea(idea)}
                  className="ml-4 p-2 text-slate-600 hover:bg-yellow-100 rounded-lg transition-colors"
                  title="Copy idea"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
        <h3 className="font-semibold text-yellow-900 mb-2">💡 Content Creation Tips</h3>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Post consistently to maintain engagement</li>
          <li>• Use high-quality visuals and videos</li>
          <li>• Engage with your audience in comments</li>
          <li>• Mix different content types (educational, entertaining, promotional)</li>
          <li>• Analyze what works best for your audience</li>
        </ul>
      </div>

      {tool && <ToolFAQ tool={tool} />}
      {tool && <RelatedTools currentTool={tool} />}
      {tool && <ToolDetailsSection tool={tool} />}
    </div>
    </>
  );
}

