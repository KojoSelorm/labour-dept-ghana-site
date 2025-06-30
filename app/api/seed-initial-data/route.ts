import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase-server"

export async function POST() {
  try {
    const supabaseAdmin = createServerClient()

    // Insert initial site content
    const siteContentData = [
      {
        section: "hero",
        key: "title",
        value: "Ministry of Employment and Labour Relations",
        type: "text",
      },
      {
        section: "hero",
        key: "subtitle",
        value: "Promoting decent work and social protection for all Ghanaians",
        type: "text",
      },
      {
        section: "contact",
        key: "phone",
        value: "+233 302 665 421",
        type: "text",
      },
      {
        section: "contact",
        key: "email",
        value: "info@melr.gov.gh",
        type: "text",
      },
    ]

    const { data: siteContent, error: siteContentError } = await supabaseAdmin
      .from("site_content")
      .upsert(siteContentData, { onConflict: "section,key" })

    // Insert sample blog posts
    const blogPosts = [
      {
        title: "New Labour Laws Come Into Effect",
        excerpt: "Important updates to Ghana's labour legislation that affect all workers and employers.",
        content: "The Ministry of Employment and Labour Relations announces significant updates to labour laws...",
        author: "Ministry Communications",
        category: "Policy Updates",
        featured: true,
      },
      {
        title: "Workplace Safety Guidelines Updated",
        excerpt: "Enhanced safety protocols to protect workers across all industries.",
        content: "New comprehensive workplace safety guidelines have been developed...",
        author: "Safety Department",
        category: "Safety",
        featured: false,
      },
    ]

    const { data: blogData, error: blogError } = await supabaseAdmin.from("blog_posts").upsert(blogPosts)

    // Insert sample testimonials
    const testimonials = [
      {
        name: "Kwame Asante",
        position: "Factory Worker",
        company: "Ghana Manufacturing Ltd",
        content: "The Ministry helped resolve my workplace dispute quickly and fairly.",
        rating: 5,
        featured: true,
        approved: true,
      },
      {
        name: "Akosua Mensah",
        position: "HR Manager",
        company: "Tech Solutions Ghana",
        content: "Excellent guidance on implementing new labour policies in our company.",
        rating: 5,
        featured: true,
        approved: true,
      },
    ]

    const { data: testimonialData, error: testimonialError } = await supabaseAdmin
      .from("testimonials")
      .upsert(testimonials)

    // Create initial admin user
    const adminUser = {
      username: "admin",
      email: "admin@labour.gov.gh",
      password_hash: "$2b$10$example_hash_here", // In real app, this would be properly hashed
      role: "admin",
      active: true,
    }

    const { data: adminData, error: adminError } = await supabaseAdmin
      .from("admin_users")
      .upsert([adminUser], { onConflict: "email" })

    const results = {
      siteContent: { success: !siteContentError, error: siteContentError?.message },
      blogPosts: { success: !blogError, error: blogError?.message },
      testimonials: { success: !testimonialError, error: testimonialError?.message },
      adminUser: { success: !adminError, error: adminError?.message },
    }

    const successCount = Object.values(results).filter((r) => r.success).length
    const totalCount = Object.keys(results).length

    return NextResponse.json({
      success: successCount === totalCount,
      message: `${successCount}/${totalCount} data sets inserted successfully`,
      results,
      details: {
        siteContentRecords: siteContentData.length,
        blogPostRecords: blogPosts.length,
        testimonialRecords: testimonials.length,
        adminUserRecords: 1,
      },
    })
  } catch (error: any) {
    console.error("Data seeding error:", error)
    return NextResponse.json({
      success: false,
      error: error.message,
      details: error,
    })
  }
}
