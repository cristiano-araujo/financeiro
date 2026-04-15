"use client"

import { useData } from "@/lib/data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from "recharts"

export function ComissoesChart() {
  const { calcularComissoes } = useData()
  const comissoes = calcularComissoes()

  const data = comissoes.map((c) => ({
    profissional: c.usuarioNome,
    receita: c.somaReceitaServicos,
    comissao: c.comissao10Porcento,
  }))

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Receita por Profissional</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Receita gerada e comissões por profissional</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[200px] sm:h-[300px]">
          <p className="text-xs sm:text-sm text-muted-foreground">Nenhuma receita registrada ainda</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Receita por Profissional</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Receita gerada e comissões (10%) por profissional</CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6 pb-2 overflow-hidden">
        <div className="h-[200px] sm:h-[300px]">
          <ResponsiveContainer width="99%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="profissional" fontSize={9} angle={-35} textAnchor="end" height={70} interval={0} />
              <YAxis fontSize={9} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "10px" }} />
              <Bar dataKey="receita" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="comissao" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
