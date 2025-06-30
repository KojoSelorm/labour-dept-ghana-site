import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase-admin"

export async function POST() {
  try {
    const supabaseAdmin = createAdminClient()

    if (!supabaseAdmin) {
      return NextResponse.json({
        success: false,
        error: "Admin client not configured",
      })
    }

    // Check if tables exist
    const { data: tables, error: tablesError } = await supabaseAdmin
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")
      .order("table_name")

    if (tablesError) {
      return NextResponse.json({
        success: false,
        error: tablesError.message,
        details: tablesError,
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

    // Check if we have sample data
    const dataChecks = []

    if (foundTables.includes("site_content")) {
      const { data: contentData, error: contentError } = await supabaseAdmin
        .from("site_content")
        .select("count(*)", { count: "exact" })

      dataChecks.push({
        table: "site_content",
        success: !contentError,
        count: contentData?.[0]?.count || 0,
        error: contentError?.message,
      })
    }

    if (foundTables.includes("blog_posts")) {
      const { data: blogData, error: blogError } = await supabaseAdmin
        .from("blog_posts")
        .select("count(*)", { count: "exact" })

      dataChecks.push({
        table: "blog_posts",
        success: !blogError,
        count: blogData?.[0]?.count || 0,
        error: blogError?.message,
      })
    }

    if (foundTables.includes("admin_users")) {
      const { data: adminData, error: adminError } = await supabaseAdmin
        .from("admin_users")
        .select("count(*)", { count: "exact" })

      dataChecks.push({
        table: "admin_users",
        success: !adminError,
        count: adminData?.[0]?.count || 0,
        error: adminError?.message,
      })
    }

    return NextResponse.json({
      success: true,
      tables: foundTables,
      missingTables,
      dataChecks,
      isComplete: missingTables.length === 0 && dataChecks.every((check) => check.success && check.count > 0),
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
