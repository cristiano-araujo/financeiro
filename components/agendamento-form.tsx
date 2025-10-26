"use client"

import type React from "react"

import { useState } from "react"
import { useData } from "@/lib/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AgendamentoFormProps {
  onClose: () => void
  editingAgendamento?: {
    id: string
    clienteId: string
    servicoId: string
    data: Date
    horario: string
    status: "agendado" | "confirmado" | "concluido" | "cancelado"
    observacoes?: string
  }
}

export function AgendamentoForm({ onClose, editingAgendamento }: AgendamentoFormProps) {
  const { addAgendamento, updateAgendamento, clientes, servicos } = useData()
  const [clienteId, setClienteId] = useState(editingAgendamento?.clienteId || "")
  const [servicoId, setServicoId] = useState(editingAgendamento?.servicoId || "")
  const [data, setData] = useState(
    editingAgendamento?.data ? new Date(editingAgendamento.data).toISOString().split("T")[0] : "",
  )
  const [horario, setHorario] = useState(editingAgendamento?.horario || "")
  const [status, setStatus] = useState<"agendado" | "confirmado" | "concluido" | "cancelado">(
    editingAgendamento?.status || "agendado",
  )
  const [observacoes, setObservacoes] = useState(editingAgendamento?.observacoes || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const agendamentoData = {
      clienteId,
      servicoId,
      data: new Date(data),
      horario,
      status,
      observacoes: observacoes || undefined,
    }

    if (editingAgendamento) {
      updateAgendamento(editingAgendamento.id, agendamentoData)
    } else {
      addAgendamento(agendamentoData)
    }

    onClose()
  }

  const servicosAtivos = servicos.filter((s) => s.ativo)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingAgendamento ? "Editar Agendamento" : "Novo Agendamento"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="clienteId">Cliente</Label>
              <Select value={clienteId} onValueChange={setClienteId} required>
                <SelectTrigger id="clienteId">
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map((cliente) => (
                    <SelectItem key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="servicoId">Serviço</Label>
              <Select value={servicoId} onValueChange={setServicoId} required>
                <SelectTrigger id="servicoId">
                  <SelectValue placeholder="Selecione um serviço" />
                </SelectTrigger>
                <SelectContent>
                  {servicosAtivos.map((servico) => (
                    <SelectItem key={servico.id} value={servico.id}>
                      {servico.nome} - R$ {servico.preco.toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="data">Data</Label>
              <Input id="data" type="date" value={data} onChange={(e) => setData(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="horario">Horário</Label>
              <Input id="horario" type="time" value={horario} onChange={(e) => setHorario(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value: any) => setStatus(value)}>
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agendado">Agendado</SelectItem>
                  <SelectItem value="confirmado">Confirmado</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações (opcional)</Label>
            <Textarea
              id="observacoes"
              placeholder="Observações sobre o agendamento..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit">{editingAgendamento ? "Atualizar" : "Agendar"}</Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
