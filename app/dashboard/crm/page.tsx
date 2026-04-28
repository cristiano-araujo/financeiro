"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/db"
import { Appointment } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  Loader2,
  LayoutGrid,
  Clock
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const COLUMNS = [
  { id: "lead", title: "Novos Leads", color: "bg-blue-500", text: "text-blue-500", border: "border-blue-500/20" },
  { id: "scheduled", title: "Agendados", color: "bg-amber-500", text: "text-amber-500", border: "border-amber-500/20" },
  { id: "completed", title: "Realizados", color: "bg-emerald-500", text: "text-emerald-500", border: "border-emerald-500/20" },
  { id: "follow-up", title: "Follow-up", color: "bg-purple-500", text: "text-purple-500", border: "border-purple-500/20" },
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
      toast.success(`Status atualizado!`)
      loadAppointments()
    } else {
      toast.error("Erro ao atualizar status.")
    }
  }

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                CRM Kanban
            </h2>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Live Sync</span>
            </div>
          </div>
          <div className="text-muted-foreground font-medium mt-1">
            Gestão inteligente de agendamentos via Supabase.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-10 font-bold border-primary/20 hover:bg-primary/5" onClick={loadAppointments}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Clock className="h-4 w-4 mr-2" />}
            Atualizar
          </Button>
          <Button className="gap-2 h-10 shadow-lg shadow-primary/20 font-bold">
            <Plus className="h-4 w-4" />
            Novo Lead
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 -mx-6 px-6">
        <div className="flex gap-6 h-full min-w-[1200px]">
          {COLUMNS.map((column) => (
            <div key={column.id} className="flex-1 min-w-[300px] flex flex-col group/col">
              <div className="flex items-center justify-between mb-4 px-3 py-2 rounded-xl bg-muted/40 border border-transparent group-hover/col:border-primary/10 transition-all">
                <div className="flex items-center gap-2.5">
                  <div className={cn("h-3 w-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]", column.color)} />
                  <h3 className="font-black text-xs tracking-widest uppercase text-foreground/70">{column.title}</h3>
                  <Badge variant="secondary" className="rounded-lg h-5 min-w-5 flex items-center justify-center p-0 text-[10px] font-black bg-background/50">
                    {appointments.filter(a => a.status === column.id).length}
                  </Badge>
                </div>
              </div>
              
              <div className="flex-1 bg-muted/20 rounded-3xl p-3 space-y-4 border border-dashed border-muted-foreground/10 group-hover/col:bg-muted/30 transition-all overflow-y-auto max-h-[calc(100vh-280px)]">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-32 opacity-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <>
                    {appointments.filter(a => a.status === column.id).map((card) => (
                      <Card 
                        key={card.id} 
                        className="group/card shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 cursor-grab active:cursor-grabbing border-primary/10 bg-card/80 backdrop-blur-sm"
                      >
                        <CardContent className="p-5 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-black text-sm shadow-inner group-hover/card:scale-110 transition-transform">
                                {card.clientName?.charAt(0) || "C"}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-black text-sm tracking-tight">{card.clientName || "Lead sem Nome"}</span>
                                <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter">ID: {card.id.slice(0, 8)}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover/card:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest px-2 h-6 border-primary/20 bg-primary/5 text-primary/80">
                              {card.serviceName || "Triagem IA"}
                            </Badge>
                            <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest px-2 h-6 flex items-center gap-1.5 bg-muted/50 border-muted-foreground/10">
                              <Calendar className="h-3 w-3 opacity-50" /> 
                              {card.date ? new Date(card.date).toLocaleDateString("pt-BR") : "Aguardando"}
                            </Badge>
                          </div>

                          <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 group-hover/card:bg-primary/10 transition-colors relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-5">
                                <Bot className="h-8 w-8" />
                            </div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-primary/80">Inteligência Beatriz</span>
                            </div>
                            <p className="text-[11px] text-foreground/80 leading-relaxed font-medium italic">
                              "{card.aiSummary || "Analisando o histórico de conversas para gerar perfil..."}"
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-dashed border-muted-foreground/20">
                            <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full border-2 border-background bg-primary flex items-center justify-center shadow-lg">
                                    <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Monitorado</span>
                            </div>
                            <div className="flex gap-1.5">
                                {column.id === 'lead' && (
                                    <Button 
                                        variant="default" 
                                        size="sm" 
                                        className="h-8 px-3 text-[10px] font-black uppercase tracking-widest bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20"
                                        onClick={() => handleUpdateStatus(card.id, 'scheduled')}
                                    >
                                        Agendar
                                    </Button>
                                )}
                                <Button variant="secondary" size="sm" className="h-8 px-3 text-[10px] font-black uppercase tracking-widest gap-2 group/btn border-primary/10">
                                    Chat
                                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                                </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </>
                )}
                
                {appointments.filter(a => a.status === column.id).length === 0 && !isLoading && (
                  <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/10 rounded-3xl opacity-30 group-hover/col:opacity-50 transition-all">
                    <LayoutGrid className="h-6 w-6 mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Nenhum Lead</span>
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
