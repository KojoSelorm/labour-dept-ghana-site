import { NextResponse } from "next/server"

export async function POST() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    const hasUrl = !!supabaseUrl
    const hasAnonKey = !!supabaseAnonKey
    const hasServiceKey = !!supabaseServiceKey

    const allConfigured = hasUrl && hasAnonKey && hasServiceKey

    // Validate URL format
    const urlValid = supabaseUrl?.includes("cfqnlejmlzpzrdzjkyrj.supabase.co") || false

    // Validate key formats (JWT tokens should be longer)
    const anonKeyValid = (supabaseAnonKey?.length || 0) > 100
    const serviceKeyValid = (supabaseServiceKey?.length || 0) > 100

    return NextResponse.json({
      success: allConfigured && urlValid && anonKeyValid && serviceKeyValid,
      message: allConfigured
        ? "All environment variables configured correctly"
        : "Missing or invalid environment variables",
      details: {
        hasUrl,
        hasAnonKey,
        hasServiceKey,
        url: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : "Not set",
        anonKeyLength: supabaseAnonKey?.length || 0,
        serviceKeyLength: supabaseServiceKey?.length || 0,
        urlValid,
        anonKeyValid,
        serviceKeyValid,
        projectRef: "cfqnlejmlzpzrdzjkyrj",
      },
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      details: null,
    })
  }
}
