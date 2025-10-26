"use client"

import { useState } from "react"
import { useData } from "@/lib/data-context"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Scissors, DollarSign, TrendingUp } from "lucide-react"
import { ServicoForm } from "@/components/servico-form"
import { ServicoList } from "@/components/servico-list"

export default function ServicosPage() {
  const { servicos } = useData()
  const [showForm, setShowForm] = useState(false)

  const servicosAtivos = servicos.filter((s) => s.ativo)
  const valorMedio =
    servicosAtivos.length > 0 ? servicosAtivos.reduce((sum, s) => sum + s.preco, 0) / servicosAtivos.length : 0

  return (
    <div>
      <PageHeader
        title="Serviços"
        description="Gerencie os serviços oferecidos pela barbearia"
        action={
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Serviço
          </Button>
        }
      />

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Serviços</CardTitle>
            <Scissors className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{servicos.length}</div>
            <p className="text-xs text-muted-foreground">{servicosAtivos.length} ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Médio</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {valorMedio.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </div>
            <p className="text-xs text-muted-foreground">Por serviço</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Serviço Mais Caro</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {servicosAtivos.length > 0
                ? Math.max(...servicosAtivos.map((s) => s.preco)).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                : "R$ 0,00"}
            </div>
            <p className="text-xs text-muted-foreground">Valor máximo</p>
          </CardContent>
        </Card>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="mb-6">
          <ServicoForm onClose={() => setShowForm(false)} />
        </div>
      )}

      {/* Lista de Serviços */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Serviços</CardTitle>
          <CardDescription>Todos os serviços cadastrados</CardDescription>
        </CardHeader>
        <CardContent>
          <ServicoList />
        </CardContent>
      </Card>
    </div>
  )
}
