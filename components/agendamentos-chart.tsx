"use client"

import { useData } from "@/lib/data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Legend, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function AgendamentosChart() {
  const { agendamentos } = useData()

  // Agrupar agendamentos por data
  const agendamentosPorData = agendamentos.reduce(
    (acc, agendamento) => {
      const data = new Date(agendamento.data).toLocaleDateString("pt-BR")
      if (!acc[data]) {
        acc[data] = { agendado: 0, confirmado: 0, concluido: 0, cancelado: 0 }
      }
      acc[data][agendamento.status]++
      return acc
    },
    {} as Record<string, Record<string, number>>,
  )

  // Converter para array e ordenar por data
  const data = Object.entries(agendamentosPorData)
    .map(([data, counts]) => ({
      data,
      ...counts,
    }))
    .sort((a, b) => {
      const [diaA, mesA, anoA] = a.data.split("/")
      const [diaB, mesB, anoB] = b.data.split("/")
      return new Date(`${anoA}-${mesA}-${diaA}`).getTime() - new Date(`${anoB}-${mesB}-${diaB}`).getTime()
    })
    .slice(-14) // Últimos 14 dias

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Histórico de Agendamentos</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Evolução dos agendamentos ao longo do tempo</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[200px] sm:h-[300px]">
          <p className="text-xs sm:text-sm text-muted-foreground">Nenhum agendamento registrado ainda</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Histórico de Agendamentos</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Evolução dos agendamentos nos últimos 14 dias</CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ChartContainer
          config={{
            agendado: {
              label: "Agendado",
              color: "hsl(var(--chart-2))",
            },
            confirmado: {
              label: "Confirmado",
              color: "hsl(var(--chart-1))",
            },
            concluido: {
              label: "Concluído",
              color: "hsl(var(--chart-4))",
            },
            cancelado: {
              label: "Cancelado",
              color: "hsl(var(--chart-5))",
            },
          }}
          className="h-[200px] sm:h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="data" fontSize={9} angle={-45} textAnchor="end" height={30} />
              <YAxis fontSize={10} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend wrapperStyle={{ fontSize: "8px" }} />
              <Line type="monotone" dataKey="agendado" stroke="var(--color-agendado)" strokeWidth={2} />
              <Line type="monotone" dataKey="confirmado" stroke="var(--color-confirmado)" strokeWidth={2} />
              <Line type="monotone" dataKey="concluido" stroke="var(--color-concluido)" strokeWidth={2} />
              <Line type="monotone" dataKey="cancelado" stroke="var(--color-cancelado)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
