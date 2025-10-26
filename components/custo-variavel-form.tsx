"use client"

import type React from "react"

import { useState } from "react"
import { useData } from "@/lib/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface CustoVariavelFormProps {
  onClose: () => void
}

export function CustoVariavelForm({ onClose }: CustoVariavelFormProps) {
  const { addCustoVariavel } = useData()
  const [descricao, setDescricao] = useState("")
  const [valorUnitario, setValorUnitario] = useState("")
  const [quantidade, setQuantidade] = useState("")
  const [categoria, setCategoria] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addCustoVariavel({
      descricao,
      valorUnitario: Number.parseFloat(valorUnitario),
      quantidade: Number.parseInt(quantidade),
      categoria,
    })
    setDescricao("")
    setValorUnitario("")
    setQuantidade("")
    setCategoria("")
    onClose()
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                id="descricao"
                placeholder="Ex: Pomada"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="valorUnitario">Valor Unitário (R$)</Label>
              <Input
                id="valorUnitario"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={valorUnitario}
                onChange={(e) => setValorUnitario(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantidade">Quantidade</Label>
              <Input
                id="quantidade"
                type="number"
                placeholder="0"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria</Label>
              <Input
                id="categoria"
                placeholder="Ex: Produtos"
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
