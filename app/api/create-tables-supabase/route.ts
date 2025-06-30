import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase-server"

export async function POST() {
  try {
    const supabaseAdmin = createServerClient()

    // First, let's create the exec_sql function
    const createFunctionSQL = `
CREATE OR REPLACE FUNCTION exec_sql(sql text) 
RETURNS void AS $$
BEGIN
  EXECUTE sql;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
`

    // Try to create the function using direct SQL execution
    try {
      const functionResponse = await fetch(`https://cfqnlejmlzpzrdzjkyrj.supabase.co/rest/v1/rpc/exec_sql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        },
        body: JSON.stringify({ sql: createFunctionSQL }),
      })

      if (!functionResponse.ok) {
        // If that fails, try using the SQL editor endpoint
        const sqlEditorResponse = await fetch(`https://cfqnlejmlzpzrdzjkyrj.supabase.co/sql`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          },
          body: JSON.stringify({ query: createFunctionSQL }),
        })

        if (!sqlEditorResponse.ok) {
          console.log("Could not create exec_sql function, proceeding with alternative method")
        }
      }
    } catch (e) {
      console.log("Function creation failed, using alternative approach")
    }

    // Now create tables using Supabase client methods
    const results = []

    // Create site_content table
    try {
      const { error } = await supabaseAdmin.from("site_content").select("id").limit(1)
      if (error && error.message.includes("does not exist")) {
        // Table doesn't exist, we need to create it
        // Since we can't create tables directly via the client, let's use a different approach
        const createTableSQL = `
CREATE TABLE IF NOT EXISTS site_content (
  id SERIAL PRIMARY KEY,
  section VARCHAR(50) NOT NULL,
  key VARCHAR(100) NOT NULL,
  value TEXT NOT NULL,
  type VARCHAR(20) DEFAULT 'text',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(section, key)
);
`

        // Try using the exec_sql function we just created
        const { error: createError } = await supabaseAdmin.rpc("exec_sql", { sql: createTableSQL })

        if (createError) {
          throw new Error(`Failed to create site_content table: ${createError.message}`)
        }

        results.push({ table: "site_content", success: true, message: "Created successfully" })
      } else {
        results.push({ table: "site_content", success: true, message: "Already exists" })
      }
    } catch (error: any) {
      results.push({ table: "site_content", success: false, error: error.message })
    }

    // Create admin_users table
    try {
      const { error } = await supabaseAdmin.from("admin_users").select("id").limit(1)
      if (error && error.message.includes("does not exist")) {
        const createTableSQL = `
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`

        const { error: createError } = await supabaseAdmin.rpc("exec_sql", { sql: createTableSQL })

        if (createError) {
          throw new Error(`Failed to create admin_users table: ${createError.message}`)
        }

        results.push({ table: "admin_users", success: true, message: "Created successfully" })
      } else {
        results.push({ table: "admin_users", success: true, message: "Already exists" })
      }
    } catch (error: any) {
      results.push({ table: "admin_users", success: false, error: error.message })
    }

    // Create blog_posts table
    try {
      const { error } = await supabaseAdmin.from("blog_posts").select("id").limit(1)
      if (error && error.message.includes("does not exist")) {
        const createTableSQL = `
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  image_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`

        const { error: createError } = await supabaseAdmin.rpc("exec_sql", { sql: createTableSQL })

        if (createError) {
          throw new Error(`Failed to create blog_posts table: ${createError.message}`)
        }

        results.push({ table: "blog_posts", success: true, message: "Created successfully" })
      } else {
        results.push({ table: "blog_posts", success: true, message: "Already exists" })
      }
    } catch (error: any) {
      results.push({ table: "blog_posts", success: false, error: error.message })
    }

    // Continue with other tables...
    const remainingTables = [
      {
        name: "testimonials",
        sql: `CREATE TABLE IF NOT EXISTS testimonials (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          position VARCHAR(100),
          company VARCHAR(100),
          content TEXT NOT NULL,
          avatar_url VARCHAR(500),
          rating INTEGER DEFAULT 5,
          featured BOOLEAN DEFAULT FALSE,
          approved BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );`,
      },
      {
        name: "complaints",
        sql: `CREATE TABLE IF NOT EXISTS complaints (
          id SERIAL PRIMARY KEY,
          complainant_name VARCHAR(100) NOT NULL,
          complainant_email VARCHAR(100),
          complainant_phone VARCHAR(20),
          company_name VARCHAR(100),
          complaint_type VARCHAR(50) NOT NULL,
          description TEXT NOT NULL,
          status VARCHAR(20) DEFAULT 'pending',
          priority VARCHAR(10) DEFAULT 'medium',
          assigned_to VARCHAR(100),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );`,
      },
      {
        name: "contact_messages",
        sql: `CREATE TABLE IF NOT EXISTS contact_messages (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL,
          phone VARCHAR(20),
          category VARCHAR(50) NOT NULL,
          subject VARCHAR(200) NOT NULL,
          message TEXT NOT NULL,
          status VARCHAR(20) DEFAULT 'unread',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );`,
      },
      {
        name: "documents",
        sql: `CREATE TABLE IF NOT EXISTS documents (
          id SERIAL PRIMARY KEY,
          filename VARCHAR(255) NOT NULL,
          file_path VARCHAR(500) NOT NULL,
          file_size INTEGER,
          content_text TEXT,
          processed BOOLEAN DEFAULT FALSE,
          uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );`,
      },
      {
        name: "newsletter_subscribers",
        sql: `CREATE TABLE IF NOT EXISTS newsletter_subscribers (
          id SERIAL PRIMARY KEY,
          email VARCHAR(100) UNIQUE NOT NULL,
          name VARCHAR(100),
          status VARCHAR(20) DEFAULT 'active',
          subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          unsubscribed_at TIMESTAMP WITH TIME ZONE
        );`,
      },
      {
        name: "page_views",
        sql: `CREATE TABLE IF NOT EXISTS page_views (
          id SERIAL PRIMARY KEY,
          page_path VARCHAR(255) NOT NULL,
          user_ip VARCHAR(45),
          user_agent TEXT,
          referrer VARCHAR(500),
          viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );`,
      },
      {
        name: "search_logs",
        sql: `CREATE TABLE IF NOT EXISTS search_logs (
          id SERIAL PRIMARY KEY,
          query VARCHAR(255) NOT NULL,
          results_count INTEGER DEFAULT 0,
          user_ip VARCHAR(45),
          searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );`,
      },
      {
        name: "analytics_events",
        sql: `CREATE TABLE IF NOT EXISTS analytics_events (
          id SERIAL PRIMARY KEY,
          event_type VARCHAR(50) NOT NULL,
          event_data JSONB,
          user_agent TEXT,
          ip_address VARCHAR(45),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );`,
      },
    ]

    for (const table of remainingTables) {
      try {
        const { error } = await supabaseAdmin.from(table.name).select("id").limit(1)
        if (error && error.message.includes("does not exist")) {
          const { error: createError } = await supabaseAdmin.rpc("exec_sql", { sql: table.sql })

          if (createError) {
            throw new Error(`Failed to create ${table.name} table: ${createError.message}`)
          }

          results.push({ table: table.name, success: true, message: "Created successfully" })
        } else {
          results.push({ table: table.name, success: true, message: "Already exists" })
        }
      } catch (error: any) {
        results.push({ table: table.name, success: false, error: error.message })
      }
    }

    const successCount = results.filter((r) => r.success).length
    const totalCount = results.length

    return NextResponse.json({
      success: successCount > 0,
      message: `${successCount}/${totalCount} tables processed successfully`,
      results,
      details: {
        totalTables: totalCount,
        successful: successCount,
        failed: totalCount - successCount,
      },
    })
  } catch (error: any) {
    console.error("Table creation error:", error)
    return NextResponse.json({
      success: false,
      error: error.message,
      details: error,
    })
  }
}
