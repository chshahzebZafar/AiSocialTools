import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || !isValidPinterestUrl(url)) {
      return NextResponse.json(
        { success: false, error: 'Invalid Pinterest URL provided' },
        { status: 400 }
      );
    }

    // Resolve short URLs (pin.it)
    let resolvedUrl = url;
    if (url.includes('pin.it/')) {
      const redirectResponse = await fetch(url, {
        method: 'HEAD',
        redirect: 'follow',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      resolvedUrl = redirectResponse.url;
    }

    // Fetch Pinterest page server-side (bypasses CORS)
    const response = await fetch(resolvedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch Pinterest page. The pin may be private or deleted.' },
        { status: 404 }
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract data using multiple strategies
    const pinData = extractPinData($, resolvedUrl);

    if (!pinData.downloadUrl) {
      return NextResponse.json(
        { success: false, error: 'No downloadable content found. This may be a private pin or the format is not supported.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      ...pinData
    });

  } catch (error) {
    console.error('Pinterest download error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

function isValidPinterestUrl(url: string): boolean {
  const patterns = [
    /^https?:\/\/(www\.)?pinterest\.com\/pin\/\d+/,
    /^https?:\/\/pin\.it\/\w+/,
    /^https?:\/\/(www\.)?pinterest\.[a-z]{2,}\/pin\/\d+/
  ];
  return patterns.some(pattern => pattern.test(url));
}

function extractPinData($: cheerio.CheerioAPI, url: string) {
  const data: {
    type: 'video' | 'image' | 'story';
    downloadUrl: string;
    thumbnailUrl: string;
    title: string;
    description: string;
    pinId: string;
  } = {
    type: 'image',
    downloadUrl: '',
    thumbnailUrl: '',
    title: '',
    description: '',
    pinId: ''
  };

  // Extract pin ID from URL
  const pinMatch = url.match(/pin\/(\d+)/);
  if (pinMatch) {
    data.pinId = pinMatch[1];
  }

  // Try to extract from meta tags first (most reliable)
  const ogVideo = $('meta[property="og:video"]').attr('content') ||
                  $('meta[property="og:video:secure_url"]').attr('content') ||
                  $('meta[property="og:video:url"]').attr('content');

  const ogImage = $('meta[property="og:image"]').attr('content') ||
                  $('meta[property="og:image:secure_url"]').attr('content');

  const twitterVideo = $('meta[name="twitter:player:stream"]').attr('content') ||
                      $('meta[name="twitter:player"]').attr('content');

  // Check for video content
  if (ogVideo || twitterVideo) {
    data.type = 'video';
    data.downloadUrl = ogVideo || twitterVideo || '';
  }

  // If no video, look for image
  if (!data.downloadUrl && ogImage) {
    data.type = 'image';
    data.downloadUrl = ogImage;
  }

  // Try extracting from JSON-LD
  $('script[type="application/ld+json"]').each((_, element) => {
    try {
      const jsonData = JSON.parse($(element).html() || '{}');
      if (jsonData['@type'] === 'VideoObject') {
        data.type = 'video';
        data.downloadUrl = jsonData.contentUrl || jsonData.embedUrl || data.downloadUrl;
        data.thumbnailUrl = jsonData.thumbnailUrl || data.thumbnailUrl;
        data.title = jsonData.name || data.title;
        data.description = jsonData.description || data.description;
      } else if (jsonData['@type'] === 'ImageObject') {
        data.downloadUrl = jsonData.contentUrl || jsonData.url || data.downloadUrl;
        data.thumbnailUrl = jsonData.thumbnail || data.thumbnailUrl;
      }
    } catch (e) {
      // Ignore JSON parse errors
    }
  });

  // Extract from video tags (if page has them)
  const videoElement = $('video').first();
  if (videoElement.length && !data.downloadUrl) {
    const videoSrc = videoElement.attr('src') ||
                    videoElement.find('source').first().attr('src');
    if (videoSrc) {
      data.type = 'video';
      data.downloadUrl = videoSrc;
    }
  }

  // Extract from img tags with high resolution
  if (!data.downloadUrl) {
    const imgElement = $('img[src*="pinimg.com"]').first();
    if (imgElement.length) {
      data.type = 'image';
      data.downloadUrl = imgElement.attr('src') || '';
    }
  }

  // Get title and description
  data.title = $('meta[property="og:title"]').attr('content') ||
               $('title').text() ||
               $('h1').first().text() ||
               '';

  data.description = $('meta[property="og:description"]').attr('content') ||
                     $('meta[name="description"]').attr('content') ||
                     '';

  // Set thumbnail (usually same as download for images)
  data.thumbnailUrl = data.thumbnailUrl || data.downloadUrl || ogImage || '';

  // Try to get highest quality image by replacing URL patterns
  if (data.downloadUrl && data.downloadUrl.includes('pinimg.com')) {
    // Pinterest images often have quality indicators in URL
    // Try to get original quality by modifying the URL
    const originalUrl = data.downloadUrl
      .replace(/\/(\d+)x(\d+)\//, '/originals/')  // Replace size with originals
      .replace(/\/(\d+)x\//, '/originals/');       // Replace single dimension
    
    if (originalUrl !== data.downloadUrl) {
      data.downloadUrl = originalUrl;
    }
  }

  // Clean up title
  data.title = data.title
    .replace(' | Pinterest', '')
    .replace(' on Pinterest', '')
    .trim();

  return data;
}
