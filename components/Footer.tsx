import Link from "next/link";
import { Coffee, Heart, Mail, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 dark:text-slate-400 border-t border-slate-800 dark:border-slate-900 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* About Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-4">About</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Free social media tools to help you create, manage, and optimize your social media content. 
              All tools are completely free to use with no signup required.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>by</span>
              <span className="text-white font-medium">Your Name</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors" aria-label="Home">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-slate-400 hover:text-white transition-colors" aria-label="All Tools">
                  All Tools
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors" aria-label="About Us">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors" aria-label="Contact Us">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-400 hover:text-white transition-colors" aria-label="FAQ">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors" aria-label="Privacy Policy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-white transition-colors" aria-label="Terms of Service">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/author" className="text-slate-400 hover:text-white transition-colors" aria-label="About the Author">
                  Author
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Social */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support & Connect</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://buymeacoffee.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-yellow-400 transition-colors text-sm group"
                >
                  <Coffee className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Buy me a coffee</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:your.email@example.com"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm"
                >
                  <Twitter className="w-4 h-4" />
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors text-sm"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {currentYear} Social Media Tools. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/author" className="hover:text-white transition-colors">
              Author
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

