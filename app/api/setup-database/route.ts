import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase-admin"

export async function POST(request: Request) {
  try {
    const { action } = await request.json()

    const supabaseAdmin = createAdminClient()

    if (!supabaseAdmin) {
      return NextResponse.json({
        success: false,
        error: "Admin client not configured",
      })
    }

    // Check if we can execute SQL
    const { data: testData, error: testError } = await supabaseAdmin.rpc("exec_sql", {
      sql: "SELECT current_timestamp;",
    })

    if (testError) {
      // Check if the function doesn't exist
      if (testError.message.includes("function") && testError.message.includes("does not exist")) {
        return NextResponse.json({
          success: false,
          error: "The exec_sql function is not available in your Supabase instance",
          details: "You need to create this function in the SQL editor. Please contact support for assistance.",
        })
      }

      return NextResponse.json({
        success: false,
        error: testError.message,
        details: testError,
      })
    }

    // Create the exec_sql function if it doesn't exist
    if (action === "create_function") {
      const { error: createFnError } = await supabaseAdmin.rpc("exec_sql", {
        sql: `
          CREATE OR REPLACE FUNCTION exec_sql(sql text) RETURNS void AS $$
          BEGIN
            EXECUTE sql;
          END;
          $$ LANGUAGE plpgsql SECURITY DEFINER;
        `,
      })

      if (createFnError) {
        return NextResponse.json({
          success: false,
          error: createFnError.message,
          details: createFnError,
        })
      }

      return NextResponse.json({
        success: true,
        message: "SQL execution function created successfully",
      })
    }

    return NextResponse.json({
      success: true,
      message: "Database is ready for setup",
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
