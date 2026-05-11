"use client";

import { useEffect, useState } from "react";

interface WordRotatorProps {
  words: string[];
  interval?: number;
  className?: string;
}

/**
 * Rotates through `words` with a smooth cross-fade.
 *
 * SEO note: only the ACTIVE word is rendered in the DOM. Earlier versions
 * kept all words in DOM (just hid them visually), which caused crawlers to
 * see "bloat.paywalls.signups.catch." as the H1 — gibberish. Now SSR emits
 * just the first word; subsequent rotations happen client-side and don't
 * affect what crawlers index.
 */
export function WordRotator({ words, interval = 2400, className = "" }: WordRotatorProps) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || words.length <= 1) return;
    const id = setInterval(() => {
      setPhase("out");
      const swapTimer = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setPhase("in");
      }, 250);
      return () => clearTimeout(swapTimer);
    }, interval);
    return () => clearInterval(id);
  }, [mounted, words.length, interval]);

  const longest = words.reduce(
    (a, b) => (b.length > a.length ? b : a),
    words[0] ?? ""
  );
  const activeWord = words[index] ?? "";

  if (!mounted) {
    return (
      <span
        className={`relative inline-block align-baseline ${className}`}
        style={{ minWidth: `${longest.length}ch` }}
        suppressHydrationWarning
      >
        {words[0]}
      </span>
    );
  }

  return (
    <span
      className={`relative inline-block align-baseline ${className}`}
      style={{ minWidth: `${longest.length}ch` }}
      aria-live="polite"
      aria-atomic="true"
    >
      <span
        key={activeWord}
        className="inline-block transition-all duration-250 ease-out"
        style={{
          opacity: phase === "in" ? 1 : 0,
          transform: phase === "in" ? "translateY(0)" : "translateY(6px)",
        }}
      >
        {activeWord}
      </span>
    </span>
  );
}
