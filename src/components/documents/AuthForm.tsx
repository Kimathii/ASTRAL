"use client";

import { useActionState } from "react";
import type { AuthState } from "@/lib/documents/supabase/actions";

type Props = {
  action: (prev: AuthState, formData: FormData) => Promise<AuthState>;
  submitLabel: string;
  pendingLabel: string;
  autoComplete: "current-password" | "new-password";
  notice?: string;
};

export function AuthForm({ action, submitLabel, pendingLabel, autoComplete, notice }: Props) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction} className="flex flex-col gap-3">
      {notice && (
        <p className="rounded-lg bg-ice px-3 py-2 text-sm text-blue">
          {notice}
        </p>
      )}
      {state?.error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {state.error}
        </p>
      )}
      {state?.message && (
        <p role="status" className="rounded-lg bg-ice px-3 py-2 text-sm text-blue">
          {state.message}
        </p>
      )}
      <label className="flex flex-col gap-1 text-sm font-medium text-ink">
        Email
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="rounded-lg border border-line px-3 py-2 text-sm font-normal"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-ink">
        Password
        <input
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete={autoComplete}
          className="rounded-lg border border-line px-3 py-2 text-sm font-normal"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {pending ? pendingLabel : submitLabel}
      </button>
    </form>
  );
}
