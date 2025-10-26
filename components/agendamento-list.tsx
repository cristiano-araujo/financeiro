"use client"

import { useState } from "react"
import { useData } from "@/lib/data-context"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2 } from "lucide-react"
import { AgendamentoForm } from "@/components/agendamento-form"
import type { Agendamento } from "@/lib/types"

interface AgendamentoListProps {
  filterStatus?: "agendado" | "confirmado" | "concluido" | "cancelado"
}

export function AgendamentoList({ filterStatus }: AgendamentoListProps) {
  const { agendamentos, deleteAgendamento, clientes, servicos } = useData()
  const [editingAgendamento, setEditingAgendamento] = useState<Agendamento | null>(null)

  const filteredAgendamentos = filterStatus ? agendamentos.filter((a) => a.status === filterStatus) : agendamentos

  // Ordenar por data e horário (mais recentes primeiro)
  const sortedAgendamentos = [...filteredAgendamentos].sort((a, b) => {
    const dateA = new Date(a.data).getTime()
    const dateB = new Date(b.data).getTime()
    if (dateA !== dateB) return dateB - dateA
    return b.horario.localeCompare(a.horario)
  })

  const getClienteNome = (clienteId: string) => {
    return clientes.find((c) => c.id === clienteId)?.nome || "Cliente não encontrado"
  }

  const getServicoNome = (servicoId: string) => {
    return servicos.find((s) => s.id === servicoId)?.nome || "Serviço não encontrado"
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      agendado: "secondary",
      confirmado: "default",
      concluido: "outline",
      cancelado: "destructive",
    }
    const labels: Record<string, string> = {
      agendado: "Agendado",
      confirmado: "Confirmado",
      concluido: "Concluído",
      cancelado: "Cancelado",
    }
    return <Badge variant={variants[status] || "default"}>{labels[status] || status}</Badge>
  }

  if (editingAgendamento) {
    return <AgendamentoForm onClose={() => setEditingAgendamento(null)} editingAgendamento={editingAgendamento} />
  }

  if (sortedAgendamentos.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Nenhum agendamento encontrado</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Serviço</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Horário</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAgendamentos.map((agendamento) => (
            <TableRow key={agendamento.id}>
              <TableCell className="font-medium">{getClienteNome(agendamento.clienteId)}</TableCell>
              <TableCell>{getServicoNome(agendamento.servicoId)}</TableCell>
              <TableCell>{new Date(agendamento.data).toLocaleDateString("pt-BR")}</TableCell>
              <TableCell>{agendamento.horario}</TableCell>
              <TableCell>{getStatusBadge(agendamento.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="icon" variant="ghost" onClick={() => setEditingAgendamento(agendamento)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => deleteAgendamento(agendamento.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
