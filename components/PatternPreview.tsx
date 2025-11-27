"use client";

import React, { useMemo } from "react";
import { PatternConfig, getPatternSvgElement } from "@/lib/patterns";

interface PatternPreviewProps {
  config: PatternConfig;
  backgroundColor: string;
  width: number;
  height: number;
  spacing: number;
  rotation: number;
  skew: number;
  previewScale?: number;
  imageData?: string;
}

export default function PatternPreview({
  config,
  backgroundColor,
  width,
  height,
  spacing,
  rotation,
  skew,
  previewScale = 0.3,
  imageData,
}: PatternPreviewProps) {
  const { type, size, color, opacity } = config;

  // Scale for preview
  const previewSize = size * previewScale;
  const previewSpacing = spacing * previewScale;
  const previewTileSize = previewSize + previewSpacing;
  
  // Calculate number of tiles needed to fill the preview area
  // Use the scaled dimensions to calculate how many tiles we need
  const scaledWidth = width * previewScale;
  const scaledHeight = height * previewScale;
  
  // Calculate columns and rows based on scaled dimensions
  let cols = Math.ceil(scaledWidth / previewTileSize) + 2; // +2 for overflow
  let rows = Math.ceil(scaledHeight / previewTileSize) + 2; // +2 for overflow
  
  // Limit to prevent performance issues (max 200 tiles total)
  const maxTiles = 200;
  const totalTiles = cols * rows;
  if (totalTiles > maxTiles) {
    const scaleFactor = Math.sqrt(maxTiles / totalTiles);
    const limitedCols = Math.ceil(cols * scaleFactor);
    const limitedRows = Math.ceil(rows * scaleFactor);
    // Use the limited values but ensure we still cover the area
    cols = Math.max(limitedCols, Math.ceil(scaledWidth / previewTileSize));
    rows = Math.max(limitedRows, Math.ceil(scaledHeight / previewTileSize));
  }

  // Generate pattern tiles
  const tiles = useMemo(() => {
    const tilesArray: React.ReactElement[] = [];
    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const x = col * previewTileSize;
        const y = row * previewTileSize;

        // Apply transforms
        const transform = [
          `translate(${x + previewSize / 2}, ${y + previewSize / 2})`,
          `rotate(${rotation})`,
          `skewX(${skew})`,
          `translate(${-previewSize / 2}, ${-previewSize / 2})`,
        ].join(" ");

        const patternElement = getPatternSvgElement(type, previewSize, color, opacity, imageData, config.gradient);
        
        tilesArray.push(
          <g key={`${row}-${col}`} transform={transform}>
            {patternElement}
          </g>
        );
      }
    }
    return tilesArray;
  }, [type, previewSize, color, opacity, rows, cols, previewTileSize, rotation, skew, imageData, config.gradient]);

  return (
    <div
      className="w-full h-full rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden shadow-inner bg-slate-100 dark:bg-slate-800"
      style={{ backgroundColor, minHeight: '500px' }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width * previewScale} ${height * previewScale}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block' }}
      >
        {tiles}
      </svg>
    </div>
  );
}

