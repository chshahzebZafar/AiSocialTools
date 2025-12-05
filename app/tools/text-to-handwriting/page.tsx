"use client";

import { useState, useRef, useEffect } from "react";
import { PenTool, Download, Upload, Image as ImageIcon, Type, Palette, Settings, FileImage, FileText, Bold, Italic, Underline, Sparkles, Layers, Frame, Droplet, Zap, Heading, AlignCenter } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

// Handwriting fonts from Google Fonts
const handwritingFonts = [
  { name: "Dancing Script", value: "Dancing Script", category: "Cursive" },
  { name: "Pacifico", value: "Pacifico", category: "Cursive" },
  { name: "Indie Flower", value: "Indie Flower", category: "Handwriting" },
  { name: "Shadows Into Light", value: "Shadows Into Light", category: "Handwriting" },
  { name: "Caveat", value: "Caveat", category: "Handwriting" },
  { name: "Kalam", value: "Kalam", category: "Handwriting" },
  { name: "Permanent Marker", value: "Permanent Marker", category: "Marker" },
  { name: "Satisfy", value: "Satisfy", category: "Cursive" },
  { name: "Amatic SC", value: "Amatic SC", category: "Handwriting" },
  { name: "Caveat Brush", value: "Caveat Brush", category: "Handwriting" },
  { name: "Gloria Hallelujah", value: "Gloria Hallelujah", category: "Handwriting" },
];

