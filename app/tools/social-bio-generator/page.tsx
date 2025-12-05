"use client";

import { useState } from "react";
import { FileText, Copy, Download } from "lucide-react";
import Link from "next/link";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";
import { ToolComments } from "@/components/ToolComments";

export default function SocialBioGeneratorPage() {
  const tool = getToolById("social-bio-generator");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [location, setLocation] = useState("");
  const [interests, setInterests] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [generatedBio, setGeneratedBio] = useState("");

  const bioTemplates = {
    instagram: [
      "{name} | {profession}\n📍 {location}\n✨ {interests}\n\n{link}",
      "👋 Hi, I'm {name}!\n\n{profession} | {location}\n\n{interests}\n\n{link}",
      "{name}\n{profession} 💼\n📍 {location}\n\n{interests}\n\n{link}",
    ],
    twitter: [
      "{profession} | {location} | {interests} | {link}",
      "{name} - {profession}\n📍 {location}\n{interests}",
    ],
    linkedin: [
      "{profession} | {location}\n\n{interests}\n\n{link}",
      "{name}\n{profession}\n📍 {location}\n\n{interests}",
    ],
  };

  const generateBio = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    const templates = bioTemplates[platform as keyof typeof bioTemplates] || bioTemplates.instagram;
    const template = templates[Math.floor(Math.random() * templates.length)];

    const bio = template
      .replace(/{name}/g, name || "Your Name")
      .replace(/{profession}/g, profession || "Professional")
      .replace(/{location}/g, location || "Location")
      .replace(/{interests}/g, interests || "Your interests")
      .replace(/{link}/g, "🔗 Link in bio");

    setGeneratedBio(bio);
  };

  const copyBio = () => {
    navigator.clipboard.writeText(generatedBio);
    alert("Bio copied to clipboard!");
  };

  const downloadBio = () => {
    const blob = new Blob([generatedBio], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "social-bio.txt";
    a.click();
    URL.revokeObjectURL(url);
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
            name: "Social Bio Generator",
            url: "https://socialmediatools.netlify.app/tools/social-bio-generator",
            description: "Free AI social media bio generator for Instagram, Twitter, LinkedIn, and TikTok. Create engaging bios that capture attention and grow your following.",
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
          <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Social Media Bio Generator - Create Instagram, Twitter Bios Free</h1>
            <p className="text-slate-600 dark:text-slate-300">
              Generate compelling bios for Instagram, Twitter, LinkedIn, and TikTok. Free social media bio generator with templates. Create professional bios that attract followers.
              {" "}
              <Link href="/tools/content-ideas" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                Use with our Content Ideas Generator
              </Link>
              {" "}to brainstorm content, or{" "}
              <Link href="/tools/hashtag-generator" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                add trending hashtags
              </Link>
              {" "}to maximize your profile visibility.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <ShareButtons
            title="Social Media Bio Generator"
            text="Check out this free social media bio generator tool!"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 mb-4"
            >
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter/X</option>
              <option value="linkedin">LinkedIn</option>
            </select>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Profession
                </label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="e.g., Designer, Developer, Writer"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., New York, USA"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Interests/Hobbies
                </label>
                <textarea
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="e.g., Photography, Travel, Coffee"
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 resize-none"
                />
              </div>

              <button
                onClick={generateBio}
                className="w-full bg-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors"
              >
                Generate Bio
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Generated Bio</h2>
            {generatedBio && (
              <div className="flex gap-2">
                <button
                  onClick={copyBio}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Copy"
                >
                  <Copy className="w-5 h-5" />
                </button>
                <button
                  onClick={downloadBio}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Download"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 min-h-[300px]">
            {generatedBio ? (
              <p className="text-slate-800 whitespace-pre-wrap">{generatedBio}</p>
            ) : (
              <p className="text-slate-400 text-center py-8">
                Fill in the form and click "Generate Bio"
              </p>
            )}
          </div>
          {generatedBio && (
            <>
              <p className="text-xs text-slate-500 mt-2">
                Character count: {generatedBio.length}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <ShareButtons
                  title="Generated Social Media Bio"
                  text="Check out this social media bio I generated!"
                  resultText={generatedBio}
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

