"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, Database, ExternalLink, Copy, AlertTriangle, Code } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

export default function DirectSetup() {
  const [connectionStatus, setConnectionStatus] = useState<any>(null)
  const [isTestingConnection, setIsTestingConnection] = useState(false)

  // Test connection directly from the client
  const testConnection = async () => {
    setIsTestingConnection(true)
    try {
      // Get environment variables from the client side
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      const envCheck = {
        hasUrl: !!supabaseUrl,
        hasAnonKey: !!supabaseAnonKey,
        url: supabaseUrl?.substring(0, 30) + "..." || "Not found",
        anonKeyLength: supabaseAnonKey?.length || 0,
      }

      if (!supabaseUrl || !supabaseAnonKey) {
        setConnectionStatus({
          success: false,
          error: "Environment variables not found",
          envCheck,
        })
        return
      }

      // Create Supabase client directly
      const supabase = createClient(supabaseUrl, supabaseAnonKey)

      // Test basic connection
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        setConnectionStatus({
          success: false,
          error: error.message,
          envCheck,
        })
        return
      }

      setConnectionStatus({
        success: true,
        message: "Connection successful",
        envCheck,
        hasSession: !!data.session,
      })
    } catch (error: any) {
      setConnectionStatus({
        success: false,
        error: error.message,
        envCheck: {
          hasUrl: false,
          hasAnonKey: false,
          url: "Error checking",
          anonKeyLength: 0,
        },
      })
    } finally {
      setIsTestingConnection(false)
    }
  }

  const manualSQL = `-- Complete Database Setup for Ghana Labour Department
-- Copy and paste this entire script into your Supabase SQL Editor

-- 1. Create the exec_sql function
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

-- 2. Create all required tables
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

-- 3. Insert sample data
INSERT INTO site_content (section, key, value, type) VALUES
('home', 'hero_title', 'Ghana Labour Department', 'text'),
('home', 'hero_subtitle', 'Protecting Workers Rights and Promoting Fair Employment', 'text'),
('home', 'hero_description', 'The Ministry of Employment and Labour Relations is committed to ensuring fair employment practices, protecting workers rights, and promoting decent work for all Ghanaians.', 'text'),
('contact', 'address', '123 Independence Avenue, Accra, Ghana', 'text'),
('contact', 'phone', '+233 30 2123456', 'text'),
('contact', 'email', 'info@labour.gov.gh', 'text'),
('contact', 'hours', 'Monday - Friday: 8:00 AM - 5:00 PM', 'text'),
('about', 'mission', 'To promote decent work and ensure fair employment practices for all workers in Ghana.', 'text'),
('about', 'vision', 'A Ghana where every worker enjoys decent work in a safe and healthy environment.', 'text')
ON CONFLICT (section, key) DO NOTHING;

INSERT INTO admin_users (username, email, password_hash, role) VALUES
('admin', 'admin@labour.gov.gh', '$2b$10$rMb4Ygf9LsJxGI0OFRSWXOQJJlx1uVELUPKL5LXP1lGPi0z9WwQdO', 'admin'),
('dev', 'dev@labourdepartment.gov.gh', '$2b$10$rMb4Ygf9LsJxGI0OFRSWXOQJJlx1uVELUPKL5LXP1lGPi0z9WwQdO', 'admin')
ON CONFLICT (email) DO NOTHING;

INSERT INTO blog_posts (title, excerpt, content, author, category, featured) VALUES
('New Labour Law Amendments 2024', 'Important updates to Ghana''s labour laws affecting all employers and employees.', 'The Ministry of Employment and Labour Relations has announced significant amendments to the Labour Act...', 'Ministry of Labour', 'Legal Updates', true),
('Workplace Safety Guidelines', 'Essential safety measures every workplace must implement.', 'Ensuring workplace safety is a shared responsibility between employers and employees...', 'Safety Department', 'Safety', true),
('Workers Rights Awareness Campaign', 'Know your rights as a worker in Ghana.', 'Every worker in Ghana has fundamental rights that must be respected and protected...', 'Rights Division', 'Workers Rights', false)
ON CONFLICT DO NOTHING;

INSERT INTO testimonials (name, position, company, content, rating, featured, approved) VALUES
('Kwame Asante', 'Factory Worker', 'Ghana Manufacturing Ltd', 'The Labour Department helped me resolve my workplace dispute quickly and fairly.', 5, true, true),
('Akosua Mensah', 'HR Manager', 'Tech Solutions Ghana', 'Their guidance on labour compliance has been invaluable for our company.', 5, true, true),
('John Doe', 'Construction Worker', 'Build Right Construction', 'I received excellent support when I faced unsafe working conditions.', 5, false, true)
ON CONFLICT DO NOTHING;

-- 4. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);

-- 5. Verify tables were created
SELECT 
  tablename as table_name,
  schemaname as schema_name
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN (
    'site_content', 'admin_users', 'blog_posts', 'testimonials', 
    'complaints', 'contact_messages', 'documents', 
    'newsletter_subscribers', 'page_views', 'search_logs', 
    'analytics_events'
  )
ORDER BY tablename;`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("SQL copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Database className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#231f20] mb-2">Direct Database Setup</h1>
          <p className="text-gray-600">Bypass API issues and set up your database directly</p>
        </div>

        {/* Connection Test */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Step 1: Test Basic Connection</CardTitle>
            <CardDescription>Test your Supabase connection directly from the browser</CardDescription>
          </CardHeader>
          <CardContent>
            {connectionStatus && (
              <Alert className={connectionStatus.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
                {connectionStatus.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertTitle>{connectionStatus.success ? "Connection Successful" : "Connection Failed"}</AlertTitle>
                <AlertDescription>
                  {connectionStatus.success ? (
                    <div>
                      <p>✅ Supabase connection is working!</p>
                      <p>✅ Environment variables are loaded</p>
                      <p className="text-xs mt-2">URL: {connectionStatus.envCheck?.url}</p>
                    </div>
                  ) : (
                    <div>
                      <p>❌ {connectionStatus.error}</p>
                      <div className="mt-2 text-xs">
                        <p>Has URL: {connectionStatus.envCheck?.hasUrl ? "✅" : "❌"}</p>
                        <p>Has Anon Key: {connectionStatus.envCheck?.hasAnonKey ? "✅" : "❌"}</p>
                      </div>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={testConnection} disabled={isTestingConnection}>
              {isTestingConnection ? "Testing..." : "Test Connection"}
            </Button>
          </CardFooter>
        </Card>

        {/* Manual Setup */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="h-5 w-5 mr-2 text-[#dd2a1b]" />
              Step 2: Manual Database Setup
            </CardTitle>
            <CardDescription>Copy the SQL script and run it in your Supabase SQL Editor</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="bg-blue-50 border-blue-200 mb-4">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
              <AlertTitle>Instructions</AlertTitle>
              <AlertDescription>
                <ol className="list-decimal list-inside space-y-1 mt-2">
                  <li>Click "Copy Complete SQL Script" below</li>
                  <li>Click "Open Supabase SQL Editor"</li>
                  <li>Paste the script in the editor</li>
                  <li>Click "Run" to execute</li>
                  <li>Verify all tables were created</li>
                </ol>
              </AlertDescription>
            </Alert>

            <div className="bg-gray-900 text-green-400 p-4 rounded-md max-h-[400px] overflow-auto font-mono text-sm">
              <pre>{manualSQL}</pre>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button onClick={() => copyToClipboard(manualSQL)} className="bg-[#dd2a1b] hover:bg-[#c02419]">
              <Copy className="h-4 w-4 mr-2" />
              Copy Complete SQL Script
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://app.supabase.com/project/cfqnlejmlzpzrdzjkyrj/sql"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Supabase SQL Editor
              </a>
            </Button>
          </CardFooter>
        </Card>

        {/* Verification */}
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Verify Setup</CardTitle>
            <CardDescription>After running the SQL script, verify everything is working</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>✅ 11 tables should be created</p>
              <p>✅ Sample data should be inserted</p>
              <p>✅ Admin users should be created</p>
              <p>✅ Indexes should be added for performance</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <a href="/database-status">Check Database Status</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
