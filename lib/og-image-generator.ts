/**
 * OG Image Generator Utility
 * 
 * This file provides utilities for generating Open Graph images.
 * 
 * To create OG images:
 * 1. Use a design tool (Figma, Canva, Photoshop) to create 1200x630px images
 * 2. Or use an API service like:
 *    - Vercel OG Image Generation: https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation
 *    - Cloudinary: https://cloudinary.com/documentation/image_transformations
 *    - Bannerbear: https://www.bannerbear.com/
 * 
 * Recommended OG Images:
 * - /public/og-image.png (Homepage - 1200x630px)
 * - /public/og-tools.png (Tools page - 1200x630px)
 * - /public/og-default.png (Default for all pages - 1200x630px)
 * 
 * Image Specifications:
 * - Size: 1200x630 pixels (1.91:1 aspect ratio)
 * - Format: JPG or PNG
 * - File size: Under 1MB (optimize for web)
 * - Text: Keep text large and readable (minimum 60px font size)
 * - Branding: Include logo and brand colors
 */

export const OG_IMAGE_CONFIG = {
  baseUrl: "https://aisocialtools.co",
  defaultImage: "/og-image.png",
  images: {
    home: "/og-image.png",
    tools: "/og-tools.png",
    default: "/og-default.png",
  },
  dimensions: {
    width: 1200,
    height: 630,
  },
};

/**
 * Get OG image URL for a specific page
 */
export function getOGImageUrl(page: "home" | "tools" | "default" = "default"): string {
  return `${OG_IMAGE_CONFIG.baseUrl}${OG_IMAGE_CONFIG.images[page] || OG_IMAGE_CONFIG.images.default}`;
}

/**
 * Generate OG image metadata
 */
export function generateOGImageMetadata(
  title: string,
  description: string,
  page: "home" | "tools" | "default" = "default"
) {
  return {
    url: getOGImageUrl(page),
    width: OG_IMAGE_CONFIG.dimensions.width,
    height: OG_IMAGE_CONFIG.dimensions.height,
    alt: `${title} - ${description}`,
  };
}

