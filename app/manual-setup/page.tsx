"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Copy, ExternalLink, CheckCircle, Database, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ManualSetupPage() {
  const [instructions, setInstructions] = useState<any>(null)
  const [copiedStep, setCopiedStep] = useState<number | null>(null)

  useEffect(() => {
    fetch("/api/manual-sql-setup", { method: "POST" })
      .then((res) => res.json())
      .then(setInstructions)
  }, [])

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text)
    setCopiedStep(step)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  if (!instructions) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Database className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#231f20] mb-2">Manual Database Setup</h1>
          <p className="text-gray-600">Follow these steps to manually create your database tables in Supabase</p>
        </div>

        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <AlertTitle>Why Manual Setup?</AlertTitle>
          <AlertDescription>
            The automated setup failed because your Supabase project needs the tables to be created manually first. This
            is a one-time setup that will enable all automated features afterward.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          {instructions.instructions.map((instruction: any, index: number) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-3">
                    <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                      {instruction.step}
                    </Badge>
                    <span>{instruction.title}</span>
                  </CardTitle>
                  {instruction.url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={instruction.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Supabase
                      </a>
                    </Button>
                  )}
                </div>
                <CardDescription>{instruction.description}</CardDescription>
              </CardHeader>
              {instruction.sql && (
                <CardContent>
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{instruction.sql}</code>
                    </pre>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 bg-gray-800 border-gray-600 text-gray-100 hover:bg-gray-700"
                      onClick={() => copyToClipboard(instruction.sql, instruction.step)}
                    >
                      {copiedStep === instruction.step ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">After Completing Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 mb-4">
              Once you've run all the SQL commands in your Supabase dashboard, come back and test your setup:
            </p>
            <div className="flex gap-4">
              <Button asChild className="bg-[#dd2a1b] hover:bg-[#c02419]">
                <Link href="/database-status">
                  Check Database Status <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/quick-setup">Try Automated Setup Again</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Alert>
            <AlertTitle>Need Help?</AlertTitle>
            <AlertDescription>
              If you encounter any issues during manual setup, you can contact support or try the automated setup again
              after creating the exec_sql function.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
