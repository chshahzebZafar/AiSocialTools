/**
 * Curated collections - the directory's editorial layer.
 *
 * A category page answers "what video tools exist". A collection answers a
 * question someone actually types: "what can I use for free", "what runs on my
 * own machine". The difference is the reasoning - every pick below has a stated
 * reason, and every collection says what it deliberately left out.
 *
 * Picks reference slugs in lib/ai-directory.ts. A slug that no longer exists is
 * skipped at render rather than breaking the page, and the build check in
 * scripts/check-collections.mjs reports any that have gone missing.
 */

export interface CollectionPick {
  /** Slug of a curated directory entry. */
  slug: string;
  /** Why this one is on the list. The whole point of a collection. */
  why: string;
}

export interface DirectoryCollection {
  slug: string;
  /** The H1 - plain and readable on the page itself. */
  heading: string;
  /**
   * SERP title. Separate from the heading because the two jobs differ: the H1
   * reads as a page title, this one has to earn a click in 60 characters and
   * match the Title Case the rest of the site uses. Rendered with the current
   * year appended.
   */
  title: string;
  /** Meta description. */
  description: string;
  /** Editorial opening - two short paragraphs. */
  intro: string[];
  /** What qualified something for this list, stated plainly. */
  criteria: string[];
  picks: CollectionPick[];
  /** Honest note about what is not here and why. */
  caveat?: string;
}

