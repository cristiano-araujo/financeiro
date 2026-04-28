"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/db"
import { Client } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Search, 
  UserPlus, 
  MoreVertical, 
  Phone, 
  Mail, 
  Calendar,
  Sparkles
} from "lucide-react"

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    setClients(db.getClients())
  }, [])

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  )

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
          <p className="text-muted-foreground">
            Gerencie sua base de clientes e visualize os perfis gerados pela IA.
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nome ou telefone..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[250px]">Cliente</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead className="hidden md:table-cell">Perfil IA</TableHead>
                  <TableHead className="hidden lg:table-cell">Cadastrado em</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id} className="hover:bg-muted/30 transition-colors group">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {client.name.charAt(0)}
                        </div>
                        {client.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <Phone className="h-3 w-3" /> {client.phone}
                        </span>
                        {client.email && (
                          <span className="flex items-center gap-1.5 text-muted-foreground">
                            <Mail className="h-3 w-3" /> {client.email}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {client.aiSummary ? (
                        <div className="flex items-start gap-2 bg-primary/5 p-2 rounded-lg border border-primary/10 max-w-[300px]">
                          <Sparkles className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                          <p className="text-[11px] text-muted-foreground italic leading-tight">
                            {client.aiSummary}
                          </p>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">Sem perfil gerado</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground text-xs">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {new Date(client.createdAt).toLocaleDateString("pt-BR")}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredClients.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      Nenhum cliente encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
