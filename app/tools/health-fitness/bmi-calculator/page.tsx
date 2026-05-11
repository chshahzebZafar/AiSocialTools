"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import RelatedCategoryTools from "@/components/RelatedCategoryTools";
import { ArrowLeft, Scale, Info, ChevronDown } from "lucide-react";

type Unit = "metric" | "imperial";

interface BMIResult {
  bmi: number;
  category: string;
  categoryColor: string;
  healthyMin: number;
  healthyMax: number;
}

function calcBMI(unit: Unit, height: number, heightFt: number, heightIn: number, weight: number): BMIResult | null {
  let heightMeters: number;
  let weightKg: number;

  if (unit === "metric") {
    if (!height || height <= 0) return null;
    heightMeters = height / 100;
    weightKg = weight;
  } else {
    const totalIn = heightFt * 12 + heightIn;
    if (totalIn <= 0) return null;
    heightMeters = totalIn * 0.0254;
    weightKg = weight * 0.453592;
  }

  if (weightKg <= 0) return null;

  const bmi = weightKg / (heightMeters * heightMeters);
  let category: string;
  let categoryColor: string;

  if (bmi < 18.5) {
    category = "Underweight";
    categoryColor = "text-blue-600 dark:text-blue-400";
  } else if (bmi < 25) {
    category = "Normal weight";
    categoryColor = "text-emerald-600 dark:text-emerald-400";
  } else if (bmi < 30) {
    category = "Overweight";
    categoryColor = "text-amber-600 dark:text-amber-400";
  } else {
    category = "Obese";
    categoryColor = "text-red-600 dark:text-red-400";
  }

  const healthyMinKg = 18.5 * heightMeters * heightMeters;
  const healthyMaxKg = 24.9 * heightMeters * heightMeters;
  const healthyMin = unit === "metric" ? healthyMinKg : healthyMinKg / 0.453592;
  const healthyMax = unit === "metric" ? healthyMaxKg : healthyMaxKg / 0.453592;

  return { bmi, category, categoryColor, healthyMin, healthyMax };
}

const faqs = [
  {
    question: "What is BMI and how is it calculated?",
    answer:
      "BMI (Body Mass Index) is your weight in kilograms divided by the square of your height in meters: BMI = kg / m². It's a quick screening tool — not a diagnosis — used to categorize underweight, normal, overweight, and obese ranges.",
  },
  {
    question: "What's a healthy BMI range?",
    answer:
      "For adults, a BMI between 18.5 and 24.9 is generally considered healthy. Below 18.5 is underweight, 25-29.9 is overweight, and 30+ is obese. These ranges are based on WHO guidelines.",
  },
  {
    question: "Does BMI work for athletes or very muscular people?",
    answer:
      "No — BMI can overestimate body fat in muscular people because muscle is denser than fat. Athletes often score as 'overweight' despite being lean. Body-fat percentage and waist-to-hip ratio are better measures for them.",
  },
  {
    question: "Is BMI accurate for children?",
    answer:
      "Not directly. Children and teens use age-and-sex-specific percentile charts (BMI-for-age), not the adult categories. This calculator is for adults 20 and over.",
  },
  {
    question: "Does this calculator store my data?",
    answer:
      "No. The calculation happens entirely in your browser. Nothing is uploaded, stored, or tracked.",
  },
];

