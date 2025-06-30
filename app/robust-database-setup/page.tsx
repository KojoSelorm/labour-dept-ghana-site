"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, Database, Loader2, ExternalLink, Copy, Settings, Zap, RefreshCw } from "lucide-react"

export default function RobustDatabaseSetup() {
  const [isSetupRunning, setIsSetupRunning] = useState(false)
  const [setupResult, setSetupResult] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)

  const runDatabaseSetup = async () => {
    setIsSetupRunning(true)
    setSetupResult(null)

    try {
      const response = await fetch("/api/setup-database-robust", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const result = await response.json()
      setSetupResult(result)

      if (result.success) {
        alert("Database setup completed successfully!")
      } else {
        alert(`Database setup failed: ${result.error}`)
      }
    } catch (error: any) {
      setSetupResult({
        success: false,
        error: "Network error",
        details: { message: error.message },
      })
      alert(`Setup failed: ${error.message}`)
    }

    setIsSetupRunning(false)
  }

  const manualSQL = `-- Complete Database Setup Script
-- Copy and paste this into your Supabase SQL Editor

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

INSERT INTO admin_users (username, email, password_hash, role) VALUES
('admin', 'admin@labour.gov.gh', '$2b$10$rMb4Ygf9LsJxGI0OFRSWXOQJJlx1uVELUPKL5LXP1lGPi0z9WwQdO', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Verify setup
SELECT 'Database setup complete!' as message;
SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;`

  const copySQL = () => {
    navigator.clipboard.writeText(manualSQL)
    alert("SQL script copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Database className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#231f20] mb-2">Robust Database Setup</h1>
          <p className="text-gray-600">Enhanced database setup with better error handling</p>
        </div>

        {/* Automated Setup */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-[#dd2a1b]" />
              Automated Database Setup
            </CardTitle>
            <CardDescription>
              Enhanced setup process with multiple fallback methods and detailed error reporting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert className="bg-blue-50 border-blue-200">
                <Settings className="h-4 w-4 text-blue-600" />
                <AlertTitle>What This Does</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Tests database connection first</li>
                    <li>Creates all 11 required tables</li>
                    <li>Inserts sample data and admin user</li>
                    <li>Uses multiple fallback methods if one fails</li>
                    <li>Provides detailed error reporting</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <Button
                onClick={runDatabaseSetup}
                disabled={isSetupRunning}
                className="bg-[#dd2a1b] hover:bg-[#c02419] text-white"
                size="lg"
              >
                {isSetupRunning ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Zap className="h-4 w-4 mr-2" />}
                {isSetupRunning ? "Setting up database..." : "Start Enhanced Database Setup"}
              </Button>

              {setupResult && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {setupResult.success ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <span className="font-medium">{setupResult.success ? "Setup Successful" : "Setup Failed"}</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setShowDetails(!showDetails)}>
                      {showDetails ? "Hide" : "Show"} Details
                    </Button>
                  </div>

                  {setupResult.success ? (
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertTitle className="text-green-800">Database Setup Complete!</AlertTitle>
                      <AlertDescription className="text-green-700">
                        {setupResult.message}
                        {setupResult.details?.verification && (
                          <div className="mt-2">
                            <strong>Tables created:</strong> {setupResult.details.verification.tablesFound}
                          </div>
                        )}
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert className="bg-red-50 border-red-200">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <AlertTitle className="text-red-800">Setup Failed</AlertTitle>
                      <AlertDescription className="text-red-700">{setupResult.error}</AlertDescription>
                    </Alert>
                  )}

                  {showDetails && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-md">
                      <pre className="text-xs overflow-auto">{JSON.stringify(setupResult, null, 2)}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Manual Setup */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2 text-[#dd2a1b]" />
              Manual Database Setup
            </CardTitle>
            <CardDescription>Reliable fallback: Copy and paste SQL script in Supabase</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert className="bg-blue-50 border-blue-200">
                <Settings className="h-4 w-4 text-blue-600" />
                <AlertTitle>Manual Setup Instructions</AlertTitle>
                <AlertDescription>
                  <ol className="list-decimal list-inside space-y-1 mt-2">
                    <li>Copy the complete SQL script below</li>
                    <li>Open your Supabase SQL Editor</li>
                    <li>Paste and run the script</li>
                    <li>Return to system check to verify</li>
                  </ol>
                </AlertDescription>
              </Alert>

              <div className="flex gap-2">
                <Button onClick={copySQL} className="bg-[#dd2a1b] hover:bg-[#c02419]">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy SQL Script
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://app.supabase.com/project/cfqnlejmlzpzrdzjkyrj/sql"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Supabase SQL Editor
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <a href="/system-check">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Check System Status
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/verify-admin-changes">
                  <Database className="h-4 w-4 mr-2" />
                  Test Database
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/admin">
                  <Settings className="h-4 w-4 mr-2" />
                  Go to Admin
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
