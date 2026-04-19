"use client"

import { useData } from "@/lib/data-context"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ComissoesList() {
  const { calcularComissoes, configuracao } = useData()
  const { user } = useAuth()
  
  const allComissoes = calcularComissoes()
  const isAdmin = user?.role === "admin"
  
  const comissoes = isAdmin 
    ? allComissoes 
    : allComissoes.filter(c => c.usuarioId === user?.id)

  if (comissoes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Comissões</CardTitle>
          <CardDescription>Comissões geradas pelos serviços concluídos (Base global: {configuracao.percentualComissao}%)</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Nenhuma comissão registrada ainda.</p>
        </CardContent>
      </Card>
    )
  }

  const totalComissoes = comissoes.reduce((sum, c) => sum + c.valorComissao, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isAdmin ? "Relatório de Comissões" : "Sua Produção e Comissão"}</CardTitle>
        <CardDescription>
          {isAdmin ? "Comissões calculadas com base no serviço ou taxa global" : `Resumo da sua produção e comissão acumulada`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profissional</TableHead>
                <TableHead className="text-right">Serviços</TableHead>
                <TableHead className="text-right">Receita</TableHead>
                <TableHead className="text-right">Total Comissão</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comissoes.map((comissao) => (
                <TableRow key={comissao.usuarioId}>
                  <TableCell className="font-medium">{comissao.usuarioNome}</TableCell>
                  <TableCell className="text-right">{comissao.totalServicos}</TableCell>
                  <TableCell className="text-right">R$ {comissao.somaReceitaServicos.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-semibold text-amber-600">
                    R$ {comissao.valorComissao.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              {isAdmin && (
                <TableRow className="bg-muted font-semibold">
                  <TableCell colSpan={3} className="text-right">
                    Total de Comissões:
                  </TableCell>
                  <TableCell className="text-right text-amber-600">R$ {totalComissoes.toFixed(2)}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
