"use client";

import {
  Braces,
  Hash,
  Link2,
  Fingerprint,
  KeyRound,
  Code2,
  FileCode,
} from "lucide-react";
import {
  ComingSoonCategoryPage,
  type PlannedTool,
} from "@/components/ComingSoonCategoryPage";

const plannedTools: PlannedTool[] = [
  {
    icon: Braces,
    name: "JSON Formatter & Validator",
    description:
      "Pretty-print, minify, and validate JSON with syntax errors highlighted at the exact line.",
  },
  {
    icon: KeyRound,
    name: "Base64 Encoder / Decoder",
    description:
      "Text ↔ Base64 (and Base64URL) with file support up to 50MB, all client-side.",
  },
  {
    icon: Link2,
    name: "URL Encoder / Decoder",
    description:
      "Encode/decode URI components with batch support and component-by-component breakdown.",
  },
  {
    icon: Fingerprint,
    name: "UUID Generator",
    description:
      "UUID v1, v4, v7 in any count. Copy as JSON, CSV, or one per line.",
  },
  {
    icon: Hash,
    name: "Hash Generator",
    description:
      "MD5, SHA-1, SHA-256, SHA-512 — for text or files. Compare two hashes side-by-side.",
  },
  {
    icon: FileCode,
    name: "Regex Tester",
    description:
      "Live regex matching with capture groups, common flags, and a library of well-known patterns.",
  },
];

export default function DeveloperToolsPage() {
  return (
    <ComingSoonCategoryPage
      slug="developer"
      shortName="Developer"
      longName="Developer Tools"
      launchWindow="Q2 2026"
      Icon={Code2}
      headline={{ first: "Dev utilities,", second: "without the IDE." }}
      subheadline="Free formatters, encoders, generators, and validators every developer needs daily. Client-side only — your code and data never touch a server."
      plannedToolsHeading="Six tools to start."
      plannedToolsBlurb="The most-opened tabs in every developer's browser. More will follow based on what you tell us you need."
      plannedTools={plannedTools}
      suggestHeading="Got a utility you keep recreating?"
      suggestBlurb="If you've written the same one-off script three times this month, it should be a tool here. Tell us what you're tired of rewriting."
    />
  );
}
