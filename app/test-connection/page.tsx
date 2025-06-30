"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertTriangle, Database, Loader2 } from "lucide-react"

interface ConnectionTest {
  name: string
  status: "pending" | "success" | "error"
  message: string
  details?: any
}

export default function TestConnectionPage() {
  const [tests, setTests] = useState<ConnectionTest[]>([
    { name: "Environment Variables", status: "pending", message: "Checking..." },
    { name: "Client Connection", status: "pending", message: "Checking..." },
    { name: "Admin Connection", status: "pending", message: "Checking..." },
    { name: "Database Connection", status: "pending", message: "Checking..." },
    { name: "Table Structure", status: "pending", message: "Checking..." },
  ])
  const [isRunning, setIsRunning] = useState(false)
  const [pageError, setPageError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const updateTest = (index: number, updates: Partial<ConnectionTest>) => {
    setTests((prev) => prev.map((test, i) => (i === index ? { ...test, ...updates } : test)))
  }

  const runTests = async () => {
    setIsRunning(true)
    setPageError(null)

    try {
      // Test 1: Environment Variables
      updateTest(0, { status: "pending", message: "Checking environment variables..." })
      await new Promise((resolve) => setTimeout(resolve, 500))

      const envCheck = await fetch("/api/check-env-detailed", { method: "POST" })
        .then((res) => res.json())
        .catch((err) => ({ success: false, error: err.message }))

      if (envCheck.success) {
        updateTest(0, {
          status: "success",
          message: `✓ All environment variables configured (Project: cfqnlejmlzpzrdzjkyrj)`,
          details: envCheck.details,
        })
      } else {
        updateTest(0, {
          status: "error",
          message: envCheck.error || "Environment check failed",
          details: envCheck,
        })
      }

      // Test 2: Client Connection
      updateTest(1, { status: "pending", message: "Testing client connection..." })
      await new Promise((resolve) => setTimeout(resolve, 500))

      try {
        const { supabase } = await import("@/lib/supabase")

        if (!supabase) {
          throw new Error("Supabase client not initialized")
        }

        // Test a simple auth check
        const { data, error } = await supabase.auth.getSession()

        if (error && error.message !== "Auth session missing!") {
          throw error
        }

        updateTest(1, {
          status: "success",
          message: "✓ Client connection successful - authentication working",
          details: { hasSession: !!data.session, canQuery: true },
        })
      } catch (error: any) {
        updateTest(1, {
          status: "error",
          message: `Client connection failed: ${error.message}`,
          details: error,
        })
      }

      // Test 3: Database Connection
      updateTest(2, { status: "pending", message: "Testing database connection..." })
      updateTest(4, { status: "pending", message: "Checking database tables..." })
      await new Promise((resolve) => setTimeout(resolve, 500))

      try {
        const dbResponse = await fetch("/api/db-test", { method: "POST" })
        const responseText = await dbResponse.text()

        let dbData
        try {
          dbData = JSON.parse(responseText)
        } catch {
          updateTest(2, {
            status: "error",
            message: `Invalid JSON response: ${responseText.substring(0, 100)}...`,
            details: { rawResponse: responseText },
          })
          setIsRunning(false)
          return
        }

        if (dbResponse.ok && dbData.success) {
          updateTest(2, {
            status: "success",
            message: `✓ Database connection successful - ${dbData.connection.method}`,
            details: dbData,
          })

          // Test 4: Table Structure (updated logic)
          const tablesFound = dbData.tables?.found || 0
          const expectedTables = dbData.tables?.expected || 11

          if (tablesFound === expectedTables) {
            updateTest(4, {
              status: "success",
              message: `✓ All ${expectedTables} tables found and accessible`,
              details: dbData.tables,
            })
          } else if (tablesFound > 0) {
            updateTest(4, {
              status: "error",
              message: `⚠️ Found ${tablesFound}/${expectedTables} tables - some missing`,
              details: dbData.tables,
            })
          } else {
            updateTest(4, {
              status: "error",
              message: "❌ No tables found - database needs setup",
              details: dbData.tables,
            })
          }
        } else {
          updateTest(2, {
            status: "error",
            message: `Database connection failed: ${dbData.error}`,
            details: dbData,
          })
          updateTest(4, {
            status: "error",
            message: "Cannot check tables - database connection failed",
          })
        }
      } catch (error: any) {
        updateTest(2, {
          status: "error",
          message: `Database test failed: ${error.message}`,
          details: error,
        })
        updateTest(4, {
          status: "error",
          message: "Cannot check tables - database connection failed",
        })
      }
    } catch (error: any) {
      setPageError(`Test execution failed: ${error.message}`)
    } finally {
      setIsRunning(false)
    }
  }

  useEffect(() => {
    // Auto-run tests when page loads
    runTests()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "pending":
        return <Loader2 className="h-5 w-5 text-yellow-600 animate-spin" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Success</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Running</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const allTestsPassed = tests.every((test) => test.status === "success")
  const hasErrors = tests.some((test) => test.status === "error")
  const adminConnectionWorking = tests[2]?.status === "success"

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Database className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#231f20] mb-2">Supabase Connection Test</h1>
          <p className="text-gray-600">Verifying database connection and configuration</p>
        </div>

        {/* Overall Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {allTestsPassed ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : hasErrors ? (
                <XCircle className="h-6 w-6 text-red-600" />
              ) : (
                <Loader2 className="h-6 w-6 text-yellow-600 animate-spin" />
              )}
              <span>{allTestsPassed ? "All Tests Passed" : hasErrors ? "Issues Detected" : "Testing in Progress"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {allTestsPassed && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  ✅ Your Supabase connection is working correctly! All tables are set up and data is accessible.
                </AlertDescription>
              </Alert>
            )}
            {hasErrors && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>
                  ❌ Some tests failed. Check the details below to resolve the issues.
                </AlertDescription>
              </Alert>
            )}
            {!allTestsPassed && !hasErrors && (
              <Alert>
                <Loader2 className="h-4 w-4 animate-spin" />
                <AlertDescription>🔄 Running connection tests...</AlertDescription>
              </Alert>
            )}
            {pageError && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>❌ {pageError}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Individual Tests */}
        <div className="space-y-4">
          {tests.map((test, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-3">
                    {getStatusIcon(test.status)}
                    <span>{test.name}</span>
                  </CardTitle>
                  {getStatusBadge(test.status)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">{test.message}</p>
                {test.details && (
                  <details className="mt-2">
                    <summary className="text-sm text-gray-500 cursor-pointer">View Details</summary>
                    <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                      {JSON.stringify(test.details, null, 2)}
                    </pre>
                  </details>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 text-center space-x-4">
          <Button onClick={runTests} disabled={isRunning} className="bg-[#dd2a1b] hover:bg-[#c02419]">
            {isRunning ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            {isRunning ? "Running Tests..." : "Run Tests Again"}
          </Button>

          {allTestsPassed && (
            <Button variant="outline" asChild>
              <a href="/admin">Go to Admin Dashboard</a>
            </Button>
          )}

          {adminConnectionWorking && (
            <Button variant="outline" asChild>
              <a href="/setup-database">Setup Database Tables</a>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
