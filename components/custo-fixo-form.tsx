"use client"

import type React from "react"

import { useState } from "react"
import { useData } from "@/lib/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface CustoFixoFormProps {
  onClose: () => void
}

export function CustoFixoForm({ onClose }: CustoFixoFormProps) {
  const { addCustoFixo } = useData()
  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState("")
  const [categoria, setCategoria] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addCustoFixo({
      descricao,
      valor: Number.parseFloat(valor),
      categoria,
    })
    setDescricao("")
    setValor("")
    setCategoria("")
    onClose()
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                id="descricao"
                placeholder="Ex: Aluguel"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="valor">Valor (R$)</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria</Label>
              <Input
                id="categoria"
                placeholder="Ex: Infraestrutura"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit">Salvar</Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
