import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({
        success: false,
        error: "Admin client not configured",
        message: "Please check your SUPABASE_SERVICE_ROLE_KEY environment variable",
      })
    }

    // Test the connection with the new keys
    const { data: tables, error: tablesError } = await supabaseAdmin
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")

    if (tablesError) {
      return NextResponse.json({
        success: false,
        error: tablesError.message,
        details: tablesError,
      })
    }

    // Check if our main tables exist
    const tableNames = tables?.map((t) => t.table_name) || []
    const requiredTables = ["complaints", "users", "news_articles", "documents"]
    const missingTables = requiredTables.filter((table) => !tableNames.includes(table))

    return NextResponse.json({
      success: true,
      message: "Supabase connection successful!",
      data: {
        totalTables: tables?.length || 0,
        tableNames,
        missingTables,
        needsSetup: missingTables.length > 0,
      },
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      details: error,
    })
  }
}
