"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/db"
import { Service } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Clock, 
  DollarSign, 
  MoreHorizontal, 
  Scissors, 
  Stethoscope,
  Briefcase
} from "lucide-react"

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    setServices(db.getServices())
  }, [])

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Serviços</h2>
          <p className="text-muted-foreground">
            Configure o catálogo de serviços que sua IA poderá oferecer aos clientes.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Serviço
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="hover:border-primary/50 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  {service.businessId === "1" ? <Stethoscope className="h-5 w-5" /> : <Scissors className="h-5 w-5" />}
                </div>
                <Badge variant={service.isActive ? "default" : "secondary"} className="h-5 px-1.5 text-[10px] uppercase">
                  {service.isActive ? "Ativo" : "Inativo"}
                </Badge>
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {service.name}
              </CardTitle>
              <CardDescription className="line-clamp-2 min-h-[40px]">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between pt-4 border-t border-muted-foreground/10">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Duração
                  </span>
                  <span className="font-bold text-sm">{service.duration} min</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <DollarSign className="h-3 w-3" /> Valor
                  </span>
                  <span className="font-bold text-lg text-primary">
                    R$ {service.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <button className="flex flex-col items-center justify-center gap-4 p-8 rounded-xl border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5 transition-all group min-h-[220px]">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <Plus className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <div className="text-center">
            <p className="font-bold text-muted-foreground group-hover:text-primary transition-colors">Adicionar Novo</p>
            <p className="text-xs text-muted-foreground">Cadastre um novo serviço no sistema</p>
          </div>
        </button>
      </div>
    </div>
  )
}
