import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Check if Supabase is configured
  const isSupabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://demo.supabase.co"

  // Protect admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    // In demo mode, allow access
    if (!isSupabaseConfigured) {
      return res
    }

    try {
      const supabase = createMiddlewareClient({ req, res })

      // Refresh session if expired
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        return NextResponse.redirect(new URL("/login", req.url))
      }

      // Check if user is admin
      const { data: adminData } = await supabase
        .from("admin_users")
        .select("role")
        .eq("email", session.user.email)
        .single()

      if (!adminData) {
        return NextResponse.redirect(new URL("/login", req.url))
      }
    } catch (error) {
      console.error("Middleware auth error:", error)
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*"],
}
