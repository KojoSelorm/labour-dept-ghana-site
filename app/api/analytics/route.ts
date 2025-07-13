import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { event, data } = await request.json()

    switch (event) {
      case "page_view":
        await supabaseAdmin.from("page_views").insert({
          page_path: data.path,
          user_ip: request.ip || "unknown",
          user_agent: request.headers.get("user-agent"),
          referrer: data.referrer,
        })
        break

      case "search":
        await supabaseAdmin.from("search_logs").insert({
          query: data.query,
          results_count: data.resultsCount,
          user_ip: request.ip || "unknown",
        })
        break

      default:
        return NextResponse.json({ error: "Unknown event type" }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ error: "Failed to log analytics" }, { status: 500 })
  }
}
