import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Dodo Payments: the $5 one-off lifetime featured placement.
 *
 * Two halves, kept apart deliberately:
 *
 *  - A checkout URL, which is just a link. No API key is needed to send
 *    somebody to a hosted checkout, so the buy button works with nothing more
 *    than a product id configured.
 *  - A webhook, which is the only thing that may mark a placement as paid.
 *    A redirect back from the checkout page proves nothing - anyone can open
 *    the success URL directly - so the redirect is cosmetic and the webhook
 *    is the source of truth.
 */

/** Product id from the Dodo dashboard, e.g. pdt_0Nos0XTsSJR1JIhjX8TPZ. */
const PRODUCT_ID = process.env.DODO_PRODUCT_ID;

/**
 * Checkout host. Test and live are different hosts, so this is configurable
 * rather than guessed - sending live buyers at a test checkout would take
 * payments that never arrive.
 */
const CHECKOUT_BASE =
  process.env.DODO_CHECKOUT_BASE || "https://checkout.dodopayments.com";

export function dodoConfigured(): boolean {
  return Boolean(PRODUCT_ID);
}

/**
 * Hosted checkout link for one listing.
 *
 * The submission reference travels as metadata so the webhook knows which
 * listing was paid for. It is our own opaque identifier (SC-20260920-AB12),
 * not an email or a name, so nothing personal ends up in a URL.
 */
export function dodoCheckoutUrl(opts: {
  reference: string;
  email?: string;
  returnTo: string;
}): string | null {
  if (!PRODUCT_ID) return null;

  const url = new URL(`${CHECKOUT_BASE}/buy/${PRODUCT_ID}`);
  url.searchParams.set("quantity", "1");
  url.searchParams.set("redirect_url", opts.returnTo);
  url.searchParams.set("metadata_reference", opts.reference);
  if (opts.email) url.searchParams.set("email", opts.email);
  return url.toString();
}

/**
 * Verifies a webhook against the Standard Webhooks specification, which Dodo
 * follows: HMAC-SHA256 over "{id}.{timestamp}.{body}", base64, compared
 * constant-time.
 *
 * Implemented directly rather than pulling in a dependency - it is a dozen
 * lines, and a payment-authorising code path is somewhere to minimise
 * third-party surface rather than add to it.
 *
 * Returns false for anything missing, malformed, mis-signed or stale. A stale
 * timestamp matters: without that check a captured request could be replayed
 * forever to re-apply a payment.
 */
export function verifyDodoWebhook(
  headers: Headers,
  rawBody: string,
  toleranceSeconds = 300
): boolean {
  const secret = process.env.DODO_WEBHOOK_SECRET;
  if (!secret) return false;

  const id = headers.get("webhook-id");
  const timestamp = headers.get("webhook-timestamp");
  const signatureHeader = headers.get("webhook-signature");
  if (!id || !timestamp || !signatureHeader) return false;

  const sent = Number(timestamp);
  if (!Number.isFinite(sent)) return false;
  const age = Math.abs(Date.now() / 1000 - sent);
  if (age > toleranceSeconds) return false;

  // whsec_<base64>; the prefix is not part of the key material.
  const keyBytes = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const expected = createHmac("sha256", keyBytes)
    .update(`${id}.${timestamp}.${rawBody}`)
    .digest("base64");

  // The header carries one or more space-separated "v1,<signature>" values so
  // a secret can be rotated without downtime; any match is valid.
  for (const part of signatureHeader.split(" ")) {
    const value = part.startsWith("v1,") ? part.slice(3) : part;
    const a = Buffer.from(value);
    const b = Buffer.from(expected);
    if (a.length === b.length && timingSafeEqual(a, b)) return true;
  }
  return false;
}

/** The slice of a Dodo webhook payload this app acts on. */
export interface DodoEvent {
  type?: string;
  data?: {
    payment_id?: string;
    status?: string;
    total_amount?: number;
    currency?: string;
    metadata?: Record<string, string>;
    customer?: { email?: string };
  };
}

/** The submission reference a payment was for, if it carried one. */
export function referenceFromEvent(event: DodoEvent): string | null {
  const ref = event.data?.metadata?.reference;
  return ref ? String(ref).trim() || null : null;
}
