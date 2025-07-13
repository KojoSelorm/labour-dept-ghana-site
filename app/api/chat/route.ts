import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

const SYSTEM_PROMPT = `You are an AI assistant for the Ghana Labour Department. You have comprehensive knowledge about:

1. Ghana Labour Act, 2003 (Act 651)
2. Labour Regulations, 2007 (L.I 1833)
3. Workmen's Compensation Act, 1987 (PNDCL 187)
4. ILO Conventions ratified by Ghana
5. Worker rights and employer obligations
6. Labour inspection procedures
7. Dispute resolution processes
8. Child labour laws and prevention
9. Workplace safety standards
10. Employment services and job placement
11. Skills training and development programs
12. Union formation and activities

You should provide accurate, helpful information about labour-related topics in Ghana. Always be professional, empathetic, and direct users to appropriate resources or contact information when needed.

If asked about topics outside labour and employment, politely redirect the conversation back to labour-related matters.

For urgent matters, always remind users they can call the Labour Department hotlines: 0800 600 300 or 0800 600 400.`

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      system: SYSTEM_PROMPT,
      prompt: message,
      maxTokens: 500,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to process your request. Please try again." }, { status: 500 })
  }
}
