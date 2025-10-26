"use client"

import { useState } from "react"
import { useData } from "@/lib/data-context"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Users, UserCheck, Calendar } from "lucide-react"
import { ClienteForm } from "@/components/cliente-form"
import { ClienteList } from "@/components/cliente-list"

export default function ClientesPage() {
  const { clientes, agendamentos } = useData()
  const [showForm, setShowForm] = useState(false)

  const clientesComAgendamento = new Set(agendamentos.map((a) => a.clienteId)).size

  const hoje = new Date()
  const mesAtual = hoje.getMonth()
  const anoAtual = hoje.getFullYear()

  const clientesComAniversarioMes = clientes.filter((c) => {
    if (!c.dataNascimento) return false
    const data = new Date(c.dataNascimento)
    return data.getMonth() === mesAtual
  }).length

  return (
    <div>
      <PageHeader
        title="Clientes"
        description="Gerencie sua base de clientes"
        action={
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        }
      />

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientes.length}</div>
            <p className="text-xs text-muted-foreground">Cadastrados no sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientesComAgendamento}</div>
            <p className="text-xs text-muted-foreground">Com agendamentos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aniversariantes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientesComAniversarioMes}</div>
            <p className="text-xs text-muted-foreground">Neste mês</p>
          </CardContent>
        </Card>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="mb-6">
          <ClienteForm onClose={() => setShowForm(false)} />
        </div>
      )}

      {/* Lista de Clientes */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>Todos os clientes cadastrados</CardDescription>
        </CardHeader>
        <CardContent>
          <ClienteList />
        </CardContent>
      </Card>
    </div>
  )
}
