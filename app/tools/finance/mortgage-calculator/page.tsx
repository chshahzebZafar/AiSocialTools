"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowLeft, Calculator, ChevronDown } from "lucide-react";

function fmt(n: number, digits = 0): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

interface MortgageResult {
  loanAmount: number;
  monthlyPI: number;     // principal + interest
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyHOA: number;
  totalMonthly: number;
  totalInterest: number;
  totalCost: number;
}

function calcMortgage(
  homePrice: number,
  downPayment: number,
  termYears: number,
  ratePercent: number,
  annualTax: number,
  annualInsurance: number,
  monthlyHOA: number
): MortgageResult {
  const loanAmount = Math.max(homePrice - downPayment, 0);
  const monthlyRate = ratePercent / 100 / 12;
  const totalPayments = termYears * 12;

  let monthlyPI = 0;
  if (loanAmount > 0 && monthlyRate > 0) {
    monthlyPI =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
  } else if (loanAmount > 0) {
    monthlyPI = loanAmount / totalPayments;
  }

  const monthlyTax = annualTax / 12;
  const monthlyInsurance = annualInsurance / 12;
  const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyHOA;
  const totalInterest = monthlyPI * totalPayments - loanAmount;
  const totalCost = monthlyPI * totalPayments;

  return {
    loanAmount,
    monthlyPI,
    monthlyTax,
    monthlyInsurance,
    monthlyHOA,
    totalMonthly,
    totalInterest,
    totalCost,
  };
}

const faqs = [
  {
    question: "What's included in 'monthly payment'?",
    answer:
      "This calculator shows two numbers: monthly principal & interest (P&I), and total monthly payment which adds property tax, home insurance, and HOA fees. Lenders quote you P&I; the bigger number is what you'll actually pay each month.",
  },
  {
    question: "How is monthly P&I calculated?",
    answer:
      "Using the standard amortization formula: M = P × [r(1+r)^n] / [(1+r)^n − 1], where P is loan amount, r is the monthly interest rate (annual rate ÷ 12), and n is total number of monthly payments.",
  },
  {
    question: "Does this include PMI?",
    answer:
      "Not yet — most loans require PMI when down payment is below 20%. As a rough estimate, PMI runs 0.3-1.5% of the loan amount annually. Add that to the home insurance field for a more accurate total.",
  },
  {
    question: "What's a 'good' interest rate today?",
    answer:
      "Mortgage rates move daily. As of 2026, 30-year fixed rates are typically in the 6-7% range. Check FRED (Federal Reserve Economic Data) or a rate aggregator for current numbers.",
  },
  {
    question: "Should I pay extra toward principal?",
    answer:
      "Usually yes — extra principal payments shorten the loan and save a huge amount on interest. Even an extra $100/month on a 30-year mortgage can save tens of thousands in total interest.",
  },
];

export default function MortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [term, setTerm] = useState(30);
  const [rate, setRate] = useState(6.5);
  const [annualTax, setAnnualTax] = useState(4800);
  const [annualInsurance, setAnnualInsurance] = useState(1500);
  const [monthlyHOA, setMonthlyHOA] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const result = useMemo(
    () =>
      calcMortgage(
        homePrice || 0,
        downPayment || 0,
        term || 1,
        rate || 0,
        annualTax || 0,
        annualInsurance || 0,
        monthlyHOA || 0
      ),
    [homePrice, downPayment, term, rate, annualTax, annualInsurance, monthlyHOA]
  );

  const downPercent = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Mortgage Calculator",
    description:
      "Free mortgage calculator with property tax, insurance, HOA, and total monthly payment breakdown.",
    url: "https://aisocialtools.co/tools/finance/mortgage-calculator",
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
      { "@type": "ListItem", position: 4, name: "Mortgage Calculator", item: "https://aisocialtools.co/tools/finance/mortgage-calculator" },
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
              <Calculator className="w-3 h-3" />
              Finance
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4 max-w-3xl">
              Mortgage Calculator
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Calculate your full monthly mortgage payment — principal, interest, property
              tax, home insurance, and HOA fees in one number. Plus total interest paid over the life of the loan.
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
                  <NumberField label="Home price ($)" value={homePrice} onChange={setHomePrice} min={0} step={1000} />
                  <NumberField
                    label={`Down payment ($)  ·  ${downPercent.toFixed(1)}%`}
                    value={downPayment}
                    onChange={setDownPayment}
                    min={0}
                    step={1000}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <NumberField label="Term (years)" value={term} onChange={setTerm} min={5} max={40} step={1} />
                    <NumberField label="Interest rate (%)" value={rate} onChange={setRate} min={0} max={20} step={0.05} />
                  </div>
                  <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500 font-semibold mb-3">
                      Optional
                    </div>
                    <div className="space-y-5">
                      <NumberField label="Annual property tax ($)" value={annualTax} onChange={setAnnualTax} min={0} step={100} />
                      <NumberField label="Annual home insurance ($)" value={annualInsurance} onChange={setAnnualInsurance} min={0} step={50} />
                      <NumberField label="Monthly HOA ($)" value={monthlyHOA} onChange={setMonthlyHOA} min={0} step={10} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 sm:p-8 lg:sticky lg:top-24">
                  <div className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500 font-semibold mb-3">
                    Monthly payment
                  </div>
                  <div className="text-4xl sm:text-5xl font-semibold text-zinc-950 dark:text-white tracking-tight tabular-nums mb-1">
                    ${fmt(result.totalMonthly, 0)}
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                    Total (P&I + tax + insurance + HOA)
                  </div>
                  <dl className="space-y-3 text-sm border-t border-zinc-200 dark:border-zinc-800 pt-5">
                    <Row label="Principal & interest" value={`$${fmt(result.monthlyPI)}`} />
                    <Row label="Property tax" value={`$${fmt(result.monthlyTax)}`} />
                    <Row label="Home insurance" value={`$${fmt(result.monthlyInsurance)}`} />
                    {result.monthlyHOA > 0 && <Row label="HOA" value={`$${fmt(result.monthlyHOA)}`} />}
                  </dl>
                  <dl className="space-y-3 text-sm border-t border-zinc-200 dark:border-zinc-800 pt-5 mt-5">
                    <Row label="Loan amount" value={`$${fmt(result.loanAmount)}`} />
                    <Row label="Total interest" value={`$${fmt(result.totalInterest)}`} />
                    <Row label="Total cost" value={`$${fmt(result.totalCost)}`} bold />
                  </dl>
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
              The mortgage formula
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <p>
                Your monthly principal & interest comes from the amortization formula:
              </p>
              <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md p-4 font-mono text-sm">
                M = P × [r(1+r)^n] / [(1+r)^n − 1]
              </div>
              <p className="text-sm">
                Where <strong>P</strong> = loan amount, <strong>r</strong> = monthly rate
                (annual rate ÷ 12), and <strong>n</strong> = total monthly payments
                (years × 12).
              </p>
              <p>
                The full monthly payment adds property tax, home insurance, and HOA — these
                aren&apos;t lender-required math but they&apos;re money out of your account
                every month, so the real cost includes them.
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
              Loan repayment, retirement, and tax calculators are next.
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

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-zinc-500 dark:text-zinc-400">{label}</dt>
      <dd className={`tabular-nums ${bold ? "text-zinc-950 dark:text-white font-semibold" : "text-zinc-950 dark:text-white font-medium"}`}>
        {value}
      </dd>
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
