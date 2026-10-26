-- Remembering who has already been told about a feature.
--
-- Without this, a campaign run that fails halfway through cannot be retried:
-- re-running it would email the first half a second time. People forgive a
-- missing email; they do not forgive a duplicate, and a directory that double-
-- mails its listers looks exactly like the spam it is trying not to be.
--
-- An array rather than a separate table because the question is only ever
-- "has this listing had campaign X", never "who received X, ordered by date".
-- If that second question ever matters, this becomes a table.
--
-- Idempotent. Run after 0009.

alter table public.submissions
  add column if not exists announced text[] not null default '{}';

-- The send loop asks "who has not had this one yet" on every run.
create index if not exists submissions_announced_idx
  on public.submissions using gin (announced);

/**
 * Appends a campaign key to one listing, idempotently.
 *
 * A function rather than an update from the application so the read and the
 * write are one statement. Two sends racing on the same row would otherwise
 * both read the old array and the second would overwrite the first.
 */
create or replace function public.append_announcement(
  p_reference text,
  p_campaign  text
) returns void
language sql
security definer
set search_path = public
as $$
  update public.submissions
     set announced = (
           select array_agg(distinct x)
             from unnest(announced || array[p_campaign]) as x
         )
   where reference = p_reference;
$$;

revoke all on function public.append_announcement(text, text) from public, anon, authenticated;

notify pgrst, 'reload schema';
