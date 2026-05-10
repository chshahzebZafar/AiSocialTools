const platforms = [
  "Twitter / X",
  "Instagram",
  "YouTube",
  "TikTok",
  "LinkedIn",
  "Facebook",
  "Pinterest",
  "Threads",
  "Vimeo",
  "WhatsApp",
];

export function PlatformMarquee() {
  // Duplicate so the loop is seamless (track translates -50%).
  const items = [...platforms, ...platforms];

  return (
    <div className="marquee py-2">
      <div className="marquee-track">
        {items.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex items-center gap-2.5 whitespace-nowrap"
            aria-hidden={i >= platforms.length}
          >
            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-500">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
