import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Get all environment variables that contain 'SUPABASE'
    const supabaseEnvs = Object.entries(process.env)
      .filter(([key]) => key.includes("SUPABASE") || key.includes("NEXT_PUBLIC"))
      .reduce(
        (acc, [key, value]) => {
          acc[key] = {
            exists: !!value,
            length: value?.length || 0,
            preview: value ? `${value.substring(0, 20)}...` : "undefined",
          }
          return acc
        },
        {} as Record<string, any>,
      )

    const requiredVars = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }

    const missingVars = Object.entries(requiredVars)
      .filter(([_, value]) => !value)
      .map(([key]) => key)

    return NextResponse.json({
      success: missingVars.length === 0,
      requiredVars: Object.entries(requiredVars).reduce(
        (acc, [key, value]) => {
          acc[key] = {
            exists: !!value,
            length: value?.length || 0,
            valid: !!value && value.length > 10,
          }
          return acc
        },
        {} as Record<string, any>,
      ),
      missingVars,
      allSupabaseEnvs: supabaseEnvs,
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
