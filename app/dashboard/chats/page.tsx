"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Bot,
  User,
  Search,
  MessageCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Send,
  MoreVertical,
  ShieldCheck,
  Zap
} from "lucide-react"

interface Chat {
  id: string
  client: string
  lastMessage: string
  time: string
  status: string
  aiTone: string
  unread: boolean
  lastUpdate: string
}

interface Message {
  text: string
  timestamp: string
  isAI: boolean
}

export default function ChatsPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChat, setActiveChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchChats()
  }, [])

  useEffect(() => {
    if (activeChat) {
      fetchMessages(activeChat.id)
    }
  }, [activeChat])

  const fetchChats = async () => {
    try {
      const response = await fetch('/api/chats')
      if (response.ok) {
        const data = await response.json()
        setChats(data)
        if (data.length > 0 && !activeChat) {
          setActiveChat(data[0])
        }
      }
    } catch (error) {
      console.error('Error fetching chats:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/chats/${sessionId}`)
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Conversas IA
          </h2>
          <div className="text-muted-foreground font-medium flex items-center gap-2">
            Monitoramento em tempo real do Agente 
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Beatriz Online
            </Badge>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 bg-muted/30 p-2 rounded-2xl border">
          <div className="flex items-center gap-2 px-3">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest">Nível de IA: Turbo</span>
          </div>
        </div>
      </div>

      <div className="flex-1 grid gap-6 lg:grid-cols-3 overflow-hidden">
        {/* Sidebar de Chats */}
        <Card className="lg:col-span-1 shadow-xl border-primary/5 flex flex-col overflow-hidden">
          <CardHeader className="pb-3 border-b bg-muted/20">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar por cliente ou mensagem..." className="pl-9 h-10 bg-background" />
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto flex-1">
            <div className="divide-y divide-primary/5">
              {loading ? (
                <div className="p-5 text-center text-muted-foreground">Carregando conversas...</div>
              ) : chats.length === 0 ? (
                <div className="p-5 text-center text-muted-foreground">Nenhuma conversa encontrada</div>
              ) : (
                chats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setActiveChat(chat)}
                    className={`w-full p-5 flex items-start gap-4 hover:bg-primary/5 transition-all text-left relative group ${activeChat?.id === chat.id ? "bg-primary/5" : ""}`}
                  >
                    {chat.unread && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-primary rounded-r-full shadow-[2px_0_10px_rgba(var(--primary),0.5)]" />}
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-black shadow-inner shrink-0 group-hover:scale-110 transition-transform">
                      {chat.client.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`font-bold text-sm ${chat.unread ? "text-foreground" : "text-muted-foreground"}`}>{chat.client}</span>
                        <span className="text-[10px] text-muted-foreground font-medium">{chat.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 italic leading-relaxed">
                        "{chat.lastMessage}"
                      </p>
                      <div className="mt-2.5 flex items-center gap-2">
                        <Badge variant="outline" className="text-[9px] py-0 h-4 bg-background/50 border-primary/10 font-black tracking-widest text-primary/80 uppercase">
                          Tom: {chat.aiTone}
                        </Badge>
                        {chat.status === "active" && (
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Área do Chat */}
        <Card className="lg:col-span-2 shadow-2xl border-primary/10 flex flex-col relative overflow-hidden group">
          {/* Fundo Decorativo */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
          <div className="absolute -right-20 -top-20 h-64 w-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          
            <CardHeader className="border-b bg-background/95 backdrop-blur-md z-10 py-4 shadow-sm">
             <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-black shadow-inner">
                   {activeChat?.client.charAt(0) || '?'}
                 </div>
                 <div>
                   <div className="flex items-center gap-2">
                     <CardTitle className="text-lg font-black tracking-tight">{activeChat?.client || 'Carregando...'}</CardTitle>
                     <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[9px] uppercase font-black tracking-widest h-4">Ativo</Badge>
                   </div>
                   <CardDescription className="flex items-center gap-1.5 text-xs font-medium">
                     <Bot className="h-3.5 w-3.5 text-primary" />
                     Agente Beatriz processando via WhatsApp
                   </CardDescription>
                 </div>
               </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2 h-9 border-primary/20 hover:bg-primary/5">
                  <ShieldCheck className="h-4 w-4" />
                  Regras IA
                </Button>
                <Button variant="default" size="sm" className="gap-2 h-9 shadow-lg shadow-primary/20">
                  <ExternalLink className="h-4 w-4" />
                  Assumir
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

           <CardContent className="flex-1 p-8 space-y-8 overflow-y-auto z-10 scrollbar-thin scrollbar-thumb-primary/10">
             {messages.length > 0 && (
               <div className="flex flex-col items-center mb-4">
                 <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest px-4 py-1 bg-muted/30">
                   Conversa
                 </Badge>
               </div>
             )}

             {messages.map((message, index) => (
               message.isAI ? (
                 <div key={index} className="flex flex-col items-end gap-2 max-w-[85%] ml-auto animate-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                   <div className="bg-primary text-primary-foreground p-4 rounded-3xl rounded-tr-none text-sm shadow-xl border border-primary/20 leading-relaxed relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-2 opacity-10">
                       <Sparkles className="h-10 w-10" />
                     </div>
                     {message.text}
                   </div>
                   <span className="text-[10px] text-primary font-black uppercase tracking-widest flex items-center gap-1.5 mr-2">
                     <Bot className="h-3.5 w-3.5" /> IA Beatriz • {new Date(message.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                   </span>
                 </div>
               ) : (
                 <div key={index} className="flex flex-col items-start gap-2 max-w-[85%] animate-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                   <div className="bg-muted/80 backdrop-blur-sm p-4 rounded-3xl rounded-tl-none text-sm shadow-sm border border-muted-foreground/10 leading-relaxed">
                     {message.text}
                   </div>
                   <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest ml-2">Cliente • {new Date(message.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                 </div>
               )
             ))}

             {messages.length === 0 && !loading && (
               <div className="flex flex-col items-center pt-4">
                 <div className="flex items-center gap-3 bg-primary/5 border border-primary/10 px-6 py-3 rounded-full shadow-inner">
                   <Sparkles className="h-4 w-4 text-primary" />
                   <span className="text-xs font-black uppercase tracking-widest text-primary">Nenhuma mensagem ainda</span>
                 </div>
               </div>
             )}

             {messages.length > 0 && (
               <div className="flex flex-col items-center pt-4">
                 <div className="flex items-center gap-3 bg-primary/5 border border-primary/10 px-6 py-3 rounded-full shadow-inner animate-pulse">
                   <Sparkles className="h-4 w-4 text-primary" />
                   <span className="text-xs font-black uppercase tracking-widest text-primary">Aguardando Cliente...</span>
                 </div>
               </div>
             )}
           </CardContent>

          {/* Rodapé de Input (Bloqueado se IA ativa) */}
          <div className="p-6 border-t bg-background/95 backdrop-blur-md z-10">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Input 
                  placeholder="A IA está no controle deste atendimento..." 
                  className="h-12 pl-4 pr-12 rounded-2xl bg-muted/50 border-dashed border-primary/20 opacity-50 cursor-not-allowed" 
                  disabled 
                />
                <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 opacity-50" disabled>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              <Button size="icon" variant="outline" className="h-12 w-12 rounded-2xl border-primary/20 hover:bg-primary/5">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-[9px] text-center mt-3 text-muted-foreground uppercase font-black tracking-widest opacity-50 italic">
              Aviso: Assuma o chat para enviar mensagens manualmente.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
