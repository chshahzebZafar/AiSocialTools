"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Video, Upload, Download, RefreshCw, Play, Pause, Settings, AlertCircle, Sparkles } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

// Import gif.js dynamically
let GIF: any = null;
const loadGIF = async () => {
  if (GIF) return GIF;
  const gifjs = await import("gif.js");
  GIF = gifjs.default || gifjs;
  return GIF;
};

export default function VideoToGifPage() {
  const tool = getToolById("video-to-gif");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(5);
  const [duration, setDuration] = useState(0);
  const [frameRate, setFrameRate] = useState(10);
  const [quality, setQuality] = useState(80);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleVideoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("video/")) {
      setError("Please upload a valid video file (MP4, WebM, MOV, etc.)");
      return;
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      setError("Video size must be less than 100MB");
      return;
    }

    setError(null);
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setGifUrl(null);
    setStartTime(0);
    setEndTime(5);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      const video = videoRef.current;
      
      const handleLoadedMetadata = () => {
        const videoDuration = video.duration;
        setDuration(videoDuration);
        setEndTime(Math.min(5, videoDuration));
      };

      const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime);
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [videoUrl]);

  const convertToGif = useCallback(async () => {
    if (!videoFile || !videoUrl || !videoRef.current || !canvasRef.current) {
      setError("Please upload a video first");
      return;
    }

    if (endTime <= startTime) {
      setError("End time must be greater than start time");
      return;
    }

    setIsConverting(true);
    setError(null);
    setGifUrl(null);
    setProgress(0);

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        throw new Error("Could not get canvas context");
      }

      // Load GIF.js
      const GIFClass = await loadGIF();

      // Calculate dimensions (max 800px width for performance)
      const maxWidth = quality > 70 ? 800 : quality > 40 ? 600 : 400;
      const videoAspect = video.videoWidth / video.videoHeight;
      let width = Math.min(video.videoWidth, maxWidth);
      let height = width / videoAspect;

      canvas.width = width;
      canvas.height = height;

      // Create GIF encoder without workers to avoid CORS issues
      const gif = new GIFClass({
        workers: 0, // Disable workers to avoid CORS issues
        quality: quality,
        width: width,
        height: height,
      });

      // Calculate frame interval based on frame rate
      const frameInterval = 1 / frameRate;
      const gifDuration = endTime - startTime;
      const totalFrames = Math.ceil(gifDuration * frameRate);
      
      // Seek to start time
      video.currentTime = startTime;
      
      // Wait for video to seek
      await new Promise((resolve) => {
        const onSeeked = () => {
          video.removeEventListener("seeked", onSeeked);
          resolve(null);
        };
        video.addEventListener("seeked", onSeeked);
      });

      // Extract frames
      let currentFrame = 0;
      let currentTime = startTime;

      const extractFrame = async (): Promise<void> => {
        return new Promise((resolve, reject) => {
          if (currentTime >= endTime) {
            resolve();
            return;
          }

          const targetTime = currentTime;
          video.currentTime = targetTime;
          
          const onSeeked = () => {
            video.removeEventListener("seeked", onSeeked);
            
            try {
              // Draw frame to canvas
              ctx.drawImage(video, 0, 0, width, height);
              
              // Add frame to GIF (delay in milliseconds)
              gif.addFrame(canvas, { delay: frameInterval * 1000 });
              
              currentFrame++;
              currentTime = startTime + (currentFrame * frameInterval);
              
              // Update progress (0-45% for frame extraction)
              const extractionProgress = Math.min(45, (currentFrame / totalFrames) * 45);
              setProgress(extractionProgress);
              
              resolve();
            } catch (err) {
              console.error("Error extracting frame:", err);
              reject(err);
            }
          };

          const onError = () => {
            video.removeEventListener("seeked", onSeeked);
            video.removeEventListener("error", onError);
            reject(new Error("Video seek error"));
          };

          video.addEventListener("seeked", onSeeked);
          video.addEventListener("error", onError);
          
          // Timeout fallback - if video doesn't seek in time, skip this frame
          setTimeout(() => {
            video.removeEventListener("seeked", onSeeked);
            video.removeEventListener("error", onError);
            // Skip this frame and continue
            currentFrame++;
            currentTime = startTime + (currentFrame * frameInterval);
            resolve();
          }, 2000);
        });
      };

      // Extract all frames
      while (currentTime < endTime && currentFrame < totalFrames) {
        await extractFrame();
      }

      // Set progress to 50% after frame extraction
      setProgress(50);

      // Render GIF
      const blob = await new Promise<Blob>((resolve, reject) => {
        // Set timeout for rendering (30 seconds max)
        const renderTimeout = setTimeout(() => {
          reject(new Error("GIF rendering timed out"));
        }, 30000);

        gif.on("progress", (p: number) => {
          // Update progress (50-95% for rendering)
          setProgress(50 + (p * 45));
        });

        gif.on("finished", (blob: Blob) => {
          clearTimeout(renderTimeout);
          setProgress(100);
          resolve(blob);
        });

        gif.on("error", (err: Error) => {
          clearTimeout(renderTimeout);
          reject(err);
        });

        try {
          gif.render();
        } catch (err) {
          clearTimeout(renderTimeout);
          reject(err);
        }
      });

      const url = URL.createObjectURL(blob);
      setGifUrl(url);
      // Progress is already set to 100% in the 'finished' event handler
    } catch (err) {
      console.error("Conversion error:", err);
      setError("Failed to convert video to GIF. Please try again with a shorter clip or lower quality.");
    } finally {
      setIsConverting(false);
    }
  }, [videoFile, videoUrl, startTime, endTime, frameRate, quality]);

  const downloadGif = useCallback(() => {
    if (!gifUrl) return;

    const a = document.createElement("a");
    a.href = gifUrl;
    a.download = `video-to-gif-${Date.now()}.gif`;
    a.click();
  }, [gifUrl]);

  const reset = useCallback(() => {
    setVideoFile(null);
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    if (gifUrl) URL.revokeObjectURL(gifUrl);
    setVideoUrl(null);
    setGifUrl(null);
    setError(null);
    setStartTime(0);
    setEndTime(5);
    setDuration(0);
    setCurrentTime(0);
    setProgress(0);
    setIsPlaying(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [videoUrl, gifUrl]);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const seekToTime = useCallback((time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  Video to GIF Converter - Free Online Tool
                </h1>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white animate-pulse">
                  New
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Convert video clips to animated GIFs instantly. Free video to GIF converter with frame rate control, 
                quality optimization, and size reduction. Perfect for social media, memes, and presentations.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            {tool && <FavoriteButton toolId={tool.id} />}
            <ShareButtons
              title="Video to GIF Converter"
              text="Check out this free video to GIF converter tool!"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload & Video Section */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Upload Video
              </h2>
              
              {!videoUrl ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400 dark:text-slate-500" />
                  <p className="text-slate-600 dark:text-slate-300 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    MP4, WebM, MOV up to 100MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-black">
                    <video
                      ref={videoRef}
                      src={videoUrl}
                      className="w-full h-auto max-h-64"
                      controls={false}
                      onEnded={() => setIsPlaying(false)}
                    />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
                      <button
                        onClick={togglePlay}
                        className="p-2 bg-black/70 text-white rounded hover:bg-black/90 transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>
                      <div className="flex-1 text-xs text-white bg-black/70 px-2 py-1 rounded">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>
                    </div>
                  </div>

                  {/* Hidden canvas for frame extraction */}
                  <canvas ref={canvasRef} className="hidden" />

                  {/* Time Selection */}
                  {duration > 0 && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Start Time: {formatTime(startTime)}
                        </label>
                        <input
                          type="range"
                          min="0"
                          max={duration}
                          step="0.1"
                          value={startTime}
                          onChange={(e) => {
                            const newStart = Number(e.target.value);
                            setStartTime(newStart);
                            if (newStart >= endTime) {
                              setEndTime(Math.min(newStart + 1, duration));
                            }
                            seekToTime(newStart);
                          }}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          End Time: {formatTime(endTime)} (Duration: {formatTime(endTime - startTime)})
                        </label>
                        <input
                          type="range"
                          min={startTime + 0.1}
                          max={duration}
                          step="0.1"
                          value={endTime}
                          onChange={(e) => {
                            setEndTime(Number(e.target.value));
                            seekToTime(Number(e.target.value));
                          }}
                          className="w-full"
                        />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Maximum recommended duration: 10 seconds for best results
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={convertToGif}
                      disabled={isConverting || !videoFile || !videoUrl || endTime <= startTime}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {isConverting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Converting... {Math.round(progress)}%
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Convert to GIF
                        </>
                      )}
                    </button>
                    <button
                      onClick={reset}
                      className="px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}
            </div>

            {/* Settings */}
            {videoUrl && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Conversion Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Frame Rate: {frameRate} FPS
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="1"
                      value={frameRate}
                      onChange={(e) => setFrameRate(Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Lower FPS = smaller file size, higher FPS = smoother animation
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Quality: {quality}%
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      step="10"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Higher quality = larger file size, lower quality = smaller file size
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Result Section */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                GIF Result
              </h2>
              
              {gifUrl ? (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900">
                    <img
                      src={gifUrl}
                      alt="Converted GIF"
                      className="w-full h-auto max-h-96 object-contain mx-auto"
                      loading="lazy"
                    />
                  </div>
                  <button
                    onClick={downloadGif}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download GIF
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-12 text-center">
                  <Video className="w-12 h-12 mx-auto mb-4 text-slate-400 dark:text-slate-500" />
                  <p className="text-slate-600 dark:text-slate-300">
                    Converted GIF will appear here
                  </p>
                  {isConverting && (
                    <div className="mt-4">
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Tips for Best Results
                  </h4>
                  <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Keep clips under 10 seconds for faster processing</li>
                    <li>• Lower frame rate (5-10 FPS) reduces file size</li>
                    <li>• Use quality 60-80% for a good balance</li>
                    <li>• MP4 format works best for conversion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {tool && (
          <>
            <ToolDetailsSection tool={tool} />
            <ToolFAQ tool={tool} />
            <RelatedTools currentTool={tool} />
            <ToolComments toolId={tool.id} />
          </>
        )}
      </div>
    </>
  );
}
