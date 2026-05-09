import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const sessionId = params.sessionId

    const { data: messages, error } = await supabaseAdmin
      .from('whatsapp_messages3')
      .select('message, created_at, role')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching messages:', error)
      return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
    }

    // Format messages for the chat UI
    const formattedMessages = messages.map(msg => ({
      text: msg.message,
      timestamp: msg.created_at,
      isAI: msg.role === 'assistant' || msg.role === 'ai'
    }))

    return NextResponse.json(formattedMessages)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}