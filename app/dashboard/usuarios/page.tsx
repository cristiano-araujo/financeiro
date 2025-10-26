"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Shield, UserIcon, Trash2, Edit2, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/types"

export default function UsuariosPage() {
  const { user, getAllUsers, addUser, updateUser, deleteUser } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<Array<User & { password: string }>>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({})

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user" as "admin" | "user",
  })

  // Verificar se é admin
  useEffect(() => {
    if (user?.role !== "admin") {
      router.push("/dashboard")
    } else {
      loadUsers()
    }
  }, [user, router])

  const loadUsers = () => {
    setUsers(getAllUsers())
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId) {
      updateUser(editingId, formData)
      setEditingId(null)
    } else {
      addUser(formData)
      setIsAdding(false)
    }

    setFormData({ name: "", email: "", password: "", role: "user" })
    loadUsers()
  }

  const handleEdit = (userToEdit: User & { password: string }) => {
    setFormData({
      name: userToEdit.name,
      email: userToEdit.email,
      password: userToEdit.password,
      role: userToEdit.role,
    })
    setEditingId(userToEdit.id)
    setIsAdding(true)
  }

  const handleDelete = (id: string) => {
    if (id === user?.id) {
      alert("Você não pode excluir seu próprio usuário!")
      return
    }
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      deleteUser(id)
      loadUsers()
    }
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    setFormData({ name: "", email: "", password: "", role: "user" })
  }

  const togglePasswordVisibility = (userId: string) => {
    setShowPassword((prev) => ({ ...prev, [userId]: !prev[userId] }))
  }

  if (user?.role !== "admin") {
    return null
  }

  const adminCount = users.filter((u) => u.role === "admin").length
  const userCount = users.filter((u) => u.role === "user").length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gerenciamento de Usuários"
        description="Gerencie administradores e usuários do sistema"
        action={
          !isAdding && (
            <Button onClick={() => setIsAdding(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Novo Usuário
            </Button>
          )
        }
      />

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Usuários cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administradores</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminCount}</div>
            <p className="text-xs text-muted-foreground">Com acesso total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários</CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
            <p className="text-xs text-muted-foreground">Acesso limitado</p>
          </CardContent>
        </Card>
      </div>

      {/* Formulário de Adicionar/Editar */}
      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Editar Usuário" : "Novo Usuário"}</CardTitle>
            <CardDescription>
              {editingId ? "Atualize as informações do usuário" : "Adicione um novo usuário ao sistema"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Tipo de Usuário</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: "admin" | "user") => setFormData({ ...formData, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Usuário</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit">{editingId ? "Atualizar" : "Adicionar"}</Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de Usuários */}
      <Card>
        <CardHeader>
          <CardTitle>Usuários Cadastrados</CardTitle>
          <CardDescription>Lista de todos os usuários do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((u) => (
              <div key={u.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4 flex-1">
                  <div className="rounded-full bg-primary/10 p-3">
                    {u.role === "admin" ? (
                      <Shield className="h-5 w-5 text-primary" />
                    ) : (
                      <UserIcon className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{u.name}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          u.role === "admin" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {u.role === "admin" ? "Admin" : "Usuário"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{u.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">
                        Senha: {showPassword[u.id] ? u.password : "••••••••"}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => togglePasswordVisibility(u.id)}
                      >
                        {showPassword[u.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(u)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(u.id)} disabled={u.id === user?.id}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
