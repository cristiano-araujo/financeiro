"use client"

import { useData } from "@/lib/data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

export function ClientesStatusChart() {
  const { agendamentos, clientes } = useData()

  // Contar agendamentos por cliente
  const clienteAgendamentos: Record<string, number> = {}
  agendamentos.forEach((agendamento) => {
    clienteAgendamentos[agendamento.clienteId] = (clienteAgendamentos[agendamento.clienteId] || 0) + 1
  })

  // Pegar top 10 clientes mais ativos
  const data = Object.entries(clienteAgendamentos)
    .map(([clienteId, count]) => {
      const cliente = clientes.find((c) => c.id === clienteId)
      return {
        nome: cliente?.nome || "Desconhecido",
        agendamentos: count,
      }
    })
    .sort((a, b) => b.agendamentos - a.agendamentos)
    .slice(0, 10)

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Clientes Mais Ativos</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Top 10 clientes por número de agendamentos</CardDescription>
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
        <CardTitle className="text-base sm:text-lg">Clientes Mais Ativos</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Top 10 clientes por número de agendamentos</CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6 pb-2 overflow-hidden">
        <div className="h-[200px] sm:h-[300px]">
          <ResponsiveContainer width="99%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" fontSize={9} />
              <YAxis dataKey="nome" type="category" fontSize={8} width={100} />
              <Tooltip />
              <Bar dataKey="agendamentos" fill="hsl(var(--chart-3))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
