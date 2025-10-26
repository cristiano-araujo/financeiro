export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          nome: string
          role: "admin" | "user"
          created_at: string
        }
        Insert: {
          id: string
          nome: string
          role: "admin" | "user"
          created_at?: string
        }
        Update: {
          id?: string
          nome?: string
          role?: "admin" | "user"
          created_at?: string
        }
      }
      custos_fixos: {
        Row: {
          id: string
          descricao: string
          valor: number
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          descricao: string
          valor: number
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          descricao?: string
          valor?: number
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      custos_variaveis: {
        Row: {
          id: string
          descricao: string
          valor_unitario: number
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          descricao: string
          valor_unitario: number
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          descricao?: string
          valor_unitario?: number
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      servicos: {
        Row: {
          id: string
          nome: string
          preco: number
          duracao: number
          ativo: boolean
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nome: string
          preco: number
          duracao: number
          ativo?: boolean
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nome?: string
          preco?: number
          duracao?: number
          ativo?: boolean
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      clientes: {
        Row: {
          id: string
          nome: string
          telefone: string
          email: string | null
          data_nascimento: string | null
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nome: string
          telefone: string
          email?: string | null
          data_nascimento?: string | null
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nome?: string
          telefone?: string
          email?: string | null
          data_nascimento?: string | null
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      agendamentos: {
        Row: {
          id: string
          cliente_id: string
          servico_id: string
          data_hora: string
          status: "agendado" | "confirmado" | "concluido" | "cancelado"
          observacoes: string | null
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          cliente_id: string
          servico_id: string
          data_hora: string
          status: "agendado" | "confirmado" | "concluido" | "cancelado"
          observacoes?: string | null
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          cliente_id?: string
          servico_id?: string
          data_hora?: string
          status?: "agendado" | "confirmado" | "concluido" | "cancelado"
          observacoes?: string | null
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
