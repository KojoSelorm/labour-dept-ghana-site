"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, Loader2, Database, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SetupSuccessPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [setupStatus, setSetupStatus] = useState<{
    success: boolean
    isComplete: boolean
    tables: string[]
    missingTables: string[]
    dataChecks: Array<{
      table: string
      success: boolean
      count: number
      error?: string
    }>
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkSetup = async () => {
      try {
        const response = await fetch("/api/verify-setup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`)
        }

        const data = await response.json()

        if (data.success) {
          setSetupStatus(data)
        } else {
          setError(data.error || "Failed to verify setup")
        }
      } catch (err: any) {
        setError(err.message || "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    checkSetup()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Setup Status</h1>
          <p className="text-muted-foreground mt-2">Checking your Supabase database configuration</p>
        </div>
        <Database className="h-12 w-12 text-[#dd2a1b]" />
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 className="h-10 w-10 text-[#dd2a1b] animate-spin mb-4" />
              <p className="text-lg font-medium">Checking database setup...</p>
            </div>
          </CardContent>
        </Card>
      ) : error ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              Error Checking Setup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertTitle>Something went wrong</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/test-connection">Test Connection</Link>
            </Button>
          </CardFooter>
        </Card>
      ) : setupStatus ? (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {setupStatus.isComplete ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-yellow-600" />
                )}
                Setup Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {setupStatus.isComplete ? (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>
                    Your database is fully configured with all required tables and sample data.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="bg-yellow-50 border-yellow-200">
                  <AlertTitle>Setup Incomplete</AlertTitle>
                  <AlertDescription>
                    Some tables or data are missing. Please complete the database setup.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex gap-4">
              {setupStatus.isComplete ? (
                <Button asChild>
                  <Link href="/admin">
                    Go to Admin Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button asChild>
                  <Link href="/setup-database">
                    Complete Setup <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link href="/test-connection">Test Connection</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Tables Status */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Database Tables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Found Tables ({setupStatus.tables.length})</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {setupStatus.tables.map((table) => (
                      <div
                        key={table}
                        className="bg-green-50 text-green-800 px-3 py-1 rounded-md text-sm flex items-center"
                      >
                        <CheckCircle className="h-3 w-3 mr-2" />
                        {table}
                      </div>
                    ))}
                  </div>
                </div>

                {setupStatus.missingTables.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Missing Tables ({setupStatus.missingTables.length})</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {setupStatus.missingTables.map((table) => (
                        <div
                          key={table}
                          className="bg-red-50 text-red-800 px-3 py-1 rounded-md text-sm flex items-center"
                        >
                          <XCircle className="h-3 w-3 mr-2" />
                          {table}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Data Status */}
          <Card>
            <CardHeader>
              <CardTitle>Sample Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {setupStatus.dataChecks.map((check) => (
                  <div key={check.table} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      {check.success && check.count > 0 ? (
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600 mr-2" />
                      )}
                      <span>{check.table}</span>
                    </div>
                    <div className="text-sm">
                      {check.success ? (
                        <span className={check.count > 0 ? "text-green-600" : "text-yellow-600"}>
                          {check.count} records
                        </span>
                      ) : (
                        <span className="text-red-600">Error: {check.error}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : null}
    </div>
  )
}
