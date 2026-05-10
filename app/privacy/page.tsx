import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Shield, Lock, Eye, FileText } from "lucide-react";
import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Privacy Policy - Social Media Tools",
  description: "Read our privacy policy. We don't collect, store, or share your personal data. All processing happens in your browser. Your privacy is our priority.",
  keywords: ["privacy policy", "data privacy", "privacy", "user privacy", "no data collection"],
  openGraph: {
    title: "Privacy Policy - Social Media Tools",
    description: "Read our privacy policy. We don't collect, store, or share your personal data. Your privacy is our priority.",
    type: "website",
    url: "https://aisocialtools.co/privacy",
    siteName: "Social Media Tools",
    images: [
      {
        url: getOGImageUrl("default"),
        width: 1200,
        height: 630,
        alt: "Privacy Policy - Social Media Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - Social Media Tools",
    description: "Read our privacy policy. We don't collect, store, or share your personal data. Your privacy is our priority.",
    images: [getOGImageUrl("default")],
  },
  alternates: {
    canonical: "https://aisocialtools.co/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="flex-1">
        <Breadcrumbs />
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Privacy Policy</h1>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                    <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    Introduction
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    At Social Media Tools, we are committed to protecting your privacy. This Privacy Policy explains
                    how we collect, use, disclose, and safeguard your information when you use our website and services.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    We respect your privacy and are dedicated to providing a safe and secure experience. This policy
                    applies to all visitors and users of our website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                    <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    Information We Collect
                  </h2>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800 mb-4">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">We Collect Minimal Information</h3>
                    <p className="text-slate-700 dark:text-slate-300">
                      We are proud to say that we collect <strong>no personal information</strong> from our users.
                      Our tools work entirely in your browser, and we don't require any registration or account creation.
                    </p>
                  </div>
                  <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                      <span><strong>No Registration Required:</strong> You can use all our tools without creating an account or providing any personal information.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                      <span><strong>No Data Collection:</strong> We don't collect, store, or transmit any personal data, including names, emails, or browsing history.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                      <span><strong>Browser-Based Processing:</strong> All tool processing happens locally in your browser. Your content never leaves your device.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                      <span><strong>No Tracking:</strong> We don't use cookies, tracking pixels, or any analytics tools that identify individual users.</span>
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                    How We Use Information
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    Since we don't collect personal information, there's nothing to use or share. Your privacy is
                    completely protected.
                  </p>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Your Content Stays Yours</h3>
                    <p className="text-slate-700 dark:text-slate-300">
                      Any content you create or upload using our tools is processed entirely in your browser.
                      We never see it, store it, or have access to it. Your work remains completely private.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Third-Party Services</h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    Our website may use third-party services for hosting and content delivery. These services may
                    collect standard web server logs (IP addresses, browser types) for security and performance purposes,
                    but this information is not linked to your identity and is not used to track you.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Children's Privacy</h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Our services are safe for users of all ages. Since we don't collect personal information,
                    we comply with all children's privacy regulations. Our tools can be used safely by anyone
                    without privacy concerns.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Changes to This Policy</h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page
                    with an updated revision date. We encourage you to review this policy periodically.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Contact Us</h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy, please contact us through our
                    <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"> contact page</a>.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
