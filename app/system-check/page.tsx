"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Database,
  Loader2,
  RefreshCw,
  ExternalLink,
  Copy,
  Server,
  Settings,
  Zap,
  Wrench,
} from "lucide-react"

interface TestResult {
  name: string
  status: "success" | "error" | "warning" | "pending"
  message: string
  details?: any
}

export default function SystemCheck() {
  const [tests, setTests] = useState<TestResult[]>([
    { name: "API Health", status: "pending", message: "Checking API status..." },
    { name: "Environment Variables", status: "pending", message: "Checking environment configuration..." },
    { name: "Database Connection", status: "pending", message: "Testing database connection..." },
    { name: "Table Structure", status: "pending", message: "Checking database tables..." },
  ])
  const [isRunning, setIsRunning] = useState(false)
  const [showSQL, setShowSQL] = useState(false)
  const [isCreatingTables, setIsCreatingTables] = useState(false)
  const [isCreatingDirect, setIsCreatingDirect] = useState(false)
  const [isVerifyingTables, setIsVerifyingTables] = useState(false)

  const updateTest = (name: string, status: TestResult["status"], message: string, details?: any) => {
    setTests((prev) => prev.map((test) => (test.name === name ? { ...test, status, message, details } : test)))
  }

  const createAllTables = async () => {
    setIsCreatingTables(true)
    try {
      const response = await fetch("/api/create-all-tables", { method: "POST" })
      const data = await response.json()

      if (data.success) {
        alert(`Tables created successfully! ${data.message}`)
        runSystemCheck()
      } else {
        alert(`Table creation failed: ${data.error}\n\nTrying alternative method...`)
        // Try direct method as fallback
        createTablesDirect()
      }
    } catch (error: any) {
      alert(`Table creation failed: ${error.message}\n\nTrying alternative method...`)
      createTablesDirect()
    }
    setIsCreatingTables(false)
  }

  const createTablesDirect = async () => {
    setIsCreatingDirect(true)
    try {
      const response = await fetch("/api/direct-table-creation", { method: "POST" })
      const data = await response.json()

      if (data.success) {
        alert("Tables created successfully using direct method!")
        runSystemCheck()
      } else {
        alert(`Direct table creation failed: ${data.error}\n\nPlease try the manual SQL method.`)
      }
    } catch (error: any) {
      alert(`Direct table creation failed: ${error.message}\n\nPlease try the manual SQL method.`)
    }
    setIsCreatingDirect(false)
  }

  const verifyTables = async () => {
    setIsVerifyingTables(true)
    try {
      const response = await fetch("/api/verify-tables", { method: "POST" })
      const data = await response.json()

      if (data.success) {
        const verification = data.verification
        const foundCount = verification.summary.found
        const expectedCount = verification.summary.expected

        if (foundCount === expectedCount) {
          updateTest("Table Structure", "success", `All ${expectedCount} tables found and accessible`, verification)
          alert(`✅ Success! All ${expectedCount} tables found and working properly.`)
        } else if (foundCount > 0) {
          updateTest("Table Structure", "warning", `${foundCount}/${expectedCount} tables found`, verification)
          alert(
            `⚠️ Partial Success: ${foundCount}/${expectedCount} tables found.\n\nMissing tables: ${verification.tables.missing.map((t) => t.table).join(", ")}`,
          )
        } else {
          updateTest("Table Structure", "error", "No tables found or accessible", verification)
          alert(`❌ No tables found or accessible. Please check your database setup.`)
        }
      } else {
        alert(`Table verification failed: ${data.error}`)
      }
    } catch (error: any) {
      alert(`Table verification failed: ${error.message}`)
    }
    setIsVerifyingTables(false)
  }

  const runSystemCheck = async () => {
    setIsRunning(true)

    // Reset all tests to pending
    setTests((prev) => prev.map((test) => ({ ...test, status: "pending" as const })))

    // Test 1: API Health
    try {
      const healthResponse = await fetch("/api/health")
      if (healthResponse.ok) {
        const healthData = await healthResponse.json()
        updateTest("API Health", "success", "API routes are working correctly", healthData)
      } else {
        const errorText = await healthResponse.text()
        updateTest("API Health", "error", `API health check failed: ${healthResponse.status} - ${errorText}`)
      }
    } catch (error: any) {
      updateTest("API Health", "error", `API health check failed: ${error.message}`)
    }

    // Test 2: Environment Variables
    try {
      const envResponse = await fetch("/api/env-check")
      if (envResponse.ok) {
        const envData = await envResponse.json()
        if (envData.success && envData.allConfigured) {
          updateTest("Environment Variables", "success", "All environment variables configured", envData)
        } else {
          updateTest("Environment Variables", "warning", "Some environment variables missing", envData)
        }
      } else {
        const errorText = await envResponse.text()
        updateTest("Environment Variables", "error", `Environment check failed: ${envResponse.status} - ${errorText}`)
      }
    } catch (error: any) {
      updateTest("Environment Variables", "error", `Environment check failed: ${error.message}`)
    }

    // Test 3: Database Connection
    try {
      const dbResponse = await fetch("/api/db-test", { method: "POST" })
      const responseText = await dbResponse.text()

      let dbData
      try {
        dbData = JSON.parse(responseText)
      } catch {
        updateTest("Database Connection", "error", `Invalid JSON response: ${responseText.substring(0, 100)}...`)
        setIsRunning(false)
        return
      }

      if (dbResponse.ok && dbData.success) {
        updateTest("Database Connection", "success", "Database connection successful", dbData)

        // Test 4: Table Structure (depends on database connection)
        const tablesFound = dbData.tables?.found || 0
        const expectedTables = 11

        if (tablesFound === expectedTables) {
          updateTest("Table Structure", "success", `All ${expectedTables} tables found`)
        } else if (tablesFound > 0) {
          updateTest("Table Structure", "warning", `${tablesFound}/${expectedTables} tables found - setup incomplete`, {
            found: tablesFound,
            expected: expectedTables,
            missing: dbData.tables?.missing || [],
            hasExecFunction: dbData.connection?.hasExecFunction,
          })
        } else {
          updateTest("Table Structure", "error", "No tables found - database needs setup", {
            hasExecFunction: dbData.connection?.hasExecFunction,
          })
        }
      } else {
        updateTest("Database Connection", "error", `Database connection failed: ${dbData.error}`, dbData)
        updateTest("Table Structure", "error", "Cannot check tables - database connection failed")
      }
    } catch (error: any) {
      updateTest("Database Connection", "error", `Database test failed: ${error.message}`)
      updateTest("Table Structure", "error", "Cannot check tables - database connection failed")
    }

    setIsRunning(false)
  }

  useEffect(() => {
    runSystemCheck()
  }, [])

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      default:
        return <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
    }
  }

  const getStatusBadge = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Pass</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800">Fail</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
      default:
        return <Badge variant="secondary">Running</Badge>
    }
  }

  const completeSQL = `-- Complete Database Setup Script
-- Run this in your Supabase SQL Editor: https://app.supabase.com/project/cfqnlejmlzpzrdzjkyrj/sql

-- Step 1: Create all tables
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

-- Step 2: Insert sample data
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

-- Step 3: Verify setup
SELECT 'Setup complete! Tables created:' as message;
SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;`

  const copySQL = () => {
    navigator.clipboard.writeText(completeSQL)
    alert("SQL script copied to clipboard!")
  }

  const overallStatus = tests.every((t) => t.status === "success")
    ? "success"
    : tests.some((t) => t.status === "error")
      ? "error"
      : "warning"

  const dbTest = tests.find((t) => t.name === "Database Connection")
  const tableTest = tests.find((t) => t.name === "Table Structure")

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Server className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#231f20] mb-2">System Health Check</h1>
          <p className="text-gray-600">Comprehensive system diagnostics and database setup</p>
        </div>

        {/* Overall Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {overallStatus === "success" && <CheckCircle className="h-6 w-6 text-green-600" />}
                {overallStatus === "error" && <XCircle className="h-6 w-6 text-red-600" />}
                {overallStatus === "warning" && <AlertTriangle className="h-6 w-6 text-yellow-600" />}
                <span>System Status</span>
              </div>
              <Button onClick={runSystemCheck} disabled={isRunning} variant="outline">
                {isRunning ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                Recheck
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {tests.map((test) => (
                <div key={test.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(test.status)}
                    <div>
                      <div className="font-medium">{test.name}</div>
                      <div className="text-sm text-gray-500">{test.message}</div>
                      {test.details && (
                        <details className="text-xs text-gray-400 mt-1">
                          <summary className="cursor-pointer">View Details</summary>
                          <pre className="mt-1 p-2 bg-gray-100 rounded text-xs overflow-auto">
                            {JSON.stringify(test.details, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(test.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Multiple Setup Options */}
        {dbTest?.status === "success" && tableTest?.status === "error" && tableTest?.details?.hasExecFunction && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800">
                <Wrench className="h-5 w-5 mr-2" />
                Multiple Setup Options Available
              </CardTitle>
              <CardDescription className="text-orange-700">
                Database connected with exec_sql function, but tables not found. Try these methods:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className="bg-orange-100 border-orange-300">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertTitle className="text-orange-800">Tables Missing</AlertTitle>
                  <AlertDescription className="text-orange-700">
                    Your database connection works and exec_sql function exists, but no tables were found. Try the
                    automated methods below or use manual setup.
                  </AlertDescription>
                </Alert>

                <div className="grid gap-3">
                  <Button
                    onClick={createAllTables}
                    disabled={isCreatingTables || isCreatingDirect}
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                    size="lg"
                  >
                    {isCreatingTables ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Zap className="h-4 w-4 mr-2" />
                    )}
                    Method 1: Create Tables via exec_sql
                  </Button>

                  <Button
                    onClick={createTablesDirect}
                    disabled={isCreatingTables || isCreatingDirect}
                    variant="outline"
                    className="border-orange-300 text-orange-700 hover:bg-orange-100"
                    size="lg"
                  >
                    {isCreatingDirect ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Wrench className="h-4 w-4 mr-2" />
                    )}
                    Method 2: Direct HTTP Creation
                  </Button>
                  <Button
                    onClick={verifyTables}
                    disabled={isVerifyingTables || isCreatingTables || isCreatingDirect}
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-100"
                    size="lg"
                  >
                    {isVerifyingTables ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Database className="h-4 w-4 mr-2" />
                    )}
                    Verify Tables Manually
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
                    <li>Return here and click "Recheck" to verify</li>
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
                <Button variant="outline" onClick={() => setShowSQL(!showSQL)}>
                  {showSQL ? "Hide" : "Show"} SQL Script
                </Button>
              </div>

              {showSQL && (
                <div className="bg-gray-900 text-green-400 p-4 rounded-md max-h-[400px] overflow-auto font-mono text-sm">
                  <pre>{completeSQL}</pre>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        {overallStatus === "success" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">✅ System Ready!</CardTitle>
              <CardDescription>Your system is fully configured and ready to use</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button asChild className="bg-[#dd2a1b] hover:bg-[#c02419]">
                  <a href="/admin">Go to Admin Dashboard</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/">View Public Site</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/login">Admin Login</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
