"use client"

import { useState } from "react"
import { useData } from "@/lib/data-context"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Scissors } from "lucide-react"
import { ServicoForm } from "@/components/servico-form"
import { ServicoList } from "@/components/servico-list"

export default function ServicosPage() {
  const { servicos } = useData()
  const [showForm, setShowForm] = useState(false)

  const servicosAtivos = servicos.filter((s) => s.ativo)
  const precoMedio = servicos.length > 0 ? servicos.reduce((sum, s) => sum + s.preco, 0) / servicos.length : 0

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
            <CardTitle className="text-sm font-medium">Preço Médio</CardTitle>
            <Scissors className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {precoMedio.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Média dos serviços</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Duração Média</CardTitle>
            <Scissors className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {servicos.length > 0 ? Math.round(servicos.reduce((sum, s) => sum + s.duracao, 0) / servicos.length) : 0}{" "}
              min
            </div>
            <p className="text-xs text-muted-foreground">Tempo médio</p>
          </CardContent>
        </Card>
      </div>

      {/* Formulário e Lista */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Serviços</CardTitle>
          <CardDescription>Todos os serviços cadastrados no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          {showForm && (
            <div className="mb-6">
              <ServicoForm onClose={() => setShowForm(false)} />
            </div>
          )}
          <ServicoList />
        </CardContent>
      </Card>
    </div>
  )
}
