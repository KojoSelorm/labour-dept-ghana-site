"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Database, Settings, Shield, Server, Loader2 } from "lucide-react"

interface ComprehensiveTestResult {
  success: boolean
  message: string
  results: {
    timestamp: string
    projectRef: string
    environment: {
      configured: boolean
      hasUrl: boolean
      hasAnonKey: boolean
      hasServiceKey: boolean
    }
    clientConnection: {
      success: boolean
      error: string | null
      details: any
    }
    adminConnection: {
      success: boolean
      error: string | null
      details: any
    }
    database: {
      tablesFound: number
      expectedTables: string[]
      missingTables: string[]
      tableDetails: Record<string, any>
      success: boolean
    }
    authentication: {
      success: boolean
      userCount: number
      error: string | null
    }
    permissions: {
      canRead: boolean
      canWrite: boolean
      canAdmin: boolean
    }
  }
  summary: {
    environment: string
    client: string
    admin: string
    database: string
    auth: string
    permissions: string
  }
}

export default function ConnectionStatusPage() {
  const [testResult, setTestResult] = useState<ComprehensiveTestResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    runComprehensiveTest()
  }, [])

  const runComprehensiveTest = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/comprehensive-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      setTestResult(result)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (success: boolean) => {
    return success ? <CheckCircle className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5 text-red-600" />
  }

  const getStatusBadge = (success: boolean, text?: string) => {
    return success ? (
      <Badge className="bg-green-100 text-green-800">{text || "Success"}</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">{text || "Failed"}</Badge>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4 animate-spin" />
          <h2 className="text-xl font-semibold mb-2">Testing Your Supabase Connection</h2>
          <p className="text-gray-600">Running comprehensive diagnostics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Database className="h-16 w-16 text-[#dd2a1b] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#231f20] mb-2">Supabase Connection Status</h1>
          <p className="text-gray-600">Comprehensive test of your Supabase configuration and connections</p>
          {testResult && (
            <p className="text-sm text-gray-500 mt-2">
              Project: <code className="bg-gray-100 px-2 py-1 rounded">{testResult.results?.projectRef}</code>
              {" • "}
              Last tested: {new Date(testResult.results?.timestamp || "").toLocaleString()}
            </p>
          )}
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <XCircle className="h-4 w-4" />
            <AlertDescription>Test failed: {error}</AlertDescription>
          </Alert>
        )}

        {testResult && (
          <>
            {/* Overall Status */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {getStatusIcon(testResult.success)}
                  <span>{testResult.success ? "All Systems Operational" : "Issues Detected"}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className={testResult.success ? "" : "border-red-200 bg-red-50"}>
                  <AlertDescription>{testResult.message}</AlertDescription>
                </Alert>

                {/* Quick Summary */}
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-sm font-medium text-gray-600">Environment</div>
                    <div className="text-lg">{testResult.summary.environment}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-sm font-medium text-gray-600">Database</div>
                    <div className="text-lg">{testResult.summary.database}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-sm font-medium text-gray-600">Authentication</div>
                    <div className="text-lg">{testResult.summary.auth}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Environment Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Environment Configuration</span>
                    {getStatusBadge(testResult.results.environment.configured)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Supabase URL</span>
                      {getStatusIcon(testResult.results.environment.hasUrl)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Anonymous Key</span>
                      {getStatusIcon(testResult.results.environment.hasAnonKey)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Service Role Key</span>
                      {getStatusIcon(testResult.results.environment.hasServiceKey)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Connection Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Server className="h-5 w-5" />
                    <span>Connection Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Client Connection</span>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(testResult.results.clientConnection.success)}
                        {!testResult.results.clientConnection.success && (
                          <span className="text-xs text-red-600">{testResult.results.clientConnection.error}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Admin Connection</span>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(testResult.results.adminConnection.success)}
                        {!testResult.results.adminConnection.success && (
                          <span className="text-xs text-red-600">{testResult.results.adminConnection.error}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Database Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5" />
                    <span>Database Status</span>
                    {getStatusBadge(testResult.results.database.success)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tables Found</span>
                      <Badge variant="outline">{testResult.results.database.tablesFound}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Expected Tables</span>
                      <Badge variant="outline">{testResult.results.database.expectedTables.length}</Badge>
                    </div>
                    {testResult.results.database.missingTables.length > 0 && (
                      <div className="mt-2">
                        <span className="text-sm text-red-600 font-medium">Missing Tables:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {testResult.results.database.missingTables.map((table) => (
                            <Badge key={table} variant="destructive" className="text-xs">
                              {table}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {Object.keys(testResult.results.database.tableDetails).length > 0 && (
                      <details className="mt-3">
                        <summary className="text-sm text-gray-500 cursor-pointer">
                          Table Details ({Object.keys(testResult.results.database.tableDetails).length})
                        </summary>
                        <div className="mt-2 space-y-1">
                          {Object.entries(testResult.results.database.tableDetails).map(
                            ([table, details]: [string, any]) => (
                              <div key={table} className="flex items-center justify-between text-xs">
                                <span>{table}</span>
                                <span className={details.accessible ? "text-green-600" : "text-red-600"}>
                                  {details.accessible ? `${details.rows} rows` : "No access"}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </details>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Authentication & Permissions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Authentication & Permissions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auth System</span>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(testResult.results.authentication.success)}
                        {testResult.results.authentication.success && (
                          <Badge variant="outline" className="text-xs">
                            {testResult.results.authentication.userCount} users
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Read Permission</span>
                      {getStatusIcon(testResult.results.permissions.canRead)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Write Permission</span>
                      {getStatusIcon(testResult.results.permissions.canWrite)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Admin Permission</span>
                      {getStatusIcon(testResult.results.permissions.canAdmin)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="mt-8 text-center space-x-4">
              <Button onClick={runComprehensiveTest} disabled={loading} className="bg-[#dd2a1b] hover:bg-[#c02419]">
                {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Run Test Again
              </Button>

              {testResult.success ? (
                <Button variant="outline" asChild>
                  <a href="/admin">Go to Admin Dashboard</a>
                </Button>
              ) : (
                <Button variant="outline" asChild>
                  <a href="/setup-database">Set Up Database</a>
                </Button>
              )}

              <Button variant="outline" asChild>
                <a href="/test-connection">Basic Connection Test</a>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
