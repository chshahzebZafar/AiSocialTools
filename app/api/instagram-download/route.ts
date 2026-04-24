import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

// Instagram aggressively blocks data-center IPs and changes its HTML often.
// This route fetches the public Instagram post page server-side and extracts
// og:image / og:video meta tags plus JSON-LD. It works best for public posts
// and reels. Private, age-gated, or geo-restricted content will fail.

export const runtime = "nodejs";
export const maxDuration = 30;

interface MediaItem {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
}

interface PostData {
  type: "image" | "video" | "carousel";
  media: MediaItem[];
  title: string;
  description: string;
  author: string;
  postId: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url: string | undefined = body?.url;

    if (!url || !isValidInstagramUrl(url)) {
      return NextResponse.json(
        { success: false, error: "Please paste a valid Instagram post, reel, or IGTV URL." },
        { status: 400 }
      );
    }

    const normalizedUrl = normalizeInstagramUrl(url);

    const response = await fetch(normalizedUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            response.status === 404
              ? "Post not found. It may have been deleted or the URL is invalid."
              : response.status === 401 || response.status === 403
              ? "This post is private or age-restricted. Only public content can be downloaded."
              : `Instagram returned ${response.status}. Try again later — Instagram sometimes blocks automated requests.`,
        },
        { status: response.status === 404 ? 404 : 502 }
      );
    }

    const html = await response.text();

    // Instagram redirects logged-out users to /accounts/login in many cases
    if (html.includes("/accounts/login") && !html.includes('property="og:image"')) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Instagram is requiring login for this post. This usually happens for private, age-gated, or geo-restricted content.",
        },
        { status: 403 }
      );
    }

    const $ = cheerio.load(html);
    const data = extractPostData($, normalizedUrl);

    if (data.media.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No downloadable media found. Instagram may have blocked this request, or the post format isn't supported. Try again in a minute, or check the URL is a public post.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    console.error("Instagram download error:", error);
    return NextResponse.json(
      { success: false, error: "Unexpected error. Instagram may have changed its page format — please report the URL." },
      { status: 500 }
    );
  }
}

function isValidInstagramUrl(url: string): boolean {
  return /^https?:\/\/(www\.)?instagram\.com\/(p|reel|reels|tv)\/[\w-]+/i.test(url);
}

function normalizeInstagramUrl(url: string): string {
  // Strip query strings (they can include tracking params that change the HTML)
  const u = url.split("?")[0].replace(/\/$/, "");
  return u.endsWith("/") ? u : `${u}/`;
}

function extractPostData($: cheerio.CheerioAPI, url: string): PostData {
  const data: PostData = {
    type: "image",
    media: [],
    title: "",
    description: "",
    author: "",
    postId: "",
  };

  const match = url.match(/\/(p|reel|reels|tv)\/([\w-]+)/);
  if (match) data.postId = match[2];

  const ogImage = $('meta[property="og:image"]').attr("content");
  const ogVideo =
    $('meta[property="og:video"]').attr("content") ||
    $('meta[property="og:video:secure_url"]').attr("content");

  data.title = $('meta[property="og:title"]').attr("content") || $("title").text() || "";
  data.description = $('meta[property="og:description"]').attr("content") || "";

  // Extract author from title (Instagram uses "Author (@handle) on Instagram: ...")
  const authorMatch = data.title.match(/\(@([\w.]+)\)/);
  if (authorMatch) data.author = `@${authorMatch[1]}`;

  if (ogVideo) {
    data.type = "video";
    data.media.push({ type: "video", url: ogVideo, thumbnail: ogImage });
  } else if (ogImage) {
    data.type = "image";
    data.media.push({ type: "image", url: ogImage });
  }

  // Try JSON-LD for richer data / carousels
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const raw = $(el).contents().text();
      if (!raw) return;
      const json = JSON.parse(raw);
      const items = Array.isArray(json) ? json : [json];
      for (const item of items) {
        if (item.video) {
          const videos = Array.isArray(item.video) ? item.video : [item.video];
          for (const v of videos) {
            if (v.contentUrl && !data.media.some((m) => m.url === v.contentUrl)) {
              data.media.push({ type: "video", url: v.contentUrl, thumbnail: v.thumbnailUrl });
              data.type = "carousel";
            }
          }
        }
        if (item.image) {
          const images = Array.isArray(item.image) ? item.image : [item.image];
          for (const img of images) {
            const src = typeof img === "string" ? img : img.url || img.contentUrl;
            if (src && !data.media.some((m) => m.url === src)) {
              data.media.push({ type: "image", url: src });
              if (data.media.length > 1) data.type = "carousel";
            }
          }
        }
      }
    } catch {
      /* ignore malformed JSON-LD blocks */
    }
  });

  data.title = data.title.replace(/ on Instagram.*$/i, "").trim();

  return data;
}
