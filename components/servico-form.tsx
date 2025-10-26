"use client"

import type React from "react"

import { useState } from "react"
import { useData } from "@/lib/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"

interface ServicoFormProps {
  onClose: () => void
  editingServico?: {
    id: string
    nome: string
    descricao: string
    preco: number
    duracao: number
    ativo: boolean
  }
}

export function ServicoForm({ onClose, editingServico }: ServicoFormProps) {
  const { addServico, updateServico } = useData()
  const [nome, setNome] = useState(editingServico?.nome || "")
  const [descricao, setDescricao] = useState(editingServico?.descricao || "")
  const [preco, setPreco] = useState(editingServico?.preco.toString() || "")
  const [duracao, setDuracao] = useState(editingServico?.duracao.toString() || "")
  const [ativo, setAtivo] = useState(editingServico?.ativo ?? true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const servicoData = {
      nome,
      descricao,
      preco: Number.parseFloat(preco),
      duracao: Number.parseInt(duracao),
      ativo,
    }

    if (editingServico) {
      updateServico(editingServico.id, servicoData)
    } else {
      addServico(servicoData)
    }

    onClose()
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Serviço</Label>
              <Input
                id="nome"
                placeholder="Ex: Corte Masculino"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preco">Preço (R$)</Label>
              <Input
                id="preco"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="duracao">Duração (minutos)</Label>
              <Input
                id="duracao"
                type="number"
                placeholder="30"
                value={duracao}
                onChange={(e) => setDuracao(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ativo">Status</Label>
              <div className="flex items-center space-x-2 h-10">
                <Switch id="ativo" checked={ativo} onCheckedChange={setAtivo} />
                <Label htmlFor="ativo" className="cursor-pointer">
                  {ativo ? "Ativo" : "Inativo"}
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              placeholder="Descreva o serviço..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit">{editingServico ? "Atualizar" : "Salvar"}</Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
