"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface Profile {
  id: string
  nome: string
  role: "admin" | "user"
  created_at: string
}

interface User {
  id: string
  email: string
  nome: string
  role: "admin" | "user"
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  isLoading: boolean
  registerUser: (userData: { name: string; email: string; password: string }) => Promise<boolean>
  getAllProfiles: () => Promise<Profile[]>
  updateProfile: (id: string, data: Partial<Profile>) => Promise<boolean>
  deleteProfile: (id: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          await loadUserProfile(session.user)
        }
      } catch (error) {
        console.error("[v0] Erro ao verificar sessão:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await loadUserProfile(session.user)
      } else {
        setUser(null)
        setProfile(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const loadUserProfile = async (authUser: SupabaseUser) => {
    try {
      const { data: profileData, error } = await supabase.from("profiles").select("*").eq("id", authUser.id).single()

      if (error) throw error

      if (profileData) {
        setProfile(profileData)
        setUser({
          id: authUser.id,
          email: authUser.email!,
          nome: profileData.nome,
          role: profileData.role,
        })
      }
    } catch (error) {
      console.error("[v0] Erro ao carregar perfil:", error)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        await loadUserProfile(data.user)
        return true
      }

      return false
    } catch (error) {
      console.error("[v0] Erro no login:", error)
      return false
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
    } catch (error) {
      console.error("[v0] Erro no logout:", error)
    }
  }

  const registerUser = async (userData: {
    name: string
    email: string
    password: string
  }): Promise<boolean> => {
    try {
      console.log("[v0] Tentando registrar usuário:", userData.email)

      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            nome: userData.name,
            role: "user",
          },
        },
      })

      if (error) throw error

      console.log("[v0] Usuário registrado com sucesso:", userData.email)

      // Se não requer confirmação de email, fazer login automático
      if (data.user && data.session) {
        await loadUserProfile(data.user)
        return true
      }

      return true
    } catch (error) {
      console.error("[v0] Erro ao registrar:", error)
      return false
    }
  }

  const getAllProfiles = async (): Promise<Profile[]> => {
    try {
      const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("[v0] Erro ao buscar perfis:", error)
      return []
    }
  }

  const updateProfile = async (id: string, profileData: Partial<Profile>): Promise<boolean> => {
    try {
      const { error } = await supabase.from("profiles").update(profileData).eq("id", id)

      if (error) throw error

      // Se atualizou o próprio perfil, recarregar
      if (id === user?.id) {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()
        if (authUser) {
          await loadUserProfile(authUser)
        }
      }

      return true
    } catch (error) {
      console.error("[v0] Erro ao atualizar perfil:", error)
      return false
    }
  }

  const deleteProfile = async (id: string): Promise<boolean> => {
    try {
      // Deletar o usuário do auth (cascade vai deletar o perfil)
      const { error } = await supabase.auth.admin.deleteUser(id)

      if (error) throw error
      return true
    } catch (error) {
      console.error("[v0] Erro ao deletar perfil:", error)
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        login,
        logout,
        isLoading,
        registerUser,
        getAllProfiles,
        updateProfile,
        deleteProfile,
      }}
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
