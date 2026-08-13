-- LP /economize (Campanha 2, Meta Ads) — tabela de leads + bucket de faturas.
-- Toda escrita passa pela Edge Function lp-lead usando a service role, que ignora RLS por
-- desenho do Supabase. RLS aqui existe só pra bloquear qualquer tentativa de escrita/leitura
-- direta do browser com a chave publicável (anon/authenticated).

create table if not exists public.leads_lp (
  id uuid primary key default gen_random_uuid(),
  criado_em timestamptz not null default now(),

  nome text not null,
  whatsapp text not null,
  cidade text not null,
  tipo_imovel text not null,
  faixa_conta text not null,
  valor_conta_informado numeric not null,
  status_faturas text not null,
  qualificado boolean not null,

  fatura_path text,

  consentimento_lgpd boolean not null default false,
  consentimento_em timestamptz,

  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  fbclid text,
  referrer text,

  event_id text not null,
  capi_status text,

  user_agent text,
  ip_hash text
);

comment on table public.leads_lp is 'Leads capturados pela LP /economize (Campanha 2, tráfego pago Meta Ads). Insert exclusivo via Edge Function lp-lead (service role) — RLS bloqueia anon/authenticated.';

create index if not exists leads_lp_criado_em_idx on public.leads_lp (criado_em);
create index if not exists leads_lp_utm_content_idx on public.leads_lp (utm_content);
create index if not exists leads_lp_qualificado_idx on public.leads_lp (qualificado);
create index if not exists leads_lp_event_id_idx on public.leads_lp (event_id);
-- usado pelo rate limit por IP na Edge Function (contagem de envios recentes por ip_hash)
create index if not exists leads_lp_ip_hash_criado_em_idx on public.leads_lp (ip_hash, criado_em);

alter table public.leads_lp enable row level security;
-- Nenhuma policy criada de propósito: com RLS ligada e zero policies, anon/authenticated
-- não conseguem ler nem escrever nada. Só a service role (Edge Function) passa.

-- Bucket privado pras faturas anexadas opcionalmente no formulário.
insert into storage.buckets (id, name, public)
values ('faturas-lp', 'faturas-lp', false)
on conflict (id) do nothing;
