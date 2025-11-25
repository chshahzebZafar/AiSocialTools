# Open Graph Image Creation Guide

## Image Specifications

- **Dimensions**: 1200 x 630 pixels (1.91:1 aspect ratio)
- **Format**: JPG or PNG
- **File Size**: Under 1MB (optimize for web)
- **Text Size**: Minimum 60px for readability
- **Safe Zone**: Keep important content within 1120x550px (40px margin on all sides)

## Required Images

Create the following OG images and place them in the `/public` folder:

1. **og-image.jpg** - Homepage OG image
   - Title: "Social Media Tools"
   - Subtitle: "Free Online Tools for Social Media"
   - Include: Logo, tagline, visual elements

2. **og-tools.jpg** - Tools listing page OG image
   - Title: "All Social Media Tools"
   - Subtitle: "Free Online Tools Collection"
   - Include: Tool icons, category visuals

3. **og-default.jpg** - Default OG image for all other pages
   - Title: "Social Media Tools"
   - Subtitle: "Free Online Tools"
   - Include: Generic branding

## Design Tips

1. **Use High Contrast**: Text should be easily readable
2. **Brand Colors**: Use your brand colors consistently
3. **Include Logo**: Place logo prominently
4. **Keep It Simple**: Don't overcrowd the image
5. **Test on Social Platforms**: Preview how it looks on Facebook, Twitter, LinkedIn

## Tools for Creating OG Images

- **AI Image Generators** (Recommended):
  - DALL-E (via ChatGPT): Use prompts from `OG_IMAGE_PROMPTS.md`
  - Midjourney: Professional quality results
  - Stable Diffusion: Free and open-source
  - Canva AI: Easy-to-use with templates
  
- **Design Tools**:
  - **Figma**: Free design tool (https://figma.com)
  - **Canva**: Easy-to-use template tool (https://canva.com)
  - **Photoshop**: Professional design software
  
- **Online Generators**: 
  - Bannerbear (https://www.bannerbear.com/)
  - Cloudinary (https://cloudinary.com/)

**💡 Quick Start:** See `OG_IMAGE_PROMPTS.md` for ready-to-use AI prompts!

## Template Structure

```
┌─────────────────────────────────────────┐
│  [Logo]  Social Media Tools             │
│                                         │
│  Free Online Tools for Social Media    │
│                                         │
│  [Visual Elements/Icons]                │
│                                         │
│  100% Free • No Signup Required        │
└─────────────────────────────────────────┘
```

## After Creating Images

1. Place images in `/public` folder
2. Optimize images (use tools like TinyPNG or ImageOptim)
3. Update metadata in `app/layout.tsx` and `lib/seo-metadata.ts`
4. Test using:
   - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

