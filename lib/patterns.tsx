"use client";

import React from "react";

export type PatternType = 
  | 'mandala' 
  | 'dots' 
  | 'grid' 
  | 'diagonalStripes' 
  | 'waves' 
  | 'hexagons'
  | 'stars'
  | 'circles'
  | 'triangles'
  | 'diamonds'
  | 'crosses'
  | 'plus'
  | 'arrows'
  | 'spiral'
  | 'zigzag'
  | 'chevrons'
  | 'bricks'
  | 'leaves'
  | 'flowers'
  | 'snowflakes'
  | 'polkaDots'
  | 'horizontalStripes'
  | 'verticalStripes'
  | 'checkerboard'
  | 'herringbone'
  | 'quatrefoil'
  | 'islamic'
  | 'customImage';

export type GradientType = 'none' | 'linear' | 'radial';

export interface GradientConfig {
  type: GradientType;
  colors: string[]; // Array of colors for gradient stops
  angle?: number; // For linear gradients (0-360 degrees)
  x1?: number; // For linear gradients (0-1)
  y1?: number; // For linear gradients (0-1)
  x2?: number; // For linear gradients (0-1)
  y2?: number; // For linear gradients (0-1)
  cx?: number; // For radial gradients (0-1, center x)
  cy?: number; // For radial gradients (0-1, center y)
  r?: number; // For radial gradients (0-1, radius)
}

export interface PatternConfig {
  type: PatternType;
  size: number;
  color: string;
  opacity: number;
  imageData?: string; // Base64 image data for customImage type
  gradient?: GradientConfig; // Gradient configuration
}

