# Guia de Migração para Supabase

Este guia explica como o sistema foi migrado do localStorage para o Supabase.

## Passos Realizados

### 1. Criação do Schema do Banco de Dados

Foram criados scripts SQL em `/scripts` para:
- Criar tabelas: profiles, custos_fixos, custos_variaveis, servicos, clientes, agendamentos
- Habilitar Row Level Security (RLS) em todas as tabelas
- Criar políticas de segurança para controlar acesso aos dados
- Criar triggers para atualização automática de timestamps
- Criar trigger para criação automática de perfil ao registrar usuário

### 2. Configuração dos Clientes Supabase

Foram criados três arquivos essenciais:
- `lib/supabase/client.ts` - Cliente para uso no navegador (client-side)
- `lib/supabase/server.ts` - Cliente para uso no servidor (server-side)
- `lib/supabase/middleware.ts` - Middleware para gerenciar sessões

### 3. Migração do Sistema de Autenticação

O arquivo `lib/auth-context.tsx` foi completamente reescrito para:
- Usar Supabase Auth ao invés de localStorage
- Gerenciar sessões automaticamente
- Carregar perfis de usuário do banco de dados
- Suportar registro, login e logout com Supabase

### 4. Migração do Gerenciamento de Dados

O arquivo `lib/data-context.tsx` foi atualizado para:
- Buscar dados do Supabase ao invés do localStorage
- Transformar todas as operações CRUD em assíncronas
- Usar queries do Supabase para interagir com o banco
- Manter sincronização automática com o banco de dados

### 5. Middleware de Autenticação

Foi criado `middleware.ts` na raiz do projeto para:
- Atualizar sessões automaticamente
- Redirecionar usuários não autenticados para login
- Redirecionar usuários autenticados do login para o dashboard

## Como Executar os Scripts SQL

1. Acesse o projeto no v0
2. Os scripts em `/scripts` serão executados automaticamente
3. Ou execute manualmente através da interface do v0

## Variáveis de Ambiente Necessárias

O projeto já está configurado com as seguintes variáveis:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (para operações admin)

## Segurança

Todas as tabelas possuem Row Level Security (RLS) habilitado:
- Usuários só podem ver/editar seus próprios dados
- Administradores têm acesso completo
- Políticas impedem acesso não autorizado

## Próximos Passos

Para usar o sistema:
1. Execute os scripts SQL para criar as tabelas
2. Registre um novo usuário através da página de cadastro
3. O primeiro usuário pode ser promovido a admin manualmente no banco
4. Faça login e comece a usar o sistema

## Diferenças do Sistema Anterior

- **Antes**: Dados salvos no localStorage (apenas no navegador)
- **Depois**: Dados salvos no Supabase (acessíveis de qualquer dispositivo)
- **Antes**: Autenticação simulada
- **Depois**: Autenticação real com Supabase Auth
- **Antes**: Sem segurança real
- **Depois**: Row Level Security protegendo todos os dados
