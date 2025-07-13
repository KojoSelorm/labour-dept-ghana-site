import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check if email already exists
    const { data: existing } = await supabaseAdmin
      .from("newsletter_subscribers")
      .select("id")
      .eq("email", email)
      .single()

    if (existing) {
      return NextResponse.json({ error: "Email already subscribed" }, { status: 400 })
    }

    // Add new subscriber
    const { error } = await supabaseAdmin.from("newsletter_subscribers").insert({ email, name })

    if (error) throw error

    // Send welcome email
    await fetch(`${request.nextUrl.origin}/api/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        subject: "Welcome to Labour Department Newsletter",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #dd2a1b; color: white; padding: 20px; text-align: center;">
              <h1>Welcome to Our Newsletter!</h1>
            </div>
            <div style="padding: 20px;">
              <h2>Thank you for subscribing!</h2>
              <p>You'll now receive the latest updates about labour laws, employment opportunities, and important announcements from the Ghana Labour Department.</p>
              <p>Stay informed and stay protected!</p>
              <p>Best regards,<br/>Ghana Labour Department</p>
            </div>
          </div>
        `,
        type: "newsletter_welcome",
      }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}
