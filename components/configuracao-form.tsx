"use client"

import type React from "react"
import { useState } from "react"
import { useData } from "@/lib/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Percent } from "lucide-react"

export function ConfiguracaoForm() {
  const { configuracao, updateConfiguracao } = useData()
  const [percentual, setPercentual] = useState(configuracao.percentualComissao.toString())
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    // Pequena demora para dar feedback visual
    setTimeout(() => {
      updateConfiguracao({
        percentualComissao: Number.parseFloat(percentual)
      })
      setIsSaving(false)
    }, 500)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="percentual">Percentual de Comissão (%)</Label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="percentual"
                type="number"
                step="0.5"
                min="0"
                max="100"
                placeholder="Ex: 10"
                className="pl-9"
                value={percentual}
                onChange={(e) => setPercentual(e.target.value)}
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Este percentual será aplicado sobre o valor de cada serviço concluído para calcular a comissão do profissional.
            </p>
          </div>

          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Salvando..." : "Salvar Configuração"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
