"use client";

import {
  Braces,
  Hash,
  Link2,
  Fingerprint,
  KeyRound,
  Code2,
  FileCode,
  Network,
  ShieldCheck,
  Zap,
  Wifi,
  ArrowLeftRight,
} from "lucide-react";
import {
  ComingSoonCategoryPage,
  type PlannedTool,
} from "@/components/ComingSoonCategoryPage";

const plannedTools: PlannedTool[] = [
  { icon: Braces, name: "JSON Formatter & Validator", description: "Pretty-print, minify, and validate JSON with syntax errors highlighted at the exact line." },
  { icon: KeyRound, name: "Base64 Encode / Decode", description: "Text ↔ Base64 (and Base64URL) with file support up to 50MB, all client-side." },
  { icon: Link2, name: "URL Encode / Decode", description: "Encode/decode URI components with batch support and component-by-component breakdown." },
  { icon: Fingerprint, name: "UUID Generator", description: "UUID v1, v4, v7 in any count. Copy as JSON, CSV, or one per line." },
  { icon: Hash, name: "Hash Generator", description: "MD5, SHA-1, SHA-256, SHA-512 — for text or files. Compare two hashes side-by-side." },
  { icon: FileCode, name: "Regex Tester", description: "Live regex matching with capture groups, common flags, and a library of well-known patterns." },
  { icon: Network, name: "IP Subnet Calculator", description: "CIDR subnet calculator — network address, broadcast, host range, and usable IPs." },
  { icon: ShieldCheck, name: "Password Generator", description: "Cryptographically secure passwords with custom length, character sets, and bulk generation." },
  { icon: Zap, name: "Voltage Drop Calculator", description: "Voltage drop over wire length given gauge, current, and material — NEC compliant." },
  { icon: Zap, name: "Resistor Calculator", description: "Decode resistor color bands (3, 4, 5, 6-band) and calculate series/parallel combinations." },
  { icon: Zap, name: "Ohms Law Calculator", description: "Solve for voltage, current, resistance, or power given any two known values." },
  { icon: Zap, name: "Electricity Calculator", description: "Calculate kWh usage and electricity cost for any appliance given wattage and hours." },
  { icon: Wifi, name: "Bandwidth Calculator", description: "Calculate download/upload time, required bandwidth, and data usage for any file size or speed." },
  { icon: ArrowLeftRight, name: "Conversion Calculator", description: "Universal unit converter — length, weight, volume, temperature, speed, area, and more." },
];

export default function DeveloperToolsPage() {
  return (
    <ComingSoonCategoryPage
      slug="developer"
      shortName="Developer"
      longName="Developer Tools"
      launchWindow="2026"
      Icon={Code2}
      headline={{ first: "Dev utilities,", second: "without the IDE." }}
      subheadline="Free formatters, encoders, generators, validators, and network calculators every developer needs daily. Client-side only — your code and data never touch a server."
      plannedToolsHeading="14 tools on the way."
      plannedToolsBlurb="The most-opened tabs in every developer's browser — plus networking and electronics calculators. More will follow based on what you need."
      plannedTools={plannedTools}
      suggestHeading="Got a utility you keep recreating?"
      suggestBlurb="If you've written the same one-off script three times this month, it should be a tool here. Tell us what you're tired of rewriting."
    />
  );
}
