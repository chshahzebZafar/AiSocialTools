"use client";

import { useEffect, useState } from "react";

interface WordRotatorProps {
  words: string[];
  interval?: number;
  className?: string;
}

export function WordRotator({ words, interval = 2400, className = "" }: WordRotatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  // Use the longest word for layout stability so the line doesn't reflow
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), words[0] ?? "");

  return (
    <span
      className={`relative inline-block align-baseline ${className}`}
      style={{ minWidth: `${longest.length}ch` }}
    >
      {words.map((word, i) => (
        <span
          key={word}
          className="absolute left-0 top-0 transition-all duration-500 ease-out"
          style={{
            opacity: i === index ? 1 : 0,
            transform: i === index ? "translateY(0)" : "translateY(8px)",
          }}
          aria-hidden={i !== index}
        >
          {word}
        </span>
      ))}
      {/* Invisible spacer to claim height */}
      <span className="invisible" aria-hidden>
        {longest}
      </span>
    </span>
  );
}
