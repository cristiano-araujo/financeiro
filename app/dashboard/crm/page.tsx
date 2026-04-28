"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Calendar, Clock, User, Phone, MoreHorizontal, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const columns = [
  {
    id: "pending",
    title: "Pendente / Lead",
    tasks: [
      { id: "1", client: "Marcelo Oliveira", service: "Consulta Médica", time: "10:00", phone: "(11) 99999-0001", intent: "Interesse em horário" },
      { id: "2", client: "Fernanda Costa", service: "Corte e Cor", time: "14:30", phone: "(11) 99999-0002", intent: "Dúvida sobre preço" },
    ],
  },
  {
    id: "confirmed",
    title: "Agendado",
    tasks: [
      { id: "3", client: "Roberto Silva", service: "Barba e Cabelo", time: "09:00", phone: "(11) 99999-0003", intent: "Confirmado via WhatsApp" },
    ],
  },
  {
    id: "completed",
    title: "Realizado",
    tasks: [
      { id: "4", client: "Juliana Santos", service: "Dermatologia", time: "08:00", phone: "(11) 99999-0004", intent: "Atendimento finalizado" },
    ],
  },
  {
    id: "follow-up",
    title: "Follow-up",
    tasks: [
      { id: "5", client: "André Luíz", service: "Revisão", time: "Há 2 dias", phone: "(11) 99999-0005", intent: "IA enviou lembrete" },
    ],
  },
]

export default function CRMPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">CRM Kanban</h2>
          <p className="text-muted-foreground">
            Gerencie seus leads e agendamentos processados pela IA.
          </p>
        </div>
        <Button className="gap-2">
          <Sparkles className="h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[calc(100vh-220px)] overflow-x-auto pb-4">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col gap-4 min-w-[300px]">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                {column.title}
                <Badge variant="secondary" className="rounded-full px-2 py-0 h-5">
                  {column.tasks.length}
                </Badge>
              </h3>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 space-y-4 p-2 bg-muted/30 rounded-xl border border-dashed border-muted-foreground/20 overflow-y-auto">
              {column.tasks.map((task) => (
                <Card key={task.id} className="cursor-grab active:cursor-grabbing hover:border-primary/50 transition-all shadow-sm group">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <p className="font-bold text-sm leading-none group-hover:text-primary transition-colors">
                          {task.client}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {task.phone}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-[10px] uppercase font-bold py-0 h-5 border-primary/20 bg-primary/5 text-primary">
                        {task.service}
                      </Badge>
                    </div>

                    <div className="bg-muted/50 p-2 rounded-lg border border-muted-foreground/10">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-primary mb-1">
                        <Bot className="h-3 w-3" /> IA RESUMO
                      </div>
                      <p className="text-[11px] leading-snug italic text-muted-foreground">
                        "{task.intent}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-muted-foreground/5">
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <Clock className="h-3 w-3" /> {task.time}
                      </div>
                      <div className="h-6 w-6 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                        <User className="h-3 w-3 text-zinc-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
