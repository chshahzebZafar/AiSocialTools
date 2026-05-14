"use client";

import {
  Calculator,
  DollarSign,
  Percent,
  PiggyBank,
  TrendingUp,
  Banknote,
  Wallet,
  Home,
  CreditCard,
  BarChart3,
  Receipt,
  Landmark,
  ShieldCheck,
  GraduationCap,
  Car,
  Globe,
  ArrowLeftRight,
  Building,
  RefreshCw,
} from "lucide-react";
import {
  ComingSoonCategoryPage,
  type PlannedTool,
} from "@/components/ComingSoonCategoryPage";
import { getCategoryToolsBy } from "@/lib/category-tools";

const plannedTools: PlannedTool[] = [
  { icon: DollarSign, name: "Paycheck Calculator", description: "Calculate net pay after federal and state withholding for any pay period — weekly, bi-weekly, semi-monthly, or monthly." },
  { icon: TrendingUp, name: "Net Worth Calculator", description: "Add up your assets and liabilities to calculate your total net worth and track it over time." },
  { icon: PiggyBank, name: "Emergency Fund Calculator", description: "Calculate how much you need in an emergency fund based on 3–6 months of essential expenses." },
  { icon: BarChart3, name: "Break-Even Calculator", description: "Calculate the units sold or revenue needed to cover all fixed and variable costs." },
  { icon: TrendingUp, name: "Inflation-Adjusted Return Calculator", description: "Calculate the real (inflation-adjusted) return on any investment after accounting for inflation rate." },
  { icon: Banknote, name: "Loan Calculator", description: "Payment, payoff date, and total interest for personal, auto, or business loans." },
  { icon: Car, name: "Auto Loan Calculator", description: "Monthly car payment and total cost based on vehicle price, down payment, and loan term." },
  { icon: Percent, name: "Interest Calculator", description: "Simple or compound interest on savings and investments with flexible compounding periods." },
  { icon: Calculator, name: "Payment Calculator", description: "Determine the fixed periodic payment on any loan or financing arrangement." },
  { icon: PiggyBank, name: "Retirement Calculator", description: "Project how much you need to retire comfortably, accounting for inflation and returns." },
  { icon: Calculator, name: "Amortization Calculator", description: "Full amortization schedule showing principal and interest split for every payment." },
  { icon: TrendingUp, name: "Investment Calculator", description: "Project the future value of your investments with regular contributions and compound returns." },
  { icon: Globe, name: "Currency Calculator", description: "Convert between 150+ currencies with live exchange rates." },
  { icon: BarChart3, name: "Inflation Calculator", description: "Calculate the purchasing power of money over time using historical CPI data." },
  { icon: Calculator, name: "Finance Calculator", description: "All-purpose calculator covering TVM, NPV, IRR, and common financial formulas." },
  { icon: Home, name: "Mortgage Payoff Calculator", description: "See how extra payments accelerate your mortgage payoff date and reduce total interest." },
  { icon: Receipt, name: "Income Tax Calculator", description: "Estimate federal and state income tax liability based on income, filing status, and deductions." },
  { icon: DollarSign, name: "Salary Calculator", description: "Convert between hourly, weekly, monthly, and annual salary figures, including take-home pay." },
  { icon: Landmark, name: "401K Calculator", description: "Project your 401(k) balance at retirement including employer match and catch-up contributions." },
  { icon: Percent, name: "Interest Rate Calculator", description: "Back-calculate the implied interest rate from known payment, term, and principal values." },
  { icon: Receipt, name: "Sales Tax Calculator", description: "Calculate sales tax for any US state or custom rate — add or remove tax from any price." },
  { icon: Home, name: "House Affordability Calculator", description: "Find out how much house you can afford based on income, debts, and down payment." },
  { icon: PiggyBank, name: "Savings Calculator", description: "Project how your savings grow with regular deposits and compound interest." },
  { icon: Building, name: "Rent Calculator", description: "Determine how much rent you can afford based on your income and the 30% rule." },
  { icon: Receipt, name: "Marriage Tax Calculator", description: "Calculate the tax impact of getting married — marriage penalty or bonus explained." },
  { icon: Landmark, name: "Estate Tax Calculator", description: "Estimate federal and state estate tax on an inherited estate with exemption modeling." },
  { icon: Landmark, name: "Pension Calculator", description: "Estimate your defined benefit pension payout and compare lump sum vs. annuity options." },
  { icon: ShieldCheck, name: "Social Security Calculator", description: "Estimate your Social Security benefit at different claiming ages including spousal benefits." },
  { icon: BarChart3, name: "Annuity Calculator", description: "Calculate the present or future value of any annuity payment stream." },
  { icon: BarChart3, name: "Annuity Payout Calculator", description: "Calculate how long your retirement savings will last with regular monthly withdrawals." },
  { icon: CreditCard, name: "Credit Card Calculator", description: "See the true cost of carrying a credit card balance and how long it takes to pay off." },
  { icon: CreditCard, name: "Credit Cards Payoff Calculator", description: "Avalanche vs. snowball payoff strategies for multiple credit cards side by side." },
  { icon: Banknote, name: "Debt Payoff Calculator", description: "Create a personalized debt payoff plan with a debt-free date and interest savings." },
  { icon: ArrowLeftRight, name: "Debt Consolidation Calculator", description: "See if consolidating your debts saves money compared to paying each separately." },
  { icon: Calculator, name: "Repayment Calculator", description: "Full repayment schedule for any loan with extra payment and lump sum scenarios." },
  { icon: GraduationCap, name: "Student Loan Calculator", description: "Model student loan repayment under standard, graduated, and income-driven plans." },
  { icon: GraduationCap, name: "College Cost Calculator", description: "Estimate the 4-year cost of college and calculate monthly 529 contributions needed." },
  { icon: Calculator, name: "Simple Interest Calculator", description: "Quickly compute simple interest on any principal — ideal for short-term loans." },
  { icon: Landmark, name: "CD Calculator", description: "Calculate the return on a certificate of deposit at maturity and model CD laddering." },
  { icon: TrendingUp, name: "Bond Calculator", description: "Calculate bond price, yield to maturity, coupon payments, and duration." },
  { icon: TrendingUp, name: "Mutual Fund Calculator", description: "Project mutual fund growth including expense ratio drag on long-term returns." },
  { icon: Landmark, name: "Roth IRA Calculator", description: "Project your Roth IRA tax-free balance at retirement and compare to a traditional IRA." },
  { icon: Landmark, name: "IRA Calculator", description: "Calculate traditional IRA tax-deferred growth and required minimum distribution planning." },
  { icon: Landmark, name: "RMD Calculator", description: "Determine your required minimum distribution from IRAs and 401(k)s using IRS tables." },
  { icon: Receipt, name: "VAT Calculator", description: "Add or remove VAT from any price for any country's rate — full EU rate library included." },
  { icon: ArrowLeftRight, name: "Cash Back or Low Interest Calculator", description: "Compare dealer cash back vs. low-interest financing to find which offer saves more." },
  { icon: Car, name: "Auto Lease Calculator", description: "Calculate monthly car lease payments and compare leasing vs. buying total costs." },
  { icon: BarChart3, name: "Depreciation Calculator", description: "Compute asset depreciation using straight-line, MACRS, or double-declining methods." },
  { icon: TrendingUp, name: "Average Return Calculator", description: "Calculate the arithmetic or geometric (CAGR) average annual return on any investment." },
  { icon: Percent, name: "Margin Calculator", description: "Calculate gross profit margin, markup percentage, and selling price from cost." },
  { icon: Percent, name: "Discount Calculator", description: "Calculate sale price, discount amount, and savings percentage instantly." },
  { icon: Building, name: "Business Loan Calculator", description: "Monthly payments and total cost of business loans including SBA loan support." },
  { icon: Calculator, name: "Debt-to-Income Ratio Calculator", description: "Compute front-end and back-end DTI ratio to understand mortgage and loan eligibility." },
  { icon: Building, name: "Real Estate Calculator", description: "Analyze cap rate, cash-on-cash return, NOI, and gross rent multiplier for investment properties." },
  { icon: DollarSign, name: "Take-Home-Paycheck Calculator", description: "Calculate your net take-home pay after federal, state, FICA, and pre-tax deductions." },
  { icon: Banknote, name: "Personal Loan Calculator", description: "Monthly payments and true APR cost of personal loans — compare multiple lender offers." },
  { icon: Banknote, name: "Boat Loan Calculator", description: "Estimate monthly payments and total interest for financing a boat purchase." },
  { icon: Calculator, name: "Lease Calculator", description: "Monthly lease payments for equipment, vehicles, or real estate with residual value modeling." },
  { icon: RefreshCw, name: "Refinance Calculator", description: "See monthly savings, break-even period, and lifetime savings from refinancing your mortgage." },
  { icon: Wallet, name: "Budget Calculator", description: "Build a monthly budget, spot overspending, and track your savings rate against 50/30/20 guidelines." },
  { icon: Building, name: "Rental Property Calculator", description: "Cash flow, cap rate, and ROI analysis for any rental property investment." },
  { icon: BarChart3, name: "IRR Calculator", description: "Calculate the internal rate of return on any series of cash flows or investment." },
  { icon: TrendingUp, name: "ROI Calculator", description: "Calculate return on investment for any cost and gain — simple and annualized ROI." },
  { icon: Percent, name: "APR Calculator", description: "Calculate the true annual percentage rate of a loan including fees and closing costs." },
  { icon: Home, name: "FHA Loan Calculator", description: "Monthly payments and MIP for FHA loans with low down payment scenarios." },
  { icon: Home, name: "VA Mortgage Calculator", description: "Monthly payments for VA loans including the VA funding fee and zero down payment." },
  { icon: Home, name: "Home Equity Loan Calculator", description: "Monthly payments and interest cost of a home equity loan based on your available equity." },
  { icon: Home, name: "HELOC Calculator", description: "Calculate draw period payments and repayment phase costs for a home equity line of credit." },
  { icon: Home, name: "Down Payment Calculator", description: "Calculate required down payment for any home price and loan-to-value ratio." },
  { icon: Home, name: "Rent vs. Buy Calculator", description: "Compare the true 5/10/20-year cost of renting vs. buying a home." },
  { icon: BarChart3, name: "Payback Period Calculator", description: "Calculate the payback period for any investment or capital project." },
  { icon: Calculator, name: "Present Value Calculator", description: "Discount future cash flows to present value at any discount rate." },
  { icon: TrendingUp, name: "Future Value Calculator", description: "Project the future value of any lump sum or payment stream." },
  { icon: DollarSign, name: "Commission Calculator", description: "Calculate sales commission based on rate, tiers, or quota structures." },
  { icon: Home, name: "Mortgage Calculator UK", description: "UK mortgage calculator with stamp duty, SDLT, and British rate conventions." },
  { icon: Home, name: "Canadian Mortgage Calculator", description: "Canadian mortgage calculator with CMHC insurance and stress test rate support." },
  { icon: Home, name: "Mortgage Amortization Calculator", description: "Detailed month-by-month amortization table for any mortgage with extra payment modeling." },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free Finance Calculators",
  description: "Free finance calculators for mortgages, compound interest, loans, retirement, taxes, and more.",
  url: "https://aisocialtools.co/tools/finance",
  numberOfItems: 2,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Mortgage Calculator", url: "https://aisocialtools.co/tools/finance/mortgage-calculator" },
    { "@type": "ListItem", position: 2, name: "Compound Interest Calculator", url: "https://aisocialtools.co/tools/finance/compound-interest-calculator" },
  ],
};

export default function FinanceToolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <ComingSoonCategoryPage
      slug="finance"
      shortName="Finance"
      longName="Finance Tools"
      launchWindow="2026"
      Icon={Wallet}
      headline={{ first: "Money math,", second: "without the spreadsheet." }}
      subheadline="Free calculators for the financial decisions you actually face — mortgages, loans, retirement, taxes, investments, and more. All client-side. Your numbers never leave your browser."
      plannedToolsHeading="73+ calculators on the way."
      plannedToolsBlurb="Every major financial calculation covered — from simple interest to full amortization schedules. Honest math, no upsell to a financial advisor."
      plannedTools={plannedTools}
      liveTools={getCategoryToolsBy("finance")}
      suggestHeading="What calculator do you need?"
      suggestBlurb="If you've been jury-rigging a spreadsheet for a recurring financial decision, we want to know. The most-requested calculators ship first."
    />
    </>
  );
}
