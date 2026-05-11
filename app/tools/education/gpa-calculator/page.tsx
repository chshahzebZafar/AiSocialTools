"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowLeft, GraduationCap, Plus, Trash2, ChevronDown } from "lucide-react";

type Scale = "4.0" | "5.0";

const gradePoints4: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "D-": 0.7,
  "F": 0.0,
};

const gradePoints5: Record<string, number> = {
  "A+": 5.0, "A": 5.0, "A-": 4.7,
  "B+": 4.3, "B": 4.0, "B-": 3.7,
  "C+": 3.3, "C": 3.0, "C-": 2.7,
  "D+": 2.3, "D": 2.0, "D-": 1.7,
  "F": 0.0,
};

const gradeOptions = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
}

function newCourse(name = ""): Course {
  return { id: Math.random().toString(36).slice(2, 9), name, grade: "A", credits: 3 };
}

const faqs = [
  {
    question: "What's the difference between 4.0 and 5.0 GPA scales?",
    answer:
      "The 4.0 scale is the US college standard — A = 4.0, B = 3.0, etc. The 5.0 (weighted) scale is used in many US high schools for AP / honors / IB courses, where an A in a weighted class earns 5.0 instead of 4.0.",
  },
  {
    question: "How is GPA calculated?",
    answer:
      "GPA = sum of (grade points × credits) divided by sum of credits. So a 3-credit class with an A (4.0) contributes 12 grade-points; a 4-credit class with a B (3.0) contributes 12. Add them all up, divide by total credits.",
  },
  {
    question: "Do failed or withdrawn courses count?",
    answer:
      "F grades count — they pull your GPA down hard because they contribute 0 grade-points to the numerator but full credits to the denominator. W (withdrawn) usually doesn't factor into GPA at all.",
  },
  {
    question: "How do I calculate semester vs cumulative GPA?",
    answer:
      "Semester GPA: just enter the courses from that semester. Cumulative GPA: enter all courses from all semesters in one list. Both use the same formula.",
  },
  {
    question: "What's a good GPA?",
    answer:
      "Depends on your goals. 3.5+ is competitive for grad school and top employers. 3.0+ is solid for most jobs. Below 2.0 typically means academic probation in college.",
  },
];

