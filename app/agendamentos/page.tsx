// "use client"

// import { useState } from "react"
// import { useData } from "@/lib/data-context"
// import { PageHeader } from "@/components/page-header"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Plus, Calendar, CheckCircle, Clock } from "lucide-react"
// import { AgendamentoForm } from "@/components/agendamento-form"
// import { AgendamentoList } from "@/components/agendamento-list"

// export default function AgendamentosPage() {
//   const { agendamentos } = useData()
//   const [showForm, setShowForm] = useState(false)

//   const hoje = new Date()
//   hoje.setHours(0, 0, 0, 0)

//   const agendadosHoje = agendamentos.filter((a) => {
//     const dataAgendamento = new Date(a.data)
//     dataAgendamento.setHours(0, 0, 0, 0)
//     return dataAgendamento.getTime() === hoje.getTime() && a.status !== "cancelado"
//   }).length

//   const statusCounts = {
//     agendado: agendamentos.filter((a) => a.status === "agendado").length,
//     confirmado: agendamentos.filter((a) => a.status === "confirmado").length,
//     concluido: agendamentos.filter((a) => a.status === "concluido").length,
//     cancelado: agendamentos.filter((a) => a.status === "cancelado").length,
//   }

//   return (
//     <div>
//       <PageHeader
//         title="Agendamentos"
//         description="Gerencie os agendamentos da barbearia"
//         action={
//           <Button onClick={() => setShowForm(true)}>
//             <Plus className="h-4 w-4 mr-2" />
//             Novo Agendamento
//           </Button>
//         }
//       />

//       {/* Cards de Resumo */}
//       <div className="grid gap-4 md:grid-cols-4 mb-8">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Hoje</CardTitle>
//             <Calendar className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{agendadosHoje}</div>
//             <p className="text-xs text-muted-foreground">Agendamentos</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
//             <CheckCircle className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{statusCounts.confirmado}</div>
//             <p className="text-xs text-muted-foreground">Aguardando atendimento</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
//             <CheckCircle className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{statusCounts.concluido}</div>
//             <p className="text-xs text-muted-foreground">Finalizados</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
//             <Clock className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{statusCounts.agendado}</div>
//             <p className="text-xs text-muted-foreground">Aguardando confirmação</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Formulário */}
//       {showForm && (
//         <div className="mb-6">
//           <AgendamentoForm onClose={() => setShowForm(false)} />
//         </div>
//       )}

//       {/* Tabs de Status */}
//       <Tabs defaultValue="todos" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="todos">Todos</TabsTrigger>
//           <TabsTrigger value="agendado">Pendentes</TabsTrigger>
//           <TabsTrigger value="confirmado">Confirmados</TabsTrigger>
//           <TabsTrigger value="concluido">Concluídos</TabsTrigger>
//           <TabsTrigger value="cancelado">Cancelados</TabsTrigger>
//         </TabsList>

//         <TabsContent value="todos">
//           <Card>
//             <CardHeader>
//               <CardTitle>Todos os Agendamentos</CardTitle>
//               <CardDescription>Lista completa de agendamentos</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <AgendamentoList />
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="agendado">
//           <Card>
//             <CardHeader>
//               <CardTitle>Agendamentos Pendentes</CardTitle>
//               <CardDescription>Aguardando confirmação</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <AgendamentoList filterStatus="agendado" />
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="confirmado">
//           <Card>
//             <CardHeader>
//               <CardTitle>Agendamentos Confirmados</CardTitle>
//               <CardDescription>Confirmados e aguardando atendimento</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <AgendamentoList filterStatus="confirmado" />
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="concluido">
//           <Card>
//             <CardHeader>
//               <CardTitle>Agendamentos Concluídos</CardTitle>
//               <CardDescription>Atendimentos finalizados</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <AgendamentoList filterStatus="concluido" />
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="cancelado">
//           <Card>
//             <CardHeader>
//               <CardTitle>Agendamentos Cancelados</CardTitle>
//               <CardDescription>Cancelados pelo cliente ou barbearia</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <AgendamentoList filterStatus="cancelado" />
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import { useData } from "@/lib/data-context"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Calendar, CheckCircle, Clock } from "lucide-react"
import { AgendamentoForm } from "@/components/agendamento-form"
import { AgendamentoList } from "@/components/agendamento-list"

