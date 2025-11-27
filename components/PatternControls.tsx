"use client";

import React, { useState, useCallback, useMemo } from "react";
import { PatternType, GradientType, GradientConfig } from "@/lib/patterns";
import { EXPORT_TEMPLATES, generateHarmoniousColors } from "@/lib/export";
import { Plus, X } from "lucide-react";

interface PatternControlsProps {
  patternType: PatternType;
  onPatternTypeChange: (type: PatternType) => void;
  patternColor: string;
  onPatternColorChange: (color: string) => void;
  backgroundColor: string;
  onBackgroundColorChange: (color: string) => void;
  size: number;
  onSizeChange: (size: number) => void;
  spacing: number;
  onSpacingChange: (spacing: number) => void;
  rotation: number;
  onRotationChange: (rotation: number) => void;
  skew: number;
  onSkewChange: (skew: number) => void;
  opacity: number;
  onOpacityChange: (opacity: number) => void;
  exportTemplate: string;
  onExportTemplateChange: (template: string) => void;
  exportWidth: number;
  onExportWidthChange: (width: number) => void;
  exportHeight: number;
  onExportHeightChange: (height: number) => void;
  onReset: () => void;
  onShuffleColors: () => void;
  onExport: (format: "svg" | "png") => void | Promise<void>;
  imageData?: string;
  onImageUpload?: (imageData: string) => void;
  gradient?: GradientConfig;
  onGradientChange?: (gradient: GradientConfig) => void;
}

