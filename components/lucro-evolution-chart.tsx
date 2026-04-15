"use client"

import { useData } from "@/lib/data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from "recharts"

export function LucroEvolutionChart() {
  const { agendamentos, servicos, calcularFinanceiro } = useData()
  const financeiro = calcularFinanceiro()

  // Agrupar receita por data
  const receitas: Record<string, number> = {}
  const custosFinal = financeiro.custoTotal
  const comissoesFinal = financeiro.totalComissoes

  agendamentos
    .filter((a) => a.status === "concluido")
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
    .forEach((agendamento) => {
      const data = new Date(agendamento.data).toLocaleDateString("pt-BR")
      const servico = servicos.find((s) => s.id === agendamento.servicoId)
      receitas[data] = (receitas[data] || 0) + (servico?.preco || 0)
    })

  // Converter para array com lucro acumulado
  let receitaAcumulada = 0
  let lucroAcumulado = 0

  const data = Object.entries(receitas)
    .map(([data, receita]) => {
      receitaAcumulada += receita
      // Distribuir custos e comissões proporcionalmente aos dias
      const diasCompletos = Object.keys(receitas).length
      const custoPorDia = diasCompletos > 0 ? custosFinal / diasCompletos : 0
      const comissaoPorDia = diasCompletos > 0 ? comissoesFinal / diasCompletos : 0
      lucroAcumulado = receitaAcumulada - (custoPorDia * Object.keys(receitas).indexOf(data) + custoPorDia) - (comissaoPorDia * Object.keys(receitas).indexOf(data) + comissaoPorDia)

      return {
        data,
        receita: receitaAcumulada,
        lucro: lucroAcumulado,
      }
    })
    .slice(-30) // Últimos 30 dias

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Evolução de Lucro</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Crescimento de receita e lucro ao longo do tempo</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[200px] sm:h-[300px]">
          <p className="text-xs sm:text-sm text-muted-foreground">Nenhum dado de receita registrado ainda</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Evolução de Lucro</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Crescimento de receita e lucro ao longo do tempo</CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <div className="h-[200px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="data" fontSize={9} angle={-45} textAnchor="end" height={30} />
              <YAxis fontSize={10} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "10px" }} />
              <Line type="monotone" dataKey="receita" stroke="hsl(var(--chart-1))" strokeWidth={2} />
              <Line type="monotone" dataKey="lucro" stroke="hsl(var(--chart-4))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