export default function AgendamentosPage() {
  const { agendamentos } = useData()
  const [showForm, setShowForm] = useState(false)

  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)

  const agendadosHoje = agendamentos.filter((a) => {
    const dataAgendamento = new Date(a.data)
    dataAgendamento.setHours(0, 0, 0, 0)
    return dataAgendamento.getTime() === hoje.getTime() && a.status !== "cancelado"
  }).length

  const statusCounts = {
    agendado: agendamentos.filter((a) => a.status === "agendado").length,
    confirmado: agendamentos.filter((a) => a.status === "confirmado").length,
    concluido: agendamentos.filter((a) => a.status === "concluido").length,
    cancelado: agendamentos.filter((a) => a.status === "cancelado").length,
  }

  return (
    <div>
      <PageHeader
        title="Agendamentos"
        description="Gerencie os agendamentos da barbearia"
        action={
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Agendamento
          </Button>
        }
      />

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agendadosHoje}</div>
            <p className="text-xs text-muted-foreground">Agendamentos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.confirmado}</div>
            <p className="text-xs text-muted-foreground">Aguardando atendimento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.concluido}</div>
            <p className="text-xs text-muted-foreground">Finalizados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.agendado}</div>
            <p className="text-xs text-muted-foreground">Aguardando confirmação</p>
          </CardContent>
        </Card>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="mb-6">
          <AgendamentoForm onClose={() => setShowForm(false)} />
        </div>
      )}

      {/* Tabs de Status - Responsivo */}
      <Tabs defaultValue="todos" className="space-y-4">
        <div className="bg-muted rounded-lg p-1 flex flex-wrap gap-2">
          <button
            onClick={() => document.querySelector('[value="todos"]')?.click()}
            className="flex-1 min-w-[calc(50%-0.25rem)] md:flex-initial md:min-w-0 px-4 py-2 rounded-md font-medium transition-colors data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            data-value="todos"
          >
            Todos
          </button>
          <button
            onClick={() => document.querySelector('[value="agendado"]')?.click()}
            className="flex-1 min-w-[calc(50%-0.25rem)] md:flex-initial md:min-w-0 px-4 py-2 rounded-md font-medium transition-colors data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            data-value="agendado"
          >
            Pendentes
          </button>
          <button
            onClick={() => document.querySelector('[value="confirmado"]')?.click()}
            className="flex-1 min-w-[calc(50%-0.25rem)] md:flex-initial md:min-w-0 px-4 py-2 rounded-md font-medium transition-colors data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            data-value="confirmado"
          >
            Confirmados
          </button>
          <button
            onClick={() => document.querySelector('[value="concluido"]')?.click()}
            className="flex-1 min-w-[calc(50%-0.25rem)] md:flex-initial md:min-w-0 px-4 py-2 rounded-md font-medium transition-colors data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            data-value="concluido"
          >
            Concluídos
          </button>
          <button
            onClick={() => document.querySelector('[value="cancelado"]')?.click()}
            className="flex-1 min-w-[calc(50%-0.25rem)] md:flex-initial md:min-w-0 px-4 py-2 rounded-md font-medium transition-colors data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            data-value="cancelado"
          >
            Cancelados
          </button>
        </div>
        
        {/* Triggers ocultos do shadcn para manter funcionalidade */}
        <div className="hidden">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="agendado">Pendentes</TabsTrigger>
            <TabsTrigger value="confirmado">Confirmados</TabsTrigger>
            <TabsTrigger value="concluido">Concluídos</TabsTrigger>
            <TabsTrigger value="cancelado">Cancelados</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="todos">
          <Card>
            <CardHeader>
              <CardTitle>Todos os Agendamentos</CardTitle>
              <CardDescription>Lista completa de agendamentos</CardDescription>
            </CardHeader>
            <CardContent>
              <AgendamentoList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agendado">
          <Card>
            <CardHeader>
              <CardTitle>Agendamentos Pendentes</CardTitle>
              <CardDescription>Aguardando confirmação</CardDescription>
            </CardHeader>
            <CardContent>
              <AgendamentoList filterStatus="agendado" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="confirmado">
          <Card>
            <CardHeader>
              <CardTitle>Agendamentos Confirmados</CardTitle>
              <CardDescription>Confirmados e aguardando atendimento</CardDescription>
            </CardHeader>
            <CardContent>
              <AgendamentoList filterStatus="confirmado" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="concluido">
          <Card>
            <CardHeader>
              <CardTitle>Agendamentos Concluídos</CardTitle>
              <CardDescription>Atendimentos finalizados</CardDescription>
            </CardHeader>
            <CardContent>
              <AgendamentoList filterStatus="concluido" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelado">
          <Card>
            <CardHeader>
              <CardTitle>Agendamentos Cancelados</CardTitle>
              <CardDescription>Cancelados pelo cliente ou barbearia</CardDescription>
            </CardHeader>
            <CardContent>
              <AgendamentoList filterStatus="cancelado" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
