import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST() {
  try {
    // Get environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing environment variables",
          details: {
            hasUrl: !!supabaseUrl,
            hasServiceKey: !!supabaseServiceKey,
            urlLength: supabaseUrl?.length || 0,
            serviceKeyLength: supabaseServiceKey?.length || 0,
          },
        },
        { status: 400 },
      )
    }

    // Create admin client
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Test 1: Basic connection test
    let connectionTest = false
    let connectionError = null

    try {
      // Try a simple RPC call first
      const { data, error } = await supabase.rpc("exec_sql", {
        sql: "SELECT 1 as test",
      })

      if (!error) {
        connectionTest = true
      } else {
        connectionError = error.message
        // Try alternative connection test
        const { data: altData, error: altError } = await supabase.from("pg_tables").select("tablename").limit(1)

        if (!altError) {
          connectionTest = true
          connectionError = null
        }
      }
    } catch (err: any) {
      connectionError = err.message
      connectionTest = false
    }

    if (!connectionTest) {
      return NextResponse.json(
        {
          success: false,
          error: "Database connection test failed",
          details: {
            message: connectionError || "Unable to execute basic queries on the database",
            suggestion: "Check if your service role key has proper permissions",
          },
        },
        { status: 500 },
      )
    }

    // Test 2: Check for existing tables using direct access
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

    let tablesFound = []
    let queryMethod = "direct_table_access"

    try {
      const tableChecks = await Promise.allSettled(
        expectedTables.map(async (tableName) => {
          try {
            const { error } = await supabase.from(tableName).select("id").limit(1)
            return error ? null : tableName
          } catch {
            return null
          }
        }),
      )

      tablesFound = tableChecks
        .map((result) => (result.status === "fulfilled" ? result.value : null))
        .filter((table): table is string => table !== null)
    } catch (err) {
      console.log("Direct table access failed:", err)
      queryMethod = "failed"
    }

    // Test 3: Check if exec_sql function exists
    let hasExecFunction = false
    try {
      const { data: funcData, error: funcError } = await supabase.rpc("exec_sql", {
        sql: "SELECT 'function_exists' as result",
      })
      hasExecFunction = !funcError
    } catch {
      hasExecFunction = false
    }

    return NextResponse.json({
      success: true,
      connection: {
        status: "connected",
        method: "service_role",
        hasExecFunction,
      },
      tables: {
        found: tablesFound.length,
        method: queryMethod,
        list: tablesFound,
        expected: expectedTables.length,
        missing: expectedTables.filter((table) => !tablesFound.includes(table)),
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Database test error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: {
          type: error.constructor.name,
          message: "Database test failed",
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return POST()
}
