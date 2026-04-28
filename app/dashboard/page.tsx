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
  ArrowDownRight
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
  Area 
} from "recharts"

const DATA = [
  { name: "Seg", agendamentos: 40, receita: 2400 },
  { name: "Ter", agendamentos: 30, receita: 1398 },
  { name: "Qua", agendamentos: 20, receita: 9800 },
  { name: "Qui", agendamentos: 27, receita: 3908 },
  { name: "Sex", agendamentos: 18, receita: 4800 },
  { name: "Sáb", agendamentos: 23, receita: 3800 },
  { name: "Dom", agendamentos: 34, receita: 4300 },
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
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
          Dashboard Executivo
        </h2>
        <p className="text-muted-foreground">
          Sua operação de IA em números. Visão completa do funil de vendas.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Conversões IA", value: "84%", trend: "+12%", icon: Bot, color: "text-primary" },
          { title: "Receita (IA)", value: "R$ 14.280", trend: "+8.2%", icon: DollarSign, color: "text-emerald-500" },
          { title: "Novos Leads", value: "+124", trend: "+18%", icon: Users, color: "text-blue-500" },
          { title: "Tempo Médio", value: "1.2s", trend: "-5%", icon: MessageSquare, color: "text-orange-500" },
        ].map((stat, i) => (
          <Card key={i} className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend.startsWith("+") ? (
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-rose-500" />
                )}
                <span className={`text-xs font-medium ${stat.trend.startsWith("+") ? "text-emerald-500" : "text-rose-500"}`}>
                  {stat.trend}
                </span>
                <span className="text-[10px] text-muted-foreground ml-1">vs mês anterior</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-md overflow-hidden">
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Volume de Agendamentos (IA)
            </CardTitle>
            <CardDescription>Média semanal de agendamentos realizados pela secretária virtual.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DATA}>
                  <defs>
                    <linearGradient id="colorAgend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground))" opacity={0.1} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      borderColor: "hsl(var(--border))",
                      borderRadius: "12px",
                      fontSize: "12px"
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="agendamentos" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorAgend)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 shadow-md overflow-hidden">
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle className="text-base">Conversas de Alta Conversão</CardTitle>
            <CardDescription>Top interações que resultaram em vendas.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[
                { name: "Consultório Dr. Silva", growth: 92, status: "Alta" },
                { name: "Salão Estética Pro", growth: 78, status: "Média" },
                { name: "Escritório Advocacia X", growth: 45, status: "Estável" },
              ].map((item, i) => (
                <div key={i} className="group space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium group-hover:text-primary transition-colors">{item.name}</span>
                    <span className="text-xs text-muted-foreground font-mono">{item.growth}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(var(--primary),0.5)]" 
                      style={{ width: `${item.growth}%` }}
                    />
                  </div>
                </div>
              ))}
              
              <div className="pt-4 mt-6 border-t border-dashed">
                <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary">Insight da IA</p>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      "A secretária Beatriz aumentou a conversão em 15% após o ajuste do tom de voz para 'Empático' ontem."
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
