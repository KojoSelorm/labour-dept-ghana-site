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

    // Try direct SQL execution without using exec_sql function
    const createTableSQL = `
      -- Create site_content table
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

      -- Create admin_users table
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

      -- Create blog_posts table
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

      -- Create testimonials table
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

      -- Create complaints table
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

      -- Create contact_messages table
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

      -- Create documents table
      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        file_size INTEGER,
        content_text TEXT,
        processed BOOLEAN DEFAULT FALSE,
        uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Create newsletter_subscribers table
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        name VARCHAR(100),
        status VARCHAR(20) DEFAULT 'active',
        subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        unsubscribed_at TIMESTAMP WITH TIME ZONE
      );

      -- Create page_views table
      CREATE TABLE IF NOT EXISTS page_views (
        id SERIAL PRIMARY KEY,
        page_path VARCHAR(255) NOT NULL,
        user_ip VARCHAR(45),
        user_agent TEXT,
        referrer VARCHAR(500),
        viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Create search_logs table
      CREATE TABLE IF NOT EXISTS search_logs (
        id SERIAL PRIMARY KEY,
        query VARCHAR(255) NOT NULL,
        results_count INTEGER DEFAULT 0,
        user_ip VARCHAR(45),
        searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Create analytics_events table
      CREATE TABLE IF NOT EXISTS analytics_events (
        id SERIAL PRIMARY KEY,
        event_type VARCHAR(50) NOT NULL,
        event_data JSONB,
        user_agent TEXT,
        ip_address VARCHAR(45),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `

    // Execute the SQL directly using Supabase's SQL execution
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabaseServiceKey}`,
        apikey: supabaseServiceKey,
      },
      body: JSON.stringify({ sql: createTableSQL }),
    })

    const result = await response.text()

    if (!response.ok) {
      throw new Error(`Direct SQL execution failed: ${response.status} - ${result}`)
    }

    // Insert sample data
    const sampleDataSQL = `
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

    const dataResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabaseServiceKey}`,
        apikey: supabaseServiceKey,
      },
      body: JSON.stringify({ sql: sampleDataSQL }),
    })

    const dataResult = await dataResponse.text()

    return NextResponse.json({
      success: true,
      message: "Tables created using direct SQL execution",
      tableCreation: result,
      dataInsertion: dataResult,
      method: "direct_http",
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Direct table creation error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        method: "direct_http",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
