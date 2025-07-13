import { createClient } from "@supabase/supabase-js"

// Check if we're in development and provide fallback values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key"
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "your-service-key"

// Validate required environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.warn("NEXT_PUBLIC_SUPABASE_URL is not set. Using fallback URL.")
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Using fallback key.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role key (only use on server)
export const supabaseAdmin = typeof window === "undefined" ? createClient(supabaseUrl, supabaseServiceKey) : null
