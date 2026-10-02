"use client";

import { BadgeCheck, Clock, CreditCard, Star, XCircle } from "lucide-react";

/**
 * The status a submitter sees on their own listing.
 *
 * Three states, named for what they mean to the person rather than what the
 * database calls them: 'new' is "In review", 'approved' is "Published",
 * 'declined' is "Not listed". Spam is reported as declined before it reaches
 * here, by the view - saying otherwise invites an argument and tells a spammer
 * what tripped the filter.
 *
 * Colours are the site's existing Badge variants: warning amber while
 * waiting, success emerald when live, neutral zinc when not listed.
 */

export type ListingStatusValue = "new" | "approved" | "declined" | string;

const STATES: Record<string, { label: string; className: string; Icon: typeof Clock }> = {
  awaiting_payment: {
    label: "Payment required",
    className:
      "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/30",
    Icon: CreditCard,
  },
  new: {
    label: "In review",
    className:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30",
    Icon: Clock,
  },
  approved: {
    label: "Published",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30",
    Icon: BadgeCheck,
  },
  declined: {
    label: "Not listed",
    className:
      "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",
    Icon: XCircle,
  },
};

export function ListingStatus({
  status,
  size = "md",
}: {
  status: ListingStatusValue;
  size?: "sm" | "md";
}) {
  const state = STATES[status] ?? STATES.declined;
  const { Icon } = state;
  const pad = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium whitespace-nowrap ${pad} ${state.className}`}
    >
      <Icon className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} strokeWidth={2.25} />
      {state.label}
    </span>
  );
}

/** Shown alongside the status when a placement has been paid for. */
export function FeaturedBadge({ size = "md" }: { size?: "sm" | "md" }) {
  const pad = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium whitespace-nowrap bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/30 ${pad}`}
    >
      <Star className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} strokeWidth={2.25} />
      Featured
    </span>
  );
}
