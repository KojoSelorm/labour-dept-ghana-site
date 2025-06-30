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

    // Step 1: Test the exec_sql function first
    const { data: testResult, error: testError } = await supabase.rpc("exec_sql", {
      sql: "SELECT 'Function test successful' as test_message",
    })

    if (testError) {
      return NextResponse.json({
        success: false,
        error: `exec_sql function test failed: ${testError.message}`,
        suggestion: "The exec_sql function may not be working properly",
      })
    }

    // Step 2: Create tables one by one for better error tracking
    const tables = [
      {
        name: "site_content",
        sql: `CREATE TABLE IF NOT EXISTS site_content (
          id SERIAL PRIMARY KEY,
          section VARCHAR(50) NOT NULL,
          key VARCHAR(100) NOT NULL,
          value TEXT NOT NULL,
          type VARCHAR(20) DEFAULT 'text',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(section, key)
        );`,
      },
      {
        name: "admin_users",
        sql: `CREATE TABLE IF NOT EXISTS admin_users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          role VARCHAR(20) DEFAULT 'admin',
          active BOOLEAN DEFAULT TRUE,
          last_login TIMESTAMP WITH TIME ZONE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );`,
      },
      {
        name: "blog_posts",
        sql: `CREATE TABLE IF NOT EXISTS blog_posts (
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
        );`,
      },
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

    const results = []

    // Create each table individually
    for (const table of tables) {
      try {
        const { data, error } = await supabase.rpc("exec_sql", { sql: table.sql })
        results.push({
          table: table.name,
          success: !error,
          result: data,
          error: error?.message,
        })
      } catch (err: any) {
        results.push({
          table: table.name,
          success: false,
          error: err.message,
        })
      }
    }

    // Step 3: Insert sample data
    const sampleDataQueries = [
      {
        name: "site_content_data",
        sql: `INSERT INTO site_content (section, key, value, type) VALUES
          ('home', 'hero_title', 'Ghana Labour Department', 'text'),
          ('home', 'hero_subtitle', 'Protecting Workers Rights and Promoting Fair Employment', 'text'),
          ('home', 'hero_description', 'We ensure fair labor practices, protect worker rights, and promote safe working conditions across Ghana.', 'text'),
          ('contact', 'address', '123 Independence Avenue, Accra, Ghana', 'text'),
          ('contact', 'phone', '+233 30 2123456', 'text'),
          ('contact', 'email', 'info@labour.gov.gh', 'text')
          ON CONFLICT (section, key) DO NOTHING;`,
      },
      {
        name: "admin_user_data",
        sql: `INSERT INTO admin_users (username, email, password_hash, role) VALUES
          ('admin', 'admin@labour.gov.gh', '$2b$10$rMb4Ygf9LsJxGI0OFRSWXOQJJlx1uVELUPKL5LXP1lGPi0z9WwQdO', 'admin')
          ON CONFLICT (email) DO NOTHING;`,
      },
      {
        name: "blog_posts_data",
        sql: `INSERT INTO blog_posts (title, excerpt, content, author, category, featured) VALUES
          ('New Labour Law Amendments 2024', 'Important updates to Ghana''s labour laws affecting all workers and employers.', 'The Ghana Labour Department announces significant amendments to the Labour Act...', 'Labour Department', 'Legal Updates', true),
          ('Workplace Safety Guidelines', 'Essential safety measures every workplace must implement.', 'Ensuring workplace safety is a shared responsibility between employers and employees...', 'Safety Division', 'Safety', true)
          ON CONFLICT DO NOTHING;`,
      },
    ]

    const dataResults = []
    for (const query of sampleDataQueries) {
      try {
        const { data, error } = await supabase.rpc("exec_sql", { sql: query.sql })
        dataResults.push({
          query: query.name,
          success: !error,
          result: data,
          error: error?.message,
        })
      } catch (err: any) {
        dataResults.push({
          query: query.name,
          success: false,
          error: err.message,
        })
      }
    }

    // Step 4: Verify tables exist
    const { data: verifyData, error: verifyError } = await supabase.rpc("exec_sql", {
      sql: "SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;",
    })

    const successfulTables = results.filter((r) => r.success).length
    const totalTables = tables.length

    return NextResponse.json({
      success: successfulTables === totalTables,
      message: `Created ${successfulTables}/${totalTables} tables successfully`,
      testResult,
      tableResults: results,
      dataResults,
      verification: verifyData,
      summary: {
        tablesCreated: successfulTables,
        totalTables,
        allSuccess: successfulTables === totalTables,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Table creation error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
