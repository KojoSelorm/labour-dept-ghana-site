import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 })
    }

    // Upload file to Supabase Storage
    const fileName = `documents/${Date.now()}-${file.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("labour-documents")
      .upload(fileName, file)

    if (uploadError) {
      console.error("Upload error:", uploadError)
      return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
    }

    // Store document metadata in database
    const { data: dbData, error: dbError } = await supabase.from("documents").insert({
      filename: file.name,
      file_path: uploadData.path,
      file_size: file.size,
      uploaded_at: new Date().toISOString(),
      processed: false,
    })

    if (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json({ error: "Failed to save document metadata" }, { status: 500 })
    }

    // Here you would typically process the PDF content for the AI knowledge base
    // For now, we'll just mark it as processed
    await supabase.from("documents").update({ processed: true }).eq("file_path", uploadData.path)

    return NextResponse.json({
      success: true,
      message: "Document uploaded and processed successfully",
    })
  } catch (error) {
    console.error("Document upload error:", error)
    return NextResponse.json({ error: "Failed to process document upload" }, { status: 500 })
  }
}
