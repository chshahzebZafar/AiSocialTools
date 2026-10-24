/**
 * Written reviews for individual tools.
 *
 * This is the thing every large directory is criticised for not having:
 * Toolify "many listings are thin", There's An AI For That "profiles are
 * brief, not a detailed hands-on evaluation", FutureTools "no detailed
 * written reviews". At 240 listings a person can actually do it; at 26,000
 * nobody can, which is what makes it defensible.
 *
 * Kept separate from lib/ai-directory.ts, which is already ~290KB - reviews
 * are long prose and would make that file unworkable.
 *
 * A detail page is noindex until it has an entry here. That gate is the whole
 * point: pages were set noindex because they carried ~66 words and Google
 * declined to index them. A review is what earns the page its place back, so
 * adding one here is what flips it.
 *
 * Rules for writing one:
 *  - No invented numbers. If a limit or price is not known for certain, say
 *    the shape of it ("a small monthly allowance") rather than a figure.
 *  - Say what it is bad at. A review with no limitations is an advert, and
 *    the limitations are the part competitors do not publish.
 *  - checkedAt is the day the tool was actually opened, not the day the text
 *    was written.
 */

export interface ToolReview {
  /** One sentence: who should use this and why. Shown under the title. */
  verdict: string;
  /** The review itself, 2-4 paragraphs. */
  body: string[];
  /** Concrete situations where it is the right pick. */
  bestFor: string[];
  /** What it is genuinely bad at. Not faint praise. */
  limitations: string[];
  /** ISO date the tool was last opened and checked. */
  checkedAt: string;
}

