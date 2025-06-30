"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2, Database, ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

export default function QuickSetupPage() {
  const [isCreatingTables, setIsCreatingTables] = useState(false)
  const [isSeedingData, setIsSeedingData] = useState(false)
  const [tablesResult, setTablesResult] = useState<any>(null)
  const [dataResult, setDataResult] = useState<any>(null)
  const [setupComplete, setSetupComplete] = useState(false)

  const createTables = async () => {
    setIsCreatingTables(true)
    try {
      const response = await fetch("/api/create-tables-direct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      const result = await response.json()
      setTablesResult(result)

      if (result.success) {
        // Automatically proceed to seed data
        await seedData()
      }
    } catch (error: any) {
      setTablesResult({ success: false, error: error.message })
    } finally {
      setIsCreatingTables(false)
    }
  }

  const seedData = async () => {
    setIsSeedingData(true)
    try {
      const response = await fetch("/api/seed-initial-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      const result = await response.json()
      setDataResult(result)

      if (result.success) {
        setSetupComplete(true)
      }
    } catch (error: any) {
      setDataResult({ success: false, error: error.message })
    } finally {
      setIsSeedingData(false)
    }
  }

  const isLoading = isCreatingTables || isSeedingData

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Database className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#231f20] mb-2">Quick Database Setup</h1>
          <p className="text-gray-600">Create all required tables and seed initial data in one click</p>
        </div>

        {/* Setup Complete */}
        {setupComplete && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <CheckCircle className="h-6 w-6 mr-2" />
                Setup Complete!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-4">
                Your database has been successfully set up with all required tables and initial data.
              </p>
              <div className="flex gap-4">
                <Button asChild className="bg-[#dd2a1b] hover:bg-[#c02419]">
                  <Link href="/admin">
                    Go to Admin Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/database-status">View Database Status</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Setup Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Database Setup Process</CardTitle>
            <CardDescription>
              This will create all 11 required tables and populate them with initial data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Step 1: Create Tables */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      tablesResult?.success
                        ? "bg-green-100 text-green-600"
                        : tablesResult && !tablesResult.success
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {isCreatingTables ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : tablesResult?.success ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : tablesResult && !tablesResult.success ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : (
                      "1"
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">Create Database Tables</h3>
                    <p className="text-sm text-gray-500">Create all 11 required tables</p>
                  </div>
                </div>
                {tablesResult?.success && <CheckCircle className="h-5 w-5 text-green-600" />}
              </div>

              {/* Step 2: Seed Data */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      dataResult?.success
                        ? "bg-green-100 text-green-600"
                        : dataResult && !dataResult.success
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {isSeedingData ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : dataResult?.success ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : dataResult && !dataResult.success ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : (
                      "2"
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">Seed Initial Data</h3>
                    <p className="text-sm text-gray-500">Add sample content and admin user</p>
                  </div>
                </div>
                {dataResult?.success && <CheckCircle className="h-5 w-5 text-green-600" />}
              </div>
            </div>

            {/* Results */}
            {tablesResult && (
              <Alert
                className={`mt-4 ${tablesResult.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
              >
                {tablesResult.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertTitle>Table Creation {tablesResult.success ? "Successful" : "Failed"}</AlertTitle>
                <AlertDescription>{tablesResult.message}</AlertDescription>
              </Alert>
            )}

            {dataResult && (
              <Alert
                className={`mt-4 ${dataResult.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
              >
                {dataResult.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertTitle>Data Seeding {dataResult.success ? "Successful" : "Failed"}</AlertTitle>
                <AlertDescription>{dataResult.message}</AlertDescription>
              </Alert>
            )}

            {/* Action Button */}
            {!setupComplete && (
              <div className="mt-6">
                <Button onClick={createTables} disabled={isLoading} className="w-full bg-[#dd2a1b] hover:bg-[#c02419]">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isCreatingTables ? "Creating Tables..." : "Seeding Data..."}
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Start Database Setup
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="text-center space-x-4">
          <Button variant="outline" asChild>
            <Link href="/database-status">Check Current Status</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/test-connection">Test Connection</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
