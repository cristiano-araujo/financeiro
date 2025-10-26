"use client"

import type React from "react"

import { useState } from "react"
import { useData } from "@/lib/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

interface ClienteFormProps {
  onClose: () => void
  editingCliente?: {
    id: string
    nome: string
    telefone: string
    email?: string
    dataNascimento?: Date
    observacoes?: string
  }
}

export function ClienteForm({ onClose, editingCliente }: ClienteFormProps) {
  const { addCliente, updateCliente } = useData()
  const [nome, setNome] = useState(editingCliente?.nome || "")
  const [telefone, setTelefone] = useState(editingCliente?.telefone || "")
  const [email, setEmail] = useState(editingCliente?.email || "")
  const [dataNascimento, setDataNascimento] = useState(
    editingCliente?.dataNascimento ? new Date(editingCliente.dataNascimento).toISOString().split("T")[0] : "",
  )
  const [observacoes, setObservacoes] = useState(editingCliente?.observacoes || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const clienteData = {
      nome,
      telefone,
      email: email || undefined,
      dataNascimento: dataNascimento ? new Date(dataNascimento) : undefined,
      observacoes: observacoes || undefined,
    }

    if (editingCliente) {
      updateCliente(editingCliente.id, clienteData)
    } else {
      addCliente(clienteData)
    }

    onClose()
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                placeholder="Ex: João Silva"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email (opcional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="cliente@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataNascimento">Data de Nascimento (opcional)</Label>
              <Input
                id="dataNascimento"
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações (opcional)</Label>
            <Textarea
              id="observacoes"
              placeholder="Preferências, alergias, etc..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit">{editingCliente ? "Atualizar" : "Salvar"}</Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
