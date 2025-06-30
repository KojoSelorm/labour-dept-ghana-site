"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, Database, Loader2, ExternalLink, Copy, AlertTriangle } from "lucide-react"

export default function SimpleSetup() {
  const [envResult, setEnvResult] = useState<any>(null)
  const [setupResult, setSetupResult] = useState<any>(null)
  const [isTestingEnv, setIsTestingEnv] = useState(false)
  const [isCreatingTables, setIsCreatingTables] = useState(false)

  const testEnvironment = async () => {
    setIsTestingEnv(true)
    try {
      const response = await fetch("/api/simple-test")
      const data = await response.json()
      setEnvResult(data)
    } catch (error: any) {
      setEnvResult({
        success: false,
        error: error.message,
      })
    } finally {
      setIsTestingEnv(false)
    }
  }

  const createTables = async () => {
    setIsCreatingTables(true)
    try {
      const response = await fetch("/api/create-tables-simple", {
        method: "POST",
      })
      const data = await response.json()
      setSetupResult(data)
    } catch (error: any) {
      setSetupResult({
        success: false,
        error: error.message,
      })
    } finally {
      setIsCreatingTables(false)
    }
  }

  const manualSQL = `-- Create the exec_sql function first
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

-- Insert sample data
INSERT INTO site_content (section, key, value, type) VALUES
('home', 'hero_title', 'Ghana Labour Department', 'text'),
('home', 'hero_subtitle', 'Protecting Workers Rights and Promoting Fair Employment', 'text'),
('contact', 'address', '123 Independence Avenue, Accra, Ghana', 'text'),
('contact', 'phone', '+233 30 2123456', 'text'),
('contact', 'email', 'info@labour.gov.gh', 'text')
ON CONFLICT (section, key) DO NOTHING;

INSERT INTO admin_users (username, email, password_hash, role)
VALUES ('admin', 'admin@labour.gov.gh', '$2b$10$rMb4Ygf9LsJxGI0OFRSWXOQJJlx1uVELUPKL5LXP1lGPi0z9WwQdO', 'admin')
ON CONFLICT (email) DO NOTHING;`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Database className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#231f20] mb-2">Simple Database Setup</h1>
          <p className="text-gray-600">Simplified approach to set up your Supabase database</p>
        </div>

        {/* Step 1: Test Environment */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Step 1: Test Environment Variables</CardTitle>
            <CardDescription>Check if your Supabase credentials are properly configured</CardDescription>
          </CardHeader>
          <CardContent>
            {envResult && (
              <Alert className={envResult.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
                {envResult.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertTitle>{envResult.success ? "Environment OK" : "Environment Error"}</AlertTitle>
                <AlertDescription>
                  {envResult.success ? (
                    <div>
                      <p>✅ Supabase URL: {envResult.envCheck?.hasUrl ? "Found" : "Missing"}</p>
                      <p>✅ Anon Key: {envResult.envCheck?.hasAnonKey ? "Found" : "Missing"}</p>
                      <p>✅ Service Key: {envResult.envCheck?.hasServiceKey ? "Found" : "Missing"}</p>
                      <p className="text-xs mt-2">URL: {envResult.envCheck?.url}</p>
                    </div>
                  ) : (
                    <p>{envResult.error}</p>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={testEnvironment} disabled={isTestingEnv}>
              {isTestingEnv ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4 mr-2" />
              )}
              Test Environment
            </Button>
          </CardFooter>
        </Card>

        {/* Step 2: Create Tables */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Step 2: Create Database Tables</CardTitle>
            <CardDescription>Attempt to create all required tables automatically</CardDescription>
          </CardHeader>
          <CardContent>
            {setupResult && (
              <Alert className={setupResult.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
                {setupResult.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertTitle>{setupResult.success ? "Tables Created" : "Setup Failed"}</AlertTitle>
                <AlertDescription>
                  {setupResult.success ? (
                    <p>All database tables have been created successfully!</p>
                  ) : (
                    <div>
                      <p>{setupResult.error}</p>
                      {setupResult.suggestion && <p className="mt-2 text-sm">{setupResult.suggestion}</p>}
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={createTables}
              disabled={isCreatingTables || !envResult?.success}
              className="bg-[#dd2a1b] hover:bg-[#c02419]"
            >
              {isCreatingTables ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Database className="h-4 w-4 mr-2" />
              )}
              Create Tables
            </Button>
          </CardFooter>
        </Card>

        {/* Step 3: Manual Setup */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
              Step 3: Manual Setup (Recommended)
            </CardTitle>
            <CardDescription>If automatic setup fails, use this manual approach</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert className="bg-blue-50 border-blue-200">
                <AlertTriangle className="h-4 w-4 text-blue-600" />
                <AlertTitle>Manual Setup Instructions</AlertTitle>
                <AlertDescription>
                  <ol className="list-decimal list-inside space-y-2 mt-2">
                    <li>Click "Open Supabase SQL Editor" below</li>
                    <li>Copy the SQL code using the "Copy SQL" button</li>
                    <li>Paste it into the Supabase SQL Editor</li>
                    <li>Click "Run" in Supabase</li>
                    <li>Come back and check your database status</li>
                  </ol>
                </AlertDescription>
              </Alert>

              <div className="bg-gray-100 p-4 rounded-md max-h-[300px] overflow-auto">
                <pre className="text-xs">{manualSQL}</pre>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" onClick={() => copyToClipboard(manualSQL)}>
              <Copy className="h-4 w-4 mr-2" />
              Copy SQL
            </Button>
            <Button asChild>
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

        {/* Final Step */}
        <div className="text-center">
          <Button variant="outline" asChild>
            <a href="/database-status">Check Database Status</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
