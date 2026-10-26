-- DFG Finance OS · módulo Alma. Pega esto una vez en Supabase → SQL Editor → Run.
create table if not exists soul_log (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid(),
  day date not null, mood int, energy int,
  emotions jsonb default '[]', gratitude jsonb default '[]', journal text,
  prayed boolean default false, read_bible boolean default false, faith_min int default 0,
  quote_ref text, ai_reflection text, created_at timestamptz default now(),
  unique (user_id, day)
);
create table if not exists prayer_requests (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid(),
  created date not null default current_date, text text not null,
  answered date, answer_note text, created_at timestamptz default now()
);
create table if not exists emo_spend (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid(),
  tx_id bigint not null, trigger text not null, note text, created_at timestamptz default now(),
  unique (user_id, tx_id)
);
do $$ declare t text; begin
  foreach t in array array['soul_log','prayer_requests','emo_spend'] loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists own_rows on %I', t);
    execute format('create policy own_rows on %I for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid())', t);
  end loop;
end $$;
