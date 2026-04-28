import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, summary, businessId } = body

    if (!name || !phone || !businessId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // 1. Check if client exists or create new one
    let clientId: string

    const { data: existingClient, error: clientError } = await supabase
      .from('clients')
      .select('id')
      .eq('phone', phone)
      .eq('business_id', businessId)
      .single()

    if (existingClient) {
      clientId = existingClient.id
      // Update summary if exists
      if (summary) {
        await supabase
          .from('clients')
          .update({ ai_summary: summary })
          .eq('id', clientId)
      }
    } else {
      const { data: newClient, error: insertError } = await supabase
        .from('clients')
        .insert([{
          name,
          phone,
          business_id: businessId,
          ai_summary: summary || "Novo lead via WhatsApp"
        }])
        .select()
        .single()

      if (insertError) throw insertError
      clientId = newClient.id
    }

    // 2. Create the Kanban Card (Lead)
    const { error: appointmentError } = await supabase
      .from('appointments')
      .insert([{
        business_id: businessId,
        client_id: clientId,
        status: 'lead',
        ai_summary: summary || "Conversa iniciada via WhatsApp",
        notes: "Lead gerado automaticamente pelo n8n"
      }])

    if (appointmentError) throw appointmentError

    return NextResponse.json({ 
      success: true, 
      message: "Lead processed and added to Kanban",
      clientId 
    })

  } catch (error: any) {
    console.error("Webhook Error:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
