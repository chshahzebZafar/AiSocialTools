"use client";

import { useState } from "react";
import { Share2, MessageCircle, Twitter, Facebook, Link as LinkIcon, Check } from "lucide-react";

interface ShareButtonsProps {
  url?: string;
  title?: string;
  text?: string;
  resultText?: string;
  className?: string;
}

export default function ShareButtons({
  url,
  title = "Check out this tool!",
  text = "I found this amazing social media tool!",
  resultText,
  className = "",
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = resultText || text;
  const fullText = `${shareText}\n\n${shareUrl}`;

  const handleCopyLink = async () => {
    try {
      const textToCopy = resultText || shareUrl;
      
      // Check if clipboard API is available
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for older browsers or when clipboard API is not available
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } else {
          alert("Failed to copy. Please copy manually: " + textToCopy);
        }
      }
    } catch (err) {
      console.error("Failed to copy:", err);
      // Final fallback
      const textToCopy = resultText || shareUrl;
      try {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } else {
          alert("Failed to copy. Please copy manually: " + textToCopy);
        }
      } catch (fallbackErr) {
        console.error("Fallback copy also failed:", fallbackErr);
        alert("Failed to copy. Please copy manually: " + (resultText || shareUrl));
      }
    }
  };

  const handleWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullText)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  const handleFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, "_blank", "noopener,noreferrer");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error occurred
        console.log("Share cancelled");
      }
    }
  };

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 mr-2">Share:</span>
      
      {/* WhatsApp */}
      <button
        onClick={handleWhatsApp}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm font-medium"
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="hidden sm:inline">WhatsApp</span>
      </button>

      {/* Twitter/X */}
      <button
        onClick={handleTwitter}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-black hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium"
        title="Share on Twitter/X"
        aria-label="Share on Twitter/X"
      >
        <Twitter className="w-4 h-4" />
        <span className="hidden sm:inline">Twitter</span>
      </button>

      {/* Facebook */}
      <button
        onClick={handleFacebook}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
        <span className="hidden sm:inline">Facebook</span>
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium ${
          copied
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300"
        }`}
        title={resultText ? "Copy result" : "Copy link"}
        aria-label={resultText ? "Copy result" : "Copy link"}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            <span className="hidden sm:inline">Copied!</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Copy {resultText ? "Result" : "Link"}</span>
          </>
        )}
      </button>

      {/* Native Share (mobile) */}
      {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
        <button
          onClick={handleNativeShare}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg transition-colors text-sm font-medium sm:hidden"
          title="Share"
          aria-label="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

