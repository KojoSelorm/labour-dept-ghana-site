import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ success: false, error: "Missing environment variables" }, { status: 400 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Create the exec_sql function using direct SQL
    const createFunctionSQL = `
      CREATE OR REPLACE FUNCTION exec_sql(sql text) 
      RETURNS text AS $$
      DECLARE
        result text;
      BEGIN
        EXECUTE sql;
        result := 'SUCCESS: SQL executed successfully';
        RETURN result;
      EXCEPTION
        WHEN OTHERS THEN
          result := 'ERROR: ' || SQLERRM;
          RETURN result;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `

    // Try to execute the function creation
    const { data, error } = await supabase.rpc("sql", { query: createFunctionSQL })

    if (error) {
      // If rpc('sql') doesn't work, try alternative method
      throw new Error(`Function creation failed: ${error.message}`)
    }

    // Test the function
    const { data: testData, error: testError } = await supabase.rpc("exec_sql", {
      sql: "SELECT 'Function test successful' as message",
    })

    return NextResponse.json({
      success: true,
      message: "exec_sql function created successfully",
      test: {
        success: !testError,
        result: testData,
        error: testError?.message,
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        suggestion: "Try creating the function manually in Supabase SQL Editor",
      },
      { status: 500 },
    )
  }
}
