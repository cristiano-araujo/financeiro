export type UserRole = "admin" | "user"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: Date
}

export interface CustoFixo {
  id: string
  descricao: string
  valor: number
  categoria: string
  createdAt: Date
}

export interface CustoVariavel {
  id: string
  descricao: string
  valorUnitario: number
  quantidade: number
  categoria: string
  createdAt: Date
}

export interface Servico {
  id: string
  nome: string
  descricao: string
  preco: number
  duracao: number // em minutos
  ativo: boolean
  createdAt: Date
}

export interface Cliente {
  id: string
  nome: string
  telefone: string
  email?: string
  dataNascimento?: Date
  observacoes?: string
  createdAt: Date
}

export interface Agendamento {
  id: string
  clienteId: string
  servicoId: string
  usuarioId: string // ID de quem realizou o serviço
  usuarioNome: string // Nome do usuário
  data: Date
  horario: string
  status: "agendado" | "confirmado" | "concluido" | "cancelado"
  observacoes?: string
  createdAt: Date
}

export interface Comissao {
  usuarioId: string
  usuarioNome: string
  totalServicos: number
  somaReceitaServicos: number
  comissao10Porcento: number
}

export interface CalculoFinanceiro {
  totalCustosFixos: number
  totalCustosVariaveis: number
  custoTotal: number
  pontoEquilibrio: number
  metaLucro150: number
  receitaAtual: number
  lucroAtual: number
  comissoes: Comissao[]
  totalComissoes: number
}
