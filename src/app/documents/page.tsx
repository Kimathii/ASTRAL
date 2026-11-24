import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/documents/supabase/server";
import { signOutAction } from "@/lib/documents/supabase/actions";

// Placeholder home for the Documents module. It proves the whole chain works:
// session cookie, the profile trigger, and row level security.
export default async function DocumentsHome() {
  const supabase = await supabaseServer();

  // The proxy only does an optimistic check, so the page verifies the user itself.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/documents/signin");

  // Filter by id: admins can read every profile, so an unfiltered single() would fail for them.
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <section className="mx-auto flex max-w-2xl flex-col gap-4 p-8">
      <h1 className="text-2xl font-semibold text-navy">Documents</h1>
      <div className="rounded-xl border border-line bg-white p-5 text-sm text-slate">
        <p>
          Signed in as <span className="font-medium text-ink">{user.email}</span>
        </p>
        <p className="mt-1">
          Role: <span className="font-medium text-ink">{profile?.role ?? "unknown"}</span>
        </p>
      </div>
      <form action={signOutAction}>
        <button
          type="submit"
          className="rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white"
        >
          Sign out
        </button>
      </form>
    </section>
  );
}