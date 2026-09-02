import { createClient } from "@supabase/supabase-js";
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
function configured() {
  if (!url || !key || key.startsWith("sb_secret_")) return false;
  try {
    if (new URL(url).protocol !== "https:") return false;
    if (key.split(".").length === 3) {
      const payload = JSON.parse(atob(key.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
      if (payload.role === "service_role") return false;
    }
    return true;
  } catch { return false; }
}
// Authorization is enforced by database and storage policies, never by this UI.
export const supabase = configured() ? createClient(url, key) : null;
export const supabaseSetupMessage = "The editor isn’t connected yet. Your website still works; publishing will be available once the account setup is complete.";
