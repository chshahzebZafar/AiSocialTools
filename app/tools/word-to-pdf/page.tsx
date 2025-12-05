"use client";

import { useState } from "react";
import { FileText, Download, Type, AlignLeft, FileType } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

export default function WordToPdfPage() {
  const tool = getToolById("word-to-pdf");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("Document");
  const [fontSize, setFontSize] = useState(12);
  const [isConverting, setIsConverting] = useState(false);

  const convertToPdf = async () => {
    if (!text.trim()) {
      alert("Please enter some text to convert");
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

      // Set font
      pdf.setFontSize(fontSize);
      
      // Add title
      if (title.trim()) {
        pdf.setFontSize(16);
        pdf.text(title, 20, 20);
        pdf.setFontSize(fontSize);
      }

      // Split text into lines that fit the page width
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - (margin * 2);
      const lineHeight = fontSize * 0.35; // Convert font size to mm
      
      let y = title.trim() ? 30 : margin;
      const lines = text.split("\n");

      for (const line of lines) {
        if (y + lineHeight > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }

        // Handle long lines by splitting them
        const splitLines = pdf.splitTextToSize(line, maxWidth);
        
        for (const splitLine of splitLines) {
          if (y + lineHeight > pageHeight - margin) {
            pdf.addPage();
            y = margin;
          }
          pdf.text(splitLine, margin, y);
          y += lineHeight;
        }
      }

      pdf.save(`${title || "document"}-${Date.now()}.pdf`);
      setIsConverting(false);
    } catch (error) {
      console.error("Error converting to PDF:", error);
      alert("Failed to convert text to PDF. Please try again.");
      setIsConverting(false);
    }
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
              <FileType className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Word/Text to PDF Converter - Create PDF from Text
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mt-2">
                Convert text documents to PDF format. Create professional PDFs from your text content. Free, no signup required.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            {tool && <FavoriteButton toolId={tool.id} />}
          <ShareButtons
              title="Word/Text to PDF Converter"
              text="Convert your text documents to PDF format for free!"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Document Title (Optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Text Content
                </label>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-600 dark:text-slate-400">Font Size:</label>
                  <select
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="text-xs px-2 py-1 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value={10}>10</option>
                    <option value={12}>12</option>
                    <option value={14}>14</option>
                    <option value={16}>16</option>
                    <option value={18}>18</option>
                  </select>
                </div>
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter or paste your text here... You can also paste content from Word documents, and it will be converted to PDF format."
                rows={15}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 resize-none font-mono text-sm"
              />
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {text.length} characters, {text.split("\n").length} lines
              </p>
            </div>

            <button
              onClick={convertToPdf}
              disabled={isConverting || !text.trim()}
              className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
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
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-green-900 dark:text-green-200 mb-2">💡 How to use:</h3>
          <ol className="text-sm text-green-800 dark:text-green-300 space-y-1 list-decimal list-inside">
            <li>Enter a title for your document (optional)</li>
            <li>Paste or type your text content in the text area</li>
            <li>Adjust the font size if needed</li>
            <li>Click "Convert to PDF" to download your PDF file</li>
            <li>You can paste content from Word documents - formatting will be preserved as plain text</li>
          </ol>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Note:</strong> This tool converts text to PDF. For Word documents (.docx files), you can copy the text content from Word and paste it here. Complex formatting, images, and tables from Word documents will be converted to plain text.
          </p>
        </div>

        {tool && <ToolComments toolId={tool.id} />}
        {tool && <ToolFAQ tool={tool} />}
        {tool && <RelatedTools currentTool={tool} />}
        {tool && <ToolDetailsSection tool={tool} />}
      </div>
    </>
  );
}

