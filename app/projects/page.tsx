import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import {
  ArrowUpRight,
  Globe,
  Smartphone,
  Layout,
  Github,
} from "lucide-react";
import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Projects — Shahzeb Zafar",
  description:
    "A collection of apps, websites, and side projects built by Shahzeb Zafar — from social media tools to mobile apps and SaaS products.",
  alternates: { canonical: "https://aisocialtools.co/projects" },
  openGraph: {
    title: "Projects — Shahzeb Zafar",
    description:
      "A collection of apps, websites, and side projects built by Shahzeb Zafar — from social media tools to mobile apps and SaaS products.",
    type: "website",
    url: "https://aisocialtools.co/projects",
    siteName: "AISocialTools",
    images: [{ url: getOGImageUrl("default"), width: 1200, height: 630, alt: "Projects — Shahzeb Zafar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Shahzeb Zafar",
    description:
      "Apps, websites, and side projects built by Shahzeb Zafar — social media tools, mobile apps, and SaaS products.",
    images: [getOGImageUrl("default")],
  },
};

type ProjectStatus = "Live" | "Coming Soon" | "In Progress" | "Open Source";
type ProjectType = "Website" | "Mobile App" | "SaaS" | "Tool" | "API";

interface Project {
  name: string;
  tagline: string;
  description: string;
  url?: string;
  github?: string;
  type: ProjectType;
  status: ProjectStatus;
  tags: string[];
  year: number;
}

const projects: Project[] = [
  {
    name: "Social Media Tools",
    tagline: "40+ free browser-based tools for creators.",
    description:
      "A growing directory of free social media tools — tweet generators, Instagram captions, YouTube thumbnail downloaders, hashtag generators, and more. No signup, no tracking, runs 100% in the browser.",
    url: "https://aisocialtools.co",
    type: "Website",
    status: "Live",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    year: 2024,
  },
  {
    name: "AI Directory",
    tagline: "Curated directory of 100+ AI tools.",
    description:
      "A hand-curated, fully detailed directory of the best AI tools across every category — with pricing, pros/cons, alternatives, and verified badges.",
    url: "https://aisocialtools.co/ai-directory",
    type: "Tool",
    status: "Live",
    tags: ["Next.js", "TypeScript", "SEO"],
    year: 2025,
  },
  {
    name: "QuickBio App",
    tagline: "Generate a stunning bio in seconds.",
    description:
      "A mobile app that uses AI to craft personalized bios for Twitter, Instagram, LinkedIn, and more. Pick a tone, fill in a few fields, copy your bio.",
    type: "Mobile App",
    status: "Coming Soon",
    tags: ["React Native", "OpenAI", "Expo"],
    year: 2025,
  },
  {
    name: "LinkSnap",
    tagline: "Smart link-in-bio for creators.",
    description:
      "A clean, analytics-powered link-in-bio page builder designed for content creators. Custom domains, click tracking, and social integrations built in.",
    type: "SaaS",
    status: "Coming Soon",
    tags: ["Next.js", "Supabase", "Stripe"],
    year: 2025,
  },
  {
    name: "DevPulse",
    tagline: "GitHub activity dashboard for indie hackers.",
    description:
      "Visualise your coding streaks, commit history, repo stats, and language breakdown — all in one beautiful dashboard synced with your GitHub account.",
    type: "Website",
    status: "In Progress",
    tags: ["Next.js", "GitHub API", "Recharts"],
    year: 2025,
  },
  {
    name: "HashTag Pro",
    tagline: "AI hashtag research for any niche.",
    description:
      "Enter a topic and get a ranked list of hashtags sorted by reach, engagement, and competition — with trend graphs and clipboard export.",
    type: "Tool",
    status: "Coming Soon",
    tags: ["Python", "FastAPI", "React"],
    year: 2025,
  },
];

const TYPE_ICONS: Record<ProjectType, typeof Globe> = {
  Website:      Globe,
  "Mobile App": Smartphone,
  SaaS:         Layout,
  Tool:         Layout,
  API:          Github,
};

const STATUS_STYLES: Record<ProjectStatus, string> = {
  "Live":        "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "Coming Soon": "bg-amber-50   text-amber-700   border border-amber-200",
  "In Progress": "bg-sky-50     text-sky-700     border border-sky-200",
  "Open Source": "bg-indigo-50  text-indigo-700  border border-indigo-200",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",     item: "https://aisocialtools.co" },
    { "@type": "ListItem", position: 2, name: "Projects", item: "https://aisocialtools.co/projects" },
  ],
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
          <div className="aurora" aria-hidden />
          <div className="absolute inset-0 bg-dot-grid-animated opacity-50" aria-hidden />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <Breadcrumbs embedded />
            <Badge variant="accent" className="mb-5">
              Projects
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-zinc-950 dark:text-white tracking-tight leading-[1.05] mb-5">
              Things I&apos;ve built.
              <br />
              <span className="text-zinc-500 dark:text-zinc-400">Apps, tools &amp; experiments.</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
              A living list of every project I&apos;ve shipped — websites, mobile apps, SaaS
              products, and open-source tools. Each one built to solve a real problem.
            </p>
          </div>
        </section>

        {/* Project grid */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="flex items-center gap-2 mb-10 flex-wrap">
              <span className="text-sm text-zinc-500 dark:text-zinc-500 mr-1">
                {projects.length} project{projects.length !== 1 ? "s" : ""}
              </span>
              {(["Website", "Mobile App", "SaaS", "Tool", "API"] as ProjectType[]).map((t) => {
                const count = projects.filter((p) => p.type === t).length;
                if (!count) return null;
                return (
                  <span
                    key={t}
                    className="inline-flex items-center h-6 px-2.5 rounded-full text-[11px] font-medium bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
                  >
                    {t} · {count}
                  </span>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((project) => {
                const Icon = TYPE_ICONS[project.type];
                const isLive = project.status === "Live";
                return (
                  <div
                    key={project.name}
                    className="group relative flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all duration-200"
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-10 h-10 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:bg-indigo-50 group-hover:border-indigo-200 group-hover:text-indigo-600 dark:group-hover:bg-indigo-500/10 dark:group-hover:border-indigo-500/30 dark:group-hover:text-indigo-400 transition-colors flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center h-5 px-2 rounded-full text-[10px] font-semibold ${STATUS_STYLES[project.status]}`}>
                          {project.status}
                        </span>
                        <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-base font-semibold text-zinc-950 dark:text-white mb-1 tracking-tight">
                      {project.name}
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1 font-medium">
                      {project.tagline}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5 flex-1">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-2 py-0.5 text-[10px] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                      {isLive && project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-medium transition-colors"
                        >
                          Visit
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center h-8 px-3 rounded-md border border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 text-xs cursor-not-allowed select-none">
                          Coming soon
                        </span>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-950 dark:hover:text-white text-xs font-medium transition-colors"
                        >
                          <Github className="w-3 h-3" />
                          Source
                        </a>
                      )}
                      <span className="ml-auto text-[11px] text-zinc-400 dark:text-zinc-600 uppercase tracking-wide">
                        {project.type}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-zinc-950 dark:bg-zinc-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">
              Have a project idea?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto leading-relaxed">
              I&apos;m always open to collaborations, freelance work, or just a good
              conversation about something worth building.
            </p>
            <ButtonLink href="/contact" variant="primary" size="lg">
              Get in touch
              <ArrowUpRight className="w-4 h-4" />
            </ButtonLink>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
