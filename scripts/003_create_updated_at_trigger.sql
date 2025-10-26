-- Função para atualizar updated_at automaticamente
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Triggers para atualizar updated_at
create trigger set_updated_at_custos_fixos
  before update on public.custos_fixos
  for each row
  execute function public.handle_updated_at();

create trigger set_updated_at_custos_variaveis
  before update on public.custos_variaveis
  for each row
  execute function public.handle_updated_at();

create trigger set_updated_at_servicos
  before update on public.servicos
  for each row
  execute function public.handle_updated_at();

create trigger set_updated_at_clientes
  before update on public.clientes
  for each row
  execute function public.handle_updated_at();

create trigger set_updated_at_agendamentos
  before update on public.agendamentos
  for each row
  execute function public.handle_updated_at();