export function getPatternSvgElement(
  type: PatternType,
  size: number,
  color: string,
  opacity: number,
  imageData?: string,
  gradient?: GradientConfig
): React.ReactElement {
  // Generate gradient ID if gradient is used
  const gradientId = gradient && gradient.type !== 'none' 
    ? `gradient-${Math.random().toString(36).substr(2, 9)}`
    : undefined;

  // Create gradient definition if needed
  const gradientDef = gradient && gradient.type !== 'none' ? (
    gradient.type === 'linear' ? (
      <defs>
        <linearGradient id={gradientId} 
          x1={gradient.x1 ?? 0} 
          y1={gradient.y1 ?? 0}
          x2={gradient.x2 ?? 1} 
          y2={gradient.y2 ?? 0}>
          {gradient.colors.map((stopColor, index) => (
            <stop 
              key={index}
              offset={`${(index / (gradient.colors.length - 1)) * 100}%`} 
              stopColor={stopColor}
              stopOpacity={opacity}
            />
          ))}
        </linearGradient>
      </defs>
    ) : (
      <defs>
        <radialGradient id={gradientId}
          cx={gradient.cx ?? 0.5}
          cy={gradient.cy ?? 0.5}
          r={gradient.r ?? 0.5}>
          {gradient.colors.map((stopColor, index) => (
            <stop 
              key={index}
              offset={`${(index / (gradient.colors.length - 1)) * 100}%`} 
              stopColor={stopColor}
              stopOpacity={opacity}
            />
          ))}
        </radialGradient>
      </defs>
    )
  ) : null;

  const baseProps = {
    fill: gradientId ? `url(#${gradientId})` : color,
    stroke: gradientId ? `url(#${gradientId})` : color,
    opacity: gradientId ? 1 : opacity, // Opacity handled in gradient stops
  };

  // Helper to wrap pattern with gradient
  const wrapWithGradient = (pattern: React.ReactElement): React.ReactElement => {
    if (gradientDef) {
      return (
        <g>
          {gradientDef}
          {pattern}
        </g>
      );
    }
    return pattern;
  };

  switch (type) {
    case 'mandala': {
      const mandalaPattern = (
        <g {...baseProps}>
          {/* Central circle */}
          <circle cx={size / 2} cy={size / 2} r={size * 0.15} fill="none" strokeWidth={size * 0.02} />
          {/* Outer circles */}
          <circle cx={size / 2} cy={size / 2} r={size * 0.35} fill="none" strokeWidth={size * 0.015} />
          <circle cx={size / 2} cy={size / 2} r={size * 0.45} fill="none" strokeWidth={size * 0.01} />
          {/* Radial lines */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            const x1 = size / 2 + Math.cos(angle) * size * 0.15;
            const y1 = size / 2 + Math.sin(angle) * size * 0.15;
            const x2 = size / 2 + Math.cos(angle) * size * 0.45;
            const y2 = size / 2 + Math.sin(angle) * size * 0.45;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                strokeWidth={size * 0.01}
              />
            );
          })}
          {/* Small decorative circles */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            const cx = size / 2 + Math.cos(angle) * size * 0.35;
            const cy = size / 2 + Math.sin(angle) * size * 0.35;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={size * 0.04}
              />
            );
          })}
        </g>
      );
      return wrapWithGradient(mandalaPattern);
    }

    case 'dots': {
      const dotSize = size * 0.2;
      const dotSpacing = size * 0.5;
      const dotsPattern = (
        <g {...baseProps}>
          <circle cx={size / 2} cy={size / 2} r={dotSize / 2} />
        </g>
      );
      return wrapWithGradient(dotsPattern);
    }

    case 'grid': {
      const gridSize = size * 0.25;
      const gridSpacing = size * 0.5;
      const gridPattern = (
        <g {...baseProps}>
          <rect
            x={size * 0.25}
            y={size * 0.25}
            width={gridSize}
            height={gridSize}
            fill="none"
            strokeWidth={size * 0.02}
          />
        </g>
      );
      return wrapWithGradient(gridPattern);
    }

    case 'diagonalStripes': {
      const diagonalPattern = (
        <g {...baseProps}>
          <line
            x1={0}
            y1={0}
            x2={size}
            y2={size}
            strokeWidth={size * 0.1}
            strokeLinecap="round"
          />
        </g>
      );
      return wrapWithGradient(diagonalPattern);
    }

    case 'waves': {
      const waveAmplitude = size * 0.15;
      const waveFrequency = 2;
      const points: string[] = [];
      const steps = 20;
      for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * size;
        const y = size / 2 + Math.sin((i / steps) * Math.PI * waveFrequency) * waveAmplitude;
        points.push(`${x},${y}`);
      }
      const wavesPattern = (
        <g {...baseProps}>
          <polyline
            points={points.join(' ')}
            fill="none"
            strokeWidth={size * 0.05}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      );
      return wrapWithGradient(wavesPattern);
    }

    case 'hexagons': {
      const hexSize = size * 0.4;
      const hexPoints: string[] = [];
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI * 2) / 6;
        const x = size / 2 + Math.cos(angle) * hexSize;
        const y = size / 2 + Math.sin(angle) * hexSize;
        hexPoints.push(`${x},${y}`);
      }
      const hexPattern = (
        <g {...baseProps}>
          <polygon
            points={hexPoints.join(' ')}
            fill="none"
            strokeWidth={size * 0.02}
          />
        </g>
      );
      return wrapWithGradient(hexPattern);
    }

    case 'stars': {
      const starPoints: string[] = [];
      const starOuterRadius = size * 0.4;
      const starInnerRadius = size * 0.2;
      for (let i = 0; i < 10; i++) {
        const angle = (i * Math.PI) / 5;
        const radius = i % 2 === 0 ? starOuterRadius : starInnerRadius;
        const x = size / 2 + Math.cos(angle - Math.PI / 2) * radius;
        const y = size / 2 + Math.sin(angle - Math.PI / 2) * radius;
        starPoints.push(`${x},${y}`);
      }
      const starPattern = (
        <g {...baseProps}>
          <polygon points={starPoints.join(' ')} />
        </g>
      );
      return wrapWithGradient(starPattern);
    }

    case 'circles': {
      const circlesPattern = (
        <g {...baseProps}>
          <circle cx={size / 2} cy={size / 2} r={size * 0.35} fill="none" strokeWidth={size * 0.03} />
          <circle cx={size / 2} cy={size / 2} r={size * 0.2} />
        </g>
      );
      return wrapWithGradient(circlesPattern);
    }

    case 'triangles': {
      const triPoints = [
        `${size / 2},${size * 0.1}`,
        `${size * 0.1},${size * 0.9}`,
        `${size * 0.9},${size * 0.9}`
      ];
      const trianglePattern = (
        <g {...baseProps}>
          <polygon points={triPoints.join(' ')} />
        </g>
      );
      return wrapWithGradient(trianglePattern);
    }

    case 'diamonds': {
      const diamondPoints = [
        `${size / 2},${size * 0.1}`,
        `${size * 0.9},${size / 2}`,
        `${size / 2},${size * 0.9}`,
        `${size * 0.1},${size / 2}`
      ];
      const diamondPattern = (
        <g {...baseProps}>
          <polygon points={diamondPoints.join(' ')} />
        </g>
      );
      return wrapWithGradient(diamondPattern);
    }

    case 'crosses': {
      const crossThickness = size * 0.15;
      const crossPattern = (
        <g {...baseProps}>
          <rect x={size / 2 - crossThickness / 2} y={size * 0.1} width={crossThickness} height={size * 0.8} />
          <rect x={size * 0.1} y={size / 2 - crossThickness / 2} width={size * 0.8} height={crossThickness} />
        </g>
      );
      return wrapWithGradient(crossPattern);
    }

    case 'plus': {
      const plusThickness = size * 0.12;
      const plusPattern = (
        <g {...baseProps}>
          <rect x={size / 2 - plusThickness / 2} y={size * 0.2} width={plusThickness} height={size * 0.6} />
          <rect x={size * 0.2} y={size / 2 - plusThickness / 2} width={size * 0.6} height={plusThickness} />
        </g>
      );
      return wrapWithGradient(plusPattern);
    }

    case 'arrows': {
      const arrowPoints = [
        `${size * 0.2},${size / 2}`,
        `${size * 0.5},${size * 0.2}`,
        `${size * 0.5},${size * 0.35}`,
        `${size * 0.8},${size * 0.35}`,
        `${size * 0.8},${size * 0.65}`,
        `${size * 0.5},${size * 0.65}`,
        `${size * 0.5},${size * 0.8}`
      ];
      const arrowPattern = (
        <g {...baseProps}>
          <polygon points={arrowPoints.join(' ')} />
        </g>
      );
      return wrapWithGradient(arrowPattern);
    }

    case 'spiral': {
      const spiralSteps = 30;
      const spiralPoints: string[] = [];
      for (let i = 0; i <= spiralSteps; i++) {
        const angle = (i / spiralSteps) * Math.PI * 4;
        const radius = (i / spiralSteps) * size * 0.4;
        const x = size / 2 + Math.cos(angle) * radius;
        const y = size / 2 + Math.sin(angle) * radius;
        spiralPoints.push(`${x},${y}`);
      }
      const spiralPattern = (
        <g {...baseProps}>
          <polyline points={spiralPoints.join(' ')} fill="none" strokeWidth={size * 0.03} strokeLinecap="round" />
        </g>
      );
      return wrapWithGradient(spiralPattern);
    }

    case 'zigzag': {
      const zigzagPoints: string[] = [];
      const segments = 4;
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * size;
        const y = size / 2 + (i % 2 === 0 ? -size * 0.2 : size * 0.2);
        zigzagPoints.push(`${x},${y}`);
      }
      const zigzagPattern = (
        <g {...baseProps}>
          <polyline points={zigzagPoints.join(' ')} fill="none" strokeWidth={size * 0.05} strokeLinecap="round" />
        </g>
      );
      return wrapWithGradient(zigzagPattern);
    }

    case 'chevrons': {
      const chevronPoints = [
        `${size * 0.1},${size / 2}`,
        `${size / 2},${size * 0.1}`,
        `${size / 2},${size * 0.4}`,
        `${size * 0.9},${size / 2}`,
        `${size / 2},${size * 0.6}`,
        `${size / 2},${size * 0.9}`
      ];
      const chevronPattern = (
        <g {...baseProps}>
          <polygon points={chevronPoints.join(' ')} />
        </g>
      );
      return wrapWithGradient(chevronPattern);
    }

    case 'bricks': {
      const brickHeight = size * 0.3;
      const brickWidth = size * 0.6;
      const brickPattern = (
        <g {...baseProps}>
          <rect x={size * 0.05} y={size * 0.1} width={brickWidth} height={brickHeight} fill="none" strokeWidth={size * 0.02} />
          <rect x={size * 0.35} y={size * 0.5} width={brickWidth} height={brickHeight} fill="none" strokeWidth={size * 0.02} />
        </g>
      );
      return wrapWithGradient(brickPattern);
    }

    case 'leaves': {
      const leafPoints: string[] = [];
      for (let i = 0; i <= 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const radius = size * 0.3 * (1 + 0.3 * Math.sin(angle * 3));
        const x = size / 2 + Math.cos(angle) * radius;
        const y = size / 2 + Math.sin(angle) * radius;
        leafPoints.push(`${x},${y}`);
      }
      const leafPattern = (
        <g {...baseProps}>
          <polygon points={leafPoints.join(' ')} />
        </g>
      );
      return wrapWithGradient(leafPattern);
    }

    case 'flowers': {
      const petalCount = 6;
      const flowerElements: React.ReactElement[] = [];
      for (let i = 0; i < petalCount; i++) {
        const angle = (i * Math.PI * 2) / petalCount;
        const cx = size / 2 + Math.cos(angle) * size * 0.25;
        const cy = size / 2 + Math.sin(angle) * size * 0.25;
        flowerElements.push(
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={size * 0.15}
            ry={size * 0.1}
            transform={`rotate(${(angle * 180) / Math.PI}, ${cx}, ${cy})`}
          />
        );
      }
      const flowerPattern = (
        <g {...baseProps}>
          {flowerElements}
          <circle cx={size / 2} cy={size / 2} r={size * 0.1} />
        </g>
      );
      return wrapWithGradient(flowerPattern);
    }

    case 'snowflakes': {
      const snowflakeBranches: React.ReactElement[] = [];
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI * 2) / 6;
        const x1 = size / 2;
        const y1 = size / 2;
        const x2 = size / 2 + Math.cos(angle) * size * 0.4;
        const y2 = size / 2 + Math.sin(angle) * size * 0.4;
        snowflakeBranches.push(
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={size * 0.02} />
        );
        // Add side branches
        const sideAngle1 = angle + Math.PI / 6;
        const sideAngle2 = angle - Math.PI / 6;
        const sideLength = size * 0.15;
        snowflakeBranches.push(
          <line
            key={`side1-${i}`}
            x1={x2}
            y1={y2}
            x2={x2 + Math.cos(sideAngle1) * sideLength}
            y2={y2 + Math.sin(sideAngle1) * sideLength}
            strokeWidth={size * 0.015}
          />
        );
        snowflakeBranches.push(
          <line
            key={`side2-${i}`}
            x1={x2}
            y1={y2}
            x2={x2 + Math.cos(sideAngle2) * sideLength}
            y2={y2 + Math.sin(sideAngle2) * sideLength}
            strokeWidth={size * 0.015}
          />
        );
      }
      const snowflakePattern = <g {...baseProps}>{snowflakeBranches}</g>;
      return wrapWithGradient(snowflakePattern);
    }

    case 'polkaDots': {
      const dotRadius = size * 0.15;
      const polkaPattern = (
        <g {...baseProps}>
          <circle cx={size * 0.3} cy={size * 0.3} r={dotRadius} />
          <circle cx={size * 0.7} cy={size * 0.7} r={dotRadius} />
        </g>
      );
      return wrapWithGradient(polkaPattern);
    }

    case 'horizontalStripes': {
      const horizontalPattern = (
        <g {...baseProps}>
          <rect x={0} y={size * 0.2} width={size} height={size * 0.15} />
          <rect x={0} y={size * 0.65} width={size} height={size * 0.15} />
        </g>
      );
      return wrapWithGradient(horizontalPattern);
    }

    case 'verticalStripes': {
      const verticalPattern = (
        <g {...baseProps}>
          <rect x={size * 0.2} y={0} width={size * 0.15} height={size} />
          <rect x={size * 0.65} y={0} width={size * 0.15} height={size} />
        </g>
      );
      return wrapWithGradient(verticalPattern);
    }

    case 'checkerboard': {
      const squareSize = size * 0.4;
      const checkerPattern = (
        <g {...baseProps}>
          <rect x={size * 0.1} y={size * 0.1} width={squareSize} height={squareSize} />
          <rect x={size * 0.5} y={size * 0.5} width={squareSize} height={squareSize} />
        </g>
      );
      return wrapWithGradient(checkerPattern);
    }

    case 'herringbone': {
      const herringPoints1 = [
        `${size * 0.1},${size * 0.1}`,
        `${size * 0.5},${size * 0.3}`,
        `${size * 0.1},${size * 0.5}`
      ];
      const herringPoints2 = [
        `${size * 0.5},${size * 0.5}`,
        `${size * 0.9},${size * 0.7}`,
        `${size * 0.5},${size * 0.9}`
      ];
      const herringPattern = (
        <g {...baseProps}>
          <polygon points={herringPoints1.join(' ')} />
          <polygon points={herringPoints2.join(' ')} />
        </g>
      );
      return wrapWithGradient(herringPattern);
    }

    case 'quatrefoil': {
      const quatrefoilRadius = size * 0.2;
      const quatrefoilPattern = (
        <g {...baseProps}>
          <circle cx={size / 2} cy={size * 0.3} r={quatrefoilRadius} />
          <circle cx={size * 0.3} cy={size / 2} r={quatrefoilRadius} />
          <circle cx={size / 2} cy={size * 0.7} r={quatrefoilRadius} />
          <circle cx={size * 0.7} cy={size / 2} r={quatrefoilRadius} />
        </g>
      );
      return wrapWithGradient(quatrefoilPattern);
    }

    case 'islamic': {
      const islamicElements: React.ReactElement[] = [];
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8;
        const x1 = size / 2 + Math.cos(angle) * size * 0.2;
        const y1 = size / 2 + Math.sin(angle) * size * 0.2;
        const x2 = size / 2 + Math.cos(angle) * size * 0.4;
        const y2 = size / 2 + Math.sin(angle) * size * 0.4;
        islamicElements.push(
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={size * 0.015} />
        );
      }
      const islamicPattern = (
        <g {...baseProps}>
          <circle cx={size / 2} cy={size / 2} r={size * 0.2} fill="none" strokeWidth={size * 0.02} />
          {islamicElements}
        </g>
      );
      return wrapWithGradient(islamicPattern);
    }

    case 'customImage': {
      if (imageData) {
        const imagePattern = (
          <g {...baseProps}>
            <image
              href={imageData}
              x={0}
              y={0}
              width={size}
              height={size}
              opacity={opacity}
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        );
        return wrapWithGradient(imagePattern);
      }
      return <g />;
    }

    default:
      return <g />;
  }
}

