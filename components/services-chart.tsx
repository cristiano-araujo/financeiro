"use client"

import { useData } from "@/lib/data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

export function ServicesChart() {
  const { agendamentos, servicos } = useData()

  // Contar agendamentos por serviço
  const servicoCounts = agendamentos
    .filter((a) => a.status === "concluido")
    .reduce(
      (acc, agendamento) => {
        acc[agendamento.servicoId] = (acc[agendamento.servicoId] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

  const data = Object.entries(servicoCounts).map(([servicoId, count]) => {
    const servico = servicos.find((s) => s.id === servicoId)
    return {
      name: servico?.nome || "Desconhecido",
      value: count,
    }
  })

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Serviços Mais Realizados</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Distribuição de serviços concluídos</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[200px] sm:h-[300px]">
          <p className="text-xs sm:text-sm text-muted-foreground">Nenhum serviço concluído ainda</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Serviços Mais Realizados</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Distribuição de serviços concluídos</CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ChartContainer
          config={{
            value: {
              label: "Quantidade",
            },
          }}
          className="h-[200px] sm:h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label={(entry) => entry.name}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
