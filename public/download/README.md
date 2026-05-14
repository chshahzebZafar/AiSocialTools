# Desktop App Downloads

This folder contains the desktop app builds for distribution.

## Files to place here:

### Windows
- `ai-social-tools-windows-1.0.0.exe` - Windows installer (64-bit)
- Supports: Windows 10, Windows 11

### macOS  
- `ai-social-tools-mac-1.0.0.dmg` - macOS disk image
- Supports: macOS 11+ (Intel & Apple Silicon)

## How to build:

Run from project root:
```bash
npm run electron:build
```

The built files will be in `release/` folder. Copy the appropriate files here for web distribution.

## Download URLs:

- Windows: https://aisocialtools.co/download/ai-social-tools-windows-1.0.0.exe
- Mac: https://aisocialtools.co/download/ai-social-tools-mac-1.0.0.dmg
