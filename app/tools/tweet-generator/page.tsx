"use client";

import { useState } from "react";
import { Twitter, Copy, RefreshCw, Download } from "lucide-react";
import Link from "next/link";
import { getToolById } from "@/lib/social-tools";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import ToolFAQ from "@/components/ToolFAQ";
import { ToolComments } from "@/components/ToolComments";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

export default function TweetGeneratorPage() {
  const tool = getToolById("tweet-generator");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [tweet, setTweet] = useState("");
  const [generatedTweet, setGeneratedTweet] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTweet = async () => {
    if (!tweet.trim()) {
      alert("Please enter a topic or idea for your tweet");
      return;
    }

    setIsGenerating(true);
    // Simulate AI generation (replace with actual API call)
    setTimeout(() => {
      const variations = [
        `🚀 Excited to share: ${tweet}! This is going to change everything. What do you think? #innovation`,
        `Just discovered something amazing about ${tweet}. Mind = blown! 💡`,
        `Hot take: ${tweet} is the future. Here's why... 🧵`,
        `Can't stop thinking about ${tweet}. The possibilities are endless! ✨`,
        `Quick thread on ${tweet} 👇\n\n1. First point\n2. Second point\n3. Third point\n\nWhat's your take?`,
      ];
      setGeneratedTweet(variations[Math.floor(Math.random() * variations.length)]);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedTweet);
    alert("Tweet copied to clipboard!");
  };

  const downloadTweet = () => {
    const blob = new Blob([generatedTweet], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tweet.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {seo && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.structuredData) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Tweet Generator",
            url: "https://socialmediatools.netlify.app/tools/tweet-generator",
            description: "Free AI tweet generator for Twitter/X. Generate engaging tweets, threads, and Twitter content that captures attention and drives engagement.",
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
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Twitter className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Free AI Tweet Generator - Create Engaging Twitter Posts Online
              </h1>
              <p className="text-slate-600 dark:text-slate-300">
                Generate creative and engaging tweets instantly with our free AI-powered tweet generator. 
                Create viral Twitter content, optimize character count, and boost engagement. No signup required.
                {" "}
                <Link href="/tools/hashtag-generator" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  Add trending hashtags
                </Link>
                {" "}with our Hashtag Generator, or{" "}
                <Link href="/tools/content-ideas" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  get content ideas
                </Link>
                {" "}to keep your Twitter feed fresh and engaging.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <FavoriteButton toolId="tweet-generator" />
            <ShareButtons
              title="Free AI Tweet Generator"
              text="Check out this free AI tweet generator tool!"
            />
          </div>
        </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Enter your topic or idea
        </label>
        <textarea
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
          placeholder="E.g., AI in healthcare, productivity tips, startup advice..."
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows={4}
        />
        <button
          onClick={generateTweet}
          disabled={isGenerating}
          className="mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Twitter className="w-4 h-4" />
              Generate Tweet
            </>
          )}
        </button>
      </div>

      {generatedTweet && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Generated Tweet</h2>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="Copy to clipboard"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button
                onClick={downloadTweet}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="Download"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="mb-4 pb-4 border-b border-slate-200">
            <ShareButtons
              title="Generated Tweet"
              text="Check out this tweet I generated!"
              resultText={generatedTweet}
            />
          </div>
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
            <p className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap">{generatedTweet}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Character count: {generatedTweet.length} / 280
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h2 className="font-semibold text-blue-900 mb-2 text-lg">💡 Tips for Better Tweets</h2>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Keep it concise and engaging</li>
          <li>• Use relevant hashtags (1-3 max)</li>
          <li>• Include a call-to-action</li>
          <li>• Add emojis for visual appeal</li>
          <li>• Ask questions to encourage engagement</li>
        </ul>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">How to generate engaging tweets?</h3>
            <p className="text-slate-600 text-sm">
              Our free AI tweet generator uses advanced algorithms to create engaging Twitter posts. 
              Simply enter your topic or idea, and our tool will generate multiple tweet variations 
              optimized for maximum engagement and character count.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Is this tweet generator free to use?</h3>
            <p className="text-slate-600 text-sm">
              Yes, our AI tweet generator is completely free. No signup, no credit card required. 
              Generate unlimited tweets for your Twitter marketing campaigns.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Can I use generated tweets for business?</h3>
            <p className="text-slate-600 text-sm">
              Absolutely! Our tweet generator creates content suitable for personal and business use. 
              Perfect for social media managers, content creators, and businesses looking to boost 
              their Twitter engagement.
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

