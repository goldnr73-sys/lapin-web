create table public.contacts (
  id         uuid default gen_random_uuid() primary key,
  name       text not null,
  email      text not null,
  phone      text,
  message    text not null,
  status     text not null default 'new',
  created_at timestamptz default now() not null
);

alter table public.contacts enable row level security;

create policy "Anyone can insert"
  on public.contacts for insert with check (true);

create policy "Auth users can select"
  on public.contacts for select using (auth.role() = 'authenticated');

create policy "Auth users can update"
  on public.contacts for update using (auth.role() = 'authenticated');

create index contacts_created_at_idx on public.contacts(created_at desc);
create index contacts_status_idx on public.contacts(status);
