# Astral — Frontend Skeleton

A runnable Next.js scaffold for Astral, structured around the product's core idea:
**one app, three role-based lenses on the same opportunity**, plus a separate
public consumer-facing surface.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000 — you'll land on a temporary role-picker (stands in
for login until real auth exists).

## How it's organized

```
src/
  app/
    page.tsx                        Landing / temporary role picker
    (app)/                          Route group: everything behind auth
      layout.tsx                   Wraps every authenticated page in AppShell
      manager/                     Property Manager views
      agent/                       Agent views
      admin/                       Admin views
    catalogue/[slug]/              PUBLIC consumer-facing agent catalogue
                                    (no sidebar, no auth — separate surface)
  components/
    layout/
      AppShell.tsx                 Sidebar + Topbar, shared by all 3 roles
      Sidebar.tsx                  Nav items change per role (same component)
      Topbar.tsx                   Dev-only role switcher (remove once auth exists)
    ui/
      PropertyCard.tsx             Shared across manager/agent/catalogue views
      PipelineStepper.tsx          The opportunity's stage — a first-class visual
      VerificationBadge.tsx        Verified/Pending/Rejected status
  lib/
    types.ts                       Domain types matching the product doc
    mock-data.ts                   Placeholder data (swap for real API later)
    role-context.tsx               Fake "auth" — swap for real session later
```

## Key decisions baked in (worth re-checking as you build)

- **One shell, role-based nav** — `(app)/layout.tsx` wraps Manager, Agent, and
  Admin in the same `AppShell`. Nothing is duplicated per role; `Sidebar.tsx`
  just renders a different nav list depending on `useRole()`.
- **Role switching is fake.** `role-context.tsx` is a placeholder for real
  auth/session. The Topbar's role switcher is a dev convenience — delete it
  once login exists, and read the role from the session instead.
- **Route access isn't actually gated yet.** Anyone can visit `/admin` by
  typing the URL. Add real route protection (middleware or per-layout checks)
  once auth is wired up.
- **The pipeline is a UI primitive**, not a status string. `PipelineStepper`
  is meant to appear anywhere an opportunity shows up — property detail,
  agent opportunity view, admin overview.
- **The catalogue is a separate surface on purpose** — it has no sidebar, no
  role context, and is meant to be publicly shareable (`/catalogue/[slug]`).
  "Request an inspection" is a placeholder button; wiring it to actually
  create a lead/event is a real next step.
- **Mock data mirrors the future API shape** (`lib/types.ts` +
  `lib/mock-data.ts`), so swapping in real fetches later should mean
  replacing the data source, not rewriting components.

## Not yet done (by design, for a first pass)

- No real authentication
- No backend/API calls — everything reads from `lib/mock-data.ts`
- No route protection by role
- Forms (add property, express interest, request inspection) are visual only
