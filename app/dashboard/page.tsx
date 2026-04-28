"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Bot, 
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from "lucide-react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  Cell
} from "recharts"

const DATA = [
  { name: "Seg", agendamentos: 40, receita: 2400 },
  { name: "Ter", agendamentos: 65, receita: 1398 },
  { name: "Qua", agendamentos: 45, receita: 9800 },
  { name: "Qui", agendamentos: 90, receita: 3908 },
  { name: "Sex", agendamentos: 75, receita: 4800 },
  { name: "Sáb", agendamentos: 110, receita: 3800 },
  { name: "Dom", agendamentos: 95, receita: 4300 },
]

export default function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) return null

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
            <h2 className="text-3xl font-black tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Dashboard Executivo
            </h2>
            <Badge className="bg-primary/10 text-primary border-primary/20 animate-pulse">Live</Badge>
        </div>
        <p className="text-muted-foreground font-medium">
          Sua operação de IA em números. Visão completa do funil de vendas.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Conversões IA", value: "84%", trend: "+12%", icon: Bot, color: "text-blue-500", bg: "bg-blue-500/10" },
          { title: "Receita (IA)", value: "R$ 14.280", trend: "+8.2%", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { title: "Novos Leads", value: "+124", trend: "+18%", icon: Users, color: "text-violet-500", bg: "bg-violet-500/10" },
          { title: "Tempo Médio", value: "1.2s", trend: "-5%", icon: MessageSquare, color: "text-orange-500", bg: "bg-orange-500/10" },
        ].map((stat, i) => (
          <Card key={i} className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 border-primary/5 relative overflow-hidden">
            <div className={`absolute -right-4 -top-4 h-16 w-16 ${stat.bg} rounded-full blur-2xl group-hover:scale-150 transition-transform`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-black tracking-tighter">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend.startsWith("+") ? (
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-rose-500" />
                )}
                <span className={`text-[10px] font-black uppercase tracking-widest ${stat.trend.startsWith("+") ? "text-emerald-500" : "text-rose-500"}`}>
                  {stat.trend}
                </span>
                <span className="text-[10px] text-muted-foreground/60 font-medium ml-1 italic">vs ontem</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-2xl border-primary/10 overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardHeader className="bg-muted/30 border-b py-6 px-8">
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle className="text-lg font-black tracking-tight flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Fluxo de Agendamentos (IA)
                    </CardTitle>
                    <CardDescription className="text-xs font-medium">Performance semanal da Secretária Beatriz.</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                        <span className="text-[10px] font-bold uppercase text-muted-foreground">Confirmados</span>
                    </div>
                </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8 px-4">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DATA}>
                  <defs>
                    <linearGradient id="colorAgend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.05} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fill: "currentColor", opacity: 0.5, fontWeight: 700 }}
                    dy={15}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fill: "currentColor", opacity: 0.5, fontWeight: 700 }}
                    dx={-10}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      borderColor: "hsl(var(--primary) / 0.2)",
                      borderRadius: "16px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)"
                    }}
                    cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="agendamentos" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorAgend)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 shadow-2xl border-primary/10 overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardHeader className="bg-muted/30 border-b py-6 px-8">
            <CardTitle className="text-lg font-black tracking-tight">Top Performance</CardTitle>
            <CardDescription className="text-xs font-medium">Interações com maior taxa de conversão.</CardDescription>
          </CardHeader>
          <CardContent className="pt-8 px-8">
            <div className="space-y-6">
              {[
                { name: "Consultório Dr. Silva", growth: 92, color: "bg-blue-500" },
                { name: "Salão Estética Pro", growth: 78, color: "bg-emerald-500" },
                { name: "Escritório Advocacia X", growth: 45, color: "bg-orange-500" },
              ].map((item, i) => (
                <div key={i} className="group space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">{item.name}</span>
                    <span className="font-black text-primary">{item.growth}%</span>
                  </div>
                  <div className="h-3 w-full bg-muted rounded-full overflow-hidden p-0.5 border border-muted-foreground/5">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(0,0,0,0.2)]`} 
                      style={{ width: `${item.growth}%` }}
                    />
                  </div>
                </div>
              ))}
              
              <div className="pt-8 mt-4 border-t border-dashed">
                <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 flex items-start gap-4 relative overflow-hidden group">
                  <div className="absolute -right-2 -bottom-2 opacity-5 transform group-hover:scale-150 transition-transform">
                    <Sparkles className="h-16 w-16 text-primary" />
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Dica da Beatriz</p>
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                      "A taxa de conversão subiu **15%** no Consultório Dr. Silva após habilitarmos o agendamento noturno."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border", className)}>
            {children}
        </span>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ")
}
