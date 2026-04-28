"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/db"
import { Service } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Clock, 
  DollarSign, 
  MoreHorizontal, 
  Scissors, 
  Stethoscope,
  Zap,
  Edit2,
  Trash2,
  Loader2
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Button as UIButton } from "@/components/ui/button"

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isAddingService, setIsAddingService] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    setIsLoading(true)
    const data = await db.getServices()
    setServices(data)
    setIsLoading(false)
  }

  const handleAddService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const success = await db.addService({
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      duration: Number(formData.get("duration")),
      isActive: true,
      businessId: "74888888-4444-4444-4444-888888888888"
    })
    
    if (success) {
      toast.success("Serviço salvo no Supabase!")
      setIsAddingService(false)
      loadServices()
    } else {
      toast.error("Erro ao salvar serviço.")
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Catálogo de Serviços
          </h2>
          <p className="text-muted-foreground">
            Sincronizado com o banco de dados Supabase.
          </p>
        </div>
        <Dialog open={isAddingService} onOpenChange={setIsAddingService}>
          <DialogTrigger asChild>
            <UIButton className="gap-2 h-10 shadow-lg shadow-primary/20">
              <Plus className="h-4 w-4" />
              Novo Serviço
            </UIButton>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Novo Serviço</DialogTitle>
              <DialogDescription>
                Este serviço será adicionado ao banco de dados e poderá ser agendado pela IA.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddService} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome do Serviço</Label>
                <Input id="name" name="name" placeholder="Ex: Avaliação Estética" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição para a IA</Label>
                <Textarea id="description" name="description" placeholder="Explique para a IA o que é este serviço..." required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input id="price" name="price" type="number" placeholder="250" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duração (min)</Label>
                  <Input id="duration" name="duration" type="number" placeholder="45" required />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <UIButton type="submit" className="w-full">Salvar no Banco</UIButton>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] text-primary gap-4">
          <Loader2 className="h-12 w-12 animate-spin" />
          <p className="font-bold">Carregando serviços...</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className="group hover:border-primary/50 transition-all duration-300 relative overflow-hidden shadow-md hover:shadow-xl hover:shadow-primary/5 border-primary/5">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 flex gap-2">
                <UIButton variant="secondary" size="icon" className="h-8 w-8 rounded-full shadow-md bg-background/80 backdrop-blur-sm">
                  <Edit2 className="h-3.5 w-3.5" />
                </UIButton>
                <UIButton variant="secondary" size="icon" className="h-8 w-8 rounded-full shadow-md bg-background/80 backdrop-blur-sm hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </UIButton>
              </div>
              
              <div className="absolute -left-6 -top-6 h-24 w-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />

              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary shadow-inner group-hover:scale-110 transition-transform">
                    {service.name.toLowerCase().includes('consulta') ? <Stethoscope className="h-6 w-6" /> : <Zap className="h-6 w-6" />}
                  </div>
                  <Badge variant={service.isActive ? "default" : "secondary"} className={cn(
                    "h-6 px-2 text-[10px] uppercase font-black tracking-widest",
                    service.isActive ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : ""
                  )}>
                    {service.isActive ? "Disponível" : "Pausado"}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-black tracking-tight group-hover:text-primary transition-colors">
                  {service.name}
                </CardTitle>
                <CardDescription className="line-clamp-2 min-h-[44px] text-xs leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="flex items-center justify-between pt-6 border-t border-muted border-dashed">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-widest font-black text-muted-foreground flex items-center gap-1.5">
                      <Clock className="h-3 w-3" /> Tempo
                    </span>
                    <span className="font-bold text-sm tracking-tight">{service.duration} min</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] uppercase tracking-widest font-black text-muted-foreground flex items-center gap-1.5">
                      <DollarSign className="h-3 w-3" /> Investimento
                    </span>
                    <span className="font-black text-2xl text-primary tracking-tighter">
                      R$ {service.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <button 
            onClick={() => setIsAddingService(true)}
            className="flex flex-col items-center justify-center gap-4 p-8 rounded-3xl border-2 border-dashed border-primary/10 hover:border-primary/40 hover:bg-primary/5 transition-all group min-h-[260px] shadow-sm hover:shadow-lg"
          >
            <div className="h-16 w-16 rounded-3xl bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-all transform group-hover:rotate-90">
              <Plus className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="text-center">
              <p className="font-black tracking-tight text-muted-foreground group-hover:text-primary transition-colors uppercase text-xs">Novo Serviço</p>
              <p className="text-[10px] text-muted-foreground mt-1 max-w-[150px]">Adicione novas especialidades para sua IA agendar.</p>
            </div>
          </button>
        </div>
      )}
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
