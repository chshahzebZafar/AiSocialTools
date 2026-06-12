"use client";

import { SocialTool } from "@/lib/social-tools";
import { getSEOMetadata } from "@/lib/seo-metadata";

interface ToolFAQProps {
  tool: SocialTool;
}

export default function ToolFAQ({ tool }: ToolFAQProps) {
  const seo = getSEOMetadata(tool);

  // Custom FAQs for tools
  const customFAQs: Record<string, Array<{ question: string; answer: string }>> = {
    "tweet-generator": [
      {
        question: "What is an Online Tweet Generator?",
        answer: "An Online Tweet Generator is a free web-based tool that allows you to create realistic-looking fake Twitter/X tweets. It's designed for entertainment purposes, allowing you to make jokes with friends, create mockups for presentations, or generate social media content ideas. The tool mimics Twitter's actual interface to create authentic-looking tweet images."
      },
      {
        question: "Is the Tweet Generator free to use?",
        answer: "Yes, our Tweet Generator is completely free to use. No signup, no credit card, no hidden fees. You can generate unlimited fake tweets and download them as images without any restrictions."
      },
      {
        question: "Can I use generated tweets for commercial purposes?",
        answer: "You can use generated tweets for personal entertainment, presentations, and design mockups. However, you must follow our usage policy: never use generated tweets to spread false information, harass others, or present them as genuine Twitter posts. Always disclose that the tweets are mockups when sharing."
      },
      {
        question: "What image formats are supported?",
        answer: "You can upload images in any common format (JPG, PNG, GIF, WebP) for both avatars and tweet images. The tool supports up to 4 images per tweet. When exporting, you can download your tweet as PNG or JPG format with customizable quality settings."
      },
      {
        question: "How do I make my fake tweet look more realistic?",
        answer: "To make your fake tweet look more realistic, use appropriate engagement metrics (likes, retweets, replies), add a verified badge if needed, include location information, use proper date formatting, and upload relevant images. Our tool also offers theme customization and font size adjustments to match Twitter's actual interface."
      },
      {
        question: "Can I customize the colors and styling?",
        answer: "Yes! Our Tweet Generator includes advanced settings where you can customize font size, background colors, text colors, and choose between light and dark themes. You can also select export format (PNG or JPG) and adjust quality settings for optimal results."
      },
      {
        question: "Are the generated tweets real Twitter posts?",
        answer: "No, the generated tweets are completely fake and created using our tool. They are not real Twitter posts and should never be presented as such. The tool is designed for entertainment and mockup purposes only. Always make it clear to viewers that generated tweets are not genuine."
      },
      {
        question: "What's the difference between this tool and Twitter?",
        answer: "This is a mockup generator that creates images of tweets, not actual Twitter posts. Unlike real Twitter, you can customize all aspects including engagement metrics, dates, and content. Real Twitter has algorithms for image cropping and verification processes that this tool doesn't replicate - it's designed for creating fake tweets for entertainment purposes."
      }
    ],
    "twitter-character-counter": [
      {
        question: "How does the Twitter / X character counter handle URLs?",
        answer: "Twitter and X count every URL as exactly 23 characters, no matter how long or short the link actually is. Our counter follows this official rule by default — toggle the 'Count URLs as 23 chars' checkbox off if you want to see the raw character total instead."
      },
      {
        question: "What is the character limit for a tweet in 2026?",
        answer: "Standard tweets are still limited to 280 characters for all accounts. Premium (paid) accounts can post up to 25,000 characters, but 280 is the cutoff to guarantee your post is shown in full across every client and embed."
      },
      {
        question: "Do emoji and non-Latin characters count differently?",
        answer: "Yes. Emoji and most non-Latin scripts (such as Chinese, Japanese, Korean, and many accented characters) count as 2 characters each on X, because they occupy more code units. Our counter uses the same measurement the X backend uses."
      },
      {
        question: "Is this Twitter character counter free and anonymous?",
        answer: "Yes — it runs entirely in your browser, there is no signup, no account, no cost, and no text is ever sent to our servers. Use it as often as you want."
      },
      {
        question: "How do I split a post that is over 280 characters?",
        answer: "The counter previews the number of tweets your text would need if threaded. For full thread splitting with smart sentence breaks and automatic 1/n numbering, use our free Tweet Thread Maker tool."
      },
      {
        question: "Does this tool work on mobile?",
        answer: "Yes. The Twitter character counter is fully responsive and works on iOS, Android, tablets, and desktop browsers with no install."
      }
    ],
    "tweet-thread-maker": [
      {
        question: "How does the Tweet Thread Maker split my text?",
        answer: "It breaks your text at sentence boundaries wherever possible — never mid-word — and fills each tweet up to your chosen character limit. If one sentence is longer than the limit, it will fall back to word boundaries. Every tweet is automatically numbered (1/n, 2/n…) so readers can follow along."
      },
      {
        question: "What is the best length per tweet in a thread?",
        answer: "Most creators use the full 280 characters, but threads with slightly shorter tweets (around 240–260 characters) are more readable and get re-shared more often. You can set any limit between 100 and 280 characters in our tool."
      },
      {
        question: "Will the thread include 1/n numbering automatically?",
        answer: "Yes — numbering is on by default and the tool reserves space for the counter so your tweets never run over the limit. Toggle numbering off if you prefer a clean, unnumbered thread."
      },
      {
        question: "Can I edit individual tweets before posting?",
        answer: "Absolutely. Each tweet in the preview has its own copy button, so you can paste one at a time into X and tweak before publishing. Or use 'Copy all' to grab the whole thread at once."
      },
      {
        question: "Is there a limit on the thread length?",
        answer: "There is no limit in the tool. X itself has no documented thread-length cap, but threads longer than 10–15 tweets tend to lose engagement — split very long pieces into separate threads or a blog post instead."
      },
      {
        question: "Does the Tweet Thread Maker store my text?",
        answer: "No. All splitting happens in your browser. Nothing is uploaded, logged, or saved server-side."
      }
    ],
    "instagram-engagement-calculator": [
      {
        question: "How do you calculate Instagram engagement rate?",
        answer: "The standard formula is (likes + comments + saves + shares) ÷ followers × 100. Instagram's algorithm in 2026 weighs saves and shares especially heavily, which is why we include them as core engagement signals rather than likes alone."
      },
      {
        question: "What is a good Instagram engagement rate in 2026?",
        answer: "Under 1% is low, 1–3% is average, 3–6% is good, and above 6% is excellent. Smaller accounts (under 10k followers) often post higher rates than mega-influencers because their audiences are more niche and loyal."
      },
      {
        question: "What is the difference between per-post and account-average engagement?",
        answer: "Per-post mode calculates the engagement rate of one individual post. Account-average mode divides total engagements across all posts by (followers × posts analysed) — useful for reporting over a campaign or a month."
      },
      {
        question: "Does this calculator work for Instagram Reels?",
        answer: "Yes. Just plug in the reel's likes, comments, saves, and shares. Reels typically earn a higher engagement rate than static posts, so compare reels to other reels rather than to feed posts."
      },
      {
        question: "Why do my engagement rates look low compared to influencers?",
        answer: "Published influencer engagement rates are often cherry-picked from top posts or calculated on reach instead of followers. Comparing the same formula across all accounts gives a fairer picture of performance."
      },
      {
        question: "Is the Instagram Engagement Calculator free?",
        answer: "Yes — it's 100% free, runs entirely in your browser, no signup, no ads in the calculator itself, and unlimited use."
      }
    ],
    "tiktok-username-generator": [
      {
        question: "What are TikTok's rules for usernames?",
        answer: "A TikTok username must be 2–24 characters long and can only contain letters, numbers, underscores, and periods. It cannot start or end with a period or underscore, and cannot contain two periods in a row. Our generator filters every suggestion against these rules so you only see valid options."
      },
      {
        question: "How do I find a TikTok username that isn't taken?",
        answer: "We generate 30+ unique variations at a time by combining your name or keyword with niche words, viral suffixes, and safe separators. Copy any you like and check availability inside the TikTok app — if one is taken, click Generate again for a fresh batch."
      },
      {
        question: "Should I use my real name as a TikTok username?",
        answer: "If you're building a personal brand or creator channel, yes — using your real name builds trust. For niche or meme accounts, a creative keyword plus a viral suffix (like 'fyp', 'daily', 'tv') tends to perform better. The generator supports both styles."
      },
      {
        question: "Why does TikTok care about the username format?",
        answer: "The rules keep usernames unique, search-friendly, and safe. Periods and underscores are allowed but must be internal — this prevents usernames that could be confused with file extensions or system handles."
      },
      {
        question: "Can I change my TikTok username later?",
        answer: "Yes. TikTok lets you change your username once every 30 days from the Edit Profile screen — so you're not locked into the first one you pick."
      },
      {
        question: "Is the TikTok Username Generator free?",
        answer: "Yes — free, no signup, and every suggestion is generated in your browser with no data sent anywhere."
      }
    ],
    "hashtag-counter": [
      {
        question: "How many hashtags can I use on Instagram?",
        answer: "Instagram allows up to 30 hashtags per feed post or reel, and up to 10 per story. Going over 30 causes Instagram to strip the caption entirely, so staying at or under 30 is essential — our counter warns you when you exceed the limit."
      },
      {
        question: "How many hashtags work best on TikTok?",
        answer: "TikTok doesn't enforce a hard hashtag count, but the entire caption (including hashtags) is limited to roughly 2,200 characters. Most viral TikToks use 3–8 targeted hashtags; piling on more can dilute the algorithm's understanding of your content."
      },
      {
        question: "Does Twitter have a hashtag limit?",
        answer: "There's no strict cap, but research consistently shows that 1 or 2 hashtags per tweet outperform posts with 3 or more. Our counter flags anything beyond 2 as over the best-practice limit for X."
      },
      {
        question: "How does the counter detect hashtags?",
        answer: "It matches any string starting with '#' followed by letters, numbers, or underscores — including non-Latin scripts. Punctuation breaks the match, which is how Instagram itself parses them."
      },
      {
        question: "Why does the counter show duplicates?",
        answer: "Instagram and other platforms treat repeated hashtags as spammy and may suppress the post's reach. The counter deduplicates case-insensitively (so #Love and #love are one hashtag) and tells you exactly how many duplicates are in your caption."
      },
      {
        question: "Is the Hashtag Counter free to use?",
        answer: "Yes — completely free, no signup, and runs in your browser. Your caption never leaves your device."
      }
    ],
    "image-compressor": [
      {
        question: "Does the Image Compressor upload my files to a server?",
        answer: "No — everything happens inside your browser. Your image is processed locally with the Canvas API and never leaves your device. That means faster compression, total privacy, and the tool still works if you lose your internet connection."
      },
      {
        question: "How much can I compress an image without visible quality loss?",
        answer: "For most photos, a quality setting of 70–85% produces files that are 40–70% smaller than the original with no visible difference on standard screens. PNGs with flat graphics often shrink even more than JPGs."
      },
      {
        question: "Which image formats can I compress?",
        answer: "The Image Compressor works with JPG / JPEG, PNG, and WebP. You can upload one at a time and download the compressed file instantly in the same format."
      },
      {
        question: "What's the difference between lossy and lossless compression?",
        answer: "Lossy compression (used for JPG and WebP) throws away fine detail that the human eye is unlikely to notice — huge size savings with a small quality trade-off. Lossless compression (PNG) keeps every pixel identical but saves less space. This tool uses lossy compression to maximise savings; slide the quality up to 100% for near-lossless output."
      },
      {
        question: "Will the compressed image look the same on Instagram or Twitter?",
        answer: "Yes. All major social platforms re-compress uploads anyway, so starting from an already-compressed image at 70–85% quality is indistinguishable from uploading the original — but loads much faster and uses less data."
      },
      {
        question: "Is the Image Compressor really free?",
        answer: "Yes — it's 100% free, with no signup, no watermark, no file-size cap other than what your browser can hold in memory, and no limit on the number of images you can compress."
      }
    ],
    "image-converter": [
      {
        question: "Which image formats does the converter support?",
        answer: "You can convert between PNG, JPG / JPEG, and WebP in any direction. Just upload an image in one format and pick the format you want to download."
      },
      {
        question: "Does converting between formats lose quality?",
        answer: "Going from JPG or WebP to PNG is lossless — the PNG will be identical to the visible pixels of your source. Going to JPG or WebP uses lossy compression (adjustable via the quality slider), which is why JPG and WebP files are smaller but discard a tiny amount of detail."
      },
      {
        question: "Why would I convert PNG to WebP?",
        answer: "WebP files are typically 25–35% smaller than the equivalent PNG with identical visual quality. If your website targets modern browsers, serving WebP instead of PNG dramatically speeds up page loads and improves Core Web Vitals."
      },
      {
        question: "Is this image converter private?",
        answer: "Yes. The entire conversion runs client-side in your browser using Canvas. Your images never touch our servers, nothing is logged, and nothing is stored after you close the tab."
      },
      {
        question: "Can I convert transparent PNGs to JPG?",
        answer: "JPG does not support transparency, so transparent areas will be filled with a background colour (white by default) during conversion. If you need to keep transparency, convert to PNG or WebP instead."
      },
      {
        question: "Is the Image Format Converter free?",
        answer: "Yes — free, unlimited, no signup, no watermark, and runs entirely in your browser."
      }
    ],
    "favicon-generator": [
      {
        question: "Which favicon sizes does this tool generate?",
        answer: "It produces every size that modern browsers and mobile devices use: 16×16 and 32×32 (browser tabs), 48×48 (Windows), 180×180 (Apple touch icon), and 192×192 plus 512×512 (PWA manifest and Android). Download them individually as PNG."
      },
      {
        question: "How do I add the generated favicons to my website?",
        answer: "Copy the HTML snippet the tool gives you after generation and paste it inside the <head> tag of your HTML (or in a shared layout file for React / Next.js / WordPress). Upload the downloaded PNGs to the root or /public folder of your site."
      },
      {
        question: "What image should I start with for best results?",
        answer: "Use a square image that's at least 512×512 pixels, with a clear, simple design that's readable at 16×16. Logos with lots of fine detail tend to look muddy at tiny sizes — bold shapes work best."
      },
      {
        question: "Do I need an .ico file for favicons in 2026?",
        answer: "Not really. All modern browsers (Chrome, Safari, Firefox, Edge) support PNG favicons just as well as .ico files. Serving PNGs at 16×16 and 32×32 covers every browser you care about."
      },
      {
        question: "Is the Favicon Generator free?",
        answer: "Yes — completely free, no signup, no watermark, and the tool runs entirely in your browser so your source image never leaves your device."
      },
      {
        question: "Will this favicon work on iPhone and Android home screens?",
        answer: "Yes. The 180×180 PNG is used as the Apple touch icon when a user adds your site to their iPhone home screen, and the 192×192 and 512×512 PNGs are used by Android's Progressive Web App manifest. The HTML snippet includes the correct tags for both."
      }
    ],
    "instagram-fonts": [
      {
        question: "How does an Instagram font generator work?",
        answer: "Instagram doesn't actually support custom fonts in posts or bios. Instead, these tools map your regular letters to equivalent Unicode characters — 𝐛𝐨𝐥𝐝, 𝘪𝘵𝘢𝘭𝘪𝘤, 𝓈𝒸𝓇𝒾𝓅𝓉, and so on — that Instagram displays because they're already part of the Unicode standard."
      },
      {
        question: "Will the fonts work in my Instagram bio and captions?",
        answer: "Yes — Unicode characters render in the bio, captions, stories, and comments. They also work across TikTok, Facebook, Twitter / X, Threads, Discord, and most other apps that support Unicode (which is almost all of them in 2026)."
      },
      {
        question: "Are these fonts searchable and accessible?",
        answer: "Partial caveat: screen readers can struggle with highly stylised Unicode (like script or upside-down text), and hashtags using Unicode fonts don't merge with normal hashtag searches. Use stylish fonts for flair in your bio, but keep hashtags and key keywords in regular letters for discoverability."
      },
      {
        question: "How many fonts does this generator support?",
        answer: "20+ styles including bold, italic, bold italic, monospace, script / cursive, double-struck, fraktur, small caps, circled, squared, bubble, upside down, strikethrough, underline, and a few aesthetic variants popular on Instagram in 2026."
      },
      {
        question: "Is the Instagram Font Generator free?",
        answer: "Yes — free forever, no signup, unlimited conversions. The mapping runs entirely in your browser so nothing you type is ever sent to a server."
      },
      {
        question: "Why do some of my characters appear as plain letters?",
        answer: "Unicode only covers the standard Latin alphabet (A–Z, a–z) plus a subset of numbers and accented letters for most stylised ranges. Anything outside that range — like non-Latin scripts or uncommon symbols — will fall back to its regular form because no styled Unicode equivalent exists."
      }
    ],
    "youtube-tag-generator": [
      {
        question: "How many tags should a YouTube video have?",
        answer: "YouTube caps total tag content at 500 characters (including commas and spaces). Aim for 15–25 tags that mix one broad keyword, 3–5 exact-match phrases, and the rest as long-tail variations — this is the format top-ranking channels use in 2026."
      },
      {
        question: "Why did YouTube remove tags from the public API?",
        answer: "YouTube removed tag visibility from the public video page and basic APIs in 2020 to reduce keyword-stuffing SEO. Our generator instead builds fresh tags from your topic using proven keyword-expansion patterns — no scraping needed and the output is always up to date."
      },
      {
        question: "Do YouTube tags still matter for ranking in 2026?",
        answer: "YouTube has said tags are a minor ranking factor — title, description, and watch time matter far more. But tags do help YouTube understand your video when the title is ambiguous, and they help your video surface for misspellings and closely related searches."
      },
      {
        question: "How do I use the generated tags?",
        answer: "Click 'Copy all' to copy the comma-separated tag list, then paste it into YouTube Studio → Video details → Tags. The 500-character counter warns you if you're over the limit before you paste."
      },
      {
        question: "Can I use these tags on TikTok or Instagram?",
        answer: "The underlying keyword suggestions can inspire hashtags for other platforms, but TikTok and Instagram use hashtags (#keyword) instead of comma-separated tags. Prefix the ones you like with # before using them elsewhere."
      },
      {
        question: "Is the YouTube Tag Generator free?",
        answer: "Yes — completely free, no signup, unlimited use, and every tag is generated in your browser without sending anything to a server."
      }
    ],
    "youtube-description-generator": [
      {
        question: "What's the character limit for a YouTube description?",
        answer: "YouTube descriptions can be up to 5,000 characters long. But only the first 150 – 200 characters appear above the 'Show more' fold, so put your most important keyword, hook, and CTA in the opening lines."
      },
      {
        question: "What should I include in a YouTube description?",
        answer: "A strong 2026 description follows this order: (1) hook + primary keyword in the first two lines, (2) 2–3 paragraph summary with related keywords, (3) timestamps / chapters, (4) links (merch, socials, referenced videos), (5) call-to-action, (6) 3–5 hashtags. Our generator lays this out for you."
      },
      {
        question: "Do timestamps improve YouTube SEO?",
        answer: "Yes. YouTube uses timestamps to power chapter markers and key-moment search results. Videos with correctly formatted timestamps (00:00, 01:35, 04:20…) get more session watch time and appear in Google's video search with jump-to-timestamp links."
      },
      {
        question: "How many hashtags should I put in a YouTube description?",
        answer: "Use 3–5 relevant hashtags. YouTube only displays the first 3 above the title, and anything over 15 tags causes YouTube to ignore all of them. Our generator keeps you inside the safe range automatically."
      },
      {
        question: "Can I use the same description template for every video?",
        answer: "Use the same structure every time (it signals consistency to both viewers and the algorithm), but customise the first two lines, timestamps, and hashtags per video. Boilerplate links and CTAs can be identical."
      },
      {
        question: "Is the YouTube Description Generator free?",
        answer: "Yes — free, no signup, no limits, runs entirely in your browser."
      }
    ],
    "youtube-money-calculator": [
      {
        question: "How much does YouTube pay per 1,000 views?",
        answer: "YouTube's ad revenue (RPM) typically lands between $1 and $8 per 1,000 views in 2026, depending on niche and audience country. Finance, tech, and business channels usually earn the highest CPM; gaming and entertainment the lowest. Our calculator lets you set a custom CPM or pick a niche preset."
      },
      {
        question: "What's the difference between CPM and RPM?",
        answer: "CPM is what advertisers pay YouTube per 1,000 ad impressions. RPM is what you (the creator) actually take home per 1,000 video views after YouTube's 45% cut and after accounting for non-monetised views. Creators usually see RPM around 55% of CPM."
      },
      {
        question: "Does YouTube Shorts pay the same as long-form videos?",
        answer: "No. YouTube Shorts uses a different revenue pool (the Creator Pool) and pays roughly $0.02–$0.10 per 1,000 Shorts views in 2026 — much less than long-form. The calculator has a Shorts preset so you can estimate both separately."
      },
      {
        question: "Why do my real earnings differ from the calculator?",
        answer: "The calculator estimates ad revenue only. Your actual YouTube earnings also depend on viewer geography, watch time, ad blockers, seasonality, and non-ad income like memberships, Super Chat, and affiliate links. Treat the output as a ballpark, not a bill."
      },
      {
        question: "How do I increase my YouTube CPM?",
        answer: "Target higher-paying topics (business, finance, B2B, tech, real estate), attract viewers from high-CPM countries (US, UK, Canada, Australia), make videos over 8 minutes so you can run mid-roll ads, and avoid demonetisation triggers in your language and content."
      },
      {
        question: "Is the YouTube Money Calculator free?",
        answer: "Yes — free, no signup, unlimited use, and runs entirely in your browser."
      }
    ],
    "linkedin-headline-generator": [
      {
        question: "What's the character limit for a LinkedIn headline?",
        answer: "Your LinkedIn headline can be up to 220 characters on the desktop site (260 in some recent tests). Our generator keeps every suggestion safely under 220 so it renders in full on every device and in recruiter search previews."
      },
      {
        question: "What makes a good LinkedIn headline in 2026?",
        answer: "A strong 2026 headline combines three elements: (1) your role or expertise, (2) the outcome you deliver (who you help and how), and (3) 1–2 keywords recruiters search for. Avoid buzzwords like 'ninja' or 'guru' — they hurt more than they help."
      },
      {
        question: "Will my headline show up in LinkedIn search?",
        answer: "Yes — LinkedIn indexes your headline heavily for recruiter search, group suggestions, and post visibility. Including your job title and industry keywords in the headline significantly improves discoverability."
      },
      {
        question: "Should I include emojis in my LinkedIn headline?",
        answer: "One or two relevant emojis (like a small arrow or checkmark) can boost click-through, but overloading with emojis looks unprofessional and can hurt discoverability in recruiter search. Our generator uses them sparingly."
      },
      {
        question: "How often should I update my LinkedIn headline?",
        answer: "Update it whenever your role, target audience, or focus changes — and review it every 6 months even if nothing changed. A fresh headline triggers LinkedIn's algorithm to re-index your profile and can show you to new recruiters."
      },
      {
        question: "Is the LinkedIn Headline Generator free?",
        answer: "Yes — free, no signup, no LinkedIn login required, and every suggestion is generated in your browser."
      }
    ],
    "social-media-image-sizes": [
      {
        question: "Is this image size guide kept up to date?",
        answer: "Yes. We review this reference at least every quarter and whenever a platform (Instagram, TikTok, YouTube, LinkedIn, X, Facebook, Pinterest, or Threads) publishes a new size spec. Last major review: 2026."
      },
      {
        question: "Why do social networks change their image sizes so often?",
        answer: "Sizes change for three reasons: new aspect ratios (Reels and Shorts pushed 9:16 everywhere), mobile-first redesigns, and ad-unit updates. Using the wrong size causes cropping, blurriness, or rejected uploads — our guide lists the current pixel-perfect dimensions for each placement."
      },
      {
        question: "What's the best all-purpose size for social media posts?",
        answer: "1080 × 1350 pixels (4:5 portrait) is the safest single-size upload for Instagram, Threads, Facebook, LinkedIn, and Pinterest feeds. For Stories, Reels, Shorts, and TikTok use 1080 × 1920 (9:16). YouTube thumbnails still need 1280 × 720 (16:9)."
      },
      {
        question: "Do I need separate images for Stories and Reels?",
        answer: "Same aspect ratio (9:16), same resolution (1080 × 1920), so the same image works — but leave 220 pixels of safe zone at the top and bottom to avoid having UI overlays (profile, captions, CTAs) cover your content."
      },
      {
        question: "Which tool should I use to resize for a specific platform?",
        answer: "Our free Image Resizer has platform presets for every size in this guide. Click any size card below and it jumps straight to the resizer with that size selected."
      }
    ],
    "ai-image-generator": [
      {
        question: "Is this AI image generator really free with no signup?",
        answer: "Yes — completely free, no account, no credit card, no watermark on the output. We use the open-source Pollinations.ai network, which is free-to-use for everyone and supports Flux, SDXL, and several specialised models (anime, 3D, realistic)."
      },
      {
        question: "Which AI model is used behind the scenes?",
        answer: "Flux is the default — it produces photorealistic and stylised images at a quality level comparable to MidJourney v6. You can also pick Flux Realism, Flux Anime, Flux 3D, SDXL, or Turbo (fastest) from the style menu."
      },
      {
        question: "What makes a good AI image prompt?",
        answer: "Be specific about the subject, style, lighting, and composition. Example: 'a golden retriever puppy in a sunflower field, golden hour, shallow depth of field, 85mm lens' — concrete nouns, adjectives, and photography or art terms give the model far more to work with than generic prompts."
      },
      {
        question: "Can I use the generated images commercially?",
        answer: "Pollinations.ai uses open-source models (Flux, SDXL) whose outputs are generally considered commercially usable in most jurisdictions — but laws vary. For brand-critical commercial work, consult a lawyer about AI-generated image copyright in your country."
      },
      {
        question: "Why do multiple generations with the same prompt look different?",
        answer: "The model starts from random noise ('seed') and denoises it into an image. Every generation uses a new seed, so results are different each time. To reproduce an exact image, use the same prompt + the same seed number (shown in the URL after generation)."
      },
      {
        question: "Is there a limit on how many images I can generate?",
        answer: "No hard limit from us. Pollinations.ai does apply fair-use throttling under very heavy traffic, but for typical personal use you can generate as many images as you want."
      }
    ],
    "facebook-thumbnail": [
      {
        question: "Is it possible to download thumbnails from Facebook?",
        answer: "Yes, it's possible. You can simply use our free Facebook Thumbnail Downloader tool for this process. For advanced features, you may go for Facebook Graph API, but using an API requires some programming skills. Our tool makes it easy for anyone to download thumbnails without coding knowledge."
      },
      {
        question: "Is there an app that can download Facebook thumbnails?",
        answer: "Yes, there are several web apps online. Our Facebook Thumbnail Downloader is one of them with pretty good features including high-resolution downloads, thumbnail sprite images, and support for multiple Facebook URL formats. It works on both mobile devices and computers."
      },
      {
        question: "How to save thumbnails from Facebook?",
        answer: "This is very simple with our tool. Just copy and paste the Facebook post URL into the input box above, then click 'Get Thumbnail'. You'll see the thumbnail preview, and you can download it in high resolution. The downloaded image will be saved to your device's download folder (PC) or gallery (mobile)."
      },
      {
        question: "Is it possible to get thumbnails from private Facebook accounts?",
        answer: "No, it's not possible with online thumbnail downloaders nor Facebook Graph API. Only public Facebook videos and posts can have their thumbnails downloaded. Private or restricted content requires authentication and cannot be accessed through these tools."
      },
      {
        question: "In which format can you download the Facebook Video Thumbnail?",
        answer: "You can easily download Facebook video thumbnails in HD quality in JPG or PNG format. The tool automatically provides the highest resolution available for each video."
      },
      {
        question: "After downloading the images, where will Facebook Thumbnail be saved?",
        answer: "After downloading the thumbnail, the image will be saved to your device's download folder if you're using a laptop or PC. If you're using a mobile device, it will be saved to your gallery. The file name will include the video ID for easy identification."
      },
      {
        question: "Can I download Live Facebook video Thumbnail with this tool?",
        answer: "Yes, you can. But you have to wait for the live streaming to be completed first, then just copy the link and follow the steps explained above. Once the live video ends and becomes a regular video post, you can download its thumbnail using our tool."
      }
    ],
    "instagram-filters": [
      {
        question: "What are Instagram Filters?",
        answer: "Instagram Filters are editing effects that change the appearance of photos and videos by adjusting colors, brightness, contrast, and other visual elements."
      },
      {
        question: "Which are the best Instagram filters?",
        answer: "The best Instagram filters depend on your content style. Bright filters work well for travel and lifestyle photos, while softer filters are often preferred for portraits."
      },
      {
        question: "Can I use an Instagram filters app instead of Instagram filters?",
        answer: "Yes. An Instagram filters app can provide more editing features, advanced tools, and additional filter options beyond Instagram's built-in collection."
      },
      {
        question: "Why are Instagram photo filters important?",
        answer: "Instagram photo filters help improve image quality, create visual consistency, and make posts more attractive to viewers."
      },
      {
        question: "Where can I find different Instagram filters names?",
        answer: "You can explore different Instagram filters names directly within Instagram or through various photo editing applications that offer additional filter collections, including the filters available in this free tool."
      }
    ],
    "instagram-post-generator": [
      {
        question: "What is an Instagram Post Generator?",
        answer: "An Instagram Post Generator is a tool that helps users create captions, content ideas, and social media posts quickly and efficiently."
      },
      {
        question: "How does an AI Instagram post generator work?",
        answer: "An AI Instagram post generator uses artificial intelligence to generate content suggestions based on user input, making content creation faster and easier."
      },
      {
        question: "Can a social media post generator improve engagement?",
        answer: "Yes. A social media post generator can provide creative ideas and captions that help make posts more engaging and attractive to audiences."
      },
      {
        question: "What is an Instagram automation tool?",
        answer: "An Instagram automation tool helps users schedule posts, manage content, and streamline social media activities more efficiently."
      },
      {
        question: "Is a free Instagram post maker useful for beginners?",
        answer: "Yes. A free Instagram post maker allows beginners to create professional-looking designs without needing advanced design skills."
      }
    ],
    "instagram-photo-downloader": [
      {
        question: "What is an Instagram Profile Photo Downloader?",
        answer: "An Instagram Profile Photo Downloader is a tool that allows users to view and save Instagram profile pictures in a larger and clearer format."
      },
      {
        question: "Can photos be downloaded from Instagram?",
        answer: "Yes, some public content can be accessed through download tools. However, users should always respect copyright rules and privacy settings."
      },
      {
        question: "What is an Instagram photo downloader app?",
        answer: "An Instagram photo downloader app is a mobile application designed to help users download or view Instagram images more conveniently."
      },
      {
        question: "Does an Instagram private photo downloader work for private accounts?",
        answer: "Private account content is protected by privacy settings. Users should always respect those settings and follow platform guidelines."
      },
      {
        question: "Why do people discuss tools on Instagram photo downloader Reddit?",
        answer: "Many users share experiences, reviews, and recommendations on Instagram photo downloader Reddit threads to help others find reliable download tools."
      }
    ],
    "tweet-to-image": [
      {
        question: "What is Download Tweet as Image?",
        answer: "Download Tweet as Image is a process that allows users to save tweets as image files for easier sharing and presentation."
      },
      {
        question: "What is a tweet screenshot generator?",
        answer: "A tweet screenshot generator is a tool that creates image versions of tweets while maintaining their original appearance."
      },
      {
        question: "How does a tweet to image converter work?",
        answer: "A tweet to image converter transforms tweet content into a downloadable image format that can be shared on various platforms."
      },
      {
        question: "What is a tweet to image generator?",
        answer: "A tweet to image generator creates visual representations of tweets that are easy to save, share, and use in content projects."
      },
      {
        question: "Why use a Twitter card image generator?",
        answer: "A Twitter card image generator helps create attractive social media graphics that improve visual appeal and support branding efforts."
      }
    ],
    "twitter-ad-revenue": [
      {
        question: "What is a Twitter Monetization Calculator?",
        answer: "A Twitter Monetization Calculator is a tool that estimates potential earnings based on views, engagement, and account performance."
      },
      {
        question: "How accurate is a Twitter Monetization Calculator?",
        answer: "A Twitter Monetization Calculator provides estimates, not exact earnings. Actual results may vary depending on multiple factors."
      },
      {
        question: "How much does Twitter pay per 1000 views?",
        answer: "There is no fixed amount because earnings depend on engagement, audience quality, advertiser demand, and platform policies."
      },
      {
        question: "What is an X monetization calculator?",
        answer: "An X monetization calculator is a tool that estimates potential revenue from content published on X (formerly Twitter)."
      },
      {
        question: "What is a Twitter payout calculator?",
        answer: "A Twitter payout calculator helps users estimate possible earnings based on account performance and audience activity."
      },
      {
        question: "What is a Twitter ad revenue calculator?",
        answer: "A Twitter ad revenue calculator estimates potential advertising-related income generated through content views and engagement."
      }
    ]
  };

  // Use custom FAQs if available, otherwise use default
  const faqs = customFAQs[tool.id] || [
    {
      question: `How to use ${tool.name}?`,
      answer: `Our ${tool.name.toLowerCase()} is a free online tool that helps you ${tool.description.toLowerCase()}. Simply use the interface above to get started. No signup required.`
    },
    {
      question: `Is ${tool.name} free to use?`,
      answer: `Yes, ${tool.name} is completely free. No signup, no credit card, no hidden fees. Use it as many times as you need.`
    },
    {
      question: `Can I use ${tool.name} for business?`,
      answer: `Absolutely! ${tool.name} is perfect for businesses, content creators, and social media managers looking to improve their social media presence.`
    },
    {
      question: `Do I need to create an account?`,
      answer: `No account required! All our social media tools are free to use without any registration. Just visit the tool and start using it immediately.`
    }
  ];

  return (
    <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-slate-200 dark:border-slate-700 last:border-0 pb-4 last:pb-0">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">{faq.question}</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

