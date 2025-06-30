"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Database,
  Loader2,
  RefreshCw,
  Settings,
  Users,
  Table,
  Shield,
  Zap,
} from "lucide-react"
import Link from "next/link"

interface TestResult {
  status: "success" | "error" | "warning" | "unknown"
  message: string
  details: any
}

interface DatabaseStatus {
  success: boolean
  overall: {
    status: string
    message: string
    summary: {
      total: number
      success: number
      warnings: number
      errors: number
    }
  }
  results: {
    connection: TestResult
    tables: TestResult
    data: TestResult
    auth: TestResult
    permissions: TestResult
  }
  timestamp: string
  projectId: string
}

export default function DatabaseStatusPage() {
  const [status, setStatus] = useState<DatabaseStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkStatus = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/verify-database-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setStatus(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  const getStatusIcon = (status: string) => {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Working</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getOverallStatusColor = (status: string) => {
    switch (status) {
      case "fully_functional":
        return "text-green-600"
      case "partially_functional":
        return "text-yellow-600"
      case "has_errors":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const testItems = [
    { key: "connection", icon: Zap, title: "Database Connection", description: "Basic connectivity to Supabase" },
    { key: "tables", icon: Table, title: "Table Structure", description: "Required database tables" },
    { key: "data", icon: Database, title: "Data Access", description: "Read/write operations" },
    { key: "auth", icon: Users, title: "Authentication", description: "User management system" },
    { key: "permissions", icon: Shield, title: "Permissions", description: "Database access rights" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Database className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#231f20] mb-2">Database Status Dashboard</h1>
          <p className="text-gray-600">Comprehensive verification of your Supabase database</p>
        </div>

        {/* Overall Status */}
        {status && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {status.overall.status === "fully_functional" && <CheckCircle className="h-6 w-6 text-green-600" />}
                  {status.overall.status === "partially_functional" && (
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  )}
                  {status.overall.status === "has_errors" && <XCircle className="h-6 w-6 text-red-600" />}
                  <span className={getOverallStatusColor(status.overall.status)}>
                    {status.overall.status === "fully_functional" && "Database Fully Functional"}
                    {status.overall.status === "partially_functional" && "Database Partially Functional"}
                    {status.overall.status === "has_errors" && "Database Has Issues"}
                  </span>
                </div>
                <Badge variant="outline">Project: {status.projectId}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{status.overall.summary.success}</div>
                  <div className="text-sm text-gray-500">Passing</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{status.overall.summary.warnings}</div>
                  <div className="text-sm text-gray-500">Warnings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{status.overall.summary.errors}</div>
                  <div className="text-sm text-gray-500">Errors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">{status.overall.summary.total}</div>
                  <div className="text-sm text-gray-500">Total Tests</div>
                </div>
              </div>

              <Alert
                className={
                  status.overall.status === "fully_functional"
                    ? "bg-green-50 border-green-200"
                    : status.overall.status === "partially_functional"
                      ? "bg-yellow-50 border-yellow-200"
                      : "bg-red-50 border-red-200"
                }
              >
                <AlertTitle>{status.overall.message}</AlertTitle>
                <AlertDescription>Last checked: {new Date(status.timestamp).toLocaleString()}</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Individual Test Results */}
        {status && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testItems.map((item) => {
              const result = status.results[item.key as keyof typeof status.results]
              const Icon = item.icon

              return (
                <Card key={item.key}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-[#dd2a1b]" />
                        <span>{item.title}</span>
                      </CardTitle>
                      {getStatusBadge(result.status)}
                    </div>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-2 mb-3">
                      {getStatusIcon(result.status)}
                      <p className="text-sm">{result.message}</p>
                    </div>
                    {result.details && (
                      <details className="mt-2">
                        <summary className="text-xs text-gray-500 cursor-pointer">View Details</summary>
                        <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">
                          {JSON.stringify(result.details, null, 2)}
                        </pre>
                      </details>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Status Check Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {isLoading && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Checking database status...</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button onClick={checkStatus} disabled={isLoading} className="bg-[#dd2a1b] hover:bg-[#c02419]">
            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
            Refresh Status
          </Button>

          {status?.overall.status === "fully_functional" && (
            <Button variant="outline" asChild>
              <Link href="/admin">
                <Settings className="h-4 w-4 mr-2" />
                Go to Admin Dashboard
              </Link>
            </Button>
          )}

          {status && status.overall.summary.errors > 0 && (
            <Button variant="outline" asChild>
              <Link href="/setup-database">
                <Database className="h-4 w-4 mr-2" />
                Setup Database
              </Link>
            </Button>
          )}

          <Button variant="outline" asChild>
            <Link href="/test-connection">
              <Zap className="h-4 w-4 mr-2" />
              Connection Test
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
