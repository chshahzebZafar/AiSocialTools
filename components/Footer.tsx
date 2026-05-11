import Link from "next/link";
import { Coffee, Mail, Github, Twitter, Linkedin, Globe } from "lucide-react";

interface FooterLink {
  href: string;
  label: string;
  badge?: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const linkSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { href: "/", label: "Home" },
      { href: "/tools", label: "All tools" },
      { href: "/ai-directory", label: "AI directory", badge: "New" },
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/author", label: "Author" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

const topCategories: FooterLink[] = [
  { href: "/tools/social-media", label: "Social media" },
  { href: "/tools/file-tools", label: "File & PDF tools", badge: "Soon" },
  { href: "/tools/finance", label: "Finance", badge: "Soon" },
  { href: "/tools/location", label: "Location & travel", badge: "Soon" },
  { href: "/tools/health-fitness", label: "Health & fitness", badge: "Soon" },
];

const socialLinks = [
  { href: "https://github.com/chshahzebZafar/", icon: Github, label: "GitHub" },
  { href: "https://x.com/SHAHZEBZAFAR99", icon: Twitter, label: "Twitter" },
  { href: "https://www.linkedin.com/in/shahzaib-zafer/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://shahzebzafar.netlify.app/", icon: Globe, label: "Website" },
  { href: "mailto:shahzaibzafar093@gmail.com", icon: Mail, label: "Email" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        {/* Brand — full width */}
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
            <div className="w-7 h-7 bg-zinc-950 dark:bg-white rounded-md flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white dark:bg-zinc-950 rounded-sm" />
            </div>
            <span className="text-[15px] font-semibold text-zinc-950 dark:text-white tracking-tight">
              Social Tools
            </span>
          </Link>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm mb-8">
            Free, browser-based social media tools. Built and maintained by one person —
            no ads, no tracking, no signup.
          </p>
          <a
            href="https://buymeacoffee.com/shahzebzafar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-5 px-4 h-12 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-md transition-colors"
          >
            <Coffee className="w-4 h-6" />
            Buy me a coffee
          </a>
        </div>

        {/* Links row: Product | Company | Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 lg:gap-16 border-t border-zinc-200 dark:border-zinc-800 pt-12">
          {/* Product + Company */}
          {linkSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-zinc-950 dark:text-white uppercase tracking-wider mb-5">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors inline-flex items-center gap-1.5"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="inline-flex items-center px-1.5 h-4 rounded text-[10px] font-semibold bg-indigo-600 text-white leading-none">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-950 dark:text-white uppercase tracking-wider mb-5">
              Categories
            </h3>
            <ul className="space-y-3">
              {topCategories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    {link.label}
                    {link.badge && (
                      <span className="inline-flex items-center px-1.5 h-4 rounded text-[10px] font-semibold bg-indigo-600 text-white leading-none">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/tools"
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                >
                  View all categories →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            © {currentYear} Social Tools. Built by{" "}
            <a
              href="https://shahzebzafar.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              Shahzeb Zafar
            </a>
            .
          </p>
          <div className="flex items-center gap-1">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                className="w-8 h-8 flex items-center justify-center rounded-md text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
