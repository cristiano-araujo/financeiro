"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { SidebarNav } from "@/components/sidebar-nav"
import { useEffect } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = "/"
    }
  }, [user, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SidebarNav />
      <main className="lg:pl-64 flex-1">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