export default function GPACalculatorPage() {
  const [scale, setScale] = useState<Scale>("4.0");
  const [courses, setCourses] = useState<Course[]>([
    newCourse("Course 1"),
    newCourse("Course 2"),
    newCourse("Course 3"),
  ]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const table = scale === "4.0" ? gradePoints4 : gradePoints5;

  const { gpa, totalCredits, totalPoints } = useMemo(() => {
    let pts = 0;
    let cr = 0;
    for (const c of courses) {
      const credits = c.credits || 0;
      const gp = table[c.grade] ?? 0;
      pts += gp * credits;
      cr += credits;
    }
    return {
      gpa: cr > 0 ? pts / cr : 0,
      totalCredits: cr,
      totalPoints: pts,
    };
  }, [courses, table]);

  const addCourse = () => setCourses([...courses, newCourse(`Course ${courses.length + 1}`)]);
  const updateCourse = (id: string, patch: Partial<Course>) =>
    setCourses(courses.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const removeCourse = (id: string) =>
    setCourses(courses.length > 1 ? courses.filter((c) => c.id !== id) : courses);

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GPA Calculator",
    description: "Free GPA calculator for 4.0 or 5.0 scale, semester or cumulative.",
    url: "https://aisocialtools.co/tools/education/gpa-calculator",
    applicationCategory: "EducationalApplication",
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
      { "@type": "ListItem", position: 3, name: "Education", item: "https://aisocialtools.co/tools/education" },
      { "@type": "ListItem", position: 4, name: "GPA Calculator", item: "https://aisocialtools.co/tools/education/gpa-calculator" },
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
              href="/tools/education"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Education tools
            </Link>
            <Badge variant="neutral" className="mb-4">
              <GraduationCap className="w-3 h-3" />
              Education
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4 max-w-3xl">
              GPA Calculator
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Calculate semester or cumulative GPA on a 4.0 or 5.0 scale. Add courses,
              enter grades and credits, get your GPA instantly.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Inputs */}
              <div className="lg:col-span-3">
                {/* Scale toggle */}
                <div className="flex items-center gap-1 mb-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md p-1 w-fit">
                  {(["4.0", "5.0"] as Scale[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setScale(s)}
                      className={`px-3 h-8 text-xs font-medium rounded transition-colors ${
                        scale === s
                          ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                      }`}
                    >
                      {s} scale
                    </button>
                  ))}
                </div>

                {/* Course list */}
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
                  <div className="hidden sm:grid sm:grid-cols-[1fr_120px_100px_44px] gap-3 px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500 font-semibold">
                    <span>Course</span>
                    <span>Grade</span>
                    <span>Credits</span>
                    <span className="text-right" aria-label="actions" />
                  </div>
                  {courses.map((c) => (
                    <div
                      key={c.id}
                      className="grid grid-cols-2 sm:grid-cols-[1fr_120px_100px_44px] gap-3 px-4 py-3 border-b border-zinc-100 dark:border-zinc-900 last:border-0 items-center"
                    >
                      <input
                        type="text"
                        value={c.name}
                        onChange={(e) => updateCourse(c.id, { name: e.target.value })}
                        placeholder="Course name"
                        className="col-span-2 sm:col-span-1 h-10 px-3 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                      />
                      <select
                        value={c.grade}
                        onChange={(e) => updateCourse(c.id, { grade: e.target.value })}
                        className="h-10 px-3 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 appearance-none cursor-pointer"
                      >
                        {gradeOptions.map((g) => (
                          <option key={g} value={g}>
                            {g} ({table[g].toFixed(1)})
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={c.credits}
                        onChange={(e) => updateCourse(c.id, { credits: Number(e.target.value) })}
                        min="0"
                        max="20"
                        step="0.5"
                        className="h-10 px-3 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 tabular-nums"
                      />
                      <button
                        onClick={() => removeCourse(c.id)}
                        disabled={courses.length === 1}
                        className="w-9 h-9 flex items-center justify-center rounded-md text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors disabled:opacity-30 disabled:pointer-events-none justify-self-end"
                        aria-label="Remove course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addCourse}
                  className="mt-4 inline-flex items-center gap-2 h-10 px-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white rounded-md text-sm font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add course
                </button>
              </div>

              {/* Result */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 sm:p-8 lg:sticky lg:top-24">
                  <div className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500 font-semibold mb-3">
                    Your GPA
                  </div>
                  <div className="text-5xl sm:text-6xl font-semibold text-zinc-950 dark:text-white tracking-tight tabular-nums mb-1">
                    {gpa.toFixed(2)}
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                    {scale} scale
                  </div>
                  <dl className="space-y-3 text-sm border-t border-zinc-200 dark:border-zinc-800 pt-5">
                    <div className="flex justify-between">
                      <dt className="text-zinc-500 dark:text-zinc-400">Total credits</dt>
                      <dd className="text-zinc-950 dark:text-white font-medium tabular-nums">{totalCredits.toFixed(1)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-zinc-500 dark:text-zinc-400">Quality points</dt>
                      <dd className="text-zinc-950 dark:text-white font-medium tabular-nums">{totalPoints.toFixed(2)}</dd>
                    </div>
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
              The GPA formula
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <p>
                GPA is a weighted average. Each course&apos;s grade gets converted to grade
                points (A = 4.0, B = 3.0, etc.), then weighted by the course&apos;s credit
                hours. Sum the weighted points, divide by total credits.
              </p>
              <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md p-4 font-mono text-sm">
                GPA = Σ (grade points × credits) ÷ Σ credits
              </div>
              <p>
                This means high-credit classes hit your GPA harder than low-credit ones —
                a B in a 5-credit class hurts more than a B in a 1-credit class.
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
              More education tools coming.
            </h2>
            <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
              Grade calculator, citation generator, study planner, and more are next.
            </p>
            <ButtonLink href="/tools/education" variant="primary" size="lg" className="bg-white text-zinc-950 hover:bg-zinc-200">
              Browse Education tools
            </ButtonLink>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
