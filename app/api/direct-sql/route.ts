import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request) {
  try {
    // Get SQL from request body
    const { sql } = await request.json()

    if (!sql) {
      return NextResponse.json({ success: false, error: "No SQL provided" }, { status: 400 })
    }

    // Get environment variables directly
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
          },
        },
        { status: 500 },
      )
    }

    // Create a fresh Supabase client for this request
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // For SELECT queries that query system tables, handle them specially
    if (sql.trim().toLowerCase().includes("information_schema.tables")) {
      try {
        // Use pg_tables instead of information_schema.tables
        const modifiedSQL = sql
          .replace(/information_schema\.tables/gi, "pg_tables")
          .replace(/table_name/gi, "tablename")
          .replace(/table_schema = 'public'/gi, "schemaname = 'public'")

        const { data, error } = await supabase.rpc("exec_sql", { sql: modifiedSQL })

        if (error) {
          throw error
        }

        return NextResponse.json({
          success: true,
          message: "SQL executed successfully (modified to use pg_tables)",
          data: data,
          originalSQL: sql,
          modifiedSQL: modifiedSQL,
        })
      } catch (error: any) {
        // If that fails, try a direct approach
        try {
          const { data, error: pgError } = await supabase
            .from("pg_tables")
            .select("tablename")
            .eq("schemaname", "public")

          if (pgError) {
            throw pgError
          }

          return NextResponse.json({
            success: true,
            message: "Tables retrieved using direct pg_tables query",
            data: data.map((row) => ({ table_name: row.tablename })),
          })
        } catch (directError: any) {
          return NextResponse.json(
            {
              success: false,
              error: "Could not query system tables",
              details: directError,
              suggestion: "Try executing this SQL directly in Supabase SQL Editor",
            },
            { status: 500 },
          )
        }
      }
    }

    // For other SQL statements, try the normal approach
    try {
      const { data, error } = await supabase.rpc("exec_sql", { sql })

      if (error) {
        throw error
      }

      return NextResponse.json({
        success: true,
        message: "SQL executed successfully",
        data: data,
      })
    } catch (error: any) {
      console.error("SQL execution error:", error)
      return NextResponse.json(
        {
          success: false,
          error: error.message || "Failed to execute SQL",
          details: error,
          suggestion:
            "Try executing this SQL directly in your Supabase SQL Editor at: https://app.supabase.com/project/cfqnlejmlzpzrdzjkyrj/sql",
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
        suggestion: "Try executing this SQL directly in your Supabase SQL Editor",
      },
      { status: 500 },
    )
  }
}
