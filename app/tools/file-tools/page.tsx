"use client";

import {
  FileText,
  FileDown,
  FileUp,
  FileLock2,
  FileX2,
  FileSearch,
  Scissors,
  Merge,
  RotateCw,
  Image,
  FileCode,
  Archive,
  Type,
  FileSpreadsheet,
  Stamp,
  Hash,
  ScanText,
  PenLine,
  EyeOff,
  Bookmark,
  Camera,
  Presentation,
  Video,
  FileJson,
  BookOpen,
  Info,
  QrCode,
  Barcode,
  Binary,
} from "lucide-react";
import {
  ComingSoonCategoryPage,
  type PlannedTool,
} from "@/components/ComingSoonCategoryPage";

const plannedTools: PlannedTool[] = [
  { icon: FileDown, name: "PDF to Word", description: "Convert any PDF to an editable .docx file while preserving layout, fonts, and formatting." },
  { icon: FileDown, name: "PDF to Excel", description: "Extract tables from PDFs into fully editable Excel or CSV spreadsheets." },
  { icon: FileDown, name: "PDF to PowerPoint", description: "Convert PDF slides into editable .pptx files, one slide per page." },
  { icon: FileDown, name: "PDF to JPG", description: "Convert every page of a PDF to high-resolution JPG images in seconds." },
  { icon: FileUp, name: "Word to PDF", description: "Convert .doc or .docx files to PDF without losing any formatting." },
  { icon: FileUp, name: "Excel to PDF", description: "Convert Excel spreadsheets to print-ready PDFs with full layout control." },
  { icon: FileUp, name: "JPG to PDF", description: "Combine one or more JPG images into a single PDF file, with custom page size." },
  { icon: FileUp, name: "PNG to PDF", description: "Convert PNG images to PDF, individually or merged into one document." },
  { icon: Merge, name: "Merge PDF", description: "Combine multiple PDF files into one document, in any order you choose." },
  { icon: Scissors, name: "Split PDF", description: "Split a PDF by page range, every N pages, or extract individual pages." },
  { icon: FileText, name: "Compress PDF", description: "Reduce PDF file size by up to 90% while keeping it readable and print-ready." },
  { icon: FileLock2, name: "Protect PDF", description: "Add password protection and permission restrictions to any PDF." },
  { icon: FileLock2, name: "Unlock PDF", description: "Remove password protection from a PDF you own." },
  { icon: RotateCw, name: "Rotate PDF", description: "Rotate pages in a PDF — individually or all at once — and save." },
  { icon: FileSearch, name: "PDF Editor", description: "Add text, annotations, shapes, and highlights to any PDF in your browser." },
  { icon: FileX2, name: "Delete PDF Pages", description: "Remove one or more pages from a PDF and download the result instantly." },
  { icon: Image, name: "Image Converter", description: "Convert between JPG, PNG, WebP, GIF, BMP, TIFF, and AVIF in your browser." },
  { icon: Image, name: "Image Compressor", description: "Reduce image file size without visible quality loss — drag, drop, download." },
  { icon: Image, name: "Image Resizer", description: "Resize images to exact pixel dimensions or by percentage, preserving aspect ratio." },
  { icon: Image, name: "Image Cropper", description: "Crop images to any size, ratio, or custom selection — no upload needed." },
  { icon: FileCode, name: "HTML to PDF", description: "Convert any HTML file or webpage URL to a clean, printable PDF." },
  { icon: FileSpreadsheet, name: "CSV to Excel", description: "Convert CSV files to properly formatted .xlsx Excel workbooks instantly." },
  { icon: FileSpreadsheet, name: "Excel to CSV", description: "Export any Excel sheet to a clean CSV file for use in any tool or database." },
  { icon: Archive, name: "ZIP Extractor", description: "Extract ZIP, RAR, 7z, and TAR archives entirely in your browser — no upload." },
  { icon: Type, name: "Text to PDF", description: "Convert plain text or Markdown files to clean, formatted PDF documents." },
  { icon: FileCode, name: "PDF to HTML", description: "Convert any PDF to clean, web-ready HTML while preserving structure and text." },
  { icon: Stamp, name: "PDF Watermark", description: "Add a custom text or image watermark to every page of a PDF, with opacity and position control." },
  { icon: Hash, name: "PDF Page Numbers", description: "Add or remove page numbers from any PDF with custom font, position, and starting number." },
  { icon: ScanText, name: "PDF to Text (OCR)", description: "Extract text from scanned PDFs and images using optical character recognition." },
  { icon: PenLine, name: "Sign PDF", description: "Draw, type, or upload a signature and place it anywhere on a PDF page." },
  { icon: EyeOff, name: "PDF Redact", description: "Permanently black out sensitive text, names, or regions from any PDF." },
  { icon: Bookmark, name: "PDF Bookmark Editor", description: "Add, rename, reorder, or remove bookmarks and outline entries in any PDF." },
  { icon: Camera, name: "Screenshot to PDF", description: "Paste a screenshot or image and export it as a properly sized PDF instantly." },
  { icon: Presentation, name: "PowerPoint to PDF", description: "Convert .pptx presentation files to PDF, one slide per page, with fonts intact." },
  { icon: Video, name: "PowerPoint to Video", description: "Export PowerPoint slides as an MP4 video with custom slide duration and transitions." },
  { icon: Type, name: "Markdown to PDF", description: "Render any .md Markdown file to a clean, print-ready PDF with syntax highlighting." },
  { icon: FileJson, name: "JSON to CSV", description: "Convert a JSON array to a flat CSV spreadsheet, with custom delimiter and header options." },
  { icon: FileJson, name: "CSV to JSON", description: "Convert a CSV file to a structured JSON array, with auto-detected types and nested keys." },
  { icon: BookOpen, name: "EPUB to PDF", description: "Convert EPUB ebook files to PDF for printing or reading on any device." },
  { icon: Info, name: "File Metadata Viewer", description: "Inspect EXIF data, PDF metadata, creation dates, and file properties — no upload." },
  { icon: QrCode, name: "QR Code Generator", description: "Generate QR codes from any URL, text, or contact info. Download as PNG or SVG." },
  { icon: Barcode, name: "Barcode Generator", description: "Generate Code128, EAN-13, EAN-8, and QR barcodes for products, labels, and assets." },
  { icon: FileSearch, name: "File Hasher", description: "Generate MD5, SHA-1, and SHA-256 checksums for any file to verify integrity." },
  { icon: Binary, name: "Base64 File Encoder", description: "Encode any file to Base64 string or decode a Base64 string back to a downloadable file." },
];

export default function FileToolsPage() {
  return (
    <ComingSoonCategoryPage
      slug="file-tools"
      shortName="File Tools"
      longName="File & PDF Tools"
      launchWindow="2026"
      Icon={FileText}
      headline={{ first: "File tools,", second: "no software needed." }}
      subheadline="Convert, compress, merge, split, protect, and edit PDFs and images — all in your browser. Nothing is uploaded to a server. Your files stay private."
      plannedToolsHeading="44 tools on the way."
      plannedToolsBlurb="Every common file operation covered — PDF conversions, image tools, archive extraction, and more. All client-side, all free."
      plannedTools={plannedTools}
      suggestHeading="Need a specific file tool?"
      suggestBlurb="If you find yourself installing desktop software just to do one file conversion, tell us. We'll build the browser version."
    />
  );
}
