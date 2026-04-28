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
import { useEffect, useState } from "react"

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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  return (
    <div 
      className={cn(
        "relative flex flex-col bg-card border-r transition-all duration-500 ease-in-out shadow-xl z-20",
        isCollapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      {/* Toggle Sidebar Button */}
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
            <h1 className="text-xl font-black tracking-tighter text-primary leading-none">AICRM</h1>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold leading-tight mt-1">Pro Edition</p>
          </div>
        )}
      </div>

      <Separator className="mx-6 w-auto opacity-50 mb-2" />

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {!isCollapsed && (
          <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">Menu Principal</p>
        )}
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group relative",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                isActive ? "text-primary" : "group-hover:text-foreground"
              )} />
              {!isCollapsed && (
                <span className="font-semibold text-sm tracking-tight animate-in fade-in slide-in-from-left-2 duration-300">
                  {item.label}
                </span>
              )}
              {isActive && (
                <div className="absolute right-0 h-6 w-1 rounded-l-full bg-primary animate-in slide-in-from-right-1 duration-500" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer / User & Theme */}
      <div className="p-4 mt-auto flex flex-col gap-4">
        {/* Appearance Widget (Visible only when expanded) */}
        {!isCollapsed && (
          <div className="mx-2 p-3 rounded-xl bg-primary/5 border border-primary/10 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">Aparência</span>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 rounded-lg hover:bg-primary/10"
                    onClick={toggleTheme}
                >
                    {mounted && (theme === "dark" ? <Sun className="h-3.5 w-3.5 text-primary" /> : <Moon className="h-3.5 w-3.5 text-primary" />)}
                </Button>
            </div>
            <div className="flex items-center gap-2">
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden p-[1px]">
                    <div className="h-full bg-primary rounded-full w-[84%] shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                </div>
                <span className="text-[9px] font-bold text-primary">84%</span>
            </div>
          </div>
        )}

        {/* Theme Toggle (Visible only when collapsed) */}
        {isCollapsed && (
          <div className="flex justify-center animate-in fade-in zoom-in-95 duration-500">
            <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-xl bg-muted/40 hover:bg-primary/10 border border-transparent hover:border-primary/20"
                onClick={toggleTheme}
            >
                {mounted && (theme === "dark" ? <Sun className="h-5 w-5 text-primary" /> : <Moon className="h-5 w-5 text-primary" />)}
            </Button>
          </div>
        )}

        {/* Profile Section */}
        <div className={cn(
          "flex items-center gap-3 p-2.5 rounded-2xl border bg-muted/20 transition-all hover:bg-muted/30",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          <div className="flex items-center gap-3 overflow-hidden">
            <Avatar className="h-8 w-8 border-2 border-primary/20 shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary font-black text-[10px]">
                {user?.name?.charAt(0) || "A"}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="animate-in fade-in slide-in-from-left-2 duration-300 min-w-0">
                <p className="text-xs font-black truncate leading-none">{user?.name || "Usuário"}</p>
                <p className="text-[9px] text-muted-foreground uppercase font-black tracking-tighter mt-1">{user?.role || "Admin"}</p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive transition-colors shrink-0"
              onClick={logout}
            >
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
