"use client"

import { useState } from "react"
import { useData } from "@/lib/data-context"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2 } from "lucide-react"
import { ServicoForm } from "@/components/servico-form"
import type { Servico } from "@/lib/types"

export function ServicoList() {
  const { servicos, deleteServico } = useData()
  const [editingServico, setEditingServico] = useState<Servico | null>(null)

  if (servicos.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Nenhum serviço cadastrado</div>
  }

  if (editingServico) {
    return <ServicoForm onClose={() => setEditingServico(null)} editingServico={editingServico} />
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="text-right">Preço</TableHead>
            <TableHead className="text-right">Duração</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {servicos.map((servico) => (
            <TableRow key={servico.id}>
              <TableCell className="font-medium">{servico.nome}</TableCell>
              <TableCell className="max-w-xs truncate">{servico.descricao}</TableCell>
              <TableCell className="text-right">R$ {servico.preco.toFixed(2)}</TableCell>
              <TableCell className="text-right">{servico.duracao} min</TableCell>
              <TableCell>
                <Badge variant={servico.ativo ? "default" : "secondary"}>{servico.ativo ? "Ativo" : "Inativo"}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="icon" variant="ghost" onClick={() => setEditingServico(servico)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => deleteServico(servico.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
