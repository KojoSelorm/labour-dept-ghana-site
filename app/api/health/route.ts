import { NextResponse } from "next/server"

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      status: "healthy",
      timestamp: new Date().toISOString(),
      message: "API is working correctly",
      environment: process.env.NODE_ENV || "unknown",
    })
  } catch (error: any) {
    console.error("Health check error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function POST() {
  return GET()
}
