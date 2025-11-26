"use client";

import { useState } from "react";
import { CaseSensitive, Copy } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";

export default function TextCaseConverterPage() {
  const tool = getToolById("text-case-converter");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [text, setText] = useState("");

  const convertCase = (type: string) => {
    switch (type) {
      case "uppercase":
        return text.toUpperCase();
      case "lowercase":
        return text.toLowerCase();
      case "title":
        return text.replace(/\w\S*/g, (txt) =>
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
      case "sentence":
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      case "camel":
        return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
          index === 0 ? word.toLowerCase() : word.toUpperCase()
        ).replace(/\s+/g, "");
      case "pascal":
        return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) =>
          word.toUpperCase()
        ).replace(/\s+/g, "");
      case "snake":
        return text.toLowerCase().replace(/\s+/g, "_");
      case "kebab":
        return text.toLowerCase().replace(/\s+/g, "-");
      case "constant":
        return text.toUpperCase().replace(/\s+/g, "_");
      default:
        return text;
    }
  };

  const copyText = (converted: string) => {
    navigator.clipboard.writeText(converted);
    alert("Copied to clipboard!");
  };

  const cases = [
    { id: "uppercase", name: "UPPERCASE" },
    { id: "lowercase", name: "lowercase" },
    { id: "title", name: "Title Case" },
    { id: "sentence", name: "Sentence case" },
    { id: "camel", name: "camelCase" },
    { id: "pascal", name: "PascalCase" },
    { id: "snake", name: "snake_case" },
    { id: "kebab", name: "kebab-case" },
    { id: "constant", name: "CONSTANT_CASE" },
  ];

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
            <CaseSensitive className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">Text Case Converter - Convert Text to Uppercase, Lowercase, Title Case Free</h1>
            <p className="text-slate-600">Convert text to uppercase, lowercase, title case, camelCase, snake_case, and more. Free text case converter tool. Transform text formatting instantly for social media posts.</p>
          </div>
        </div>
        <div className="mt-4">
          <ShareButtons
            title="Text Case Converter"
            text="Check out this free text case converter tool!"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Enter Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
          rows={6}
        />
      </div>

      {text && (
        <div className="mb-4 pb-4 border-b border-slate-200">
          <ShareButtons
            title="Text Case Converter"
            text="Check out this text case converter tool!"
            resultText={text}
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cases.map((caseType) => {
          const converted = convertCase(caseType.id);
          return (
            <div
              key={caseType.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-900">{caseType.name}</h3>
                <button
                  onClick={() => copyText(converted)}
                  className="p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors"
                  title="Copy"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 min-h-[60px]">
                <p className="text-sm text-slate-800 break-words">
                  {converted || "Converted text will appear here"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {tool && <ToolFAQ tool={tool} />}
      {tool && <RelatedTools currentTool={tool} />}
      {tool && <ToolDetailsSection tool={tool} />}
    </div>
    </>
  );
}

