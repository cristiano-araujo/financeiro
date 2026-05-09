import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Fetch distinct sessions with latest message
    const { data: sessions, error: sessionsError } = await supabaseAdmin
      .from('whatsapp_messages3')
      .select('session_id, message, created_at')
      .order('created_at', { ascending: false })

    if (sessionsError) {
      console.error('Error fetching sessions:', sessionsError)
      return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 })
    }

    // Group by session_id and get latest message for each
    const chatMap = new Map()
    sessions.forEach(row => {
      if (!chatMap.has(row.session_id)) {
        chatMap.set(row.session_id, {
          id: row.session_id,
          client: `Cliente ${row.session_id.slice(-4)}`, // Placeholder name
          lastMessage: row.message,
          time: new Date(row.created_at).toLocaleString('pt-BR'),
          status: 'active',
          aiTone: 'Profissional',
          unread: true,
          lastUpdate: new Date(row.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        })
      }
    })

    const chats = Array.from(chatMap.values())

    return NextResponse.json(chats)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}