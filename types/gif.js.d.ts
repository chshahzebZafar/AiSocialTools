declare module 'gif.js' {
  interface GIFOptions {
    workers?: number;
    quality?: number;
    width?: number;
    height?: number;
    workerScript?: string;
    background?: string;
    transparent?: string | null;
    dither?: boolean;
    debug?: boolean;
    repeat?: number;
    globalPalette?: number[];
    palette?: number[];
  }

  interface Frame {
    data: ImageData;
    delay: number;
  }

  class GIF {
    constructor(options?: GIFOptions);
    addFrame(canvas: HTMLCanvasElement | CanvasRenderingContext2D | ImageData, options?: { delay?: number; copy?: boolean }): void;
    on(event: 'progress' | 'finished' | 'abort', callback: (progress?: any) => void): void;
    render(): void;
    abort(): void;
  }

  export = GIF;
  export default GIF;
}

