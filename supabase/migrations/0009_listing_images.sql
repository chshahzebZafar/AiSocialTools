-- Product screenshots for featured listings.
--
-- A separate table rather than a column on submissions, because each image
-- carries its own moderation state. An owner can add a fourth screenshot to a
-- listing that is already live, and that one image needs reviewing without
-- touching the listing's own status.
--
-- Images are only visible once a reviewer approves them. The upload pipeline
-- can prove a file is a real image and strip anything executable out of it, but
-- it cannot judge whether the picture is appropriate - and these render on
-- public pages. That judgement stays human.
--
-- Idempotent. Run after 0008.

create table if not exists public.listing_images (
  id            uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,

  -- Path inside the storage bucket. Not a URL: the bucket may be renamed or
  -- fronted differently, and a stored absolute URL would rot.
  storage_path  text not null unique,

  -- Recorded from the re-encoded file, not from what the client claimed.
  width         integer not null check (width  > 0),
  height        integer not null check (height > 0),
  bytes         integer not null check (bytes  > 0),

  -- Shown under the image. Owner-supplied, so it is escaped on render.
  caption       text,

  -- pending -> approved | declined. Nothing public reads a row that is not
  -- approved.
  status        text not null default 'pending'
                check (status in ('pending', 'approved', 'declined')),
  decline_note  text,

  -- Ordering within the gallery, owner-controlled.
  position      integer not null default 0,

  uploaded_at   timestamptz not null default now(),
  reviewed_at   timestamptz
);

-- The gallery reads "approved images for this listing, in order" on every tool
-- page render, so that is the index.
create index if not exists listing_images_gallery_idx
  on public.listing_images (submission_id, position)
  where status = 'approved';

-- The moderation queue reads "everything still pending, oldest first".
create index if not exists listing_images_pending_idx
  on public.listing_images (uploaded_at)
  where status = 'pending';

alter table public.listing_images enable row level security;

-- An owner sees their own images whatever the state, so the dashboard can show
-- "in review" and "not accepted" honestly. Writes go through the API with the
-- service role, which is where the size, type and count limits are enforced -
-- a policy cannot re-encode a file or count what is already there.
drop policy if exists listing_images_owner_read on public.listing_images;
create policy listing_images_owner_read on public.listing_images
  for select to authenticated
  using (
    exists (
      select 1 from public.submissions s
      where s.id = listing_images.submission_id
        and s.owner_id = auth.uid()
    )
  );

-- Storage bucket. Public-read: approved screenshots are meant to be seen, and
-- a public path lets next/image and the CDN cache them, which keeps Supabase
-- egress near zero no matter how much traffic a page gets. Visibility is
-- controlled by the status column above, not by the bucket - nothing renders a
-- path whose row is not approved, and paths carry a uuid so an unapproved one
-- cannot be guessed.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'listing-images',
  'listing-images',
  true,
  2097152,                      -- 2 MB. The API rejects earlier; this is a floor.
  array['image/webp']           -- The API re-encodes everything to WebP, so a
)                               -- file of any other type never reaches storage.
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Only the service role writes. Uploads are re-encoded server-side first, so
-- there is no path where a client hands a file straight to storage.
drop policy if exists listing_images_public_read on storage.objects;
create policy listing_images_public_read on storage.objects
  for select to public
  using (bucket_id = 'listing-images');

notify pgrst, 'reload schema';
