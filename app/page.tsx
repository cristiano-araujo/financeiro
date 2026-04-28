import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, Calendar, Users, TrendingUp, Sparkles } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b backdrop-blur-sm fixed w-full bg-background/80 z-50">
        <Link className="flex items-center justify-center gap-2" href="#">
          <div className="bg-primary p-1.5 rounded-lg">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">AI CRM</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors mt-2" href="#features">
            Recursos
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Entrar</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/dashboard">Começar Agora</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-primary/10 text-primary border-primary/20 mb-4 animate-in fade-in slide-in-from-bottom-3">
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                <span>O Futuro do Agendamento Chegou</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-[900px]">
                A Secretária com IA que <span className="text-primary">Vende por Você</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl mt-4">
                Atenda, agende e faça o acompanhamento dos seus clientes no WhatsApp de forma 100% automática com inteligência artificial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button size="lg" className="h-12 px-8 text-base" asChild>
                  <Link href="/dashboard">
                    Ver Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                  Como Funciona
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-start space-y-3 p-6 bg-background rounded-2xl border shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Agente de IA 24/7</h3>
                <p className="text-muted-foreground">
                  Uma IA treinada no seu negócio que entende linguagem natural e agenda horários sozinha no WhatsApp.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-3 p-6 bg-background rounded-2xl border shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Dashboard de Performance</h3>
                <p className="text-muted-foreground">
                  Acompanhe em tempo real a taxa de conversão da IA, receita gerada e satisfação dos clientes.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-3 p-6 bg-background rounded-2xl border shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Kanban Inteligente</h3>
                <p className="text-muted-foreground">
                  Visualize seu funil de agendamentos em colunas e gerencie o status de cada atendimento com facilidade.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 border-t">
        <div className="container px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 AI CRM. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:underline">Termos</Link>
            <Link href="#" className="hover:underline">Privacidade</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