export const directoryCollections: DirectoryCollection[] = [
  {
    slug: "free-ai-video-generators",
    title: "Free AI Video Generators — What Each Free Tier Gives",
    heading: "Free AI video generators",
    description:
      "AI video tools you can actually try without paying, with what each free tier really gives you and where the limits bite.",
    intro: [
      "Almost every AI video tool advertises a free tier, and almost none of them are free in the way you would hope. What you normally get is a small number of credits, a watermark, or a queue behind paying users. That is still useful for working out whether a tool suits you before spending anything.",
      "The list below is ordered by how far you can get without paying. Where a tool is free only for previews, it says so - a preview that lets you check the result before spending credits is worth more than a larger allowance of blind generations.",
    ],
    criteria: [
      "You can produce something without entering card details",
      "The free tier is usable for evaluation, not a 5-second teaser",
      "Limits are stated by the tool rather than discovered after signup",
    ],
    picks: [
      { slug: "kwaflux", why: "Free 1, 3 and 5 second previews before you buy, and processing runs on your own GPU rather than a credit balance. The most genuinely free option here if you are enhancing footage rather than generating it." },
      { slug: "luma-dream-machine", why: "A monthly free allowance of generations, no card needed to start. Good for testing motion quality on your own prompts." },
      { slug: "kling", why: "Daily free credits that refresh, so you can keep testing across several days without paying." },
      { slug: "hailuo", why: "Free generations on signup with reasonable clip quality, useful for comparing against Kling on the same prompt." },
      { slug: "pika", why: "Free tier with watermarked output - fine for checking whether the style fits before committing." },
      { slug: "runway", why: "A one-off free credit allowance rather than a recurring one. Worth spending deliberately on your hardest test case." },
      { slug: "genflick", why: "Free tier on a chat-driven workflow, which is a different way of working from prompt-per-clip tools and worth trying on that basis alone." },
      { slug: "vayovideo", why: "Free credits to start, aimed specifically at manga and comic styles rather than general video." },
    ],
    caveat:
      "Sora and Synthesia are not here because they have no free tier. FreyaVideo is credit-based pay-per-use with no free allowance, so it is also excluded despite having no subscription.",
  },
  {
    slug: "ai-coding-assistants",
    title: "AI Coding Assistants Compared — Editor, Terminal, Web",
    heading: "AI coding assistants",
    description:
      "Coding tools compared by how they fit your workflow - editor, terminal or browser - and how much you can review before they change anything.",
    intro: [
      "The useful split in this category is not model quality, since most tools can use the same underlying models. It is where the tool lives and how much control you keep. An editor extension suggests; a terminal agent edits across files and runs commands; a browser tool builds whole apps from a prompt.",
      "The more autonomy a tool has, the more it matters that you can see and approve what it did. Tools that show a diff before applying changes are safer to use on work that matters than ones that just act.",
    ],
    criteria: [
      "Actively maintained and in real use, not a demo",
      "Clear about what it can change and when",
      "Works with existing codebases rather than only new projects",
    ],
    picks: [
      { slug: "cursor", why: "An editor built around AI rather than an extension bolted on, with whole-repository context. The default choice for most people who want AI in their editor." },
      { slug: "github-copilot", why: "The most widely deployed option, and the easiest to get approved at a company that already uses GitHub. Strongest at in-line completion." },
      { slug: "windsurf", why: "Similar territory to Cursor with a different take on agentic editing. Worth trying if Cursor's flow does not suit you." },
      { slug: "cline", why: "Open source and runs inside VS Code, so you can see exactly what it is doing. Good when you want agentic edits without a closed black box." },
      { slug: "aider", why: "Terminal-based and open source, works directly with git so every change is a reviewable commit. The most transparent option here." },
      { slug: "codeium", why: "Free for individual use, which makes it the obvious starting point if you are not ready to pay for completion." },
      { slug: "sourcegraph-cody", why: "Built on code search, so it is stronger than most at answering questions about large unfamiliar codebases." },
      { slug: "v0", why: "Generates UI components rather than general code, and returns something you can paste into a React project." },
      { slug: "bolt-new", why: "Builds a running app in the browser from a prompt. Useful for prototypes, less so for joining an existing codebase." },
    ],
    caveat:
      "Devin is excluded on price rather than capability - it is priced for teams, not individuals. Tabnine and Amazon Q are both listed in the directory and worth a look if your employer already uses them.",
  },
  {
    slug: "open-source-ai-tools",
    title: "Open Source AI Tools — Self-Host, Inspect, Run Locally",
    heading: "Open source AI tools",
    description:
      "AI tools you can self-host, inspect or run without depending on a vendor staying in business or keeping its pricing.",
    intro: [
      "Open source matters here for two practical reasons rather than ideological ones. You can run the tool on your own hardware, which keeps your data out of someone else's logs; and you are not exposed to a vendor changing its pricing, its terms or its mind.",
      "The trade is real: you take on setup, hardware and maintenance. For a model you run occasionally, a hosted API is usually cheaper. For something you run constantly, or on data you cannot send anywhere, this list is where to look.",
    ],
    criteria: [
      "Weights or source are genuinely available, not just an open-ish licence",
      "Can be run independently of the vendor's hosted service",
      "Actively maintained",
    ],
    picks: [
      { slug: "stable-diffusion", why: "The image model that made local generation practical. Runs on consumer hardware and has the largest ecosystem of extensions and fine-tunes of anything here." },
      { slug: "flux", why: "Stronger prompt adherence than Stable Diffusion for many prompts, and open weights. The current default for people who want quality locally." },
      { slug: "deepseek", why: "Open-weight language models that are competitive with hosted commercial models, and cheap to run via API if you do not want to host." },
      { slug: "qwen", why: "Open-weight models with notably good multilingual coverage, which matters if you work outside English." },
      { slug: "stable-audio", why: "Open audio generation, useful when licensing of generated music matters and you need to know exactly what produced it." },
      { slug: "cline", why: "Open source coding agent inside VS Code - you can read what it does before letting it edit your repository." },
      { slug: "aider", why: "Open source terminal coding agent that works through git, so every change it makes is inspectable and revertible." },
    ],
  },
  {
    slug: "ai-tools-that-run-locally",
    title: "AI Tools That Run Locally — Nothing Leaves Your Machine",
    heading: "AI tools that run on your own machine",
    description:
      "Tools that process your files, footage or audio locally, so nothing gets uploaded to someone else's servers.",
    intro: [
      "Most AI tools send your input to a server. That is fine for a blog draft and a problem for client footage, medical notes, unreleased work or anything covered by a confidentiality agreement. The tools here do the processing on your own hardware.",
      "Local processing usually costs you speed and convenience, and sometimes quality. What you get back is that the question of where your data went does not arise, which for some work is not a trade at all.",
    ],
    criteria: [
      "Processing happens on your device, not a server",
      "The tool says so explicitly rather than leaving it ambiguous",
      "Local operation is the normal mode, not a paid enterprise add-on",
    ],
    picks: [
      { slug: "kwaflux", why: "Video upscaling, restoration and stabilisation on your own GPU. Nothing is uploaded, which matters when the footage is a client's." },
      { slug: "puppyone", why: "Local-first workspace that keeps documents, notes and AI output together on your machine, with version history for every AI-made change." },
      { slug: "mightymouse", why: "Dictation transcribed locally on the Mac with Whisper - speech never leaves the device, unlike most dictation tools." },
      { slug: "stable-diffusion", why: "Image generation entirely on your own hardware, with no per-image cost and no prompt log on someone else's server." },
      { slug: "slopspot-pro", why: "A Chrome extension that checks text for AI writing tells locally, so drafts you are reviewing are not sent anywhere." },
      { slug: "yuan-doctor", why: "Clinical calculators that compute in the browser with no data upload - the right design for anything touching patient information." },
      { slug: "rules-health-check", why: "Scores your AGENTS.md or .cursorrules in the browser, so a file describing your private repo setup stays with you." },
      { slug: "aider", why: "Runs in your terminal against your local git repository. Your code only goes to whichever model API you choose to point it at." },
    ],
  },
  {
    slug: "ai-tools-for-recruiters",
    title: "AI Tools for Recruiters — Sourcing, Screening, Hiring",
    heading: "AI tools for recruiters",
    description:
      "Sourcing, screening and hiring tools, with a note on where automated decisions carry legal weight.",
    intro: [
      "Recruiting tools fall into three jobs: finding candidates, screening the ones who apply, and running the process. Most products claim all three and are genuinely good at one, so it is worth being clear which problem you actually have.",
      "One thing applies across the whole category. Automated screening is regulated in a growing number of jurisdictions, and a tool that produces a ranking without showing its reasoning leaves you unable to explain a decision that a candidate is entitled to question. Prefer tools that show the evidence behind a score.",
    ],
    criteria: [
      "Built for recruiting rather than a general tool with a hiring template",
      "Clear about whether it screens, ranks or decides",
      "Evidence behind scores where scoring is involved",
    ],
    picks: [
      { slug: "resumerank-pro", why: "Ranks a batch of CVs against a job description and shows the skills evidence behind each score, including verified years per skill - so a shortlist can be checked rather than trusted." },
      { slug: "levelup-it", why: "A sourcing database rather than a screener: 1.2M+ IT CVs with contact details, for reaching out to people who have not applied." },
      { slug: "neverapply", why: "Sits on the candidate side, not yours - included because it is worth knowing that applications increasingly arrive from agents that tailor a CV per posting." },
      { slug: "hireez", why: "Sourcing and outreach across multiple channels, aimed at recruiters who spend most of their time finding rather than filtering." },
      { slug: "ashby", why: "An ATS with analytics built in rather than bolted on, suited to teams that want to measure the funnel properly." },
      { slug: "workable", why: "A broad ATS with wide job-board distribution - the practical choice when posting reach matters more than analytics depth." },
    ],
    caveat:
      "Nothing here removes your responsibility for a hiring decision. If a tool ranks candidates, you need to be able to explain why someone was filtered out.",
  },
  {
    slug: "free-ai-tools-no-signup",
    title: "AI Tools With No Signup — Free, No Account Needed",
    heading: "AI tools with no signup",
    description:
      "Tools you can open and use immediately - no account, no email, no card.",
    intro: [
      "Signup walls exist to capture an email before you know whether a tool is any good. The tools here skip that: open the page, use the thing, leave. For occasional one-off jobs that is often all you need.",
      "This is also the fastest way to evaluate a category. If two tools do the same job and one lets you try it in ten seconds, you will find out which is better far quicker.",
    ],
    criteria: [
      "Core function works without creating an account",
      "No card details at any point in normal use",
      "Not a trial that stops after one use",
    ],
    picks: [
      { slug: "toolsphare", why: "436+ browser utilities - PDF conversion, image editing, text formatting - with no signup on any of them." },
      { slug: "worldesk-fx", why: "FX recommendations across 17 currencies with no login required, which is unusual for anything finance-related." },
      { slug: "unifybench", why: "Model benchmark comparisons free to browse with no account, including the methodology behind the ranking." },
      { slug: "rules-health-check", why: "Paste a rules file, get a score and fixes. No account needed to try it." },
      { slug: "yuan-doctor", why: "Core clinical pathways work without a login, and calculations run in the browser." },
      { slug: "claude-resets", why: "A reset tracker you just read - nothing to sign up for at all." },
      { slug: "autodraw", why: "Google's sketch-to-icon tool, open and draw. One of the oldest examples of this pattern and still the clearest." },
    ],
    caveat:
      "Several tools in the directory offer a free preview without signup but require an account to export - DeepSwapAI and FaceSwapAI both work that way. They are not on this list because the useful half is behind the wall.",
  },
];

export function getCollectionBySlug(slug: string): DirectoryCollection | undefined {
  return directoryCollections.find((c) => c.slug === slug);
}
