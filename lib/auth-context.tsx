"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, UserRole } from "./types"

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
    role: UserRole
    businessId: string
  }) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const INITIAL_USERS: Array<User & { password: string }> = [
  {
    id: "1",
    name: "Cristiano",
    email: "cristiano11715@gmail.com",
    password: "admin",
    role: "admin",
    businessId: "1",
    createdAt: new Date(),
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<Array<User & { password: string }>>([])

  useEffect(() => {
    const savedUsers = localStorage.getItem("aicrm_users")
    let parsedUsers = savedUsers ? JSON.parse(savedUsers) : []

    // Verify if default user with the new email exists
    const hasDefaultUser = parsedUsers.some((u: any) => u.email === "cristiano11715@gmail.com")

    if (!hasDefaultUser) {
      // Force reset to new default user and clear old logged-in session (e.g. Afonso Lopes or admin@crm.com)
      parsedUsers = INITIAL_USERS
      localStorage.setItem("aicrm_users", JSON.stringify(INITIAL_USERS))
      localStorage.removeItem("aicrm_user")
    }

    setUsers(parsedUsers)

    const savedUser = localStorage.getItem("aicrm_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else if (!hasDefaultUser) {
      // Force logout visually
      setUser(null)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = users.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("aicrm_user", JSON.stringify(userWithoutPassword))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("aicrm_user")
  }

  const registerUser = async (userData: {
    name: string
    email: string
    password: string
    role: UserRole
    businessId: string
  }): Promise<boolean> => {
    const emailExists = users.some((u) => u.email === userData.email)
    if (emailExists) return false

    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date(),
    }

    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)
    localStorage.setItem("aicrm_users", JSON.stringify(updatedUsers))

    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("aicrm_user", JSON.stringify(userWithoutPassword))

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
    localStorage.setItem("aicrm_users", JSON.stringify(updatedUsers))
  }

  const updateUser = (id: string, userData: Partial<User & { password?: string }>) => {
    const updatedUsers = users.map((u) => (u.id === id ? { ...u, ...userData } : u))
    setUsers(updatedUsers)
    localStorage.setItem("aicrm_users", JSON.stringify(updatedUsers))

    if (user?.id === id) {
      const { password: _, ...userWithoutPassword } = updatedUsers.find((u) => u.id === id)!
      setUser(userWithoutPassword)
      localStorage.setItem("aicrm_user", JSON.stringify(userWithoutPassword))
    }
  }

  const deleteUser = (id: string) => {
    const updatedUsers = users.filter((u) => u.id !== id)
    setUsers(updatedUsers)
    localStorage.setItem("aicrm_users", JSON.stringify(updatedUsers))
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
