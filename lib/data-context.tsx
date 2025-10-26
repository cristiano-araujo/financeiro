"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CustoFixo, CustoVariavel, Servico, Cliente, Agendamento, CalculoFinanceiro } from "./types"

interface DataContextType {
  custosFixos: CustoFixo[]
  custosVariaveis: CustoVariavel[]
  servicos: Servico[]
  clientes: Cliente[]
  agendamentos: Agendamento[]
  addCustoFixo: (custo: Omit<CustoFixo, "id" | "createdAt">) => void
  updateCustoFixo: (id: string, custo: Partial<CustoFixo>) => void
  deleteCustoFixo: (id: string) => void
  addCustoVariavel: (custo: Omit<CustoVariavel, "id" | "createdAt">) => void
  updateCustoVariavel: (id: string, custo: Partial<CustoVariavel>) => void
  deleteCustoVariavel: (id: string) => void
  addServico: (servico: Omit<Servico, "id" | "createdAt">) => void
  updateServico: (id: string, servico: Partial<Servico>) => void
  deleteServico: (id: string) => void
  addCliente: (cliente: Omit<Cliente, "id" | "createdAt">) => void
  updateCliente: (id: string, cliente: Partial<Cliente>) => void
  deleteCliente: (id: string) => void
  addAgendamento: (agendamento: Omit<Agendamento, "id" | "createdAt">) => void
  updateAgendamento: (id: string, agendamento: Partial<Agendamento>) => void
  deleteAgendamento: (id: string) => void
  calcularFinanceiro: () => CalculoFinanceiro
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [custosFixos, setCustosFixos] = useState<CustoFixo[]>([])
  const [custosVariaveis, setCustosVariaveis] = useState<CustoVariavel[]>([])
  const [servicos, setServicos] = useState<Servico[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])

  // Carregar dados do localStorage
  useEffect(() => {
    const loadData = () => {
      const savedCustosFixos = localStorage.getItem("barbershop_custos_fixos")
      const savedCustosVariaveis = localStorage.getItem("barbershop_custos_variaveis")
      const savedServicos = localStorage.getItem("barbershop_servicos")
      const savedClientes = localStorage.getItem("barbershop_clientes")
      const savedAgendamentos = localStorage.getItem("barbershop_agendamentos")

      if (savedCustosFixos) setCustosFixos(JSON.parse(savedCustosFixos))
      if (savedCustosVariaveis) setCustosVariaveis(JSON.parse(savedCustosVariaveis))
      if (savedServicos) setServicos(JSON.parse(savedServicos))
      if (savedClientes) setClientes(JSON.parse(savedClientes))
      if (savedAgendamentos) setAgendamentos(JSON.parse(savedAgendamentos))
    }
    loadData()
  }, [])

  // Salvar dados no localStorage
  useEffect(() => {
    localStorage.setItem("barbershop_custos_fixos", JSON.stringify(custosFixos))
  }, [custosFixos])

  useEffect(() => {
    localStorage.setItem("barbershop_custos_variaveis", JSON.stringify(custosVariaveis))
  }, [custosVariaveis])

  useEffect(() => {
    localStorage.setItem("barbershop_servicos", JSON.stringify(servicos))
  }, [servicos])

  useEffect(() => {
    localStorage.setItem("barbershop_clientes", JSON.stringify(clientes))
  }, [clientes])

  useEffect(() => {
    localStorage.setItem("barbershop_agendamentos", JSON.stringify(agendamentos))
  }, [agendamentos])

  // CRUD Custos Fixos
  const addCustoFixo = (custo: Omit<CustoFixo, "id" | "createdAt">) => {
    const newCusto: CustoFixo = {
      ...custo,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }
    setCustosFixos([...custosFixos, newCusto])
  }

  const updateCustoFixo = (id: string, custo: Partial<CustoFixo>) => {
    setCustosFixos(custosFixos.map((c) => (c.id === id ? { ...c, ...custo } : c)))
  }

  const deleteCustoFixo = (id: string) => {
    setCustosFixos(custosFixos.filter((c) => c.id !== id))
  }

  // CRUD Custos Variáveis
  const addCustoVariavel = (custo: Omit<CustoVariavel, "id" | "createdAt">) => {
    const newCusto: CustoVariavel = {
      ...custo,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }
    setCustosVariaveis([...custosVariaveis, newCusto])
  }

  const updateCustoVariavel = (id: string, custo: Partial<CustoVariavel>) => {
    setCustosVariaveis(custosVariaveis.map((c) => (c.id === id ? { ...c, ...custo } : c)))
  }

  const deleteCustoVariavel = (id: string) => {
    setCustosVariaveis(custosVariaveis.filter((c) => c.id !== id))
  }

  // CRUD Serviços
  const addServico = (servico: Omit<Servico, "id" | "createdAt">) => {
    const newServico: Servico = {
      ...servico,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }
    setServicos([...servicos, newServico])
  }

  const updateServico = (id: string, servico: Partial<Servico>) => {
    setServicos(servicos.map((s) => (s.id === id ? { ...s, ...servico } : s)))
  }

  const deleteServico = (id: string) => {
    setServicos(servicos.filter((s) => s.id !== id))
  }

  // CRUD Clientes
  const addCliente = (cliente: Omit<Cliente, "id" | "createdAt">) => {
    const newCliente: Cliente = {
      ...cliente,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }
    setClientes([...clientes, newCliente])
  }

  const updateCliente = (id: string, cliente: Partial<Cliente>) => {
    setClientes(clientes.map((c) => (c.id === id ? { ...c, ...cliente } : c)))
  }

  const deleteCliente = (id: string) => {
    setClientes(clientes.filter((c) => c.id !== id))
  }

  // CRUD Agendamentos
  const addAgendamento = (agendamento: Omit<Agendamento, "id" | "createdAt">) => {
    const newAgendamento: Agendamento = {
      ...agendamento,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }
    setAgendamentos([...agendamentos, newAgendamento])
  }

  const updateAgendamento = (id: string, agendamento: Partial<Agendamento>) => {
    setAgendamentos(agendamentos.map((a) => (a.id === id ? { ...a, ...agendamento } : a)))
  }

  const deleteAgendamento = (id: string) => {
    setAgendamentos(agendamentos.filter((a) => a.id !== id))
  }

  // Cálculos Financeiros
  const calcularFinanceiro = (): CalculoFinanceiro => {
    const totalCustosFixos = custosFixos.reduce((sum, c) => sum + c.valor, 0)
    const totalCustosVariaveis = custosVariaveis.reduce((sum, c) => sum + c.valorUnitario * c.quantidade, 0)
    const custoTotal = totalCustosFixos + totalCustosVariaveis

    // Calcular receita atual baseada em agendamentos concluídos
    const agendamentosConcluidos = agendamentos.filter((a) => a.status === "concluido")
    const receitaAtual = agendamentosConcluidos.reduce((sum, a) => {
      const servico = servicos.find((s) => s.id === a.servicoId)
      return sum + (servico?.preco || 0)
    }, 0)

    const lucroAtual = receitaAtual - custoTotal

    // Preço médio dos serviços
    const precoMedio = servicos.length > 0 ? servicos.reduce((sum, s) => sum + s.preco, 0) / servicos.length : 0

    // Ponto de equilíbrio: quantos serviços precisam ser vendidos para cobrir custos
    const pontoEquilibrio = precoMedio > 0 ? Math.ceil(custoTotal / precoMedio) : 0

    // Meta de 150% de lucro: receita = custos + 150% dos custos
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
