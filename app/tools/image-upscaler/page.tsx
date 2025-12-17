"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Maximize2, Upload, Download, RefreshCw, AlertCircle, Sparkles, ZoomIn, ZoomOut, Settings, History, X, CheckCircle } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

interface HistoryItem {
  id: string;
  original: string;
  upscaled: string;
  timestamp: number;
  scale: number;
  name: string;
}

export default function ImageUpscalerPage() {
  const tool = getToolById("image-upscaler");
  const [image, setImage] = useState<string | null>(null);
  const [upscaledImage, setUpscaledImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState<2 | 4 | 8>(2);
  const [noiseReduction, setNoiseReduction] = useState(true);
  const [sharpness, setSharpness] = useState(true);
  const [faceEnhancement, setFaceEnhancement] = useState(false);
  const [comparisonPosition, setComparisonPosition] = useState(50);
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [zoom, setZoom] = useState(1);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const upscaledImageRef = useRef<HTMLImageElement>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('imageUpscalerHistory');
      if (saved) {
        const parsed = JSON.parse(saved);
        setHistory(parsed.slice(0, 20)); // Keep only last 20 items
      }
    } catch (e) {
      console.error('Failed to load history:', e);
    }
  }, []);

  // Save to history when image is upscaled
  useEffect(() => {
    if (upscaledImage && image) {
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        original: image,
        upscaled: upscaledImage,
        timestamp: Date.now(),
        scale,
        name: `${scale}x Upscaled - ${new Date().toLocaleString()}`
      };
      
      setHistory(prev => {
        const updated = [newItem, ...prev].slice(0, 20);
        try {
          localStorage.setItem('imageUpscalerHistory', JSON.stringify(updated));
        } catch (e) {
          console.error('Failed to save history:', e);
        }
        return updated;
      });
    }
  }, [upscaledImage, image, scale]);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB");
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setUpscaledImage(null);
      setProgress(0);
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const upscaleImage = useCallback(async () => {
    if (!image) {
      setError("Please upload an image first");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setProgress(0);
    setUpscaledImage(null);

    try {
      // Check if Replicate API key is available
      const replicateApiKey = process.env.NEXT_PUBLIC_REPLICATE_API_KEY;
      
      if (replicateApiKey) {
        await upscaleWithReplicate(image);
      } else {
        // Fallback to client-side upscaling
        await upscaleClientSide(image);
      }
    } catch (err: any) {
      console.error("Error upscaling image:", err);
      setError(err.message || "Failed to upscale image. Please try again.");
      // Try client-side fallback
      try {
        await upscaleClientSide(image);
      } catch (fallbackErr: any) {
        setError(fallbackErr.message || "Failed to upscale image.");
      }
    } finally {
      setIsProcessing(false);
    }
  }, [image, scale, noiseReduction, sharpness, faceEnhancement]);

  const upscaleWithReplicate = useCallback(async (imageSrc: string) => {
    setProgress(10);

    // Convert base64 to blob
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    
    setProgress(20);

    // Convert blob to File
    const file = new File([blob], "image.jpg", { type: blob.type });
    
    // Create FormData
    const formData = new FormData();
    formData.append("image", file);
    formData.append("scale", scale.toString());
    formData.append("noise_reduction", noiseReduction.toString());
    formData.append("sharpness", sharpness.toString());
    formData.append("face_enhancement", faceEnhancement.toString());

    setProgress(30);

    // Call Next.js API route (we'll create this)
    const apiResponse = await fetch("/api/upscale-image", {
      method: "POST",
      body: formData,
    });

    setProgress(60);

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to upscale image");
    }

    setProgress(80);

    const resultBlob = await apiResponse.blob();
    const resultUrl = URL.createObjectURL(resultBlob);
    setUpscaledImage(resultUrl);
    setProgress(100);
  }, [scale, noiseReduction, sharpness, faceEnhancement]);

  const upscaleClientSide = useCallback(async (imageSrc: string) => {
    setProgress(10);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    setProgress(30);

    const canvas = document.createElement("canvas");
    const newWidth = img.width * scale;
    const newHeight = img.height * scale;
    canvas.width = newWidth;
    canvas.height = newHeight;
    
    const ctx = canvas.getContext("2d", { 
      willReadFrequently: false,
      imageSmoothingEnabled: true,
      imageSmoothingQuality: "high"
    });
    
    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }

    setProgress(50);

    // Draw and upscale
    ctx.drawImage(img, 0, 0, newWidth, newHeight);

    setProgress(70);

    // Apply noise reduction if enabled
    if (noiseReduction) {
      applyNoiseReduction(ctx, canvas.width, canvas.height);
    }

    setProgress(80);

    // Apply sharpness if enabled
    if (sharpness) {
      applySharpness(ctx, canvas.width, canvas.height);
    }

    setProgress(90);

    const resultUrl = canvas.toDataURL("image/png", 0.95);
    setUpscaledImage(resultUrl);
    setProgress(100);
  }, [scale, noiseReduction, sharpness]);

  const applyNoiseReduction = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Simple box blur for noise reduction
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        
        let r = 0, g = 0, b = 0, count = 0;
        
        // Sample 3x3 neighborhood
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nIdx = ((y + dy) * width + (x + dx)) * 4;
            r += data[nIdx];
            g += data[nIdx + 1];
            b += data[nIdx + 2];
            count++;
          }
        }
        
        // Apply weighted average (center pixel has more weight)
        const centerWeight = 0.5;
        const neighborWeight = (1 - centerWeight) / (count - 1);
        
        data[idx] = Math.round(data[idx] * centerWeight + (r / count) * neighborWeight);
        data[idx + 1] = Math.round(data[idx + 1] * centerWeight + (g / count) * neighborWeight);
        data[idx + 2] = Math.round(data[idx + 2] * centerWeight + (b / count) * neighborWeight);
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, []);

  const applySharpness = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const sharpnessKernel = [
      0, -1, 0,
      -1, 5, -1,
      0, -1, 0
    ];

    const tempData = new Uint8ClampedArray(data);

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        
        let r = 0, g = 0, b = 0;
        let kernelIdx = 0;
        
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nIdx = ((y + dy) * width + (x + dx)) * 4;
            const kernelValue = sharpnessKernel[kernelIdx++];
            r += tempData[nIdx] * kernelValue;
            g += tempData[nIdx + 1] * kernelValue;
            b += tempData[nIdx + 2] * kernelValue;
          }
        }
        
        data[idx] = Math.max(0, Math.min(255, r));
        data[idx + 1] = Math.max(0, Math.min(255, g));
        data[idx + 2] = Math.max(0, Math.min(255, b));
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, []);

  const handleDownload = useCallback(() => {
    if (!upscaledImage) return;

    const link = document.createElement("a");
    link.href = upscaledImage;
    link.download = `upscaled-${scale}x-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [upscaledImage, scale]);

  const handleReset = useCallback(() => {
    setImage(null);
    setUpscaledImage(null);
    setError(null);
    setProgress(0);
    setComparisonPosition(50);
    setZoom(1);
  }, []);

  const loadFromHistory = useCallback((item: HistoryItem) => {
    setImage(item.original);
    setUpscaledImage(item.upscaled);
    setScale(item.scale);
    setShowHistory(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!comparisonRef.current) return;
    const rect = comparisonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setComparisonPosition(Math.max(0, Math.min(100, percentage)));
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!comparisonRef.current) return;
    const rect = comparisonRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setComparisonPosition(Math.max(0, Math.min(100, percentage)));
  }, []);

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Maximize2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                AI Image Upscaler - Enhance Image Quality
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Upscale images up to 8x using AI technology. Enhance resolution, reduce noise, and improve sharpness.
              </p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            {tool && <FavoriteButton toolId={tool.id} />}
            <ShareButtons
              title="AI Image Upscaler - Free Online Tool"
              text="Upscale and enhance your images with AI technology!"
            />
          </div>
        </div>

        {/* API Status Banner */}
        {!process.env.NEXT_PUBLIC_REPLICATE_API_KEY ? (
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 mb-6 border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Client-Side Mode:</strong> Using browser-based upscaling. For best results, configure Replicate API key for AI-powered upscaling.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6 border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-green-800 dark:text-green-200">
                  <strong>AI-Powered:</strong> Replicate API is configured. Enjoy high-quality AI upscaling!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Tool Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
          {/* Upload Section */}
          {!image ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <Upload className="w-16 h-16 text-slate-400 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Upload Image to Upscale
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Support JPG, PNG, WebP. Max size: 10MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors"
              >
                <Upload className="w-5 h-5" />
                Choose Image
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Upscale Factor
                  </label>
                  <div className="flex gap-2">
                    {([2, 4, 8] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setScale(s)}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                          scale === s
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={noiseReduction}
                      onChange={(e) => setNoiseReduction(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Noise Reduction</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sharpness}
                      onChange={(e) => setSharpness(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Sharpness Enhancement</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={faceEnhancement}
                      onChange={(e) => setFaceEnhancement(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Face Enhancement (AI only)</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={upscaleImage}
                  disabled={isProcessing}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-lg transition-colors"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Upscale Image
                    </>
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                  Reset
                </button>
                {upscaledImage && (
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                )}
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
                >
                  <History className="w-5 h-5" />
                  History
                </button>
              </div>

              {/* Progress Bar */}
              {isProcessing && (
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}

              {/* Image Comparison */}
              {(image || upscaledImage) && (
                <div className="relative">
                  <div
                    ref={comparisonRef}
                    className="relative w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 cursor-col-resize"
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                    style={{ minHeight: "400px" }}
                  >
                    {/* Original Image (Background) */}
                    {image && (
                      <img
                        ref={imageRef}
                        src={image}
                        alt="Original"
                        className="w-full h-auto"
                        style={{ display: "block" }}
                      />
                    )}

                    {/* Upscaled Image (Foreground with clip) */}
                    {upscaledImage && (
                      <div
                        className="absolute top-0 left-0 w-full h-full overflow-hidden"
                        style={{
                          clipPath: `inset(0 ${100 - comparisonPosition}% 0 0)`,
                        }}
                      >
                        <img
                          ref={upscaledImageRef}
                          src={upscaledImage}
                          alt="Upscaled"
                          className="w-full h-auto"
                          style={{ display: "block" }}
                        />
                      </div>
                    )}

                    {/* Slider Handle */}
                    {upscaledImage && (
                      <div
                        className="absolute top-0 bottom-0 w-1 bg-blue-600 cursor-col-resize"
                        style={{ left: `${comparisonPosition}%` }}
                      >
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                          <div className="flex gap-1">
                            <div className="w-1 h-3 bg-white rounded" />
                            <div className="w-1 h-3 bg-white rounded" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Labels */}
                    {upscaledImage && (
                      <>
                        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm font-medium">
                          Original
                        </div>
                        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm font-medium">
                          {scale}x Upscaled
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* History Panel */}
              {showHistory && (
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Processing History</h3>
                    <button
                      onClick={() => setShowHistory(false)}
                      className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  {history.length === 0 ? (
                    <p className="text-slate-500 dark:text-slate-400 text-center py-8">No history yet</p>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {history.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => loadFromHistory(item)}
                          className="relative cursor-pointer group rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors"
                        >
                          <img
                            src={item.original}
                            alt={item.name}
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-sm font-medium">Load</span>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2">
                            {item.scale}x • {new Date(item.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Required Components */}
        {tool && <ToolComments toolId={tool.id} />}
        {tool && <ToolFAQ tool={tool} />}
        {tool && <RelatedTools currentTool={tool} />}
        {tool && <ToolDetailsSection tool={tool} />}
      </div>
    </>
  );
}

