-- =============================================================================
-- Astral Documents module: foundation schema (Stage 1)
--
-- Apply with: supabase db reset (local) or supabase db push (remote).
-- This file is one migration so it applies atomically and in the right order.
--
-- Design notes
-- 1. profiles.id is the auth user id, so auth.uid() is used everywhere.
-- 2. Cross-table checks inside policies go through SECURITY DEFINER helper
--    functions. Policies that query each other's tables directly cause
--    "infinite recursion detected in policy" errors in Postgres.
-- 3. Published template versions are frozen. Changes require a new version.
--    A version is withdrawn by setting retired_at, never by unpublishing.
-- 4. The first admin is created by hand (dashboard or SQL editor), because no
--    client can change a role. See the note after the profiles table.
-- 5. To seed a template: insert the version with published = false, insert its
--    questions, then update the version to published = true. Questions cannot
--    be added to a version that is already published.
-- =============================================================================


-- -----------------------------------------------------------------------------
-- 1. Profiles
-- -----------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'client'
    check (role in ('manager', 'agent', 'admin', 'client')),
  created_at timestamptz not null default now()
);

create index profiles_role_idx on public.profiles (role);

-- FIRST ADMIN: after your first sign up, promote that user by hand in the SQL
-- editor: update public.profiles set role = 'admin' where id = '<user uuid>';
-- The role guard trigger below allows this because the SQL editor has no JWT.

-- Create a profile for every new auth user, always with the default role.
create function public.create_profile_for_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, role) values (new.id, 'client');
  return new;
end;
$$;

revoke execute on function public.create_profile_for_user() from public, anon, authenticated;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.create_profile_for_user();

-- Backfill profiles for any auth users that already exist.
insert into public.profiles (id)
select id from auth.users
on conflict (id) do nothing;


-- -----------------------------------------------------------------------------
-- 2. Admin helper
-- -----------------------------------------------------------------------------
-- True when the signed in user has the admin role. SECURITY DEFINER lets it read
-- profiles without triggering the profiles policies, which avoids recursion.
create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'admin'
  );
$$;

revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;


-- -----------------------------------------------------------------------------
-- 3. Profile policies and role guard
-- -----------------------------------------------------------------------------
alter table public.profiles enable row level security;

-- Users can read their own profile.
create policy profiles_self_select
  on public.profiles for select to authenticated
  using (id = (select auth.uid()));

-- Admins can read every profile.
create policy profiles_admin_select
  on public.profiles for select to authenticated
  using (public.is_admin());

-- Admins can update other users' profiles (for example to change a role) but
-- never their own, so an admin cannot lock the system out of all admins.
-- There is deliberately no insert, delete or self-update policy: profiles are
-- created only by the trigger above.
create policy profiles_admin_update
  on public.profiles for update to authenticated
  using (public.is_admin() and id <> (select auth.uid()))
  with check (public.is_admin() and id <> (select auth.uid()));

-- Defence in depth: even if a policy is added later by mistake, only an admin
-- or a privileged server context (no JWT) can change a role or an id.
create function public.guard_profile_update()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.id <> old.id then
    raise exception 'A profile id cannot be changed';
  end if;
  if new.role <> old.role
     and (select auth.uid()) is not null
     and not public.is_admin() then
    raise exception 'Only an admin can change a role';
  end if;
  return new;
end;
$$;

revoke execute on function public.guard_profile_update() from public, anon, authenticated;

create trigger profiles_guard_update
before update on public.profiles
for each row execute function public.guard_profile_update();


-- -----------------------------------------------------------------------------
-- 4. Shared updated_at trigger function
-- -----------------------------------------------------------------------------
create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke execute on function public.set_updated_at() from public, anon, authenticated;


-- -----------------------------------------------------------------------------
-- 5. Templates, versions and questions (tables only; policies come later)
-- -----------------------------------------------------------------------------
create table public.document_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_by uuid not null default auth.uid()
    references public.profiles (id) on delete restrict,
  created_at timestamptz not null default now()
);

create index document_templates_created_by_idx on public.document_templates (created_by);

create type public.template_review_status as enum (
  'draft',
  'pending_lawyer_review',
  'approved'
);

create table public.template_versions (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null
    references public.document_templates (id) on delete cascade,
  version integer not null check (version > 0),
  schema jsonb not null,
  published boolean not null default false,
  review_status public.template_review_status not null default 'draft',
  retired_at timestamptz,
  created_at timestamptz not null default now(),
  -- This unique constraint also indexes template_id.
  unique (template_id, version)
);

