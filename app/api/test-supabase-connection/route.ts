import { NextResponse } from "next/server"
import { testSupabaseConnection } from "@/lib/supabase-connection-test"

export async function GET() {
  try {
    const result = await testSupabaseConnection()

    return NextResponse.json({
      success: result.success,
      timestamp: new Date().toISOString(),
      connection: result,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function POST() {
  return GET()
}
