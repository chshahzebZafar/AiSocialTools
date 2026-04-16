"use client";

import { useState, useRef } from "react";
import { File, Upload, Download, X, Scissors, CheckCircle, AlertCircle, Trash2, Eye, Maximize2, Minimize2 } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

type SplitMode = "range" | "pages" | "every" | "all";

interface PageRange {
  id: string;
  start: number;
  end: number;
  name?: string;
}

export default function PdfSplitterPage() {
  const tool = getToolById("pdf-splitter");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [splitMode, setSplitMode] = useState<SplitMode>("range");
  const [pageRanges, setPageRanges] = useState<PageRange[]>([
    { id: "1", start: 1, end: 1 }
  ]);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [splitEvery, setSplitEvery] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");
  const [processedFiles, setProcessedFiles] = useState<{ name: string; blob: Blob }[]>([]);
  const [pagePreviews, setPagePreviews] = useState<string[]>([]);
  const [isLoadingPreviews, setIsLoadingPreviews] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a valid PDF file");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError("PDF file size must be less than 50MB");
      return;
    }

    setError("");
    setPdfFile(file);
    setProcessedFiles([]);
    setSelectedPages([]);
    setPageRanges([{ id: "1", start: 1, end: 1 }]);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      setPdfBytes(bytes);

      // Load PDF to get page count
      const { PDFDocument } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.load(bytes);
      const pages = pdfDoc.getPageCount();
      setPageCount(pages);

      // Reset ranges with max pages
      setPageRanges([{ id: "1", start: 1, end: Math.min(pages, 1) }]);

      // Generate page previews
      await generatePagePreviews(bytes, pages);
    } catch (err) {
      console.error("Error loading PDF:", err);
      setError("Failed to load PDF file. Please make sure it's a valid PDF.");
      setPdfFile(null);
      setPdfBytes(null);
      setPagePreviews([]);
    }
  };

  const generatePagePreviews = async (pdfBytes: Uint8Array, pageCount: number) => {
    setIsLoadingPreviews(true);
    setPagePreviews([]);

    try {
      const pdfjsLib = await import("pdfjs-dist");
      
      // Disable worker to avoid CDN loading issues
      // PDF.js will run in the main thread (slightly slower but much more reliable)
      if (typeof window !== "undefined") {
        pdfjsLib.GlobalWorkerOptions.workerSrc = "";
      }

      const loadingTask = pdfjsLib.getDocument({ 
        data: pdfBytes,
        useSystemFonts: true,
        verbosity: 0, // Suppress warnings
      });
      const pdf = await loadingTask.promise;

      const previews: string[] = [];
      const maxPreviewPages = Math.min(pageCount, 50); // Limit to first 50 pages for performance

      for (let pageNum = 1; pageNum <= maxPreviewPages; pageNum++) {
        try {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1.5 });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (!context) {
            console.warn(`Failed to get context for page ${pageNum}`);
            continue;
          }

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({
            canvasContext: context,
            viewport: viewport,
          } as any).promise;

          const imageData = canvas.toDataURL("image/png");
          previews.push(imageData);
        } catch (pageErr) {
          console.error(`Error rendering page ${pageNum}:`, pageErr);
          // Continue with other pages even if one fails
        }
      }

      if (previews.length > 0) {
        setPagePreviews(previews);
        setShowPreview(true);
        setError(""); // Clear any previous errors
      } else {
        setError("Failed to generate previews. The PDF might be corrupted or protected.");
      }
    } catch (err: any) {
      console.error("Error generating previews:", err);
      const errorMessage = err?.message || "Unknown error";
      
      // More helpful error messages
      if (errorMessage.includes("worker") || errorMessage.includes("Failed to fetch")) {
        setError("Failed to load PDF worker. Please check your internet connection and try again.");
      } else if (errorMessage.includes("password") || errorMessage.includes("encrypted")) {
        setError("This PDF is password protected. Please remove the password and try again.");
      } else {
        setError(`Failed to load PDF preview: ${errorMessage}`);
      }
    } finally {
      setIsLoadingPreviews(false);
    }
  };

  const addPageRange = () => {
    const newRange: PageRange = {
      id: Date.now().toString(),
      start: pageCount > 0 ? pageCount : 1,
      end: pageCount > 0 ? pageCount : 1,
    };
    setPageRanges([...pageRanges, newRange]);
  };

  const removePageRange = (id: string) => {
    setPageRanges(pageRanges.filter(range => range.id !== id));
  };

  const updatePageRange = (id: string, field: "start" | "end" | "name", value: number | string) => {
    setPageRanges(pageRanges.map(range => {
      if (range.id === id) {
        const updated = { ...range, [field]: value };
        // Ensure start <= end and both are within valid range
        if (field === "start" || field === "end") {
          const numValue = typeof value === "number" ? value : parseInt(value as string);
          if (field === "start") {
            updated.start = Math.max(1, Math.min(numValue, pageCount));
            updated.end = Math.max(updated.start, updated.end);
          } else {
            updated.end = Math.max(1, Math.min(numValue, pageCount));
            updated.start = Math.min(updated.start, updated.end);
          }
        }
        return updated;
      }
      return range;
    }));
  };

  const togglePageSelection = (page: number) => {
    setSelectedPages(prev => {
      if (prev.includes(page)) {
        return prev.filter(p => p !== page);
      } else {
        return [...prev, page].sort((a, b) => a - b);
      }
    });
  };

  const selectAllPages = () => {
    setSelectedPages(Array.from({ length: pageCount }, (_, i) => i + 1));
  };

  const clearSelection = () => {
    setSelectedPages([]);
  };

  const splitPdf = async () => {
    if (!pdfBytes || pageCount === 0) {
      setError("Please upload a PDF file first");
      return;
    }

    setIsProcessing(true);
    setError("");
    setProcessedFiles([]);

    try {
      const { PDFDocument } = await import("pdf-lib");
      const sourcePdf = await PDFDocument.load(pdfBytes);
      const files: { name: string; blob: Blob }[] = [];

      if (splitMode === "range") {
        // Split by ranges
        for (const range of pageRanges) {
          if (range.start < 1 || range.end > pageCount || range.start > range.end) {
            continue;
          }

          const newPdf = await PDFDocument.create();
          const pages = await newPdf.copyPages(sourcePdf, Array.from({ length: range.end - range.start + 1 }, (_, i) => range.start - 1 + i));
          pages.forEach(page => newPdf.addPage(page));

          const pdfBytes = await newPdf.save();
          const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
          const name = range.name || `pages-${range.start}-${range.end}.pdf`;
          files.push({ name, blob });
        }
      } else if (splitMode === "pages") {
        // Extract specific pages
        if (selectedPages.length === 0) {
          setError("Please select at least one page to extract");
          setIsProcessing(false);
          return;
        }

        const newPdf = await PDFDocument.create();
        const pages = await newPdf.copyPages(sourcePdf, selectedPages.map(p => p - 1));
        pages.forEach(page => newPdf.addPage(page));

        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
        files.push({ name: `pages-${selectedPages.join("-")}.pdf`, blob });
      } else if (splitMode === "every") {
        // Split every N pages
        for (let i = 0; i < pageCount; i += splitEvery) {
          const newPdf = await PDFDocument.create();
          const endPage = Math.min(i + splitEvery, pageCount);
          const pages = await newPdf.copyPages(sourcePdf, Array.from({ length: endPage - i }, (_, idx) => i + idx));
          pages.forEach(page => newPdf.addPage(page));

          const pdfBytes = await newPdf.save();
          const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
          files.push({ name: `pages-${i + 1}-${endPage}.pdf`, blob });
        }
      } else if (splitMode === "all") {
        // Split into individual pages
        for (let i = 0; i < pageCount; i++) {
          const newPdf = await PDFDocument.create();
          const [page] = await newPdf.copyPages(sourcePdf, [i]);
          newPdf.addPage(page);

          const pdfBytes = await newPdf.save();
          const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
          files.push({ name: `page-${i + 1}.pdf`, blob });
        }
      }

      setProcessedFiles(files);
    } catch (err) {
      console.error("Error splitting PDF:", err);
      setError("Failed to split PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = (blob: Blob, name: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    processedFiles.forEach(({ blob, name }) => {
      setTimeout(() => downloadFile(blob, name), 100);
    });
  };

  const reset = () => {
    setPdfFile(null);
    setPdfBytes(null);
    setPageCount(0);
    setProcessedFiles([]);
    setPagePreviews([]);
    setError("");
    setSelectedPages([]);
    setShowPreview(false);
    setPageRanges([{ id: "1", start: 1, end: 1 }]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                PDF Splitter - Split PDF Files into Multiple Documents
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mt-2">
                Split PDF files into multiple documents. Extract specific pages from PDF files. Free PDF splitter tool.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            {tool && <FavoriteButton toolId={tool.id} />}
            <ShareButtons
              title="PDF Splitter"
              text="Split your PDF files for free!"
            />
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Upload PDF File
            </label>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className="cursor-pointer flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    PDF files only (max 50MB)
                  </p>
                </div>
              </label>
            </div>
          </div>

          {pdfFile && (
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-red-600 dark:text-red-400" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {pdfFile.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {(pdfFile.size / 1024 / 1024).toFixed(2)} MB • {pageCount} page{pageCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <button
                onClick={reset}
                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                title="Remove file"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
            </div>
          )}
        </div>

        {/* PDF Preview Section */}
        {pdfFile && pageCount > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  PDF Preview
                </h2>
                {isLoadingPreviews && (
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                    Loading previews...
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                title={showPreview ? "Hide preview" : "Show preview"}
              >
                {showPreview ? (
                  <Minimize2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                ) : (
                  <Maximize2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                )}
              </button>
            </div>

            {showPreview && (
              <div>
                {pagePreviews.length > 0 ? (() => {
                  // Filter previews based on split mode and selection
                  let displayPreviews: { preview: string; pageNum: number }[] = [];
                  let previewInfo = "";
                  
                  if (splitMode === "pages" && selectedPages.length > 0) {
                    // Show only selected pages
                    displayPreviews = selectedPages
                      .filter(pageNum => pageNum <= pagePreviews.length)
                      .map(pageNum => ({
                        preview: pagePreviews[pageNum - 1],
                        pageNum: pageNum
                      }));
                    previewInfo = `Showing ${selectedPages.length} selected page${selectedPages.length !== 1 ? "s" : ""}`;
                  } else if (splitMode === "range" && pageRanges.length > 0) {
                    // Show pages from selected ranges
                    const rangePages = new Set<number>();
                    pageRanges.forEach(range => {
                      for (let i = range.start; i <= range.end; i++) {
                        if (i <= pagePreviews.length) {
                          rangePages.add(i);
                        }
                      }
                    });
                    displayPreviews = Array.from(rangePages)
                      .sort((a, b) => a - b)
                      .map(pageNum => ({
                        preview: pagePreviews[pageNum - 1],
                        pageNum: pageNum
                      }));
                    previewInfo = `Showing pages from ${pageRanges.length} range${pageRanges.length !== 1 ? "s" : ""} (${rangePages.size} page${rangePages.size !== 1 ? "s" : ""})`;
                  } else {
                    // Show all previews
                    displayPreviews = pagePreviews.map((preview, index) => ({
                      preview: preview,
                      pageNum: index + 1
                    }));
                    previewInfo = `Showing preview of ${pagePreviews.length} page${pagePreviews.length !== 1 ? "s" : ""}`;
                    if (pageCount > 50) {
                      previewInfo += ` (first 50 of ${pageCount} total pages)`;
                    }
                  }
                  
                  return (
                    <div className="space-y-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {previewInfo}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto p-2">
                        {displayPreviews.map((item) => {
                          const actualPageNum = item.pageNum;
                          const isSelected = splitMode === "pages" && selectedPages.includes(actualPageNum);
                          
                          return (
                            <div
                              key={actualPageNum}
                              onClick={() => {
                                if (splitMode === "pages") {
                                  togglePageSelection(actualPageNum);
                                }
                              }}
                              className={`relative group bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2 border-2 transition-colors ${
                                splitMode === "pages" 
                                  ? "cursor-pointer hover:border-red-500 dark:hover:border-red-400" 
                                  : "border-transparent"
                              } ${
                                isSelected 
                                  ? "border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20" 
                                  : "border-transparent"
                              }`}
                            >
                              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded z-10">
                                Page {actualPageNum}
                              </div>
                              <img
                                src={item.preview}
                                alt={`Page ${actualPageNum}`}
                                className="w-full h-auto rounded border border-slate-200 dark:border-slate-600 shadow-sm"
                                loading="lazy"
                              />
                              {isSelected && (
                                <div className="absolute inset-0 bg-red-500/20 rounded-lg border-2 border-red-500 flex items-center justify-center">
                                  <CheckCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                                </div>
                              )}
                              {splitMode === "pages" && !isSelected && (
                                <div className="absolute inset-0 bg-black/0 hover:bg-black/5 rounded-lg transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                  <div className="bg-red-600 text-white text-xs font-medium px-3 py-1 rounded">
                                    Click to select
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })() : !isLoadingPreviews ? (
                  <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                    <Eye className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Previews will appear here</p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}

        {/* Split Options */}
        {pdfFile && pageCount > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Split Options
            </h2>

            {/* Split Mode Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Split Mode
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setSplitMode("range")}
                  className={`p-3 rounded-lg border-2 transition-colors text-sm font-medium ${
                    splitMode === "range"
                      ? "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                      : "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  Page Ranges
                </button>
                <button
                  onClick={() => setSplitMode("pages")}
                  className={`p-3 rounded-lg border-2 transition-colors text-sm font-medium ${
                    splitMode === "pages"
                      ? "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                      : "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  Select Pages
                </button>
                <button
                  onClick={() => setSplitMode("every")}
                  className={`p-3 rounded-lg border-2 transition-colors text-sm font-medium ${
                    splitMode === "every"
                      ? "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                      : "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  Every N Pages
                </button>
                <button
                  onClick={() => setSplitMode("all")}
                  className={`p-3 rounded-lg border-2 transition-colors text-sm font-medium ${
                    splitMode === "all"
                      ? "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                      : "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  All Pages
                </button>
              </div>
            </div>

            {/* Page Range Mode */}
            {splitMode === "range" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Page Ranges
                  </label>
                  <button
                    onClick={addPageRange}
                    className="text-sm text-red-600 dark:text-red-400 hover:underline"
                  >
                    + Add Range
                  </button>
                </div>
                {pageRanges.map((range) => (
                  <div key={range.id} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <input
                      type="text"
                      placeholder="Name (optional)"
                      value={range.name || ""}
                      onChange={(e) => updatePageRange(range.id, "name", e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
                    />
                    <input
                      type="number"
                      min="1"
                      max={pageCount}
                      value={range.start}
                      onChange={(e) => updatePageRange(range.id, "start", parseInt(e.target.value) || 1)}
                      className="w-20 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
                    />
                    <span className="text-slate-500 dark:text-slate-400">to</span>
                    <input
                      type="number"
                      min="1"
                      max={pageCount}
                      value={range.end}
                      onChange={(e) => updatePageRange(range.id, "end", parseInt(e.target.value) || 1)}
                      className="w-20 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
                    />
                    {pageRanges.length > 1 && (
                      <button
                        onClick={() => removePageRange(range.id)}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Select Pages Mode */}
            {splitMode === "pages" && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Select Pages (1-{pageCount})
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={selectAllPages}
                      className="text-sm text-red-600 dark:text-red-400 hover:underline"
                    >
                      Select All
                    </button>
                    <button
                      onClick={clearSelection}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:underline"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg max-h-64 overflow-y-auto">
                  <div className="grid grid-cols-10 gap-2">
                    {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => togglePageSelection(page)}
                        className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedPages.includes(page)
                            ? "bg-red-500 text-white"
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/30"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                </div>
                {selectedPages.length > 0 && (
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                    Selected: {selectedPages.length} page{selectedPages.length !== 1 ? "s" : ""} ({selectedPages.join(", ")})
                  </p>
                )}
              </div>
            )}

            {/* Every N Pages Mode */}
            {splitMode === "every" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Split every N pages
                </label>
                <input
                  type="number"
                  min="1"
                  max={pageCount}
                  value={splitEvery}
                  onChange={(e) => setSplitEvery(Math.max(1, Math.min(parseInt(e.target.value) || 1, pageCount)))}
                  className="w-32 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  This will create {Math.ceil(pageCount / splitEvery)} PDF file(s)
                </p>
              </div>
            )}

            {/* All Pages Mode */}
            {splitMode === "all" && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  This will split the PDF into {pageCount} individual files, one for each page.
                </p>
              </div>
            )}

            {/* Split Button */}
            <div className="mt-6">
              <button
                onClick={splitPdf}
                disabled={isProcessing || (splitMode === "pages" && selectedPages.length === 0)}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Scissors className="w-5 h-5" />
                    Split PDF
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {processedFiles.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                Split Complete ({processedFiles.length} file{processedFiles.length !== 1 ? "s" : ""})
              </h2>
              {processedFiles.length > 1 && (
                <button
                  onClick={downloadAll}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2 text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download All
                </button>
              )}
            </div>
            <div className="space-y-3">
              {processedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <File className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {(file.blob.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => downloadFile(file.blob, file.name)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tool && <ToolComments toolId={tool.id} />}
        {tool && <ToolFAQ tool={tool} />}
        {tool && <RelatedTools currentTool={tool} />}
        {tool && <ToolDetailsSection tool={tool} />}
      </div>
    </>
  );
}