export default function BMICalculatorPage() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [height, setHeight] = useState(170);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(8);
  const [weight, setWeight] = useState(70);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const result = useMemo(
    () => calcBMI(unit, height, heightFt, heightIn, weight),
    [unit, height, heightFt, heightIn, weight]
  );

  const switchToImperial = () => {
    // 70 kg → 154 lb, 170 cm → 5'7"
    setWeight(Math.round(weight / 0.453592));
    const totalIn = height / 2.54;
    setHeightFt(Math.floor(totalIn / 12));
    setHeightIn(Math.round(totalIn % 12));
    setUnit("imperial");
  };

  const switchToMetric = () => {
    setWeight(Math.round(weight * 0.453592));
    setHeight(Math.round((heightFt * 12 + heightIn) * 2.54));
    setUnit("metric");
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BMI Calculator",
    description:
      "Free BMI calculator with metric and imperial units, healthy weight range, and category.",
    url: "https://aisocialtools.co/tools/health-fitness/bmi-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: { "@type": "Answer", text: qa.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aisocialtools.co" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://aisocialtools.co/tools" },
      { "@type": "ListItem", position: 3, name: "Health & Fitness", item: "https://aisocialtools.co/tools/health-fitness" },
      { "@type": "ListItem", position: 4, name: "BMI Calculator", item: "https://aisocialtools.co/tools/health-fitness/bmi-calculator" },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />

      <main className="flex-1">
        <Breadcrumbs />

        {/* Hero */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <Link
              href="/tools/health-fitness"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Health & Fitness tools
            </Link>
            <Badge variant="neutral" className="mb-4">
              <Scale className="w-3 h-3" />
              Health & Fitness
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4 max-w-3xl">
              BMI Calculator
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Calculate your Body Mass Index in seconds. Get your category, healthy weight
              range, and a quick reality check on what BMI does (and doesn&apos;t) measure.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Inputs */}
              <div className="lg:col-span-3">
                <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 sm:p-8">
                  {/* Unit toggle */}
                  <div className="flex items-center gap-1 mb-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md p-1 w-fit">
                    <button
                      onClick={() => unit === "imperial" && switchToMetric()}
                      className={`px-3 h-8 text-xs font-medium rounded transition-colors ${
                        unit === "metric"
                          ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                      }`}
                    >
                      Metric (cm / kg)
                    </button>
                    <button
                      onClick={() => unit === "metric" && switchToImperial()}
                      className={`px-3 h-8 text-xs font-medium rounded transition-colors ${
                        unit === "imperial"
                          ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                      }`}
                    >
                      Imperial (ft·in / lb)
                    </button>
                  </div>

                  {/* Height */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                      Height
                    </label>
                    {unit === "metric" ? (
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(Number(e.target.value))}
                          min="50"
                          max="250"
                          className="flex-1 h-11 px-3 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-base bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                        />
                        <span className="text-sm text-zinc-500 dark:text-zinc-400 w-10">cm</span>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <div className="flex-1 flex items-center gap-2">
                          <input
                            type="number"
                            value={heightFt}
                            onChange={(e) => setHeightFt(Number(e.target.value))}
                            min="1"
                            max="8"
                            className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-base bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                          />
                          <span className="text-sm text-zinc-500 dark:text-zinc-400">ft</span>
                        </div>
                        <div className="flex-1 flex items-center gap-2">
                          <input
                            type="number"
                            value={heightIn}
                            onChange={(e) => setHeightIn(Number(e.target.value))}
                            min="0"
                            max="11"
                            className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-base bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                          />
                          <span className="text-sm text-zinc-500 dark:text-zinc-400">in</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Weight */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                      Weight
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        min="20"
                        max="500"
                        className="flex-1 h-11 px-3 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-base bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                      />
                      <span className="text-sm text-zinc-500 dark:text-zinc-400 w-10">
                        {unit === "metric" ? "kg" : "lb"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 sm:p-8 lg:sticky lg:top-24">
                  <div className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500 font-semibold mb-3">
                    Your BMI
                  </div>
                  {result ? (
                    <>
                      <div className="text-5xl sm:text-6xl font-semibold text-zinc-950 dark:text-white tracking-tight tabular-nums mb-2">
                        {result.bmi.toFixed(1)}
                      </div>
                      <div className={`text-lg font-medium ${result.categoryColor} mb-6`}>
                        {result.category}
                      </div>
                      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-zinc-500 dark:text-zinc-400">Healthy range</span>
                          <span className="text-zinc-950 dark:text-white font-medium tabular-nums">
                            {result.healthyMin.toFixed(1)} – {result.healthyMax.toFixed(1)}{" "}
                            <span className="text-zinc-500 dark:text-zinc-400 font-normal">
                              {unit === "metric" ? "kg" : "lb"}
                            </span>
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500 dark:text-zinc-400">Formula</span>
                          <span className="text-zinc-950 dark:text-white font-mono text-xs">
                            kg ÷ m²
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                      Enter your height and weight to see your BMI.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Range bar */}
            {result && (
              <div className="mt-10 max-w-3xl">
                <div className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500 font-semibold mb-3">
                  Where you fall
                </div>
                <div className="relative h-3 rounded-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden flex">
                  <div className="flex-1 bg-blue-200 dark:bg-blue-500/30" />
                  <div className="flex-1 bg-emerald-200 dark:bg-emerald-500/30" />
                  <div className="flex-1 bg-amber-200 dark:bg-amber-500/30" />
                  <div className="flex-1 bg-red-200 dark:bg-red-500/30" />
                  {/* Marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-zinc-950 dark:bg-white"
                    style={{
                      left: `${Math.min(Math.max(((result.bmi - 15) / (35 - 15)) * 100, 0), 100)}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-500 mt-1.5 tabular-nums">
                  <span>15</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>35+</span>
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-500 mt-0.5">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* How it works */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <Badge variant="neutral" className="mb-4">How it works</Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-6">
              The math behind BMI
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <p>
                BMI is a screening number that estimates body fat from your height and
                weight. The formula is dead simple:
              </p>
              <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md p-4 font-mono text-sm">
                BMI = weight(kg) ÷ height(m)²
              </div>
              <p>
                For imperial units, we convert to metric first (1 lb = 0.453592 kg, 1 in =
                0.0254 m), then run the same formula.
              </p>
              <p>
                The BMI categories are defined by the World Health Organization:
              </p>
              <ul className="space-y-1.5 text-sm">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <span><strong>Under 18.5</strong> — Underweight</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span><strong>18.5 – 24.9</strong> — Normal weight</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                  <span><strong>25 – 29.9</strong> — Overweight</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                  <span><strong>30+</strong> — Obese</span>
                </li>
              </ul>
              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-md p-4 flex items-start gap-3 mt-6">
                <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  <strong>BMI is a screening tool, not a diagnosis.</strong> It doesn&apos;t
                  measure body fat directly, and it&apos;s often wrong for athletes,
                  pregnant people, the elderly, and growing teens. Use it as one data
                  point — not the final word on your health.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <Badge variant="neutral" className="mb-4">FAQ</Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-8">
              Frequently asked questions
            </h2>
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg divide-y divide-zinc-200 dark:divide-zinc-800 overflow-hidden">
              {faqs.map((faq, i) => {
                const open = openFaq === i;
                return (
                  <div key={i} className="bg-white dark:bg-zinc-950">
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full px-5 sm:px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                      aria-expanded={open}
                    >
                      <span className="font-medium text-zinc-950 dark:text-white">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {open && (
                      <div className="px-5 sm:px-6 pb-5 -mt-1">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Related */}
        <RelatedCategoryTools category="health-fitness" currentSlug="bmi-calculator" />

        <section className="bg-zinc-950 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight mb-4">
              More tools coming for health & fitness.
            </h2>
            <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
              Calorie calculator, heart-rate zones, training pace, and one-rep max are next.
            </p>
            <ButtonLink href="/tools/health-fitness" variant="primary" size="lg" className="bg-white text-zinc-950 hover:bg-zinc-200">
              Browse the category
            </ButtonLink>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
