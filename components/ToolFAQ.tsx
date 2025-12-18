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

