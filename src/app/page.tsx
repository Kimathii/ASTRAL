import Link from "next/link";

// Temporary landing/entry point — stands in for a real login screen until
// auth exists. Links straight into each role's view for now.

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-navy">
            <div className="h-3.5 w-3.5 rounded-sm bg-sky" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-navy">Astral</span>
        </div>

        <h1 className="text-xl font-semibold text-ink">The transaction network powering real estate deals</h1>
        <p className="mt-2 text-sm text-slate">
          No login yet — pick a role to preview its view. Once auth exists, this screen becomes the real sign-in.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <Link href="/manager" className="rounded-lg bg-blue px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue/90">
            Continue as Property Manager
          </Link>
          <Link href="/agent" className="rounded-lg border border-line px-4 py-2.5 text-center text-sm font-medium text-ink hover:bg-mist">
            Continue as Agent
          </Link>
          <Link href="/admin" className="rounded-lg border border-line px-4 py-2.5 text-center text-sm font-medium text-ink hover:bg-mist">
            Continue as Admin
          </Link>
        </div>

        <div className="mt-6 border-t border-line pt-4">
          <p className="text-xs text-slate">
            Consumer-facing surface:{" "}
            <Link href="/catalogue/chiamaka-nwosu" className="font-medium text-blue hover:underline">
              view a sample agent catalogue →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
