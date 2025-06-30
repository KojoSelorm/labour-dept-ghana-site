import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Get all environment variables related to Supabase
    const supabaseVars = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "not set",
      NEXT_PUBLIC_SUPABASE_URL_LENGTH: (process.env.NEXT_PUBLIC_SUPABASE_URL || "").length,
      NEXT_PUBLIC_SUPABASE_ANON_KEY_SET: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      NEXT_PUBLIC_SUPABASE_ANON_KEY_LENGTH: (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").length,
      SUPABASE_SERVICE_ROLE_KEY_SET: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      SUPABASE_SERVICE_ROLE_KEY_LENGTH: (process.env.SUPABASE_SERVICE_ROLE_KEY || "").length,
      // List all environment variables (just the keys, not values for security)
      ALL_ENV_KEYS: Object.keys(process.env),
    }

    return NextResponse.json({
      success: true,
      message: "Environment variables debug information",
      supabaseVars,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
