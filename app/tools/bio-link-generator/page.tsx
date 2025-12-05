"use client";

import { useState } from "react";
import { LinkIcon, Copy, Download } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";

export default function BioLinkGeneratorPage() {
  const tool = getToolById("bio-link-generator");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [links, setLinks] = useState<Array<{ title: string; url: string }>>([
    { title: "", url: "" }
  ]);
  const [bioTitle, setBioTitle] = useState("My Links");
  const [bioDescription, setBioDescription] = useState("");

  const addLink = () => {
    setLinks([...links, { title: "", url: "" }]);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, field: "title" | "url", value: string) => {
    const updated = [...links];
    updated[index][field] = value;
    setLinks(updated);
  };

  const generateHTML = () => {
    const linksHTML = links
      .filter(link => link.title && link.url)
      .map(link => `  <a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.title}</a>`)
      .join("\n");

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${bioTitle}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }
    .container {
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 { margin-top: 0; color: #333; }
    p { color: #666; margin-bottom: 30px; }
    a {
      display: block;
      padding: 15px 20px;
      margin: 10px 0;
      background: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 10px;
      text-align: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    a:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${bioTitle}</h1>
    ${bioDescription ? `<p>${bioDescription}</p>` : ""}
${linksHTML}
  </div>
</body>
</html>`;
  };

  const copyHTML = () => {
    navigator.clipboard.writeText(generateHTML());
    alert("HTML copied to clipboard!");
  };

  const downloadHTML = () => {
    const blob = new Blob([generateHTML()], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bio-link.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
            <LinkIcon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">Bio Link Generator - Create Link in Bio Page Free</h1>
            <p className="text-slate-600">Create a custom link in bio page for Instagram, TikTok, and Twitter. Free bio link generator with multiple links. Build your own linktree-style page instantly.</p>
          </div>
        </div>
        <div className="mt-4">
          <ShareButtons
            title="Bio Link Generator"
            text="Check out this free bio link generator tool!"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Page Title
            </label>
            <input
              type="text"
              value={bioTitle}
              onChange={(e) => setBioTitle(e.target.value)}
              placeholder="My Links"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-4"
            />

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={bioDescription}
              onChange={(e) => setBioDescription(e.target.value)}
              placeholder="Add a description..."
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none mb-4"
            />

            <h3 className="text-sm font-medium text-slate-700 mb-3">Links</h3>
            <div className="space-y-3">
              {links.map((link, index) => (
                <div key={index} className="p-3 border border-slate-200 rounded-lg">
                  <input
                    type="text"
                    value={link.title}
                    onChange={(e) => updateLink(index, "title", e.target.value)}
                    placeholder="Link title"
                    className="w-full px-3 py-2 border border-slate-300 rounded mb-2 text-sm"
                  />
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateLink(index, "url", e.target.value)}
                      placeholder="https://..."
                      className="flex-1 px-3 py-2 border border-slate-300 rounded text-sm"
                    />
                    {links.length > 1 && (
                      <button
                        onClick={() => removeLink(index)}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={addLink}
              className="mt-3 w-full px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm"
            >
              + Add Link
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Preview</h2>
            <div className="flex gap-2">
              <button
                onClick={copyHTML}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="Copy HTML"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button
                onClick={downloadHTML}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="Download HTML"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
          {links.filter(l => l.title && l.url).length > 0 && (
            <div className="mb-4 pb-4 border-b border-slate-200">
              <ShareButtons
                title="Bio Link Generator"
                text={`Check out my bio link page: ${bioTitle}`}
              />
            </div>
          )}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 min-h-[300px]">
            {links.filter(l => l.title && l.url).length > 0 ? (
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">{bioTitle || "My Links"}</h3>
                {bioDescription && <p className="text-sm text-slate-600 mb-4">{bioDescription}</p>}
                <div className="space-y-2">
                  {links
                    .filter(link => link.title && link.url)
                    .map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 bg-indigo-600 text-white rounded-lg text-center hover:bg-indigo-700 transition-colors"
                      >
                        {link.title}
                      </a>
                    ))}
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-center py-8">Add links to see preview</p>
            )}
          </div>
        </div>
      </div>

      {tool && <ToolComments toolId={tool.id} />}
      {tool && <ToolFAQ tool={tool} />}
      {tool && <RelatedTools currentTool={tool} />}
      {tool && <ToolDetailsSection tool={tool} />}
    </div>
    </>
  );
}

