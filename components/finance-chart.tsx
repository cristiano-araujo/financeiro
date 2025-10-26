"use client"

import { useData } from "@/lib/data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function FinanceChart() {
  const { calcularFinanceiro } = useData()
  const financeiro = calcularFinanceiro()

  const data = [
    {
      name: "Custos Fixos",
      valor: financeiro.totalCustosFixos,
    },
    {
      name: "Custos Variáveis",
      valor: financeiro.totalCustosVariaveis,
    },
    {
      name: "Receita Atual",
      valor: financeiro.receitaAtual,
    },
    {
      name: "Lucro/Prejuízo",
      valor: financeiro.lucroAtual,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Análise Financeira</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Comparativo de custos, receita e lucro</CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6 pb-2 overflow-hidden">
        <ChartContainer
          config={{
            valor: {
              label: "Valor (R$)",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[200px] sm:h-[300px]"
        >
          <ResponsiveContainer width="99%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={9} angle={-35} textAnchor="end" height={70} interval={0} />
              <YAxis fontSize={9} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="valor" fill="var(--color-valor)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
