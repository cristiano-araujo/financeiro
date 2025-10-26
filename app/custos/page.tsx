"use client"

import { useState } from "react"
import { useData } from "@/lib/data-context"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { CustoFixoForm } from "@/components/custo-fixo-form"
import { CustoVariavelForm } from "@/components/custo-variavel-form"
import { CustoFixoList } from "@/components/custo-fixo-list"
import { CustoVariavelList } from "@/components/custo-variavel-list"

export default function CustosPage() {
  const { calcularFinanceiro } = useData()
  const [showFixoForm, setShowFixoForm] = useState(false)
  const [showVariavelForm, setShowVariavelForm] = useState(false)

  const financeiro = calcularFinanceiro()

  return (
    <div>
      <PageHeader
        title="Gestão de Custos"
        description="Controle seus custos fixos e variáveis para análise financeira"
      />

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custos Fixos</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {financeiro.totalCustosFixos.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Mensais</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custos Variáveis</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {financeiro.totalCustosVariaveis.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Por período</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custo Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {financeiro.custoTotal.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total acumulado</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Custos */}
      <Tabs defaultValue="fixos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="fixos">Custos Fixos</TabsTrigger>
          <TabsTrigger value="variaveis">Custos Variáveis</TabsTrigger>
        </TabsList>

        <TabsContent value="fixos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Custos Fixos</CardTitle>
                  <CardDescription>Despesas mensais recorrentes (aluguel, energia, água, etc.)</CardDescription>
                </div>
                <Button onClick={() => setShowFixoForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showFixoForm && (
                <div className="mb-6">
                  <CustoFixoForm onClose={() => setShowFixoForm(false)} />
                </div>
              )}
              <CustoFixoList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variaveis" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Custos Variáveis</CardTitle>
                  <CardDescription>Despesas que variam conforme o uso (produtos, materiais, etc.)</CardDescription>
                </div>
                <Button onClick={() => setShowVariavelForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showVariavelForm && (
                <div className="mb-6">
                  <CustoVariavelForm onClose={() => setShowVariavelForm(false)} />
                </div>
              )}
              <CustoVariavelList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
