import { NextResponse } from "next/server"
import { supabase, supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"

export async function POST() {
  try {
    const results = {
      timestamp: new Date().toISOString(),
      projectRef: "cfqnlejmlzpzrdzjkyrj",
      environment: {
        configured: isSupabaseConfigured,
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
      clientConnection: { success: false, error: null, details: null },
      adminConnection: { success: false, error: null, details: null },
      database: {
        tablesFound: 0,
        expectedTables: [],
        missingTables: [],
        tableDetails: {},
        success: false,
      },
      authentication: { success: false, userCount: 0, error: null },
      permissions: { canRead: false, canWrite: false, canAdmin: false },
    }

    // Test 1: Client Connection
    try {
      if (supabase) {
        const { data, error } = await supabase.auth.getSession()
        results.clientConnection = {
          success: true,
          error: null,
          details: { hasSession: !!data.session, sessionError: error?.message },
        }
      } else {
        results.clientConnection = {
          success: false,
          error: "Client not initialized",
          details: null,
        }
      }
    } catch (error: any) {
      results.clientConnection = {
        success: false,
        error: error.message,
        details: error,
      }
    }

    // Test 2: Admin Connection
    try {
      if (supabaseAdmin) {
        const { data, error } = await supabaseAdmin
          .from("information_schema.tables")
          .select("table_name")
          .eq("table_schema", "public")
          .limit(5)

        if (error) {
          results.adminConnection = {
            success: false,
            error: error.message,
            details: error,
          }
        } else {
          results.adminConnection = {
            success: true,
            error: null,
            details: { tablesAccessible: data?.length || 0 },
          }
          results.permissions.canRead = true
          results.permissions.canAdmin = true
        }
      } else {
        results.adminConnection = {
          success: false,
          error: "Admin client not configured",
          details: null,
        }
      }
    } catch (error: any) {
      results.adminConnection = {
        success: false,
        error: error.message,
        details: error,
      }
    }

    // Test 3: Database Tables
    if (supabaseAdmin && results.adminConnection.success) {
      try {
        const { data: tables, error } = await supabaseAdmin
          .from("information_schema.tables")
          .select("table_name")
          .eq("table_schema", "public")
          .order("table_name")

        const expectedTables = [
          "blog_posts",
          "site_content",
          "testimonials",
          "documents",
          "complaints",
          "contact_messages",
          "admin_users",
          "analytics_events",
          "page_views",
          "search_logs",
          "newsletter_subscribers",
        ]

        if (error) {
          results.database.success = false
        } else {
          const foundTables = tables?.map((t) => t.table_name) || []
          const missingTables = expectedTables.filter((table) => !foundTables.includes(table))

          results.database = {
            tablesFound: foundTables.length,
            expectedTables,
            missingTables,
            tableDetails: {},
            success: missingTables.length === 0,
          }

          // Get row counts for existing tables
          for (const table of foundTables.slice(0, 5)) {
            // Limit to first 5 tables
            try {
              const { count } = await supabaseAdmin.from(table).select("*", { count: "exact", head: true })

              results.database.tableDetails[table] = { rows: count || 0, accessible: true }
            } catch (err: any) {
              results.database.tableDetails[table] = { rows: -1, accessible: false, error: err.message }
            }
          }
        }
      } catch (error: any) {
        results.database.success = false
      }
    }

    // Test 4: Authentication System
    if (supabaseAdmin && results.adminConnection.success) {
      try {
        const { data: users, error } = await supabaseAdmin.auth.admin.listUsers()

        if (error) {
          results.authentication = {
            success: false,
            userCount: 0,
            error: error.message,
          }
        } else {
          results.authentication = {
            success: true,
            userCount: users.users.length,
            error: null,
          }
        }
      } catch (error: any) {
        results.authentication = {
          success: false,
          userCount: 0,
          error: error.message,
        }
      }
    }

    // Test 5: Write Permissions
    if (supabaseAdmin && results.adminConnection.success) {
      try {
        // Try to insert a test record (we'll delete it immediately)
        const testData = {
          title: "Connection Test",
          content: "This is a test entry created during connection verification",
          created_at: new Date().toISOString(),
        }

        const { error: insertError } = await supabaseAdmin.from("site_content").insert(testData)

        if (!insertError) {
          results.permissions.canWrite = true

          // Clean up test data
          await supabaseAdmin.from("site_content").delete().eq("title", "Connection Test")
        }
      } catch (error) {
        // Write test failed, but that's okay
        results.permissions.canWrite = false
      }
    }

    // Overall success determination
    const overallSuccess =
      results.environment.configured &&
      results.clientConnection.success &&
      results.adminConnection.success &&
      results.database.success &&
      results.authentication.success

    return NextResponse.json({
      success: overallSuccess,
      message: overallSuccess
        ? "All connections and configurations are working perfectly!"
        : "Some issues detected in the configuration",
      results,
      summary: {
        environment: results.environment.configured ? "✅ Configured" : "❌ Missing vars",
        client: results.clientConnection.success ? "✅ Connected" : "❌ Failed",
        admin: results.adminConnection.success ? "✅ Connected" : "❌ Failed",
        database: results.database.success
          ? `✅ ${results.database.tablesFound} tables`
          : `⚠️ Missing ${results.database.missingTables.length} tables`,
        auth: results.authentication.success ? `✅ ${results.authentication.userCount} users` : "❌ Auth failed",
        permissions: `Read: ${results.permissions.canRead ? "✅" : "❌"}, Write: ${results.permissions.canWrite ? "✅" : "❌"}, Admin: ${results.permissions.canAdmin ? "✅" : "❌"}`,
      },
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: "Comprehensive test failed",
      error: error.message,
      results: null,
    })
  }
}
