import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ROLE_KEY, SUPABASE_URL } from "../config";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY);
