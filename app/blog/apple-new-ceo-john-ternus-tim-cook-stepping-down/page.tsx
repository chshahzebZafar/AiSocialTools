import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "New Apple CEO John Ternus Replaces Tim Cook: Everything You Need to Know (2026)",
  description:
    "Tim Cook is stepping down as Apple CEO after 15 years. John Ternus, Apple's hardware chief, becomes the new Apple CEO on September 1, 2026. Full story, net worth, age & AAPL stock impact.",
  keywords: [
    "John Ternus", "Tim Cook", "Apple CEO", "new Apple CEO", "Apple stock",
    "AAPL", "Tim Cook stepping down", "John Ternus net worth", "John Ternus age",
    "Apple news", "Apple Inc",
  ],
  authors: [{ name: "Shahzeb Zafar" }],
  openGraph: {
    title: "New Apple CEO John Ternus Replaces Tim Cook: Everything You Need to Know (2026)",
    description:
      "Tim Cook steps down as Apple CEO. John Ternus takes over on September 1, 2026. Learn about Ternus's age, net worth, wife, career, and what it means for Apple stock (AAPL).",
    type: "article",
    url: "https://aisocialtools.co/blog/apple-new-ceo-john-ternus-tim-cook-stepping-down",
    siteName: "AI Social Tools",
    publishedTime: "2026-04-21",
    modifiedTime: "2026-04-21",
    authors: ["Shahzeb Zafar"],
    tags: ["John Ternus", "Tim Cook", "Apple CEO", "AAPL", "Apple news"],
    images: [
      {
        url: "https://aisocialtools.co/og-default.png",
        width: 1200,
        height: 630,
        alt: "New Apple CEO John Ternus Replaces Tim Cook",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Apple CEO John Ternus Replaces Tim Cook (2026)",
    description:
      "Tim Cook steps down as Apple CEO. John Ternus takes over on September 1, 2026. Age, net worth, career & AAPL impact.",
    images: ["https://aisocialtools.co/og-default.png"],
  },
  alternates: {
    canonical: "https://aisocialtools.co/blog/apple-new-ceo-john-ternus-tim-cook-stepping-down",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: "New Apple CEO John Ternus Replaces Tim Cook: Everything You Need to Know (2026)",
  description: "Tim Cook is stepping down as Apple CEO after 15 years. John Ternus becomes the new Apple CEO on September 1, 2026.",
  author: { "@type": "Person", name: "Shahzeb Zafar", url: "https://aisocialtools.co/author" },
  publisher: {
    "@type": "Organization",
    name: "AI Social Tools",
    url: "https://aisocialtools.co",
    logo: { "@type": "ImageObject", url: "https://aisocialtools.co/og-default.png", width: 1200, height: 630 },
  },
  datePublished: "2026-04-21",
  dateModified: "2026-04-21",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://aisocialtools.co/blog/apple-new-ceo-john-ternus-tim-cook-stepping-down" },
  image: "https://aisocialtools.co/og-default.png",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Why is Tim Cook stepping down as Apple CEO?", acceptedAnswer: { "@type": "Answer", text: "Tim Cook is stepping down after 15 years as part of a planned, long-term succession process unanimously approved by Apple's Board of Directors. Cook, who turns 65, will transition to Executive Chairman of the board on September 1, 2026." } },
    { "@type": "Question", name: "Who is the new Apple CEO?", acceptedAnswer: { "@type": "Answer", text: "John Ternus, Apple's Senior Vice President of Hardware Engineering, is the new Apple CEO. He officially takes over on September 1, 2026, becoming Apple's eighth CEO in the company's history." } },
    { "@type": "Question", name: "How old is Tim Cook?", acceptedAnswer: { "@type": "Answer", text: "Tim Cook was born on November 1, 1960, making him 65 years old in 2026. He joined Apple in 1998 and became CEO in 2011 following Steve Jobs's death." } },
    { "@type": "Question", name: "How old is John Ternus?", acceptedAnswer: { "@type": "Answer", text: "John Ternus was born in May 1975, making him 50 years old in 2026 — nearly the same age Tim Cook was when he became CEO in 2011." } },
    { "@type": "Question", name: "What is John Ternus's net worth?", acceptedAnswer: { "@type": "Answer", text: "John Ternus's net worth is estimated between $75 million and $100 million as of 2026. This is expected to grow significantly once his CEO compensation package is confirmed." } },
    { "@type": "Question", name: "What is Tim Cook's net worth?", acceptedAnswer: { "@type": "Answer", text: "Forbes estimates Tim Cook's net worth at approximately $3 billion, built through decades of Apple salary, stock awards, and equity grants." } },
    { "@type": "Question", name: "Who is John Ternus's wife?", acceptedAnswer: { "@type": "Answer", text: "John Ternus keeps his personal life extremely private. As of April 2026, no credible source has publicly confirmed the name of his wife or details about his family." } },
    { "@type": "Question", name: "What will happen to Apple stock (AAPL) after the CEO change?", acceptedAnswer: { "@type": "Answer", text: "AAPL dipped approximately 0.5% in after-hours trading on the announcement day, closing around $271. The muted reaction suggests markets view Ternus as a credible successor." } },
    { "@type": "Question", name: "What is Apple's current market cap?", acceptedAnswer: { "@type": "Answer", text: "Apple's market cap stands at approximately $4 trillion as of April 2026, making it one of the top three most valuable public companies in the world." } },
  ],
};

export default function BlogPostPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <style>{`
        .apple-ceo-article { --bg:#0a0a0f;--surface:#111118;--surface-2:#16161f;--border:#1e1e2e;--accent:#2997ff;--accent-soft:rgba(41,151,255,0.12);--gold:#f5c842;--gold-soft:rgba(245,200,66,0.1);--text:#e8e8f0;--text-muted:#888899;--text-dim:#55556a;--green:#30d158;--red:#ff453a;--radius:12px;--font-display:'Georgia','Times New Roman',serif;--font-body:'Charter','Georgia',serif;--font-ui:-apple-system,'SF Pro Text',sans-serif; background:var(--bg);color:var(--text);font-family:var(--font-body);font-size:18px;line-height:1.75;-webkit-font-smoothing:antialiased; }
        .apple-ceo-article * { box-sizing:border-box; }
        .ceo-topnav { display:flex;align-items:center;justify-content:space-between;padding:16px 32px;border-bottom:1px solid var(--border);background:rgba(10,10,15,0.9);backdrop-filter:blur(12px);position:sticky;top:0;z-index:100; }
        .ceo-topnav-logo { font-family:var(--font-ui);font-size:15px;font-weight:600;color:var(--text);text-decoration:none;letter-spacing:-0.3px; }
        .ceo-topnav-logo span { color:var(--accent); }
        .ceo-topnav-links { display:flex;gap:24px; }
        .ceo-topnav-links a { font-family:var(--font-ui);font-size:13px;color:var(--text-muted);text-decoration:none;transition:color 0.2s; }
        .ceo-topnav-links a:hover { color:var(--text); }
        .ceo-hero { max-width:780px;margin:0 auto;padding:64px 24px 48px; }
        .ceo-hero-category { display:inline-flex;align-items:center;gap:6px;font-family:var(--font-ui);font-size:11px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:var(--accent);background:var(--accent-soft);border:1px solid rgba(41,151,255,0.2);border-radius:100px;padding:5px 12px;margin-bottom:24px; }
        .ceo-hero-category::before { content:'';width:6px;height:6px;border-radius:50%;background:var(--accent);animation:ceoPulse 2s infinite; }
        @keyframes ceoPulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.4;transform:scale(0.8);} }
        .apple-ceo-article h1 { font-family:var(--font-display);font-size:clamp(28px,5vw,46px);font-weight:700;line-height:1.2;letter-spacing:-0.5px;color:#fff;margin-bottom:20px; }
        .apple-ceo-article h1 em { font-style:normal;color:var(--accent); }
        .ceo-hero-deck { font-size:19px;color:var(--text-muted);line-height:1.65;margin-bottom:28px; }
        .ceo-meta-row { display:flex;align-items:center;gap:16px;flex-wrap:wrap;font-family:var(--font-ui);font-size:13px;color:var(--text-dim);padding-bottom:32px;border-bottom:1px solid var(--border); }
        .ceo-meta-row strong { color:var(--text-muted); }
        .ceo-meta-dot { color:var(--border); }
        .ceo-badge-breaking { background:rgba(255,69,58,0.15);border:1px solid rgba(255,69,58,0.3);color:var(--red);border-radius:4px;padding:2px 8px;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase; }
        .ceo-article-body { max-width:780px;margin:0 auto;padding:0 24px 80px; }
        .apple-ceo-article h2 { font-family:var(--font-display);font-size:clamp(20px,3vw,28px);font-weight:700;color:#fff;margin:52px 0 16px;letter-spacing:-0.3px;line-height:1.3; }
        .apple-ceo-article h3 { font-family:var(--font-display);font-size:20px;font-weight:700;color:var(--text);margin:36px 0 12px; }
        .apple-ceo-article p { color:var(--text);margin-bottom:22px;font-size:17.5px; }
        .apple-ceo-article a { color:var(--accent);text-decoration:underline;text-underline-offset:3px;text-decoration-color:rgba(41,151,255,0.35);transition:text-decoration-color 0.2s; }
        .apple-ceo-article a:hover { text-decoration-color:var(--accent); }
        .ceo-callout { background:var(--surface-2);border-left:3px solid var(--accent);border-radius:0 var(--radius) var(--radius) 0;padding:20px 24px;margin:32px 0; }
        .ceo-callout p { margin:0;font-size:16.5px;color:var(--text-muted); }
        .ceo-callout strong { color:var(--text); }
        .ceo-stat-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin:32px 0; }
        .ceo-stat-card { background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:20px;text-align:center; }
        .ceo-stat-number { font-family:var(--font-ui);font-size:26px;font-weight:700;color:var(--accent);letter-spacing:-1px;display:block; }
        .ceo-stat-label { font-family:var(--font-ui);font-size:12px;color:var(--text-dim);margin-top:4px;display:block; }
        .ceo-profile-grid { display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:32px 0; }
        @media(max-width:600px){ .ceo-profile-grid { grid-template-columns:1fr; } }
        .ceo-profile-card { background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:24px; }
        .ceo-profile-card .ceo-name { font-family:var(--font-ui);font-size:17px;font-weight:700;color:#fff;margin-bottom:4px; }
        .ceo-profile-card .ceo-role { font-family:var(--font-ui);font-size:12px;color:var(--accent);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:14px; }
        .ceo-profile-row { display:flex;justify-content:space-between;font-family:var(--font-ui);font-size:13px;padding:7px 0;border-bottom:1px solid var(--border); }
        .ceo-profile-row:last-child { border-bottom:none; }
        .ceo-profile-row span:first-child { color:var(--text-dim); }
        .ceo-profile-row span:last-child { color:var(--text);font-weight:500; }
        .ceo-timeline { margin:32px 0; }
        .ceo-timeline-item { display:flex;gap:20px;padding-bottom:28px;position:relative; }
        .ceo-timeline-item::before { content:'';position:absolute;left:19px;top:32px;bottom:0;width:1px;background:var(--border); }
        .ceo-timeline-item:last-child::before { display:none; }
        .ceo-timeline-dot { width:40px;height:40px;border-radius:50%;background:var(--surface);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-family:var(--font-ui);font-size:11px;font-weight:700;color:var(--accent);flex-shrink:0; }
        .ceo-timeline-content { padding-top:8px; }
        .ceo-timeline-content strong { font-family:var(--font-ui);font-size:14px;color:var(--text);display:block;margin-bottom:4px; }
        .ceo-timeline-content p { font-size:14px;color:var(--text-muted);margin:0; }
        .ceo-stock-box { background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:20px 24px;margin:32px 0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px; }
        .ceo-stock-left { display:flex;align-items:center;gap:12px; }
        .ceo-stock-ticker { font-family:var(--font-ui);font-size:22px;font-weight:800;color:#fff;letter-spacing:-0.5px; }
        .ceo-stock-name { font-family:var(--font-ui);font-size:12px;color:var(--text-dim); }
        .ceo-stock-price { font-family:var(--font-ui);font-size:28px;font-weight:700;color:#fff; }
        .ceo-stock-change { font-family:var(--font-ui);font-size:13px;color:var(--red);background:rgba(255,69,58,0.1);border-radius:6px;padding:3px 8px; }
        .ceo-stock-note { font-family:var(--font-ui);font-size:11px;color:var(--text-dim);width:100%; }
        .ceo-faq-list { margin:24px 0; }
        .ceo-faq-item { border:1px solid var(--border);border-radius:var(--radius);margin-bottom:10px;overflow:hidden; }
        .ceo-faq-q { font-family:var(--font-ui);font-size:15px;font-weight:600;color:var(--text);padding:18px 20px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:12px;background:var(--surface);user-select:none; }
        .ceo-faq-q::after { content:'+';font-size:20px;color:var(--accent);flex-shrink:0;transition:transform 0.2s; }
        .ceo-faq-item.open .ceo-faq-q::after { transform:rotate(45deg); }
        .ceo-faq-a { display:none;padding:0 20px 18px;font-size:15px;color:var(--text-muted);background:var(--surface);line-height:1.65; }
        .ceo-faq-item.open .ceo-faq-a { display:block; }
        .ceo-related-tools { background:linear-gradient(135deg,rgba(41,151,255,0.06),rgba(41,151,255,0.02));border:1px solid rgba(41,151,255,0.2);border-radius:var(--radius);padding:24px;margin:40px 0; }
        .ceo-related-tools h4 { font-family:var(--font-ui);font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--accent);margin-bottom:14px; }
        .ceo-related-tools ul { list-style:none;display:flex;flex-wrap:wrap;gap:10px;padding:0;margin:0; }
        .ceo-related-tools li a { display:inline-block;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:7px 14px;font-family:var(--font-ui);font-size:13px;color:var(--text-muted);text-decoration:none;transition:all 0.2s; }
        .ceo-related-tools li a:hover { color:var(--accent);border-color:rgba(41,151,255,0.3); }
        .ceo-conclusion-card { background:var(--surface);border:1px solid var(--gold);border-radius:var(--radius);padding:28px;margin:40px 0; }
        .ceo-conclusion-card h3 { color:var(--gold);margin-top:0;margin-bottom:12px;font-size:18px; }
        .ceo-conclusion-card p { font-size:16px;color:var(--text-muted);margin:0; }
        .ceo-article-footer { max-width:780px;margin:0 auto;padding:32px 24px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px; }
        .ceo-article-footer p { font-family:var(--font-ui);font-size:13px;color:var(--text-dim);margin:0; }
        .ceo-article-footer a { color:var(--accent);text-decoration:none; }
        .ceo-breadcrumb { max-width:780px;margin:0 auto;padding:20px 24px 0;font-family:var(--font-ui);font-size:12px;color:var(--text-dim); }
        .ceo-breadcrumb a { color:var(--text-dim);text-decoration:none; }
        .ceo-breadcrumb a:hover { color:var(--accent); }
        .ceo-breadcrumb span { margin:0 6px; }
      `}</style>

      <div className="apple-ceo-article">
        <div className="ceo-breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/blog">Blog</Link>
          <span>/</span>
          New Apple CEO: John Ternus Replaces Tim Cook
        </div>

        <header className="ceo-hero">
          <div className="ceo-hero-category">Breaking News — April 21, 2026</div>
          <h1>New Apple CEO <em>John Ternus</em> Replaces Tim Cook — Everything You Need to Know</h1>
          <p className="ceo-hero-deck">Tim Cook is stepping down as Apple CEO after 15 transformative years. John Ternus, Apple&apos;s hardware engineering chief, becomes the new Apple CEO on September 1, 2026. Here&apos;s the full story — age, net worth, wife, Apple stock impact, and what it means for Apple Inc.</p>
          <div className="ceo-meta-row">
            <span className="ceo-badge-breaking">Breaking</span>
            <strong>By <Link href="/author">Shahzeb Zafar</Link></strong>
            <span className="ceo-meta-dot">·</span>
            <span>April 21, 2026</span>
            <span className="ceo-meta-dot">·</span>
            <span>12 min read</span>
          </div>
        </header>

        <article className="ceo-article-body">
          <p>In one of the biggest corporate announcements of 2026, <strong>Apple Inc.</strong> confirmed on April 20, 2026 that <strong>Tim Cook is stepping down as Apple CEO</strong> after nearly 15 years at the helm. His successor is <strong>John Ternus</strong> — Apple&apos;s Senior Vice President of Hardware Engineering and the architect behind some of Apple&apos;s greatest product innovations. The transition is set for <strong>September 1, 2026</strong>, making Ternus the <strong>new Apple CEO</strong> and only the eighth chief executive in the company&apos;s 50-year history.</p>
          <p>The announcement sent shockwaves through the tech world. <strong>Apple stock (AAPL)</strong> dipped slightly in after-hours trading, but the news largely confirmed what market watchers had been speculating for months: Tim Cook would eventually hand the baton to a trusted product insider. If you&apos;ve been searching for <em>John Ternus</em>, <em>Tim Cook stepping down</em>, <em>new Apple CEO</em>, or <em>AAPL stock</em> — this is your definitive guide.</p>

          <div className="ceo-stat-grid">
            <div className="ceo-stat-card"><span className="ceo-stat-number">$4T</span><span className="ceo-stat-label">Apple Market Cap</span></div>
            <div className="ceo-stat-card"><span className="ceo-stat-number">15 yrs</span><span className="ceo-stat-label">Tim Cook as CEO</span></div>
            <div className="ceo-stat-card"><span className="ceo-stat-number">50 yrs</span><span className="ceo-stat-label">John Ternus Age</span></div>
            <div className="ceo-stat-card"><span className="ceo-stat-number">Sep 1</span><span className="ceo-stat-label">Transition Date</span></div>
            <div className="ceo-stat-card"><span className="ceo-stat-number">$75M+</span><span className="ceo-stat-label">Ternus Net Worth</span></div>
            <div className="ceo-stat-card"><span className="ceo-stat-number">#8</span><span className="ceo-stat-label">Apple CEO in History</span></div>
          </div>

          <div className="ceo-stock-box">
            <div className="ceo-stock-left">
              <div>
                <div className="ceo-stock-ticker">AAPL</div>
                <div className="ceo-stock-name">Apple Inc. · NASDAQ</div>
              </div>
            </div>
            <div><div className="ceo-stock-price">~$271</div></div>
            <div className="ceo-stock-change">▼ −0.5% after-hours</div>
            <p className="ceo-stock-note">Apple stock price as of April 20, 2026 after-hours following the CEO announcement. Apple&apos;s market cap stands at approximately $4 trillion.</p>
          </div>

          <h2>Why Is Tim Cook Stepping Down as Apple CEO?</h2>
          <p>The question everyone is asking: <strong>why did Tim Cook step down?</strong> Apple&apos;s official statement points to a carefully planned, long-term succession process — not a crisis or controversy. The transition was <strong>unanimously approved by Apple&apos;s Board of Directors</strong> following what the company described as &quot;a thoughtful, long-term succession planning process.&quot;</p>
          <p>Tim Cook, who turned 65 in November 2025, has been at Apple for 28 years — joining in 1998 and becoming permanent CEO in 2011 following the death of co-founder <a href="https://en.wikipedia.org/wiki/Steve_Jobs" rel="noopener noreferrer" target="_blank">Steve Jobs</a>. Cook recently told ABC&apos;s Good Morning America that he &quot;can&apos;t imagine life without Apple&quot; — a statement he made just weeks before the announcement.</p>
          <div className="ceo-callout">
            <p><strong>&quot;It has been the greatest privilege of my life to be the CEO of Apple,&quot;</strong> Cook said in his statement. He will remain CEO until September 1, 2026, working closely with Ternus to ensure a smooth handover.</p>
          </div>
          <p>As <strong>Executive Chairman</strong>, Cook will not disappear from the picture. He will engage with global policymakers, assist with select company matters, and remain deeply connected to the institution he helped transform. Under Cook&apos;s leadership, Apple grew from a $350 billion company to a <strong>$4 trillion giant</strong>, with annual revenue surging from $108 billion to over <strong>$416 billion</strong> by fiscal year 2025.</p>

          <div className="ceo-profile-grid">
            <div className="ceo-profile-card">
              <div className="ceo-name">Tim Cook</div>
              <div className="ceo-role">Outgoing CEO → Executive Chairman</div>
              <div className="ceo-profile-row"><span>Age</span><span>65</span></div>
              <div className="ceo-profile-row"><span>Joined Apple</span><span>1998</span></div>
              <div className="ceo-profile-row"><span>Became CEO</span><span>2011</span></div>
              <div className="ceo-profile-row"><span>Net Worth</span><span>~$3 Billion</span></div>
              <div className="ceo-profile-row"><span>2025 Salary</span><span>$74.6M</span></div>
              <div className="ceo-profile-row"><span>New Role</span><span>Executive Chairman</span></div>
            </div>
            <div className="ceo-profile-card">
              <div className="ceo-name">John Ternus</div>
              <div className="ceo-role">Incoming CEO (Sept 1, 2026)</div>
              <div className="ceo-profile-row"><span>Age</span><span>50</span></div>
              <div className="ceo-profile-row"><span>Joined Apple</span><span>2001</span></div>
              <div className="ceo-profile-row"><span>Became SVP</span><span>2021</span></div>
              <div className="ceo-profile-row"><span>Net Worth</span><span>$75M–$100M</span></div>
              <div className="ceo-profile-row"><span>Education</span><span>UPenn, Mech. Eng.</span></div>
              <div className="ceo-profile-row"><span>New Role</span><span>CEO + Board Director</span></div>
            </div>
          </div>

          <h2>Who Is John Ternus? The New Apple CEO Explained</h2>
          <p><strong>John Ternus</strong> is a 50-year-old American engineer and business executive who has spent virtually his entire career at Apple. Born in May 1975, Ternus grew up with a deep fascination for how physical objects are built and designed — a curiosity that led him to study mechanical engineering at the <a href="https://www.upenn.edu" rel="noopener noreferrer" target="_blank">University of Pennsylvania</a>, graduating in 1997.</p>
          <p>At Penn, Ternus wasn&apos;t just academically focused. He was a competitive varsity swimmer, winning events including the 50-meter freestyle and 200-meter individual medley. His senior project — a mechanical feeding arm designed for individuals with quadriplegia — foreshadowed a career defined by blending engineering precision with human impact.</p>
          <p>After graduation, Ternus spent a brief period at a startup called Virtual Research Systems, designing early virtual reality headsets. He joined <strong>Apple in 2001</strong> as part of the product design team, with his first project being the Apple Cinema Display. From there, his rise was steady and relentless.</p>

          <h3>John Ternus: Career Timeline at Apple</h3>
          <div className="ceo-timeline">
            <div className="ceo-timeline-item">
              <div className="ceo-timeline-dot">2001</div>
              <div className="ceo-timeline-content">
                <strong>Joined Apple — Product Design Team</strong>
                <p>Ternus joined Apple four years after graduating from UPenn. His first project was the Apple Cinema Display.</p>
              </div>
            </div>
            <div className="ceo-timeline-item">
              <div className="ceo-timeline-dot">2013</div>
              <div className="ceo-timeline-content">
                <strong>Appointed VP of Hardware Engineering</strong>
                <p>Under Dan Riccio, Ternus led hardware development for AirPods, Mac, and iPad product lines.</p>
              </div>
            </div>
            <div className="ceo-timeline-item">
              <div className="ceo-timeline-dot">2021</div>
              <div className="ceo-timeline-content">
                <strong>Promoted to SVP of Hardware Engineering</strong>
                <p>Became the youngest member of Apple&apos;s executive team. Led the historic transition from Intel to Apple Silicon (M-series chips) — one of the most consequential shifts in modern computing.</p>
              </div>
            </div>
            <div className="ceo-timeline-item">
              <div className="ceo-timeline-dot">2026</div>
              <div className="ceo-timeline-content">
                <strong>Named Apple CEO — Effective September 1, 2026</strong>
                <p>Announced April 20, 2026. Ternus becomes Apple&apos;s eighth CEO, joining the board of directors on the same date.</p>
              </div>
            </div>
          </div>

          <h2>John Ternus Age, Net Worth & Salary</h2>
          <p><strong>How old is John Ternus?</strong> John Ternus was born in May 1975, making him <strong>50 years old in 2026</strong>. Notably, Ternus is almost the same age Tim Cook was when Cook became CEO in 2011 — making the generational passing of the torch particularly symmetrical.</p>
          <p><strong>What is John Ternus&apos;s net worth?</strong> As of 2026, John Ternus&apos;s net worth is estimated to be between <strong>$75 million and $100 million</strong>, according to Celebrity Net Worth and multiple biographic sources. This figure is expected to rise dramatically once his CEO compensation package — likely modelled after Tim Cook&apos;s $74+ million annual package — takes effect.</p>
          <p>As SVP of Hardware Engineering, Ternus&apos;s base salary was approximately $1 million per year, but total annual compensation including performance bonuses and stock awards reportedly reached <strong>$25–$30 million</strong>. His exact CEO package will be disclosed in a regulatory filing within four business days, per Apple&apos;s statement.</p>

          <h2>Tim Cook: Net Worth, Legacy & What He Did at Apple</h2>
          <p>Few CEOs in history have presided over a company transformation as dramatic as Tim Cook&apos;s tenure at <strong>Apple Inc.</strong> When Cook took over from Steve Jobs in 2011, Apple&apos;s market cap was $350 billion. Today, it stands at <strong>over $4 trillion</strong>.</p>
          <p><strong>Tim Cook&apos;s net worth</strong> is estimated at approximately <strong>$3 billion</strong> by Forbes, amassed through decades of salary, stock awards, and long-term equity grants. His total compensation in 2025 was $74.6 million, including a $3 million base salary.</p>
          <p>Under Cook&apos;s leadership, Apple launched the Apple Watch, AirPods, and Apple Vision Pro. The company&apos;s services revenue — from iCloud, Apple Pay, Apple Music, and Apple TV+ — became a multi-hundred-billion dollar business. Apple also expanded to over <strong>200 countries and territories</strong>, operating 500 retail stores with over 100,000 employees globally.</p>
          <div className="ceo-callout">
            <p><strong>Cook&apos;s era in numbers:</strong> Apple&apos;s annual revenue grew from $108B (FY2011) to <strong>$416B (FY2025)</strong>. AAPL stock gained over <strong>1,700%</strong> during his tenure. The active device install base grew to <strong>2.5 billion devices</strong>.</p>
          </div>
          <p>Cook also championed privacy and security as core Apple values, pushed a major environmental sustainability agenda (aided by Ternus himself), and navigated complex geopolitical challenges including U.S.-China trade tensions and the Trump-era tariff environment.</p>

          <h2>John Ternus at Apple: The Engineer Who Built the Future</h2>
          <p>If Tim Cook was Apple&apos;s operational and commercial genius, <strong>John Ternus</strong> is the engineering heartbeat of the products billions of people use daily. His fingerprints are on every major Apple hardware line: iPhone, iPad, Mac, Apple Watch, and AirPods.</p>
          <p>But Ternus&apos;s crowning achievement as SVP was leading Apple&apos;s transition from Intel processors to Apple&apos;s own <strong>M-series chips (Apple Silicon)</strong> — a bold, risky move that paid off spectacularly. The M1, M2, M3, and M4 generations transformed Mac performance, battery life, and thermal efficiency, setting a new benchmark for personal computing. Products like the MacBook Air, MacBook Pro, and Mac Studio were entirely reimagined around this shift.</p>
          <p>Ternus was also instrumental in sustainability initiatives: introducing a new recycled aluminum compound used across multiple Apple product lines, pioneering 3D-printed titanium in Apple Watch Ultra 3, and advancing repairability programs that extended the lifespan of Apple devices.</p>
          <p>Said Cook of Ternus in Apple&apos;s announcement: <em>&quot;John Ternus has the mind of an engineer, the soul of an innovator, and the heart to lead with integrity and with honor. He is without question the right person to lead Apple into the future.&quot;</em></p>
          <p>Ternus responded: <em>&quot;Having spent almost my entire career at Apple, I have been lucky to have worked under Steve Jobs and to have had Tim Cook as my mentor. I am profoundly grateful for this opportunity to carry Apple&apos;s mission forward.&quot;</em></p>

          <h2>John Ternus Wife & Personal Life: What We Know</h2>
          <p>Public curiosity about <strong>John Ternus&apos;s wife</strong> and personal life has surged since the announcement. The short answer: Ternus is famously private. Unlike many tech executives who occasionally share glimpses of their family life on social media, <strong>Ternus has never publicly identified a spouse or children</strong> in any interview, keynote, or official statement.</p>
          <p>As of April 2026, no credible source has confirmed the name of his wife or details about his family. Some reports suggest he may be married, but these remain unverified. He is believed to reside in the <strong>San Francisco Bay Area</strong>, close to Apple&apos;s Cupertino headquarters. This level of discretion is consistent with Apple&apos;s broader corporate culture of keeping executive personal lives out of the spotlight.</p>
          <p>What <em>is</em> known: Ternus is a dedicated fitness enthusiast — fitting given his competitive swimming background at UPenn — and he frequently references the Apple Watch in the context of health and personal performance during Apple keynote events.</p>

          <h2>Apple Stock (AAPL): What Does This Mean for Investors?</h2>
          <p><strong>Apple stock (AAPL)</strong> dipped approximately 0.5% in after-hours trading on the day of the announcement, closing at around $271 per share. This relatively muted reaction suggests the market largely views Ternus as a credible, expected successor — rather than a surprise or disruptive appointment.</p>
          <p>Apple&apos;s market cap currently stands at approximately <strong>$4 trillion</strong>, making it one of the most valuable public companies in the world, behind only Nvidia and Google parent Alphabet. Under Cook, AAPL returned over <strong>1,700%</strong> to shareholders.</p>
          <p>Key questions for investors going forward center on Ternus&apos;s ability to drive Apple&apos;s <strong>AI strategy</strong>. Apple has faced criticism for lagging behind rivals in generative AI. The company recently replaced its AI leadership with a Google veteran and announced plans to power future Apple Intelligence features using <strong>Google&apos;s Gemini AI model</strong>. As a product-first CEO, Ternus will be under immediate pressure to accelerate this roadmap.</p>
          <p>For the latest <strong>Apple stock price</strong> and real-time AAPL data, visit <a href="https://finance.yahoo.com/quote/AAPL/" rel="noopener noreferrer" target="_blank">Yahoo Finance</a> or check the <a href="https://www.apple.com/investor-relations/" rel="noopener noreferrer" target="_blank">Apple Investor Relations</a> page.</p>

          <div className="ceo-related-tools">
            <h4>Free Social Media Tools — Useful for Apple Fans & Content Creators</h4>
            <ul>
              <li><Link href="/tools/tweet-generator">Tweet Generator</Link></li>
              <li><Link href="/tools/instagram-post-generator">Instagram Post Generator</Link></li>
              <li><Link href="/tools/twitter-ad-revenue">Twitter Ad Revenue Calculator</Link></li>
              <li><Link href="/tools/tweet-to-image">Tweet to Image Converter</Link></li>
              <li><Link href="/tools">View All 39+ Free Tools →</Link></li>
            </ul>
          </div>

          <h2>From Steve Jobs to Tim Cook to John Ternus: Apple&apos;s Leadership Legacy</h2>
          <p><strong>Apple Inc.</strong> has had only eight CEOs in its 50-year history — a testament to its deliberate, stability-focused leadership philosophy. The transition from <strong>Steve Jobs</strong> to Tim Cook in 2011 was defined by uncertainty: Jobs died of pancreatic cancer just six weeks after formally handing off the role, leaving Cook to lead a company the world wondered could survive without its visionary founder.</p>
          <p>Cook proved the skeptics wrong emphatically. Now, as Cook passes the torch to <strong>John Ternus</strong>, Apple is once again reverting to a &quot;product person&quot; at the helm — mirroring the Jobs era in spirit, if not in style. Ternus is widely regarded as quieter and more measured than Jobs, but equally rigorous in his engineering standards and product vision.</p>
          <p>The appointment also signals Apple&apos;s commitment to promoting from within. Ternus joined Apple in 2001 — just four years after Jobs returned to the company — and has never worked anywhere else in his adult life. In an era where tech companies frequently recruit external superstar CEOs, Apple has chosen continuity, institutional knowledge, and deep cultural alignment.</p>
          <p>You can read the <a href="https://www.apple.com/newsroom/" rel="noopener noreferrer" target="_blank">Apple Newsroom official announcement</a> and Tim Cook&apos;s full letter to shareholders on Apple&apos;s investor relations page.</p>

          <h2>Challenges Facing New Apple CEO John Ternus</h2>
          <p>Taking over a $4 trillion company is never simple. Ternus inherits both enormous opportunities and significant challenges:</p>
          <p><strong>Artificial Intelligence:</strong> Apple has fallen behind competitors like Google, Microsoft, and OpenAI in generative AI. The delayed Siri upgrade, the departure of Apple&apos;s AI chief at the end of 2025, and the decision to partner with Google Gemini rather than build in-house models have all drawn criticism. Ternus must accelerate Apple Intelligence to satisfy investors and users alike.</p>
          <p><strong>Hardware Innovation:</strong> The iPhone is approaching its 20th anniversary, and questions about the next great hardware category loom large. The Vision Pro headset has struggled to gain mainstream adoption. The MacBook Neo and new AirPods hearing health system are promising, but the market expects Ternus — as a hardware genius — to define what comes next.</p>
          <p><strong>Geopolitics & Supply Chain:</strong> Apple operates in over 200 countries and sources components globally. The ongoing U.S.-China trade tensions, the Trump administration&apos;s tariff environment, and the strategic push to diversify manufacturing (including new U.S.-based assembly lines) will continue to demand CEO-level attention.</p>

          <h2>Frequently Asked Questions (FAQ)</h2>
          <div className="ceo-faq-list" id="faq">
            <div className="ceo-faq-item">
              <div className="ceo-faq-q">Why is Tim Cook stepping down as Apple CEO?</div>
              <div className="ceo-faq-a">Tim Cook is stepping down after 15 years as part of a planned, long-term succession process unanimously approved by Apple&apos;s Board of Directors. Cook, who turns 65, will transition to Executive Chairman of the board on September 1, 2026.</div>
            </div>
            <div className="ceo-faq-item">
              <div className="ceo-faq-q">Who is the new Apple CEO?</div>
              <div className="ceo-faq-a">John Ternus, Apple&apos;s Senior Vice President of Hardware Engineering, is the new Apple CEO. He officially takes over on September 1, 2026, becoming Apple&apos;s eighth CEO in the company&apos;s history.</div>
            </div>
            <div className="ceo-faq-item">
              <div className="ceo-faq-q">How old is Tim Cook?</div>
              <div className="ceo-faq-a">Tim Cook was born on November 1, 1960, making him 65 years old in 2026. He joined Apple in 1998 and became CEO in 2011 following Steve Jobs&apos;s death.</div>
            </div>
            <div className="ceo-faq-item">
              <div className="ceo-faq-q">How old is John Ternus?</div>
              <div className="ceo-faq-a">John Ternus was born in May 1975, making him 50 years old in 2026 — nearly the same age Tim Cook was when he became CEO in 2011.</div>
            </div>
            <div className="ceo-faq-item">
              <div className="ceo-faq-q">What is John Ternus&apos;s net worth?</div>
              <div className="ceo-faq-a">John Ternus&apos;s net worth is estimated between $75 million and $100 million as of 2026. This is expected to grow significantly once his CEO compensation package is confirmed — potentially worth $60M–$90M+ annually including stock awards.</div>
            </div>
            <div className="ceo-faq-item">
              <div className="ceo-faq-q">What is Tim Cook&apos;s net worth?</div>
              <div className="ceo-faq-a">Forbes estimates Tim Cook&apos;s net worth at approximately $3 billion, built through decades of Apple salary, stock awards, and equity grants. His 2025 total compensation was $74.6 million.</div>
            </div>
            <div className="ceo-faq-item">
              <div className="ceo-faq-q">Who is John Ternus&apos;s wife?</div>
              <div className="ceo-faq-a">John Ternus keeps his personal life extremely private. As of April 2026, no credible source has publicly confirmed the name of his wife or details about his family. He is believed to reside in the San Francisco Bay Area.</div>
            </div>
            <div className="ceo-faq-item">
              <div className="ceo-faq-q">What will happen to Apple stock (AAPL) after the CEO change?</div>
              <div className="ceo-faq-a">AAPL dipped approximately 0.5% in after-hours trading on the announcement day, closing around $271. The muted reaction suggests markets view Ternus as a credible successor. Long-term performance will depend on Apple&apos;s AI strategy and hardware innovation pipeline under new leadership.</div>
            </div>
            <div className="ceo-faq-item">
              <div className="ceo-faq-q">What is Apple&apos;s current market cap?</div>
              <div className="ceo-faq-a">Apple&apos;s market cap stands at approximately $4 trillion as of April 2026, making it one of the top three most valuable public companies in the world alongside Nvidia and Alphabet (Google).</div>
            </div>
          </div>

          <div className="ceo-conclusion-card">
            <h3>✦ The Bottom Line</h3>
            <p>Tim Cook&apos;s departure marks the end of one of the most successful runs in corporate history — a 15-year reign that turned Apple into a $4 trillion institution. John Ternus, the quiet engineer who helped build the iPhone, Mac, AirPods, and Apple Silicon, now carries that legacy forward. The transition reflects Apple&apos;s deepest values: promoting from within, trusting the product, and thinking long-term. All eyes now turn to September 1, 2026 — and the era of Ternus begins.</p>
          </div>

          <p style={{ fontSize: "14px", color: "var(--text-dim)", marginTop: "40px" }}>
            <strong>Sources:</strong>{" "}
            <a href="https://www.cnbc.com/2026/04/20/apple-names-john-ternus-ceo-replacing-tim-cook-who-becomes-chairman.html" rel="noopener noreferrer" target="_blank">CNBC</a>,{" "}
            <a href="https://techcrunch.com/2026/04/20/tim-cook-stepping-down-as-apple-ceo-john-ternus-taking-over/" rel="noopener noreferrer" target="_blank">TechCrunch</a>,{" "}
            <a href="https://fortune.com/2026/04/20/apple-ceo-tim-cook-stepping-down-hardware-exec-john-ternus-new-ceo/" rel="noopener noreferrer" target="_blank">Fortune</a>,{" "}
            <a href="https://en.wikipedia.org/wiki/John_Ternus" rel="noopener noreferrer" target="_blank">Wikipedia</a>,{" "}
            <a href="https://www.apple.com/newsroom/" rel="noopener noreferrer" target="_blank">Apple Newsroom</a>.
            Last updated April 21, 2026.
          </p>
        </article>

        <footer className="ceo-article-footer">
          <p>© 2026 <Link href="/">AI Social Tools</Link> · Built by <Link href="/author">Shahzeb Zafar</Link></p>
          <p><Link href="/blog">Blog</Link> · <Link href="/tools">Free Tools</Link> · <Link href="/privacy">Privacy</Link></p>
        </footer>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        document.querySelectorAll('.ceo-faq-q').forEach(btn => {
          btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const wasOpen = item.classList.contains('open');
            document.querySelectorAll('.ceo-faq-item.open').forEach(el => el.classList.remove('open'));
            if (!wasOpen) item.classList.add('open');
          });
        });
      `}} />
    </>
  );
}
