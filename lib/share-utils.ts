/**
 * Share utility functions for social media platforms
 */

export interface ShareOptions {
  url?: string;
  title?: string;
  text?: string;
  hashtags?: string[];
}

/**
 * Get the current page URL
 */
export function getCurrentUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.href;
  }
  return "";
}

/**
 * Generate WhatsApp share URL
 */
export function getWhatsAppShareUrl(options: ShareOptions): string {
  const url = options.url || getCurrentUrl();
  const text = options.text || options.title || "";
  const fullText = text ? `${text}\n\n${url}` : url;
  return `https://wa.me/?text=${encodeURIComponent(fullText)}`;
}

/**
 * Generate Twitter/X share URL
 */
export function getTwitterShareUrl(options: ShareOptions): string {
  const url = options.url || getCurrentUrl();
  const text = options.text || options.title || "";
  const hashtags = options.hashtags?.join(",") || "";
  
  const params = new URLSearchParams();
  if (text) params.append("text", text);
  if (url) params.append("url", url);
  if (hashtags) params.append("hashtags", hashtags);
  
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

/**
 * Generate Facebook share URL
 */
export function getFacebookShareUrl(options: ShareOptions): string {
  const url = options.url || getCurrentUrl();
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error("Failed to copy text:", err);
    return false;
  }
}

/**
 * Share using Web Share API (native sharing on mobile)
 */
export async function nativeShare(options: ShareOptions): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({
        title: options.title || "",
        text: options.text || "",
        url: options.url || getCurrentUrl(),
      });
      return true;
    } catch (err) {
      // User cancelled or error occurred
      return false;
    }
  }
  return false;
}

