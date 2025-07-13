import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protect admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
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
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*"],
}
