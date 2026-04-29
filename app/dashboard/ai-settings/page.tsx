"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/db"
import { Business } from "@/lib/types"

import { Bot, Zap, Save, Sparkles, ShieldCheck, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

export default function AISettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [business, setBusiness] = useState<Business | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    aiPersonality: "",
    autoSchedule: true,
    confirmViaLink: true,
    followUpMode: false
  })

  useEffect(() => {
    async function loadSettings() {
      setIsLoading(true)
      const data = await db.getBusiness()
      if (data) {
        setBusiness(data)
        setFormData({
          name: data.name,
          aiPersonality: data.aiPersonality || "",
          autoSchedule: data.settings?.autoSchedule ?? true,
          confirmViaLink: data.settings?.confirmViaLink ?? true,
          followUpMode: data.settings?.followUpMode ?? false
        })
      }
      setIsLoading(false)
    }
    loadSettings()
  }, [])

  const handleSave = async () => {
    if (!business) return
    setIsSaving(true)
    
    const success = await db.updateBusiness(business.id, {
      name: formData.name,
      aiPersonality: formData.aiPersonality,
      settings: {
        autoSchedule: formData.autoSchedule,
        confirmViaLink: formData.confirmViaLink,
        followUpMode: formData.followUpMode
      }
    })

    if (success) {
      toast.success("Configurações da IA salvas com sucesso!")
    } else {
      toast.error("Erro ao salvar configurações.")
    }
    setIsSaving(false)
  }

  if (isLoading) return (
    <div className="flex items-center justify-center h-[60vh] text-primary font-black animate-pulse">
        Carregando Personalidade...
    </div>
  )

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight flex items-center gap-2 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            <Bot className="h-8 w-8 text-primary" />
            Configurações da IA
          </h2>
          <p className="text-muted-foreground font-medium mt-1">
            Defina o comportamento, tom de voz e regras da sua secretária inteligente.
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2 h-11 px-8 shadow-lg shadow-primary/20 font-bold">
          {isSaving ? <Zap className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Salvar Alterações
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-2xl border-primary/10 bg-card/50 backdrop-blur-sm overflow-hidden">
          <CardHeader className="border-b border-primary/5 bg-primary/5">
            <CardTitle className="flex items-center gap-2 text-lg font-black tracking-tight">
              <Sparkles className="h-5 w-5 text-primary" />
              Personalidade e Contexto
            </CardTitle>
            <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
              Explique para a IA quem ela é e como deve se comportar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pt-8">
            <div className="space-y-3">
              <Label htmlFor="ai-name" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Nome do Business / IA</Label>
              <Input 
                id="ai-name" 
                placeholder="Ex: Beatriz, Sarah, Maya..." 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="h-12 bg-background/50 border-primary/10 focus:border-primary/40 font-bold"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="ai-context" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Instruções de Sistema (Prompt)</Label>
              <Textarea 
                id="ai-context" 
                rows={12}
                placeholder="Ex: Você é uma secretária educada de uma clínica médica..."
                value={formData.aiPersonality}
                onChange={(e) => setFormData({...formData, aiPersonality: e.target.value})}
                className="bg-background/50 border-primary/10 focus:border-primary/40 font-medium leading-relaxed"
              />
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-3">
                <Bot className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                  Dica: Seja específico sobre os horários, preços e o tom de voz desejado (ex: amigável, formal, direto).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-xl border-primary/10 bg-card/50 backdrop-blur-sm">
            <CardHeader className="border-b border-primary/5">
              <CardTitle className="text-sm font-black tracking-widest uppercase flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Regras de Negócio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex items-center justify-between group">
                <div className="space-y-0.5">
                  <Label className="font-bold">Agendamento Automático</Label>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">IA pode marcar horários sozinha</p>
                </div>
                <Switch 
                  checked={formData.autoSchedule} 
                  onCheckedChange={(val) => setFormData({...formData, autoSchedule: val})}
                />
              </div>
              <div className="flex items-center justify-between group">
                <div className="space-y-0.5">
                  <Label className="font-bold">Confirmação via Link</Label>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">Envia link para confirmar dados</p>
                </div>
                <Switch 
                  checked={formData.confirmViaLink}
                  onCheckedChange={(val) => setFormData({...formData, confirmViaLink: val})}
                />
              </div>
              <div className="flex items-center justify-between group">
                <div className="space-y-0.5">
                  <Label className="font-bold">Modo Follow-up</Label>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">IA reativa clientes inativos</p>
                </div>
                <Switch 
                  checked={formData.followUpMode}
                  onCheckedChange={(val) => setFormData({...formData, followUpMode: val})}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 h-32 w-32 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform" />
            <CardHeader>
              <CardTitle className="text-sm font-black tracking-widest uppercase flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                WhatsApp API (n8n)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-primary/70">Webhook URL</Label>
                <div className="relative">
                  <Input 
                    readOnly 
                    value="https://n8n.seuservidor.com/webhook/ai-crm" 
                    className="text-[10px] font-mono bg-background/50 border-primary/20 pr-10" 
                  />
                  <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-primary/10" onClick={() => {
                    navigator.clipboard.writeText("https://n8n.seuservidor.com/webhook/ai-crm")
                    toast.success("URL copiada!")
                  }}>
                    <MessageSquare className="h-3.5 w-3.5 text-primary" />
                  </Button>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">
                Conecte esta URL no seu nó de Webhook no n8n para que a IA Beatriz possa responder aos clientes em tempo real.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
