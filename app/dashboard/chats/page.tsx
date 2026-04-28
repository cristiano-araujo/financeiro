"use client"

import { useState } from "react"
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
  Sparkles
} from "lucide-react"

const MOCK_CHATS = [
  {
    id: "1",
    client: "Carlos Magno",
    lastMessage: "A consulta está confirmada para amanhã às 10h?",
    time: "2 min atrás",
    status: "active",
    aiTone: "Amigável",
    unread: true
  },
  {
    id: "2",
    client: "Ana Beatriz",
    lastMessage: "Pode me enviar o endereço da clínica?",
    time: "15 min atrás",
    status: "active",
    aiTone: "Profissional",
    unread: false
  },
  {
    id: "3",
    client: "João Silva",
    lastMessage: "Infelizmente vou precisar desmarcar.",
    time: "1h atrás",
    status: "resolved",
    aiTone: "Empático",
    unread: false
  }
]

export default function ChatsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-700">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Conversas IA</h2>
        <p className="text-muted-foreground">
          Monitore em tempo real as interações da sua secretária virtual no WhatsApp.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1 shadow-md h-[calc(100vh-220px)] flex flex-col">
          <CardHeader className="pb-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar conversas..." className="pl-9" />
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto flex-1">
            <div className="divide-y">
              {MOCK_CHATS.map((chat) => (
                <button 
                  key={chat.id} 
                  className={`w-full p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors text-left relative ${chat.unread ? "bg-primary/5" : ""}`}
                >
                  {chat.unread && <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-full" />}
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                    {chat.client.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm truncate">{chat.client}</span>
                      <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1 italic">
                      "{chat.lastMessage}"
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Badge variant="outline" className="text-[9px] py-0 h-4 bg-muted/50">
                        IA: {chat.aiTone}
                      </Badge>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-md h-[calc(100vh-220px)] flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px] pointer-events-none" />
          <CardHeader className="border-b bg-background/80 backdrop-blur-sm z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  C
                </div>
                <div>
                  <CardTitle className="text-lg">Carlos Magno</CardTitle>
                  <CardDescription className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Atendimento ativo pela IA (Beatriz)
                  </CardDescription>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Assumir Chat
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-6 space-y-6 overflow-y-auto z-10">
            {/* Mensagem do Cliente */}
            <div className="flex flex-col items-start gap-2">
              <div className="bg-muted p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm shadow-sm">
                Olá! Gostaria de saber se tem algum horário livre para amanhã de manhã.
              </div>
              <span className="text-[10px] text-muted-foreground ml-1">Cliente • 10:02</span>
            </div>

            {/* Mensagem da IA */}
            <div className="flex flex-col items-end gap-2">
              <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-none max-w-[80%] text-sm shadow-md border border-primary/20">
                Olá Carlos! Tudo bem? Deixe-me verificar aqui na agenda da clínica... 
                <br /><br />
                Para amanhã temos disponíveis os horários de **09:30** e **11:00**. Algum desses fica bom para você?
              </div>
              <span className="text-[10px] text-primary font-bold flex items-center gap-1 mr-1">
                <Bot className="h-3 w-3" /> IA Beatriz • 10:02
              </span>
            </div>

            {/* Mensagem do Cliente */}
            <div className="flex flex-col items-start gap-2">
              <div className="bg-muted p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm shadow-sm">
                O das 10h não dá? Vi no site que tinha.
              </div>
              <span className="text-[10px] text-muted-foreground ml-1">Cliente • 10:03</span>
            </div>

            {/* Mensagem da IA */}
            <div className="flex flex-col items-end gap-2">
              <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-none max-w-[80%] text-sm shadow-md border border-primary/20">
                Ah, peço desculpas Carlos! Você tem razão, acabei de confirmar aqui e o horário das **10:00** ainda está vago. 
                <br /><br />
                Deseja que eu reserve esse horário para você?
              </div>
              <span className="text-[10px] text-primary font-bold flex items-center gap-1 mr-1">
                <Bot className="h-3 w-3" /> IA Beatriz • 10:03
              </span>
            </div>
            
            {/* Alerta de Pensamento da IA */}
            <div className="mx-auto flex items-center gap-2 bg-primary/5 border border-primary/10 px-4 py-2 rounded-full w-fit">
              <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
              <span className="text-[11px] text-primary font-medium">A IA está aguardando a resposta do cliente...</span>
            </div>
          </CardContent>
          <div className="p-4 border-t bg-muted/20 z-10">
            <div className="flex gap-2">
              <Input placeholder="Escreva uma mensagem para assumir o chat..." disabled />
              <Button disabled variant="secondary">Enviar</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
