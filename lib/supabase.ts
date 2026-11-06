import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Server-only Supabase client. Uses the service role key, so it must never be
 * imported from a client component. Returns null when the env vars are absent
 * so local builds and previews without credentials still work.
 */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  client ??= createClient(url, key, { auth: { persistSession: false } });
  return client;
}