export default function PatternControls({
  patternType,
  onPatternTypeChange,
  patternColor,
  onPatternColorChange,
  backgroundColor,
  onBackgroundColorChange,
  size,
  onSizeChange,
  spacing,
  onSpacingChange,
  rotation,
  onRotationChange,
  skew,
  onSkewChange,
  opacity,
  onOpacityChange,
  exportTemplate,
  onExportTemplateChange,
  exportWidth,
  onExportWidthChange,
  exportHeight,
  onExportHeightChange,
  onReset,
  onShuffleColors,
  onExport,
  imageData,
  onImageUpload,
  gradient,
  onGradientChange,
}: PatternControlsProps) {
  const [showExportModal, setShowExportModal] = useState(false);

  const handleTemplateChange = useCallback((templateName: string) => {
    onExportTemplateChange(templateName);
    if (templateName !== "Custom") {
      const template = EXPORT_TEMPLATES.find((t) => t.name === templateName);
      if (template) {
        onExportWidthChange(template.width);
        onExportHeightChange(template.height);
      }
    }
  }, [onExportTemplateChange, onExportWidthChange, onExportHeightChange]);

  const handleShuffleColors = useCallback(() => {
    const colors = generateHarmoniousColors();
    onPatternColorChange(colors.pattern);
    onBackgroundColorChange(colors.background);
  }, [onPatternColorChange, onBackgroundColorChange]);

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* Pattern Type */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Pattern Type
        </label>
        <select
          value={patternType}
          onChange={(e) => onPatternTypeChange(e.target.value as PatternType)}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          suppressHydrationWarning
        >
          <option value="mandala">Mandala</option>
          <option value="dots">Dots</option>
          <option value="grid">Grid</option>
          <option value="diagonalStripes">Diagonal Stripes</option>
          <option value="waves">Waves</option>
          <option value="hexagons">Hexagons</option>
          <option value="stars">Stars</option>
          <option value="circles">Circles</option>
          <option value="triangles">Triangles</option>
          <option value="diamonds">Diamonds</option>
          <option value="crosses">Crosses</option>
          <option value="plus">Plus</option>
          <option value="arrows">Arrows</option>
          <option value="spiral">Spiral</option>
          <option value="zigzag">Zigzag</option>
          <option value="chevrons">Chevrons</option>
          <option value="bricks">Bricks</option>
          <option value="leaves">Leaves</option>
          <option value="flowers">Flowers</option>
          <option value="snowflakes">Snowflakes</option>
          <option value="polkaDots">Polka Dots</option>
          <option value="horizontalStripes">Horizontal Stripes</option>
          <option value="verticalStripes">Vertical Stripes</option>
          <option value="checkerboard">Checkerboard</option>
          <option value="herringbone">Herringbone</option>
          <option value="quatrefoil">Quatrefoil</option>
          <option value="islamic">Islamic Geometric</option>
          <option value="customImage">Custom Image (Upload)</option>
        </select>
      </div>

      {/* Image Upload - Show only when customImage is selected */}
      {patternType === 'customImage' && onImageUpload && (
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Upload Image
          </label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const result = event.target?.result as string;
                    if (result) {
                      onImageUpload(result);
                    }
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300"
              suppressHydrationWarning
            />
            {imageData && (
              <div className="w-12 h-12 rounded border border-slate-300 dark:border-slate-600 overflow-hidden">
                <img src={imageData} alt="Uploaded pattern" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Upload an image to use as a repeating pattern tile
          </p>
        </div>
      )}

      {/* Gradient Settings */}
      {onGradientChange && (
        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
              Gradient Settings
            </label>
            <button
              onClick={() => {
                if (onGradientChange) {
                  onGradientChange({
                    type: gradient?.type === 'none' || !gradient ? 'linear' : 'none',
                    colors: gradient?.colors || [patternColor, patternColor],
                    angle: gradient?.angle ?? 0,
                  });
                }
              }}
              className="text-xs px-2 py-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded transition-colors"
            >
              {gradient?.type === 'none' || !gradient ? 'Enable' : 'Disable'}
            </button>
          </div>
          
          {(gradient?.type !== 'none' && gradient) && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Gradient Type
                </label>
                <select
                  value={gradient.type}
                  onChange={(e) => {
                    if (onGradientChange) {
                      onGradientChange({
                        ...gradient,
                        type: e.target.value as GradientType,
                      });
                    }
                  }}
                  className="w-full px-2 py-1.5 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  suppressHydrationWarning
                >
                  <option value="linear">Linear</option>
                  <option value="radial">Radial</option>
                </select>
              </div>

              {gradient.type === 'linear' && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Angle
                    </label>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {gradient.angle ?? 0}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={gradient.angle ?? 0}
                    onChange={(e) => {
                      if (onGradientChange) {
                        const angle = Number(e.target.value);
                        const rad = (angle * Math.PI) / 180;
                        onGradientChange({
                          ...gradient,
                          angle,
                          x2: Math.cos(rad),
                          y2: Math.sin(rad),
                        });
                      }
                    }}
                    className="w-full"
                    suppressHydrationWarning
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Gradient Colors
                </label>
                <div className="space-y-2">
                  {gradient.colors.map((color, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => {
                          if (onGradientChange) {
                            const newColors = [...gradient.colors];
                            newColors[index] = e.target.value;
                            onGradientChange({
                              ...gradient,
                              colors: newColors,
                            });
                          }
                        }}
                        className="w-10 h-10 rounded border border-slate-300 dark:border-slate-600 cursor-pointer"
                        suppressHydrationWarning
                      />
                      <input
                        type="text"
                        value={color}
                        onChange={(e) => {
                          if (onGradientChange) {
                            const newColors = [...gradient.colors];
                            newColors[index] = e.target.value;
                            onGradientChange({
                              ...gradient,
                              colors: newColors,
                            });
                          }
                        }}
                        className="flex-1 px-2 py-1.5 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        suppressHydrationWarning
                      />
                      {gradient.colors.length > 2 && (
                        <button
                          onClick={() => {
                            if (onGradientChange) {
                              const newColors = gradient.colors.filter((_, i) => i !== index);
                              onGradientChange({
                                ...gradient,
                                colors: newColors,
                              });
                            }
                          }}
                          className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                          aria-label="Remove color"
                        >
                          <X className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        </button>
                      )}
                    </div>
                  ))}
                  {gradient.colors.length < 5 && (
                    <button
                      onClick={() => {
                        if (onGradientChange) {
                          onGradientChange({
                            ...gradient,
                            colors: [...gradient.colors, patternColor],
                          });
                        }
                      }}
                      className="w-full px-2 py-1.5 text-xs bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded transition-colors flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add Color
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Colors */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Pattern Color {gradient?.type !== 'none' && gradient && '(Gradient Active)'}
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={patternColor}
              onChange={(e) => onPatternColorChange(e.target.value)}
              className="w-12 h-12 rounded border border-slate-300 dark:border-slate-600 cursor-pointer"
              suppressHydrationWarning
            />
            <input
              type="text"
              value={patternColor}
              onChange={(e) => onPatternColorChange(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              suppressHydrationWarning
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Background Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="w-12 h-12 rounded border border-slate-300 dark:border-slate-600 cursor-pointer"
              suppressHydrationWarning
            />
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              suppressHydrationWarning
            />
          </div>
        </div>
      </div>

      {/* Pattern Settings */}
      <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Pattern Settings
          </h3>
          <button
            onClick={onReset}
            className="text-xs px-3 py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="space-y-4">
          {/* Size */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Size
              </label>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {size}px
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="128"
              value={size}
              onChange={(e) => onSizeChange(Number(e.target.value))}
              className="w-full"
              suppressHydrationWarning
            />
          </div>

          {/* Spacing */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Spacing
              </label>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {spacing}px
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={spacing}
              onChange={(e) => onSpacingChange(Number(e.target.value))}
              className="w-full"
              suppressHydrationWarning
            />
          </div>

          {/* Rotation */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Rotation
              </label>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {rotation}°
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={(e) => onRotationChange(Number(e.target.value))}
              className="w-full"
              suppressHydrationWarning
            />
          </div>

          {/* Skew */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Skew
              </label>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {skew}°
              </span>
            </div>
            <input
              type="range"
              min="-45"
              max="45"
              value={skew}
              onChange={(e) => onSkewChange(Number(e.target.value))}
              className="w-full"
              suppressHydrationWarning
            />
          </div>

          {/* Opacity */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Pattern Opacity
              </label>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {opacity.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={opacity}
              onChange={(e) => onOpacityChange(Number(e.target.value))}
              className="w-full"
              suppressHydrationWarning
            />
          </div>
        </div>
      </div>

      {/* Export Size Settings */}
      <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Export Size Settings
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Background Template
            </label>
            <select
              value={exportTemplate}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              suppressHydrationWarning
            >
              {EXPORT_TEMPLATES.map((template) => (
                <option key={template.name} value={template.name}>
                  {template.name}
                  {template.name !== "Custom" &&
                    ` (${template.width} x ${template.height})`}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Width (px)
              </label>
              <input
                type="number"
                value={exportWidth}
                onChange={(e) => onExportWidthChange(Number(e.target.value))}
                disabled={exportTemplate !== "Custom"}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                suppressHydrationWarning
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Height (px)
              </label>
              <input
                type="number"
                value={exportHeight}
                onChange={(e) => onExportHeightChange(Number(e.target.value))}
                disabled={exportTemplate !== "Custom"}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                suppressHydrationWarning
              />
            </div>
          </div>
        </div>
      </div>

      {/* Color Shuffle Button */}
      <button
        onClick={handleShuffleColors}
        className="w-full px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg transition-colors font-medium"
      >
        Shuffle Colors
      </button>

      {/* Export Button */}
      <button
        onClick={() => setShowExportModal(true)}
        className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold text-lg shadow-lg"
      >
        Export ▸
      </button>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Export Pattern
            </h3>
            <div className="space-y-3">
              <button
                onClick={async () => {
                  await onExport("svg");
                  setShowExportModal(false);
                }}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                Download SVG
              </button>
              <button
                onClick={async () => {
                  await onExport("png");
                  setShowExportModal(false);
                }}
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
              >
                Download PNG
              </button>
              <button
                onClick={() => setShowExportModal(false)}
                className="w-full px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

