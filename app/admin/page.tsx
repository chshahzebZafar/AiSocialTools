"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Submission inbox.
 *
 * Every read and write goes through /api/admin/*, which verifies the session
 * cookie server-side. Nothing here is trusted: hiding the UI is not security,
 * so the API refuses unauthenticated requests regardless of what this renders.
 */

type Status = "new" | "approved" | "declined" | "spam";

interface Submission {
  id: string;
  reference?: string;
  submittedAt?: string;
  name?: string;
  url?: string;
  tagline?: string;
  description?: string;
  category?: string;
  pricing?: string;
  pricingDetails?: string;
  features?: string;
  twitter?: string;
  founder?: string;
  submitterName?: string;
  submitterEmail?: string;
  submitterRole?: string;
  status?: Status;
  notes?: string;
  sponsored?: boolean;
  sponsoredUntil?: string;
  sponsorshipNote?: string;
  source?: string;
  reviewedAt?: string;
}

const STATUSES: Status[] = ["new", "approved", "declined", "spam"];

const STATUS_STYLE: Record<Status, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  declined: "bg-zinc-100 text-zinc-600 border-zinc-300",
  spam: "bg-red-50 text-red-700 border-red-200",
};

function slugify(name: string): string {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** Build a paste-ready entry for lib/ai-directory.ts. */
function toDirectoryEntry(s: Submission): string {
  const features = (s.features || "")
    .split(/\r?\n|\s\|\s/)
    .map((f) => f.trim())
    .filter(Boolean)
    .map((f) => `      ${JSON.stringify(f)},`)
    .join("\n");
  const lines = [
    "  {",
    `    slug: ${JSON.stringify(slugify(s.name || ""))},`,
    `    name: ${JSON.stringify(s.name || "")},`,
    `    tagline: ${JSON.stringify(s.tagline || "")},`,
    `    description: ${JSON.stringify(s.description || "")},`,
    `    url: ${JSON.stringify(s.url || "")},`,
    `    category: ${JSON.stringify(s.category || "")},`,
    `    pricing: ${JSON.stringify(s.pricing || "")},`,
    s.pricingDetails ? `    pricingDetails: ${JSON.stringify(s.pricingDetails)},` : null,
    features ? `    features: [\n${features}\n    ],` : null,
    `    addedAt: ${JSON.stringify(new Date().toISOString().slice(0, 10))},`,
    "    isNew: true,",
    "    approved: true,",
    s.twitter && s.twitter !== "(none)"
      ? `    twitter: ${JSON.stringify(s.twitter.replace(/^@/, ""))},`
      : null,
    s.founder && s.founder !== "(none)" ? `    founder: ${JSON.stringify(s.founder)},` : null,
    "  },",
  ].filter(Boolean);
  return lines.join("\n");
}

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [busy, setBusy] = useState(false);

  const [items, setItems] = useState<Submission[]>([]);
  const [loadError, setLoadError] = useState("");
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoadError("");
    const res = await fetch("/api/admin/submissions?limit=500", { cache: "no-store" });
    if (res.status === 401) {
      setAuthed(false);
      return;
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setAuthed(true);
      setLoadError(data.error || "Could not load submissions.");
      return;
    }
    setAuthed(true);
    setItems(data.items || []);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setLoginError(data.error || "Sign in failed.");
        return;
      }
      setPassword("");
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setItems([]);
    setAuthed(false);
  }

  async function patch(
    id: string,
    patchBody: {
      status?: Status;
      notes?: string;
      sponsored?: boolean;
      sponsoredUntil?: string;
      sponsorshipNote?: string;
    }
  ) {
    // Optimistic: the list updates immediately and rolls back if the save fails.
    const before = items;
    setItems((prev) => prev.map((s) => (s.id === id ? { ...s, ...patchBody } : s)));
    const res = await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patchBody }),
    });
    if (!res.ok) {
      setItems(before);
      const data = await res.json().catch(() => ({}));
      setLoadError(data.error || "Could not save that change.");
    }
  }

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length };
    for (const s of items) c[s.status || "new"] = (c[s.status || "new"] || 0) + 1;
    return c;
  }, [items]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((s) => {
      if (filter !== "all" && (s.status || "new") !== filter) return false;
      if (!q) return true;
      return [s.name, s.url, s.tagline, s.category, s.submitterName, s.submitterEmail, s.reference]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [items, filter, search]);

  if (authed === null) {
    return <p className="p-8 text-sm text-zinc-500">Loading…</p>;
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <form onSubmit={signIn} className="w-full max-w-sm bg-white border border-zinc-200 rounded-xl p-6">
          <h1 className="text-lg font-semibold tracking-tight mb-1">Admin</h1>
          <p className="text-sm text-zinc-500 mb-5">Submission inbox for aisocialtools.co.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            autoComplete="current-password"
            className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 mb-3"
          />
          {loginError && <p className="text-sm text-red-600 mb-3">{loginError}</p>}
          <button
            type="submit"
            disabled={busy || !password}
            className="w-full h-10 rounded-md bg-zinc-950 text-white text-sm font-medium disabled:opacity-50"
          >
            {busy ? "Checking…" : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Submissions</h1>
          <p className="text-sm text-zinc-500">{items.length} total</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => void load()} className="h-9 px-3 text-sm rounded-md border border-zinc-300 bg-white">
            Refresh
          </button>
          <button onClick={() => void signOut()} className="h-9 px-3 text-sm rounded-md border border-zinc-300 bg-white">
            Sign out
          </button>
        </div>
      </div>

      {loadError && (
        <div className="mb-5 p-3 rounded-md border border-red-200 bg-red-50 text-sm text-red-700">{loadError}</div>
      )}

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {(["all", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`h-8 px-3 text-xs font-medium rounded-full border transition-colors ${
              filter === s ? "bg-zinc-950 text-white border-zinc-950" : "bg-white text-zinc-600 border-zinc-300"
            }`}
          >
            {s} ({counts[s] ?? 0})
          </button>
        ))}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, URL, email, reference…"
          className="ml-auto h-8 px-3 text-sm border border-zinc-300 rounded-md min-w-[240px]"
        />
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-zinc-500 py-16 text-center border border-dashed border-zinc-300 rounded-lg">
          Nothing here.
        </p>
      ) : (
        <div className="space-y-2">
          {visible.map((s) => {
            const status = (s.status || "new") as Status;
            const open = openId === s.id;
            return (
              <div key={s.id} className="bg-white border border-zinc-200 rounded-lg">
                <button
                  onClick={() => setOpenId(open ? null : s.id)}
                  className="w-full text-left p-4 flex items-start gap-3"
                >
                  <span className={`mt-0.5 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border ${STATUS_STYLE[status]}`}>
                    {status}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="font-medium text-sm">{s.name || "(no name)"}</span>
                    <span className="block text-xs text-zinc-500 truncate">{s.tagline}</span>
                  </span>
                  <span className="text-xs text-zinc-400 whitespace-nowrap">
                    {s.submittedAt ? new Date(s.submittedAt).toLocaleDateString() : ""}
                  </span>
                </button>

                {open && (
                  <div className="border-t border-zinc-200 p-4 space-y-4 text-sm">
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
                      <Row label="Reference" value={s.reference} mono />
                      <Row label="Submitted" value={s.submittedAt} />
                      <Row label="Category" value={s.category} />
                      <Row label="Pricing" value={`${s.pricing || ""}${s.pricingDetails ? ` — ${s.pricingDetails}` : ""}`} />
                      <Row label="From" value={`${s.submitterName || ""} (${s.submitterRole || ""})`} />
                      <Row label="Email" value={s.submitterEmail} />
                      {s.founder && <Row label="Founder" value={s.founder} />}
                      {s.twitter && <Row label="Twitter" value={s.twitter} />}
                    </div>

                    <p>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline break-all">
                        {s.url}
                      </a>
                    </p>

                    {s.description && <p className="text-zinc-700 whitespace-pre-wrap">{s.description}</p>}
                    {s.features && (
                      <pre className="text-xs bg-zinc-50 border border-zinc-200 rounded p-2 whitespace-pre-wrap">{s.features}</pre>
                    )}

                    <div className="flex items-center gap-2 flex-wrap">
                      {STATUSES.map((st) => (
                        <button
                          key={st}
                          onClick={() => void patch(s.id, { status: st })}
                          className={`h-8 px-3 text-xs rounded-md border ${
                            status === st ? "bg-zinc-950 text-white border-zinc-950" : "bg-white border-zinc-300"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                      <button
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(toDirectoryEntry(s));
                            setCopiedId(s.id);
                            setTimeout(() => setCopiedId(null), 2000);
                          } catch {
                            setLoadError("Clipboard blocked — select the entry text manually.");
                          }
                        }}
                        className="h-8 px-3 text-xs rounded-md border border-zinc-300 bg-white ml-auto"
                      >
                        {copiedId === s.id ? "Copied" : "Copy directory entry"}
                      </button>
                    </div>

                    {/* Paid placement. Sold by hand: agree a price, take the
                        money, set the end date here. The listing promotes
                        itself to the homepage strip and the top of the
                        directory, labelled Sponsored, and drops off by itself
                        the day after the date below. */}
                    <div className="rounded-md border border-amber-200 bg-amber-50/60 p-3">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-amber-900">
                          <input
                            type="checkbox"
                            checked={!!s.sponsored}
                            onChange={(e) => {
                              const on = e.target.checked;
                              // The API rejects a placement with no end date, so
                              // default to 30 days out rather than bouncing the
                              // admin with an error they then have to fix.
                              const fallback = new Date(Date.now() + 30 * 864e5)
                                .toISOString()
                                .slice(0, 10);
                              void patch(s.id, {
                                sponsored: on,
                                sponsoredUntil: on ? s.sponsoredUntil || fallback : s.sponsoredUntil,
                              });
                            }}
                            disabled={s.status !== "approved"}
                          />
                          Sponsored placement
                        </label>
                        <label className="flex items-center gap-2 text-xs text-amber-900">
                          Runs until
                          <input
                            type="date"
                            defaultValue={s.sponsoredUntil || ""}
                            onBlur={(e) => {
                              if (e.target.value !== (s.sponsoredUntil || "")) {
                                void patch(s.id, { sponsoredUntil: e.target.value });
                              }
                            }}
                            className="px-2 py-1 text-xs border border-amber-300 rounded"
                          />
                        </label>
                      </div>
                      {s.status !== "approved" && (
                        <p className="text-xs text-amber-800 mb-2">
                          Approve the listing first — an unapproved tool is not published, so a
                          placement on it would show nowhere.
                        </p>
                      )}
                      {s.sponsored && s.sponsoredUntil && (
                        <p className="text-xs text-amber-800 mb-2">
                          {Date.parse(`${s.sponsoredUntil}T23:59:59Z`) < Date.now()
                            ? "Expired — no longer showing anywhere on the site."
                            : `Live until ${s.sponsoredUntil}.`}
                        </p>
                      )}
                      <input
                        defaultValue={s.sponsorshipNote || ""}
                        onBlur={(e) => {
                          if (e.target.value !== (s.sponsorshipNote || "")) {
                            void patch(s.id, { sponsorshipNote: e.target.value });
                          }
                        }}
                        className="w-full px-3 py-2 text-xs border border-amber-300 rounded-md bg-white"
                        placeholder="What was charged, invoice ref, who paid — private"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">Private notes</label>
                      <textarea
                        defaultValue={s.notes || ""}
                        onBlur={(e) => {
                          if (e.target.value !== (s.notes || "")) void patch(s.id, { notes: e.target.value });
                        }}
                        rows={2}
                        className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-md"
                        placeholder="Why approved or declined…"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value?: string; mono?: boolean }) {
  if (!value) return null;
  return (
    <p className="flex gap-2">
      <span className="text-zinc-500 w-24 shrink-0">{label}</span>
      <span className={mono ? "font-mono" : ""}>{value}</span>
    </p>
  );
}
