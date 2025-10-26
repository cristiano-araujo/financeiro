-- Tabela de perfis de usuários (estende auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  role text not null check (role in ('admin', 'user')),
  created_at timestamp with time zone default now()
);

-- Habilitar RLS
alter table public.profiles enable row level security;

-- Políticas RLS para profiles
create policy "Usuários podem ver seu próprio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Usuários podem atualizar seu próprio perfil"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Admins podem ver todos os perfis"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins podem inserir perfis"
  on public.profiles for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins podem atualizar perfis"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins podem deletar perfis"
  on public.profiles for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Tabela de custos fixos
create table if not exists public.custos_fixos (
  id uuid primary key default gen_random_uuid(),
  descricao text not null,
  valor numeric(10, 2) not null check (valor >= 0),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.custos_fixos enable row level security;

create policy "Usuários autenticados podem ver custos fixos"
  on public.custos_fixos for select
  using (auth.uid() is not null);

create policy "Usuários autenticados podem inserir custos fixos"
  on public.custos_fixos for insert
  with check (auth.uid() = user_id);

create policy "Usuários autenticados podem atualizar custos fixos"
  on public.custos_fixos for update
  using (auth.uid() is not null);

create policy "Usuários autenticados podem deletar custos fixos"
  on public.custos_fixos for delete
  using (auth.uid() is not null);

-- Tabela de custos variáveis
create table if not exists public.custos_variaveis (
  id uuid primary key default gen_random_uuid(),
  descricao text not null,
  valor_unitario numeric(10, 2) not null check (valor_unitario >= 0),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.custos_variaveis enable row level security;

create policy "Usuários autenticados podem ver custos variáveis"
  on public.custos_variaveis for select
  using (auth.uid() is not null);

create policy "Usuários autenticados podem inserir custos variáveis"
  on public.custos_variaveis for insert
  with check (auth.uid() = user_id);

create policy "Usuários autenticados podem atualizar custos variáveis"
  on public.custos_variaveis for update
  using (auth.uid() is not null);

create policy "Usuários autenticados podem deletar custos variáveis"
  on public.custos_variaveis for delete
  using (auth.uid() is not null);

-- Tabela de serviços
create table if not exists public.servicos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  preco numeric(10, 2) not null check (preco >= 0),
  duracao integer not null check (duracao > 0),
  ativo boolean default true,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.servicos enable row level security;

create policy "Usuários autenticados podem ver serviços"
  on public.servicos for select
  using (auth.uid() is not null);

create policy "Usuários autenticados podem inserir serviços"
  on public.servicos for insert
  with check (auth.uid() = user_id);

create policy "Usuários autenticados podem atualizar serviços"
  on public.servicos for update
  using (auth.uid() is not null);

create policy "Usuários autenticados podem deletar serviços"
  on public.servicos for delete
  using (auth.uid() is not null);

-- Tabela de clientes
create table if not exists public.clientes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  telefone text not null,
  email text,
  data_nascimento date,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.clientes enable row level security;

create policy "Usuários autenticados podem ver clientes"
  on public.clientes for select
  using (auth.uid() is not null);

create policy "Usuários autenticados podem inserir clientes"
  on public.clientes for insert
  with check (auth.uid() = user_id);

create policy "Usuários autenticados podem atualizar clientes"
  on public.clientes for update
  using (auth.uid() is not null);

create policy "Usuários autenticados podem deletar clientes"
  on public.clientes for delete
  using (auth.uid() is not null);

-- Tabela de agendamentos
create table if not exists public.agendamentos (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid not null references public.clientes(id) on delete cascade,
  servico_id uuid not null references public.servicos(id) on delete cascade,
  data_hora timestamp with time zone not null,
  status text not null check (status in ('agendado', 'confirmado', 'concluido', 'cancelado')),
  observacoes text,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.agendamentos enable row level security;

create policy "Usuários autenticados podem ver agendamentos"
  on public.agendamentos for select
  using (auth.uid() is not null);

create policy "Usuários autenticados podem inserir agendamentos"
  on public.agendamentos for insert
  with check (auth.uid() = user_id);

create policy "Usuários autenticados podem atualizar agendamentos"
  on public.agendamentos for update
  using (auth.uid() is not null);

create policy "Usuários autenticados podem deletar agendamentos"
  on public.agendamentos for delete
  using (auth.uid() is not null);

-- Índices para melhor performance
create index if not exists idx_custos_fixos_user_id on public.custos_fixos(user_id);
create index if not exists idx_custos_variaveis_user_id on public.custos_variaveis(user_id);
create index if not exists idx_servicos_user_id on public.servicos(user_id);
create index if not exists idx_clientes_user_id on public.clientes(user_id);
create index if not exists idx_agendamentos_user_id on public.agendamentos(user_id);
create index if not exists idx_agendamentos_cliente_id on public.agendamentos(cliente_id);
create index if not exists idx_agendamentos_servico_id on public.agendamentos(servico_id);
create index if not exists idx_agendamentos_data_hora on public.agendamentos(data_hora);
create index if not exists idx_agendamentos_status on public.agendamentos(status);
