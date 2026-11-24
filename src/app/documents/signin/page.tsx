import Link from "next/link";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/documents/supabase/server";
import { signInAction } from "@/lib/documents/supabase/actions";
import { AuthForm } from "@/components/documents/AuthForm";

// Known error codes map to fixed messages. The raw query value is never rendered.
const NOTICES: Record<string, string> = {
  confirmation_failed:
    "That confirmation link is invalid or has expired. Sign up again to get a new one.",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/documents");

  const { error } = await searchParams;
  const notice = error ? NOTICES[error] : undefined;

  return (
    <section className="mx-auto flex max-w-md flex-col gap-4 p-8">
      <h1 className="text-2xl font-semibold text-navy">Sign in</h1>
      <AuthForm
        action={signInAction}
        submitLabel="Sign in"
        pendingLabel="Signing in..."
        autoComplete="current-password"
        notice={notice}
      />
      <p className="text-sm text-slate">
        No account?{" "}
        <Link href="/documents/signup" className="text-blue">
          Sign up
        </Link>
      </p>
    </section>
  );
}