import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { supabaseServer } from "@/lib/documents/supabase/server";

const OTP_TYPES: readonly EmailOtpType[] = [
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
  "email",
];

// Landing point for the link in the confirmation email. It exchanges the token
// hash for a session, then sends the user to /documents.
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = OTP_TYPES.find((t) => t === searchParams.get("type"));

  if (tokenHash && type) {
    const supabase = await supabaseServer();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) {
      const url = request.nextUrl.clone();
      url.pathname = "/documents";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  const failure = request.nextUrl.clone();
  failure.pathname = "/documents/signin";
  failure.search = "?error=confirmation_failed";
  return NextResponse.redirect(failure);
}