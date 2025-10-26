"use client"

import { useState } from "react"
import { useData } from "@/lib/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Check, X } from "lucide-react"
import type { CustoFixo } from "@/lib/types"

export function CustoFixoList() {
  const { custosFixos, updateCustoFixo, deleteCustoFixo } = useData()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<CustoFixo>>({})

  const handleEdit = (custo: CustoFixo) => {
    setEditingId(custo.id)
    setEditForm(custo)
  }

  const handleSave = () => {
    if (editingId) {
      updateCustoFixo(editingId, editForm)
      setEditingId(null)
      setEditForm({})
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm({})
  }

  if (custosFixos.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Nenhum custo fixo cadastrado</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {custosFixos.map((custo) => (
            <TableRow key={custo.id}>
              <TableCell>
                {editingId === custo.id ? (
                  <Input
                    value={editForm.descricao}
                    onChange={(e) => setEditForm({ ...editForm, descricao: e.target.value })}
                  />
                ) : (
                  custo.descricao
                )}
              </TableCell>
              <TableCell>
                {editingId === custo.id ? (
                  <Input
                    value={editForm.categoria}
                    onChange={(e) => setEditForm({ ...editForm, categoria: e.target.value })}
                  />
                ) : (
                  custo.categoria
                )}
              </TableCell>
              <TableCell className="text-right">
                {editingId === custo.id ? (
                  <Input
                    type="number"
                    step="0.01"
                    value={editForm.valor}
                    onChange={(e) => setEditForm({ ...editForm, valor: Number.parseFloat(e.target.value) })}
                  />
                ) : (
                  `R$ ${custo.valor.toFixed(2)}`
                )}
              </TableCell>
              <TableCell className="text-right">
                {editingId === custo.id ? (
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" onClick={handleSave}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={handleCancel}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" onClick={() => handleEdit(custo)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => deleteCustoFixo(custo.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
