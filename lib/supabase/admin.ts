import { createClient } from "@supabase/supabase-js";

import {
  hasSupabaseServiceEnv,
  supabaseServiceRoleKey,
  supabaseUrl
} from "@/lib/supabase/config";

export function createAdminSupabaseClient() {
  if (!hasSupabaseServiceEnv() || !supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Supabase service role environment variables are not configured.");
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