export function generatePatternSvg(
  config: PatternConfig,
  backgroundColor: string,
  width: number,
  height: number,
  spacing: number,
  rotation: number,
  skew: number
): string {
  const { type, size, color, opacity, imageData, gradient } = config;
  
  // Calculate number of tiles needed
  const tileSize = size + spacing;
  const cols = Math.ceil(width / tileSize) + 2;
  const rows = Math.ceil(height / tileSize) + 2;

  // Build the full SVG with tiled pattern
  let svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
  
  // Add gradient definitions if needed
  const gradientId = gradient && gradient.type !== 'none' 
    ? `gradient-${Math.random().toString(36).substr(2, 9)}`
    : undefined;
  
  if (gradientId && gradient) {
    if (gradient.type === 'linear') {
      const angle = (gradient.angle ?? 0) * Math.PI / 180;
      const x1 = gradient.x1 ?? 0;
      const y1 = gradient.y1 ?? 0;
      const x2 = gradient.x2 ?? (Math.cos(angle));
      const y2 = gradient.y2 ?? (Math.sin(angle));
      svgContent += `<defs><linearGradient id="${gradientId}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">`;
      gradient.colors.forEach((stopColor, index) => {
        const offset = (index / (gradient.colors.length - 1)) * 100;
        svgContent += `<stop offset="${offset}%" stop-color="${stopColor}" stop-opacity="${opacity}" />`;
      });
      svgContent += `</linearGradient></defs>`;
    } else if (gradient.type === 'radial') {
      svgContent += `<defs><radialGradient id="${gradientId}" cx="${gradient.cx ?? 0.5}" cy="${gradient.cy ?? 0.5}" r="${gradient.r ?? 0.5}">`;
      gradient.colors.forEach((stopColor, index) => {
        const offset = (index / (gradient.colors.length - 1)) * 100;
        svgContent += `<stop offset="${offset}%" stop-color="${stopColor}" stop-opacity="${opacity}" />`;
      });
      svgContent += `</radialGradient></defs>`;
    }
  }
  
  // Determine fill and stroke colors
  const fillColor = gradientId ? `url(#${gradientId})` : color;
  const strokeColor = gradientId ? `url(#${gradientId})` : color;
  const patternOpacity = gradientId ? 1 : opacity; // Opacity handled in gradient stops
  
  // Add background
  svgContent += `<rect width="${width}" height="${height}" fill="${backgroundColor}"/>`;

  // For each tile, we'll generate the pattern inline
  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < cols; col++) {
      const x = col * tileSize;
      const y = row * tileSize;
      
      // Apply transforms
      const transform = [
        `translate(${x + size / 2}, ${y + size / 2})`,
        `rotate(${rotation})`,
        `skewX(${skew})`,
        `translate(${-size / 2}, ${-size / 2})`
      ].join(' ');

      // Generate pattern SVG string based on type
      let patternContent = '';
      switch (type) {
        case 'mandala':
          patternContent = `
            <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.15}" fill="none" stroke="${strokeColor}" stroke-width="${size * 0.02}" opacity="${patternOpacity}" />
            <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.35}" fill="none" stroke="${strokeColor}" stroke-width="${size * 0.015}" opacity="${patternOpacity}" />
            <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.45}" fill="none" stroke="${strokeColor}" stroke-width="${size * 0.01}" opacity="${patternOpacity}" />
            ${Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * Math.PI * 2) / 8;
              const x1 = size / 2 + Math.cos(angle) * size * 0.15;
              const y1 = size / 2 + Math.sin(angle) * size * 0.15;
              const x2 = size / 2 + Math.cos(angle) * size * 0.45;
              const y2 = size / 2 + Math.sin(angle) * size * 0.45;
              return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${strokeColor}" stroke-width="${size * 0.01}" opacity="${patternOpacity}" />`;
            }).join('')}
            ${Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * Math.PI * 2) / 8;
              const cx = size / 2 + Math.cos(angle) * size * 0.35;
              const cy = size / 2 + Math.sin(angle) * size * 0.35;
              return `<circle cx="${cx}" cy="${cy}" r="${size * 0.04}" fill="${fillColor}" opacity="${patternOpacity}" />`;
            }).join('')}
          `;
          break;
        case 'dots':
          patternContent = `<circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.1}" fill="${fillColor}" opacity="${patternOpacity}" />`;
          break;
        case 'grid':
          patternContent = `<rect x="${size * 0.25}" y="${size * 0.25}" width="${size * 0.25}" height="${size * 0.25}" fill="none" stroke="${strokeColor}" stroke-width="${size * 0.02}" opacity="${patternOpacity}" />`;
          break;
        case 'diagonalStripes':
          patternContent = `<line x1="0" y1="0" x2="${size}" y2="${size}" stroke="${strokeColor}" stroke-width="${size * 0.1}" stroke-linecap="round" opacity="${patternOpacity}" />`;
          break;
        case 'waves':
          const waveAmplitude = size * 0.15;
          const waveFrequency = 2;
          const points: string[] = [];
          const steps = 20;
          for (let i = 0; i <= steps; i++) {
            const px = (i / steps) * size;
            const py = size / 2 + Math.sin((i / steps) * Math.PI * waveFrequency) * waveAmplitude;
            points.push(`${px},${py}`);
          }
          patternContent = `<polyline points="${points.join(' ')}" fill="none" stroke="${strokeColor}" stroke-width="${size * 0.05}" stroke-linecap="round" stroke-linejoin="round" opacity="${patternOpacity}" />`;
          break;
        case 'hexagons':
          const hexSize = size * 0.4;
          const hexPoints: string[] = [];
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI * 2) / 6;
            const px = size / 2 + Math.cos(angle) * hexSize;
            const py = size / 2 + Math.sin(angle) * hexSize;
            hexPoints.push(`${px},${py}`);
          }
          patternContent = `<polygon points="${hexPoints.join(' ')}" fill="none" stroke="${strokeColor}" stroke-width="${size * 0.02}" opacity="${patternOpacity}" />`;
          break;
        case 'stars':
          const starPoints: string[] = [];
          const starOuterRadius = size * 0.4;
          const starInnerRadius = size * 0.2;
          for (let i = 0; i < 10; i++) {
            const angle = (i * Math.PI) / 5;
            const radius = i % 2 === 0 ? starOuterRadius : starInnerRadius;
            const x = size / 2 + Math.cos(angle - Math.PI / 2) * radius;
            const y = size / 2 + Math.sin(angle - Math.PI / 2) * radius;
            starPoints.push(`${x},${y}`);
          }
          patternContent = `<polygon points="${starPoints.join(' ')}" fill="${fillColor}" opacity="${patternOpacity}" />`;
          break;
        case 'circles':
          patternContent = `<circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.35}" fill="none" stroke="${strokeColor}" stroke-width="${size * 0.03}" opacity="${patternOpacity}" /><circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.2}" fill="${fillColor}" opacity="${patternOpacity}" />`;
          break;
        case 'triangles':
          patternContent = `<polygon points="${size / 2},${size * 0.1} ${size * 0.1},${size * 0.9} ${size * 0.9},${size * 0.9}" fill="${fillColor}" opacity="${patternOpacity}" />`;
          break;
        case 'diamonds':
          patternContent = `<polygon points="${size / 2},${size * 0.1} ${size * 0.9},${size / 2} ${size / 2},${size * 0.9} ${size * 0.1},${size / 2}" fill="${fillColor}" opacity="${patternOpacity}" />`;
          break;
        case 'crosses':
          const crossThickness = size * 0.15;
          patternContent = `<rect x="${size / 2 - crossThickness / 2}" y="${size * 0.1}" width="${crossThickness}" height="${size * 0.8}" fill="${fillColor}" opacity="${patternOpacity}" /><rect x="${size * 0.1}" y="${size / 2 - crossThickness / 2}" width="${size * 0.8}" height="${crossThickness}" fill="${fillColor}" opacity="${patternOpacity}" />`;
          break;
        case 'plus':
          const plusThickness = size * 0.12;
          patternContent = `<rect x="${size / 2 - plusThickness / 2}" y="${size * 0.2}" width="${plusThickness}" height="${size * 0.6}" fill="${fillColor}" opacity="${patternOpacity}" /><rect x="${size * 0.2}" y="${size / 2 - plusThickness / 2}" width="${size * 0.6}" height="${plusThickness}" fill="${fillColor}" opacity="${patternOpacity}" />`;
          break;
        case 'arrows':
          patternContent = `<polygon points="${size * 0.2},${size / 2} ${size * 0.5},${size * 0.2} ${size * 0.5},${size * 0.35} ${size * 0.8},${size * 0.35} ${size * 0.8},${size * 0.65} ${size * 0.5},${size * 0.65} ${size * 0.5},${size * 0.8}" fill="${fillColor}" opacity="${patternOpacity}" />`;
          break;
        case 'spiral':
          const spiralSteps = 30;
          const spiralPoints: string[] = [];
          for (let i = 0; i <= spiralSteps; i++) {
            const angle = (i / spiralSteps) * Math.PI * 4;
            const radius = (i / spiralSteps) * size * 0.4;
            const x = size / 2 + Math.cos(angle) * radius;
            const y = size / 2 + Math.sin(angle) * radius;
            spiralPoints.push(`${x},${y}`);
          }
          patternContent = `<polyline points="${spiralPoints.join(' ')}" fill="none" stroke="${strokeColor}" stroke-width="${size * 0.03}" stroke-linecap="round" opacity="${patternOpacity}" />`;
          break;
        case 'zigzag':
          const zigzagPoints: string[] = [];
          const segments = 4;
          for (let i = 0; i <= segments; i++) {
            const x = (i / segments) * size;
            const y = size / 2 + (i % 2 === 0 ? -size * 0.2 : size * 0.2);
            zigzagPoints.push(`${x},${y}`);
          }
          patternContent = `<polyline points="${zigzagPoints.join(' ')}" fill="none" stroke="${strokeColor}" stroke-width="${size * 0.05}" stroke-linecap="round" opacity="${patternOpacity}" />`;
          break;
        case 'chevrons':
          patternContent = `<polygon points="${size * 0.1},${size / 2} ${size / 2},${size * 0.1} ${size / 2},${size * 0.4} ${size * 0.9},${size / 2} ${size / 2},${size * 0.6} ${size / 2},${size * 0.9}" fill="${fillColor}" opacity="${patternOpacity}" />`;
          break;
        case 'bricks':
          const brickHeight = size * 0.3;
          const brickWidth = size * 0.6;
          patternContent = `<rect x="${size * 0.05}" y="${size * 0.1}" width="${brickWidth}" height="${brickHeight}" fill="none" stroke="${strokeColor}" stroke-width="${size * 0.02}" opacity="${patternOpacity}" /><rect x="${size * 0.35}" y="${size * 0.5}" width="${brickWidth}" height="${brickHeight}" fill="none" stroke="${strokeColor}" stroke-width="${size * 0.02}" opacity="${patternOpacity}" />`;
          break;
        case 'leaves':
          const leafPoints: string[] = [];
          for (let i = 0; i <= 20; i++) {
            const angle = (i / 20) * Math.PI * 2;
            const radius = size * 0.3 * (1 + 0.3 * Math.sin(angle * 3));
            const x = size / 2 + Math.cos(angle) * radius;
            const y = size / 2 + Math.sin(angle) * radius;
            leafPoints.push(`${x},${y}`);
          }
          patternContent = `<polygon points="${leafPoints.join(' ')}" fill="${fillColor}" opacity="${patternOpacity}" />`;
          break;
        case 'flowers':
          const petalCount = 6;
          let flowerContent = '';
          for (let i = 0; i < petalCount; i++) {
            const angle = (i * Math.PI * 2) / petalCount;
            const cx = size / 2 + Math.cos(angle) * size * 0.25;
            const cy = size / 2 + Math.sin(angle) * size * 0.25;
            const rotation = (angle * 180) / Math.PI;
            flowerContent += `<ellipse cx="${cx}" cy="${cy}" rx="${size * 0.15}" ry="${size * 0.1}" transform="rotate(${rotation}, ${cx}, ${cy})" fill="${fillColor}" opacity="${patternOpacity}" />`;
          }
          flowerContent += `<circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.1}" fill="${fillColor}" opacity="${patternOpacity}" />`;
          patternContent = flowerContent;
          break;
        case 'snowflakes':
          let snowflakeContent = '';
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI * 2) / 6;
            const x1 = size / 2;
            const y1 = size / 2;
            const x2 = size / 2 + Math.cos(angle) * size * 0.4;
            const y2 = size / 2 + Math.sin(angle) * size * 0.4;
            snowflakeContent += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${strokeColor}" stroke-width="${size * 0.02}" opacity="${patternOpacity}" />`;
            const sideAngle1 = angle + Math.PI / 6;
            const sideAngle2 = angle - Math.PI / 6;
            const sideLength = size * 0.15;
            snowflakeContent += `<line x1="${x2}" y1="${y2}" x2="${x2 + Math.cos(sideAngle1) * sideLength}" y2="${y2 + Math.sin(sideAngle1) * sideLength}" stroke="${strokeColor}" stroke-width="${size * 0.015}" opacity="${patternOpacity}" />`;
            snowflakeContent += `<line x1="${x2}" y1="${y2}" x2="${x2 + Math.cos(sideAngle2) * sideLength}" y2="${y2 + Math.sin(sideAngle2) * sideLength}" stroke="${strokeColor}" stroke-width="${size * 0.015}" opacity="${patternOpacity}" />`;
          }
          patternContent = snowflakeContent;
          break;
        case 'polkaDots':
          const dotRadius = size * 0.15;
          patternContent = `<circle cx="${size * 0.3}" cy="${size * 0.3}" r="${dotRadius}" fill="${fillColor}" opacity="${patternOpacity}" /><circle cx="${size * 0.7}" cy="${size * 0.7}" r="${dotRadius}" fill="${fillColor}" opacity="${patternOpacity}" />`;
          break;
        case 'horizontalStripes':
          patternContent = `<rect x="0" y="${size * 0.2}" width="${size}" height="${size * 0.15}" fill="${fillColor}" opacity="${patternOpacity}" /><rect x="0" y="${size * 0.65}" width="${size}" height="${size * 0.15}" fill="${fillColor}" opacity="${patternOpacity}" />`;
          break;
        case 'verticalStripes':
          patternContent = `<rect x="${size * 0.2}" y="0" width="${size * 0.15}" height="${size}" fill="${fillColor}" opacity="${patternOpacity}" /><rect x="${size * 0.65}" y="0" width="${size * 0.15}" height="${size}" fill="${fillColor}" opacity="${patternOpacity}" />`;
          break;
        case 'checkerboard':
          const squareSize = size * 0.4;
          patternContent = `<rect x="${size * 0.1}" y="${size * 0.1}" width="${squareSize}" height="${squareSize}" fill="${fillColor}" opacity="${patternOpacity}" /><rect x="${size * 0.5}" y="${size * 0.5}" width="${squareSize}" height="${squareSize}" fill="${fillColor}" opacity="${patternOpacity}" />`;
          break;
        case 'herringbone':
          patternContent = `<polygon points="${size * 0.1},${size * 0.1} ${size * 0.5},${size * 0.3} ${size * 0.1},${size * 0.5}" fill="${fillColor}" opacity="${patternOpacity}" /><polygon points="${size * 0.5},${size * 0.5} ${size * 0.9},${size * 0.7} ${size * 0.5},${size * 0.9}" fill="${fillColor}" opacity="${patternOpacity}" />`;
          break;
        case 'quatrefoil':
          const quatrefoilRadius = size * 0.2;
          patternContent = `<circle cx="${size / 2}" cy="${size * 0.3}" r="${quatrefoilRadius}" fill="${fillColor}" opacity="${patternOpacity}" /><circle cx="${size * 0.3}" cy="${size / 2}" r="${quatrefoilRadius}" fill="${fillColor}" opacity="${patternOpacity}" /><circle cx="${size / 2}" cy="${size * 0.7}" r="${quatrefoilRadius}" fill="${fillColor}" opacity="${patternOpacity}" /><circle cx="${size * 0.7}" cy="${size / 2}" r="${quatrefoilRadius}" fill="${fillColor}" opacity="${patternOpacity}" />`;
          break;
        case 'islamic':
          let islamicContent = `<circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.2}" fill="none" stroke="${strokeColor}" stroke-width="${size * 0.02}" opacity="${patternOpacity}" />`;
          for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI * 2) / 8;
            const x1 = size / 2 + Math.cos(angle) * size * 0.2;
            const y1 = size / 2 + Math.sin(angle) * size * 0.2;
            const x2 = size / 2 + Math.cos(angle) * size * 0.4;
            const y2 = size / 2 + Math.sin(angle) * size * 0.4;
            islamicContent += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${strokeColor}" stroke-width="${size * 0.015}" opacity="${patternOpacity}" />`;
          }
          patternContent = islamicContent;
          break;
        case 'customImage':
          if (imageData) {
            patternContent = `<image href="${imageData}" x="0" y="0" width="${size}" height="${size}" opacity="${opacity}" preserveAspectRatio="xMidYMid slice" />`;
          }
          break;
      }

      svgContent += `<g transform="${transform}">${patternContent}</g>`;
    }
  }

  svgContent += '</svg>';
  return svgContent;
}

