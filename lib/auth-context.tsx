"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "./types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  getAllUsers: () => Array<User & { password: string }>
  addUser: (userData: Omit<User, "id" | "createdAt"> & { password: string }) => void
  updateUser: (id: string, userData: Partial<User & { password?: string }>) => void
  deleteUser: (id: string) => void
  registerUser: (userData: {
    name: string
    email: string
    password: string
    role: "admin" | "user"
  }) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Usuários iniciais para demonstração
const INITIAL_USERS: Array<User & { password: string }> = [
  {
    id: "admin-1",
    name: "Administrador",
    email: "admin@barbearia.com",
    password: "admin123",
    role: "admin",
    createdAt: new Date(),
  },
  {
    id: "barbeiro-1",
    name: "Barbeiro 1",
    email: "barbeiro1@barbearia.com",
    password: "barbeiro123",
    role: "user",
    createdAt: new Date(),
  },
  {
    id: "barbeiro-2",
    name: "Barbeiro 2",
    email: "barbeiro2@barbearia.com",
    password: "barbeiro123",
    role: "user",
    createdAt: new Date(),
  },
  {
    id: "barbeiro-3",
    name: "Barbeiro 3",
    email: "barbeiro3@barbearia.com",
    password: "barbeiro123",
    role: "user",
    createdAt: new Date(),
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<Array<User & { password: string }>>([])

  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem("barbershop_users")
      const initializedV2 = localStorage.getItem("barbershop_users_v2_initialized")

      if (savedUsers && initializedV2) {
        setUsers(JSON.parse(savedUsers))
      } else {
        // Forçar atualização para a nova lista (1 Admin + 3 Barbeiros)
        setUsers(INITIAL_USERS)
        localStorage.setItem("barbershop_users", JSON.stringify(INITIAL_USERS))
        localStorage.setItem("barbershop_users_v2_initialized", "true")
        console.log("[v0] Usuários resetados para o novo padrão: 1 Admin e 3 Barbeiros")
      }

      // Verificar se há usuário logado salvo no sessionStorage (individual por aba)
      const savedUser = sessionStorage.getItem("barbershop_user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      } else {
        // Migração/Limpeza: Se houver resto de login no localStorage, remover para evitar conflito
        localStorage.removeItem("barbershop_user")
      }
    } catch (error) {
      console.error("[v0] Erro ao carregar usuários ou sessão:", error)
      // Em caso de erro crítico nos dados, resetar usuários
      setUsers(INITIAL_USERS)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = users.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      sessionStorage.setItem("barbershop_user", JSON.stringify(userWithoutPassword))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem("barbershop_user")
  }

  const registerUser = async (userData: {
    name: string
    email: string
    password: string
    role: "admin" | "user"
  }): Promise<boolean> => {
    console.log("[v0] Tentando registrar usuário:", userData.email)

    // Verificar se o email já existe
    const emailExists = users.some((u) => u.email === userData.email)
    if (emailExists) {
      console.log("[v0] Email já cadastrado:", userData.email)
      return false
    }

    // Criar novo usuário
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date(),
    }

    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)
    localStorage.setItem("barbershop_users", JSON.stringify(updatedUsers))

    console.log("[v0] Usuário registrado com sucesso:", userData.email)

    // Fazer login automático
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    sessionStorage.setItem("barbershop_user", JSON.stringify(userWithoutPassword))

    return true
  }

  const getAllUsers = () => {
    return users
  }

  const addUser = (userData: Omit<User, "id" | "createdAt"> & { password: string }) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)
    localStorage.setItem("barbershop_users", JSON.stringify(updatedUsers))
  }

  const updateUser = (id: string, userData: Partial<User & { password?: string }>) => {
    const updatedUsers = users.map((u) => (u.id === id ? { ...u, ...userData } : u))
    setUsers(updatedUsers)
    localStorage.setItem("barbershop_users", JSON.stringify(updatedUsers))

    // Se o usuário atualizado é o usuário logado, atualizar também
    if (user?.id === id) {
      const { password: _, ...userWithoutPassword } = updatedUsers.find((u) => u.id === id)!
      setUser(userWithoutPassword)
      sessionStorage.setItem("barbershop_user", JSON.stringify(userWithoutPassword))
    }
  }

  const deleteUser = (id: string) => {
    const updatedUsers = users.filter((u) => u.id !== id)
    setUsers(updatedUsers)
    localStorage.setItem("barbershop_users", JSON.stringify(updatedUsers))
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoading, getAllUsers, addUser, updateUser, deleteUser, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
