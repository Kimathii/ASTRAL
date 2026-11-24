import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import "server-only";

/**
 * Async helper for a Supabase client that respects the current request/response cookies.
 * In Next.js 16 `cookies()` returns a Promise; we forward getAll/setAll to the store.
 */
export async function supabaseServer() {
  const cookieStore = await cookies(); // async in Next.js 16
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component. The proxy refreshes sessions, safe to ignore.
          }
        },
      },
    }
  );
}
