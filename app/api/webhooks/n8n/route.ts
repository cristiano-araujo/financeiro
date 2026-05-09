import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    return NextResponse.json({ 
      success: true, 
      message: "Webhook received successfully",
      receivedAt: new Date().toISOString()
    })
  } catch (error: any) {
    console.error("Webhook Error:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}