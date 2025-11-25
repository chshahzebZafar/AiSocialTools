"use client";

import { useState } from "react";
import { Video, Copy, Loader2, Sparkles } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";

interface GeneratedHook {
  hook: string;
  contentIdea?: string;
  cta?: string;
  hashtags?: string[];
}

export default function TikTokHookGeneratorPage() {
  const tool = getToolById("tiktok-hook-generator");
  
  const [niche, setNiche] = useState("");
  const [contentType, setContentType] = useState("Educational");
  const [targetAudience, setTargetAudience] = useState("");
  const [language, setLanguage] = useState("English");
  const [tone, setTone] = useState("Casual");
  const [hookLength, setHookLength] = useState("Very short hook (max 8–10 words)");
  const [numHooks, setNumHooks] = useState("5");
  const [includeContentIdea, setIncludeContentIdea] = useState(true);
  const [includeCTA, setIncludeCTA] = useState(true);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  
  const [generatedHooks, setGeneratedHooks] = useState<GeneratedHook[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const generateHooks = () => {
    if (!niche.trim()) {
      setError("Please enter a niche or topic");
      return;
    }

    setError("");
    setIsGenerating(true);

    // Simulate generation delay
    setTimeout(() => {
      try {
        const hooks: GeneratedHook[] = [];
        const count = parseInt(numHooks);

        // Hook templates based on content type and tone
        const hookTemplates = getHookTemplates(contentType, tone, hookLength);
        const contentIdeas = getContentIdeas(contentType, niche);
        const ctas = getCTAs(tone);
        const hashtagSets = getHashtags(niche, contentType);

        for (let i = 0; i < count; i++) {
          const template = hookTemplates[i % hookTemplates.length];
          const hook = template
            .replace(/{niche}/g, niche)
            .replace(/{audience}/g, targetAudience || "viewers")
            .replace(/{topic}/g, niche.toLowerCase());

          const hookData: GeneratedHook = { hook };

          if (includeContentIdea) {
            hookData.contentIdea = contentIdeas[i % contentIdeas.length]
              .replace(/{niche}/g, niche);
          }

          if (includeCTA) {
            hookData.cta = ctas[i % ctas.length].replace(/{niche}/g, niche);
          }

          if (includeHashtags) {
            const hashtagCount = Math.floor(Math.random() * 6) + 3; // 3-8 hashtags
            hookData.hashtags = hashtagSets.slice(0, hashtagCount);
          }

          hooks.push(hookData);
        }

        setGeneratedHooks(hooks);
      } catch (err) {
        setError("Something went wrong, please try again.");
      } finally {
        setIsGenerating(false);
      }
    }, 1500);
  };

  const getHookTemplates = (type: string, tone: string, length: string): string[] => {
    const templates: Record<string, string[]> = {
      "Very short hook (max 8–10 words)": [
        "POV: You're about to learn {niche} secrets",
        "This {niche} trick changed everything",
        "Stop doing {niche} wrong",
        "The {niche} mistake everyone makes",
        "I wish I knew this {niche} tip earlier",
        "This {niche} hack is insane",
        "Nobody talks about this {niche} fact",
        "The {niche} truth nobody tells you",
        "This {niche} method actually works",
        "Why {niche} creators don't share this",
      ],
      "Short hook (1 sentence)": [
        "If you're struggling with {niche}, this is the video for you.",
        "I'm about to share the {niche} secret that changed my life.",
        "This {niche} tip will save you so much time and money.",
        "Everyone's doing {niche} wrong, and here's why.",
        "I tried {niche} for 30 days and here's what happened.",
        "The {niche} mistake I made that cost me everything.",
        "This is the {niche} advice I wish someone gave me.",
        "If you want to master {niche}, watch until the end.",
        "I spent years learning {niche} and here's what I discovered.",
        "This {niche} method is controversial but it works.",
      ],
      "Hook + 1 follow-up line": [
        "POV: You're about to learn {niche} secrets.\nThis one tip changed everything for me.",
        "Stop doing {niche} wrong.\nHere's the right way that actually works.",
        "This {niche} hack is insane.\nI can't believe nobody talks about this.",
        "I wish I knew this {niche} tip earlier.\nIt would have saved me so much time.",
        "The {niche} mistake everyone makes.\nAnd how to avoid it completely.",
        "This {niche} method actually works.\nHere's proof and how to do it.",
        "Why {niche} creators don't share this.\nBecause it's too powerful to keep secret.",
        "Nobody talks about this {niche} fact.\nBut it's the most important thing you need to know.",
        "This {niche} truth nobody tells you.\nIt's time someone finally said it.",
        "If you're struggling with {niche}, this is the video for you.\nI'm sharing everything I learned.",
      ],
    };

    // Adjust tone
    let baseTemplates = templates[length] || templates["Very short hook (max 8–10 words)"];
    
    if (tone === "Professional") {
      baseTemplates = baseTemplates.map(t => t.replace(/POV:/g, "Here's").replace(/insane|hack|trick/g, "strategy"));
    } else if (tone === "Hype/Energetic") {
      baseTemplates = baseTemplates.map(t => t.replace(/This/g, "🔥 This").replace(/Stop/g, "🚨 Stop"));
    } else if (tone === "Funny") {
      baseTemplates = baseTemplates.map(t => t.replace(/This/g, "Plot twist: This").replace(/Stop/g, "Me trying to"));
    } else if (tone === "Emotional") {
      baseTemplates = baseTemplates.map(t => t.replace(/This/g, "This vulnerable").replace(/I wish/g, "I wish"));
    }

    return baseTemplates;
  };

  const getContentIdeas = (type: string, niche: string): string[] => {
    const ideas: Record<string, string[]> = {
      Educational: [
        "Create a step-by-step tutorial on {niche} basics",
        "Share 5 common {niche} mistakes to avoid",
        "Explain the science behind {niche}",
        "Break down {niche} concepts in simple terms",
        "Show before and after examples of {niche}",
        "Create a comparison video of different {niche} methods",
        "Share quick tips and tricks for {niche}",
        "Explain {niche} terminology for beginners",
      ],
      Storytime: [
        "Share your personal {niche} journey and lessons learned",
        "Tell the story of how you got into {niche}",
        "Share a funny or embarrassing {niche} moment",
        "Narrate a day in your {niche} life",
        "Share the biggest {niche} challenge you overcame",
        "Tell about a {niche} experience that changed you",
        "Share behind-the-scenes of your {niche} journey",
        "Narrate your {niche} transformation story",
      ],
      Vlog: [
        "Document a day in your {niche} routine",
        "Show your {niche} workspace and setup",
        "Vlog your {niche} process from start to finish",
        "Share your {niche} morning routine",
        "Document a {niche} event or experience",
        "Show what a typical {niche} day looks like",
        "Vlog your {niche} preparation process",
        "Share your {niche} evening routine",
      ],
      "Product Promo": [
        "Showcase your {niche} product features and benefits",
        "Create a product demo for your {niche} offering",
        "Share customer testimonials about your {niche} product",
        "Show before and after using your {niche} product",
        "Create a product unboxing for your {niche} item",
        "Share limited-time {niche} product offers",
        "Show how your {niche} product solves problems",
        "Create a product comparison for {niche} options",
      ],
      Motivational: [
        "Share inspiring {niche} success stories",
        "Create a motivational message about {niche}",
        "Share {niche} quotes that changed your mindset",
        "Encourage viewers to start their {niche} journey",
        "Share {niche} goals and how to achieve them",
        "Create a pep talk for {niche} beginners",
        "Share {niche} affirmations and positive messages",
        "Motivate viewers to overcome {niche} challenges",
      ],
      Funny: [
        "Create a comedy skit about {niche}",
        "Share funny {niche} memes and relatable moments",
        "Make a parody of common {niche} stereotypes",
        "Create a humorous take on {niche} fails",
        "Share funny {niche} stories and anecdotes",
        "Make a comedy video about {niche} struggles",
        "Create a funny {niche} comparison or roast",
        "Share hilarious {niche} misconceptions",
      ],
      "Q&A": [
        "Answer common {niche} questions from your audience",
        "Do a {niche} Q&A session with your followers",
        "Answer {niche} questions you get asked most",
        "Create a {niche} FAQ video",
        "Answer controversial {niche} questions",
        "Do a rapid-fire {niche} Q&A",
        "Answer {niche} questions from comments",
        "Create a {niche} expert Q&A session",
      ],
    };

    return ideas[type] || ideas.Educational;
  };

  const getCTAs = (tone: string): string[] => {
    const ctas = {
      Casual: [
        "Follow for more {niche} tips!",
        "Save this for later!",
        "Drop a comment if this helped!",
        "Follow for daily {niche} content!",
        "Share with someone who needs this!",
        "Let me know what you think!",
        "Follow for more like this!",
        "What's your {niche} experience?",
      ],
      Professional: [
        "Follow for more {niche} insights.",
        "Save this post for future reference.",
        "Connect with me for {niche} resources.",
        "Follow for professional {niche} content.",
        "Share this with your network.",
        "Let's connect and discuss {niche}.",
        "Follow for industry {niche} updates.",
        "Bookmark this for later use.",
      ],
      "Hype/Energetic": [
        "FOLLOW FOR MORE {niche} CONTENT! 🔥",
        "SAVE THIS NOW! You'll need it!",
        "SHARE THIS WITH EVERYONE!",
        "FOLLOW FOR DAILY {niche} HACKS! 💪",
        "DROP A COMMENT IF YOU'RE READY!",
        "FOLLOW FOR MORE GAME-CHANGING TIPS!",
        "SHARE THIS IF IT HELPED! 🚀",
        "FOLLOW FOR MORE {niche} WINS!",
      ],
      Emotional: [
        "Follow if this resonated with you.",
        "Save this if you needed to hear this.",
        "Share this with someone who needs it.",
        "Follow for more vulnerable {niche} content.",
        "Comment if this touched your heart.",
        "Follow for authentic {niche} stories.",
        "Share this message of hope.",
        "Follow for more real {niche} talk.",
      ],
      Funny: [
        "Follow for more {niche} laughs!",
        "Save this if it made you smile!",
        "Share this with your {niche} friends!",
        "Follow for daily {niche} comedy!",
        "Comment your funniest {niche} moment!",
        "Follow for more {niche} memes!",
        "Share if you relate! 😂",
        "Follow for more {niche} humor!",
      ],
    };

    return ctas[tone as keyof typeof ctas] || ctas.Casual;
  };

  const getHashtags = (niche: string, contentType: string): string[] => {
    const nicheLower = niche.toLowerCase().replace(/\s+/g, "");
    const baseHashtags = [
      `#${nicheLower}`,
      `#${nicheLower}tips`,
      `#${nicheLower}content`,
      `#${nicheLower}creator`,
    ];

    const typeHashtags: Record<string, string[]> = {
      Educational: ["#learnontiktok", "#education", "#tips", "#howto", "#tutorial"],
      Storytime: ["#storytime", "#fyp", "#viral", "#relatable", "#story"],
      Vlog: ["#vlog", "#dayinmylife", "#lifestyle", "#daily", "#routine"],
      "Product Promo": ["#productreview", "#unboxing", "#shopping", "#product", "#review"],
      Motivational: ["#motivation", "#inspiration", "#mindset", "#success", "#goals"],
      Funny: ["#fyp", "#funny", "#comedy", "#humor", "#laugh"],
      "Q&A": ["#qanda", "#questions", "#answer", "#faq", "#askme"],
    };

    const popular = ["#fyp", "#foryou", "#foryoupage", "#viral", "#trending", "#tiktok"];
    
    return [...baseHashtags, ...(typeHashtags[contentType] || []), ...popular];
  };

  const copyHook = (hook: GeneratedHook) => {
    let text = hook.hook;
    if (hook.contentIdea) text += `\n\nContent Idea: ${hook.contentIdea}`;
    if (hook.cta) text += `\n\nCTA: ${hook.cta}`;
    if (hook.hashtags) text += `\n\n${hook.hashtags.join(" ")}`;
    
    navigator.clipboard.writeText(text);
    alert("Hook copied to clipboard!");
  };

  const copyAll = () => {
    let text = "";
    generatedHooks.forEach((hook, index) => {
      text += `Hook #${index + 1}\n${hook.hook}\n`;
      if (hook.contentIdea) text += `\nContent Idea: ${hook.contentIdea}\n`;
      if (hook.cta) text += `\nCTA: ${hook.cta}\n`;
      if (hook.hashtags) text += `\n${hook.hashtags.join(" ")}\n`;
      text += "\n---\n\n";
    });
    
    navigator.clipboard.writeText(text);
    alert("All hooks copied to clipboard!");
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                TikTok Hook & Idea Generator - Free TikTok Hook Generator
              </h1>
              <p className="text-slate-600">
                Generate viral TikTok hooks and content ideas for your short-form videos. 
                Create engaging hooks that capture attention and boost your views.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Niche / Topic <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g., Forex trading, Umrah vlog, Study abroad tips, Clothing brand promotion"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Content Type
                </label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option>Educational</option>
                  <option>Storytime</option>
                  <option>Vlog</option>
                  <option>Product Promo</option>
                  <option>Motivational</option>
                  <option>Funny</option>
                  <option>Q&A</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option>English</option>
                  <option>Urdu</option>
                  <option>Arabic</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Target Audience (Optional)
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g., Beginners, Muslim travelers, Pakistani students, New traders"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option>Casual</option>
                  <option>Professional</option>
                  <option>Hype/Energetic</option>
                  <option>Emotional</option>
                  <option>Funny</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Hook Length
                </label>
                <select
                  value={hookLength}
                  onChange={(e) => setHookLength(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option>Very short hook (max 8–10 words)</option>
                  <option>Short hook (1 sentence)</option>
                  <option>Hook + 1 follow-up line</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Number of Hooks to Generate
              </label>
              <select
                value={numHooks}
                onChange={(e) => setNumHooks(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Options
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeContentIdea}
                    onChange={(e) => setIncludeContentIdea(e.target.checked)}
                    className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
                  />
                  <span className="text-sm text-slate-700">Include a Content Idea for each hook</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeCTA}
                    onChange={(e) => setIncludeCTA(e.target.checked)}
                    className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
                  />
                  <span className="text-sm text-slate-700">Include a Suggested CTA line</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeHashtags}
                    onChange={(e) => setIncludeHashtags(e.target.checked)}
                    className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
                  />
                  <span className="text-sm text-slate-700">Include Suggested Hashtags (3–8 per idea)</span>
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={generateHooks}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-pink-700 hover:to-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Hooks...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Hooks
                </>
              )}
            </button>
          </div>
        </div>

        {generatedHooks.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Generated Hooks ({generatedHooks.length})
              </h2>
              <button
                onClick={copyAll}
                className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg font-medium hover:bg-pink-200 transition-colors flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy All
              </button>
            </div>
            <div className="space-y-6">
              {generatedHooks.map((hook, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-lg p-5 bg-gradient-to-br from-pink-50 to-purple-50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-slate-900">Hook #{index + 1}</h3>
                    <button
                      onClick={() => copyHook(hook)}
                      className="p-2 text-slate-600 hover:bg-white rounded-lg transition-colors"
                      title="Copy hook"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-slate-800 font-medium whitespace-pre-line">{hook.hook}</p>
                    </div>
                    
                    {hook.contentIdea && (
                      <div className="bg-white rounded-lg p-3 border border-slate-200">
                        <p className="text-xs font-semibold text-slate-600 mb-1">Content Idea:</p>
                        <p className="text-slate-700 text-sm">{hook.contentIdea}</p>
                      </div>
                    )}
                    
                    {hook.cta && (
                      <div className="bg-white rounded-lg p-3 border border-slate-200">
                        <p className="text-xs font-semibold text-slate-600 mb-1">CTA:</p>
                        <p className="text-slate-700 text-sm">{hook.cta}</p>
                      </div>
                    )}
                    
                    {hook.hashtags && hook.hashtags.length > 0 && (
                      <div className="bg-white rounded-lg p-3 border border-slate-200">
                        <p className="text-xs font-semibold text-slate-600 mb-2">Hashtags:</p>
                        <div className="flex flex-wrap gap-2">
                          {hook.hashtags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200">
          <h3 className="font-semibold text-pink-900 mb-2 text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            TikTok Hook Tips
          </h3>
          <ul className="text-sm text-pink-800 space-y-1">
            <li>• Start with a strong hook in the first 3 seconds to capture attention</li>
            <li>• Use curiosity gaps to make viewers watch until the end</li>
            <li>• Match your hook tone to your content type and audience</li>
            <li>• Test different hook lengths to see what works best for your niche</li>
            <li>• Include a clear value proposition in your hook</li>
            <li>• Use trending sounds and formats to boost discoverability</li>
          </ul>
        </div>

        {tool && <ToolFAQ tool={tool} />}
        {tool && <RelatedTools currentTool={tool} />}
        {tool && <ToolDetailsSection tool={tool} />}
      </div>
    </>
  );
}

