import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
// const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SUPABASE_S3_ACCESS_KEY = process.env.SUPABASE_S3_ACCESS_KEY;
const SUPABASE_S3_SECRET_KEY = process.env.SUPABASE_S3_SECRET_KEY;
const SUPABASE_ROLE_KEY = process.env.SUPABASE_ROLE_KEY;

if (
  !SUPABASE_URL ||
  !SUPABASE_ROLE_KEY ||
  !SUPABASE_S3_ACCESS_KEY ||
  !SUPABASE_S3_SECRET_KEY
) {
  throw new Error("Missing Supabase environment variables");
}
export const supabase = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY, {
  global: {
    headers: {
      "x-supabase-access-key": SUPABASE_S3_ACCESS_KEY,
      "x-supabase-secret-key": SUPABASE_S3_SECRET_KEY,
    },
  },
});
