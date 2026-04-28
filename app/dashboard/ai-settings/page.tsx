"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Bot, Save, Sparkles, MessageSquare, ShieldCheck, Zap } from "lucide-react"
import { toast } from "sonner"

export default function AISettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Configurações da IA salvas com sucesso!")
    }, 1500)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Bot className="h-8 w-8 text-primary" />
            Configurações da IA
          </h2>
          <p className="text-muted-foreground">
            Defina o comportamento, tom de voz e regras da sua secretária inteligente.
          </p>
        </div>
        <Button onClick={handleSave} disabled={isLoading} className="gap-2">
          {isLoading ? <Zap className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Salvar Alterações
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              Personalidade e Contexto
            </CardTitle>
            <CardDescription>
              Explique para a IA quem ela é e como deve se comportar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="ai-name">Nome da Secretária</Label>
              <Input id="ai-name" placeholder="Ex: Beatriz, Sarah, Maya..." defaultValue="Beatriz" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ai-context">Instruções de Sistema (Prompt)</Label>
              <Textarea 
                id="ai-context" 
                rows={10}
                placeholder="Ex: Você é uma secretária educada de uma clínica médica..."
                defaultValue={`Você é a Beatriz, a secretária virtual da nossa clínica. 
Seu objetivo é agendar consultas e tirar dúvidas sobre nossos serviços.

REGRAS:
1. Seja sempre educada e use o nome do cliente se souber.
2. Não dê diagnósticos médicos.
3. Se o cliente quiser agendar, pergunte o dia e horário preferido.
4. Confirme sempre os dados antes de finalizar.`}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Regras de Negócio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Agendamento Automático</Label>
                  <p className="text-xs text-muted-foreground">IA pode marcar horários sozinha</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Confirmação via Link</Label>
                  <p className="text-xs text-muted-foreground">Envia link para confirmar dados</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Modo Follow-up</Label>
                  <p className="text-xs text-muted-foreground">IA reativa clientes inativos</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20 shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                WhatsApp API
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs">Webhook URL (n8n)</Label>
                <div className="flex gap-2">
                  <Input readOnly value="https://n8n.seuservidor.com/webhook/ai-crm" className="text-xs font-mono bg-background" />
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground">
                Copie esta URL e cole no seu nó de Webhook no n8n para conectar a IA.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
