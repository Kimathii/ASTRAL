"use server";

import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/documents/supabase/server";

export type AuthState = { error?: string; message?: string } | null;

function readCredentials(formData: FormData): { email: string; password: string } | null {
  const email = formData.get("email");
  const password = formData.get("password");
  if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
    return null;
  }
  return { email: email.trim(), password };
}

export async function signInAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const creds = readCredentials(formData);
  if (!creds) return { error: "Enter your email and password." };
  const supabase = await supabaseServer();
  const { error } = await supabase.auth.signInWithPassword(creds);
  if (error) return { error: error.message };
  redirect("/documents");
}

export async function signUpAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const creds = readCredentials(formData);
  if (!creds) return { error: "Enter your email and a password." };
  if (creds.password.length < 8) return { error: "Use a password of at least 8 characters." };
  const supabase = await supabaseServer();
  const { error } = await supabase.auth.signUp(creds);
  if (error) return { error: error.message };
  return { message: "Check your email for a confirmation link." };
}

export async function signOutAction(): Promise<void> {
  const supabase = await supabaseServer();
  await supabase.auth.signOut();
  redirect("/documents/signin");
}
