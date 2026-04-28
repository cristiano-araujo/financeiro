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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { cn } from "@/lib/utils"

import { db } from "@/lib/db"

const DEFAULT_DATA = [
  { name: "Seg", agendamentos: 0 },
  { name: "Ter", agendamentos: 0 },
  { name: "Qua", agendamentos: 0 },
  { name: "Qui", agendamentos: 0 },
  { name: "Sex", agendamentos: 0 },
  { name: "Sáb", agendamentos: 0 },
  { name: "Dom", agendamentos: 0 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/60 backdrop-blur-xl border border-primary/20 p-4 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
          <p className="text-sm font-black tracking-tight">
            agendamentos: <span className="text-primary">{payload[0].value}</span>
          </p>
        </div>
      </div>
    )
  }
  return null
}

export default function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [stats, setStats] = useState({ totalLeads: 0, totalRevenue: 0, conversionRate: 0 })
  const [chartData, setChartData] = useState(DEFAULT_DATA)

  useEffect(() => {
    async function loadDashboard() {
      const [statsData, weeklyData] = await Promise.all([
        db.getDashboardStats(),
        db.getWeeklyAppointments()
      ])
      
      setStats(statsData)
      if (weeklyData.length > 0) {
        setChartData(weeklyData)
      }
      setIsLoaded(true)
    }
    loadDashboard()
  }, [])

  if (!isLoaded) return (
    <div className="flex items-center justify-center h-[60vh] text-primary font-black animate-pulse">
        Carregando Insights...
    </div>
  )

  const statsCards = [
    { title: "Conversões IA", value: `${stats.conversionRate}%`, trend: "+12%", icon: Bot, color: "text-blue-400", bg: "bg-blue-400/10" },
    { title: "Receita (IA)", value: `R$ ${stats.totalRevenue.toLocaleString()}`, trend: "+8.2%", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { title: "Novos Leads", value: `+${stats.totalLeads}`, trend: "+18%", icon: Users, color: "text-violet-400", bg: "bg-violet-400/10" },
    { title: "Tempo Médio", value: "1.2s", trend: "-5%", icon: MessageSquare, color: "text-orange-400", bg: "bg-orange-400/10" },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
            Dashboard Executivo
          </h2>
          <Badge className="bg-primary/20 text-primary border-primary/30 animate-pulse">Live</Badge>
        </div>
        <p className="text-muted-foreground font-medium">
          Sua operação de IA em números. Visão completa do funil de vendas.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, i) => (
          <Card key={i} className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 border-primary/5 relative overflow-hidden bg-card/50 backdrop-blur-sm">
            <div className={`absolute -right-4 -top-4 h-16 w-16 ${stat.bg} rounded-full blur-2xl group-hover:scale-150 transition-transform`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-black tracking-tighter">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend.startsWith("+") ? (
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-rose-500" />
                )}
                <span className={`text-[9px] font-black uppercase tracking-widest ${stat.trend.startsWith("+") ? "text-emerald-500" : "text-rose-500"}`}>
                  {stat.trend}
                </span>
                <span className="text-[9px] text-muted-foreground/60 font-medium ml-1">vs ontem</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-2xl border-primary/10 overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl">
          <CardHeader className="bg-muted/10 border-b border-primary/5 py-5 px-8">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-black tracking-tight flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Fluxo de Agendamentos (IA)
                </CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Performance: Secretária Beatriz</CardDescription>
              </div>
              <div className="flex items-center gap-3 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.1)]">
                <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),1)] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Confirmados</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-10 px-4">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAgend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground))" opacity={0.08} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", fontWeight: 900 }}
                    dy={15}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", fontWeight: 900 }}
                    dx={-10}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, strokeDasharray: '6 6' }} />
                  <Area
                    type="monotone"
                    dataKey="agendamentos"
                    stroke="hsl(var(--primary))"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorAgend)"
                    animationDuration={2500}
                    activeDot={{
                      r: 6,
                      strokeWidth: 2,
                      stroke: "hsl(var(--background))",
                      fill: "hsl(var(--primary))",
                      className: "drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]"
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 shadow-2xl border-primary/10 overflow-hidden bg-card/40 backdrop-blur-md">
          <CardHeader className="bg-muted/20 border-b py-5 px-8">
            <CardTitle className="text-lg font-black tracking-tight">Top Performance</CardTitle>
            <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Canais de maior conversão</CardDescription>
          </CardHeader>
          <CardContent className="pt-10 px-8">
            <div className="space-y-7">
              {[
                { name: "WhatsApp Business", growth: 92, color: "bg-emerald-500" },
                { name: "Direct Instagram", growth: 78, color: "bg-blue-400" },
                { name: "Site Institucional", growth: 45, color: "bg-orange-400" },
              ].map((item, i) => (
                <div key={i} className="group space-y-3">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-black uppercase tracking-widest text-muted-foreground/80 group-hover:text-primary transition-colors">{item.name}</span>
                    <span className="font-black text-primary">{item.growth}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden border border-muted-foreground/5 p-0">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,0,0,0.4)]`}
                      style={{ width: `${item.growth}%` }}
                    />
                  </div>
                </div>
              ))}

              <div className="pt-10 mt-4 border-t border-dashed border-primary/10">
                <div className="bg-primary/10 rounded-2xl p-5 border border-primary/20 flex items-start gap-4 relative overflow-hidden group shadow-inner">
                  <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3" />
                      Insight IA Beatriz
                    </p>
                    <p className="text-[11px] text-foreground font-bold leading-relaxed italic">
                      "O WhatsApp continua sendo seu canal mais forte. Ativar o 'Modo Urgência' lá pode aumentar as vendas em 12%."
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
    <span className={cn("px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm", className)}>
      {children}
    </span>
  )
}
