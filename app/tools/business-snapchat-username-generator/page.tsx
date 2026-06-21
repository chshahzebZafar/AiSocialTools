"use client";

import SnapUsernameTool from "@/components/snapchat/SnapUsernameTool";

export default function BusinessSnapchatUsernameGeneratorPage() {
  return (
    <SnapUsernameTool
      toolId="business-snapchat-username-generator"
      styleKey="business"
      title="Business Snapchat Username Generator — Brandable Ideas"
      heroDescription="Generate professional, brandable Snapchat usernames for your business or creator account. Snapchat-valid handles, ready to copy."
      shareTitle="Business Snapchat Username Generator"
      shareText="Free business Snapchat username generator — professional, brandable handles."
      intro="Building a brand on Snapchat? This generator turns your business name or keyword into clean, professional handles using tags like official, studio, hq and co — each one checked against Snapchat's username rules so it's ready for your storefront, ads, and Snapcode."
      namePlaceholder="e.g. acme, glow, brew"
    />
  );
}