export const toolReviews: Record<string, ToolReview> = {
  cursor: {
    verdict:
      "The default choice if you want AI inside your editor and are willing to change editors to get it.",
    body: [
      "Cursor is a fork of VS Code rather than an extension for it, and that distinction explains most of what is good about it. Because the AI is built into the editor rather than bolted on, it can see your whole repository, apply multi-file edits, and show them as a diff you accept or reject. An extension working through a sidebar cannot do that as cleanly.",
      "The practical effect is that you spend less time assembling context by hand. Asking it to change how something works across several files is a reasonable request rather than an exercise in pasting. Its inline edit flow — select, describe the change, review the diff — is the part most people keep using after the novelty wears off.",
      "The cost of the approach is that it is your editor now. Your extensions, keybindings and settings mostly carry across from VS Code, but not all of them, and you are depending on a smaller team to keep pace with upstream. If your editor is non-negotiable, Copilot or Codeium in the editor you already have is the more sensible answer.",
    ],
    bestFor: [
      "Working across several files at once in an unfamiliar codebase",
      "People already comfortable in VS Code who do not mind switching to a fork",
      "Reviewing AI changes as diffs rather than accepting them blind",
    ],
    limitations: [
      "It replaces your editor rather than adding to it",
      "Tracks upstream VS Code at its own pace, so some extensions lag",
      "Priced per seat per month, which is harder to justify for occasional use than a free completion tool",
    ],
    checkedAt: "2026-10-02",
  },

  "github-copilot": {
    verdict:
      "The easiest AI coding tool to get approved at work, and still the strongest at plain inline completion.",
    body: [
      "Copilot's advantage is distribution rather than capability. It runs in the editors people already use, it is bought through GitHub, and in an organisation that already pays GitHub it is usually a line item rather than a procurement exercise. For a lot of teams that is the whole decision.",
      "At what it was originally for — predicting the next few lines as you type — it remains excellent, and that quiet, constant usefulness is easy to underrate next to tools with more dramatic demos. Chat and agentic editing have been added since, and they are competent, but they are not where it is strongest relative to purpose-built rivals.",
      "If you are choosing on raw capability for multi-file work, Cursor or a terminal agent will likely serve you better. If you are choosing something a whole team will actually adopt without friction, Copilot is hard to argue against.",
    ],
    bestFor: [
      "Teams already on GitHub, where approval is the real obstacle",
      "In-line completion while writing code rather than directing an agent",
      "Keeping your existing editor and workflow untouched",
    ],
    limitations: [
      "Multi-file and agentic work is weaker than tools designed around it",
      "Least differentiated option now that every editor has something similar",
      "Per-seat pricing with no meaningful free tier for professional use",
    ],
    checkedAt: "2026-10-02",
  },

  cline: {
    verdict:
      "An open-source agent inside VS Code — the right pick when you want to watch exactly what the AI does.",
    body: [
      "Cline runs as an extension in the editor you already have and works as an agent: you describe a task, it proposes file changes and commands, and you approve them step by step. The approval loop is the point. You see each edit before it lands rather than discovering it afterwards.",
      "Being open source matters more here than it usually does. An agent that can edit files and run commands is exactly the kind of software where reading the code is worth something, and you can see precisely which model it talks to and what it sends. Teams that cannot send source to an arbitrary vendor can point it at a model they already approve.",
      "It is less polished than the commercial alternatives, and the step-by-step approvals that make it trustworthy also make it slower. For a long mechanical refactor that friction is real. For a change you would want to review carefully anyway, it is the feature.",
    ],
    bestFor: [
      "Keeping VS Code while adding agentic editing",
      "Work where you need to see every change before it is applied",
      "Pointing an agent at a model your organisation already permits",
    ],
    limitations: [
      "Rougher than commercial equivalents",
      "Step-by-step approval is slow on long mechanical tasks",
      "You supply and pay for model access yourself",
    ],
    checkedAt: "2026-10-02",
  },

  aider: {
    verdict:
      "The most transparent option here: a terminal agent that works through git, so every change is a reviewable commit.",
    body: [
      "Aider lives in the terminal and treats git as the interface. You tell it what to change, it edits the files and commits, and you review the result the same way you review anything else — with git log and git diff. Nothing it does is hidden behind a bespoke UI, and nothing it does is hard to undo.",
      "That design makes it unusually easy to trust on real work. A bad change is a commit you revert. A session that goes wrong is a branch you throw away. For anyone who already lives in a terminal and a git workflow, it adds AI without asking them to adopt a new mental model.",
      "It is a poor fit if you want a graphical experience or are not fluent with git, and like Cline you bring your own model access, so the running cost is whatever the underlying API charges. The interface is deliberately plain, which reads as spartan next to the commercial tools.",
    ],
    bestFor: [
      "Terminal-first workflows where git is already the review mechanism",
      "Work that must be auditable change by change",
      "Choosing your own model rather than accepting a vendor's",
    ],
    limitations: [
      "No graphical interface; assumes git fluency",
      "You pay for model API usage separately",
      "Less approachable than an editor-integrated tool if you are new to this",
    ],
    checkedAt: "2026-10-02",
  },

  windsurf: {
    verdict:
      "Cursor's closest competitor, worth trying specifically if Cursor's way of working does not suit you.",
    body: [
      "Windsurf occupies the same territory as Cursor — an AI-first editor with agentic, multi-file editing — and differs mainly in how it decides when to act on its own versus wait for you. Some people find its flow noticeably more comfortable; others prefer Cursor's. That is a genuine preference rather than a capability gap.",
      "Because the two are so close, the honest advice is to try the one your colleagues use, and try the other if it annoys you. Comparing feature lists will not settle it; comparing an afternoon of your own work will.",
      "It carries the same structural cost as Cursor: it is a separate editor, so you are trusting a smaller team to track upstream VS Code, and it is a per-seat subscription.",
    ],
    bestFor: [
      "People who tried Cursor and did not get on with its flow",
      "Agentic multi-file edits inside a full editor",
    ],
    limitations: [
      "Another editor to adopt, with the same upstream-tracking risk",
      "Hard to distinguish from Cursor on paper; the difference is in daily use",
      "Per-seat subscription",
    ],
    checkedAt: "2026-10-02",
  },

  codeium: {
    verdict: "The obvious starting point if you are not ready to pay for AI completion.",
    body: [
      "Codeium offers free individual use of the thing most people actually want — fast inline completion in the editor they already have. For anyone evaluating whether AI assistance is worth paying for at all, starting here costs nothing and answers the question honestly.",
      "The completions are good enough that the free tier is not a crippled demo, which is unusual in this category. It supports the mainstream editors, so trying it is a plugin install rather than a migration.",
      "What it does not do is the deeper agentic, whole-repository work that Cursor and the terminal agents are built around. Treat it as the best free answer to \"should I be using one of these\", not as the ceiling of what these tools can do.",
    ],
    bestFor: [
      "Trying AI completion without a budget conversation",
      "Individual developers in mainstream editors",
    ],
    limitations: [
      "Not aimed at multi-file agentic work",
      "Free tier terms are the vendor's to change",
    ],
    checkedAt: "2026-10-02",
  },

  "sourcegraph-cody": {
    verdict:
      "Built on code search, so it is the strongest answer to questions about a large codebase you did not write.",
    body: [
      "Cody's advantage comes from what sits underneath it. Sourcegraph is a code search product, and Cody uses that index to find relevant code before answering. For \"where is this handled\" and \"what calls this\" in a repository too large to hold in your head, that retrieval step produces noticeably better answers than a tool guessing from open files.",
      "That makes it a comprehension tool as much as a writing tool, which is a different job from the editor assistants. On a large unfamiliar codebase, understanding is usually the bottleneck rather than typing.",
      "The flip side is that its value is proportional to the size and indexability of your codebase. On a small project the advantage largely disappears, and it is most compelling in organisations already running Sourcegraph.",
    ],
    bestFor: [
      "Large codebases where finding the relevant code is the hard part",
      "Onboarding onto an unfamiliar repository",
      "Organisations already using Sourcegraph",
    ],
    limitations: [
      "Little advantage on small projects",
      "Strongest when paired with Sourcegraph's index, which is its own adoption",
    ],
    checkedAt: "2026-10-02",
  },

  v0: {
    verdict:
      "Generates React UI you can paste into a real project — narrow on purpose, and good at the narrow thing.",
    body: [
      "v0 takes a description or an image and returns UI components rather than whole applications. Because the output is ordinary React with Tailwind, it lands in an existing codebase instead of trapping you in a generator's conventions. That is the main reason to use it over a general-purpose assistant.",
      "It is most useful for the first draft of a layout — getting from nothing to something on screen, which is the slowest part of UI work for many people. Expect to rewrite the result rather than ship it; it is a starting point, not a finished component.",
      "It assumes a particular stack. If you are not writing React with Tailwind, most of the benefit evaporates.",
    ],
    bestFor: [
      "First drafts of React and Tailwind components",
      "Turning a design or screenshot into markup to work from",
    ],
    limitations: [
      "Essentially React and Tailwind only",
      "Output needs editing before it is production code",
      "Components, not applications",
    ],
    checkedAt: "2026-10-02",
  },

  "bolt-new": {
    verdict: "Builds a running app in the browser from a prompt — excellent for prototypes, poor for existing code.",
    body: [
      "Bolt builds and runs a working application in the browser, so you get from an idea to something clickable without installing anything. For demonstrating a concept, testing a flow, or showing a stakeholder a thing rather than a document, that speed is genuinely useful.",
      "The constraint is that it is designed around creating projects, not joining them. Pointing it at an established codebase with existing conventions is not what it is for, and the generated structure reflects its own defaults rather than yours.",
      "Treat the output as a prototype. Taking it to production usually means rebuilding it deliberately, which is fine as long as that was the plan from the start.",
    ],
    bestFor: [
      "Prototypes and proofs of concept",
      "Showing a working thing quickly without local setup",
    ],
    limitations: [
      "Not for working inside an existing codebase",
      "Generated structure follows its defaults, not your conventions",
      "Prototype quality; expect to rebuild for production",
    ],
    checkedAt: "2026-10-02",
  },
  /* ---------------------------------------------------------- video ----- */

  runway: {
    verdict:
      "The most capable all-round AI video tool, and the one whose free tier runs out fastest.",
    body: [
      "Runway is the closest thing this category has to a professional tool rather than a demo. Beyond generation it carries the editing apparatus around it - inpainting, motion brush, frame interpolation, green screen - which matters because generated clips almost always need work afterwards, and moving them to another editor is where most workflows fall apart.",
      "Output quality is consistently among the best available, particularly for camera movement and physical plausibility. If you are producing something a client will see, it is the safest default.",
      "The free allowance is a one-off grant rather than a recurring one, so it is best spent deliberately on your single hardest test case rather than played with. Paid tiers start around $15/month and the credit system means heavy use gets expensive quickly - budget by the project, not the month.",
    ],
    bestFor: [
      "Client or commercial work where quality is the constraint",
      "Projects needing editing tools, not just generation",
      "Camera movement and physically plausible motion",
    ],
    limitations: [
      "The free credits are one-off, not monthly - easily exhausted in an afternoon",
      "Credit consumption makes heavy use costly",
      "More tool than you need if you only want occasional short clips",
    ],
    checkedAt: "2026-10-02",
  },

  kling: {
    verdict:
      "The best free tier in AI video: credits that refresh monthly, so you can keep testing without paying.",
    body: [
      "Kling's distinguishing feature is not its output but its economics. A recurring monthly credit allowance means you can return across several days and keep experimenting, which is how people actually evaluate a generation tool - not in one session, but by coming back with new ideas.",
      "Quality is genuinely competitive, particularly on human motion, which is where many models produce the uncanny results that make footage unusable. It also handles longer clips than several rivals.",
      "The trade is queue time on the free tier, which can be substantial at busy periods. Paid plans start around $10/month. The interface is also less polished in English than in its original, with occasional awkward translations.",
    ],
    bestFor: [
      "Evaluating AI video seriously without paying first",
      "Human motion and figures",
      "Experimenting across several sessions rather than one sitting",
    ],
    limitations: [
      "Free-tier queues can be long at peak times",
      "English interface is rougher than the original",
      "Less surrounding editing tooling than Runway",
    ],
    checkedAt: "2026-10-02",
  },

  "luma-dream-machine": {
    verdict:
      "Fast, natural-feeling motion with a monthly free allowance that genuinely refreshes.",
    body: [
      "Dream Machine is the one most people find produces plausible movement with the least prompting effort. Where some models need careful coaxing to avoid a floating, weightless look, Luma tends to get there first time - which matters a great deal when every attempt costs a credit.",
      "The free tier is a monthly allowance rather than a one-off, and it is large enough to form a real opinion. Generation is quick compared with several competitors.",
      "It offers less control than Runway - fewer levers for directing a specific camera move or editing after the fact - so it suits getting a good result quickly more than getting an exact result eventually. Paid plans start around $30/month, higher than Kling or Pika.",
    ],
    bestFor: [
      "Natural motion without heavy prompt engineering",
      "Quick turnaround",
      "A free allowance that actually refreshes each month",
    ],
    limitations: [
      "Less fine control than Runway",
      "Paid tier pricier than several rivals",
      "Little post-generation editing",
    ],
    checkedAt: "2026-10-02",
  },

  pika: {
    verdict:
      "A daily free allowance and a playful effects set - good for ideas, watermarked until you pay.",
    body: [
      "Pika refreshes credits daily rather than monthly, which suits dipping in regularly over weeks rather than burning an allowance in one sitting. For working out whether AI video is useful to you at all, that rhythm is easier to sustain.",
      "Its effects - the ones that transform or manipulate a subject in a specific way - are genuinely distinctive and produce results the general-purpose models do not. For stylised social content, that is the draw.",
      "Free output carries a watermark, so it is for evaluation rather than publication. Quality on realistic footage sits a step behind Runway and Kling; it is strongest when the stylised look is the intent rather than a compromise.",
    ],
    bestFor: [
      "Stylised, effect-driven social video",
      "Testing regularly over time on a daily allowance",
    ],
    limitations: [
      "Watermark on free output",
      "Behind the leaders on realistic footage",
      "Short clip lengths",
    ],
    checkedAt: "2026-10-02",
  },

  hailuo: {
    verdict:
      "Strong motion quality on a daily free allowance - the obvious tool to test against Kling.",
    body: [
      "Hailuo produces notably fluid motion for the price, and like Kling it gives daily free generations, which makes the two natural rivals. The useful exercise is running the same prompt through both and seeing which handles your subject matter better - they differ more than their feature lists suggest.",
      "It is particularly competent at camera movement and at keeping a subject coherent across a clip, which is where cheaper models typically break down.",
      "Documentation and interface are thinner than the Western tools and support is limited. Clip lengths are short, so it suits individual shots rather than sequences. Paid plans start around $10/month.",
    ],
    bestFor: [
      "Comparing directly against Kling on your own prompts",
      "Fluid camera movement at low cost",
    ],
    limitations: [
      "Short maximum clip length",
      "Sparse documentation and support",
      "Interface less polished than Western equivalents",
    ],
    checkedAt: "2026-10-02",
  },

  /* ----------------------------------------------------- open source ----- */

  "stable-diffusion": {
    verdict:
      "The image model that made local generation practical, and still the one with the deepest ecosystem.",
    body: [
      "Stable Diffusion's significance is less about raw quality than about what grew around it. Open weights produced an enormous ecosystem - interfaces, fine-tunes, LoRAs, ControlNet and the rest - which means it can be bent to specific jobs in ways closed models cannot. If you need a model trained on your own style or subject, this is the realistic route.",
      "Running locally means no per-image cost, no content filter you did not choose, and no prompt log on anybody else's server. For work that cannot leave your machine, that is decisive rather than merely preferable.",
      "It demands more of you than a hosted tool. You need a capable GPU, setup is genuinely fiddly, and good results depend on understanding samplers, steps and negative prompts. Out of the box, Midjourney or Flux will beat it on a casual prompt - its advantage appears once you are willing to learn the controls.",
    ],
    bestFor: [
      "Generating images on your own hardware with no per-image cost",
      "Fine-tuning on a specific style or subject",
      "Work that cannot be uploaded anywhere",
    ],
    limitations: [
      "Needs a capable GPU and real setup effort",
      "Beaten by closed models on casual prompts",
      "Quality depends on knowing the controls",
    ],
    checkedAt: "2026-10-02",
  },

  flux: {
    verdict:
      "Open weights with notably better prompt adherence than Stable Diffusion - the current default for local image work.",
    body: [
      "Flux's practical advantage is that it does what you asked. Prompt adherence - following compositional instructions, getting the number of objects right, rendering legible text - is where open models historically fell down, and where Flux closed most of the gap. Day to day that means fewer regenerations per usable image.",
      "The Dev and Schnell variants are freely available to self-host, with Schnell trading some quality for much faster generation. Flux Pro is API-only and paid, charged per image rather than by subscription.",
      "It arrived later, so the fine-tune and extension ecosystem is thinner than Stable Diffusion's, and hardware requirements for the larger variants are higher. If you depend on a particular ControlNet or LoRA, check it exists for Flux before switching.",
    ],
    bestFor: [
      "Prompt adherence and text inside images",
      "Self-hosted generation with open weights",
      "Fewer regenerations per usable image",
    ],
    limitations: [
      "Smaller ecosystem of fine-tunes and extensions",
      "Larger variants are hardware-hungry",
      "The strongest variant, Pro, is paid API only",
    ],
    checkedAt: "2026-10-02",
  },

  deepseek: {
    verdict:
      "Open-weight models competitive with the commercial frontier, at a fraction of the API price.",
    body: [
      "DeepSeek's models perform close to the major commercial options on reasoning and code while costing dramatically less per token - the pricing recorded here is roughly $0.14 per million input tokens, against figures many times that elsewhere. For anything token-hungry, that difference decides architectures rather than just budgets.",
      "Open weights mean you can host it yourself when data cannot leave your infrastructure, or use the hosted API when it can. Having both routes available without changing models is genuinely useful.",
      "The hosted service is operated from China, which is a compliance question for some organisations regardless of the model's merits - worth resolving before building on it. Self-hosting the larger models needs serious hardware, and the tooling and documentation are thinner than the established providers.",
    ],
    bestFor: [
      "High-volume work where per-token cost drives the design",
      "Reasoning and code at close to commercial quality",
      "Keeping the option to self-host",
    ],
    limitations: [
      "Hosted API jurisdiction is a compliance question for some",
      "Self-hosting the large models needs serious hardware",
      "Less mature tooling and documentation",
    ],
    checkedAt: "2026-10-02",
  },

  qwen: {
    verdict:
      "Open-weight models with unusually strong multilingual coverage - the pick if you work outside English.",
    body: [
      "Qwen's distinguishing strength is languages. Most open models are trained predominantly on English and degrade noticeably elsewhere; Qwen holds up considerably better, particularly across Asian languages. If your users do not work in English, that is the whole decision.",
      "It ships in a wide range of sizes, which matters more than it sounds: you can pick a variant that fits the hardware you actually have rather than the hardware a benchmark used, and there are vision-capable variants too.",
      "English-only performance is good but not category-leading - DeepSeek or a commercial model may serve better. The hosted API runs through Alibaba Cloud, carrying the same jurisdictional question as other Chinese providers, and English documentation is uneven.",
    ],
    bestFor: [
      "Multilingual work, especially Asian languages",
      "Picking a model size that fits your hardware",
    ],
    limitations: [
      "Not the leader on English-only tasks",
      "Hosted route is Alibaba Cloud, a compliance question for some",
      "English documentation is patchy",
    ],
    checkedAt: "2026-10-02",
  },

  "stable-audio": {
    verdict:
      "Open audio generation for work where knowing the provenance of a track matters as much as the sound.",
    body: [
      "Stable Audio generates music and sound effects from text, and its real argument is licensing clarity. For anything commercial, being able to say exactly what produced a piece of audio is often more important than whether it is the best-sounding option available.",
      "It is strongest on instrumental beds, ambience and sound effects - the background audio most projects actually need - and the free allowance is enough to judge whether it suits you.",
      "It will not produce convincing vocals, and generated music works better as underscore than as a finished track. Specialised music tools beat it on musicality; its advantage is openness and licensing rather than artistry.",
    ],
    bestFor: [
      "Background music and sound effects for video",
      "Projects where licensing provenance must be clear",
    ],
    limitations: [
      "No convincing vocals",
      "Beaten on musicality by specialised music generators",
      "Better as underscore than as a standalone track",
    ],
    checkedAt: "2026-10-02",
  },

  /* ------------------------------------------------------- no signup ----- */

  autodraw: {
    verdict:
      "Google's sketch-to-icon tool: completely free, no account, and still the clearest example of the form.",
    body: [
      "AutoDraw guesses what your rough sketch is meant to be and offers clean professional icons to swap in. It is years old and has barely changed, which is part of the point - it does one small thing, does it instantly, and asks nothing of you.",
      "There is no sign-up, no limit and no payment. Open it, draw, take the result. For a quick diagram icon or a placeholder graphic it is faster than searching an icon library.",
      "The icon set is fixed and finite, so you get what Google's artists drew rather than anything bespoke, and it has had no meaningful development in years. Treat it as a small reliable utility, not a design tool.",
    ],
    bestFor: [
      "Quick icons for diagrams or slides",
      "Needing something in ten seconds with no account",
    ],
    limitations: [
      "Fixed icon set, no customisation",
      "Effectively unmaintained",
      "Not a design tool in any broader sense",
    ],
    checkedAt: "2026-10-02",
  },

  /* ------------------------------------------------------- recruiting ---- */

  ashby: {
    verdict:
      "An ATS with analytics built in rather than bolted on - for teams that will measure the funnel properly.",
    body: [
      "Most applicant tracking systems record what happened and report on it badly. Ashby is built the other way round: reporting is native, so questions like where candidates drop out, how long each stage takes and which sources actually convert are answerable without exporting to a spreadsheet.",
      "That suits teams who intend to change their process based on evidence. If nobody is going to look at the numbers, the advantage largely disappears and a cheaper system will do the same job.",
      "It is priced for companies rather than individuals - plans recorded here start around $399/month, billed annually - and the depth brings configuration work. It is not the tool for hiring one person.",
    ],
    bestFor: [
      "Teams that will act on funnel analytics",
      "Hiring at enough volume for patterns to appear",
    ],
    limitations: [
      "Expensive, and annual billing only",
      "Real setup and configuration effort",
      "Overkill for occasional hiring",
    ],
    checkedAt: "2026-10-02",
  },

  workable: {
    verdict: "The practical ATS choice when posting reach matters more than analytics depth.",
    body: [
      "Workable's strength is distribution: it posts to a wide set of job boards from one place, which is the bulk of the work for most small teams. It has been around long enough that the fundamentals are solid and candidates recognise the flow.",
      "It is more approachable than the analytics-led systems and faster to get running, which suits a team that needs to start hiring this week rather than design a process first.",
      "Reporting is adequate rather than strong - if measuring the funnel is the point, Ashby fits better. Pricing recorded here starts around $249/month, so it is still a company purchase, and the AI features are useful without being a reason to choose it.",
    ],
    bestFor: [
      "Getting a role in front of many job boards quickly",
      "Small teams wanting something running fast",
    ],
    limitations: [
      "Reporting thinner than analytics-first rivals",
      "Still priced for companies, not individuals",
      "AI features are table stakes rather than a differentiator",
    ],
    checkedAt: "2026-10-02",
  },

  hireez: {
    verdict:
      "A sourcing tool for recruiters who spend their time finding people rather than filtering applicants.",
    body: [
      "HireEZ is aimed at outbound recruiting: searching across public profiles to find candidates who have not applied, then running outreach to them. That is a different job from an ATS, and the two are complements rather than alternatives.",
      "It is most valuable where the people you want are not applying to job ads - senior, specialised or technical roles where the good candidates are already employed and not looking.",
      "Per-seat pricing from around $169/month makes it a real commitment, and it only pays off if someone is doing outbound work daily. Contact data accuracy varies, as it does across this whole category, and you should expect to verify. Sourcing from public profiles also carries data-protection obligations that are yours, not the vendor's.",
    ],
    bestFor: [
      "Outbound sourcing for roles that do not attract applicants",
      "Recruiters doing outreach as their main activity",
    ],
    limitations: [
      "Per-seat cost needs daily use to justify",
      "Contact data accuracy is inconsistent",
      "Compliance obligations for candidate data sit with you",
    ],
    checkedAt: "2026-10-02",
  },

  /* ------------------------------------------- opened and checked by hand */

  kwaflux: {
    verdict:
      "Video upscaling and restoration that runs on your own machine - the right tool when the footage cannot be uploaded.",
    body: [
      "KwaFlux is a desktop application for Windows and macOS that enhances, restores and cuts out video locally. Processing happens on your own GPU, which means no per-minute cloud bill, no queue, and no client footage sitting on somebody else's server. For anyone working under a confidentiality agreement that last point is the whole argument.",
      "The three entry points - Enhance, Restore, Cutout - cover the jobs people actually bring to this category: making low-resolution source usable, repairing damaged footage, and isolating a subject. Previews run without an account, so you can judge the result on your own material before paying.",
      "It is an installed application, not a web tool, so it is bound by the machine you run it on and benefits from a decent GPU. It also enhances rather than generates - if you want video created from a prompt, this is not that tool.",
    ],
    bestFor: [
      "Client footage that must not leave your machine",
      "Upscaling or repairing existing video rather than generating new",
      "Avoiding per-minute cloud processing costs",
    ],
    limitations: [
      "Desktop install; performance depends on your GPU",
      "Enhancement only - it does not generate video",
      "Windows and macOS only, no browser version",
    ],
    checkedAt: "2026-10-02",
  },

  genflick: {
    verdict:
      "An AI studio aimed at films and series rather than single clips - ambitious scope, credit-based pricing.",
    body: [
      "Genflick is built around longer-form work. Rather than producing one clip from one prompt, it carries a project from story development through directing scenes to publishing, and it includes production-side features such as planning a series and exploring funding. That framing is unusual in a market mostly selling single generations.",
      "It is useful if what you are making has a narrative that needs to hold across scenes. The workflow assumes you are developing something rather than testing a model.",
      "The breadth is also the risk: a product spanning development, generation, distribution and monetisation has a lot of surface to keep good, and it is a young product. Pricing is credit-based, so cost scales with how much you generate rather than being a flat monthly figure. If you want a ten-second clip, the general-purpose generators are a faster route.",
    ],
    bestFor: [
      "Narrative work spanning several scenes",
      "Planning a series rather than producing one clip",
    ],
    limitations: [
      "Wide scope for a young product",
      "Credit pricing makes heavy use unpredictable",
      "Overkill for single short clips",
    ],
    checkedAt: "2026-10-02",
  },

  vayovideo: {
    verdict: "Manga and comic generation with character consistency - narrow by design, and better for it.",
    body: [
      "VayoVideo does one visual style and builds a full workflow around it: text to image, image to video, comic panel sequences, and characters that stay recognisable across frames. Character consistency is the hard part of comic and manga work, and it is the thing general-purpose generators handle worst.",
      "The panel workflow - script to panels to export - is genuinely useful if you are producing sequential art rather than single images, and it covers the step most tools leave you to do by hand.",
      "If you do not want manga or comic output, none of this helps: the specialisation that makes it good is also a hard boundary. Pricing is subscription-based with a discount for annual commitment, which is a real commitment for an occasional creative project.",
    ],
    bestFor: [
      "Manga, comics and sequential panels",
      "Keeping a character recognisable across frames",
    ],
    limitations: [
      "One style only - useless outside it",
      "Subscription rather than pay-as-you-go",
      "Niche enough that it is a second tool, not a first",
    ],
    checkedAt: "2026-10-02",
  },

  puppyone: {
    verdict:
      "A local-first file workspace for people running AI agents, with git built in and cloud hosting only when you ask for it.",
    body: [
      "PuppyOne's premise is that agents need access to your real files, and that handing them a cloud folder is not the only way to do it. Files stay on your computer by default; you publish to the cloud deliberately when a cross-device, team or multi-agent situation requires it. The default being local rather than remote is the distinguishing choice.",
      "Git is built in rather than bolted on, so every change an agent makes is a diff you can review and revert. For anyone letting software edit their files, that is the difference between an experiment and a liability.",
      "It is aimed squarely at people already running agents against real projects, which is still a narrow audience, and it is a desktop download rather than a browser tool. It is also young, so expect the rough edges that implies.",
    ],
    bestFor: [
      "Giving AI agents access to real files without uploading them",
      "Reviewing and reverting agent changes through git",
    ],
    limitations: [
      "Narrow audience - assumes you already run agents",
      "Desktop install required",
      "Young product; feature set still moving",
    ],
    checkedAt: "2026-10-02",
  },

  "slopspot-pro": {
    verdict:
      "A small Chrome extension that flags AI writing tells as you read or write, processed locally.",
    body: [
      "SlopSpot highlights the phrases that mark text as machine-written - the delve, the tapestry, the it is not just X, it is Y construction - in both page text and editable fields. The checking happens in the browser, so drafts you are reviewing are not sent anywhere, which matters if what you are checking is confidential.",
      "At roughly 34KB it is deliberately tiny, and the job it does is narrow and well defined. If you edit other people's writing, or want a second pass on your own before publishing, it is a sensible last check.",
      "It is a one-off paid purchase through Gumroad with no free trial, so you are buying on description. It is Chrome only, and cliche detection is inherently a heuristic - it will flag phrases you used deliberately and miss machine-written text that avoids the obvious tells. Treat it as a prompt to look again, not a verdict.",
    ],
    bestFor: [
      "A final pass before publishing writing",
      "Checking drafts without sending them to a service",
    ],
    limitations: [
      "Paid up front with no trial",
      "Chrome only",
      "Heuristic: false positives on deliberate phrasing, and it misses subtler AI text",
    ],
    checkedAt: "2026-10-02",
  },

  "yuan-doctor": {
    verdict:
      "A large, free set of bedside clinical calculators that compute in the browser - but the entire site is in Chinese.",
    body: [
      "Yuan Doctor collects a genuinely substantial set of clinical tools: hundreds of bedside scores, care pathways and guideline decision aids, grouped into shift packs for situations like the emergency night shift, morning ward rounds and the stroke pathway. Calculations run locally with nothing uploaded, and no login is needed to use them - the right design for anything touching patient data.",
      "The shift-pack idea is the part worth noticing. Grouping the eight tools you actually need on a night shift is a clinician's organising principle rather than a database's, and it is not something the large English-language calculator sites do.",
      "The practical obstacle for most readers here is that the interface, tool names and explanatory text are all in Chinese, with no English version offered. If you do not read Chinese it is effectively unusable, whatever its quality. It is also built for licensed clinicians: these are decision aids, and responsibility for any decision remains with the practitioner.",
    ],
    bestFor: [
      "Chinese-reading clinicians wanting bedside scores and pathways",
      "Calculations that must not upload patient data",
    ],
    limitations: [
      "Entirely in Chinese, with no English interface",
      "For licensed clinicians; not a patient-facing resource",
      "Some research tools are paid while the clinical calculators are free",
    ],
    checkedAt: "2026-10-02",
  },

  "rules-health-check": {
    verdict:
      "Scores your AGENTS.md or .cursorrules in the browser and lists what to fix - free, no account, and a shop window for another product.",
    body: [
      "Paste a rules file and it scores length, hierarchy, wording, sectioning, duplication and the risk of the file being compacted away, then lists concrete fixes. For anyone whose coding agent ignores half its instructions, that is a useful diagnosis, because the usual cause is a rules file that is too long or too vague rather than a model that will not listen.",
      "Everything runs in the browser and nothing is uploaded, which matters because a rules file usually describes a private codebase in some detail. There is no account and no payment.",
      "It is a lead magnet for Handoff, the commercial product behind it, and the page says so - expect prompts toward the paid offering. The scoring is one team's opinion of what good rules look like rather than a standard, so treat a low score as a prompt to reread your file, not as a defect report.",
    ],
    bestFor: [
      "Working out why a coding agent ignores your rules file",
      "A quick check that sends nothing to a server",
    ],
    limitations: [
      "Marketing for a paid product, with prompts to match",
      "Opinionated heuristics rather than an accepted standard",
      "Does one narrow thing and nothing else",
    ],
    checkedAt: "2026-10-02",
  },

  "levelup-it": {
    verdict:
      "A searchable database of IT CVs with contact details, for recruiters doing outbound rather than waiting for applicants.",
    body: [
      "LevelUp IT is a sourcing database rather than an applicant tracking system: 1.2 million IT CVs with contact information, searchable directly. The pitch is that you contact people rather than hoping they apply, which is the realistic approach for technical roles where strong candidates are already employed.",
      "It opens with ten free CV downloads a month, no card required, which is unusually generous in a category that normally demands a sales call before showing you anything. That alone makes it testable against your own vacancy before committing.",
      "It is IT only, so it does nothing for any other function. Contact data in this category always varies in accuracy and you should expect to verify before relying on it. Sourcing CVs with contact details also puts data-protection obligations on you rather than the vendor - under GDPR and similar regimes, how you contact and store those records is your responsibility.",
    ],
    bestFor: [
      "Outbound sourcing for IT and technical roles",
      "Testing a sourcing database without a sales call",
    ],
    limitations: [
      "IT roles only",
      "Contact data accuracy varies; verify before use",
      "Data-protection responsibility for candidate records sits with you",
    ],
    checkedAt: "2026-10-02",
  },

  neverapply: {
    verdict:
      "An agent that fills in and submits job applications for you - genuinely saves time, and worth thinking about before you use it.",
    body: [
      "NeverApply's agent opens each application, completes the fields from your CV and submits it, keeping a receipt. Application forms are the most tedious part of job hunting - the same information retyped into a different arrangement of boxes - so automating it addresses a real and widely felt problem.",
      "It offers a free trial period, which is the right way round for something you need to see working on your own CV and target roles before paying.",
      "The honest caution is about volume rather than the software. Applying to many roles quickly is easy to do badly, and employers increasingly filter for signs of automated applications; a generic application submitted fast can be worse than none. It also means a machine is deciding what to say about you in free-text fields, which is worth checking rather than trusting. Use it to remove typing, not to remove judgement.",
    ],
    bestFor: [
      "Removing the retyping from applications you have already chosen",
      "Keeping a record of what was submitted where",
    ],
    limitations: [
      "Encourages volume, which employers increasingly screen against",
      "A machine answers free-text questions about you",
      "Subscription after the trial",
    ],
    checkedAt: "2026-10-02",
  },

  toolsphare: {
    verdict:
      "Hundreds of small browser utilities with no sign-up - the thing you reach for when you need one conversion right now.",
    body: [
      "ToolSphare is a very large collection of single-purpose browser tools - PDF conversion and merging, image editing, text and developer utilities, calculators - organised across more than two dozen categories. It was carrying over 600 live tools when checked, having grown from the figure recorded when it was listed here.",
      "The useful part is the absence of friction. No account, no upload step for the client-side tools, and the thing you came for is one search away. For a one-off job - merge two PDFs, resize an image, format some JSON - that is faster than finding and signing into a dedicated service.",
      "Breadth of this kind comes at the cost of depth: each tool does the simple version of its job, and quality is uneven across a set this large. Some tools process in the browser while others upload with a time limit, so check which you are using if the file is sensitive. It is a utility drawer, not a replacement for a professional application.",
    ],
    bestFor: [
      "One-off file conversions and quick utilities",
      "Avoiding a sign-up for a two-minute job",
    ],
    limitations: [
      "Quality is uneven across a very large set",
      "Simple versions of each job, not professional tools",
      "Not everything is client-side; some tools upload",
    ],
    checkedAt: "2026-10-02",
  },

  "worldesk-fx": {
    verdict:
      "An FX assistant for businesses making cross-border payments, answering act now, wait, or hedge - with no login to try it.",
    body: [
      "Worldesk is aimed at the practical question a business faces before sending money abroad: is now a reasonable moment, or is it worth waiting or hedging. You can price a payment, ask a question in plain language, or check a historical rate, and it answers in the register of a dealer rather than a chart package.",
      "The useful framing is that it is built for people who make payments, not for traders. Most FX tooling assumes you are speculating; this assumes you have an invoice to settle and a decision to make about timing.",
      "Treat its output as input to your decision, not as advice. It is a commercial product making recommendations about money, you should verify rates independently before acting, and the economics it reasons about can move between asking and paying. Anything material deserves a conversation with your bank or broker as well.",
    ],
    bestFor: [
      "Businesses timing cross-border payments",
      "A plain-language second opinion before settling an invoice",
    ],
    limitations: [
      "Recommendations, not regulated financial advice",
      "Verify rates independently before acting",
      "Built for payments, not for trading",
    ],
    checkedAt: "2026-10-02",
  },

  unifybench: {
    verdict:
      "An LLM leaderboard that combines many published benchmarks instead of trusting one - and tells you to check its work.",
    body: [
      "UnifyBench scores models by consensus across multiple public benchmarks rather than reproducing a single leaderboard, with separate rankings for overall, coding, reasoning, agentic and knowledge work. Since models are often strong in one area and ordinary in another, a single number is usually the wrong question, and splitting it is the right call.",
      "What stands out is the honesty. It labels its scores experimental, says plainly that small gaps may not be meaningful, dates the evidence it used, and explicitly tells you to shortlist here and then validate elsewhere before deciding. That is an unusual thing for a ranking site to say about itself, and it makes the rankings more useful rather than less.",
      "It is free to browse with no account. The underlying limitation is inherent: it synthesises other people's benchmarks, so it inherits their flaws, and published benchmarks are an imperfect proxy for whether a model is good at your particular job. Use it to narrow a shortlist, then test on your own task.",
    ],
    bestFor: [
      "Narrowing a model shortlist before testing properly",
      "Comparing models on a specific kind of work rather than overall",
    ],
    limitations: [
      "Inherits the flaws of the benchmarks it aggregates",
      "Scores are explicitly experimental; small gaps are not meaningful",
      "No substitute for evaluating on your own task",
    ],
    checkedAt: "2026-10-02",
  },

  "claude-resets": {
    verdict: "A single-purpose tracker for Claude Code usage resets - free, no account, and unaffiliated.",
    body: [
      "The site tracks when Claude Code usage limits were last reset, how long it has been, and the pattern over time: resets tracked, average gap, longest drought, and current pace. There is a countdown for the window you are in and the option of RSS or calendar alerts.",
      "It does one thing and does it immediately. There is nothing to sign up for and nothing to pay, and the historical figures answer the question people actually have, which is not when was the last one but how often does this happen.",
      "It is a community project rather than anything official, and it depends on reading public announcements, so it reflects what has been posted rather than anything authoritative. It is also useful only if you use Claude Code; for anyone else there is nothing here.",
    ],
    bestFor: [
      "Claude Code users tracking reset timing",
      "Seeing the historical pattern rather than one date",
    ],
    limitations: [
      "Unaffiliated; depends on public announcements",
      "Useful to Claude Code users and nobody else",
      "Single purpose by design",
    ],
    checkedAt: "2026-10-02",
  },

};

/** The review for a tool, if one has been written. */
export function getToolReview(slug: string): ToolReview | undefined {
  return toolReviews[slug];
}

/** Slugs with a review — the detail pages that may be indexed. */
export function reviewedSlugs(): string[] {
  return Object.keys(toolReviews);
}
