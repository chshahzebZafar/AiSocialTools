/**
 * Checks the decision emails sent to submitters on approve/decline.
 *
 * Exercises the real lib/submission-emails.ts with fetch stubbed, so it
 * inspects what would be sent without sending anything and without needing a
 * Resend key. Covers the cases that would be embarrassing in someone's inbox:
 * spam never mailed, tool names escaped, no upsell on a decline, private
 * reviewer notes never leaked, provider failures reported rather than thrown.
 *
 *   NODE_OPTIONS="--conditions=react-server" npx tsx scripts/check-decision-emails.mts
 *
 * The condition flag is needed because lib/submission-emails.ts imports
 * "server-only", which resolves to its throwing client build outside Next.
 */
import { sendDecisionEmail } from "../lib/submission-emails";

type Sent = { to: string[]; subject: string; html: string; reply_to?: string };
let sent: Sent[] = [];

globalThis.fetch = (async (_url: string, init: any) => {
  sent.push(JSON.parse(init.body));
  return { ok: true, status: 200, text: async () => "" };
}) as any;

const base = { to: "dev@example.com", toolName: "Acme AI", reference: "SC-20260920-AB12" };
let failures = 0;

function check(name: string, cond: boolean, detail = "") {
  if (!cond) failures++;
  console.log(`  ${cond ? "ok  " : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
}

// ---- guards, with no API key configured ----
delete process.env.RESEND_API_KEY;
check("no API key -> skipped", (await sendDecisionEmail("approved", base)) === "skipped");

process.env.RESEND_API_KEY = "re_test_key";
process.env.SUBMISSION_TO_EMAIL = "owner@aisocialtools.co";

sent = [];
check("spam never emails", (await sendDecisionEmail("spam", base)) === "skipped");
check("spam sent nothing", sent.length === 0);

check("status 'new' skipped", (await sendDecisionEmail("new", base)) === "skipped");
check(
  "missing email skipped",
  (await sendDecisionEmail("approved", { ...base, to: "" })) === "skipped"
);
check(
  "malformed email skipped",
  (await sendDecisionEmail("approved", { ...base, to: "not-an-address" })) === "skipped"
);

// ---- approval ----
sent = [];
const a = await sendDecisionEmail("approved", { ...base, slug: "acme-ai" });
check("approved -> sent", a === "sent");
const ap = sent[0];
check("goes to the submitter", ap?.to?.[0] === "dev@example.com");
check("subject names the tool", ap?.subject.includes("Acme AI"), ap?.subject);
check("links the live listing", ap?.html.includes("/ai-directory/acme-ai"));
check("carries the featured upsell", ap?.html.toLowerCase().includes("featured placement"));
check("says the free listing is unaffected", ap?.html.includes("stays exactly as it is"));
check("includes the reference", ap?.html.includes("SC-20260920-AB12"));
check("replies reach the reviewer", ap?.reply_to === "owner@aisocialtools.co");

// ---- decline ----
sent = [];
const d = await sendDecisionEmail("declined", base);
check("declined -> sent", d === "sent");
const dp = sent[0];
check("decline has no upsell", !dp?.html.toLowerCase().includes("featured placement"));
check("decline invites resubmission", dp?.html.includes("submit it again"));
check("decline leaks no private note", !dp?.html.toLowerCase().includes("note"));

// ---- escaping ----
sent = [];
await sendDecisionEmail("approved", { ...base, toolName: '<img src=x onerror="alert(1)">', slug: "x" });
check("tool name is escaped", !sent[0]?.html.includes("<img src=x"), "no raw tag in body");
check("escaped form present", sent[0]?.html.includes("&lt;img"));

// ---- provider failure is reported, not thrown ----
globalThis.fetch = (async () => ({ ok: false, status: 500, text: async () => "boom" })) as any;
check("provider error -> failed", (await sendDecisionEmail("approved", base)) === "failed");
globalThis.fetch = (async () => {
  throw new Error("network down");
}) as any;
check("network throw -> failed, not thrown", (await sendDecisionEmail("approved", base)) === "failed");

console.log(failures ? `\n${failures} FAILED` : "\nall checks passed");
process.exit(failures ? 1 : 0);
