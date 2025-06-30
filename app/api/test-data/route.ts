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

    const results = {
      authTest: "Not tested",
      tableData: {} as Record<string, any>,
      errors: {} as Record<string, string>,
      totalRecords: 0,
    }

    // Test authentication system
    try {
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.listUsers()

      if (authError) {
        results.authTest = `Error: ${authError.message}`
      } else {
        results.authTest = `Working (${authData.users.length} users)`
      }
    } catch (error: any) {
      results.authTest = `Failed: ${error.message}`
    }

    // Test data access for key tables
    const testTables = ["site_content", "blog_posts", "testimonials", "complaints", "contact_messages"]

    for (const table of testTables) {
      try {
        const { count, error } = await supabaseAdmin.from(table).select("*", { count: "exact", head: true })

        if (error) {
          results.errors[table] = error.message
          results.tableData[table] = { count: -1, accessible: false }
        } else {
          results.tableData[table] = { count: count || 0, accessible: true }
          results.totalRecords += count || 0
        }
      } catch (error: any) {
        results.errors[table] = error.message
        results.tableData[table] = { count: -1, accessible: false }
      }
    }

    const errorCount = Object.keys(results.errors).length
    const successCount = testTables.length - errorCount

    return NextResponse.json({
      success: errorCount === 0,
      message: `${successCount}/${testTables.length} tables accessible`,
      authTest: results.authTest,
      tableData: results.tableData,
      errors: results.errors,
      totalRecords: results.totalRecords,
      summary: {
        tablesChecked: testTables.length,
        accessible: successCount,
        errors: errorCount,
        totalRecords: results.totalRecords,
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
