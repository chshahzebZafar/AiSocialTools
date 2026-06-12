"use client";

import { useState } from "react";
import { Download, Pin, AlertCircle, Video, Image as ImageIcon, Smartphone, Monitor, Shield, FileVideo, Music, Image as ImgIcon, CheckCircle } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolHero from "@/components/ToolHero";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { getSEOMetadata } from "@/lib/seo-metadata";
import { ToolComments } from "@/components/ToolComments";

interface PinData {
  type: "video" | "image" | "story";
  thumbnailUrl: string;
  downloadUrl: string;
  title?: string;
  description?: string;
}

export default function PinterestVideoDownloaderPage() {
  const tool = getToolById("pinterest-video-downloader");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [pinUrl, setPinUrl] = useState("");
  const [pinData, setPinData] = useState<PinData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const extractPinId = (url: string): string | null => {
    // Match patterns like:
    // https://www.pinterest.com/pin/123456789/
    // https://pinterest.com/pin/123456789
    // https://pin.it/abc123
    const pinPattern = /pinterest\.com\/pin\/(\d+)/;
    const shortPattern = /pin\.it\/(\w+)/;

    const pinMatch = url.match(pinPattern);
    if (pinMatch) return pinMatch[1];

    const shortMatch = url.match(shortPattern);
    if (shortMatch) return shortMatch[1];

    return null;
  };

  const extractPinData = async () => {
    setError("");
    setPinData(null);
    setLoading(true);

    const pinId = extractPinId(pinUrl);

    if (!pinId) {
      setError("Invalid Pinterest URL. Please enter a valid Pinterest pin URL (e.g., https://www.pinterest.com/pin/123456789/)");
      setLoading(false);
      return;
    }

    try {
      // Call the backend API to extract Pinterest data
      const response = await fetch('/api/pinterest-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: pinUrl }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Failed to extract content. Please check the URL and try again.');
        setLoading(false);
        return;
      }

      setPinData({
        type: data.type,
        downloadUrl: data.downloadUrl,
        thumbnailUrl: data.thumbnailUrl,
        title: data.title,
        description: data.description,
      });

    } catch (err) {
      setError("Failed to extract pin data. Please check your internet connection and try again.");
      setLoading(false);
    }
  };

  const downloadContent = () => {
    if (!pinData?.downloadUrl) return;

    const a = document.createElement("a");
    a.href = pinData.downloadUrl;
    const extension = pinData.type === "video" ? ".mp4" : ".jpg";
    a.download = `pinterest-${pinData.type}-${Date.now()}${extension}`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <ToolHero
        toolId={tool?.id}
        icon={Pin}
        iconGradient="from-red-600 to-red-800"
        title="Pinterest Video Downloader - Download Pinterest Videos & Images Free"
        description="Download videos and images from Pinterest pins. Free Pinterest downloader tool. Save Pinterest content in HD quality for offline viewing. No signup required."
        shareTitle="Pinterest Video Downloader"
        shareText="Check out this free Pinterest video downloader tool!"
      />
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Pinterest Pin URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={pinUrl}
              onChange={(e) => setPinUrl(e.target.value)}
              placeholder="https://www.pinterest.com/pin/... or https://pin.it/..."
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <button
              onClick={extractPinData}
              disabled={loading || !pinUrl}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Pin className="w-5 h-5" />
              {loading ? "Extracting..." : "Extract"}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">Important Notice</h3>
                <p className="text-sm text-yellow-800">{error}</p>
                <p className="text-sm text-yellow-700 mt-2">
                  <strong>Note:</strong> To implement this feature properly, you will need:
                </p>
                <ul className="text-sm text-yellow-700 mt-2 list-disc list-inside space-y-1">
                  <li>A backend API service to handle Pinterest requests</li>
                  <li>Pinterest API access or web scraping service</li>
                  <li>Proper handling of authentication and rate limits</li>
                  <li>Respect for Pinterest Terms of Service</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {pinData && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Download Content</h2>
            <div className="space-y-4">
              {pinData.thumbnailUrl && (
                <div className="relative group">
                  <img
                    src={pinData.thumbnailUrl}
                    alt={pinData.title || "Pinterest content thumbnail"}
                    className="w-full max-w-md rounded-lg border border-slate-200"
                  />
                  <div className="absolute top-2 left-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      pinData.type === "video"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {pinData.type === "video" ? (
                        <span className="flex items-center gap-1">
                          <Video className="w-3 h-3" /> Video
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <ImageIcon className="w-3 h-3" /> Image
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              )}
              {pinData.title && (
                <h3 className="font-medium text-slate-900">{pinData.title}</h3>
              )}
              {pinData.description && (
                <p className="text-sm text-slate-600">{pinData.description}</p>
              )}
              <button
                onClick={downloadContent}
                className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download {pinData.type === "video" ? "Video" : "Image"}
              </button>
            </div>
          </div>
        )}

        {/* Ad Unit - After Download Section */}
        <div className="my-8">
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1544013803258168"
               crossOrigin="anonymous"></script>
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-1544013803258168"
               data-ad-slot="1169725018"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          <script dangerouslySetInnerHTML={{
            __html: `(adsbygoogle = window.adsbygoogle || []).push({});`
          }} />
        </div>

        {/* Comprehensive Content Section */}
        <div className="mt-8 space-y-8">
          
          {/* How To Download Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">How To Download Pinterest Videos using AisocialTools?</h2>
            </div>
            <p className="text-slate-600 mb-6">
              <strong>AisocialTools</strong> is the Best Pinterest video downloader online. The steps below provide quick info on how to download Pinterest videos, images, and GIFs from both the mobile app and desktop versions.
            </p>

            {/* Mobile Steps */}
            <div className="mb-6">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-blue-500" />
                Steps to Download from Mobile App:
              </h3>
              <ol className="space-y-2 text-slate-600 list-decimal list-inside ml-2">
                <li>Open the <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Pinterest App</a> and select the video, image, or GIF you want to download.</li>
                <li>Tap on the ••• icon at the top right corner of the Pinterest app. If you are using the latest version, tap on the ••• icon at the bottom right corner of the app. After tapping the ••• icon, tap on the <strong>Copy Link</strong> option.</li>
                <li>Paste the video URL in the Download Input Box on the AisocialTools website, and tap on the <strong>Download</strong> button.</li>
                <li>You will see a preview of your download file. Tap on the <strong>Download</strong> button just below it.</li>
                <li>The Pinterest video, image, or GIF will be downloaded to your device.</li>
              </ol>
            </div>

            {/* Desktop Steps */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-purple-500" />
                Steps to Download from Desktop:
              </h3>
              <ol className="space-y-2 text-slate-600 list-decimal list-inside ml-2">
                <li>Open the <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Pinterest website</a> on your browser and select the video, image, or GIF you want to download.</li>
                <li>Copy the Pinterest video URL from the browser address bar.</li>
                <li>Paste the URL in the box above and press the <strong>Extract</strong> button.</li>
                <li>The video will be available for download - click the Download button.</li>
                <li>Drag the video file from the Downloads folder on your computer to your desired location.</li>
              </ol>
            </div>
          </div>

          {/* Supported Formats Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileVideo className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Supported Video Quality & Formats</h2>
            </div>
            <p className="text-slate-600 mb-4">
              One of the best things about AisocialTools is the choice of download quality. Whether you're on mobile data or Wi-Fi, you can choose the right format and resolution.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-slate-900 mb-2">Video Quality</h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> HD (720p and 1080p) for clear viewing</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> 2K and 4K Pinterest video downloads if available</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-slate-900 mb-2">Formats</h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> MP4 format for universal compatibility</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> High-resolution images (JPG, PNG)</li>
                </ul>
              </div>
            </div>
            <p className="text-slate-600 mt-4">
              You can even use AisocialTools to save Pinterest content in high resolution - ideal for content creators, marketers, and social media managers who need quality assets.
            </p>
          </div>

          {/* Mobile Compatibility Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Does AisocialTools Work on Mobile?</h2>
            </div>
            <p className="text-slate-600 mb-4">
              Absolutely. AisocialTools Pinterest Video Downloader supports:
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <Smartphone className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-slate-900">Android</h4>
                <p className="text-sm text-slate-600">Works on all Android browsers</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <Smartphone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-slate-900">iOS/iPhone</h4>
                <p className="text-sm text-slate-600">Including saving to camera roll</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <Monitor className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-slate-900">Desktop</h4>
                <p className="text-sm text-slate-600">Great for editing or managing content</p>
              </div>
            </div>
            <p className="text-slate-600">
              Whether you're searching for a Pinterest video downloader app, a Chrome extension, or just a fast website - <strong>AisocialTools works from any browser</strong>. Looking for more downloaders? Check out our <a href="/tools/instagram-photo-downloader" className="text-red-600 hover:underline font-medium">Instagram Photo Downloader</a> and <a href="/tools/youtube-thumbnail" className="text-red-600 hover:underline font-medium">YouTube Thumbnail Grabber</a>.
            </p>
          </div>

          {/* What Else Can You Download Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <ImgIcon className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">What Else Can You Download?</h2>
            </div>
            <p className="text-slate-600 mb-4">
              Aside from standard Pinterest videos, AisocialTools also helps you download:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <Video className="w-6 h-6 text-red-500 mb-2" />
                <h4 className="font-semibold text-slate-900">Pinterest Reels</h4>
                <p className="text-sm text-slate-600">Short videos and reels</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <ImageIcon className="w-6 h-6 text-blue-500 mb-2" />
                <h4 className="font-semibold text-slate-900">GIFs</h4>
                <p className="text-sm text-slate-600">Animated pins</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <ImgIcon className="w-6 h-6 text-green-500 mb-2" />
                <h4 className="font-semibold text-slate-900">Idea Pins</h4>
                <p className="text-sm text-slate-600">Multi-step tutorials</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <Music className="w-6 h-6 text-purple-500 mb-2" />
                <h4 className="font-semibold text-slate-900">Audio</h4>
                <p className="text-sm text-slate-600">Tracks from video clips</p>
              </div>
            </div>
            <p className="text-slate-600 mt-4">
              You can even save content in high resolution - like Pinterest 1080p videos or 4K quality, if available. Need to optimize your downloaded images? Try our <a href="/tools/image-resizer" className="text-red-600 hover:underline font-medium">Image Resizer</a> tool.
            </p>
          </div>

          {/* Safety Section */}
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Is AisocialTools Safe to Use?</h2>
            </div>
            <p className="text-slate-600 mb-4">
              Yes, AisocialTools is completely safe:
            </p>
            <ul className="space-y-2 text-slate-600 mb-4">
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" /> It doesn't ask for login or Pinterest credentials</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" /> It doesn't track you or show pop-up ads</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" /> It works directly through your browser</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" /> No software installation required</li>
            </ul>
            <p className="text-sm text-slate-500">
              <strong>Note:</strong> This tool is for personal use only. Please respect <a href="https://policy.pinterest.com/en/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Pinterest's Terms of Service</a> and copyright laws when downloading content. For more social media tools, explore our <a href="/tools" className="text-red-600 hover:underline font-medium">complete tools collection</a> including <a href="/tools/facebook-thumbnail" className="text-red-600 hover:underline">Facebook Thumbnail Downloader</a> and <a href="/tools/vimeo-thumbnail" className="text-red-600 hover:underline">Vimeo Thumbnail Grabber</a>.
            </p>
          </div>

        </div>

        {/* FAQ Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Questions & Answers</h2>
          </div>

          <div className="space-y-4">
            {/* Q1 */}
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-semibold text-slate-900 mb-2">Can I download videos from Pinterest?</h3>
              <p className="text-slate-600">
                Yes, with <strong>AisocialTools</strong>, you can easily download videos from Pinterest. Just copy the Pinterest video URL, paste it in the form above, and click the <strong>Extract</strong> button. The video will be downloaded to your PC or mobile device. You can also try our <a href="/tools/instagram-photo-downloader" className="text-red-600 hover:underline font-medium">Instagram Photo Downloader</a> for Instagram content.
              </p>
            </div>

            {/* Q2 */}
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-semibold text-slate-900 mb-2">How to download Pinterest videos?</h3>
              <ol className="text-slate-600 list-decimal list-inside space-y-1">
                <li>Enter the Pinterest video URL that you want to download.</li>
                <li>Paste the URL into our downloader box above.</li>
                <li>Click the <strong>Extract</strong> button.</li>
                <li>The download process will start immediately.</li>
                <li>The video will be saved directly to your system.</li>
              </ol>
              <p className="text-slate-600 mt-2">
                Need to download thumbnails instead? Check out our <a href="/tools/youtube-thumbnail" className="text-red-600 hover:underline font-medium">YouTube Thumbnail Grabber</a> or <a href="/tools/facebook-thumbnail" className="text-red-600 hover:underline font-medium">Facebook Thumbnail Downloader</a>.
              </p>
            </div>

            {/* Q3 */}
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-semibold text-slate-900 mb-2">How can I download images from Pinterest?</h3>
              <p className="text-slate-600">
                To download images from Pinterest, follow the same steps as for videos. Copy the image URL from the Pinterest pin, paste it into the form above, and click <strong>Extract</strong>. The image will be saved to your device in high quality (JPG or PNG format). For image editing after download, use our <a href="/tools/image-resizer" className="text-red-600 hover:underline font-medium">Image Resizer</a> or <a href="/tools/image-compressor" className="text-red-600 hover:underline font-medium">Image Compressor</a> tools.
              </p>
            </div>

            {/* Q4 */}
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-semibold text-slate-900 mb-2">Can I download GIFs from Pinterest?</h3>
              <p className="text-slate-600">
                Yes, <strong>AisocialTools</strong> supports downloading GIFs from Pinterest. Copy the GIF URL from the pin, paste it in the form above, and click the <strong>Extract</strong> button to save the GIF to your device. Animated pins are saved in their original format for easy sharing on other platforms like <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Twitter</a> or <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Instagram</a>.
              </p>
            </div>

            {/* Q5 */}
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-semibold text-slate-900 mb-2">Where are files saved after being downloaded?</h3>
              <p className="text-slate-600">
                Downloaded files are typically saved in the <strong>"Downloads"</strong> folder on your device. You can check your browser's download history by pressing <kbd className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">CTRL+J</kbd> (Windows) or <kbd className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">Cmd+J</kbd> (Mac) on your keyboard. From there, you can move files to your desired location or rename them as needed.
              </p>
            </div>

            {/* Q6 */}
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-semibold text-slate-900 mb-2">Why is the video playing instead of downloading?</h3>
              <p className="text-slate-600">
                This can happen if your browser is set to play videos by default. To fix this, <strong>right-click the download link</strong> and select <strong>"Save link as..."</strong> to download the video directly to your device. Alternatively, you can try using a different browser like <a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Chrome</a> or <a href="https://www.mozilla.org/firefox/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Firefox</a> which may handle downloads differently.
              </p>
            </div>

            {/* Q7 */}
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-semibold text-slate-900 mb-2">Does AisocialTools work on mobile devices?</h3>
              <p className="text-slate-600">
                Absolutely! <strong>AisocialTools Pinterest Video Downloader</strong> works perfectly on all mobile devices including <strong>Android</strong> and <strong>iOS/iPhone</strong>. Simply open your mobile browser, visit our website, paste the Pinterest URL, and download. No app installation required! For more mobile-friendly tools, explore our <a href="/tools" className="text-red-600 hover:underline font-medium">complete collection of social media tools</a>.
              </p>
            </div>

            {/* Q8 */}
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-semibold text-slate-900 mb-2">Can I download entire Pinterest boards?</h3>
              <p className="text-slate-600">
                Currently, <strong>AisocialTools</strong> downloads individual pins one at a time. For downloading entire boards, you would need to copy each pin's URL separately. We recommend organizing your downloads in folders by board name. For converting your saved images between formats, try our <a href="/tools/image-converter" className="text-red-600 hover:underline font-medium">Image Converter</a> tool.
              </p>
            </div>

            {/* Q9 */}
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-semibold text-slate-900 mb-2">Can I download Pinterest artwork?</h3>
              <p className="text-slate-600">
                Yes, you can download any artwork, illustrations, and creative content from Pinterest as long as it's publicly accessible. Please respect copyright laws and the artist's rights. Always check the <a href="https://policy.pinterest.com/en/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Pinterest Terms of Service</a> and only download content for personal use or with proper permission. Consider supporting artists by visiting their official websites or purchasing their work.
              </p>
            </div>

            {/* Q10 */}
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-semibold text-slate-900 mb-2">Does AisocialTools store downloaded files?</h3>
              <p className="text-slate-600">
                <strong>No, we never store your downloaded files.</strong> All downloads happen directly between Pinterest's servers and your device. We don't keep copies, logs, or backups of any content you download. Your privacy is our priority - we don't require login, don't track your activity, and don't store any personal information. For more privacy-focused tools, check our <a href="/privacy" className="text-red-600 hover:underline font-medium">Privacy Policy</a> or explore other <a href="/tools" className="text-red-600 hover:underline font-medium">free online tools</a>.
              </p>
            </div>

            {/* Q11 */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Will there be a browser extension for AisocialTools?</h3>
              <p className="text-slate-600">
                We're currently evaluating the development of browser extensions for <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Chrome</a> and <a href="https://addons.mozilla.org" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Firefox</a> to make Pinterest downloading even easier. For now, our website works seamlessly on all browsers without any installation. Bookmark our site for quick access, and follow us for updates on new features and tools!
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
