import type { AICategory } from "@/lib/ai-directory";

/**
 * Editorial content for the directory category pages.
 *
 * These pages are the directory's indexable surface. Until now the only
 * indexable directory URLs were /ai-directory and /ai-directory/submit -
 * category filtering was client-side, so "Video" produced no URL, nothing to
 * link to and nothing for Google to index.
 *
 * Each entry here is written by hand. Templated intros would recreate the thin
 * content problem the individual tool pages already have: a page that exists
 * only to hold a filter is not worth indexing.
 *
 * MIN_TOOLS_TO_INDEX below controls which of these get indexed.
 */

export interface DirectoryCategory {
  /** URL segment under /ai-directory/category/ */
  slug: string;
  /** Must match a value in AICategory exactly. */
  name: AICategory;
  /** Page heading and title base. */
  heading: string;
  /** Two short paragraphs of genuine orientation for someone browsing. */
  intro: string[];
  /** Practical things that actually separate good tools from bad here. */
  lookFor: string[];
}

/**
 * A category page needs enough reviewed tools to be worth reading. Below this
 * the page still works for visitors but is noindex, so we are not asking Google
 * to index a page with two entries on it.
 */
export const MIN_TOOLS_TO_INDEX = 5;

export const directoryCategories: DirectoryCategory[] = [
  {
    slug: "chat-writing",
    name: "Chat & Writing",
    heading: "AI Chat & Writing Tools",
    intro: [
      "This is the most crowded category in AI, and the one where the differences are smallest. Most writing tools sit on top of the same handful of underlying models, so what you are really choosing between is interface, context handling and price - not raw capability.",
      "The useful distinctions are practical. Does it keep your documents between sessions or make you paste everything again? Can it work from your own source material rather than inventing facts? Does it write in a voice you can edit, or produce prose you end up rewriting?",
    ],
    lookFor: [
      "Context window and whether previous work persists between sessions",
      "Whether it can ground answers in your own documents",
      "Export options - plain text and Markdown beat locked-in editors",
      "Per-seat pricing adds up fast for teams; check the free tier's real limits",
    ],
  },
  {
    slug: "image-generation",
    name: "Image Generation",
    heading: "AI Image Generation Tools",
    intro: [
      "Image tools split into two groups that look similar and are not. General generators turn a prompt into a picture. Specialised ones solve a specific job - product shots on a white background, consistent characters across a series, icons at a fixed size.",
      "If you need the same character or product to appear repeatedly, prompt-only tools will frustrate you. Consistency comes from reference images, LoRA training or a mode built for it, and that capability is worth more than raw image quality for most commercial work.",
    ],
    lookFor: [
      "Consistency features if you need a character, product or style to repeat",
      "Editing after generation - masks and inpainting beat regenerating from scratch",
      "Commercial licensing, especially for client work",
      "Output resolution and whether upscaling costs extra credits",
    ],
  },
  {
    slug: "video",
    name: "Video",
    heading: "AI Video Tools",
    intro: [
      "Video is where AI tools are changing fastest and where marketing claims are furthest ahead of results. Generation tools make short clips from prompts or stills; enhancement tools upscale, restore and stabilise footage you already have. The second group is far more reliable than the first.",
      "Costs matter more here than in any other category. Generation burns credits quickly, and a few seconds of unusable output still costs the same as usable output. Tools with free previews before you spend credits are worth seeking out.",
    ],
    lookFor: [
      "Clip length limits, which are often much shorter than the demos suggest",
      "Credit cost per second, and whether failed generations are refunded",
      "Whether previews are free before you commit credits",
      "Local processing if you are working with footage you cannot upload",
    ],
  },
  {
    slug: "audio-voice",
    name: "Audio & Voice",
    heading: "AI Audio & Voice Tools",
    intro: [
      "Audio tools cover three distinct jobs: generating speech, generating music, and editing existing audio. Voice cloning has become good enough to be indistinguishable in short clips, which makes consent and licensing a practical concern rather than a theoretical one.",
      "For editing work, the tools that earn their place solve problems that are genuinely tedious by hand - finding a seamless loop point, shortening a track without an obvious cut, cleaning up a noisy recording.",
    ],
    lookFor: [
      "Consent and licensing terms for voice cloning, particularly for commercial use",
      "Whether generated music is cleared for monetised video",
      "Output formats and sample rates if the audio goes into a professional workflow",
      "Latency, if you need it in real time rather than as a render",
    ],
  },
  {
    slug: "code",
    name: "Code",
    heading: "AI Coding Tools",
    intro: [
      "Coding tools have moved from autocomplete to agents that edit across files, run commands and open pull requests. That shift changes what matters: the question is no longer suggestion quality but how much context the tool has and how much you can verify before it acts.",
      "Editor integration is usually the deciding factor. A tool that lives where you already work gets used; one that needs a separate window does not, however good the model behind it is.",
    ],
    lookFor: [
      "How it handles repository context - whole project or just the open file",
      "Whether changes are reviewable before they are applied",
      "Data handling, especially for proprietary or client codebases",
      "Whether pricing is per seat, per request or usage-based",
    ],
  },
  {
    slug: "productivity",
    name: "Productivity",
    heading: "AI Productivity Tools",
    intro: [
      "The broadest category here, covering note-taking, file management, meeting capture, task handling and general assistants. The common failure is tools that add a step rather than remove one - another place to check, another inbox to clear.",
      "The ones that stick tend to work with the files and systems you already have rather than asking you to move into a new home for your work. Local-first tools are worth a look if you would rather not upload everything.",
    ],
    lookFor: [
      "Whether it works with your existing files or requires migration",
      "Where data is stored, and whether local-only is an option",
      "Export, so you can leave without losing your work",
      "Integrations with tools you already use, not just a long logo wall",
    ],
  },
  {
    slug: "marketing",
    name: "Marketing",
    heading: "AI Marketing Tools",
    intro: [
      "Marketing tools range from content generation to analytics, SEO and campaign automation. The category attracts a lot of thin products, because generating marketing copy is the easiest thing to build and the hardest to do well.",
      "The tools worth paying for usually have data behind them - real search data, real competitor tracking, real performance numbers - rather than a prompt wrapper that produces plausible copy nobody reads.",
    ],
    lookFor: [
      "Where the data comes from, and how often it refreshes",
      "Whether claims about results are measured or asserted",
      "Integration with your analytics, so you can tell if it worked",
      "Anything promising guaranteed rankings or placements is worth scepticism",
    ],
  },
  {
    slug: "research",
    name: "Research",
    heading: "AI Research Tools",
    intro: [
      "Research tools help find, read and summarise sources. The single most important feature is whether the tool shows you where a claim came from, because a confident summary with no citation is worse than useless for anything that matters.",
      "Good tools in this category make verification easy - linked sources, quoted passages, clear marking of what was inferred rather than found. That is the difference between a research assistant and a plausible-sounding guess.",
    ],
    lookFor: [
      "Citations that link to the actual source, not just a title",
      "Whether it tells you when it could not find something",
      "Coverage - which databases, papers or sites it can actually reach",
      "Export to a reference manager if you are writing something formal",
    ],
  },
  {
    slug: "design",
    name: "Design",
    heading: "AI Design Tools",
    intro: [
      "Design tools here cover interface mockups, brand assets, pattern and textile work, and production-ready output. The useful ones fit into an existing workflow - exporting to Figma, producing print-ready files, generating real repeats rather than pictures of repeats.",
      "Watch for tools that produce something that looks right in a screenshot but falls apart in production: patterns that do not actually tile, layouts that are images rather than editable components.",
    ],
    lookFor: [
      "Whether output is editable or a flat image",
      "Export formats that fit your pipeline - Figma, SVG, print-ready PDF",
      "For patterns and textiles, whether repeats genuinely tile seamlessly",
      "Licensing for commercial and client work",
    ],
  },
  {
    slug: "3d-animation",
    name: "3D & Animation",
    heading: "AI 3D & Animation Tools",
    intro: [
      "3D generation is earlier in its development than image or video. Text-to-3D output is usually a starting point rather than a finished asset, and how well it imports into Blender, Unity or Unreal matters more than how it looks in the preview.",
      "Topology is the thing people discover too late. A model that looks fine rendered can be unusable for animation if the mesh underneath is a mess.",
    ],
    lookFor: [
      "Mesh quality and topology, not just the rendered preview",
      "Export formats your pipeline accepts - glTF, FBX, OBJ",
      "Whether textures and materials come through intact",
      "Rigging support if the model needs to move",
    ],
  },
  {
    slug: "customer-support",
    name: "Customer Support",
    heading: "AI Customer Support Tools",
    intro: [
      "Support tools automate answers, route tickets and assist human agents. The decisive feature is the handover: what happens when the AI cannot help. A bot that traps people in a loop costs more goodwill than it saves in staffing.",
      "Grounding matters too. A support bot that answers from your actual documentation is useful; one that improvises answers about your product creates work rather than removing it.",
    ],
    lookFor: [
      "Handover to a human with the conversation context intact",
      "Whether answers are grounded in your documentation",
      "Pricing model - per resolution, per seat or per conversation changes the maths",
      "Reporting, so you can see what it got wrong",
    ],
  },
  {
    slug: "finance",
    name: "Finance",
    heading: "AI Finance Tools",
    intro: [
      "Finance tools cover bookkeeping, forecasting, currency and analysis. This is a category where you should be conservative: an AI tool that summarises your numbers is useful, one that makes decisions about them needs to be auditable.",
      "Nothing listed here is regulated financial advice, and a tool that talks like an adviser without being one is a reason to look elsewhere. Check what happens to your financial data and where it is stored.",
    ],
    lookFor: [
      "Whether outputs are explainable and auditable, not just a number",
      "Data handling and jurisdiction for financial records",
      "Integration with your accounting system",
      "Clear separation between information and advice",
    ],
  },
  {
    slug: "hr-recruiting",
    name: "HR & Recruiting",
    heading: "AI HR & Recruiting Tools",
    intro: [
      "Recruiting tools screen CVs, source candidates and automate parts of hiring. This category carries real legal weight: automated screening is regulated in a growing number of places, and 'the AI decided' is not a defence.",
      "The better tools show their reasoning - which skills matched, drawn from which part of the work history - so a human can check the shortlist rather than rubber-stamp it.",
    ],
    lookFor: [
      "Evidence behind each score, so decisions can be reviewed",
      "Bias testing and whatever compliance documentation exists",
      "Candidate data handling, retention and consent",
      "Whether it screens and ranks or actually decides",
    ],
  },
  {
    slug: "legal",
    name: "Legal",
    heading: "AI Legal Tools",
    intro: [
      "Legal tools review contracts, search case law and draft documents. Every one of them should be treated as a research assistant rather than a lawyer, and the responsible ones say so themselves.",
      "Citation accuracy is the thing to test first. Fabricated case references have caused real professional consequences, so a tool that links to the actual judgment is worth considerably more than one that summarises confidently.",
    ],
    lookFor: [
      "Citations that resolve to real, checkable sources",
      "Jurisdiction coverage - most tools are much stronger in one country",
      "Confidentiality terms for client documents",
      "Whether the tool is clear about not being legal advice",
    ],
  },
  {
    slug: "education",
    name: "Education",
    heading: "AI Education Tools",
    intro: [
      "Education tools cover studying, tutoring, lesson planning and assessment. For students, the useful distinction is between tools that give you an answer and tools that help you understand - comparing several model answers, showing working, prompting rather than telling.",
      "For teachers, the practical question is whether it saves preparation time without producing material you then have to check line by line.",
    ],
    lookFor: [
      "Whether it explains reasoning or just produces answers",
      "Accuracy in the subject you actually need, which varies enormously",
      "Age-appropriate handling and data rules if used with under-18s",
      "Institutional policies on AI use before relying on it for assessed work",
    ],
  },
  {
    slug: "data-analytics",
    name: "Data & Analytics",
    heading: "AI Data & Analytics Tools",
    intro: [
      "Analytics tools let you query data in plain language, build dashboards and spot patterns. The recurring risk is confident wrong answers: a chart is persuasive whether or not the query behind it was right.",
      "Tools that show the generated query, and let you correct it, are far safer than ones that hide the working and present a conclusion.",
    ],
    lookFor: [
      "Whether you can see and edit the underlying query",
      "Which data sources it connects to natively",
      "How it handles ambiguity - asking beats guessing",
      "Where your data goes during processing",
    ],
  },
  {
    slug: "social-media",
    name: "Social Media",
    heading: "AI Social Media Tools",
    intro: [
      "Social tools cover content creation, scheduling, listening and analytics. Platform APIs change often and restrictively, so anything promising full automation of posting or engagement is worth checking carefully against the platform's own rules.",
      "The tools that last tend to help with the work around posting - ideas, drafts, timing, measurement - rather than trying to operate an account on your behalf.",
    ],
    lookFor: [
      "Which platforms are genuinely supported, and via official APIs",
      "Whether the automation is within platform terms of service",
      "Source evidence behind any listening or trend claims",
      "Whether analytics come from the platform or are estimated",
    ],
  },
  {
    slug: "e-commerce",
    name: "E-commerce",
    heading: "AI E-commerce Tools",
    intro: [
      "E-commerce tools generate product imagery and descriptions, optimise listings and analyse pricing. Product photography is where AI has had the clearest practical impact - a generated white-background shot is often indistinguishable from a studio one.",
      "For copy, watch for tools producing near-identical descriptions across thousands of products. Marketplaces treat that as duplicate content, and it can cost you visibility rather than gain it.",
    ],
    lookFor: [
      "Whether imagery is accurate to the actual product, not idealised",
      "Marketplace rules on AI-generated imagery and copy",
      "Bulk handling if you have a large catalogue",
      "Integration with your store platform",
    ],
  },
  {
    slug: "security",
    name: "Security",
    heading: "AI Security Tools",
    intro: [
      "Security tools here cover threat detection, content moderation, deepfake detection and identity verification. Detection tools in particular should be judged on false positive and false negative rates, not on marketing accuracy figures.",
      "Deepfake detection is an arms race, and today's detector is weaker against tomorrow's generator. Treat any detection result as a signal rather than a verdict.",
    ],
    lookFor: [
      "Published accuracy figures with the test conditions stated",
      "False positive rate, which matters more than headline accuracy",
      "How often detection models are updated",
      "Whether results are explainable enough to act on",
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    heading: "AI Healthcare Tools",
    intro: [
      "Healthcare tools range from clinical reference material to consumer screeners and administrative automation. The line that matters is between information and diagnosis, and reputable tools state which side they are on.",
      "Nothing in this category is a substitute for a qualified clinician. Consumer screeners can be useful for deciding whether to seek an assessment; they are not the assessment.",
    ],
    lookFor: [
      "Explicit statements about what the tool is and is not for",
      "Whether patient data stays local, and what regulations it claims to meet",
      "Clinical validation, if any, and who carried it out",
      "Who the tool is intended for - clinicians or the public",
    ],
  },
  {
    slug: "ai-models-apis",
    name: "AI Models & APIs",
    heading: "AI Models & APIs",
    intro: [
      "This category covers the models themselves and the services for comparing, routing between and building on them. If you are choosing a model to build on, benchmark comparisons and cost per token matter more than any single capability claim.",
      "Benchmarks should be treated carefully. Published scores are measured under specific conditions that may not resemble your workload, and the gap between models is often smaller than the leaderboard suggests.",
    ],
    lookFor: [
      "Whether benchmark sources are cited and reproducible",
      "Real cost per million tokens, including output tokens",
      "Rate limits and reliability, not just headline capability",
      "Whether missing data is shown as unknown or quietly estimated",
    ],
  },
  {
    slug: "ai-agents-automation",
    name: "AI Agents & Automation",
    heading: "AI Agents & Automation Tools",
    intro: [
      "Agent tools carry out multi-step tasks rather than answering single questions. The important question is how much you can see and control: an agent that shows its steps and asks before acting is usable, one that runs opaquely is a liability.",
      "Reliability drops sharply as task length grows. Tools that handle a narrow job well are generally more useful than ones promising to run whole workflows unattended.",
    ],
    lookFor: [
      "Visibility into what the agent did, step by step",
      "Approval gates before irreversible actions",
      "What credentials it needs, and how they are stored",
      "Behaviour on failure - does it stop, retry or carry on regardless",
    ],
  },
  {
    slug: "presentations-documents",
    name: "Presentations & Documents",
    heading: "AI Presentation & Document Tools",
    intro: [
      "These tools generate slide decks, convert documents between formats and extract structure from files. Conversion tools are the most reliable part of the category - turning a PDF into clean structured text is a well-defined job with a checkable result.",
      "Deck generators vary more. The output is usually a reasonable skeleton that still needs your judgement about what to say, which is most of the work.",
    ],
    lookFor: [
      "Whether output is editable in your usual software",
      "Fidelity on conversion - tables and images are where tools fail",
      "Whether templates look generic enough to be recognisable as AI-made",
      "Handling of confidential documents",
    ],
  },
  {
    slug: "translation",
    name: "Translation",
    heading: "AI Translation Tools",
    intro: [
      "Translation tools cover text, documents, subtitles and speech. Quality varies enormously by language pair - a tool excellent for Spanish may be weak for Thai - so test on your actual languages rather than trusting a general claim.",
      "For anything published, machine translation still benefits from a native speaker's review. The failures tend to be tone and idiom rather than obvious errors, which makes them harder to spot.",
    ],
    lookFor: [
      "Quality on your specific language pair, tested with your own text",
      "Whether formatting survives document translation",
      "Glossary support for terms that must stay consistent",
      "Data handling for confidential material",
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    heading: "AI Real Estate Tools",
    intro: [
      "Property tools cover listing content, virtual staging, lead handling and market analysis. Virtual staging has clear practical value; disclosure rules about representing a property accurately apply regardless of how the image was made.",
      "For content and lead tools, the question is whether the output sounds like you or like every other agent using the same tool.",
    ],
    lookFor: [
      "Disclosure requirements for staged or enhanced imagery in your market",
      "Whether generated content reflects your voice and branding",
      "Integration with your CRM and listing portals",
      "Accuracy of any market or valuation figures, and their source",
    ],
  },
  {
    slug: "construction-engineering",
    name: "Construction & Engineering",
    heading: "AI Construction & Engineering Tools",
    intro: [
      "Tools here cover estimation, takeoff, planning and site documentation. Accuracy has direct financial consequences - an estimate that is 10% out is a real loss, not a rough edge - so verification against a known job is worth doing before relying on one.",
      "Anything touching structural or safety calculations should be treated as an assistant to a qualified engineer, never a replacement for sign-off.",
    ],
    lookFor: [
      "Verification against jobs where you already know the answer",
      "Whether calculations are shown and checkable",
      "Local building standards and units",
      "Export to the estimating or project software you already use",
    ],
  },
  {
    slug: "gaming",
    name: "Gaming",
    heading: "AI Gaming Tools",
    intro: [
      "Gaming tools cover asset generation, NPC behaviour, testing and player-facing features. Asset pipelines are the most mature use - generating textures, props and concept art that a human then finishes.",
      "If you are shipping commercially, licensing of generated assets and the platform's rules on AI content are worth settling before they become part of your game.",
    ],
    lookFor: [
      "Licensing terms for commercially shipped assets",
      "Store and platform policies on AI-generated content",
      "Engine integration - Unity, Unreal, Godot",
      "Whether output is production-ready or a starting point",
    ],
  },
];

export function getCategoryBySlug(slug: string): DirectoryCategory | undefined {
  return directoryCategories.find((c) => c.slug === slug);
}

export function getCategorySlug(name: string): string | undefined {
  return directoryCategories.find((c) => c.name === name)?.slug;
}
