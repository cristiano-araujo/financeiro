"use client"

import { useAuth } from "@/lib/auth-context"
import { RegisterForm } from "@/components/register-form"
import { useEffect } from "react"

export default function CadastroPage() {
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && user) {
      window.location.href = "/dashboard"
    }
  }, [user, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    )
  }

  if (user) {
    return null
  }

  return <RegisterForm />
}
