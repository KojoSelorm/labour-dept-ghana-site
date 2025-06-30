"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Copy, ExternalLink, Key, Database, Shield, CheckCircle } from "lucide-react"

export default function SetupGuidePage() {
  const [copiedKey, setCopiedKey] = useState("")

  const copyToClipboard = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(keyName)
    setTimeout(() => setCopiedKey(""), 2000)
  }

  const currentEnvVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "Not set",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "❌ MISSING",
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Key className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#231f20] mb-2">Supabase Setup Guide</h1>
          <p className="text-gray-600">Complete your Supabase configuration to enable all features</p>
        </div>

        {/* Current Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-6 w-6 text-[#2b3990]" />
              <span>Current Environment Variables</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(currentEnvVars).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <code className="text-sm font-mono">{key}</code>
                    <p className="text-xs text-gray-500 mt-1">
                      {key === "NEXT_PUBLIC_SUPABASE_URL" && "Your Supabase project URL"}
                      {key === "NEXT_PUBLIC_SUPABASE_ANON_KEY" && "Public API key for client-side operations"}
                      {key === "SUPABASE_SERVICE_ROLE_KEY" && "Private key for server-side admin operations"}
                    </p>
                  </div>
                  <div className="text-right">
                    {value === "❌ MISSING" ? (
                      <Badge className="bg-red-100 text-red-800">Missing</Badge>
                    ) : value === "Not set" ? (
                      <Badge variant="secondary">Not Set</Badge>
                    ) : (
                      <Badge className="bg-green-100 text-green-800">Configured</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Missing Service Key Alert */}
        <Alert variant="destructive" className="mb-6">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Service Role Key Missing:</strong> The SUPABASE_SERVICE_ROLE_KEY is required for admin functions,
            database operations, and server-side features. Without it, most backend functionality won't work.
          </AlertDescription>
        </Alert>

        {/* Step-by-Step Guide */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="w-8 h-8 bg-[#dd2a1b] rounded-full flex items-center justify-center text-white font-bold">
                  1
                </span>
                <span>Access Your Supabase Project</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Go to your Supabase dashboard and select your project. You'll need to get the Service Role Key from the
                API settings.
              </p>
              <Button variant="outline" asChild>
                <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Supabase Dashboard
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="w-8 h-8 bg-[#dd2a1b] rounded-full flex items-center justify-center text-white font-bold">
                  2
                </span>
                <span>Navigate to API Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-gray-600">In your Supabase project:</p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 ml-4">
                  <li>Click on "Settings" in the left sidebar</li>
                  <li>Select "API" from the settings menu</li>
                  <li>Scroll down to find the "Project API keys" section</li>
                  <li>Look for the "service_role" key (it should be marked as "secret")</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="w-8 h-8 bg-[#dd2a1b] rounded-full flex items-center justify-center text-white font-bold">
                  3
                </span>
                <span>Copy the Service Role Key</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-gray-600">
                  Copy the <strong>service_role</strong> key (not the anon key). This key starts with "eyJ" and is much
                  longer than the anon key.
                </p>
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Important:</strong> The service_role key has full access to your database. Keep it secure
                    and never expose it in client-side code.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="w-8 h-8 bg-[#dd2a1b] rounded-full flex items-center justify-center text-white font-bold">
                  4
                </span>
                <span>Add to Environment Variables</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">Add the Service Role Key to your environment variables:</p>

                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400"># Add this to your .env.local file:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard("SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here", "env_example")
                      }
                      className="text-gray-400 hover:text-white"
                    >
                      {copiedKey === "env_example" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div>SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here</div>
                </div>

                <Alert>
                  <AlertDescription>
                    Replace "your_service_role_key_here" with the actual service_role key you copied from Supabase.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="w-8 h-8 bg-[#dd2a1b] rounded-full flex items-center justify-center text-white font-bold">
                  5
                </span>
                <span>Restart Your Development Server</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-gray-600">After adding the environment variable:</p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 ml-4">
                  <li>Stop your development server (Ctrl+C)</li>
                  <li>
                    Restart it with: <code className="bg-gray-100 px-2 py-1 rounded">npm run dev</code>
                  </li>
                  <li>Wait for the server to fully restart</li>
                  <li>Run the connection test again</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="w-8 h-8 bg-[#dd2a1b] rounded-full flex items-center justify-center text-white font-bold">
                  6
                </span>
                <span>Verify the Setup</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">Once you've added the Service Role Key and restarted:</p>
                <div className="flex space-x-4">
                  <Button asChild className="bg-[#dd2a1b] hover:bg-[#c02419]">
                    <a href="/test-connection">Run Connection Test</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/admin">Try Admin Dashboard</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Complete Environment File Example */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Complete .env.local Example</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400"># Complete environment file example:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(
                      `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Additional Supabase Keys (if available)
SUPABASE_JWT_SECRET=your_jwt_secret_here
SUPABASE_ANON_KEY=your_anon_key_here`,
                      "complete_env",
                    )
                  }
                  className="text-gray-400 hover:text-white"
                >
                  {copiedKey === "complete_env" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="space-y-1">
                <div className="text-gray-500"># Supabase Configuration</div>
                <div>NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co</div>
                <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here</div>
                <div className="text-yellow-400">SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here</div>
                <div className="mt-2 text-gray-500"># Additional Supabase Keys (if available)</div>
                <div>SUPABASE_JWT_SECRET=your_jwt_secret_here</div>
                <div>SUPABASE_ANON_KEY=your_anon_key_here</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <h4 className="font-semibold">Common Issues:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Key not working:</strong> Make sure you copied the service_role key, not the anon key
                </li>
                <li>
                  <strong>Still getting errors:</strong> Restart your development server completely
                </li>
                <li>
                  <strong>Environment not loading:</strong> Check that your .env.local file is in the project root
                </li>
                <li>
                  <strong>Permission errors:</strong> Verify your Supabase project has the correct RLS policies
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
