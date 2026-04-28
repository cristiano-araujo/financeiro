"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  LogOut, 
  Bot,
  Layers,
  MessageSquare
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "CRM / Kanban",
    icon: Layers,
    href: "/dashboard/crm",
    color: "text-violet-500",
  },
  {
    label: "Agendamentos",
    icon: Calendar,
    href: "/dashboard/appointments",
    color: "text-pink-700",
  },
  {
    label: "Conversas IA",
    icon: MessageSquare,
    href: "/dashboard/chats",
    color: "text-orange-700",
  },
  {
    label: "Clientes",
    icon: Users,
    href: "/dashboard/clients",
    color: "text-emerald-500",
  },
  {
    label: "Configurações IA",
    icon: Bot,
    href: "/dashboard/ai-settings",
    color: "text-yellow-500",
  },
  {
    label: "Configurações",
    icon: Settings,
    href: "/dashboard/settings",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { logout, user } = useAuth()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14 gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <Bot className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">AI CRM</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2 border-t border-white/10">
        <div className="flex items-center gap-x-3 px-3 py-2 mb-4">
          <div className="bg-zinc-700 h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs uppercase">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium">{user?.name || "Usuário"}</p>
            <p className="text-xs text-zinc-400 capitalize">{user?.role || "Acesso"}</p>
          </div>
        </div>
        <Button onClick={logout} variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/10" size="sm">
          <LogOut className="h-4 w-4 mr-3" />
          Sair
        </Button>
      </div>
    </div>
  )
}
