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

    // Expected tables
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

    // Method 1: Try individual table checks (most reliable)
    console.log("Testing individual table access...")
    const tableResults = await Promise.allSettled(
      expectedTables.map(async (tableName) => {
        try {
          // Try to select from each table
          const { data, error } = await supabase.from(tableName).select("*").limit(1)

          if (error) {
            console.log(`Table ${tableName}: ERROR - ${error.message}`)
            return { table: tableName, exists: false, error: error.message }
          } else {
            console.log(`Table ${tableName}: SUCCESS - ${data?.length || 0} rows`)
            return { table: tableName, exists: true, rowCount: data?.length || 0 }
          }
        } catch (err: any) {
          console.log(`Table ${tableName}: EXCEPTION - ${err.message}`)
          return { table: tableName, exists: false, error: err.message }
        }
      }),
    )

    const foundTables = tableResults
      .map((result) => (result.status === "fulfilled" ? result.value : null))
      .filter((result): result is NonNullable<typeof result> => result !== null)

    const existingTables = foundTables.filter((t) => t.exists)
    const missingTables = foundTables.filter((t) => !t.exists)

    // Method 2: Try exec_sql function as backup
    let execSqlResults = null
    try {
      const { data: execData, error: execError } = await supabase.rpc("exec_sql", {
        sql: "SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename",
      })

      if (!execError) {
        execSqlResults = {
          success: true,
          data: execData,
          message: "exec_sql function works",
        }
      } else {
        execSqlResults = {
          success: false,
          error: execError.message,
          message: "exec_sql function failed",
        }
      }
    } catch (err: any) {
      execSqlResults = {
        success: false,
        error: err.message,
        message: "exec_sql function not available",
      }
    }

    // Method 3: Try information_schema (corrected)
    let schemaResults = null
    try {
      // Use exec_sql to query information_schema properly
      const { data: schemaData, error: schemaError } = await supabase.rpc("exec_sql", {
        sql: "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name",
      })

      if (!schemaError) {
        schemaResults = {
          success: true,
          data: schemaData,
          message: "information_schema accessible via exec_sql",
        }
      } else {
        schemaResults = {
          success: false,
          error: schemaError.message,
          message: "information_schema not accessible",
        }
      }
    } catch (err: any) {
      schemaResults = {
        success: false,
        error: err.message,
        message: "information_schema query failed",
      }
    }

    return NextResponse.json({
      success: true,
      verification: {
        method: "comprehensive_check",
        timestamp: new Date().toISOString(),
        summary: {
          expected: expectedTables.length,
          found: existingTables.length,
          missing: missingTables.length,
          foundPercentage: Math.round((existingTables.length / expectedTables.length) * 100),
        },
        tables: {
          existing: existingTables,
          missing: missingTables,
          all: foundTables,
        },
        methods: {
          individualCheck: {
            success: true,
            tablesFound: existingTables.length,
            details: foundTables,
          },
          execSql: execSqlResults,
          informationSchema: schemaResults,
        },
      },
    })
  } catch (error: any) {
    console.error("Table verification error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: {
          type: error.constructor.name,
          stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
