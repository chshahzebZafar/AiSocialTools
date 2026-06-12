"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Filter, Upload, Download } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolHero from "@/components/ToolHero";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import { getSEOMetadata } from "@/lib/seo-metadata";

export default function InstagramFiltersPage() {
  const tool = getToolById("instagram-filters");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filters = [
    { name: "Normal", class: "" },
    { name: "Clarendon", class: "brightness-110 contrast-125 saturate-110" },
    { name: "Gingham", class: "brightness-105 contrast-110 saturate-90" },
    { name: "Moon", class: "brightness-90 contrast-110 saturate-80 grayscale-20" },
    { name: "Lark", class: "brightness-110 contrast-105 saturate-125" },
    { name: "Reyes", class: "brightness-95 contrast-110 saturate-110 sepia-20" },
    { name: "Juno", class: "brightness-110 contrast-105 saturate-130" },
    { name: "Slumber", class: "brightness-95 contrast-110 saturate-90 sepia-10" },
    { name: "Crema", class: "brightness-105 contrast-110 saturate-115 sepia-15" },
    { name: "Ludwig", class: "brightness-110 contrast-120 saturate-110" },
    { name: "Aden", class: "brightness-105 contrast-105 saturate-120" },
    { name: "Perpetua", class: "brightness-110 contrast-105 saturate-110" },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadImage = async () => {
    if (!image || !selectedFilter) return;

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = image;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D | null;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = `instagram-filter-${selectedFilter}.png`;
        a.click();
      }
    } catch (error) {
      // Error logged for debugging
      if (process.env.NODE_ENV === 'development') {
        console.error("Error downloading image:", error);
      }
      alert("Failed to download image. Please try again.");
    }
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <ToolHero
        toolId={tool?.id}
        icon={Filter}
        iconGradient="from-purple-500 to-pink-500"
        title="Instagram Filters - Apply Photo Filters Online Free"
        description="Apply beautiful Instagram-style filters to your photos. Free Instagram filter tool with multiple filter options. Edit photos online, no app required."
        shareTitle="Instagram Filters"
        shareText="Check out this free Instagram filters tool!"
      />
      <div className="p-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            {!image ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center cursor-pointer hover:border-purple-500 transition-colors"
              >
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 mb-2">Click to upload an image</p>
                <p className="text-sm text-slate-500">PNG, JPG, or WEBP up to 10MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden border border-slate-200">
                  <img
                    src={image}
                    alt={`Instagram filter preview with ${selectedFilter || 'no'} filter applied`}
                    className={`w-full ${selectedFilter ? filters.find(f => f.name === selectedFilter)?.class || "" : ""}`}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Change Image
                  </button>
                  {selectedFilter && (
                    <button
                      onClick={downloadImage}
                      className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Filters</h2>
          <div className="grid grid-cols-2 gap-2">
            {filters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => setSelectedFilter(filter.name)}
                className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                  selectedFilter === filter.name
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SEO content */}
      <section className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">
          Instagram Filters: A Simple Guide to Improve Your Photos
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Instagram Filters are special effects that change the look of your photos and videos.
          They can make colors brighter, add warmth, improve lighting, or create a unique style.
          Many people use Instagram Filters to make their content more attractive and engaging.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          Today, social media users want their photos to stand out. With the help of Instagram
          photo filters, anyone can improve a simple picture in just a few seconds. Whether you
          are sharing travel photos, food pictures, or selfies, Instagram Filters can help create
          a better visual experience for your audience.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">Why Are Instagram Filters So Popular?</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          The popularity of Instagram Filters comes from their simplicity and effectiveness. Users
          do not need advanced editing skills to create beautiful images. A single filter can
          completely change the mood of a photo.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          Many creators use the best Instagram filters to maintain a consistent style across their
          profiles. This helps their content look professional and organized. In addition, many
          people use an Instagram filters app to access even more editing features before posting
          their images online.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">How Do Instagram Filters Work?</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Instagram Filters work by adjusting different elements of an image. They can change
          brightness, contrast, saturation, and color balance. These small adjustments can make a
          photo look more appealing.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          Different Instagram filters names represent different editing styles. Some filters create
          a warm and soft look, while others add dramatic contrast. By exploring various Instagram
          photo filters, users can find the style that matches their personality and content goals.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">Benefits of Using Instagram Filters</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Using Instagram Filters offers many advantages for both personal and business accounts.
          They help improve image quality and make posts more visually attractive. The best
          Instagram filters can also help create a strong brand identity, so followers easily
          recognize your content.
        </p>
        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Better Visual Appeal</h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          One major benefit of Instagram Filters is improved visual appeal. A simple photo can
          become more interesting with the right filter. Many popular Instagram photo filters are
          designed to make colors look richer and details more noticeable, which can help increase
          engagement.
        </p>
        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Save Time on Editing</h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          Editing photos manually can take a lot of time. Instagram Filters provide a quick solution
          for professional-looking results without spending hours editing. Pair them with our{" "}
          <Link href="/tools/image-resizer" className="text-purple-600 hover:text-purple-700 underline">
            Image Resizer
          </Link>{" "}
          to size every shot perfectly for the feed, stories, or reels, and the{" "}
          <Link href="/tools/image-compressor" className="text-purple-600 hover:text-purple-700 underline">
            Image Compressor
          </Link>{" "}
          to keep uploads fast.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">Choosing the Best Instagram Filters</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Finding the right Instagram Filters depends on the type of content you create. For example,
          travel photos often look great with bright and colorful Instagram photo filters, while
          portrait photos may benefit from softer effects. The best Instagram filters are the ones
          that match your content while keeping images natural and attractive.
        </p>
        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Consider Your Content Style</h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          Before selecting Instagram Filters, think about the message you want your photos to
          communicate. A business account may prefer clean and professional images, while a personal
          account may focus on creativity. Many creators test several Instagram filters names before
          settling on a style.
        </p>
        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Keep Your Feed Consistent</h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          Consistency makes your profile look organized and professional. Using the same best
          Instagram filters across your posts builds a recognizable visual identity. To take it
          further, match a consistent color theme with our{" "}
          <Link href="/tools/color-palette" className="text-purple-600 hover:text-purple-700 underline">
            Color Palette Generator
          </Link>{" "}
          and add stylish text with the{" "}
          <Link href="/tools/instagram-fonts" className="text-purple-600 hover:text-purple-700 underline">
            Instagram Font Generator
          </Link>
          .
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">Popular Types of Instagram Filters</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          There are many different types of Instagram Filters available today. Each one serves a
          unique purpose and creates a different visual effect.
        </p>
        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Bright and Colorful Filters</h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          Bright filters make images look lively and energetic. These Instagram Filters are commonly
          used for travel, food, and lifestyle content, and often increase saturation and brightness.
        </p>
        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Vintage Filters</h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          Vintage-style Instagram Filters create a nostalgic appearance with faded colors and softer
          tones. Several well-known Instagram filters names are designed to mimic old film photography.
        </p>
        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Black and White Filters</h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          Black and white Instagram Filters remove color and focus attention on shapes, textures, and
          emotions. Many photographers use these Instagram photo filters to create dramatic images.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">Using an Instagram Filters App</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          While Instagram provides built-in filters, many users also choose an Instagram filters app
          for extra editing tools, advanced adjustments, and unique effects. You can find more free,
          browser-based options in our{" "}
          <Link href="/tools/image-tools" className="text-purple-600 hover:text-purple-700 underline">
            image tools
          </Link>{" "}
          collection — no download required.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">Common Mistakes to Avoid</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Although Instagram Filters can improve photos, using them incorrectly may reduce image
          quality. One common mistake is applying very strong Instagram photo filters that make images
          look unrealistic. Another is changing styles too often. Sticking with a few of the best
          Instagram filters helps maintain consistency and a polished profile.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">Tips for Better Results with Instagram Filters</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          To get the best results from Instagram Filters, start with a high-quality photo. Good
          lighting and clear focus make any filter look better. Experiment with different Instagram
          filters names and compare the results. Combining editing tools with built-in Instagram
          features helps create polished, professional-looking content without making photos appear
          overly edited.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-3">Conclusion</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Instagram Filters are one of the easiest ways to improve your social media content. They
          help enhance colors, create visual consistency, and make photos more appealing. By exploring
          different Instagram photo filters, testing various Instagram filters names, and using the
          best Instagram filters for your content style, you can create a more professional and
          attractive Instagram profile. With the right approach, Instagram Filters can help anyone
          create engaging and visually impressive content.
        </p>
      </section>

      {tool && <ToolComments toolId={tool.id} />}
      {tool && <ToolFAQ tool={tool} />}
      {tool && <RelatedTools currentTool={tool} />}
      {tool && <ToolDetailsSection tool={tool} />}
    </div>
    </>
  );
}

