"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Bot, 
  Calendar, 
  MessageSquare,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Moon,
  Sun
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Calendar, label: "CRM Kanban", href: "/dashboard/crm" },
  { icon: MessageSquare, label: "Conversas IA", href: "/dashboard/chats" },
  { icon: Users, label: "Clientes", href: "/dashboard/clients" },
  { icon: Zap, label: "Serviços", href: "/dashboard/services" },
  { icon: Bot, label: "Configurar IA", href: "/dashboard/ai-settings" },
]

interface SidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
}

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()

  return (
    <div 
      className={cn(
        "relative flex flex-col bg-card border-r transition-all duration-500 ease-in-out shadow-xl z-20",
        isCollapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-10 h-8 w-8 rounded-full border bg-background shadow-md hover:bg-primary hover:text-primary-foreground transition-all z-30"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      {/* Header / Logo */}
      <div className="p-6 flex items-center gap-3 overflow-hidden">
        <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/30 ring-4 ring-primary/10">
          <Sparkles className="h-6 w-6 text-primary-foreground" />
        </div>
        {!isCollapsed && (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            <h1 className="text-xl font-black tracking-tighter text-primary">AICRM</h1>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold leading-tight">Pro Edition</p>
          </div>
        )}
      </div>

      <Separator className="mx-6 w-auto opacity-50" />

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {!isCollapsed && (
          <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Menu Principal</p>
        )}
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]" 
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                isActive ? "text-primary-foreground" : "group-hover:text-primary"
              )} />
              {!isCollapsed && (
                <span className="font-semibold tracking-tight animate-in fade-in slide-in-from-left-2 duration-300">
                  {item.label}
                </span>
              )}
              {isActive && !isCollapsed && (
                <div className="absolute right-4 h-1.5 w-1.5 rounded-full bg-primary-foreground animate-pulse" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Theme Toggle & User */}
      <div className="p-4 mt-auto space-y-4">
        {/* Theme Toggle */}
        <div className={cn(
          "flex items-center gap-2 p-1 rounded-xl bg-muted/50 border",
          isCollapsed ? "flex-col" : "flex-row"
        )}>
          <Button 
            variant={theme === "light" ? "secondary" : "ghost"} 
            size="icon" 
            className="h-8 w-full rounded-lg"
            onClick={() => setTheme("light")}
          >
            <Sun className="h-4 w-4" />
          </Button>
          <Button 
            variant={theme === "dark" ? "secondary" : "ghost"} 
            size="icon" 
            className="h-8 w-full rounded-lg"
            onClick={() => setTheme("dark")}
          >
            <Moon className="h-4 w-4" />
          </Button>
        </div>

        <div className={cn(
          "flex items-center gap-3 p-3 rounded-2xl border bg-muted/30 transition-all",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          <div className="flex items-center gap-3 overflow-hidden">
            <Avatar className="h-9 w-9 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                {user?.name?.charAt(0) || "A"}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                <p className="text-xs font-bold truncate max-w-[120px]">{user?.name || "Usuário"}</p>
                <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">{user?.role || "Admin"}</p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-colors"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
