"use client";

import { useMemo, useState } from "react";

/**
 * Admin charts.
 *
 * Both are SINGLE-SERIES and one hue. That is deliberate: a categorical
 * palette of four was validated and failed - the adjacent amber/emerald pair
 * came out at CVD deltaE 7.9, inside the floor band where colour alone is not
 * enough to tell two series apart. Sequential sidesteps the problem entirely,
 * and for "how many per day" and "which categories" the reader's job is
 * magnitude, not identity, so one hue is the right form anyway.
 *
 * Inline SVG rather than a charting library: two small charts do not justify
 * the bundle, and nothing here needs a layout engine. Indigo #4f46e5 is the
 * site accent and passes contrast against the chart surface.
 *
 * Counts are stat tiles, not one-bar charts.
 */

const ACCENT = "#4f46e5";
const GRID = "#e4e4e7";
const MUTED = "#71717a";

/* ---------------------------------------------------------------- stat tile */

export function StatTile({
  label,
  value,
  hint,
  tone = "neutral",
}: {
  label: string;
  value: number | string;
  hint?: string;
  tone?: "neutral" | "attention" | "good";
}) {
  const valueTone =
    tone === "attention"
      ? "text-amber-700 dark:text-amber-400"
      : tone === "good"
        ? "text-emerald-700 dark:text-emerald-400"
        : "text-zinc-950 dark:text-white";
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4">
      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">{label}</p>
      <p className={`text-3xl font-semibold tracking-tight tabular-nums ${valueTone}`}>{value}</p>
      {hint && <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">{hint}</p>}
    </div>
  );
}

/* ------------------------------------------------- submissions over 30 days */

type DayPoint = { date: string; count: number };

export function SubmissionsOverTime({ points }: { points: DayPoint[] }) {
  const [hover, setHover] = useState<number | null>(null);

  const W = 560;
  const H = 180;
  const PAD = { top: 12, right: 8, bottom: 22, left: 28 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const max = Math.max(1, ...points.map((p) => p.count));
  const x = (i: number) => PAD.left + (points.length <= 1 ? 0 : (i / (points.length - 1)) * plotW);
  const y = (v: number) => PAD.top + plotH - (v / max) * plotH;

  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(p.count)}`).join(" ");
  const area = `${line} L${x(points.length - 1)},${PAD.top + plotH} L${x(0)},${PAD.top + plotH} Z`;

  // Four ticks is enough to read a level without turning the plot into a grid.
  const ticks = [0, max / 2, max].map((v) => Math.round(v)).filter((v, i, a) => a.indexOf(v) === i);

  const active = hover !== null ? points[hover] : null;

  return (
    <figure className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 m-0">
      <figcaption className="mb-3">
        <p className="text-sm font-medium text-zinc-950 dark:text-white">Submissions per day</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Last 30 days
          {active && (
            <span className="ml-2 text-zinc-950 dark:text-white font-medium tabular-nums">
              {active.date}: {active.count}
            </span>
          )}
        </p>
      </figcaption>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        role="img"
        aria-label={`Submissions per day over the last 30 days. Peak ${max}.`}
        onMouseLeave={() => setHover(null)}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke={GRID} strokeWidth={1} />
            <text x={PAD.left - 6} y={y(t) + 3.5} textAnchor="end" fontSize={10} fill={MUTED}>
              {t}
            </text>
          </g>
        ))}

        <path d={area} fill={ACCENT} fillOpacity={0.12} />
        <path d={line} fill="none" stroke={ACCENT} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

        {active && hover !== null && (
          <>
            <line
              x1={x(hover)}
              x2={x(hover)}
              y1={PAD.top}
              y2={PAD.top + plotH}
              stroke={ACCENT}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            {/* 2px surface ring so the marker reads over the area fill */}
            <circle cx={x(hover)} cy={y(active.count)} r={5} fill={ACCENT} stroke="#fff" strokeWidth={2} />
          </>
        )}

        {/* Hit targets are wider than the marks, so hovering is not a precision task */}
        {points.map((p, i) => (
          <rect
            key={p.date}
            x={x(i) - plotW / Math.max(points.length, 1) / 2}
            y={PAD.top}
            width={plotW / Math.max(points.length, 1)}
            height={plotH}
            fill="transparent"
            onMouseEnter={() => setHover(i)}
          >
            <title>{`${p.date}: ${p.count}`}</title>
          </rect>
        ))}

        {points.length > 0 && (
          <>
            <text x={PAD.left} y={H - 6} fontSize={10} fill={MUTED}>
              {points[0].date.slice(5)}
            </text>
            <text x={W - PAD.right} y={H - 6} fontSize={10} fill={MUTED} textAnchor="end">
              {points[points.length - 1].date.slice(5)}
            </text>
          </>
        )}
      </svg>
    </figure>
  );
}

/* ---------------------------------------------------------- top categories */

export function TopCategories({ rows }: { rows: Array<{ label: string; count: number }> }) {
  const top = useMemo(() => rows.slice(0, 8), [rows]);
  const max = Math.max(1, ...top.map((r) => r.count));

  return (
    <figure className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 m-0">
      <figcaption className="mb-3">
        <p className="text-sm font-medium text-zinc-950 dark:text-white">Submissions by category</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Top {top.length}, all time</p>
      </figcaption>

      {top.length === 0 ? (
        <p className="text-sm text-zinc-400 py-6 text-center">Nothing to show yet.</p>
      ) : (
        <ul className="space-y-2">
          {top.map((r) => (
            <li key={r.label} className="grid grid-cols-[9rem_1fr_2.5rem] items-center gap-3">
              <span className="text-xs text-zinc-600 dark:text-zinc-400 truncate" title={r.label}>
                {r.label || "Uncategorised"}
              </span>
              {/* Horizontal because category names are long; length is the encoding */}
              <span className="h-5 rounded-r bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                <span
                  className="block h-full rounded-r"
                  style={{ width: `${Math.max(2, (r.count / max) * 100)}%`, background: ACCENT }}
                />
              </span>
              <span className="text-xs text-zinc-950 dark:text-white tabular-nums text-right">
                {r.count}
              </span>
            </li>
          ))}
        </ul>
      )}
    </figure>
  );
}
