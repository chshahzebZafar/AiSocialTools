import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { FileText, Scale, AlertCircle, CheckCircle } from "lucide-react";
import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Terms of Service - Social Media Tools",
  description: "Read our terms of service. Learn about usage rights, restrictions, and guidelines for using our free social media tools.",
  keywords: ["terms of service", "terms and conditions", "usage terms", "legal"],
  openGraph: {
    title: "Terms of Service - Social Media Tools",
    description: "Read our terms of service. Learn about usage rights, restrictions, and guidelines for using our free social media tools.",
    type: "website",
    url: "https://socialmediatools.com/terms",
    siteName: "Social Media Tools",
    images: [
      {
        url: getOGImageUrl("default"),
        width: 1200,
        height: 630,
        alt: "Terms of Service - Social Media Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service - Social Media Tools",
    description: "Read our terms of service. Learn about usage rights, restrictions, and guidelines for using our free social media tools.",
    images: [getOGImageUrl("default")],
  },
  alternates: {
    canonical: "https://socialmediatools.com/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-1">
        <Breadcrumbs />
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-sm text-slate-500 mb-8">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-blue-600" />
                    Acceptance of Terms
                  </h2>
                  <p className="text-slate-700 leading-relaxed">
                    By accessing and using Social Media Tools, you accept and agree to be bound by the terms and 
                    provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    Use License
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Permission is granted to temporarily use our tools for personal and commercial purposes. 
                    This is the grant of a license, not a transfer of title, and under this license you may:
                  </p>
                  <ul className="space-y-2 text-slate-700 ml-4">
                    <li>• Use our tools for any legal purpose</li>
                    <li>• Use generated content for personal or commercial projects</li>
                    <li>• Share and distribute content created with our tools</li>
                  </ul>
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 mt-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-slate-700 text-sm">
                        <strong>Restrictions:</strong> You may not attempt to reverse engineer, modify, or 
                        redistribute our tools. You may not use our services for any illegal or unauthorized purpose.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Service Availability</h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    We strive to provide reliable and uninterrupted service, but we cannot guarantee that our 
                    services will always be available. We reserve the right to:
                  </p>
                  <ul className="space-y-2 text-slate-700 ml-4">
                    <li>• Modify or discontinue services at any time</li>
                    <li>• Perform maintenance that may temporarily interrupt service</li>
                    <li>• Update or change features without prior notice</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">User Content</h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    When you use our tools, you retain all rights to any content you create. We do not claim 
                    ownership of any content generated using our services.
                  </p>
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <h3 className="font-semibold text-slate-900 mb-2">Your Rights</h3>
                    <p className="text-slate-700">
                      All content you create using our tools belongs to you. You can use it for any purpose, 
                      including commercial use, without any restrictions or attribution requirements.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Prohibited Uses</h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    You agree not to use our services:
                  </p>
                  <ul className="space-y-2 text-slate-700 ml-4">
                    <li>• For any unlawful purpose or to solicit others to perform unlawful acts</li>
                    <li>• To violate any international, federal, provincial, or state regulations, rules, or laws</li>
                    <li>• To infringe upon or violate our intellectual property rights or the rights of others</li>
                    <li>• To harass, abuse, insult, harm, defame, slander, or discriminate</li>
                    <li>• To submit false or misleading information</li>
                    <li>• To upload or transmit viruses or any other type of malicious code</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Disclaimer</h2>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    The information on this website is provided on an "as is" basis. To the fullest extent 
                    permitted by law, we exclude all representations, warranties, and conditions relating to 
                    our website and the use of this website.
                  </p>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="text-slate-700 text-sm">
                      We make no warranties, expressed or implied, and hereby disclaim and negate all other 
                      warranties including, without limitation, implied warranties or conditions of merchantability, 
                      fitness for a particular purpose, or non-infringement of intellectual property.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
                  <p className="text-slate-700 leading-relaxed">
                    In no event shall Social Media Tools or its suppliers be liable for any damages (including, 
                    without limitation, damages for loss of data or profit, or due to business interruption) 
                    arising out of the use or inability to use our services, even if we have been notified 
                    orally or in writing of the possibility of such damage.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to Terms</h2>
                  <p className="text-slate-700 leading-relaxed">
                    We reserve the right to revise these terms of service at any time without notice. By using 
                    this website, you are agreeing to be bound by the then current version of these terms of service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
                  <p className="text-slate-700 leading-relaxed">
                    If you have any questions about these Terms of Service, please contact us through our 
                    <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium"> contact page</a>.
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

