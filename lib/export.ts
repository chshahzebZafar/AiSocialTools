export interface ExportTemplate {
  name: string;
  width: number;
  height: number;
}

export const EXPORT_TEMPLATES: ExportTemplate[] = [
  { name: 'Custom', width: 1200, height: 800 },
  { name: 'Facebook Group Cover', width: 1640, height: 856 },
  { name: 'Facebook Post', width: 1200, height: 630 },
  { name: 'Instagram Post', width: 1080, height: 1080 },
  { name: 'YouTube Thumbnail', width: 1280, height: 720 },
];

export function downloadSvg(svgString: string, filename: string = 'pattern.svg'): void {
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function downloadPng(
  svgString: string,
  width: number,
  height: number,
  filename: string = 'pattern.png'
): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | null;

      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Draw white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // Draw the SVG image
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to PNG and download
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to create PNG blob'));
          return;
        }

        const pngUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(pngUrl);
        URL.revokeObjectURL(url);
        resolve();
      }, 'image/png');
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load SVG image'));
    };

    img.src = url;
  });
}

export function generateHarmoniousColors(): { pattern: string; background: string } {
  // Generate harmonious color pairs with good contrast
  const colorSchemes = [
    { pattern: '#4bf7f0', background: '#d6bb61' },
    { pattern: '#ff6b6b', background: '#4ecdc4' },
    { pattern: '#95e1d3', background: '#f38181' },
    { pattern: '#a8e6cf', background: '#ffd3a5' },
    { pattern: '#ffaaa5', background: '#ffd3a5' },
    { pattern: '#d4a5a5', background: '#ffd3a5' },
    { pattern: '#a8d8ea', background: '#aa96da' },
    { pattern: '#fcbad3', background: '#aa96da' },
    { pattern: '#ffd3a5', background: '#fd79a8' },
    { pattern: '#6c5ce7', background: '#a29bfe' },
    { pattern: '#00b894', background: '#00cec9' },
    { pattern: '#fdcb6e', background: '#e17055' },
  ];

  return colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
}

