import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { event, data } = await request.json()

    // Check if Supabase is configured
    if (!isSupabaseConfigured) {
      // Demo mode - just return success
      return NextResponse.json({ success: true, message: "Analytics tracked (demo mode)" })
    }

    // Check if admin client is available
    if (!supabaseAdmin) {
      console.debug("Admin client not available, skipping analytics")
      return NextResponse.json({ success: true, message: "Analytics skipped (no admin client)" })
    }

    // Handle different event types with appropriate tables
    if (event === "page_view") {
      try {
        // Try to insert into page_views table first
        const { error: pageViewError } = await supabaseAdmin.from("page_views").insert({
          page_path: data.path,
          user_ip: request.ip || request.headers.get("x-forwarded-for") || "unknown",
          user_agent: request.headers.get("user-agent"),
          referrer: data.referrer || null,
          viewed_at: new Date().toISOString(),
        })

        // If page_views table doesn't exist, try analytics_events
        if (pageViewError && pageViewError.code === "42P01") {
          console.debug("page_views table not found, using analytics_events")
          const { error: analyticsError } = await supabaseAdmin.from("analytics_events").insert({
            event_type: event,
            event_data: data,
            user_agent: request.headers.get("user-agent"),
            ip_address: request.ip || request.headers.get("x-forwarded-for") || "unknown",
            created_at: new Date().toISOString(),
          })

          if (analyticsError) {
            console.error("Analytics fallback error:", analyticsError)
          }
        } else if (pageViewError) {
          console.error("Page view tracking error:", pageViewError)
        }
      } catch (error) {
        console.error("Page view tracking exception:", error)
      }
    } else if (event === "search") {
      try {
        // Try to insert into search_logs table first
        const { error: searchError } = await supabaseAdmin.from("search_logs").insert({
          query: data.query,
          results_count: data.resultsCount || 0,
          user_ip: request.ip || request.headers.get("x-forwarded-for") || "unknown",
          searched_at: new Date().toISOString(),
        })

        // If search_logs table doesn't exist, try analytics_events
        if (searchError && searchError.code === "42P01") {
          console.debug("search_logs table not found, using analytics_events")
          const { error: analyticsError } = await supabaseAdmin.from("analytics_events").insert({
            event_type: event,
            event_data: data,
            user_agent: request.headers.get("user-agent"),
            ip_address: request.ip || request.headers.get("x-forwarded-for") || "unknown",
            created_at: new Date().toISOString(),
          })

          if (analyticsError) {
            console.error("Analytics fallback error:", analyticsError)
          }
        } else if (searchError) {
          console.error("Search tracking error:", searchError)
        }
      } catch (error) {
        console.error("Search tracking exception:", error)
      }
    } else {
      // Generic analytics events
      try {
        const { error } = await supabaseAdmin.from("analytics_events").insert({
          event_type: event,
          event_data: data,
          user_agent: request.headers.get("user-agent"),
          ip_address: request.ip || request.headers.get("x-forwarded-for") || "unknown",
          created_at: new Date().toISOString(),
        })

        if (error) {
          console.error("Analytics event tracking error:", error)
        }
      } catch (error) {
        console.error("Analytics event tracking exception:", error)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics API error:", error)
    // Always return success to prevent breaking the app
    return NextResponse.json({ success: true, message: "Analytics failed silently" })
  }
}

export async function GET() {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured || !supabaseAdmin) {
      // Return demo data
      return NextResponse.json({
        pageViews: [
          { date: "2024-12-01", views: 245 },
          { date: "2024-12-02", views: 312 },
          { date: "2024-12-03", views: 189 },
          { date: "2024-12-04", views: 267 },
          { date: "2024-12-05", views: 298 },
        ],
        topPages: [
          { path: "/", views: 1234 },
          { path: "/services", views: 567 },
          { path: "/about", views: 432 },
          { path: "/contact", views: 321 },
          { path: "/blog", views: 234 },
        ],
        totalViews: 2788,
        uniqueVisitors: 1456,
        demo: true,
      })
    }

    // Try to get analytics data from database
    try {
      // First check if analytics_events table exists
      const { data: events, error } = await supabaseAdmin
        .from("analytics_events")
        .select("*")
        .eq("event_type", "page_view")
        .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
        .limit(100)

      if (error && error.code !== "42P01") {
        console.error("Analytics fetch error:", error)
        throw new Error("Analytics query failed")
      }

      // Process the data (simplified example)
      const totalViews = events?.length || 0
      const uniqueVisitors = new Set(events?.map((e) => e.ip_address)).size || 0

      return NextResponse.json({
        pageViews: [], // Process events into daily views
        topPages: [], // Process events into top pages
        totalViews,
        uniqueVisitors,
        demo: false,
      })
    } catch (error) {
      console.error("Analytics data fetch error:", error)
      // Return demo data as fallback
      return NextResponse.json({
        pageViews: [
          { date: "2024-12-01", views: 245 },
          { date: "2024-12-02", views: 312 },
        ],
        topPages: [
          { path: "/", views: 1234 },
          { path: "/services", views: 567 },
        ],
        totalViews: 557,
        uniqueVisitors: 324,
        demo: true,
      })
    }
  } catch (error) {
    console.error("Analytics GET error:", error)
    return NextResponse.json({ error: "Internal server error", demo: true }, { status: 500 })
  }
}
