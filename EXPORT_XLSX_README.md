# Funcionalidade de Exportação XLSX

## 📊 Sobre

O sistema agora inclui funcionalidade completa para exportar relatórios em formato Excel (.xlsx) com dados organizados em múltiplas abas.

## 🚀 Funcionalidades

### 1. **Relatório Completo** (Dashboard)
- **Localização**: Botão no topo do Dashboard
- **Conteúdo**: Todas as abas em um único arquivo
- **Abas incluídas**:
  - Custos Fixos
  - Custos Variáveis
  - Serviços
  - Clientes
  - Agendamentos
  - Resumo Financeiro
  - Comissões

### 2. **Relatórios Individuais**
- **Custos Fixos**: Página de Custos
- **Custos Variáveis**: Página de Custos
- **Serviços**: Página de Serviços
- **Clientes**: Página de Clientes
- **Agendamentos**: Página de Agendamentos

## 📁 Estrutura dos Arquivos

### Relatório Completo
- Nome: `relatorio-financeiro-YYYY-MM-DD.xlsx`
- Múltiplas abas com todos os dados

### Relatórios Individuais
- Custos Fixos: `custos-fixos.xlsx`
- Custos Variáveis: `custos-variaveis.xlsx`
- Serviços: `servicos.xlsx`
- Clientes: `clientes.xlsx`
- Agendamentos: `agendamentos.xlsx`

## 📋 Dados Exportados

### Custos Fixos
- Nome
- Valor
- Descrição
- Data de Criação

### Custos Variáveis
- Nome
- Valor
- Descrição
- Data
- Data de Criação

### Serviços
- Nome
- Preço
- Duração (min)
- Comissão (%)
- Descrição
- Data de Criação

### Clientes
- Nome
- Email
- Telefone
- Status
- Data de Criação

### Agendamentos
- Cliente
- Serviço
- Data
- Horário
- Status
- Valor
- Data de Criação

### Resumo Financeiro
- Total Custos Fixos
- Total Custos Variáveis
- Receita Atual
- Lucro/Prejuízo
- Total de Clientes
- Total de Agendamentos

### Comissões
- Funcionário
- Serviço
- Valor do Serviço
- Comissão (%)
- Valor da Comissão
- Data

## 🔧 Implementação Técnica

### Dependências
```json
{
  "xlsx": "^0.18.5"
}
```

### Arquivos Criados
- `lib/export-utils.ts` - Funções de exportação
- `components/export-button.tsx` - Componente de botão

### Como Usar
```tsx
import { ExportButton } from "@/components/export-button"

// Relatório completo
<ExportButton
  variant="relatorio-completo"
  custosFixos={custosFixos}
  custosVariaveis={custosVariaveis}
  servicos={servicos}
  clientes={clientes}
  agendamentos={agendamentos}
  financeiro={financeiro}
  comissoes={comissoes}
/>

// Relatório individual
<ExportButton variant="clientes" clientes={clientes} />
```

## 🎯 Benefícios

- ✅ **Análise offline** - Dados exportados podem ser analisados no Excel
- ✅ **Compartilhamento** - Arquivos Excel são universais
- ✅ **Backup** - Preserva dados em formato estruturado
- ✅ **Relatórios customizados** - Possibilita análises específicas
- ✅ **Integração** - Compatível com outros sistemas

## 📈 Próximos Passos

Para produção, considere:
- Integração com Supabase para dados em nuvem
- Agendamento automático de relatórios
- Templates customizados de Excel
- Envio automático por email
- Dashboard de BI integrado