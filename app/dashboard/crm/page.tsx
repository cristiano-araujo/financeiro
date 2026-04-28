"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/db"
import { Appointment } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Bot, 
  User, 
  Calendar, 
  MoreHorizontal, 
  Plus, 
  MessageSquare,
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  Loader2
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const COLUMNS = [
  { id: "lead", title: "Novos Leads", color: "bg-blue-500" },
  { id: "scheduled", title: "Agendados", color: "bg-amber-500" },
  { id: "completed", title: "Realizados", color: "bg-emerald-500" },
  { id: "follow-up", title: "Follow-up", color: "bg-purple-500" },
]

export default function CRMPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAppointments()
  }, [])

  const loadAppointments = async () => {
    setIsLoading(true)
    const data = await db.getAppointments()
    setAppointments(data)
    setIsLoading(false)
  }

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    const success = await db.updateAppointmentStatus(id, newStatus)
    if (success) {
      toast.success(`Status atualizado no Supabase!`)
      loadAppointments()
    } else {
      toast.error("Erro ao atualizar status.")
    }
  }

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            CRM Kanban
          </h2>
          <p className="text-muted-foreground flex items-center gap-2">
            Fluxo de leads sincronizado com o Supabase.
            {isLoading && <Loader2 className="h-3 w-3 animate-spin text-primary" />}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={loadAppointments}>Atualizar</Button>
          <Button className="gap-2 h-10 shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4" />
            Novo Lead
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 -mx-6 px-6">
        <div className="flex gap-6 h-full min-w-[1200px]">
          {COLUMNS.map((column) => (
            <div key={column.id} className="flex-1 min-w-[300px] flex flex-col group">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${column.color} shadow-[0_0_8px_rgba(0,0,0,0.2)]`} />
                  <h3 className="font-bold text-sm tracking-wide uppercase text-muted-foreground">{column.title}</h3>
                  <Badge variant="secondary" className="rounded-full h-5 min-w-5 flex items-center justify-center p-0 text-[10px]">
                    {appointments.filter(a => a.status === column.id).length}
                  </Badge>
                </div>
              </div>
              
              <div className="flex-1 bg-muted/30 rounded-2xl p-3 space-y-4 border border-transparent group-hover:border-primary/5 transition-colors overflow-y-auto max-h-[calc(100vh-280px)]">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-32 opacity-20">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : (
                  <>
                    {appointments.filter(a => a.status === column.id).map((card) => (
                      <Card 
                        key={card.id} 
                        className="group/card shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 cursor-grab active:cursor-grabbing border-primary/5"
                      >
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                {card.clientName?.charAt(0) || "C"}
                              </div>
                              <span className="font-bold text-sm">{card.clientName || "Cliente Desconhecido"}</span>
                            </div>
                            <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover/card:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-[10px] py-0 h-5 border-primary/20 bg-primary/5">
                              {card.serviceName || "Sem Serviço"}
                            </Badge>
                            <Badge variant="outline" className="text-[10px] py-0 h-5 flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> 
                              {card.date ? card.date.toLocaleDateString("pt-BR") : "A definir"}
                            </Badge>
                          </div>

                          <div className="bg-muted/50 p-3 rounded-xl border border-muted-foreground/10 group-hover/card:bg-primary/5 transition-colors">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <Sparkles className="h-3 w-3 text-primary" />
                              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Resumo IA</span>
                            </div>
                            <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                              {card.aiSummary || "IA Beatriz está processando este atendimento..."}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-dashed">
                            <div className="flex -space-x-2">
                              <div className="h-5 w-5 rounded-full border-2 border-background bg-primary flex items-center justify-center">
                                <Bot className="h-3 w-3 text-primary-foreground" />
                              </div>
                            </div>
                            <div className="flex gap-1">
                                {column.id === 'lead' && (
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="h-7 px-2 text-[9px] hover:text-amber-500"
                                        onClick={() => handleUpdateStatus(card.id, 'scheduled')}
                                    >
                                        Agendar
                                    </Button>
                                )}
                                <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px] gap-1 group/btn hover:text-primary">
                                    Ver Conversa
                                    <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                                </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </>
                )}
                
                {appointments.filter(a => a.status === column.id).length === 0 && !isLoading && (
                  <div className="h-24 flex items-center justify-center border-2 border-dashed border-muted rounded-xl opacity-20">
                    <span className="text-xs">Vazio</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
