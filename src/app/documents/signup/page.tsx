import Link from "next/link";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/documents/supabase/server";
import { signUpAction } from "@/lib/documents/supabase/actions";
import { AuthForm } from "@/components/documents/AuthForm";

export default async function SignUpPage() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/documents");

  return (
    <section className="mx-auto flex max-w-md flex-col gap-4 p-8">
      <h1 className="text-2xl font-semibold text-navy">Sign up</h1>
      <AuthForm
        action={signUpAction}
        submitLabel="Sign up"
        pendingLabel="Creating account..."
        autoComplete="new-password"
      />
      <p className="text-sm text-slate">
        Already have an account?{" "}
        <Link href="/documents/signin" className="text-blue">
          Sign in
        </Link>
      </p>
    </section>
  );
}