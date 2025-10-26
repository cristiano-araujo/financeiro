"use client"

import { useState } from "react"
import { useData } from "@/lib/data-context"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import { CustoFixoForm } from "@/components/custo-fixo-form"
import { CustoVariavelForm } from "@/components/custo-variavel-form"
import { CustoFixoList } from "@/components/custo-fixo-list"
import { CustoVariavelList } from "@/components/custo-variavel-list"

export default function CustosPage() {
  const { custosFixos, custosVariaveis } = useData()
  const [showFixoForm, setShowFixoForm] = useState(false)
  const [showVariavelForm, setShowVariavelForm] = useState(false)

  const totalFixo = custosFixos.reduce((sum, custo) => sum + custo.valor, 0)
  const totalVariavel = custosVariaveis.reduce((sum, custo) => sum + custo.valorUnitario * custo.quantidade, 0)
  const totalGeral = totalFixo + totalVariavel

  return (
    <div>
      <PageHeader
        title="Gestão de Custos"
        description="Controle seus custos fixos e variáveis"
        action={
          <div className="flex gap-2">
            <Button onClick={() => setShowFixoForm(true)} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Custo Fixo
            </Button>
            <Button onClick={() => setShowVariavelForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Custo Variável
            </Button>
          </div>
        }
      />

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custos Fixos</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalFixo.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </div>
            <p className="text-xs text-muted-foreground">{custosFixos.length} itens cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custos Variáveis</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalVariavel.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </div>
            <p className="text-xs text-muted-foreground">{custosVariaveis.length} itens cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Geral</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalGeral.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </div>
            <p className="text-xs text-muted-foreground">Custos mensais</p>
          </CardContent>
        </Card>
      </div>

      {/* Formulários */}
      {showFixoForm && (
        <div className="mb-6">
          <CustoFixoForm onClose={() => setShowFixoForm(false)} />
        </div>
      )}

      {showVariavelForm && (
        <div className="mb-6">
          <CustoVariavelForm onClose={() => setShowVariavelForm(false)} />
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="fixos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="fixos">Custos Fixos</TabsTrigger>
          <TabsTrigger value="variaveis">Custos Variáveis</TabsTrigger>
        </TabsList>

        <TabsContent value="fixos">
          <Card>
            <CardHeader>
              <CardTitle>Custos Fixos Mensais</CardTitle>
              <CardDescription>Despesas recorrentes da barbearia</CardDescription>
            </CardHeader>
            <CardContent>
              <CustoFixoList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variaveis">
          <Card>
            <CardHeader>
              <CardTitle>Custos Variáveis</CardTitle>
              <CardDescription>Produtos e materiais consumíveis</CardDescription>
            </CardHeader>
            <CardContent>
              <CustoVariavelList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
