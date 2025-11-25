"use client";

import { SocialTool } from "@/lib/social-tools";
import { getSEOMetadata } from "@/lib/seo-metadata";

interface ToolSEOProps {
  tool: SocialTool;
}

export default function ToolSEO({ tool }: ToolSEOProps) {
  const seo = getSEOMetadata(tool);

  const structuredData = {
    ...seo.structuredData,
    "@context": "https://schema.org",
    url: `https://socialmediatools.com${tool.path}`,
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `How to use ${tool.name}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Our ${tool.name.toLowerCase()} is a free online tool that helps you ${tool.description.toLowerCase()}. Simply use the interface above to get started.`
          }
        },
        {
          "@type": "Question",
          name: `Is ${tool.name} free?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Yes, ${tool.name} is completely free to use. No signup or credit card required.`
          }
        }
      ]
    }
  };

  // HowTo schema for usage instructions
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Use ${tool.name}`,
    description: `Learn how to use ${tool.name} to ${tool.description.toLowerCase()}`,
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Access the Tool",
        text: `Navigate to ${tool.name} using the interface above.`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Enter Your Input",
        text: `Enter the required information or content in the input fields.`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Generate Results",
        text: `Click the generate button to create your output.`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Copy or Download",
        text: `Copy the results to your clipboard or download them for later use.`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  );
}