// Paper texture presets
const paperTextures = [
  { name: "None", value: null },
  { name: "Lined Paper", value: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0ibGluZXMiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIxMDAiIGhlaWdodD0iMjAiPjxsaW5lIHgxPSIwIiB5MT0iMTAiIHgyPSIxMDAiIHkyPSIxMCIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZmZmIi8+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjbGluZXMpIi8+PC9zdmc+" },
  { name: "Grid Paper", value: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZmZmIi8+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=" },
];

// Text templates
const textTemplates = [
  { name: "Custom", text: "" },
  { name: "Letter Template", text: "Dear [Name],\n\nI hope this letter finds you well.\n\n[Your message here]\n\nBest regards,\n[Your name]" },
  { name: "Note Template", text: "Note:\n\n[Your note here]\n\nDate: [Date]" },
  { name: "Poem Template", text: "Title\n\nLine 1\nLine 2\nLine 3\n\n- Author" },
];

export default function TextToHandwritingPage() {
  const tool = getToolById("text-to-handwriting");
  const [text, setText] = useState("Enter your text here to convert it into beautiful handwriting!");
  const [selectedFont, setSelectedFont] = useState(handwritingFonts[0].value);
  const [fontSize, setFontSize] = useState(24);
  const [textColor, setTextColor] = useState("#000000");
  const [lineHeight, setLineHeight] = useState(1.6);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [wordSpacing, setWordSpacing] = useState(0);
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right" | "justify">("left");
  
  // Text effects
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [textOpacity, setTextOpacity] = useState(1);
  const [textRotation, setTextRotation] = useState(0);
  const [textSkew, setTextSkew] = useState(0);
  
  // Text shadow
  const [shadowEnabled, setShadowEnabled] = useState(false);
  const [shadowX, setShadowX] = useState(2);
  const [shadowY, setShadowY] = useState(2);
  const [shadowBlur, setShadowBlur] = useState(4);
  const [shadowColor, setShadowColor] = useState("#000000");
  const [shadowOpacity, setShadowOpacity] = useState(0.3);
  
  // Margins
  const [paddingTop, setPaddingTop] = useState(40);
  const [paddingRight, setPaddingRight] = useState(40);
  const [paddingBottom, setPaddingBottom] = useState(40);
  const [paddingLeft, setPaddingLeft] = useState(40);
  const [useCustomPadding, setUseCustomPadding] = useState(false);
  
  // Border/Frame
  const [borderEnabled, setBorderEnabled] = useState(false);
  const [borderWidth, setBorderWidth] = useState(2);
  const [borderColor, setBorderColor] = useState("#000000");
  const [borderRadius, setBorderRadius] = useState(0);
  
  // Watermark
  const [watermarkEnabled, setWatermarkEnabled] = useState(false);
  const [watermarkType, setWatermarkType] = useState<"text" | "image">("text");
  const [watermarkText, setWatermarkText] = useState("");
  const [watermarkImage, setWatermarkImage] = useState<string | null>(null);
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.1);
  const [watermarkRotation, setWatermarkRotation] = useState(-45);
  const [watermarkSize, setWatermarkSize] = useState(200);
  const [watermarkPosition, setWatermarkPosition] = useState<"center" | "top-left" | "top-right" | "bottom-left" | "bottom-right">("center");
  
  // Header & Footer
  const [headerEnabled, setHeaderEnabled] = useState(false);
  const [headerText, setHeaderText] = useState("");
  const [headerHeight, setHeaderHeight] = useState(60);
  const [headerFontSize, setHeaderFontSize] = useState(18);
  const [headerColor, setHeaderColor] = useState("#000000");
  const [headerAlign, setHeaderAlign] = useState<"left" | "center" | "right">("center");
  const [headerBackground, setHeaderBackground] = useState("#FFFFFF");
  
  const [footerEnabled, setFooterEnabled] = useState(false);
  const [footerText, setFooterText] = useState("");
  const [footerHeight, setFooterHeight] = useState(60);
  const [footerFontSize, setFooterFontSize] = useState(18);
  const [footerColor, setFooterColor] = useState("#000000");
  const [footerAlign, setFooterAlign] = useState<"left" | "center" | "right">("center");
  const [footerBackground, setFooterBackground] = useState("#FFFFFF");
  
  // Background
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);
  const [paperTexture, setPaperTexture] = useState<string | null>(null);
  
  // Page settings
  const [pageWidth, setPageWidth] = useState(800);
  const [pageHeight, setPageHeight] = useState(1000);
  const [downloadFormat, setDownloadFormat] = useState<"png" | "jpg" | "pdf" | "svg">("png");
  const [downloadQuality, setDownloadQuality] = useState(0.95);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const watermarkImageInputRef = useRef<HTMLInputElement>(null);

  // Load Google Fonts asynchronously (non-blocking)
  useEffect(() => {
    // Preconnect to Google Fonts for faster loading
    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://fonts.googleapis.com";
    document.head.appendChild(preconnect);
    
    const preconnect2 = document.createElement("link");
    preconnect2.rel = "preconnect";
    preconnect2.href = "https://fonts.gstatic.com";
    preconnect2.crossOrigin = "anonymous";
    document.head.appendChild(preconnect2);
    
    // Load fonts asynchronously with display=swap
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?${handwritingFonts.map(f => `family=${f.value.replace(/\s+/g, '+')}`).join('&')}&display=swap`;
    link.rel = "stylesheet";
    link.media = "print"; // Load asynchronously
    link.onload = () => {
      link.media = "all";
    };
    document.head.appendChild(link);
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.head.contains(preconnect)) {
        document.head.removeChild(preconnect);
      }
      if (document.head.contains(preconnect2)) {
        document.head.removeChild(preconnect2);
      }
    };
  }, []);

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBackgroundImage = () => {
    setBackgroundImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleWatermarkImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setWatermarkImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeWatermarkImage = () => {
    setWatermarkImage(null);
    if (watermarkImageInputRef.current) {
      watermarkImageInputRef.current.value = "";
    }
  };

  const getWatermarkPosition = () => {
    switch (watermarkPosition) {
      case "top-left":
        return { top: "10%", left: "10%", transform: "translate(-50%, -50%)" };
      case "top-right":
        return { top: "10%", right: "10%", transform: "translate(50%, -50%)" };
      case "bottom-left":
        return { bottom: "10%", left: "10%", transform: "translate(-50%, 50%)" };
      case "bottom-right":
        return { bottom: "10%", right: "10%", transform: "translate(50%, 50%)" };
      default:
        return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    }
  };

  const generateImage = async () => {
    if (!previewRef.current) return;

    try {
      const html2canvasModule = await import("html2canvas");
      const canvas = await html2canvasModule.default(previewRef.current, {
        backgroundColor: backgroundColor,
        scale: 2,
        useCORS: true,
        logging: false,
      });

      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          canvasRef.current.width = canvas.width;
          canvasRef.current.height = canvas.height;
          ctx.drawImage(canvas, 0, 0);
        }
      }

      return canvas;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Error generating image:", error);
      }
      alert("Failed to generate image. Please try again.");
      return null;
    }
  };

  const downloadImage = async () => {
    const canvas = await generateImage();
    if (!canvas) return;

    let mimeType = "image/png";
    let fileExtension = "png";
    let quality = 1;

    if (downloadFormat === "jpg") {
      mimeType = "image/jpeg";
      fileExtension = "jpg";
      quality = downloadQuality;
    } else if (downloadFormat === "png") {
      mimeType = "image/png";
      fileExtension = "png";
    }

    const url = canvas.toDataURL(mimeType, quality);
    const a = document.createElement("a");
    a.href = url;
    a.download = `handwriting-${Date.now()}.${fileExtension}`;
    a.click();
  };

  const downloadPDF = async () => {
    const canvas = await generateImage();
    if (!canvas) return;

    try {
      // Try to dynamically import jspdf
      const jsPDFModule = await import("jspdf").catch(() => null);
      if (!jsPDFModule) {
        // Fallback: download as high-quality PNG
        alert("PDF generation requires jspdf library. Downloading as PNG instead.");
        const url = canvas.toDataURL("image/png", 1);
        const a = document.createElement("a");
        a.href = url;
        a.download = `handwriting-${Date.now()}.png`;
        a.click();
        return;
      }

      const jsPDF = jsPDFModule.default;
      const pdf = new jsPDF({
        orientation: pageHeight > pageWidth ? "portrait" : "landscape",
        unit: "px",
        format: [pageWidth, pageHeight],
      });

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
      pdf.save(`handwriting-${Date.now()}.pdf`);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Error generating PDF:", error);
      }
      // Fallback to PNG
      const url = canvas.toDataURL("image/png", 1);
      const a = document.createElement("a");
      a.href = url;
      a.download = `handwriting-${Date.now()}.png`;
      a.click();
      alert("PDF generation failed. Downloaded as PNG instead.");
    }
  };

  const handleDownload = async () => {
    if (downloadFormat === "pdf") {
      await downloadPDF();
    } else if (downloadFormat === "svg") {
      await downloadSVG();
    } else {
      await downloadImage();
    }
  };

  const downloadSVG = async () => {
    if (!previewRef.current) return;

    const textContent = text || "Enter text to see preview";
    const shadowStyle = shadowEnabled 
      ? `filter: drop-shadow(${shadowX}px ${shadowY}px ${shadowBlur}px rgba(${hexToRgb(shadowColor)}, ${shadowOpacity}));`
      : "";

    const transformStyle = `transform: rotate(${textRotation}deg) skew(${textSkew}deg);`;
    
    // Calculate content area (excluding header/footer)
    const contentTop = headerEnabled ? headerHeight : 0;
    const contentBottom = footerEnabled ? footerHeight : 0;
    const contentHeight = pageHeight - contentTop - contentBottom;
    
    // Watermark position calculation
    const getWatermarkSVGPosition = () => {
      switch (watermarkPosition) {
        case "top-left":
          return { x: pageWidth * 0.1, y: pageHeight * 0.1 };
        case "top-right":
          return { x: pageWidth * 0.9, y: pageHeight * 0.1 };
        case "bottom-left":
          return { x: pageWidth * 0.1, y: pageHeight * 0.9 };
        case "bottom-right":
          return { x: pageWidth * 0.9, y: pageHeight * 0.9 };
        default:
          return { x: pageWidth / 2, y: pageHeight / 2 };
      }
    };
    const watermarkPos = getWatermarkSVGPosition();
    
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${pageWidth}" height="${pageHeight}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${paperTexture ? `<pattern id="paperTexture" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <image href="${paperTexture}" width="100" height="100"/>
    </pattern>` : ""}
    ${backgroundImage ? `<pattern id="bgImage" x="0" y="0" width="${pageWidth}" height="${pageHeight}" patternUnits="userSpaceOnUse">
      <image href="${backgroundImage}" width="${pageWidth}" height="${pageHeight}" opacity="${backgroundOpacity}"/>
    </pattern>` : ""}
  </defs>
  <rect width="${pageWidth}" height="${pageHeight}" fill="${paperTexture ? 'url(#paperTexture)' : backgroundColor}"/>
  ${backgroundImage && !paperTexture ? `<rect width="${pageWidth}" height="${pageHeight}" fill="url(#bgImage)"/>` : ""}
  ${borderEnabled ? `<rect x="${borderWidth/2}" y="${borderWidth/2}" width="${pageWidth - borderWidth}" height="${pageHeight - borderWidth}" 
    fill="none" stroke="${borderColor}" stroke-width="${borderWidth}" rx="${borderRadius}"/>` : ""}
  
  ${headerEnabled ? `<rect x="0" y="0" width="${pageWidth}" height="${headerHeight}" fill="${headerBackground}"/>
  <text 
    x="${headerAlign === 'left' ? 20 : headerAlign === 'right' ? pageWidth - 20 : pageWidth / 2}" 
    y="${headerHeight / 2 + headerFontSize / 3}"
    font-family="${selectedFont}"
    font-size="${headerFontSize}"
    fill="${headerColor}"
    text-anchor="${headerAlign === 'center' ? 'middle' : headerAlign === 'right' ? 'end' : 'start'}"
    dominant-baseline="middle"
  >${headerText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') || 'Header'}</text>` : ""}
  
  <g transform="translate(0, ${contentTop})">
    <text 
      x="${paddingLeft + (textAlign === 'center' ? (pageWidth - paddingLeft - paddingRight) / 2 + paddingLeft : textAlign === 'right' ? pageWidth - paddingRight : paddingLeft)}" 
      y="${paddingTop + fontSize}"
      font-family="${selectedFont}"
      font-size="${fontSize}"
      fill="${textColor}"
      fill-opacity="${textOpacity}"
      font-weight="${isBold ? 'bold' : 'normal'}"
      font-style="${isItalic ? 'italic' : 'normal'}"
      text-decoration="${isUnderline ? 'underline' : 'none'}"
      letter-spacing="${letterSpacing}px"
      word-spacing="${wordSpacing}px"
      text-anchor="${textAlign === 'center' ? 'middle' : textAlign === 'right' ? 'end' : 'start'}"
      ${shadowStyle}
      ${transformStyle}
    >${textContent.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
  </g>
  
  ${footerEnabled ? `<rect x="0" y="${pageHeight - footerHeight}" width="${pageWidth}" height="${footerHeight}" fill="${footerBackground}"/>
  <text 
    x="${footerAlign === 'left' ? 20 : footerAlign === 'right' ? pageWidth - 20 : pageWidth / 2}" 
    y="${pageHeight - footerHeight / 2 + footerFontSize / 3}"
    font-family="${selectedFont}"
    font-size="${footerFontSize}"
    fill="${footerColor}"
    text-anchor="${footerAlign === 'center' ? 'middle' : footerAlign === 'right' ? 'end' : 'start'}"
    dominant-baseline="middle"
  >${footerText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') || 'Footer'}</text>` : ""}
  
  ${watermarkEnabled ? (
    watermarkType === "text" && watermarkText ? 
      `<text 
        x="${watermarkPos.x}" 
        y="${watermarkPos.y}"
        font-family="${selectedFont}"
        font-size="${watermarkSize}"
        fill="${textColor}"
        fill-opacity="${watermarkOpacity}"
        font-weight="bold"
        text-anchor="middle"
        dominant-baseline="middle"
        transform="rotate(${watermarkRotation} ${watermarkPos.x} ${watermarkPos.y})"
      >${watermarkText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>` :
    watermarkType === "image" && watermarkImage ?
      `<image 
        href="${watermarkImage}"
        x="${watermarkPos.x - watermarkSize / 2}"
        y="${watermarkPos.y - watermarkSize / 2}"
        width="${watermarkSize}"
        height="${watermarkSize}"
        opacity="${watermarkOpacity}"
        transform="rotate(${watermarkRotation} ${watermarkPos.x} ${watermarkPos.y})"
      />` : ""
  ) : ""}
</svg>`;

    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `handwriting-${Date.now()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result 
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : "0, 0, 0";
  };

  const handleTemplateSelect = (templateName: string) => {
    const template = textTemplates.find(t => t.name === templateName);
    if (template && template.text) {
      setText(template.text);
    }
  };

  const presetSizes = [
    { name: "A4 Portrait", width: 794, height: 1123 },
    { name: "A4 Landscape", width: 1123, height: 794 },
    { name: "Letter Portrait", width: 816, height: 1056 },
    { name: "Letter Landscape", width: 1056, height: 816 },
    { name: "Square", width: 1000, height: 1000 },
    { name: "Instagram Post", width: 1080, height: 1080 },
    { name: "Custom", width: pageWidth, height: pageHeight },
  ];

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <PenTool className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
                Text to Handwriting Converter
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-1">
                Convert your text into beautiful handwriting with custom fonts, colors, and backgrounds
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            {tool && <FavoriteButton toolId={tool.id} />}
          <ShareButtons
              title="Text to Handwriting Converter"
              text="Check out this free text to handwriting converter tool!"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Settings
              </h2>

              {/* Text Input */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Text <span className="text-red-500">*</span>
                  </label>
                  <select
                    onChange={(e) => {
                      if (e.target.value) handleTemplateSelect(e.target.value);
                    }}
                    className="text-xs px-2 py-1 border border-slate-300 rounded"
                    defaultValue=""
                  >
                    <option value="">Templates...</option>
                    {textTemplates.filter(t => t.name !== "Custom").map((t) => (
                      <option key={t.name} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                  placeholder="Enter your text here..."
                />
              </div>

              {/* Text Effects */}
              <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  Text Effects
                </label>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => setIsBold(!isBold)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isBold ? "bg-purple-600 text-white" : "bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                    title="Bold"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsItalic(!isItalic)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isItalic ? "bg-purple-600 text-white" : "bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                    title="Italic"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsUnderline(!isUnderline)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isUnderline ? "bg-purple-600 text-white" : "bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                    title="Underline"
                  >
                    <Underline className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-2">
                  <label className="block text-xs text-slate-600 mb-1">
                    Text Opacity: {Math.round(textOpacity * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={textOpacity}
                    onChange={(e) => setTextOpacity(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Font Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Type className="w-4 h-4 inline mr-1" />
                  Handwriting Font
                </label>
                <select
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  {handwritingFonts.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.name} ({font.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Font Size */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Font Size: {fontSize}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="72"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Text Color */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Palette className="w-4 h-4 inline mr-1" />
                  Text Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-12 h-10 rounded border border-slate-300"
                  />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Line Height */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Line Height: {lineHeight}
                </label>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={lineHeight}
                  onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Letter Spacing */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Letter Spacing: {letterSpacing}px
                </label>
                <input
                  type="range"
                  min="-2"
                  max="10"
                  step="0.5"
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Word Spacing */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Word Spacing: {wordSpacing}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={wordSpacing}
                  onChange={(e) => setWordSpacing(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Text Transform */}
              <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Zap className="w-4 h-4 inline mr-1" />
                  Text Transform
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">
                      Rotation: {textRotation}°
                    </label>
                    <input
                      type="range"
                      min="-45"
                      max="45"
                      step="1"
                      value={textRotation}
                      onChange={(e) => setTextRotation(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">
                      Skew: {textSkew}°
                    </label>
                    <input
                      type="range"
                      min="-20"
                      max="20"
                      step="1"
                      value={textSkew}
                      onChange={(e) => setTextSkew(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Text Shadow */}
              <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-700">
                    <Layers className="w-4 h-4 inline mr-1" />
                    Text Shadow
                  </label>
                  <button
                    onClick={() => setShadowEnabled(!shadowEnabled)}
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      shadowEnabled ? "bg-purple-600 text-white" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {shadowEnabled ? "On" : "Off"}
                  </button>
                </div>
                {shadowEnabled && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-slate-600 mb-1">X: {shadowX}px</label>
                        <input
                          type="range"
                          min="-10"
                          max="10"
                          value={shadowX}
                          onChange={(e) => setShadowX(parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-600 mb-1">Y: {shadowY}px</label>
                        <input
                          type="range"
                          min="-10"
                          max="10"
                          value={shadowY}
                          onChange={(e) => setShadowY(parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Blur: {shadowBlur}px</label>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        value={shadowBlur}
                        onChange={(e) => setShadowBlur(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={shadowColor}
                        onChange={(e) => setShadowColor(e.target.value)}
                        className="w-10 h-8 rounded border border-slate-300"
                      />
                      <div className="flex-1">
                        <label className="block text-xs text-slate-600 mb-1">
                          Opacity: {Math.round(shadowOpacity * 100)}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={shadowOpacity}
                          onChange={(e) => setShadowOpacity(parseFloat(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Text Alignment */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Text Alignment
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(["left", "center", "right", "justify"] as const).map((align) => (
                    <button
                      key={align}
                      onClick={() => setTextAlign(align)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        textAlign === align
                          ? "bg-purple-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {align.charAt(0).toUpperCase() + align.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Padding */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Padding
                  </label>
                  <button
                    onClick={() => setUseCustomPadding(!useCustomPadding)}
                    className="text-xs text-purple-600 hover:text-purple-700"
                  >
                    {useCustomPadding ? "Uniform" : "Custom"}
                  </button>
                </div>
                {useCustomPadding ? (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Top: {paddingTop}px</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={paddingTop}
                        onChange={(e) => setPaddingTop(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Right: {paddingRight}px</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={paddingRight}
                        onChange={(e) => setPaddingRight(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Bottom: {paddingBottom}px</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={paddingBottom}
                        onChange={(e) => setPaddingBottom(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Left: {paddingLeft}px</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={paddingLeft}
                        onChange={(e) => setPaddingLeft(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                ) : (
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={paddingTop}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setPaddingTop(val);
                      setPaddingRight(val);
                      setPaddingBottom(val);
                      setPaddingLeft(val);
                    }}
                    className="w-full"
                  />
                )}
              </div>

              {/* Border/Frame */}
              <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-700">
                    <Frame className="w-4 h-4 inline mr-1" />
                    Border/Frame
                  </label>
                  <button
                    onClick={() => setBorderEnabled(!borderEnabled)}
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      borderEnabled ? "bg-purple-600 text-white" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {borderEnabled ? "On" : "Off"}
                  </button>
                </div>
                {borderEnabled && (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Width: {borderWidth}px</label>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        value={borderWidth}
                        onChange={(e) => setBorderWidth(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="w-10 h-8 rounded border border-slate-300"
                      />
                      <div className="flex-1">
                        <label className="block text-xs text-slate-600 mb-1">
                          Radius: {borderRadius}px
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="50"
                          value={borderRadius}
                          onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Watermark */}
              <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-700">
                    <Droplet className="w-4 h-4 inline mr-1" />
                    Watermark
                  </label>
                  <button
                    onClick={() => setWatermarkEnabled(!watermarkEnabled)}
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      watermarkEnabled ? "bg-purple-600 text-white" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {watermarkEnabled ? "On" : "Off"}
                  </button>
                </div>
                {watermarkEnabled && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Watermark Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setWatermarkType("text")}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                            watermarkType === "text"
                              ? "bg-purple-600 text-white"
                              : "bg-white text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          Text
                        </button>
                        <button
                          onClick={() => setWatermarkType("image")}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                            watermarkType === "image"
                              ? "bg-purple-600 text-white"
                              : "bg-white text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          Image
                        </button>
                      </div>
                    </div>
                    
                    {watermarkType === "text" ? (
                      <>
                        <input
                          type="text"
                          value={watermarkText}
                          onChange={(e) => setWatermarkText(e.target.value)}
                          placeholder="Watermark text..."
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        />
                        <div>
                          <label className="block text-xs text-slate-600 mb-1">Size: {watermarkSize}px</label>
                          <input
                            type="range"
                            min="50"
                            max="500"
                            value={watermarkSize}
                            onChange={(e) => setWatermarkSize(parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <input
                          ref={watermarkImageInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleWatermarkImageUpload}
                          className="hidden"
                          id="watermark-image-upload"
                        />
                        <div className="flex gap-2">
                          <label
                            htmlFor="watermark-image-upload"
                            className="flex-1 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors cursor-pointer text-center"
                          >
                            <Upload className="w-3 h-3 inline mr-1" />
                            Upload Image
                          </label>
                          {watermarkImage && (
                            <button
                              onClick={removeWatermarkImage}
                              className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        {watermarkImage && (
                          <div>
                            <label className="block text-xs text-slate-600 mb-1">Size: {watermarkSize}px</label>
                            <input
                              type="range"
                              min="50"
                              max="500"
                              value={watermarkSize}
                              onChange={(e) => setWatermarkSize(parseInt(e.target.value))}
                              className="w-full"
                            />
                          </div>
                        )}
                      </>
                    )}
                    
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Position</label>
                      <select
                        value={watermarkPosition}
                        onChange={(e) => setWatermarkPosition(e.target.value as typeof watermarkPosition)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      >
                        <option value="center">Center</option>
                        <option value="top-left">Top Left</option>
                        <option value="top-right">Top Right</option>
                        <option value="bottom-left">Bottom Left</option>
                        <option value="bottom-right">Bottom Right</option>
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-slate-600 mb-1">
                          Opacity: {Math.round(watermarkOpacity * 100)}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={watermarkOpacity}
                          onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-600 mb-1">
                          Rotation: {watermarkRotation}°
                        </label>
                        <input
                          type="range"
                          min="-90"
                          max="90"
                          value={watermarkRotation}
                          onChange={(e) => setWatermarkRotation(parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Header */}
              <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-700">
                    <Heading className="w-4 h-4 inline mr-1" />
                    Page Header
                  </label>
                  <button
                    onClick={() => setHeaderEnabled(!headerEnabled)}
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      headerEnabled ? "bg-purple-600 text-white" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {headerEnabled ? "On" : "Off"}
                  </button>
                </div>
                {headerEnabled && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={headerText}
                      onChange={(e) => setHeaderText(e.target.value)}
                      placeholder="Header text..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-slate-600 mb-1">Height: {headerHeight}px</label>
                        <input
                          type="range"
                          min="30"
                          max="150"
                          value={headerHeight}
                          onChange={(e) => setHeaderHeight(parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-600 mb-1">Font Size: {headerFontSize}px</label>
                        <input
                          type="range"
                          min="12"
                          max="48"
                          value={headerFontSize}
                          onChange={(e) => setHeaderFontSize(parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={headerColor}
                        onChange={(e) => setHeaderColor(e.target.value)}
                        className="w-10 h-8 rounded border border-slate-300"
                        title="Text Color"
                      />
                      <input
                        type="color"
                        value={headerBackground}
                        onChange={(e) => setHeaderBackground(e.target.value)}
                        className="w-10 h-8 rounded border border-slate-300"
                        title="Background Color"
                      />
                      <div className="flex-1">
                        <label className="block text-xs text-slate-600 mb-1">Alignment</label>
                        <div className="grid grid-cols-3 gap-1">
                          {(["left", "center", "right"] as const).map((align) => (
                            <button
                              key={align}
                              onClick={() => setHeaderAlign(align)}
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                headerAlign === align
                                  ? "bg-purple-600 text-white"
                                  : "bg-white text-slate-700 hover:bg-slate-100"
                              }`}
                            >
                              {align.charAt(0).toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-700">
                    <AlignCenter className="w-4 h-4 inline mr-1" />
                    Page Footer
                  </label>
                  <button
                    onClick={() => setFooterEnabled(!footerEnabled)}
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      footerEnabled ? "bg-purple-600 text-white" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {footerEnabled ? "On" : "Off"}
                  </button>
                </div>
                {footerEnabled && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={footerText}
                      onChange={(e) => setFooterText(e.target.value)}
                      placeholder="Footer text..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-slate-600 mb-1">Height: {footerHeight}px</label>
                        <input
                          type="range"
                          min="30"
                          max="150"
                          value={footerHeight}
                          onChange={(e) => setFooterHeight(parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-600 mb-1">Font Size: {footerFontSize}px</label>
                        <input
                          type="range"
                          min="12"
                          max="48"
                          value={footerFontSize}
                          onChange={(e) => setFooterFontSize(parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={footerColor}
                        onChange={(e) => setFooterColor(e.target.value)}
                        className="w-10 h-8 rounded border border-slate-300"
                        title="Text Color"
                      />
                      <input
                        type="color"
                        value={footerBackground}
                        onChange={(e) => setFooterBackground(e.target.value)}
                        className="w-10 h-8 rounded border border-slate-300"
                        title="Background Color"
                      />
                      <div className="flex-1">
                        <label className="block text-xs text-slate-600 mb-1">Alignment</label>
                        <div className="grid grid-cols-3 gap-1">
                          {(["left", "center", "right"] as const).map((align) => (
                            <button
                              key={align}
                              onClick={() => setFooterAlign(align)}
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                footerAlign === align
                                  ? "bg-purple-600 text-white"
                                  : "bg-white text-slate-700 hover:bg-slate-100"
                              }`}
                            >
                              {align.charAt(0).toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Background Color */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Background Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 h-10 rounded border border-slate-300"
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Paper Texture */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Paper Texture
                </label>
                <select
                  value={paperTextures.find(t => t.value === paperTexture)?.name || "None"}
                  onChange={(e) => {
                    const selected = paperTextures.find(t => t.name === e.target.value);
                    setPaperTexture(selected?.value || null);
                  }}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  {paperTextures.map((texture) => (
                    <option key={texture.name} value={texture.name}>
                      {texture.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Background Image */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <ImageIcon className="w-4 h-4 inline mr-1" />
                  Background Image
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleBackgroundUpload}
                  className="hidden"
                  id="background-upload"
                />
                <div className="flex gap-2">
                  <label
                    htmlFor="background-upload"
                    className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors cursor-pointer text-center"
                  >
                    <Upload className="w-4 h-4 inline mr-1" />
                    Upload
                  </label>
                  {backgroundImage && (
                    <button
                      onClick={removeBackgroundImage}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {backgroundImage && (
                  <div className="mt-2">
                    <label className="block text-xs text-slate-600 mb-1">
                      Background Opacity: {Math.round(backgroundOpacity * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={backgroundOpacity}
                      onChange={(e) => setBackgroundOpacity(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                )}
              </div>

              {/* Page Size */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Page Size
                </label>
                <select
                  onChange={(e) => {
                    const preset = presetSizes.find((s) => s.name === e.target.value);
                    if (preset) {
                      setPageWidth(preset.width);
                      setPageHeight(preset.height);
                    }
                  }}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 mb-2"
                >
                  {presetSizes.map((size) => (
                    <option key={size.name} value={size.name}>
                      {size.name} {size.name !== "Custom" && `(${size.width}x${size.height})`}
                    </option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Width (px)</label>
                    <input
                      type="number"
                      value={pageWidth}
                      onChange={(e) => setPageWidth(parseInt(e.target.value) || 800)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Height (px)</label>
                    <input
                      type="number"
                      value={pageHeight}
                      onChange={(e) => setPageHeight(parseInt(e.target.value) || 1000)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Download Options */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Download Format
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(["png", "jpg", "pdf", "svg"] as const).map((format) => (
                    <button
                      key={format}
                      onClick={() => setDownloadFormat(format)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        downloadFormat === format
                          ? "bg-purple-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {format.toUpperCase()}
                    </button>
                  ))}
                </div>
                {downloadFormat === "jpg" && (
                  <div className="mt-2">
                    <label className="block text-xs text-slate-600 mb-1">
                      Quality: {Math.round(downloadQuality * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={downloadQuality}
                      onChange={(e) => setDownloadQuality(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                )}
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download {downloadFormat.toUpperCase()}
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Preview</h2>
              <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50 p-4 flex items-center justify-center">
                <div
                  ref={previewRef}
                  style={{
                    width: `${pageWidth}px`,
                    minHeight: `${pageHeight}px`,
                    backgroundColor: paperTexture ? "transparent" : backgroundColor,
                    backgroundImage: paperTexture 
                      ? `url(${paperTexture})` 
                      : backgroundImage 
                        ? `url(${backgroundImage})` 
                        : "none",
                    backgroundSize: paperTexture ? "auto" : "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: paperTexture ? "repeat" : "no-repeat",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    border: borderEnabled 
                      ? `${borderWidth}px solid ${borderColor}`
                      : "none",
                    borderRadius: `${borderRadius}px`,
                    overflow: "hidden",
                  }}
                  className="shadow-lg"
                >
                  {/* Background Layers */}
                  {!paperTexture && backgroundColor && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: backgroundColor,
                        zIndex: 0,
                      }}
                    />
                  )}
                  {backgroundImage && !paperTexture && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        opacity: backgroundOpacity,
                        zIndex: 1,
                        pointerEvents: "none",
                      }}
                    />
                  )}

                  {/* Header */}
                  {headerEnabled && (
                    <div
                      style={{
                        width: "100%",
                        height: `${headerHeight}px`,
                        backgroundColor: headerBackground,
                        color: headerColor,
                        fontFamily: `"${selectedFont}", cursive`,
                        fontSize: `${headerFontSize}px`,
                        display: "flex",
                        alignItems: "center",
                        padding: "0 20px",
                        justifyContent: headerAlign === "left" ? "flex-start" : headerAlign === "right" ? "flex-end" : "center",
                        textAlign: headerAlign,
                        position: "relative",
                        zIndex: 2,
                        borderBottom: "1px solid rgba(0,0,0,0.1)",
                      }}
                    >
                      {headerText || "Header"}
                    </div>
                  )}

                  {/* Main Content */}
                  <div
                    style={{
                      flex: 1,
                      position: "relative",
                      padding: useCustomPadding 
                        ? `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`
                        : `${paddingTop}px`,
                      zIndex: 2,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: `"${selectedFont}", cursive`,
                        fontSize: `${fontSize}px`,
                        color: textColor,
                        lineHeight: lineHeight,
                        letterSpacing: `${letterSpacing}px`,
                        wordSpacing: `${wordSpacing}px`,
                        textAlign: textAlign,
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        fontWeight: isBold ? "bold" : "normal",
                        fontStyle: isItalic ? "italic" : "normal",
                        textDecoration: isUnderline ? "underline" : "none",
                        opacity: textOpacity,
                        transform: `rotate(${textRotation}deg) skew(${textSkew}deg)`,
                        textShadow: shadowEnabled 
                          ? `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(${hexToRgb(shadowColor)}, ${shadowOpacity})`
                          : "none",
                      }}
                    >
                      {text || "Enter text to see preview"}
                    </div>
                  </div>

                  {/* Footer */}
                  {footerEnabled && (
                    <div
                      style={{
                        width: "100%",
                        height: `${footerHeight}px`,
                        backgroundColor: footerBackground,
                        color: footerColor,
                        fontFamily: `"${selectedFont}", cursive`,
                        fontSize: `${footerFontSize}px`,
                        display: "flex",
                        alignItems: "center",
                        padding: "0 20px",
                        justifyContent: footerAlign === "left" ? "flex-start" : footerAlign === "right" ? "flex-end" : "center",
                        textAlign: footerAlign,
                        position: "relative",
                        zIndex: 2,
                        borderTop: "1px solid rgba(0,0,0,0.1)",
                      }}
                    >
                      {footerText || "Footer"}
                    </div>
                  )}

                  {/* Watermark */}
                  {watermarkEnabled && (
                    <div
                      style={{
                        position: "absolute",
                        ...getWatermarkPosition(),
                        transform: `translate(-50%, -50%) rotate(${watermarkRotation}deg)`,
                        opacity: watermarkOpacity,
                        pointerEvents: "none",
                        zIndex: 3,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {watermarkType === "text" && watermarkText ? (
                        <div
                          style={{
                            fontSize: `${watermarkSize}px`,
                            color: textColor,
                            fontFamily: `"${selectedFont}", cursive`,
                            fontWeight: "bold",
                          }}
                        >
                          {watermarkText}
                        </div>
                      ) : watermarkType === "image" && watermarkImage ? (
                        <img
                          src={watermarkImage}
                          alt="Watermark"
                          style={{
                            width: `${watermarkSize}px`,
                            height: "auto",
                            maxWidth: "100%",
                          }}
                        />
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
              <canvas ref={canvasRef} className="hidden" />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-purple-50 rounded-xl p-6 border border-purple-200">
          <h3 className="font-semibold text-purple-900 mb-2 text-lg">💡 Advanced Features & Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-purple-900 mb-2">Text Effects</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Use Bold, Italic, and Underline for emphasis</li>
                <li>• Adjust text opacity for subtle effects</li>
                <li>• Add text shadow for depth and dimension</li>
                <li>• Rotate or skew text for creative layouts</li>
                <li>• Control word spacing for better readability</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-900 mb-2">Design & Layout</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Use paper textures (lined, grid) for realistic look</li>
                <li>• Custom margins for precise spacing control</li>
                <li>• Add borders/frames for document styling</li>
                <li>• Watermark support for branding</li>
                <li>• Export as SVG for scalable vector graphics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-900 mb-2">Templates & Formats</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Use text templates for quick formatting</li>
                <li>• PNG format for best image quality</li>
                <li>• JPG format with quality control</li>
                <li>• PDF format for printing documents</li>
                <li>• SVG format for scalable graphics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-900 mb-2">Best Practices</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Combine background images with paper textures</li>
                <li>• Use subtle shadows for professional look</li>
                <li>• Match text color with background theme</li>
                <li>• Adjust line height for different font sizes</li>
                <li>• Preview before downloading to ensure quality</li>
              </ul>
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

