"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/lib/auth-context"
import type { CustoFixo, CustoVariavel, Servico, Cliente, Agendamento, CalculoFinanceiro } from "./types"

interface DataContextType {
  custosFixos: CustoFixo[]
  custosVariaveis: CustoVariavel[]
  servicos: Servico[]
  clientes: Cliente[]
  agendamentos: Agendamento[]
  isLoading: boolean
  addCustoFixo: (custo: Omit<CustoFixo, "id" | "createdAt">) => Promise<void>
  updateCustoFixo: (id: string, custo: Partial<CustoFixo>) => Promise<void>
  deleteCustoFixo: (id: string) => Promise<void>
  addCustoVariavel: (custo: Omit<CustoVariavel, "id" | "createdAt">) => Promise<void>
  updateCustoVariavel: (id: string, custo: Partial<CustoVariavel>) => Promise<void>
  deleteCustoVariavel: (id: string) => Promise<void>
  addServico: (servico: Omit<Servico, "id" | "createdAt">) => Promise<void>
  updateServico: (id: string, servico: Partial<Servico>) => Promise<void>
  deleteServico: (id: string) => Promise<void>
  addCliente: (cliente: Omit<Cliente, "id" | "createdAt">) => Promise<void>
  updateCliente: (id: string, cliente: Partial<Cliente>) => Promise<void>
  deleteCliente: (id: string) => Promise<void>
  addAgendamento: (agendamento: Omit<Agendamento, "id" | "createdAt">) => Promise<void>
  updateAgendamento: (id: string, agendamento: Partial<Agendamento>) => Promise<void>
  deleteAgendamento: (id: string) => Promise<void>
  calcularFinanceiro: () => CalculoFinanceiro
  refreshData: () => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [custosFixos, setCustosFixos] = useState<CustoFixo[]>([])
  const [custosVariaveis, setCustosVariaveis] = useState<CustoVariavel[]>([])
  const [servicos, setServicos] = useState<Servico[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    if (user) {
      refreshData()
    } else {
      setIsLoading(false)
    }
  }, [user])

  const refreshData = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      await Promise.all([loadCustosFixos(), loadCustosVariaveis(), loadServicos(), loadClientes(), loadAgendamentos()])
    } catch (error) {
      console.error("[v0] Erro ao carregar dados:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadCustosFixos = async () => {
    const { data, error } = await supabase.from("custos_fixos").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Erro ao carregar custos fixos:", error)
      return
    }

    setCustosFixos(
      data.map((item) => ({
        id: item.id,
        descricao: item.descricao,
        valor: Number(item.valor),
        createdAt: new Date(item.created_at),
      })),
    )
  }

  const loadCustosVariaveis = async () => {
    const { data, error } = await supabase
      .from("custos_variaveis")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Erro ao carregar custos variáveis:", error)
      return
    }

    setCustosVariaveis(
      data.map((item) => ({
        id: item.id,
        descricao: item.descricao,
        valorUnitario: Number(item.valor_unitario),
        quantidade: 1, // Valor padrão
        createdAt: new Date(item.created_at),
      })),
    )
  }

  const loadServicos = async () => {
    const { data, error } = await supabase.from("servicos").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Erro ao carregar serviços:", error)
      return
    }

    setServicos(
      data.map((item) => ({
        id: item.id,
        nome: item.nome,
        preco: Number(item.preco),
        duracao: item.duracao,
        ativo: item.ativo,
        createdAt: new Date(item.created_at),
      })),
    )
  }

  const loadClientes = async () => {
    const { data, error } = await supabase.from("clientes").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Erro ao carregar clientes:", error)
      return
    }

    setClientes(
      data.map((item) => ({
        id: item.id,
        nome: item.nome,
        telefone: item.telefone,
        email: item.email || undefined,
        dataNascimento: item.data_nascimento ? new Date(item.data_nascimento) : undefined,
        createdAt: new Date(item.created_at),
      })),
    )
  }

  const loadAgendamentos = async () => {
    const { data, error } = await supabase.from("agendamentos").select("*").order("data_hora", { ascending: false })

    if (error) {
      console.error("[v0] Erro ao carregar agendamentos:", error)
      return
    }

    setAgendamentos(
      data.map((item) => ({
        id: item.id,
        clienteId: item.cliente_id,
        servicoId: item.servico_id,
        dataHora: new Date(item.data_hora),
        status: item.status as "agendado" | "confirmado" | "concluido" | "cancelado",
        observacoes: item.observacoes || undefined,
        createdAt: new Date(item.created_at),
      })),
    )
  }

  const addCustoFixo = async (custo: Omit<CustoFixo, "id" | "createdAt">) => {
    if (!user) return

    const { data, error } = await supabase
      .from("custos_fixos")
      .insert({
        descricao: custo.descricao,
        valor: custo.valor,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Erro ao adicionar custo fixo:", error)
      throw error
    }

    await loadCustosFixos()
  }

  const updateCustoFixo = async (id: string, custo: Partial<CustoFixo>) => {
    const { error } = await supabase
      .from("custos_fixos")
      .update({
        descricao: custo.descricao,
        valor: custo.valor,
      })
      .eq("id", id)

    if (error) {
      console.error("[v0] Erro ao atualizar custo fixo:", error)
      throw error
    }

    await loadCustosFixos()
  }

  const deleteCustoFixo = async (id: string) => {
    const { error } = await supabase.from("custos_fixos").delete().eq("id", id)

    if (error) {
      console.error("[v0] Erro ao deletar custo fixo:", error)
      throw error
    }

    await loadCustosFixos()
  }

  const addCustoVariavel = async (custo: Omit<CustoVariavel, "id" | "createdAt">) => {
    if (!user) return

    const { error } = await supabase
      .from("custos_variaveis")
      .insert({
        descricao: custo.descricao,
        valor_unitario: custo.valorUnitario,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Erro ao adicionar custo variável:", error)
      throw error
    }

    await loadCustosVariaveis()
  }

  const updateCustoVariavel = async (id: string, custo: Partial<CustoVariavel>) => {
    const { error } = await supabase
      .from("custos_variaveis")
      .update({
        descricao: custo.descricao,
        valor_unitario: custo.valorUnitario,
      })
      .eq("id", id)

    if (error) {
      console.error("[v0] Erro ao atualizar custo variável:", error)
      throw error
    }

    await loadCustosVariaveis()
  }

  const deleteCustoVariavel = async (id: string) => {
    const { error } = await supabase.from("custos_variaveis").delete().eq("id", id)

    if (error) {
      console.error("[v0] Erro ao deletar custo variável:", error)
      throw error
    }

    await loadCustosVariaveis()
  }

  const addServico = async (servico: Omit<Servico, "id" | "createdAt">) => {
    if (!user) return

    const { error } = await supabase
      .from("servicos")
      .insert({
        nome: servico.nome,
        preco: servico.preco,
        duracao: servico.duracao,
        ativo: servico.ativo,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Erro ao adicionar serviço:", error)
      throw error
    }

    await loadServicos()
  }

  const updateServico = async (id: string, servico: Partial<Servico>) => {
    const { error } = await supabase
      .from("servicos")
      .update({
        nome: servico.nome,
        preco: servico.preco,
        duracao: servico.duracao,
        ativo: servico.ativo,
      })
      .eq("id", id)

    if (error) {
      console.error("[v0] Erro ao atualizar serviço:", error)
      throw error
    }

    await loadServicos()
  }

  const deleteServico = async (id: string) => {
    const { error } = await supabase.from("servicos").delete().eq("id", id)

    if (error) {
      console.error("[v0] Erro ao deletar serviço:", error)
      throw error
    }

    await loadServicos()
  }

  const addCliente = async (cliente: Omit<Cliente, "id" | "createdAt">) => {
    if (!user) return

    const { error } = await supabase
      .from("clientes")
      .insert({
        nome: cliente.nome,
        telefone: cliente.telefone,
        email: cliente.email || null,
        data_nascimento: cliente.dataNascimento?.toISOString().split("T")[0] || null,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Erro ao adicionar cliente:", error)
      throw error
    }

    await loadClientes()
  }

  const updateCliente = async (id: string, cliente: Partial<Cliente>) => {
    const { error } = await supabase
      .from("clientes")
      .update({
        nome: cliente.nome,
        telefone: cliente.telefone,
        email: cliente.email || null,
        data_nascimento: cliente.dataNascimento?.toISOString().split("T")[0] || null,
      })
      .eq("id", id)

    if (error) {
      console.error("[v0] Erro ao atualizar cliente:", error)
      throw error
    }

    await loadClientes()
  }

  const deleteCliente = async (id: string) => {
    const { error } = await supabase.from("clientes").delete().eq("id", id)

    if (error) {
      console.error("[v0] Erro ao deletar cliente:", error)
      throw error
    }

    await loadClientes()
  }

  const addAgendamento = async (agendamento: Omit<Agendamento, "id" | "createdAt">) => {
    if (!user) return

    const { error } = await supabase
      .from("agendamentos")
      .insert({
        cliente_id: agendamento.clienteId,
        servico_id: agendamento.servicoId,
        data_hora: agendamento.dataHora.toISOString(),
        status: agendamento.status,
        observacoes: agendamento.observacoes || null,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Erro ao adicionar agendamento:", error)
      throw error
    }

    await loadAgendamentos()
  }

  const updateAgendamento = async (id: string, agendamento: Partial<Agendamento>) => {
    const updateData: Record<string, unknown> = {}

    if (agendamento.clienteId) updateData.cliente_id = agendamento.clienteId
    if (agendamento.servicoId) updateData.servico_id = agendamento.servicoId
    if (agendamento.dataHora) updateData.data_hora = agendamento.dataHora.toISOString()
    if (agendamento.status) updateData.status = agendamento.status
    if (agendamento.observacoes !== undefined) updateData.observacoes = agendamento.observacoes || null

    const { error } = await supabase.from("agendamentos").update(updateData).eq("id", id)

    if (error) {
      console.error("[v0] Erro ao atualizar agendamento:", error)
      throw error
    }

    await loadAgendamentos()
  }

  const deleteAgendamento = async (id: string) => {
    const { error } = await supabase.from("agendamentos").delete().eq("id", id)

    if (error) {
      console.error("[v0] Erro ao deletar agendamento:", error)
      throw error
    }

    await loadAgendamentos()
  }

  // Cálculos Financeiros
  const calcularFinanceiro = (): CalculoFinanceiro => {
    const totalCustosFixos = custosFixos.reduce((sum, c) => sum + c.valor, 0)
    const totalCustosVariaveis = custosVariaveis.reduce((sum, c) => sum + c.valorUnitario * c.quantidade, 0)
    const custoTotal = totalCustosFixos + totalCustosVariaveis

    const agendamentosConcluidos = agendamentos.filter((a) => a.status === "concluido")
    const receitaAtual = agendamentosConcluidos.reduce((sum, a) => {
      const servico = servicos.find((s) => s.id === a.servicoId)
      return sum + (servico?.preco || 0)
    }, 0)

    const lucroAtual = receitaAtual - custoTotal

    const precoMedio = servicos.length > 0 ? servicos.reduce((sum, s) => sum + s.preco, 0) / servicos.length : 0

    const pontoEquilibrio = precoMedio > 0 ? Math.ceil(custoTotal / precoMedio) : 0

    const receitaNecessaria = custoTotal + custoTotal * 1.5
    const metaLucro150 = precoMedio > 0 ? Math.ceil(receitaNecessaria / precoMedio) : 0

    return {
      totalCustosFixos,
      totalCustosVariaveis,
      custoTotal,
      pontoEquilibrio,
      metaLucro150,
      receitaAtual,
      lucroAtual,
    }
  }

  return (
    <DataContext.Provider
      value={{
        custosFixos,
        custosVariaveis,
        servicos,
        clientes,
        agendamentos,
        isLoading,
        addCustoFixo,
        updateCustoFixo,
        deleteCustoFixo,
        addCustoVariavel,
        updateCustoVariavel,
        deleteCustoVariavel,
        addServico,
        updateServico,
        deleteServico,
        addCliente,
        updateCliente,
        deleteCliente,
        addAgendamento,
        updateAgendamento,
        deleteAgendamento,
        calcularFinanceiro,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
