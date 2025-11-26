"use client";

import { SocialTool } from "@/lib/social-tools";
import { BookOpen, Lightbulb, Target, TrendingUp, Users, Zap } from "lucide-react";

interface ToolDetailsSectionProps {
  tool: SocialTool;
}

interface DetailCard {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

export default function ToolDetailsSection({ tool }: ToolDetailsSectionProps) {
  // Placeholder cards that can be customized later
  const detailCards: DetailCard[] = [
    {
      id: "how-to-use",
      icon: BookOpen,
      title: "How to Use",
      description: "Step-by-step guide on how to use this tool effectively",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "use-cases",
      icon: Target,
      title: "Use Cases",
      description: "Discover real-world applications and scenarios for this tool",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "best-practices",
      icon: Lightbulb,
      title: "Best Practices",
      description: "Learn tips and tricks to get the most out of this tool",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: "tips",
      icon: Zap,
      title: "Pro Tips",
      description: "Advanced techniques and insider tips for power users",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: "trends",
      icon: TrendingUp,
      title: "Trends & Insights",
      description: "Stay updated with the latest trends and insights",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      id: "community",
      icon: Users,
      title: "Community",
      description: "Join discussions and share your experiences",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  return (
    <div className="mt-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Learn More</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Explore detailed guides, best practices, and tips to master {tool.name}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {detailCards.map((card) => {
          const Icon = card.icon;
          // Map light colors to dark mode equivalents
          const darkBgColor = card.bgColor.replace("50", "900/20");
          const darkTextColor = card.color.replace("600", "400");
          return (
            <div
              key={card.id}
              className={`${card.bgColor} dark:${darkBgColor} rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer group`}
            >
              <div className="flex items-start gap-4">
                <div className={`${card.color} dark:${darkTextColor} flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-slate-900 dark:text-slate-100 mb-2 group-hover:${card.color} dark:group-hover:${darkTextColor} transition-colors`}>
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{card.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

