import { type NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()

    if (!supabase) {
      return NextResponse.json({ error: "Database connection not available" }, { status: 500 })
    }

    const body = await request.json()
    const {
      complainant_name,
      complainant_email,
      complainant_phone,
      company_name,
      complaint_type,
      description,
      anonymous,
    } = body

    // Validate required fields
    if (!complaint_type || !description) {
      return NextResponse.json({ error: "Complaint type and description are required" }, { status: 400 })
    }

    // If not anonymous, require name and email
    if (!anonymous && (!complainant_name || !complainant_email)) {
      return NextResponse.json({ error: "Name and email are required for non-anonymous complaints" }, { status: 400 })
    }

    // Generate reference number
    const referenceNumber = `LC-${Date.now().toString().slice(-8)}`

    // Prepare complaint data
    const complaintData = {
      complainant_name: anonymous ? null : complainant_name,
      complainant_email: anonymous ? null : complainant_email,
      complainant_phone: anonymous ? null : complainant_phone,
      company_name: company_name || null,
      complaint_type,
      description,
      status: "pending",
      priority: "medium",
      reference_number: referenceNumber,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Insert complaint into database
    const { data, error } = await supabase.from("complaints").insert([complaintData]).select().single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save complaint to database" }, { status: 500 })
    }

    // Send confirmation email if not anonymous
    if (!anonymous && complainant_email) {
      try {
        await sendConfirmationEmail(complainant_email, complainant_name, referenceNumber)
      } catch (emailError) {
        console.error("Email sending failed:", emailError)
        // Don't fail the request if email fails, just log it
      }
    }

    return NextResponse.json({
      success: true,
      message: "Complaint submitted successfully",
      referenceNumber,
      complaintId: data.id,
    })
  } catch (error) {
    console.error("Complaint submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient()

    if (!supabase) {
      return NextResponse.json({ error: "Database connection not available" }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let query = supabase
      .from("complaints")
      .select("*")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) {
      query = query.eq("status", status)
    }

    const { data, error, count } = await query

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch complaints" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      complaints: data,
      total: count,
      limit,
      offset,
    })
  } catch (error) {
    console.error("Complaints fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Helper function to send confirmation email
async function sendConfirmationEmail(email: string, name: string, referenceNumber: string) {
  // This would integrate with your email service (e.g., Resend, SendGrid, etc.)
  // For now, we'll just log it
  console.log(`Sending confirmation email to ${email} for complaint ${referenceNumber}`)

  // Example implementation with a hypothetical email service:
  /*
  const emailData = {
    to: email,
    subject: `Complaint Received - Reference: ${referenceNumber}`,
    html: `
      <h2>Complaint Confirmation</h2>
      <p>Dear ${name},</p>
      <p>We have received your complaint and assigned it reference number: <strong>${referenceNumber}</strong></p>
      <p>Our team will review your case within 2-3 business days and contact you with updates.</p>
      <p>Thank you for bringing this matter to our attention.</p>
      <p>Ghana Labour Department</p>
    `
  }
  
  await emailService.send(emailData)
  */
}
