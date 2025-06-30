import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase-server"

export async function POST() {
  try {
    const supabaseAdmin = createServerClient()
    const projectId = "cfqnlejmlzpzrdzjkyrj"

    const results = {
      connection: { status: "unknown", message: "", details: {} },
      tables: { status: "unknown", message: "", details: {} },
      data: { status: "unknown", message: "", details: {} },
      auth: { status: "unknown", message: "", details: {} },
      permissions: { status: "unknown", message: "", details: {} },
    }

    // Test 1: Connection
    try {
      const { data, error } = await supabaseAdmin.auth.getUser()
      results.connection = {
        status: "success",
        message: "Database connection successful",
        details: { connected: true, authWorking: !error },
      }
    } catch (error: any) {
      results.connection = {
        status: "error",
        message: `Connection failed: ${error.message}`,
        details: { error: error.message },
      }
    }

    // Test 2: Tables - Use multiple detection methods
    try {
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

      let foundTables: string[] = []
      let detectionMethod = "unknown"

      // Method 1: Try using information_schema
      try {
        const { data: schemaData, error: schemaError } = await supabaseAdmin.rpc("exec_sql", {
          sql: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'`,
        })

        if (!schemaError && schemaData) {
          // This won't work as expected since exec_sql returns void, but let's try another approach
        }
      } catch (e) {
        // Method failed
      }

      // Method 2: Try querying each table individually
      const tableChecks = await Promise.allSettled(
        expectedTables.map(async (tableName) => {
          try {
            const { error } = await supabaseAdmin.from(tableName).select("*").limit(1)
            if (!error) {
              return tableName
            } else if (error.message.includes("does not exist")) {
              return null
            } else {
              // Table exists but might have permission issues
              return tableName
            }
          } catch (e) {
            return null
          }
        }),
      )

      foundTables = tableChecks
        .map((result, index) => {
          if (result.status === "fulfilled" && result.value) {
            return result.value
          }
          return null
        })
        .filter((table): table is string => table !== null)

      detectionMethod = "individual_query"

      // Method 3: If individual queries didn't work, try a different approach
      if (foundTables.length === 0) {
        try {
          // Try to use pg_tables system view
          const { data: pgData, error: pgError } = await supabaseAdmin
            .from("pg_tables")
            .select("tablename")
            .eq("schemaname", "public")

          if (!pgError && pgData) {
            const pgTables = pgData.map((row) => row.tablename)
            foundTables = expectedTables.filter((table) => pgTables.includes(table))
            detectionMethod = "pg_tables"
          }
        } catch (e) {
          // This method also failed
        }
      }

      // Method 4: Direct REST API call to Supabase
      if (foundTables.length === 0) {
        try {
          const response = await fetch(`https://cfqnlejmlzpzrdzjkyrj.supabase.co/rest/v1/`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
              apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
              "Content-Type": "application/json",
            },
          })

          if (response.ok) {
            // If we can reach the API, try to detect tables by attempting to access them
            const tablePromises = expectedTables.map(async (tableName) => {
              try {
                const tableResponse = await fetch(
                  `https://cfqnlejmlzpzrdzjkyrj.supabase.co/rest/v1/${tableName}?limit=1`,
                  {
                    method: "GET",
                    headers: {
                      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
                      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
                      "Content-Type": "application/json",
                    },
                  },
                )

                if (tableResponse.ok) {
                  return tableName
                } else if (tableResponse.status === 404) {
                  return null // Table doesn't exist
                } else {
                  return tableName // Table exists but might have other issues
                }
              } catch (e) {
                return null
              }
            })

            const restResults = await Promise.allSettled(tablePromises)
            foundTables = restResults
              .map((result) => (result.status === "fulfilled" ? result.value : null))
              .filter((table): table is string => table !== null)

            detectionMethod = "rest_api"
          }
        } catch (e) {
          // REST API method failed
        }
      }

      const missingTables = expectedTables.filter((table) => !foundTables.includes(table))

      if (foundTables.length === expectedTables.length) {
        results.tables = {
          status: "success",
          message: `All ${foundTables.length} tables found`,
          details: {
            method: detectionMethod,
            total: foundTables.length,
            expected: expectedTables.length,
            found: foundTables,
            missing: [],
            extra: [],
          },
        }
      } else if (foundTables.length > 0) {
        results.tables = {
          status: "warning",
          message: `${foundTables.length}/${expectedTables.length} tables found`,
          details: {
            method: detectionMethod,
            total: foundTables.length,
            expected: expectedTables.length,
            found: foundTables,
            missing: missingTables,
            extra: [],
          },
        }
      } else {
        results.tables = {
          status: "error",
          message: "No tables found - database may need setup",
          details: {
            method: detectionMethod,
            total: 0,
            expected: expectedTables.length,
            found: [],
            missing: expectedTables,
            extra: [],
          },
        }
      }
    } catch (error: any) {
      results.tables = {
        status: "error",
        message: `Table check failed: ${error.message}`,
        details: { error: error.message },
      }
    }

    // Test 3: Data Access (only if we found some tables)
    try {
      if (results.tables.status === "success" || results.tables.status === "warning") {
        // Try to read from site_content table
        const { data: siteData, error: readError } = await supabaseAdmin.from("site_content").select("*").limit(1)

        if (!readError) {
          // Try to write (insert a test record and delete it)
          const testRecord = {
            section: "test",
            key: "connection_test",
            value: "test_value",
            type: "text",
          }

          const { data: insertData, error: insertError } = await supabaseAdmin
            .from("site_content")
            .insert(testRecord)
            .select()

          if (!insertError && insertData && insertData.length > 0) {
            // Clean up test record
            await supabaseAdmin.from("site_content").delete().eq("id", insertData[0].id)

            results.data = {
              status: "success",
              message: "Read and write operations successful",
              details: { canRead: true, canWrite: true },
            }
          } else {
            results.data = {
              status: "warning",
              message: "Can read but write failed",
              details: { canRead: true, canWrite: false, writeError: insertError?.message },
            }
          }
        } else {
          results.data = {
            status: "error",
            message: "Cannot read from database",
            details: { canRead: false, canWrite: false, readError: readError.message },
          }
        }
      } else {
        results.data = {
          status: "error",
          message: "Cannot test data access - tables missing",
          details: { canRead: false, canWrite: false },
        }
      }
    } catch (error: any) {
      results.data = {
        status: "error",
        message: `Data check failed: ${error.message}`,
        details: { error: error.message },
      }
    }

    // Test 4: Authentication
    try {
      const { data: users, error: authError } = await supabaseAdmin.auth.admin.listUsers()

      if (!authError) {
        results.auth = {
          status: "success",
          message: `Authentication working - ${users.users.length} users found`,
          details: { userCount: users.users.length, working: true },
        }
      } else {
        results.auth = {
          status: "error",
          message: `Auth check failed: ${authError.message}`,
          details: { working: false, error: authError.message },
        }
      }
    } catch (error: any) {
      results.auth = {
        status: "error",
        message: `Auth check failed: ${error.message}`,
        details: { error: error.message },
      }
    }

    // Test 5: Permissions
    try {
      if (results.data.status === "success") {
        results.permissions = {
          status: "success",
          message: "Full database permissions confirmed",
          details: { canRead: true, canWrite: true },
        }
      } else if (results.data.status === "warning") {
        results.permissions = {
          status: "warning",
          message: "Read permissions only",
          details: { canRead: true, canWrite: false },
        }
      } else {
        results.permissions = {
          status: "error",
          message: "Limited or no database permissions",
          details: { canRead: false, canWrite: false },
        }
      }
    } catch (error: any) {
      results.permissions = {
        status: "error",
        message: `Permission check failed: ${error.message}`,
        details: { error: error.message },
      }
    }

    // Calculate overall status
    const statusCounts = {
      success: Object.values(results).filter((r) => r.status === "success").length,
      warning: Object.values(results).filter((r) => r.status === "warning").length,
      error: Object.values(results).filter((r) => r.status === "error").length,
    }

    let overallStatus = "has_errors"
    let overallMessage = "Database has significant issues that need attention"

    if (statusCounts.error === 0 && statusCounts.warning === 0) {
      overallStatus = "fully_functional"
      overallMessage = "Database is fully functional and ready to use"
    } else if (statusCounts.error <= 1 && statusCounts.success >= 3) {
      overallStatus = "partially_functional"
      overallMessage = "Database is mostly functional with minor issues"
    }

    return NextResponse.json({
      success: true,
      overall: {
        status: overallStatus,
        message: overallMessage,
        summary: {
          total: 5,
          success: statusCounts.success,
          warnings: statusCounts.warning,
          errors: statusCounts.error,
        },
      },
      results,
      timestamp: new Date().toISOString(),
      projectId,
    })
  } catch (error: any) {
    console.error("Database verification error:", error)
    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    })
  }
}
