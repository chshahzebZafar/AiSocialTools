"use client";

import { useState } from "react";
import { FileImage, Upload, AlertCircle } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

export default function PdfToImagePage() {
  const tool = getToolById("pdf-to-image");

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <FileImage className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                PDF to Image Converter - Extract Images from PDF
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mt-2">
                Extract images from PDF files or convert PDF pages to images (PNG, JPG). Free PDF to image converter.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            {tool && <FavoriteButton toolId={tool.id} />}
          <ShareButtons
              title="PDF to Image Converter"
              text="Extract images from PDF files for free!"
            />
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6 mb-6 border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">
                Coming Soon
              </h3>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                This tool is currently under development. PDF to image conversion requires additional libraries (pdf.js) 
                and will be available soon. In the meantime, you can use our{" "}
                <a href="/tools/image-to-pdf" className="underline font-medium">Image to PDF converter</a> for the reverse operation.
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

