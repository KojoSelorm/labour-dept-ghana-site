import { NextResponse } from "next/server"
import { createServerClient, checkServerConfig } from "@/lib/supabase-server"

export async function POST() {
  try {
    const config = checkServerConfig()

    if (!config.isConfigured) {
      return NextResponse.json({
        success: false,
        error: "Admin client not configured",
        details: config,
      })
    }

    const supabaseAdmin = createServerClient()

    // Get all tables in public schema
    const { data: tables, error } = await supabaseAdmin
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")
      .order("table_name")

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        details: error,
      })
    }

    const expectedTables = [
      "admin_users",
      "analytics_events",
      "blog_posts",
      "complaints",
      "contact_messages",
      "documents",
      "newsletter_subscribers",
      "page_views",
      "search_logs",
      "site_content",
      "testimonials",
    ]

    const foundTables = tables?.map((t) => t.table_name) || []
    const missingTables = expectedTables.filter((table) => !foundTables.includes(table))
    const extraTables = foundTables.filter((table) => !expectedTables.includes(table))

    return NextResponse.json({
      success: true,
      tables: foundTables,
      expectedTables,
      missingTables,
      extraTables,
      allTablesPresent: missingTables.length === 0,
      summary: {
        total: foundTables.length,
        expected: expectedTables.length,
        missing: missingTables.length,
        extra: extraTables.length,
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
