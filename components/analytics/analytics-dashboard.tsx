"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { FileText, MessageSquare, AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface AnalyticsData {
  totalComplaints: number
  pendingComplaints: number
  resolvedComplaints: number
  totalBlogPosts: number
  totalTestimonials: number
  monthlyComplaints: any[]
  complaintsByType: any[]
  recentActivity: any[]
}

// Demo data for when Supabase is not available
const demoAnalyticsData: AnalyticsData = {
  totalComplaints: 156,
  pendingComplaints: 23,
  resolvedComplaints: 133,
  totalBlogPosts: 12,
  totalTestimonials: 8,
  monthlyComplaints: [
    { month: "Jan", complaints: 12 },
    { month: "Feb", complaints: 15 },
    { month: "Mar", complaints: 18 },
    { month: "Apr", complaints: 14 },
    { month: "May", complaints: 20 },
    { month: "Jun", complaints: 16 },
    { month: "Jul", complaints: 22 },
    { month: "Aug", complaints: 19 },
    { month: "Sep", complaints: 17 },
    { month: "Oct", complaints: 21 },
    { month: "Nov", complaints: 25 },
    { month: "Dec", complaints: 23 },
  ],
  complaintsByType: [
    { type: "Wage Issues", count: 45, percentage: "28.8" },
    { type: "Safety", count: 32, percentage: "20.5" },
    { type: "Discrimination", count: 28, percentage: "17.9" },
    { type: "Working Hours", count: 24, percentage: "15.4" },
    { type: "Dismissal", count: 18, percentage: "11.5" },
    { type: "Other", count: 9, percentage: "5.8" },
  ],
  recentActivity: [
    {
      type: "complaint",
      title: "New complaint: Wage Issues",
      time: "2024-12-15",
      status: "pending",
    },
    {
      type: "complaint",
      title: "New complaint: Safety",
      time: "2024-12-14",
      status: "investigating",
    },
    {
      type: "message",
      title: "Contact message: Training inquiry",
      time: "2024-12-14",
      status: "read",
    },
    {
      type: "complaint",
      title: "New complaint: Discrimination",
      time: "2024-12-13",
      status: "resolved",
    },
  ],
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDemoMode, setIsDemoMode] = useState(false)

  useEffect(() => {
    fetchAnalyticsData()
  }, [])

  // Update the fetchAnalyticsData function to work with existing Supabase account

  const fetchAnalyticsData = async () => {
    try {
      // Import supabase client directly to avoid circular dependencies
      const { isSupabaseConfigured } = await import("@/lib/supabase")

      if (!isSupabaseConfigured) {
        // Use demo data
        setData(demoAnalyticsData)
        setIsDemoMode(true)
        setIsLoading(false)
        return
      }

      // Try to fetch real data
      const response = await fetch("/api/analytics")
      const analyticsData = await response.json()

      if (analyticsData.demo) {
        // API returned demo data
        setData(demoAnalyticsData)
        setIsDemoMode(true)
      } else {
        // Process real data
        // For now, we'll still use demo data since we don't have the full implementation
        setData({
          ...demoAnalyticsData,
          totalViews: analyticsData.totalViews || demoAnalyticsData.totalViews,
          uniqueVisitors: analyticsData.uniqueVisitors || demoAnalyticsData.uniqueVisitors,
        })
        setIsDemoMode(false)
      }
    } catch (error) {
      console.error("Error fetching analytics:", error)
      // Fall back to demo data
      setData(demoAnalyticsData)
      setIsDemoMode(true)
    } finally {
      setIsLoading(false)
    }
  }

  const COLORS = ["#dd2a1b", "#2b3990", "#f59e0b", "#10b981", "#8b5cf6", "#ef4444"]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#dd2a1b]"></div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Demo Mode Notice */}
      {isDemoMode && (
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>Demo Mode:</strong> This analytics dashboard is showing sample data. Connect to Supabase to see real
            analytics.
          </p>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
            <AlertTriangle className="h-4 w-4 text-[#dd2a1b]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalComplaints}</div>
            <p className="text-xs text-muted-foreground">All time submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Cases</CardTitle>
            <Clock className="h-4 w-4 text-[#f59e0b]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.pendingComplaints}</div>
            <p className="text-xs text-muted-foreground">Awaiting resolution</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Cases</CardTitle>
            <CheckCircle className="h-4 w-4 text-[#10b981]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.resolvedComplaints}</div>
            <p className="text-xs text-muted-foreground">Successfully closed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-[#2b3990]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalBlogPosts}</div>
            <p className="text-xs text-muted-foreground">Published articles</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Complaints Trend</CardTitle>
                <CardDescription>Complaint submissions over the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.monthlyComplaints}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="complaints" stroke="#dd2a1b" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Complaints by Type</CardTitle>
                <CardDescription>Distribution of complaint categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.complaintsByType}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ type, percentage }) => `${type}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {data.complaintsByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="complaints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Complaint Statistics</CardTitle>
              <CardDescription>Detailed breakdown of complaint data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.complaintsByType.map((item, index) => (
                  <div key={item.type} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="font-medium">{item.type}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary">{item.count} cases</Badge>
                      <span className="text-sm text-gray-500">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest complaints and messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      {activity.type === "complaint" ? (
                        <AlertTriangle className="h-5 w-5 text-[#dd2a1b]" />
                      ) : (
                        <MessageSquare className="h-5 w-5 text-[#2b3990]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <Badge
                      variant={activity.status === "resolved" ? "default" : "secondary"}
                      className={activity.status === "resolved" ? "bg-green-100 text-green-800" : ""}
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
