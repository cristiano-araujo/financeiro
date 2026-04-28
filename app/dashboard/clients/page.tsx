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
  Sparkles,
  Filter,
  Download,
  Loader2
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddingClient, setIsAddingClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    setIsLoading(true)
    const data = await db.getClients()
    setClients(data)
    setIsLoading(false)
  }

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  )

  const handleAddClient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const success = await db.addClient({
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      businessId: "74888888-4444-4444-4444-888888888888",
      aiSummary: "Novo cliente cadastrado manualmente via Dashboard."
    })
    
    if (success) {
      toast.success("Cliente cadastrado no Supabase!")
      setIsAddingClient(false)
      loadClients()
    } else {
      toast.error("Erro ao cadastrar cliente.")
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Gestão de Clientes
          </h2>
          <p className="text-muted-foreground">
            Base de dados conectada em tempo real ao Supabase.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 h-9" onClick={loadClients}>
            <Download className="h-4 w-4" />
            Atualizar
          </Button>
          <Dialog open={isAddingClient} onOpenChange={setIsAddingClient}>
            <DialogTrigger asChild>
              <Button className="gap-2 h-9 shadow-lg shadow-primary/20">
                <UserPlus className="h-4 w-4" />
                Novo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Cadastrar Cliente</DialogTitle>
                <DialogDescription>
                  Os dados serão salvos permanentemente no seu banco de dados Supabase.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddClient} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" name="name" placeholder="Ex: Rodrigo Santos" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">WhatsApp</Label>
                  <Input id="phone" name="phone" placeholder="(11) 99999-9999" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email (Opcional)</Label>
                  <Input id="email" name="email" type="email" placeholder="rodrigo@email.com" />
                </div>
                <DialogFooter className="mt-4">
                  <Button type="submit" className="w-full">Salvar no Banco</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="shadow-xl border-primary/5 overflow-hidden">
        <CardHeader className="pb-3 bg-muted/20 border-b">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nome ou telefone..." 
                className="pl-9 h-10 bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
              <Filter className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="w-[300px] py-4">Cliente</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead className="hidden md:table-cell">Perfil IA Beatriz</TableHead>
                  <TableHead className="hidden lg:table-cell">Data de Cadastro</TableHead>
                  <TableHead className="text-right pr-6">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center">
                      <div className="flex flex-col items-center gap-2 text-primary">
                        <Loader2 className="h-8 w-8 animate-spin" />
                        <p className="text-sm">Carregando dados do Supabase...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {filteredClients.map((client) => (
                      <TableRow key={client.id} className="hover:bg-primary/5 transition-colors group">
                        <TableCell className="font-medium py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold shadow-inner group-hover:scale-110 transition-transform">
                              {client.name.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold">{client.name}</span>
                              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">ID: {client.id.slice(0, 5)}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1.5 text-xs">
                            <span className="flex items-center gap-1.5 text-foreground font-medium">
                              <Phone className="h-3 w-3 text-primary" /> {client.phone}
                            </span>
                            {client.email && (
                              <span className="flex items-center gap-1.5 text-muted-foreground">
                                <Mail className="h-3 w-3" /> {client.email}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-start gap-2 bg-primary/5 p-2.5 rounded-xl border border-primary/10 max-w-[320px] group-hover:bg-primary/10 transition-colors">
                            <Sparkles className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                            <p className="text-[11px] text-muted-foreground italic leading-relaxed">
                              {client.aiSummary || "Analisando comportamento..."}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground text-xs">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 opacity-50" />
                            {new Date(client.createdAt).toLocaleDateString("pt-BR")}
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredClients.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                          Nenhum cliente cadastrado no banco de dados.
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