create table public.template_questions (
  id uuid primary key default gen_random_uuid(),
  version_id uuid not null
    references public.template_versions (id) on delete cascade,
  field_key text not null,
  question_text text not null,
  field_type text not null,
  validation jsonb,
  sort_order integer not null,
  created_at timestamptz not null default now(),
  -- field_key is the stable identifier answers are stored against.
  -- This unique constraint also indexes version_id.
  unique (version_id, field_key)
);


-- -----------------------------------------------------------------------------
-- 6. Documents, answers and saved parties (tables only)
-- -----------------------------------------------------------------------------
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  template_version_id uuid not null
    references public.template_versions (id) on delete restrict,
  -- Cascade: erasing an account means deleting the auth.users row, which removes
  -- the profile, and with it the user's documents, answers and saved parties.
  owner_id uuid not null
    references public.profiles (id) on delete cascade,
  status text not null default 'draft'
    check (status in ('draft', 'submitted', 'finalized')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index documents_owner_id_idx on public.documents (owner_id);
create index documents_template_version_id_idx on public.documents (template_version_id);

create trigger documents_set_updated_at
before update on public.documents
for each row execute function public.set_updated_at();

create table public.document_answers (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null
    references public.documents (id) on delete cascade,
  field_key text not null,
  answer jsonb not null,
  created_at timestamptz not null default now(),
  -- One answer per field per document, which makes draft saving a simple upsert.
  -- This unique constraint also indexes document_id.
  unique (document_id, field_key)
);

-- Reusable saved details (landlord, tenant, guarantor, client) that belong to a
-- user and can be referenced from answers across many documents.
create table public.party_details (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null
    references public.profiles (id) on delete cascade,
  type text not null
    check (type in ('landlord', 'tenant', 'guarantor', 'client')),
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index party_details_owner_id_idx on public.party_details (owner_id);

create trigger party_details_set_updated_at
before update on public.party_details
for each row execute function public.set_updated_at();


-- -----------------------------------------------------------------------------
-- 7. Policy helper functions (SECURITY DEFINER, so they bypass RLS internally
--    and cannot cause policy recursion)
-- -----------------------------------------------------------------------------

-- A version is open for creating new documents when it is published and not retired.
create function public.is_version_open(p_version_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.template_versions tv
    where tv.id = p_version_id
      and tv.published
      and tv.retired_at is null
  );
$$;

-- A version is readable when it is open, or when the signed in user owns a
-- document built from it (so existing drafts keep working after retirement).
create function public.can_read_version(p_version_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select public.is_version_open(p_version_id)
    or exists (
      select 1
      from public.documents d
      where d.template_version_id = p_version_id
        and d.owner_id = (select auth.uid())
    );
$$;

-- A template is readable when at least one of its versions is readable.
create function public.can_read_template(p_template_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.template_versions tv
    where tv.template_id = p_template_id
      and public.can_read_version(tv.id)
  );
$$;

revoke execute on function public.is_version_open(uuid) from public, anon;
revoke execute on function public.can_read_version(uuid) from public, anon;
revoke execute on function public.can_read_template(uuid) from public, anon;
grant execute on function public.is_version_open(uuid) to authenticated;
grant execute on function public.can_read_version(uuid) to authenticated;
grant execute on function public.can_read_template(uuid) to authenticated;


-- -----------------------------------------------------------------------------
-- 8. Template policies
-- -----------------------------------------------------------------------------
alter table public.document_templates enable row level security;
alter table public.template_versions enable row level security;
alter table public.template_questions enable row level security;

-- Signed in users can read a template that has an open version, or that one of
-- their own documents was built from.
create policy document_templates_read
  on public.document_templates for select to authenticated
  using (public.can_read_template(id));

-- Admins can read, create, change and delete templates.
create policy document_templates_admin_all
  on public.document_templates for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Signed in users can read open versions, plus the exact version behind any of
-- their own documents.
create policy template_versions_read
  on public.template_versions for select to authenticated
  using (public.can_read_version(id));

-- Admins can read, create, change and delete versions. The protection trigger
-- below still freezes a version once it is published.
create policy template_versions_admin_all
  on public.template_versions for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Questions follow the same visibility as their version.
create policy template_questions_read
  on public.template_questions for select to authenticated
  using (public.can_read_version(version_id));

-- Admins can manage questions of unpublished versions. The guard trigger below
-- blocks changes once the version is published.
create policy template_questions_admin_all
  on public.template_questions for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());


-- -----------------------------------------------------------------------------
-- 9. Immutability of published versions
-- -----------------------------------------------------------------------------

-- Once published, a version cannot be deleted, and nothing about it can change
-- except retired_at (withdrawal). Create a new version to change content.
create function public.guard_template_version_change()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'DELETE' then
    if old.published then
      raise exception 'A published template version cannot be deleted; retire it instead';
    end if;
    return old;
  end if;

  if old.published then
    if (new.template_id, new.version, new.schema, new.published, new.review_status)
       is distinct from
       (old.template_id, old.version, old.schema, old.published, old.review_status) then
      raise exception 'A published template version cannot be changed; create a new version instead';
    end if;
  end if;
  return new;
end;
$$;

revoke execute on function public.guard_template_version_change() from public, anon, authenticated;

create trigger template_versions_guard
before update or delete on public.template_versions
for each row execute function public.guard_template_version_change();

-- Questions cannot be added to, moved into, changed in or deleted from a
-- published version. SECURITY DEFINER so the check always sees the real row.
create function public.guard_template_question_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op in ('UPDATE', 'DELETE') then
    if exists (
      select 1 from public.template_versions
      where id = old.version_id and published
    ) then
      raise exception 'Questions of a published version cannot be changed; create a new version instead';
    end if;
  end if;

  if tg_op in ('INSERT', 'UPDATE') then
    if exists (
      select 1 from public.template_versions
      where id = new.version_id and published
    ) then
      raise exception 'Questions cannot be added to a published version; create a new version instead';
    end if;
  end if;

  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

revoke execute on function public.guard_template_question_change() from public, anon, authenticated;

create trigger template_questions_guard
before insert or update or delete on public.template_questions
for each row execute function public.guard_template_question_change();


-- -----------------------------------------------------------------------------
-- 10. Document policies and guard
-- -----------------------------------------------------------------------------
alter table public.documents enable row level security;

-- Owners can read their own documents. There is deliberately no admin read
-- policy: client contracts are private. Add audited, consent-based access later.
create policy documents_owner_select
  on public.documents for select to authenticated
  using (owner_id = (select auth.uid()));

-- Owners can create documents only for themselves, and only against an open
-- (published, not retired) template version.
create policy documents_owner_insert
  on public.documents for insert to authenticated
  with check (
    owner_id = (select auth.uid())
    and public.is_version_open(template_version_id)
  );

-- Owners can update their own documents. The guard trigger below keeps
-- owner_id and template_version_id fixed and stops finalized documents reopening.
create policy documents_owner_update
  on public.documents for update to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

-- Owners can delete their own documents (supports erasure requests).
create policy documents_owner_delete
  on public.documents for delete to authenticated
  using (owner_id = (select auth.uid()));

create function public.guard_document_update()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.owner_id <> old.owner_id
     or new.template_version_id <> old.template_version_id then
    raise exception 'owner_id and template_version_id cannot be changed';
  end if;
  if old.status = 'finalized' and new.status <> 'finalized' then
    raise exception 'A finalized document cannot be reopened';
  end if;
  return new;
end;
$$;

revoke execute on function public.guard_document_update() from public, anon, authenticated;

create trigger documents_guard_update
before update on public.documents
for each row execute function public.guard_document_update();


-- -----------------------------------------------------------------------------
-- 11. Document answer policies
-- -----------------------------------------------------------------------------
alter table public.document_answers enable row level security;

-- Owners can always read answers on their own documents, in any status, so
-- export and re-download keep working after finalization.
create policy document_answers_owner_select
  on public.document_answers for select to authenticated
  using (
    exists (
      select 1 from public.documents d
      where d.id = document_answers.document_id
        and d.owner_id = (select auth.uid())
    )
  );

-- Owners can add answers only to their own documents that are still drafts.
create policy document_answers_owner_insert
  on public.document_answers for insert to authenticated
  with check (
    exists (
      select 1 from public.documents d
      where d.id = document_answers.document_id
        and d.owner_id = (select auth.uid())
        and d.status = 'draft'
    )
  );

-- Owners can change answers only while the parent document is a draft.
create policy document_answers_owner_update
  on public.document_answers for update to authenticated
  using (
    exists (
      select 1 from public.documents d
      where d.id = document_answers.document_id
        and d.owner_id = (select auth.uid())
        and d.status = 'draft'
    )
  )
  with check (
    exists (
      select 1 from public.documents d
      where d.id = document_answers.document_id
        and d.owner_id = (select auth.uid())
        and d.status = 'draft'
    )
  );

-- Owners can delete answers only while the parent document is a draft.
create policy document_answers_owner_delete
  on public.document_answers for delete to authenticated
  using (
    exists (
      select 1 from public.documents d
      where d.id = document_answers.document_id
        and d.owner_id = (select auth.uid())
        and d.status = 'draft'
    )
  );


-- -----------------------------------------------------------------------------
-- 12. Saved party details policy
-- -----------------------------------------------------------------------------
alter table public.party_details enable row level security;

-- Owners have full control of their own saved parties, and nobody else has any.
create policy party_details_owner_all
  on public.party_details for all to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));