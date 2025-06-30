import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase-server"

export async function GET() {
  try {
    console.log("🔍 Starting Supabase verification...")

    // Test 1: Environment Variables
    const envCheck = {
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      projectId: process.env.NEXT_PUBLIC_SUPABASE_URL?.split("//")[1]?.split(".")[0] || "unknown",
    }

    if (!envCheck.hasUrl || !envCheck.hasAnonKey || !envCheck.hasServiceKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing environment variables",
          details: envCheck,
        },
        { status: 400 },
      )
    }

    // Test 2: Create Supabase Client
    const supabase = createServerClient()
    console.log("✅ Supabase client created")

    // Test 3: Test Basic Connection
    const { data: connectionTest, error: connectionError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .limit(1)

    if (connectionError) {
      console.log("❌ Connection test failed:", connectionError)
      return NextResponse.json(
        {
          success: false,
          error: "Connection failed",
          details: connectionError,
        },
        { status: 500 },
      )
    }

    console.log("✅ Basic connection successful")

    // Test 4: Check Existing Tables
    const tableQueries = [
      "complaints",
      "contact_messages",
      "newsletter_subscribers",
      "blog_posts",
      "testimonials",
      "documents",
      "admin_users",
      "analytics_events",
      "page_views",
      "search_logs",
      "site_content",
    ]

    const tableResults = []

    for (const tableName of tableQueries) {
      try {
        const { data, error } = await supabase.from(tableName).select("*").limit(1)

        if (error) {
          tableResults.push({
            table: tableName,
            exists: false,
            error: error.message,
            code: error.code,
          })
        } else {
          tableResults.push({
            table: tableName,
            exists: true,
            hasData: data && data.length > 0,
            recordCount: data?.length || 0,
          })
        }
      } catch (err: any) {
        tableResults.push({
          table: tableName,
          exists: false,
          error: err.message,
        })
      }
    }

    const existingTables = tableResults.filter((t) => t.exists)
    const missingTables = tableResults.filter((t) => !t.exists)

    // Test 5: Test Write Permission (if complaints table exists)
    let writeTest = null
    const complaintsTable = existingTables.find((t) => t.table === "complaints")

    if (complaintsTable) {
      try {
        const testComplaint = {
          complaint_type: "test",
          description: "Connection test - please ignore",
          status: "test",
          priority: "low",
          reference_number: `TEST-${Date.now()}`,
        }

        const { data: insertData, error: insertError } = await supabase
          .from("complaints")
          .insert([testComplaint])
          .select()

        if (insertError) {
          writeTest = {
            success: false,
            error: insertError.message,
          }
        } else {
          // Clean up test record
          if (insertData && insertData[0]) {
            await supabase.from("complaints").delete().eq("id", insertData[0].id)
          }

          writeTest = {
            success: true,
            message: "Write permissions working",
          }
        }
      } catch (err: any) {
        writeTest = {
          success: false,
          error: err.message,
        }
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      environment: envCheck,
      connection: {
        status: "connected",
        projectId: envCheck.projectId,
      },
      tables: {
        total: tableQueries.length,
        existing: existingTables.length,
        missing: missingTables.length,
        existingTables: existingTables.map((t) => ({
          name: t.table,
          hasData: t.hasData,
          recordCount: t.recordCount,
        })),
        missingTables: missingTables.map((t) => t.table),
      },
      writeTest,
      recommendations:
        missingTables.length > 0
          ? [`${missingTables.length} tables need to be created`, "Run table creation scripts to complete setup"]
          : ["All tables exist and are accessible", "Database is ready for use"],
    })
  } catch (error: any) {
    console.error("❌ Supabase verification failed:", error)
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
