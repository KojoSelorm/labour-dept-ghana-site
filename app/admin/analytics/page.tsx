"use client"

import { useEffect, useState } from "react"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function AnalyticsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

      // Check if user is admin
      const { data: adminData } = await supabase
        .from("admin_users")
        .select("role")
        .eq("email", session.user.email)
        .single()

      if (!adminData) {
        router.push("/login")
        return
      }

      setIsAuthenticated(true)
    } catch (error) {
      console.error("Auth check error:", error)
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#dd2a1b]"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#231f20] mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor website performance and complaint statistics</p>
        </div>
        <AnalyticsDashboard />
      </div>
    </div>
  )
}
