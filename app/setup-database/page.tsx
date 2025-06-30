"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2, Database, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SetupDatabasePage() {
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({})
  const [results, setResults] = useState<Record<string, { success: boolean; message: string; details?: any }>>({})
  const [overallStatus, setOverallStatus] = useState<"pending" | "success" | "error" | "partial">("pending")

  const scripts = [
    {
      id: "create-tables",
      name: "Create Core Tables",
      file: "create-tables.sql",
      description:
        "Creates the main tables for blog posts, site content, testimonials, documents, complaints, contact messages, and admin users.",
    },
    {
      id: "create-additional-tables",
      name: "Create Additional Tables",
      file: "create-additional-tables.sql",
      description:
        "Creates supporting tables for email logs, search logs, page views, newsletter subscribers, and system settings.",
    },
    {
      id: "create-analytics-tables",
      name: "Create Analytics Tables",
      file: "create-analytics-tables.sql",
      description: "Creates tables for analytics events, page views, and search logs tracking.",
    },
    {
      id: "seed-data",
      name: "Seed Initial Data",
      file: "seed-data.sql",
      description: "Populates the database with sample content, blog posts, testimonials, and an admin user.",
    },
  ]

  const runScript = async (scriptId: string, filename: string) => {
    setIsLoading((prev) => ({ ...prev, [scriptId]: true }))
    try {
      const response = await fetch(`/api/run-script`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename }),
      })

      const data = await response.json()

      setResults((prev) => ({
        ...prev,
        [scriptId]: {
          success: data.success,
          message: data.success
            ? `Script executed successfully (${data.successfulStatements}/${data.totalStatements} statements)`
            : data.error ||
              `Script executed with errors (${data.failedStatements}/${data.totalStatements} statements failed)`,
          details: data,
        },
      }))

      // Update overall status
      updateOverallStatus()
    } catch (error: any) {
      setResults((prev) => ({
        ...prev,
        [scriptId]: {
          success: false,
          message: error.message || "An error occurred",
        },
      }))
      updateOverallStatus()
    } finally {
      setIsLoading((prev) => ({ ...prev, [scriptId]: false }))
    }
  }

  const updateOverallStatus = () => {
    const scriptIds = scripts.map((s) => s.id)
    const completedScripts = scriptIds.filter((id) => results[id])

    if (completedScripts.length === 0) {
      setOverallStatus("pending")
      return
    }

    const allSuccess = completedScripts.every((id) => results[id]?.success)
    const allFailed = completedScripts.every((id) => !results[id]?.success)

    if (completedScripts.length === scriptIds.length) {
      setOverallStatus(allSuccess ? "success" : allFailed ? "error" : "partial")
    } else {
      setOverallStatus(allFailed ? "error" : "partial")
    }
  }

  const runAllScripts = async () => {
    for (const script of scripts) {
      await runScript(script.id, script.file)
      // Small delay between scripts
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Database Setup</h1>
          <p className="text-muted-foreground mt-2">
            Run these scripts to set up your Supabase database tables and seed initial data.
          </p>
        </div>
        <Database className="h-12 w-12 text-[#dd2a1b]" />
      </div>

      {/* Overall Status */}
      {overallStatus !== "pending" && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {overallStatus === "success" && <CheckCircle className="h-5 w-5 text-green-600" />}
              {overallStatus === "error" && <AlertCircle className="h-5 w-5 text-red-600" />}
              {overallStatus === "partial" && <AlertCircle className="h-5 w-5 text-yellow-600" />}
              Setup Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {overallStatus === "success" && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  All database tables have been created successfully. Your application is ready to use.
                </AlertDescription>
              </Alert>
            )}
            {overallStatus === "error" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Setup Failed</AlertTitle>
                <AlertDescription>
                  There were errors during the database setup. Please check the details below.
                </AlertDescription>
              </Alert>
            )}
            {overallStatus === "partial" && (
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertTitle>Partial Success</AlertTitle>
                <AlertDescription>
                  Some scripts executed successfully, but others had errors. Review the details below.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            {overallStatus === "success" && (
              <Button asChild>
                <Link href="/admin">
                  Go to Admin Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
            {(overallStatus === "error" || overallStatus === "partial") && (
              <Button variant="outline" onClick={runAllScripts}>
                Retry All Scripts
              </Button>
            )}
          </CardFooter>
        </Card>
      )}

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Run All Scripts</CardTitle>
            <CardDescription>Execute all database setup scripts in sequence</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              This will create all required tables and seed initial data in your Supabase database.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={runAllScripts}
              disabled={Object.values(isLoading).some(Boolean)}
              className="bg-[#dd2a1b] hover:bg-[#c02419]"
            >
              {Object.values(isLoading).some(Boolean) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Run All Scripts
            </Button>
          </CardFooter>
        </Card>

        {scripts.map((script) => (
          <Card key={script.id}>
            <CardHeader>
              <CardTitle>{script.name}</CardTitle>
              <CardDescription>Execute {script.file}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">{script.description}</p>
              {results[script.id] && (
                <Alert variant={results[script.id].success ? "default" : "destructive"} className="mb-4">
                  {results[script.id].success ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>{results[script.id].success ? "Success" : "Error"}</AlertTitle>
                  <AlertDescription>{results[script.id].message}</AlertDescription>
                </Alert>
              )}
              {results[script.id]?.details && (
                <details className="mt-2">
                  <summary className="text-sm text-gray-500 cursor-pointer">View Details</summary>
                  <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-60">
                    {JSON.stringify(results[script.id].details, null, 2)}
                  </pre>
                </details>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={() => runScript(script.id, script.file)} disabled={isLoading[script.id]}>
                {isLoading[script.id] && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Run Script
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" asChild>
          <Link href="/test-connection">Test Connection</Link>
        </Button>
      </div>
    </div>
  )
}
