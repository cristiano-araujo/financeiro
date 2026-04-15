"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generateRelatorioFinanceiro, exportCustosFixos, exportCustosVariaveis, exportServicos, exportClientes, exportAgendamentos } from "@/lib/export-utils"
import type { CustoFixo, CustoVariavel, Servico, Cliente, Agendamento, CalculoFinanceiro, Comissao } from "@/lib/types"

interface ExportButtonProps {
  variant?: "relatorio-completo" | "custos-fixos" | "custos-variaveis" | "servicos" | "clientes" | "agendamentos"
  custosFixos?: CustoFixo[]
  custosVariaveis?: CustoVariavel[]
  servicos?: Servico[]
  clientes?: Cliente[]
  agendamentos?: Agendamento[]
  financeiro?: CalculoFinanceiro
  comissoes?: Comissao[]
  className?: string
}

export function ExportButton({
  variant = "relatorio-completo",
  custosFixos = [],
  custosVariaveis = [],
  servicos = [],
  clientes = [],
  agendamentos = [],
  financeiro,
  comissoes = [],
  className
}: ExportButtonProps) {
  const handleExport = () => {
    try {
      switch (variant) {
        case "relatorio-completo":
          if (financeiro) {
            generateRelatorioFinanceiro(custosFixos, custosVariaveis, servicos, clientes, agendamentos, financeiro, comissoes)
          }
          break
        case "custos-fixos":
          exportCustosFixos(custosFixos)
          break
        case "custos-variaveis":
          exportCustosVariaveis(custosVariaveis)
          break
        case "servicos":
          exportServicos(servicos)
          break
        case "clientes":
          exportClientes(clientes)
          break
        case "agendamentos":
          exportAgendamentos(agendamentos)
          break
      }
    } catch (error) {
      console.error("Erro ao exportar:", error)
      alert("Erro ao gerar relatório. Tente novamente.")
    }
  }

  const getButtonText = () => {
    switch (variant) {
      case "relatorio-completo":
        return "Relatório Completo"
      case "custos-fixos":
        return "Exportar Custos Fixos"
      case "custos-variaveis":
        return "Exportar Custos Variáveis"
      case "servicos":
        return "Exportar Serviços"
      case "clientes":
        return "Exportar Clientes"
      case "agendamentos":
        return "Exportar Agendamentos"
      default:
        return "Exportar"
    }
  }

  return (
    <Button
      onClick={handleExport}
      variant="outline"
      size="sm"
      className={className}
    >
      <Download className="h-4 w-4 mr-2" />
      {getButtonText()}
    </Button>
  )
}