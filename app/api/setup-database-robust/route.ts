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
            message: "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required",
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

    // Step 1: Test connection
    let connectionTest = false
    try {
      const { data, error } = await supabase.rpc("exec_sql", {
        sql: "SELECT 1 as test",
      })
      connectionTest = !error
    } catch (err) {
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed",
          details: {
            message: "Cannot connect to database. Check your environment variables.",
          },
        },
        { status: 500 },
      )
    }

    if (!connectionTest) {
      return NextResponse.json(
        {
          success: false,
          error: "Database connection test failed",
          details: {
            message: "exec_sql function is not available or database is not accessible",
          },
        },
        { status: 500 },
      )
    }

    // Step 2: Create tables using exec_sql
    const createTablesSQL = `
-- Create all tables
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

CREATE TABLE IF NOT EXISTS testimonials (
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
);

CREATE TABLE IF NOT EXISTS complaints (
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
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  category VARCHAR(50) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size INTEGER,
  content_text TEXT,
  processed BOOLEAN DEFAULT FALSE,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active',
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS page_views (
  id SERIAL PRIMARY KEY,
  page_path VARCHAR(255) NOT NULL,
  user_ip VARCHAR(45),
  user_agent TEXT,
  referrer VARCHAR(500),
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS search_logs (
  id SERIAL PRIMARY KEY,
  query VARCHAR(255) NOT NULL,
  results_count INTEGER DEFAULT 0,
  user_ip VARCHAR(45),
  searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_events (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  event_data JSONB,
  user_agent TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`

    try {
      const { data: createResult, error: createError } = await supabase.rpc("exec_sql", {
        sql: createTablesSQL,
      })

      if (createError) {
        return NextResponse.json(
          {
            success: false,
            error: "Table creation failed",
            details: {
              message: createError.message,
              code: createError.code,
            },
          },
          { status: 500 },
        )
      }
    } catch (err: any) {
      return NextResponse.json(
        {
          success: false,
          error: "Table creation failed",
          details: {
            message: err.message,
          },
        },
        { status: 500 },
      )
    }

    // Step 3: Insert sample data
    const seedDataSQL = `
INSERT INTO site_content (section, key, value, type) VALUES
('home', 'hero_title', 'Ghana Labour Department', 'text'),
('home', 'hero_subtitle', 'Protecting Workers Rights and Promoting Fair Employment', 'text'),
('contact', 'address', '123 Independence Avenue, Accra, Ghana', 'text'),
('contact', 'phone', '+233 30 2123456', 'text'),
('contact', 'email', 'info@labour.gov.gh', 'text')
ON CONFLICT (section, key) DO NOTHING;

INSERT INTO admin_users (username, email, password_hash, role) VALUES
('admin', 'admin@labour.gov.gh', '$2b$10$rMb4Ygf9LsJxGI0OFRSWXOQJJlx1uVELUPKL5LXP1lGPi0z9WwQdO', 'admin')
ON CONFLICT (email) DO NOTHING;
`

    try {
      const { data: seedResult, error: seedError } = await supabase.rpc("exec_sql", {
        sql: seedDataSQL,
      })

      if (seedError) {
        console.warn("Seed data insertion failed:", seedError.message)
      }
    } catch (err) {
      console.warn("Seed data insertion failed:", err)
    }

    // Step 4: Verify setup
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

    let tablesFound = 0
    try {
      const tableChecks = await Promise.allSettled(
        expectedTables.map(async (tableName) => {
          try {
            const { error } = await supabase.from(tableName).select("id").limit(1)
            return !error
          } catch {
            return false
          }
        }),
      )

      tablesFound = tableChecks.filter((result) => result.status === "fulfilled" && result.value === true).length
    } catch (err) {
      console.warn("Table verification failed:", err)
    }

    return NextResponse.json({
      success: true,
      message: `Database setup completed successfully! ${tablesFound}/${expectedTables.length} tables created.`,
      details: {
        tablesCreated: tablesFound,
        expectedTables: expectedTables.length,
        verification: {
          tablesFound,
          allTablesCreated: tablesFound === expectedTables.length,
        },
      },
    })
  } catch (error: any) {
    console.error("Database setup error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: {
          type: error.constructor.name,
          message: "Database setup failed",
        },
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: "Method not allowed",
      message: "Use POST method for database setup",
    },
    { status: 405 },
  )
}
