"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-primary font-black animate-pulse">
        AICRM...
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar Container */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      {/* Main Content Area */}
      <main 
        className={cn(
          "flex-1 overflow-y-auto transition-all duration-500 ease-in-out bg-background/50",
          isCollapsed ? "pl-0" : "pl-0" // We'll use flex-1 and the sidebar will naturally push it
        )}
      >
        <div className="container mx-auto p-4 md:p-8 max-w-full">
          {children}
        </div>
      </main>
    </div>
  )
}
