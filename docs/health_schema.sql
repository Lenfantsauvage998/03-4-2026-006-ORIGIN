-- DFG Finance OS · módulo Salud. Pega esto una vez en Supabase → SQL Editor → Run.
create table if not exists health_profile (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid(),
  sex text, birth date, height_cm numeric, weight_kg numeric, bodyfat numeric,
  activity int, goal text, rate numeric, target_weight numeric,
  preset text, p_pct numeric, c_pct numeric, f_pct numeric, kcal_override numeric,
  sleep_goal numeric, updated_at timestamptz default now()
);
create table if not exists food_log (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid(),
  date date not null, meal text not null, name text not null, brand text,
  qty numeric, unit text, grams numeric,
  kcal numeric default 0, prot numeric default 0, carb numeric default 0, fat numeric default 0,
  fiber numeric, sugar numeric, sodium numeric, satfat numeric,
  source text, ref text, created_at timestamptz default now()
);
create table if not exists custom_foods (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid(),
  name text not null, brand text, barcode text,
  kcal numeric, prot numeric, carb numeric, fat numeric,
  fiber numeric, sugar numeric, sodium numeric, satfat numeric,
  servings jsonb default '[]', source text default 'custom', created_at timestamptz default now()
);
create table if not exists recipes (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid(),
  name text not null, servings numeric default 1, items jsonb default '[]',
  created_at timestamptz default now()
);
create table if not exists sleep_log (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid(),
  night date not null, bed text not null, wake text not null,
  latency int default 0, awakenings int default 0, awake_min int default 0,
  quality int, factors jsonb default '[]', notes text, created_at timestamptz default now(),
  unique (user_id, night)
);
create index if not exists food_log_date on food_log (user_id, date);
create index if not exists sleep_log_night on sleep_log (user_id, night);
do $$ declare t text; begin
  foreach t in array array['health_profile','food_log','custom_foods','recipes','sleep_log'] loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists own_rows on %I', t);
    execute format('create policy own_rows on %I for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid())', t);
  end loop;
end $$;
