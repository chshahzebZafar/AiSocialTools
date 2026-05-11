"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowLeft, TrendingUp, ChevronDown } from "lucide-react";

type CompoundFreq = "annually" | "semiannually" | "quarterly" | "monthly" | "daily";

const compoundFreqMap: Record<CompoundFreq, number> = {
  annually: 1,
  semiannually: 2,
  quarterly: 4,
  monthly: 12,
  daily: 365,
};

function fmt(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

interface YearRow {
  year: number;
  balance: number;
  contributed: number;
  interest: number;
}

interface CompoundResult {
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
  yearByYear: YearRow[];
}

function calcCompound(
  principal: number,
  annualRate: number,
  years: number,
  monthlyContribution: number,
  freq: CompoundFreq
): CompoundResult {
  const r = annualRate / 100;
  const n = compoundFreqMap[freq];
  const annualContribution = monthlyContribution * 12;

  let balance = principal;
  let totalContributed = principal;
  const yearByYear: YearRow[] = [];

  for (let year = 1; year <= years; year++) {
    // Simulate compounding within the year, contributing monthly
    const periodRate = r / n;
    const contributionPerPeriod = annualContribution / n;
    for (let period = 0; period < n; period++) {
      balance = balance * (1 + periodRate) + contributionPerPeriod;
      totalContributed += contributionPerPeriod;
    }
    yearByYear.push({
      year,
      balance,
      contributed: totalContributed,
      interest: balance - totalContributed,
    });
  }

  return {
    finalBalance: balance,
    totalContributions: totalContributed,
    totalInterest: balance - totalContributed,
    yearByYear,
  };
}

const faqs = [
  {
    question: "What's the difference between simple and compound interest?",
    answer:
      "Simple interest is calculated only on the original principal. Compound interest pays interest on your interest — so as your balance grows, you earn more each year. Over decades, this difference is enormous.",
  },
  {
    question: "How does compounding frequency affect returns?",
    answer:
      "More frequent compounding (daily vs annually) gives slightly higher returns, but the difference is small. The bigger factors are interest rate, time, and consistent contributions.",
  },
  {
    question: "Does this account for monthly contributions?",
    answer:
      "Yes. Enter your monthly contribution and the calculator simulates the contribution being added each compounding period throughout the year.",
  },
  {
    question: "What rate of return should I assume?",
    answer:
      "Conservative estimates: 4% for savings accounts, 6-7% for diversified stock investments (historical average after inflation), 10% for pre-inflation US stock market average. Higher numbers usually involve more risk.",
  },
  {
    question: "Does this consider taxes or inflation?",
    answer:
      "No — this is gross compound interest. Taxes on investment gains and inflation eroding purchasing power are not included.",
  },
];

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);
  const [monthly, setMonthly] = useState(500);
  const [freq, setFreq] = useState<CompoundFreq>("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const result = useMemo(
    () => calcCompound(principal || 0, rate || 0, years || 0, monthly || 0, freq),
    [principal, rate, years, monthly, freq]
  );

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Compound Interest Calculator",
    description:
      "Free compound interest calculator with monthly contributions and year-by-year growth table.",
    url: "https://aisocialtools.co/tools/finance/compound-interest-calculator",
    applicationCategory: "FinanceApplication",
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
      { "@type": "ListItem", position: 3, name: "Finance", item: "https://aisocialtools.co/tools/finance" },
      { "@type": "ListItem", position: 4, name: "Compound Interest Calculator", item: "https://aisocialtools.co/tools/finance/compound-interest-calculator" },
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
              href="/tools/finance"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Finance tools
            </Link>
            <Badge variant="neutral" className="mb-4">
              <TrendingUp className="w-3 h-3" />
              Finance
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4 max-w-3xl">
              Compound Interest Calculator
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              See how your money grows with compound interest and monthly contributions.
              Year-by-year breakdown so you understand exactly where the growth comes from.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Inputs */}
              <div className="lg:col-span-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 sm:p-8">
                <div className="space-y-5">
                  <NumberField label="Initial investment ($)" value={principal} onChange={setPrincipal} min={0} step={100} />
                  <NumberField label="Monthly contribution ($)" value={monthly} onChange={setMonthly} min={0} step={50} />
                  <NumberField label="Annual interest rate (%)" value={rate} onChange={setRate} min={0} max={50} step={0.1} />
                  <NumberField label="Years" value={years} onChange={setYears} min={1} max={60} step={1} />
                  <div>
                    <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                      Compounding frequency
                    </label>
                    <select
                      value={freq}
                      onChange={(e) => setFreq(e.target.value as CompoundFreq)}
                      className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-base bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer"
                    >
                      <option value="annually">Annually</option>
                      <option value="semiannually">Semi-annually</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="monthly">Monthly</option>
                      <option value="daily">Daily</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 sm:p-8 lg:sticky lg:top-24">
                  <div className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500 font-semibold mb-3">
                    After {years} years
                  </div>
                  <div className="text-4xl sm:text-5xl font-semibold text-zinc-950 dark:text-white tracking-tight tabular-nums mb-2">
                    ${fmt(result.finalBalance)}
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                    Final balance
                  </div>
                  <dl className="space-y-3 text-sm border-t border-zinc-200 dark:border-zinc-800 pt-5">
                    <div className="flex justify-between">
                      <dt className="text-zinc-500 dark:text-zinc-400">Contributions</dt>
                      <dd className="text-zinc-950 dark:text-white font-medium tabular-nums">
                        ${fmt(result.totalContributions)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-zinc-500 dark:text-zinc-400">Interest earned</dt>
                      <dd className="text-emerald-600 dark:text-emerald-400 font-medium tabular-nums">
                        +${fmt(result.totalInterest)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            {/* Year-by-year */}
            <div className="mt-12">
              <h3 className="text-sm font-semibold text-zinc-950 dark:text-white uppercase tracking-wider mb-4">
                Year-by-year breakdown
              </h3>
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                      <tr>
                        <th className="text-left px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">Year</th>
                        <th className="text-right px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">Contributed</th>
                        <th className="text-right px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">Interest</th>
                        <th className="text-right px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearByYear.map((row) => (
                        <tr key={row.year} className="border-b border-zinc-100 dark:border-zinc-900 last:border-0">
                          <td className="px-4 py-2.5 text-zinc-700 dark:text-zinc-300 font-medium tabular-nums">{row.year}</td>
                          <td className="px-4 py-2.5 text-right text-zinc-600 dark:text-zinc-400 tabular-nums">${fmt(row.contributed)}</td>
                          <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400 tabular-nums">${fmt(row.interest)}</td>
                          <td className="px-4 py-2.5 text-right text-zinc-950 dark:text-white font-medium tabular-nums">${fmt(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <Badge variant="neutral" className="mb-4">How it works</Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-6">
              The math behind compounding
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <p>
                Compound interest pays interest on your interest. Each period, the new
                interest gets added to your principal, and the next period&apos;s interest
                is calculated on the larger balance.
              </p>
              <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md p-4 font-mono text-sm">
                A = P(1 + r/n)^(nt) + PMT × (((1 + r/n)^(nt) − 1) / (r/n))
              </div>
              <p className="text-sm">
                Where <strong>P</strong> = principal, <strong>r</strong> = annual rate,{" "}
                <strong>n</strong> = compounding periods per year, <strong>t</strong> = years,
                and <strong>PMT</strong> = contribution per period.
              </p>
              <p>
                The single biggest factor is <strong>time</strong>. Doubling the rate
                doesn&apos;t double your end balance, but doubling the years usually quadruples it.
                That&apos;s why early consistent investing beats a late high-rate sprint.
              </p>
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
                    >
                      <span className="font-medium text-zinc-950 dark:text-white">{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>
                    {open && (
                      <div className="px-5 sm:px-6 pb-5 -mt-1">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-zinc-950 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight mb-4">
              More finance tools coming.
            </h2>
            <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
              Mortgage, loan, retirement, and tax calculators are next.
            </p>
            <ButtonLink href="/tools/finance" variant="primary" size="lg" className="bg-white text-zinc-950 hover:bg-zinc-200">
              Browse Finance tools
            </ButtonLink>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-base bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 tabular-nums"
      />
    </div>
  );
}
