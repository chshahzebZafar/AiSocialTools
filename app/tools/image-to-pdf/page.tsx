"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, Upload, X, Download, Trash2, FileImage } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

export default function ImageToPdfPage() {
  const tool = getToolById("image-to-pdf");
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith("image/"));

    const newImages: ImageFile[] = imageFiles.map(file => ({
      id: Date.now() + Math.random().toString(),
      file,
      preview: URL.createObjectURL(file)
    }));

    setImages(prev => [...prev, ...newImages]);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  const convertToPdf = async () => {
    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    setIsConverting(true);

    try {
      const jsPDF = (await import("jspdf")).default;
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const img = new Image();
        img.crossOrigin = "anonymous";
        
        await new Promise<void>((resolve, reject) => {
          img.onload = () => {
            try {
              const imgWidth = img.width;
              const imgHeight = img.height;
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = pdf.internal.pageSize.getHeight();
              
              // Calculate dimensions to fit page while maintaining aspect ratio
              const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
              const width = imgWidth * ratio;
              const height = imgHeight * ratio;
              
              // Center image on page
              const x = (pdfWidth - width) / 2;
              const y = (pdfHeight - height) / 2;
              
              if (i > 0) {
                pdf.addPage();
              }
              
              pdf.addImage(img.src, "JPEG", x, y, width, height);
              resolve();
            } catch (error) {
              reject(error);
            }
          };
          
          img.onerror = () => reject(new Error("Failed to load image"));
          img.src = image.preview;
        });
      }

      pdf.save(`images-to-pdf-${Date.now()}.pdf`);
      setIsConverting(false);
    } catch (error) {
      console.error("Error converting to PDF:", error);
      alert("Failed to convert images to PDF. Please try again.");
      setIsConverting(false);
    }
  };

  const clearAll = () => {
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]);
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Image to PDF Converter - Convert Images to PDF Free
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mt-2">
                Convert JPG, PNG, GIF images to PDF format. Merge multiple images into one PDF document. 100% free, no signup required.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            {tool && <FavoriteButton toolId={tool.id} />}
          <ShareButtons
              title="Image to PDF Converter"
              text="Convert your images to PDF format for free!"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 mb-6">
          <div className="mb-6">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              multiple
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Upload className="w-12 h-12 text-slate-400 mb-4" />
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Click to upload images or drag and drop
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                PNG, JPG, GIF up to 10MB each
              </p>
            </label>
          </div>

          {images.length > 0 && (
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {images.length} {images.length === 1 ? "image" : "images"} selected
                </p>
                <button
                  onClick={clearAll}
                  className="text-sm text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear all
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                      <img
                        src={image.preview}
                        alt={image.file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 truncate">
                      {image.file.name}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={convertToPdf}
                disabled={isConverting}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isConverting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Convert to PDF
                  </>
                )}
              </button>
            </>
          )}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 How to use:</h3>
          <ol className="text-sm text-blue-800 dark:text-blue-300 space-y-1 list-decimal list-inside">
            <li>Click the upload area or drag and drop your images</li>
            <li>Add multiple images to merge them into one PDF</li>
            <li>Remove any images you don't want by clicking the X button</li>
            <li>Click "Convert to PDF" to download your PDF file</li>
          </ol>
        </div>

        {tool && <ToolComments toolId={tool.id} />}
        {tool && <ToolFAQ tool={tool} />}
        {tool && <RelatedTools currentTool={tool} />}
        {tool && <ToolDetailsSection tool={tool} />}
      </div>
    </>
  );
}

