"use client";

import { useMemo, useState } from "react";
import { Linkedin, Copy, Check, RefreshCw } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import ShareButtons from "@/components/ShareButtons";
import { FavoriteButton } from "@/components/FavoriteButton";

const MAX_CHARS = 220;

interface Inputs {
  role: string;
  industry: string;
  skills: string;
  outcome: string;
  audience: string;
}

function clampLen(s: string): string {
  if (s.length <= MAX_CHARS) return s;
  return s.slice(0, MAX_CHARS - 1).trimEnd() + "…";
}

function buildHeadlines(i: Inputs): string[] {
  const role = i.role.trim();
  const industry = i.industry.trim();
  const skills = i.skills.trim();
  const outcome = i.outcome.trim();
  const audience = i.audience.trim();

  if (!role) return [];

  const skillsShort = skills.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 3).join(" • ");
  const out: string[] = [];

  const push = (s: string) => out.push(clampLen(s));

  push(`${role}${industry ? ` in ${industry}` : ""}${outcome ? ` | ${outcome}` : ""}${skillsShort ? ` | ${skillsShort}` : ""}`);
  if (audience) push(`${role} helping ${audience}${outcome ? ` ${outcome.toLowerCase()}` : " grow"}`);
  if (outcome) push(`${role} | ${outcome}${skillsShort ? ` | ${skillsShort}` : ""}`);
  if (audience && outcome) push(`I help ${audience} ${outcome.toLowerCase()} | ${role}${industry ? ` in ${industry}` : ""}`);
  if (skillsShort) push(`${role} • ${skillsShort}${industry ? ` • ${industry}` : ""}`);
  push(`${role}${industry ? ` | ${industry}` : ""} — ${outcome || "open to new opportunities"}`);
  if (audience) push(`${role} for ${audience}${skillsShort ? ` | ${skillsShort}` : ""}`);
  push(`Experienced ${role}${industry ? ` in ${industry}` : ""}${outcome ? ` focused on ${outcome.toLowerCase()}` : ""}`);
  if (outcome) push(`${outcome} • ${role}${skillsShort ? ` • ${skillsShort}` : ""}`);
  if (audience) push(`${role} → ${audience}${outcome ? ` | ${outcome}` : ""}`);
  push(`${role}${skillsShort ? ` | ${skillsShort}` : ""}${industry ? ` | ${industry} specialist` : ""}`);
  if (outcome) push(`Turning ${industry ? `${industry} challenges` : "ideas"} into ${outcome.toLowerCase()} | ${role}`);
  push(`🚀 ${role}${industry ? ` in ${industry}` : ""}${outcome ? ` | ${outcome}` : ""}`);
  push(`${role} | ${industry || "Professional"}${outcome ? ` | ${outcome}` : ""}${skillsShort ? ` | ${skillsShort}` : ""}`);
  if (audience && skillsShort) push(`Helping ${audience} with ${skillsShort} | ${role}`);
  if (outcome) push(`${role} | Builder of ${outcome.toLowerCase()}${industry ? ` in ${industry}` : ""}`);

  return Array.from(new Set(out.filter((s) => s.trim().length > role.length)));
}

export default function LinkedInHeadlineGeneratorPage() {
  const tool = getToolById("linkedin-headline-generator");
  const [inputs, setInputs] = useState<Inputs>({ role: "", industry: "", skills: "", outcome: "", audience: "" });
  const [copied, setCopied] = useState<string | null>(null);

  const update = <K extends keyof Inputs>(k: K, v: string) => setInputs((prev) => ({ ...prev, [k]: v }));

  const headlines = useMemo(() => buildHeadlines(inputs), [inputs]);

  const copy = async (h: string) => {
    await navigator.clipboard.writeText(h);
    setCopied(h);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#0A66C2] rounded-lg flex items-center justify-center">
              <Linkedin className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                LinkedIn Headline Generator — 15+ Free Professional Headlines
              </h1>
              <p className="text-slate-600 dark:text-slate-300">
                Tell us your role, expertise, and who you help — get 15+ LinkedIn headline variations instantly. Every suggestion stays under the 220-character limit and follows what recruiters search for in 2026.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            {tool && <FavoriteButton toolId={tool.id} />}
            <ShareButtons title="LinkedIn Headline Generator" text="Free LinkedIn headline generator, 15+ variations." />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6 space-y-4">
          <Field label="Your role / job title (required)">
            <input value={inputs.role} onChange={(e) => update("role", e.target.value)} placeholder="e.g. Product Designer" className="field" />
          </Field>
          <Field label="Industry">
            <input value={inputs.industry} onChange={(e) => update("industry", e.target.value)} placeholder="e.g. B2B SaaS" className="field" />
          </Field>
          <Field label="Top skills (comma separated)">
            <input value={inputs.skills} onChange={(e) => update("skills", e.target.value)} placeholder="e.g. Figma, UX Research, Design Systems" className="field" />
          </Field>
          <Field label="Who do you help?">
            <input value={inputs.audience} onChange={(e) => update("audience", e.target.value)} placeholder="e.g. early-stage startups" className="field" />
          </Field>
          <Field label="Outcome you deliver">
            <input value={inputs.outcome} onChange={(e) => update("outcome", e.target.value)} placeholder="e.g. Shipping polished v1 products in weeks, not months" className="field" />
          </Field>
        </div>

        {headlines.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {headlines.length} headline variations
              </h2>
              <ShareButtons title="LinkedIn Headlines" text="Generated LinkedIn headlines" resultText={headlines.join("\n")} />
            </div>
            <div className="space-y-2">
              {headlines.map((h) => (
                <div key={h} className="border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-900/40 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-800 dark:text-slate-100">{h}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{h.length} / {MAX_CHARS} chars</p>
                  </div>
                  <button
                    onClick={() => copy(h)}
                    className="text-xs px-3 py-1.5 rounded border border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700 flex items-center gap-1 flex-shrink-0"
                  >
                    {copied === h ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                    {copied === h ? "Copied" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setInputs({ ...inputs })}
              className="mt-4 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Tweak inputs to see new variations
            </button>
          </div>
        )}

        {tool && <ToolComments toolId={tool.id} />}
        {tool && <ToolFAQ tool={tool} />}
        {tool && <RelatedTools currentTool={tool} />}
        {tool && <ToolDetailsSection tool={tool} />}
      </div>

      <style jsx>{`
        .field {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid rgb(203 213 225);
          background: white;
          border-radius: 0.5rem;
          outline: none;
        }
        :global(.dark) .field {
          background: rgb(15 23 42);
          border-color: rgb(71 85 105);
          color: rgb(241 245 249);
        }
        .field:focus {
          box-shadow: 0 0 0 2px #0A66C2;
          border-color: #0A66C2;
        }
      `}</style>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">{label}</label>
      {children}
    </div>
  );
}
