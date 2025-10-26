"use client"

import { useData } from "@/lib/data-context"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, TrendingDown, Target, Users, Calendar, Scissors, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function DashboardPage() {
  const { calcularFinanceiro, agendamentos, clientes, servicos } = useData()
  const financeiro = calcularFinanceiro()

  // Estatísticas
  const hoje = new Date()
  const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
  const agendamentosMes = agendamentos.filter((a) => new Date(a.data) >= inicioMes).length
  const agendamentosConcluidos = agendamentos.filter((a) => a.status === "concluido").length

  // Calcular percentual de lucro atual
  const percentualLucro =
    financeiro.custoTotal > 0 ? ((financeiro.lucroAtual / financeiro.custoTotal) * 100).toFixed(1) : "0.0"

  // Verificar se está no prejuízo
  const isNoPrejuizo = financeiro.lucroAtual < 0

  return (
    <div className="px-2 sm:px-0">
      <PageHeader title="Dashboard" description="Visão geral do desempenho financeiro da barbearia" />

      {/* Alerta de Prejuízo */}
      {isNoPrejuizo && (
        <Alert variant="destructive" className="mb-4 sm:mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Atenção: Operação em Prejuízo</AlertTitle>
          <AlertDescription>
            Sua barbearia está operando com prejuízo de R$ {Math.abs(financeiro.lucroAtual).toFixed(2)}. Revise seus
            custos ou aumente o número de atendimentos.
          </AlertDescription>
        </Alert>
      )}

      {/* Cards Principais - Métricas Financeiras */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4 sm:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Atual</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">R$ {financeiro.receitaAtual.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">De {agendamentosConcluidos} atendimentos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custos Totais</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">R$ {financeiro.custoTotal.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Fixos: R$ {financeiro.totalCustosFixos.toFixed(2)} | Variáveis: R${" "}
              {financeiro.totalCustosVariaveis.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Atual</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-xl sm:text-2xl font-bold ${isNoPrejuizo ? "text-destructive" : ""}`}>
              R$ {financeiro.lucroAtual.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">{percentualLucro}% sobre os custos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ponto de Equilíbrio</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{financeiro.pontoEquilibrio}</div>
            <p className="text-xs text-muted-foreground">Serviços para não ter prejuízo</p>
          </CardContent>
        </Card>
      </div>

      {/* Cards de Metas */}
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 mb-4 sm:mb-8">
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Target className="h-4 w-4 sm:h-5 sm:w-5" />
              Meta: 150% de Lucro
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Quantidade de serviços necessários para atingir a meta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-bold">{financeiro.metaLucro150}</span>
                <span className="text-sm text-muted-foreground">serviços</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Faltam {Math.max(0, financeiro.metaLucro150 - agendamentosConcluidos)} atendimentos para atingir a meta
              </p>
              <div className="w-full bg-secondary rounded-full h-2 mt-4">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, (agendamentosConcluidos / financeiro.metaLucro150) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
              Resumo do Período
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Estatísticas gerais do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs sm:text-sm">Total de Clientes</span>
                </div>
                <span className="font-bold text-sm sm:text-base">{clientes.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Scissors className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs sm:text-sm">Serviços Ativos</span>
                </div>
                <span className="font-bold text-sm sm:text-base">{servicos.filter((s) => s.ativo).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs sm:text-sm">Agendamentos (Mês)</span>
                </div>
                <span className="font-bold text-sm sm:text-base">{agendamentosMes}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs sm:text-sm">Concluídos</span>
                </div>
                <span className="font-bold text-sm sm:text-base">{agendamentosConcluidos}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
