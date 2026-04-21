import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getToolById, socialMediaTools } from '@/lib/tools';
import { Star, ExternalLink, ArrowLeft, Check } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return socialMediaTools.map((tool) => ({
    id: tool.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const tool = getToolById(id);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  return {
    title: `${tool.name} - Social Media Tool Review`,
    description: tool.description,
    keywords: [tool.name, tool.category, 'social media tool', 'review'],
    openGraph: {
      title: `${tool.name} - Social Media Tool Review`,
      description: tool.description,
      type: 'website',
      url: `https://aisocialtools.co/tools/${id}`,
      siteName: "Social Media Tools",
      images: [
        {
          url: "https://aisocialtools.co/og-default.png",
          width: 1200,
          height: 630,
          alt: `${tool.name} - ${tool.description}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} - Social Media Tool Review`,
      description: tool.description,
      images: ["https://aisocialtools.co/og-default.png"],
    },
    alternates: {
      canonical: `https://aisocialtools.co/tools/${id}`,
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { id } = await params;
  const tool = getToolById(id);

  if (!tool) {
    notFound();
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'SocialMediaApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: tool.pricing,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      ratingCount: 1,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Tools
          </Link>

          {/* Tool Header */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-4xl font-bold text-slate-900">{tool.name}</h1>
                  {tool.isRecommended && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-semibold rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(tool.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-slate-200 text-slate-200"
                      }`}
                    />
                  ))}
                  <span className="text-lg font-semibold text-slate-700 ml-2">{tool.rating}</span>
                  <span className="text-slate-500 ml-1">/ 5.0</span>
                </div>
                <p className="text-lg text-slate-600 mb-4">{tool.description}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-full text-sm">
                    {tool.category}
                  </span>
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Pricing</h2>
            <p className="text-lg text-slate-700">{tool.pricing}</p>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Features</h2>
            <ul className="space-y-3">
              {tool.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Tools */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Similar Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialMediaTools
                .filter(t => t.category === tool.category && t.id !== tool.id)
                .slice(0, 4)
                .map((relatedTool) => (
                  <Link
                    key={relatedTool.id}
                    href={`/tools/${relatedTool.id}`}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 p-6"
                  >
                    <h3 className="font-bold text-slate-900 mb-2">{relatedTool.name}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2 mb-3">{relatedTool.description}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-slate-600">{relatedTool.rating}</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

