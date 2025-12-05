"use client";

import { useState, useMemo, useCallback } from "react";
import { useDebounce } from "@/lib/useDebounce";
import { Sparkles, Maximize2, X } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";
import { ToolComments } from "@/components/ToolComments";
import PatternPreview from "@/components/PatternPreview";
import PatternControls from "@/components/PatternControls";
import { PatternType, PatternConfig, GradientConfig, GradientType } from "@/lib/patterns";
import { generatePatternSvg } from "@/lib/patterns";
import { downloadSvg, downloadPng, EXPORT_TEMPLATES } from "@/lib/export";

export default function SVGPatternGeneratorPage() {
  const tool = getToolById("svg-pattern-generator");
  const seo = tool ? getSEOMetadata(tool) : null;

  // Pattern configuration
  const [patternType, setPatternType] = useState<PatternType>("mandala");
  const [patternColor, setPatternColor] = useState("#4bf7f0");
  const [backgroundColor, setBackgroundColor] = useState("#d6bb61");
  const [size, setSize] = useState(32);
  const [spacing, setSpacing] = useState(30);
  const [rotation, setRotation] = useState(0);
  const [skew, setSkew] = useState(0);
  const [opacity, setOpacity] = useState(1);

  // Export settings
  const [exportTemplate, setExportTemplate] = useState("Custom");
  const [exportWidth, setExportWidth] = useState(1200);
  const [exportHeight, setExportHeight] = useState(800);

  // Image upload
  const [imageData, setImageData] = useState<string | undefined>(undefined);

  // Preview modal state
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Gradient state
  const [gradient, setGradient] = useState<GradientConfig>({
    type: 'none',
    colors: [patternColor, patternColor],
    angle: 0,
  });

  // Debounce expensive operations for smoother UX
  const debouncedSize = useDebounce(size, 100);
  const debouncedSpacing = useDebounce(spacing, 100);
  const debouncedRotation = useDebounce(rotation, 50);
  const debouncedSkew = useDebounce(skew, 50);
  const debouncedOpacity = useDebounce(opacity, 50);

  // Memoize pattern config to prevent unnecessary recalculations
  const patternConfig: PatternConfig = useMemo(() => ({
    type: patternType,
    size: debouncedSize,
    color: patternColor,
    opacity: debouncedOpacity,
    imageData,
    gradient: gradient.type !== 'none' ? gradient : undefined,
  }), [patternType, debouncedSize, patternColor, debouncedOpacity, imageData, gradient]);

  // Memoize handlers to prevent unnecessary re-renders
  const handleReset = useCallback(() => {
    setPatternType("mandala");
    setPatternColor("#4bf7f0");
    setBackgroundColor("#d6bb61");
    setSize(32);
    setSpacing(30);
    setRotation(0);
    setSkew(0);
    setOpacity(1);
    setExportTemplate("Custom");
    setExportWidth(1200);
    setExportHeight(800);
    setImageData(undefined);
    setGradient({
      type: 'none',
      colors: ["#4bf7f0", "#4bf7f0"],
      angle: 0,
    });
  }, []);

  const handleExport = useCallback(async (format: "svg" | "png") => {
    const svgString = generatePatternSvg(
      patternConfig,
      backgroundColor,
      exportWidth,
      exportHeight,
      debouncedSpacing,
      debouncedRotation,
      debouncedSkew
    );

    if (format === "svg") {
      downloadSvg(svgString, `pattern-${patternType}-${Date.now()}.svg`);
    } else {
      await downloadPng(
        svgString,
        exportWidth,
        exportHeight,
        `pattern-${patternType}-${Date.now()}.png`
      );
    }
  }, [patternConfig, backgroundColor, exportWidth, exportHeight, debouncedSpacing, debouncedRotation, debouncedSkew, patternType]);

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                SVG Pattern Generator - Create Beautiful Patterns
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Generate stunning SVG patterns including mandalas, dots, grids, waves, and more. Customize colors, size, spacing, rotation, and export for social media.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <ShareButtons
              title="SVG Pattern Generator"
              text="Check out this free SVG pattern generator tool!"
            />
          </div>
        </div>

        {/* Main Tool Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left Side - Preview */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Preview
            </h2>
            <div className="w-full mb-4" style={{ minHeight: '500px', aspectRatio: `${exportWidth} / ${exportHeight}` }}>
              <PatternPreview
                config={patternConfig}
                backgroundColor={backgroundColor}
                width={exportWidth}
                height={exportHeight}
                spacing={debouncedSpacing}
                rotation={debouncedRotation}
                skew={debouncedSkew}
                imageData={imageData}
                previewScale={0.4}
              />
            </div>
            <button
              onClick={() => setShowPreviewModal(true)}
              className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Maximize2 className="w-4 h-4" />
              Preview Full Size
            </button>
          </div>

          {/* Right Side - Controls */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <PatternControls
              patternType={patternType}
              onPatternTypeChange={setPatternType}
              patternColor={patternColor}
              onPatternColorChange={setPatternColor}
              backgroundColor={backgroundColor}
              onBackgroundColorChange={setBackgroundColor}
              size={size}
              onSizeChange={setSize}
              spacing={spacing}
              onSpacingChange={setSpacing}
              rotation={rotation}
              onRotationChange={setRotation}
              skew={skew}
              onSkewChange={setSkew}
              opacity={opacity}
              onOpacityChange={setOpacity}
              exportTemplate={exportTemplate}
              onExportTemplateChange={setExportTemplate}
              exportWidth={exportWidth}
              onExportWidthChange={setExportWidth}
              exportHeight={exportHeight}
              onExportHeightChange={setExportHeight}
              onReset={handleReset}
              onShuffleColors={() => {
                const colors = require("@/lib/export").generateHarmoniousColors();
                setPatternColor(colors.pattern);
                setBackgroundColor(colors.background);
              }}
              onExport={async (format: "svg" | "png") => {
                await handleExport(format);
              }}
              imageData={imageData}
              onImageUpload={setImageData}
              gradient={gradient}
              onGradientChange={setGradient}
            />
          </div>
        </div>

        {/* Preview Modal */}
        {showPreviewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Pattern Preview
                </h3>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  aria-label="Close preview"
                >
                  <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-auto p-6">
                <div className="w-full" style={{ minHeight: '600px' }}>
                  <PatternPreview
                    config={patternConfig}
                    backgroundColor={backgroundColor}
                    width={exportWidth}
                    height={exportHeight}
                    spacing={debouncedSpacing}
                    rotation={debouncedRotation}
                    skew={debouncedSkew}
                    imageData={imageData}
                    previewScale={0.8}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg transition-colors font-medium"
                >
                  Close
                </button>
                <button
                  onClick={async () => {
                    await handleExport("png");
                    setShowPreviewModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  Download PNG
                </button>
                <button
                  onClick={() => {
                    handleExport("svg");
                    setShowPreviewModal(false);
                  }}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                >
                  Download SVG
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tool Details */}
        {tool && (
          <>
            <ToolComments toolId={tool.id} />
            <ToolFAQ tool={tool} />
            <RelatedTools currentTool={tool} />
            <ToolDetailsSection tool={tool} />
          </>
        )}
      </div>
    </>
  );
}

