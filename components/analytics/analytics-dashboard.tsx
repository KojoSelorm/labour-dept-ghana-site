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
import { supabase } from "@/lib/supabase"

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

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAnalyticsData()
  }, [])

  const fetchAnalyticsData = async () => {
    try {
      // Fetch complaints data
      const { data: complaints } = await supabase.from("complaints").select("*")

      const { data: blogPosts } = await supabase.from("blog_posts").select("id, created_at")

      const { data: testimonials } = await supabase.from("testimonials").select("id, created_at")

      const { data: contactMessages } = await supabase.from("contact_messages").select("*")

      // Process data
      const totalComplaints = complaints?.length || 0
      const pendingComplaints = complaints?.filter((c) => c.status === "pending").length || 0
      const resolvedComplaints = complaints?.filter((c) => c.status === "resolved").length || 0

      // Monthly complaints data
      const monthlyData = processMonthlyData(complaints || [])

      // Complaints by type
      const typeData = processComplaintsByType(complaints || [])

      // Recent activity
      const recentActivity = processRecentActivity(complaints || [], contactMessages || [])

      setData({
        totalComplaints,
        pendingComplaints,
        resolvedComplaints,
        totalBlogPosts: blogPosts?.length || 0,
        totalTestimonials: testimonials?.length || 0,
        monthlyComplaints: monthlyData,
        complaintsByType: typeData,
        recentActivity,
      })
    } catch (error) {
      console.error("Error fetching analytics:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const processMonthlyData = (complaints: any[]) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const currentYear = new Date().getFullYear()

    return months.map((month) => {
      const monthIndex = months.indexOf(month)
      const count = complaints.filter((c) => {
        const date = new Date(c.created_at)
        return date.getFullYear() === currentYear && date.getMonth() === monthIndex
      }).length

      return { month, complaints: count }
    })
  }

  const processComplaintsByType = (complaints: any[]) => {
    const types = complaints.reduce((acc, complaint) => {
      acc[complaint.complaint_type] = (acc[complaint.complaint_type] || 0) + 1
      return acc
    }, {})

    return Object.entries(types).map(([type, count]) => ({
      type,
      count,
      percentage: (((count as number) / complaints.length) * 100).toFixed(1),
    }))
  }

  const processRecentActivity = (complaints: any[], messages: any[]) => {
    const activities = [
      ...complaints.slice(-5).map((c) => ({
        type: "complaint",
        title: `New complaint: ${c.complaint_type}`,
        time: new Date(c.created_at).toLocaleDateString(),
        status: c.status,
      })),
      ...messages.slice(-5).map((m) => ({
        type: "message",
        title: `Contact message: ${m.subject}`,
        time: new Date(m.created_at).toLocaleDateString(),
        status: m.status,
      })),
    ]
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 10)

    return activities
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
